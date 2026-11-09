// Candado de la Guía 1 (producto Hotmart 8918629).
//
// La guía interactiva vive en /guia/prospeccion. Solo entra quien tiene la cookie `vl_g1`, que se
// obtiene en /guia/acceso con el código que reciben los compradores dentro del área de miembros de
// Hotmart (o con el link de un clic `/guia/acceso?c=CODIGO` que va en la clase «Empieza aquí»).
//
// El repo es público: aquí NO está el código ni el valor de la cookie, solo sus hashes SHA-256.
//   HASH_CODIGO = sha256(codigoNormalizado)
//   cookie      = sha256('vl-g1:' + codigoNormalizado)
//   HASH_COOKIE = sha256(cookie)
// codigoNormalizado = mayúsculas, sin espacios ni guiones. Para cambiar el código: generar uno nuevo
// (largo, ≥16 caracteres aleatorios), recalcular los dos hashes y actualizar la clase en Hotmart.

export const HASH_CODIGO = '410f5d18536b3ccfe6fdd82e266d3536d94cccc21c0446c0f7e1e8b70978c14f';
export const HASH_COOKIE = 'e12e26bee9f1e0546a00a60759cc4ea8bb6f2f6a52d39f0982dea0e01c4df592';
export const COOKIE = 'vl_g1';

// Códigos de regalo (9-nov-2026, Álvaro por WA): la guía se regala por DM a cambio de feedback, sin
// pasar por Hotmart. Un código por persona, así sabemos quién la abrió y a quién pedirle testimonio.
// Aquí solo va un id opaco (R001…) y los hashes; el nombre de cada persona vive fuera del repo
// (~/.claude/guia-regalo/codigos.json). Se generan con ~/.claude/guia-regalo/nuevo.mjs.
//   hc = sha256(codigoNormalizado)   hk = sha256(sha256('vl-g1:' + codigoNormalizado))
export type Regalo = { id: string; hc: string; hk: string; vence: string };
export const REGALOS: Regalo[] = [
  // REGALOS-INICIO
  { id: 'R001', hc: 'b2366dbbfab87ab394b465b695d71452b9cba07b19126beca23c8319cd9425a1', hk: '8da8253e802cab32c4041e934333ae409b759b9764b86e6c4ee23cc00280a560', vence: '2026-11-23' },
  // REGALOS-FIN
];
export const PROTEGIDO = /^\/guia\/prospeccion(\/|\.|$)/;

export async function sha256(texto: string): Promise<string> {
  const datos = new TextEncoder().encode(texto);
  const hash = await crypto.subtle.digest('SHA-256', datos);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function normalizar(codigo: string): string {
  return codigo.toUpperCase().replace(/[\s-]+/g, '');
}

/** Devuelve el valor de cookie si el código es válido; si no, null. */
export async function cookieParaCodigo(codigo: string): Promise<string | null> {
  return (await canjear(codigo))?.cookie ?? null;
}

/** Valida el código de Hotmart o uno de regalo vigente. `regalo` trae el id cuando es de regalo. */
export async function canjear(codigo: string): Promise<{ cookie: string; regalo?: string } | null> {
  const norm = normalizar(codigo);
  if (norm.length < 8 || norm.length > 64) return null;
  const h = await sha256(norm);
  const cookie = () => sha256(`vl-g1:${norm}`);
  if (h === HASH_CODIGO) return { cookie: await cookie() };
  const hoy = new Date().toISOString().slice(0, 10);
  const r = REGALOS.find((x) => x.hc === h && x.vence >= hoy);
  return r ? { cookie: await cookie(), regalo: r.id } : null;
}

export async function tieneAcceso(request: Request): Promise<boolean> {
  const cookies = request.headers.get('cookie') ?? '';
  const m = cookies.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]{64})`));
  if (!m) return false;
  const hk = await sha256(m[1]);
  return hk === HASH_COOKIE || REGALOS.some((x) => x.hk === hk);
}
