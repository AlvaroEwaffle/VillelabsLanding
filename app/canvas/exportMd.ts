// Reporte de la sesión en Markdown: lo que queda como acta para el cliente y como
// insumo para el análisis posterior. Agrupa por zona (la pregunta que se hizo), ordena
// por votos y cierra con el ranking global — que es lo que se prioriza al final.

import { Board, Note, Zone, NOTE_H, NOTE_W } from './board';

/** Una nota pertenece a la zona que contiene su centro. */
function zoneOf(n: Note, zones: Zone[]): Zone | null {
  const cx = n.x + NOTE_W / 2;
  const cy = n.y + NOTE_H / 2;
  return zones.find((z) => cx >= z.x && cx <= z.x + z.w && cy >= z.y && cy <= z.y + z.h) ?? null;
}

/** Votos primero; a igualdad, orden de lectura (arriba→abajo, izq→der). */
const byRelevance = (a: Note, b: Note) => b.votes - a.votes || a.y - b.y || a.x - b.x;

const clean = (t: string) => t.trim().replace(/\s*\n\s*/g, ' — ');

function bullet(n: Note): string {
  const txt = clean(n.text) || '_(vacía)_';
  return n.votes > 0 ? `- **[${n.votes}]** ${txt}` : `- ${txt}`;
}

export function buildMarkdown(board: Board): string {
  const stamp = new Date(board.updatedAt || Date.now()).toLocaleString('es-CL', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  const withText = board.notes.filter((n) => n.text.trim().length > 0);
  const totalVotes = withText.reduce((a, n) => a + n.votes, 0);

  const out: string[] = [];
  out.push(`# ${board.title || 'Sesión de trabajo'}`);
  out.push('');
  out.push(`**Villelabs** · ${stamp}`);
  out.push(`${withText.length} ideas · ${totalVotes} votos`);
  out.push('');
  out.push('---');
  out.push('');

  const used = new Set<string>();

  for (const z of board.zones) {
    const inZone = withText.filter((n) => {
      const hit = zoneOf(n, board.zones);
      return hit?.id === z.id;
    });
    inZone.forEach((n) => used.add(n.id));

    out.push(`## ${z.title}`);
    if (z.hint) {
      out.push(`_${z.hint}_`);
    }
    out.push('');
    if (inZone.length === 0) {
      out.push('_Sin respuestas._');
    } else {
      inZone.sort(byRelevance).forEach((n) => out.push(bullet(n)));
    }
    out.push('');
  }

  const loose = withText.filter((n) => !used.has(n.id));
  if (loose.length > 0) {
    out.push('## Fuera de las columnas');
    out.push('');
    loose.sort(byRelevance).forEach((n) => out.push(bullet(n)));
    out.push('');
  }

  const voted = withText.filter((n) => n.votes > 0).sort(byRelevance);
  if (voted.length > 0) {
    out.push('---');
    out.push('');
    out.push('## Lo que el equipo priorizó');
    out.push('');
    voted.slice(0, 10).forEach((n, i) => {
      const z = zoneOf(n, board.zones);
      const where = z ? ` — _${z.title}_` : '';
      out.push(`${i + 1}. **${clean(n.text)}** · ${n.votes} voto${n.votes === 1 ? '' : 's'}${where}`);
    });
    out.push('');
  }

  out.push('---');
  out.push('');
  out.push('_Generado desde el lienzo de trabajo de Villelabs — villelab.com/canvas_');
  out.push('');

  return out.join('\n');
}
