// «Los datos de tu negocio» (13-nov-2026, idea de Álvaro: «te pide datos de tu negocio y se van autollenando»).
// El alumno anota una vez sus datos y los prompts se muestran ya rellenados; lo que falta queda como hueco «[...]».
// Privacidad: los datos viven SOLO en localStorage de este navegador (clave CLAVE_DATOS_NEGOCIO). No se envían a ningún
// servidor, ni a Fidelidapp, ni a eventos de analítica. No meter estos valores en dataLayer, fetch ni textos de botones.
// Reutilizable: para otro módulo basta con un mapa hueco→campo en HUECOS_POR_MODULO (hoy solo «m7»).

export type CampoNegocioId = 'nombre' | 'negocio' | 'queHace' | 'despacho' | 'atencion' | 'entrega' | 'plazo' | 'trato' | 'reglas';

export type CampoNegocio = {
  id: CampoNegocioId;
  etiqueta: string;
  placeholder: string;
  ayuda?: string;
  /** Largo máximo en caracteres. */
  max: number;
  /** Varias líneas (las reglas de freno). */
  lineas?: number;
  /** Solo dígitos (el plazo de las facturas). */
  numero?: boolean;
  /** Elegir entre opciones fijas en vez de escribir. */
  opciones?: string[];
};

export type DatosNegocio = Partial<Record<CampoNegocioId, string>>;

export const CLAVE_DATOS_NEGOCIO = 'villelab_curso_datos_negocio';
export const DATOS_VACIOS: DatosNegocio = {};

/** Los 9 huecos de las instrucciones 7.1 (más la frase de arranque, que repite «tu nombre»). Ejemplos = Grano Norte. */
export const CAMPOS_NEGOCIO: CampoNegocio[] = [
  { id: 'nombre', etiqueta: 'Tu nombre', placeholder: 'Ej.: Camila', max: 40 },
  { id: 'negocio', etiqueta: 'Nombre de tu negocio', placeholder: 'Ej.: Grano Norte', max: 60 },
  {
    id: 'queHace',
    etiqueta: 'Qué es tu negocio, en pocas palabras',
    placeholder: 'Ej.: una tostaduría de café de especialidad en Valparaíso',
    ayuda: 'Empieza con «una» o «un». Va justo después del nombre de tu negocio.',
    max: 120,
  },
  {
    id: 'despacho',
    etiqueta: 'Despacho: dónde, qué días y cómo se llama en tu lista de productos',
    placeholder: 'Ej.: Valparaíso, martes y jueves. En mi lista: «Despacho Valparaíso»',
    ayuda: 'Si no despachas, escribe «no despachamos».',
    max: 200,
  },
  { id: 'atencion', etiqueta: 'Retiro o atención: dónde y en qué horario', placeholder: 'Ej.: en la tostaduría, de lunes a viernes de 9:00 a 18:00', max: 120 },
  { id: 'entrega', etiqueta: 'Quién entrega los pedidos', placeholder: 'Ej.: Matías', max: 40 },
  { id: 'plazo', etiqueta: 'A cuántos días vencen tus facturas', placeholder: 'Ej.: 30', max: 3, numero: true },
  { id: 'trato', etiqueta: 'Cómo tratas a tus clientes', placeholder: '', max: 20, opciones: ['Tuteo', 'Trato de usted'] },
  {
    id: 'reglas',
    etiqueta: 'Tus reglas de freno, una por línea',
    placeholder: 'Ej.: Cambios y devoluciones los decido yo.\nNo ofrezcas muestras ni regalos.',
    ayuda: 'Las que elegiste en el módulo 0 o en el esqueleto. Van como regla 7 de tu agente.',
    max: 1800,
    lineas: 20,
  },
];

const CAMPO_POR_ID = Object.fromEntries(CAMPOS_NEGOCIO.map((c) => [c.id, c])) as Record<CampoNegocioId, CampoNegocio>;

/** Hueco (texto exacto entre corchetes en el prompt) → campo. Por módulo, porque «[nombre]» no significa lo mismo en todos. */
export const HUECOS_POR_MODULO: Record<string, Record<string, CampoNegocioId>> = {
  m7: {
    '[nombre del negocio]': 'negocio',
    '[qué hace tu negocio en una frase]': 'queHace',
    '[tu nombre]': 'nombre',
    '[dónde despachas, qué días y cuál es el producto de despacho en tu lista; o «no despachamos»]': 'despacho',
    '[dónde y en qué horario]': 'atencion',
    '[nombre]': 'entrega',
    '[30]': 'plazo',
    '[Tuteo / Trato de usted]': 'trato',
    '[Pega aquí tus reglas de freno del módulo 0 o del esqueleto, una por línea.]': 'reglas',
  },
};

/** Corchetes que son parte del texto y no un hueco (el 7.1b habla «de los [corchetes]»). */
const NO_HUECOS = new Set(['[corchetes]']);

// ─── Limpieza de la entrada ───────────────────────────────────────────────

// Controles (menos salto de línea), marcas de ancho cero y de dirección: no se ven y rompen el pegado.
const INVISIBLES = new RegExp('[\\u0000-\\u0009\\u000B-\\u001F\\u007F-\\u009F\\u200B-\\u200F\\u2028\\u2029\\u202A-\\u202E\\u2060-\\u2069\\uFEFF]', 'g');

