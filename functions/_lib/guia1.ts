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
  const norm = normalizar(codigo);
  if (norm.length < 8 || norm.length > 64) return null;
  if ((await sha256(norm)) !== HASH_CODIGO) return null;
  return sha256(`vl-g1:${norm}`);
}

export async function tieneAcceso(request: Request): Promise<boolean> {
  const cookies = request.headers.get('cookie') ?? '';
  const m = cookies.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]{64})`));
  return !!m && (await sha256(m[1])) === HASH_COOKIE;
}
