#!/usr/bin/env node
/**
 * Lee un programa desde GitHub y deja un snapshot versionado en el repo.
 *
 * Por qué un snapshot y no una llamada desde el browser: el sitio es `output:
 * 'export'`, no hay servidor donde esconder un token. Cualquier fetch a GitHub
 * desde la página expondría la credencial. Además Status, Sprint y Priority de
 * un board **solo existen en la API GraphQL de Projects v2** — REST no los ve —
 * y esa API exige token siempre, incluso para repos públicos.
 *
 * El token nunca pasa por acá: se delega en `gh`, que ya lo tiene. Si algún día
 * esto corre en CI, `gh` toma GH_TOKEN del entorno y este archivo no cambia.
 *
 * Uso:  npm run programa:sync            (todos los programas)
 *       npm run programa:sync -- prtech  (uno)
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../..');

const PROGRAMAS = {
  prtech: { owner: 'AlvaroEwaffle', repo: 'prtech-ai', proyecto: 1, nombre: 'PR Tech' },
  // El código de Fidelidapp vive en repos de Bruno; acá se rastrea todo con una
  // etiqueta `repo:` por issue. `repo` es de dónde salen los PRs que el board
  // muestra — por eso apunta a fidelidapp-tools, que es donde están las issues.
  fidelidapp: { owner: 'AlvaroEwaffle', repo: 'fidelidapp-tools', proyecto: 2, nombre: 'Fidelidapp' },
};

function gh(args, input) {
  try {
    return execFileSync('gh', args, {
      input,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (e) {
    const detalle = (e.stderr || e.stdout || e.message || '').trim();
    throw new Error(`gh ${args.slice(0, 2).join(' ')} falló:\n${detalle}`);
  }
}

// ── Board (Projects v2) ────────────────────────────────────────────────────
// Los campos de un item vienen como una unión: hay que pedir cada variante por
// separado y quedarse con la que traiga `name`/`text`/`date`. No hay un "dame
// todos los campos" genérico.
const QUERY_BOARD = `
query($owner:String!, $numero:Int!, $cursor:String) {
  user(login:$owner) {
    projectV2(number:$numero) {
      title
      items(first:100, after:$cursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          fieldValues(first:20) {
            nodes {
              __typename
              ... on ProjectV2ItemFieldSingleSelectValue { name field { ... on ProjectV2SingleSelectField { name } } }
              ... on ProjectV2ItemFieldTextValue        { text field { ... on ProjectV2FieldCommon { name } } }
              ... on ProjectV2ItemFieldNumberValue      { number field { ... on ProjectV2FieldCommon { name } } }
              ... on ProjectV2ItemFieldDateValue        { date field { ... on ProjectV2FieldCommon { name } } }
            }
          }
          content {
            __typename
            ... on Issue {
              number title url state createdAt closedAt body
              milestone { title dueOn state }
              labels(first:20) { nodes { name color } }
              assignees(first:10) { nodes { login } }
              comments { totalCount }
            }
            ... on PullRequest { number title url state createdAt closedAt isDraft }
          }
        }
      }
    }
  }
}`;

// El listado del board viene rezagado: una issue recién agregada puede tardar
// minutos en aparecer en `projectV2.items`, aunque su `projectItems` ya la
// muestre desde el lado de la issue y con sus campos puestos. Pasó con PR Tech
// (#65, #67 y #68) y volvió a pasar con las 25 de Fidelidapp.
//
// Por eso se lee dos veces: el board manda, y esta consulta rellena lo que el
// board todavía no confiesa. Sin esto, un sync corrido justo después de armar
// un tablero escribe un snapshot vacío y la página muestra cero historias como
// si fueran cero de verdad.
const QUERY_ISSUES = `
query($owner:String!, $repo:String!, $cursor:String) {
  repository(owner:$owner, name:$repo) {
    issues(first:50, after:$cursor, orderBy:{field:CREATED_AT, direction:ASC}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        number title url state createdAt closedAt
        milestone { title dueOn state }
        labels(first:20) { nodes { name color } }
        assignees(first:10) { nodes { login } }
        comments { totalCount }
        projectItems(first:10) {
          nodes {
            project { number }
            fieldValues(first:20) {
              nodes {
                __typename
                ... on ProjectV2ItemFieldSingleSelectValue { name field { ... on ProjectV2SingleSelectField { name } } }
                ... on ProjectV2ItemFieldTextValue        { text field { ... on ProjectV2FieldCommon { name } } }
                ... on ProjectV2ItemFieldNumberValue      { number field { ... on ProjectV2FieldCommon { name } } }
                ... on ProjectV2ItemFieldDateValue        { date field { ... on ProjectV2FieldCommon { name } } }
              }
            }
          }
        }
      }
    }
  }
}`;

// PRs abiertos: no están en el board, pero son la mitad de lo que uno mira en
// una daily — qué está esperando revisión.
const QUERY_PRS = `
query($owner:String!, $repo:String!) {
  repository(owner:$owner, name:$repo) {
    pullRequests(states:OPEN, first:50, orderBy:{field:UPDATED_AT, direction:DESC}) {
      nodes {
        number title url isDraft createdAt updatedAt
        author { login }
        reviews(first:1, states:APPROVED) { totalCount }
        labels(first:10) { nodes { name } }
      }
    }
  }
}`;

function graphql(query, variables) {
  const args = ['api', 'graphql', '-f', `query=${query}`];
  for (const [k, v] of Object.entries(variables)) {
    if (v === null || v === undefined) continue;
    // -F tipa números y booleanos; -f los mandaría como string y el server
    // rechaza un Int! que llega entre comillas.
    args.push(typeof v === 'number' || typeof v === 'boolean' ? '-F' : '-f', `${k}=${v}`);
  }
  const salida = JSON.parse(gh(args));
  if (salida.errors?.length) {
    throw new Error('GraphQL:\n' + salida.errors.map((e) => '  · ' + e.message).join('\n'));
  }
  return salida.data;
}

/** Aplana la unión de fieldValues a un objeto plano { "Status": "In review", ... } */
function campos(nodos) {
  const out = {};
  for (const n of nodos ?? []) {
    const nombre = n?.field?.name;
    if (!nombre) continue;
    const valor = n.name ?? n.text ?? n.date ?? (n.number !== undefined ? n.number : undefined);
    if (valor !== undefined && valor !== null) out[nombre] = valor;
  }
  return out;
}

