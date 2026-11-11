// Backend de leads de los productos digitales (8-nov-2026).
//
// El sitio es export estático (sin API propia), así que cada lead se registra directo en Fidelidapp,
// en la cuenta «Alvaro Villena» (marca personal), con el mismo endpoint público que ya usan los
// formularios de villelab.com (lib/api/fidelidapp.ts → POST /api/landing/register).
// Ahí quedan como clientes con etiquetas por producto, listos para correos y seguimiento automático
// (regla: las automatizaciones viven en Fidelidapp).
//
// CORS: la API acepta el origen https://villelab.com. En localhost responde 403, así que en desarrollo
// el lead queda en la cola local y se reintenta en producción.
// Si falla la red, el lead no se pierde: queda en una cola en localStorage y se reintenta en la
// siguiente registro exitoso (reintentarPendientes).

import { registrarEvento } from './eventos';
import { eventoPixel } from './pixel';
import { leerUtm } from './utm';

const API = process.env.NEXT_PUBLIC_FIDELIDAPP_API_URL ?? 'https://api.fidelidapp.cl';
/** Cuenta Fidelidapp «Alvaro Villena» (marca personal). Es un id público, como el de los otros formularios del sitio. */
const CUENTA = process.env.NEXT_PUBLIC_FIDELIDAPP_CUENTA_PRODUCTOS ?? '678e4df080622b7c255a9220';
const CLAVE_COLA = 'villelab_leads_pendientes';

/** «curso-lead»: dejó el correo en /curso sin comprar y partió por el esqueleto gratis (9-nov-2026). */
/** «curso-modulo0»: dejó el correo en /curso para ver el módulo 0 gratis (11-nov-2026). */
export type ProductoLead = 'esqueleto' | 'workshop' | 'guia-1' | 'curso' | 'curso-lead' | 'curso-modulo0';

export interface DatosLead {
  nombre: string;
  correo: string;
  whatsapp?: string;
  producto: ProductoLead;
  /** Detalles extra que quedan como etiquetas «clave:valor» (rubro, cargo, etc.). */
  detalles?: Record<string, string | undefined>;
}

type Pendiente = { cuerpo: Record<string, string>; intentos: number; fecha: string };

const limpiarEtiqueta = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);

function armarCuerpo(datos: DatosLead): Record<string, string> {
  const etiquetas = ['villelab-productos', `producto:${datos.producto}`];
  for (const [k, v] of Object.entries(datos.detalles ?? {})) {
    if (v && v.trim()) etiquetas.push(`${limpiarEtiqueta(k)}:${limpiarEtiqueta(v)}`);
  }
  const cuerpo: Record<string, string> = {
    name: datos.nombre.trim(),
    email: datos.correo.trim().toLowerCase(),
    accountId: CUENTA,
    tags: etiquetas.join(','),
  };
  const tel = (datos.whatsapp ?? '').replace(/[^\d+]/g, '');
  if (tel) cuerpo.phone = tel;
  return cuerpo;
}

async function enviar(cuerpo: Record<string, string>): Promise<boolean> {
  try {
    const r = await fetch(`${API}/api/landing/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
      keepalive: true,
    });
    // 409 / «ya existe» también cuenta como registrado: el contacto ya está en la cuenta.
    return r.ok || r.status === 409;
  } catch {
    return false;
  }
}

function leerCola(): Pendiente[] {
  try {
    return JSON.parse(window.localStorage.getItem(CLAVE_COLA) ?? '[]') as Pendiente[];
  } catch {
    return [];
  }
}

function guardarCola(cola: Pendiente[]) {
  try {
    if (cola.length) window.localStorage.setItem(CLAVE_COLA, JSON.stringify(cola.slice(-20)));
    else window.localStorage.removeItem(CLAVE_COLA);
  } catch {
    // Sin almacenamiento: no hay nada más que hacer.
  }
}

/** Registra un lead en Fidelidapp. Nunca lanza: si falla, lo deja en la cola local para reintentar. */
export async function registrarLead(datos: DatosLead): Promise<boolean> {
  if (typeof window === 'undefined' || !datos.correo?.trim()) return false;
  // Los UTM de la visita (lib/productos/utm.ts) viajan en los detalles de todo lead, para atribuir por canal.
  datos = { ...datos, detalles: { ...leerUtm(), ...datos.detalles } };
  const cuerpo = armarCuerpo(datos);
  // Aviso al Slack de Villelabs (en el hilo de la visita), salga o no el registro en Fidelidapp.
  registrarEvento('lead', { detalle: datos.producto, nombre: datos.nombre, correo: datos.correo, datos: datos.detalles ?? {} });
  eventoPixel('Lead', { content_name: datos.producto });
  const ok = await enviar(cuerpo);
  if (!ok) guardarCola([...leerCola(), { cuerpo, intentos: 1, fecha: new Date().toISOString() }]);
  // Si la red respondió, aprovecha de despachar lo que haya quedado pendiente de antes.
  else void reintentarPendientes();
  return ok;
}

/** Reintenta los leads que no salieron (se llama al cargar las páginas de producto). */
export async function reintentarPendientes(): Promise<void> {
  if (typeof window === 'undefined') return;
  const cola = leerCola();
  if (!cola.length) return;
  const quedan: Pendiente[] = [];
  for (const p of cola) {
    const ok = await enviar(p.cuerpo);
    if (!ok && p.intentos < 5) quedan.push({ ...p, intentos: p.intentos + 1 });
  }
  guardarCola(quedan);
}
