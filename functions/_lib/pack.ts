// Pack del curso (13-nov-2026): el curso (Hotmart 8921667) incluye como bono la Guía «Tus próximos 20 clientes»
// (Hotmart 8918629, que se sigue vendiendo sola). Quien tiene la cookie del curso abre también la Guía.
//
// La cookie del curso vive en Path=/curso, así que no llega a /guia. Por eso la de la Guía se DERIVA de la del curso:
//   cookieGuia = sha256('vl-g1-pack:' + cookieCurso)
// y functions/_lib/guia1.ts solo guarda su hash (HASH_COOKIE_PACK). Nadie la puede fabricar sin la cookie del curso,
// que solo se obtiene con el código que está en el área de miembros de Hotmart. Sin códigos nuevos ni vencimientos.
//
// Dos caminos, los dos sin intervención de nadie:
//   1. «Tus bonos» → /curso/bonos/guia (functions/curso/bonos/guia.ts): lee la cookie del curso y deja la de la Guía.
//   2. /guia/acceso con el código del curso (functions/guia/acceso.ts): para otro navegador o celular.
import { sha256 } from './guia1';

export async function cookieGuiaDesdeCurso(cookieCurso: string): Promise<string> {
  return sha256(`vl-g1-pack:${cookieCurso}`);
}
