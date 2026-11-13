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
      ? `${clp(PRECIO_FUNDADOR)} precio de preventa. Pago único o en cuotas en Hotmart, con ${PRECIO_CURSO.garantiaDias} días de garantía.`
      : `${clp(PRECIO_NORMAL)}, pago único o en cuotas en Hotmart, con ${PRECIO_CURSO.garantiaDias} días de garantía.`,
  },
  {
    p: '¿Qué recibo al comprar?',
    r: 'El módulo 0 al tiro: el mapa de tu sistema, el diagnóstico con semáforo, la planilla base y tus reglas de freno. Después se libera un módulo por semana hasta completar los 7.',
  },
  {
    p: '¿Cuánto tiempo necesito?',
    r: 'Entre 2 y 3 horas a la semana mientras haces el curso: unos 45 minutos de lecciones y el resto para llenar la hoja con tu negocio. Si te atrasas no pasa nada, los módulos quedan disponibles.',
  },
  {
    p: '¿Sirve si no sé de tecnología?',
    r: 'Sí. Todo se arma en Google Sheets (gratis) o en Excel, sin programar ni instalar nada. Cada módulo trae prompts listos para que ChatGPT, Claude o Gemini te ayuden a armar tu hoja (los recibes en tu área de miembros); no necesitas saber de IA.',
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
    r: 'Sí. Son preguntas sobre tu negocio, con un ejemplo real armado en cada campo. No hay que programar nada.',
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