/** Una issue del snapshot, desde el crudo de GitHub y sus campos del board. */
function aHistoria(c, f) {
  return {
    numero: c.number,
    titulo: c.title,
    url: c.url,
    estado_github: c.state, // OPEN | CLOSED — el crudo, nunca se sobrescribe
    estado_board: f.Status ?? null,
    sprint: f.Sprint ?? null,
    prioridad: f.Priority ?? null,
    estimacion: f.Estimate ?? f['Story Points'] ?? null,
    fase: c.milestone?.title ?? null,
    fase_vence: c.milestone?.dueOn ?? null,
    etiquetas: c.labels.nodes.map((l) => l.name),
    asignados: c.assignees.nodes.map((a) => a.login),
    comentarios: c.comments.totalCount,
    creada: c.createdAt,
    cerrada: c.closedAt,
  };
}

function leerBoard(cfg) {
  const items = [];
  let cursor = null;
  let titulo = null;
  for (;;) {
    const d = graphql(QUERY_BOARD, { owner: cfg.owner, numero: cfg.proyecto, cursor });
    const p = d?.user?.projectV2;
    if (!p) throw new Error(`No encontré el proyecto ${cfg.proyecto} de ${cfg.owner}.`);
    titulo = p.title;
    for (const nodo of p.items.nodes) {
      const c = nodo.content;
      if (!c || c.__typename !== 'Issue') continue; // los PRs van aparte
      items.push(aHistoria(c, campos(nodo.fieldValues.nodes)));
    }
    if (!p.items.pageInfo.hasNextPage) break;
    cursor = p.items.pageInfo.endCursor;
  }
  return { titulo, items };
}

