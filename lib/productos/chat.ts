// Preguntas listas del chat del chibi (12-nov-2026). Respuestas cortas sacadas del contenido real de cada página
// (curso.ts, venta.ts de la guía, EsqueletoApp): si cambia un precio, un plazo o la garantía allá, cambiarlo aquí.
// Nada de promesas que la página no haga.

import { PRECIO_FUNDADOR, PRECIO_NORMAL, PRECIO_CURSO } from './curso/curso';
import { PRECIO_GUIA } from './guia/venta';
import { NOTA_IVA, PRECIOS_AGENTES, uf } from '../precios';

export type Pregunta = { p: string; r: string };

const clp = (n: number) => `$${n.toLocaleString('es-CL')}`;

const CURSO: Pregunta[] = [
  {
    p: '¿Cuánto cuesta?',
    r: PRECIO_FUNDADOR
      ? `${clp(PRECIO_FUNDADOR)} precio de lanzamiento. Pago único o en cuotas en Hotmart, con ${PRECIO_CURSO.garantiaDias} días de garantía.`
      : `${clp(PRECIO_NORMAL)}, pago único o en cuotas en Hotmart, con ${PRECIO_CURSO.garantiaDias} días de garantía.`,
  },
  {
    p: '¿Qué recibo al comprar?',
    r: 'Los 8 módulos completos desde el primer día: 38 lecciones cortas con su ejercicio, 34 prompts listos para la IA, la planilla del sistema con las fórmulas listas y, en el módulo 7, un agente de IA que trabaja con tu planilla: te arma los pedidos de WhatsApp y la cobranza del lunes, y tú revisas y envías. Avanzas a tu ritmo.',
  },
  {
    p: '¿Cuánto tiempo necesito?',
    r: 'Menos de 2 horas de contenido (cerca de 1 h 45 de lecciones cortas) y unas 7 a 8 horas de práctica con tu negocio, a tu ritmo. Los módulos no se cierran: retomas cuando puedas.',
  },
  {
    p: '¿Sirve si no sé de tecnología?',
    r: 'Sí. Todo se arma en Google Sheets (gratis) o en Excel, sin programar ni instalar nada. Cada módulo trae prompts listos para copiar en ChatGPT o Claude y armar tu hoja; no necesitas saber de IA. El agente del módulo 7 lo probamos en un proyecto de Claude con cuenta pagada y la planilla en Google Sheets.',
  },
];

const GUIA: Pregunta[] = [
  {
    p: '¿Cuánto cuesta?',
    r: `${PRECIO_GUIA.texto} en un solo pago o en ${PRECIO_GUIA.cuotas}, en el pago seguro de Hotmart, con ${PRECIO_GUIA.garantiaDias} días de garantía.`,
  },
  {
    p: '¿Qué incluye?',
    r: 'Una guía interactiva (diagnóstico + 6 partes), tu primer CRM en Google Sheets o Excel, tus mensajes listos para escribirle a cada posible cliente uno a uno, y el certificado. Toma 2,5 a 3 horas, más 5 días de prueba real.',
  },
  {
    p: '¿Y si no me sirve?',
    r: `Tienes ${PRECIO_GUIA.garantiaDias} días de garantía: si sientes que no es para ti, pides la devolución desde Hotmart y te devuelven el total.`,
  },
  {
    p: '¿Sirve si no sé de tecnología?',
    r: 'Sí. La planilla la armas dentro de la guía y la bajas en Excel o la pasas a Google Sheets. No hay nada que instalar.',
  },
];

const ESQUELETO: Pregunta[] = [
  {
    p: '¿Es gratis?',
    r: 'Sí, el esqueleto es gratis y sin tarjeta. Lo llenas aquí mismo en unos 15 minutos.',
  },
  {
    p: '¿Qué me llevo?',
    r: 'El esqueleto de tu primer asistente de WhatsApp: qué responde, qué nunca promete y cuándo te pasa la conversación, más 5 preguntas trampa para probarlo antes de usarlo con clientes.',
  },
  {
    p: '¿Dónde lo uso?',
    r: 'Lo pegas en Claude o ChatGPT (gratis) y lo pruebas ahí. Después lo puedes conectar a tu WhatsApp.',
  },
  {
    p: '¿Sirve si no sé de tecnología?',
    r: 'Sí. Son preguntas sobre tu negocio y cada campo trae un ejemplo de un negocio inventado. No hay que programar nada.',
  },
];

// /cotizador (borrador 12-nov-2026). Precios desde lib/precios.ts (espejo del price book de Villelabs).
const COTIZADOR: Pregunta[] = [
  {
    p: '¿Cuánto cuesta?',
    r: `La reunión de 30 minutos es gratis. La implementación parte desde ${uf(PRECIOS_AGENTES.implementacionUF)} y el mantenimiento es de ${uf(PRECIOS_AGENTES.mantenimientoUF)} al mes si ya tienes licencia de Claude, o ${uf(PRECIOS_AGENTES.mantenimientoConLicenciaUF)} al mes con la licencia incluida. ${NOTA_IVA.es}`,
  },
  {
    p: '¿Qué es un agente?',
    r: 'Un asistente que hace una tarea completa por ti todos los días: revisa, ordena, redacta y te avisa. Lo dejamos configurado para que lo que compromete plata, alcance o fechas te lo pregunte antes.',
  },
  {
    p: '¿Tengo que saber de tecnología?',
    r: 'No. Álvaro lo arma contigo y lo deja funcionando en una tarea real de tu negocio.',
  },
  {
    p: '¿Qué pasa en la reunión?',
    r: 'Son 30 minutos por videollamada con Álvaro. Revisan juntos en qué se te va el tiempo y Álvaro te dice con qué agente partiría, o si un agente no tiene sentido para ti. Sin compromiso.',
  },
];

export const PREGUNTAS_CHAT: Record<string, Pregunta[]> = {
  '/cotizador': COTIZADOR,
  '/curso': CURSO,
  '/guia': GUIA,
  '/esqueleto': ESQUELETO,
};

/** Rutas donde el chat reemplaza al botón de WhatsApp. */
export function rutaConChat(pathname: string | null): string | null {
  const r = (pathname || '').replace(/\/+$/, '') || '/';
  return r in PREGUNTAS_CHAT ? r : null;
}