/** Mientras escribe: texto plano, sin tabulaciones ni invisibles, con su largo máximo (no recorta espacios para no estorbar). */
export function limpiarAlEscribir(campo: CampoNegocio, raw: string): string {
  let v = String(raw ?? '').replace(/\r\n?/g, '\n').replace(/\t/g, ' ').replace(INVISIBLES, '');
  if (campo.numero) v = v.replace(/\D/g, '');
  if (!campo.lineas) v = v.replace(/\n/g, ' ');
  else v = v.split('\n').slice(0, campo.lineas).join('\n');
  if (campo.opciones) v = campo.opciones.includes(v) ? v : '';
  return Array.from(v).slice(0, campo.max).join('');
}

/** Valor final que entra al prompt: limpio, sin espacios sobrantes ni líneas vacías. Vacío = hueco. */
export function valorFinal(campo: CampoNegocio, raw: string | undefined): string {
  const v = limpiarAlEscribir(campo, raw ?? '');
  if (campo.lineas) {
    return v
      .split('\n')
      .map((l) => l.replace(/ {2,}/g, ' ').trim())
      .filter(Boolean)
      .join('\n');
  }
  return v.replace(/ {2,}/g, ' ').trim();
}

/** Lo guardado puede venir de otra versión o estar alterado: solo strings conocidos, limpios. */
export function sanearDatos(guardado: unknown): DatosNegocio {
  if (!guardado || typeof guardado !== 'object' || Array.isArray(guardado)) return DATOS_VACIOS;
  const out: DatosNegocio = {};
  for (const c of CAMPOS_NEGOCIO) {
    const v = (guardado as Record<string, unknown>)[c.id];
    if (typeof v === 'string') out[c.id] = limpiarAlEscribir(c, v);
  }
  return out;
}

// ─── Rellenar un prompt ───────────────────────────────────────────────────

export type Trozo = { tipo: 'texto'; v: string } | { tipo: 'dato'; v: string; campo: CampoNegocioId } | { tipo: 'hueco'; v: string; campo?: CampoNegocioId };

const RE_HUECO = /\[[^\]\n]{1,200}\]/g;

/** Una sola pasada: lo que escribe el alumno nunca se vuelve a interpretar como hueco. */
export function rellenar(texto: string, datos: DatosNegocio, huecos: Record<string, CampoNegocioId> = {}): Trozo[] {
  const trozos: Trozo[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(RE_HUECO)) {
    const token = m[0];
    const i = m.index ?? 0;
    if (NO_HUECOS.has(token)) continue;
    if (i > ultimo) trozos.push({ tipo: 'texto', v: texto.slice(ultimo, i) });
    ultimo = i + token.length;
    const id = huecos[token];
    let v = id ? valorFinal(CAMPO_POR_ID[id], datos[id]) : '';
    if (!v) {
      trozos.push(id ? { tipo: 'hueco', v: token, campo: id } : { tipo: 'hueco', v: token });
      continue;
    }
    // «Despacho: [..].» con un valor que ya termina en signo: no dejar «..» ni «;.».
    if (texto[ultimo] === '.') v = v.replace(/[.,;:]+$/, '');
    // «[qué hace tu negocio…]» va después de «Grano Norte,»: «Una tostaduría» → «una tostaduría» (no toca siglas: «ONG»).
    if (id === 'queHace' && /^\p{Lu}\p{Ll}/u.test(v)) v = v[0].toLocaleLowerCase('es-CL') + v.slice(1);
    // «vencen a [30] días» con 1: «a 1 día».
    if (id === 'plazo' && v === '1' && texto.startsWith(' días', ultimo)) {
      v = '1 día';
      ultimo += ' días'.length;
    }
    // Varias reglas en la regla 7: las líneas siguientes quedan con sangría, bajo el número.
    if (id === 'reglas') v = v.replace(/\n/g, '\n   ');
    trozos.push({ tipo: 'dato', v, campo: id! });
  }
  if (ultimo < texto.length) trozos.push({ tipo: 'texto', v: texto.slice(ultimo) });
  return trozos;
}

export const aTexto = (trozos: Trozo[]) => trozos.map((t) => t.v).join('');

/** Corchetes que quedan dentro de lo que escribió el alumno (p. ej. reglas del módulo 0 sin completar). */
export function corchetesEnDatos(trozos: Trozo[]): number {
  return trozos.reduce((n, t) => n + (t.tipo === 'dato' ? (t.v.match(RE_HUECO) ?? []).filter((m) => !NO_HUECOS.has(m)).length : 0), 0);
}

/** Recorta líneas enteras para que quepan en el campo (nunca a mitad de una regla). Devuelve cuántas no cupieron. */
export function caberPorLineas(campo: CampoNegocio, lineas: string[]): { valor: string; fuera: number } {
  const dentro: string[] = [];
  let largo = 0;
  for (const l of lineas.map((x) => limpiarAlEscribir({ ...campo, lineas: undefined }, x).trim()).filter(Boolean)) {
    const extra = (dentro.length ? 1 : 0) + Array.from(l).length;
    if (dentro.length >= (campo.lineas ?? 1) || largo + extra > campo.max) break;
    dentro.push(l);
    largo += extra;
  }
  return { valor: dentro.join('\n'), fuera: lineas.filter((x) => x.trim()).length - dentro.length };
}

/** Campos de datos que este texto usa y que siguen vacíos (para «Te faltan N datos»). */
export function camposFaltantes(texto: string, datos: DatosNegocio, huecos: Record<string, CampoNegocioId> = {}): CampoNegocioId[] {
  const faltan = new Set<CampoNegocioId>();
  for (const t of rellenar(texto, datos, huecos)) if (t.tipo === 'hueco' && t.campo) faltan.add(t.campo);
  return CAMPOS_NEGOCIO.map((c) => c.id).filter((id) => faltan.has(id));
}