/** Las issues del repo que están en este proyecto, leídas desde la issue. */
function leerDesdeElRepo(cfg) {
  const items = [];
  let cursor = null;
  for (;;) {
    const d = graphql(QUERY_ISSUES, { owner: cfg.owner, repo: cfg.repo, cursor });
    const issues = d.repository.issues;
    for (const c of issues.nodes) {
      const item = c.projectItems.nodes.find((i) => i.project?.number === cfg.proyecto);
      if (!item) continue;
      items.push(aHistoria(c, campos(item.fieldValues.nodes)));
    }
    if (!issues.pageInfo.hasNextPage) break;
    cursor = issues.pageInfo.endCursor;
  }
  return items;
}

function leerPRs(cfg) {
  const d = graphql(QUERY_PRS, { owner: cfg.owner, repo: cfg.repo });
  return d.repository.pullRequests.nodes.map((pr) => ({
    numero: pr.number,
    titulo: pr.title,
    url: pr.url,
    autor: pr.author?.login ?? null,
    borrador: pr.isDraft,
    aprobado: pr.reviews.totalCount > 0,
    abierta: pr.createdAt,
    tocada: pr.updatedAt,
    etiquetas: pr.labels.nodes.map((l) => l.name),
  }));
}

function sincronizar(slug) {
  const cfg = PROGRAMAS[slug];
  if (!cfg) throw new Error(`Programa desconocido: "${slug}". Conocidos: ${Object.keys(PROGRAMAS).join(', ')}`);

  process.stderr.write(`  ${slug}: leyendo board… `);
  const { titulo, items } = leerBoard(cfg);
  process.stderr.write(`${items.length} historias · repo… `);

  // El board manda; el repo solo agrega lo que el board todavía no lista.
  const vistas = new Set(items.map((h) => h.numero));
  const rezagadas = leerDesdeElRepo(cfg).filter((h) => !vistas.has(h.numero));
  if (rezagadas.length) {
    items.push(...rezagadas);
    process.stderr.write(`+${rezagadas.length} rezagadas · PRs… `);
  } else {
    process.stderr.write('al día · PRs… ');
  }

  const prs = leerPRs(cfg);
  process.stderr.write(`${prs.length}\n`);

  // Un snapshot vacío es indistinguible de «no hay trabajo» cuando se mira la
  // página. Preferimos no escribir y fallar ruidoso antes que pisar uno bueno.
  if (items.length === 0) {
    throw new Error(
      'el board y el repo devolvieron cero historias. No se escribe el snapshot: ' +
        'revisa el número de proyecto y que las issues estén agregadas al tablero.',
    );
  }

  const snapshot = {
    // `generado` es lo que la página usa para decir qué tan viejo es el dato.
    // Un dashboard que no confiesa su antigüedad miente sin saberlo.
    generado: new Date().toISOString(),
    slug,
    nombre: cfg.nombre,
    repo: `${cfg.owner}/${cfg.repo}`,
    board: titulo,
    historias: items.sort((a, b) => a.numero - b.numero),
    prs,
  };

  const destino = resolve(RAIZ, 'lib/programa/data', `${slug}.json`);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, JSON.stringify(snapshot, null, 2) + '\n');
  return { destino, snapshot };
}

const pedidos = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const objetivo = pedidos.length ? pedidos : Object.keys(PROGRAMAS);

let fallo = false;
for (const slug of objetivo) {
  try {
    const { destino, snapshot } = sincronizar(slug);
    const abiertas = snapshot.historias.filter((h) => h.estado_github === 'OPEN').length;
    console.log(
      `✅ ${slug} → ${destino.replace(RAIZ + '/', '')}  ` +
        `(${snapshot.historias.length} historias, ${abiertas} abiertas, ${snapshot.prs.length} PRs)`,
    );
  } catch (e) {
    fallo = true;
    console.error(`❌ ${slug}: ${e.message}`);
  }
}
process.exit(fallo ? 1 : 0);
