// /cotizador: pasos al hilo de Slack de la visita (tipo «paso», functions/api/evento.ts), eventos al dataLayer (GA4
// vía GTM) y el lead de «Mándame esta cotización».
//
// Lead con correo → registrarLead (Fidelidapp, cuenta «Alvaro Villena», producto cotizador-agentes + aviso a Slack +
// Lead al píxel), igual que /esqueleto. Lead solo con WhatsApp → Slack + píxel, sin Fidelidapp: /api/landing/register
// exige correo (landingRoutes.js, email.toLowerCase()).

import { registrarEvento } from '../eventos';
import { registrarLead } from '../leads';
import { eventoPixel } from '../pixel';
import { leerUtm } from '../utm';

export function paso(detalle: string, evento?: string, params?: Record<string, unknown>) {
  registrarEvento('paso', { detalle: `cotizador · ${detalle}` });
  if (evento && typeof window !== 'undefined') {
    try {
      const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer ?? [];
      w.dataLayer.push({ event: evento, ...params });
    } catch {
      /* nunca rompe la página */
    }
  }
}

export interface DatosCotizacion {
  nombre: string;
  correo: string;
  whatsapp: string;
  detalles: Record<string, string>;
}

export async function enviarCotizacion(d: DatosCotizacion): Promise<boolean> {
  paso('pidió que le manden la cotización', 'cotizador_lead');
  if (d.correo.trim()) {
    await registrarLead({ nombre: d.nombre, correo: d.correo, whatsapp: d.whatsapp, producto: 'cotizador-agentes', detalles: d.detalles });
    // Si Fidelidapp no responde, el lead queda en la cola local y el aviso a Slack ya salió: para la persona está listo.
    return true;
  }
  registrarEvento('lead', {
    detalle: 'cotizador-agentes',
    nombre: d.nombre,
    correo: `WhatsApp ${d.whatsapp.replace(/[^\d+]/g, '')}`,
    datos: { ...leerUtm(), ...d.detalles },
  });
  eventoPixel('Lead', { content_name: 'cotizador-agentes' });
  return true;
}
