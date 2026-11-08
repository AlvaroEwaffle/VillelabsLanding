import { CASOS_DERIVACION, MIN_FAQS, PASOS, PREGUNTAS_TRAMPA, type Esqueleto } from './datos';

const limpio = (s: string) => s.trim();

export const productosValidos = (e: Esqueleto) =>
  e.productos.filter((p) => limpio(p.nombre) && (limpio(p.precio) || p.cotizar));

export const faqsCompletas = (e: Esqueleto) => e.faqs.filter((q) => limpio(q.pregunta) && limpio(q.respuesta));

export type Semaforo = 'verde' | 'amarillo' | 'rojo';

function porConteo(hechos: number, total: number): Semaforo {
  if (hechos >= total) return 'verde';
  if (hechos > 0) return 'amarillo';
  return 'rojo';
}

/** Semáforo de completitud por paso (1 a 4). */
export function completitud(e: Esqueleto): Record<number, Semaforo> {
  // Paso 1: verde con los 5 campos esenciales; el resto es «más detalle (opcional)».
  const p1 = [e.negocio, e.horario, e.queHaces].filter((x) => limpio(x)).length + (productosValidos(e).length ? 1 : 0) + (e.trato ? 1 : 0);
  const faqs = faqsCompletas(e).length;
  const p4 =
    [e.derivaNombre, e.derivaCanal, e.fraseDerivacion].filter((x) => limpio(x)).length + (e.derivaCasos.length ? 1 : 0);
  return {
    1: porConteo(p1, 5),
    2: faqs >= MIN_FAQS ? 'verde' : faqs > 0 ? 'amarillo' : 'rojo',
    3: e.reglas.length ? 'verde' : limpio(e.otraRegla) ? 'amarillo' : 'rojo',
    4: porConteo(p4, 4),
  };
}

const quienConfirma = (e: Esqueleto) => limpio(e.derivaNombre) || 'una persona del equipo';

function plural(s: string) {
  if (s === 'reclamo') return 'reclamos';
  if (s === 'pedido grande') return 'pedidos grandes';
  if (s === 'cliente molesto') return 'clientes molestos';
  if (s === 'pregunta que no sabe responder') return 'preguntas que no sabes responder con esta información';
  return s;
}

const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function listar(xs: string[]) {
  if (xs.length <= 1) return xs.join('');
  return `${xs.slice(0, -1).join(', ')} y ${xs[xs.length - 1]}`;
}

