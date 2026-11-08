import { esqueletoVacio, type Esqueleto, type RespuestaId } from './datos';
import { registrarLead } from '@/lib/productos/leads';

// Guardado local del avance y del lead. Sitio estático (output: 'export'): no hay backend todavía.
const CLAVE_AVANCE = 'villelab:esqueleto:avance:v1';
const CLAVE_LEAD = 'villelab:esqueleto:lead:v1';

export interface Avance {
  esqueleto: Esqueleto;
  pantalla: number; // 0 = entrada, 1..N = secuencia (identificación + pasos), N+1 = resultado
  respuestas: Record<string, RespuestaId>;
  terminadoEn: number | null; // primer ingreso al resultado (precio de lanzamiento por 48 h)
}

export interface Lead {
  nombre: string;
  correo: string;
  whatsapp: string;
  fecha: string;
}

function leer<T>(clave: string): T | null {
  try {
    const raw = window.localStorage.getItem(clave);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function escribir(clave: string, valor: unknown) {
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Modo privado o almacenamiento bloqueado: sigue funcionando sin guardar.
  }
}

export function cargarAvance(maxPantalla: number): Avance | null {
  const a = leer<Partial<Avance>>(CLAVE_AVANCE);
  if (!a || !a.esqueleto) return null;
  return {
    esqueleto: { ...esqueletoVacio(), ...a.esqueleto },
    pantalla: typeof a.pantalla === 'number' ? Math.min(Math.max(a.pantalla, 0), maxPantalla) : 0,
    respuestas: a.respuestas ?? {},
    terminadoEn: typeof a.terminadoEn === 'number' ? a.terminadoEn : null,
  };
}

export const guardarAvance = (a: Avance) => escribir(CLAVE_AVANCE, a);

export function borrarAvance() {
  try {
    window.localStorage.removeItem(CLAVE_AVANCE);
  } catch {
    // nada
  }
}

export const cargarLead = () => leer<Lead>(CLAVE_LEAD);
export const guardarLead = (lead: Lead) => escribir(CLAVE_LEAD, lead);

/**
 * Envía el lead a Fidelidapp (cuenta «Alvaro Villena») con el rubro del esqueleto como etiqueta.
 * Ver lib/productos/leads.ts. Además queda en localStorage (guardarLead) para no volver a pedirlo.
 * Pendiente: el correo día 0 con el esqueleto se arma como automatización en Fidelidapp.
 */
export async function enviarLead(lead: Lead, esqueleto: Esqueleto): Promise<void> {
  await registrarLead({
    nombre: lead.nombre,
    correo: lead.correo,
    whatsapp: lead.whatsapp,
    producto: 'esqueleto',
    detalles: { rubro: esqueleto.rubro, negocio: esqueleto.negocio },
  });
}

// --- Eventos dataLayer (mismo patrón que lib/ga4.ts). Los clics del cierre (esqueleto_click_guia/grabacion/workshop) los emite SiguientePaso. ---
function pushEvento(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

export const eventos = {
  inicio: () => pushEvento('esqueleto_inicio'),
  paso: (numero: number) => pushEvento('esqueleto_paso', { esqueleto_paso_numero: numero }),
  completo: () => pushEvento('esqueleto_completo'),
};
