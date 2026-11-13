// Candado del curso «Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar» (Hotmart 8921667).
// Mismo mecanismo que la Guía 1 (functions/_lib/guia1.ts), 12-nov-2026.
//
// El módulo 0 (/curso/modulo-0) sigue abierto (se llega dejando el correo en /curso). Los módulos 1 a 7 solo se ven con la
// cookie `vl_curso`, que se obtiene en /curso/acceso con el código que reciben los compradores dentro del área de miembros
// de Hotmart (o con el link de un clic `/curso/acceso?c=CODIGO&d=/curso/modulo-N`).
//
// El repo es público: aquí NO está el código ni el valor de la cookie, solo sus hashes SHA-256.
//   HASH_CODIGO = sha256(codigoNormalizado)
//   cookie      = sha256('vl-curso:' + codigoNormalizado)
//   HASH_COOKIE = sha256(cookie)
// codigoNormalizado = mayúsculas, sin espacios ni guiones. El código vive fuera del repo, en
// ~/.claude/marca-alvaro/curso/acceso.md (privado). Para cambiarlo: generar uno nuevo (≥16 caracteres aleatorios),
// recalcular los dos hashes, desplegar y actualizar las clases de Hotmart.

import { normalizar, sha256 } from './guia1';

export const HASH_CODIGO_CURSO = '249324b1132cc6597976050ca31e6c7ef759aedf60a7d567ad7d4b276d4569b9';
export const HASH_COOKIE_CURSO = 'abf840b9283cfa02848771d983fda9032c7d9db95d849dbe7b7acd1e1daac3b6';
export const COOKIE_CURSO = 'vl_curso';

/**
 * /curso/modulo-1 … /curso/modulo-7 (el 7 desde el 13-nov-2026) y /curso/bonos (pack, 13-nov-2026: «Tus bonos», la descarga
 * de la planilla lista y el paso a la Guía), con o sin barra final, y sus archivos (.txt de RSC, subrutas, el .xlsx).
 */
export const PROTEGIDO_CURSO = /^\/curso\/(modulo-[1-7]|bonos)(\/|\.|$)/;

/** Ruta del módulo o de «Tus bonos» (sin .txt ni subrutas) a la que se vuelve después de entrar; si no calza, el módulo 1. */
export function destinoCurso(d: string | null | undefined): string {
  const m = d && !d.includes('//') ? /^\/curso\/(modulo-[1-7]|bonos)(?=\/|\.|$)/.exec(d) : null;
  return m ? m[0] : '/curso/modulo-1';
}

/** Valor de la cookie si el código es válido; si no, null. */
export async function canjearCurso(codigo: string): Promise<string | null> {
  const norm = normalizar(codigo);
  if (norm.length < 8 || norm.length > 64) return null;
  if ((await sha256(norm)) !== HASH_CODIGO_CURSO) return null;
  return sha256(`vl-curso:${norm}`);
}

/** Valor de la cookie del curso si es válida; si no, null. */
export async function cookieCursoValida(request: Request): Promise<string | null> {
  const cookies = request.headers.get('cookie') ?? '';
  const m = cookies.match(new RegExp(`(?:^|;\\s*)${COOKIE_CURSO}=([a-f0-9]{64})`));
  if (!m) return null;
  return (await sha256(m[1])) === HASH_COOKIE_CURSO ? m[1] : null;
}

export async function tieneAccesoCurso(request: Request): Promise<boolean> {
  return (await cookieCursoValida(request)) !== null;
}