/** Arma el esqueleto del asistente con la estructura del documento, con lo que escribió la persona. */
export function generarEsqueleto(e: Esqueleto): string {
  const negocio = limpio(e.negocio) || 'mi negocio';
  const quien = quienConfirma(e);
  const l: string[] = [];

  const rubro = limpio(e.rubro) ? `, ${limpio(e.rubro).toLowerCase()}` : '';
  const zona = limpio(e.zona) ? ` en ${limpio(e.zona)}` : '';
  const canales = e.canales.length ? ` Respondes por ${listar(e.canales)}.` : '';
  l.push(`Eres el asistente de atención de ${negocio}${rubro}${zona}.${canales}`);
  l.push('');

  l.push('QUÉ HACEMOS');
  if (limpio(e.queHaces)) l.push(limpio(e.queHaces));
  if (limpio(e.horario)) l.push(`Horario de atención: ${limpio(e.horario)}.`);
  if (limpio(e.tiposCliente)) l.push(`Quiénes nos compran: ${limpio(e.tiposCliente)}`);
  l.push('');

  l.push(`PRODUCTOS Y PRECIOS (solo estos; si preguntan otro, di que lo confirma ${quien})`);
  for (const p of productosValidos(e)) {
    const precio = p.cotizar && !limpio(p.precio) ? `precio a cotizar (lo confirma ${quien})` : limpio(p.precio);
    const para = limpio(p.paraQuien) ? ` · para ${limpio(p.paraQuien).toLowerCase()}` : '';
    l.push(`- ${limpio(p.nombre)}: ${precio}${para}`);
  }
  if (limpio(e.comoSeCompra)) l.push(limpio(e.comoSeCompra));
  if (limpio(e.noVendes)) l.push(`NO vendemos / NO hacemos: ${limpio(e.noVendes)}`);
  l.push('');

  l.push('PREGUNTAS FRECUENTES');
  for (const q of faqsCompletas(e)) l.push(`- ${limpio(q.pregunta)} → ${limpio(q.respuesta)}`);
  l.push('');

  l.push('TONO');
  const trato = e.trato === 'usted' ? 'Trato de usted' : e.trato === 'tuteo' ? 'Tuteo' : '';
  const tono = [trato, limpio(e.palabras).toLowerCase()].filter(Boolean).join(', ');
  const emojis = e.emojis === 'si' ? ' Un emoji como máximo.' : e.emojis === 'no' ? ' Sin emojis.' : '';
  l.push(`${tono ? `${tono}. ` : ''}Mensajes de máximo 3 frases.${emojis}`);
  l.push('');

  l.push('REGLAS DE FRENO (nunca las rompas)');
  const reglas: string[] = ['No inventes precios, descuentos ni productos que no estén arriba.'];
  const tiene = (id: string) => e.reglas.includes(id);
  if (tiene('descuentos')) reglas.push(`No ofrezcas descuentos ni promociones; si los piden, deriva a ${quien}.`);
  if (tiene('fechas')) reglas.push('No prometas fechas de entrega distintas a las de las preguntas frecuentes.');
  if (tiene('stock')) reglas.push('No confirmes stock: di que lo revisa una persona y deriva.');
  if (tiene('salud-legal')) reglas.push('No respondas temas de salud ni legales: deriva siempre.');
  if (limpio(e.otraRegla)) reglas.push(`Esto lo decide solo ${quien}: ${limpio(e.otraRegla)}`);
  reglas.push('Si no sabes algo, dilo y deriva. Nunca adivines.');
  const casos = CASOS_DERIVACION.filter((c) => e.derivaCasos.includes(c.id)).map((c) => c.etiqueta.toLowerCase());
  if (tiene('reclamos') && !casos.includes('reclamo')) casos.unshift('reclamo');
  if (casos.length) reglas.push(`${capitalizar(listar(casos.map(plural)))}: deriva siempre.`);
  reglas.forEach((r, i) => l.push(`${i + 1}. ${r}`));
  l.push('');

  l.push('DERIVACIÓN');
  const canal = limpio(e.derivaCanal) ? ` por ${limpio(e.derivaCanal)}` : '';
  l.push(`Derivas a ${quien}${canal}.`);
  const frase = limpio(e.fraseDerivacion) || `Le paso tu mensaje a ${quien}, te escribe a la brevedad.`;
  l.push(`Di: «${frase}» y termina ahí.`);

  return l.join('\n');
}

/** Texto completo para «Descargar»: el esqueleto, su estado y las 5 preguntas trampa. */
export function textoDescarga(e: Esqueleto): string {
  const sem = completitud(e);
  const nombre = { verde: 'completo', amarillo: 'a medias', rojo: 'falta' } as const;
  const raya = '==============================';
  return [
    `EL ESQUELETO DEL ASISTENTE DE WHATSAPP DE ${(limpio(e.negocio) || 'TU NEGOCIO').toUpperCase()}`,
    'Hecho en villelab.com/esqueleto',
    '',
    raya,
    'LA CONFIGURACIÓN DE TU ASISTENTE',
    'Cópiala y pégala como primer mensaje en Claude, ChatGPT o tu chatbot de WhatsApp.',
    raya,
    '',
    generarEsqueleto(e),
    '',
    raya,
    'ESTADO DE TU ESQUELETO',
    raya,
    ...PASOS.map((p) => `Paso ${p.n} · ${p.etiqueta}: ${nombre[sem[p.n]]}`),
    '',
    raya,
    'LAS 5 PREGUNTAS TRAMPA (pruébalo antes de usarlo con clientes)',
    raya,
    ...PREGUNTAS_TRAMPA.map(
      (p, i) => `${i + 1}. «${p.pregunta}»\n   Lo esperado: ${p.esperado}\n   Si falla, refuerza el paso ${p.paso}.`,
    ),
  ].join('\n');
}
