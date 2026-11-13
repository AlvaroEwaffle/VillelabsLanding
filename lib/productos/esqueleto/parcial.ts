// Correo a medias en /esqueleto (EXP-09, 10-nov-2026). Pedido de Álvaro: «si alguien va llenando pasos debe
// guardarse la data».
//
// Nada sale antes de que exista un correo válido. Desde ahí, al salir de un campo (blur) o al cambiar de paso se
// programa un envío con espera (DEMORA): solo sale el último. Si la persona cierra o cambia de pestaña con un envío
// pendiente, se despacha con sendBeacon. El envío real del formulario cancela lo pendiente.
//
// Por qué no va a Fidelidapp: el registro público (/api/landing/register) solo crea contactos y responde 400 si el
// correo ya está en la cuenta, así que un contacto creado con la etiqueta `parcial` no se podría actualizar ni
// limpiar con el envío real (quedaría sin las etiquetas del esqueleto). Por eso el correo a medias va al hilo de
// Slack de la visita (correo enmascarado; datos completos en la metadata del mensaje, ver functions/api/evento.ts)
// y el contacto en Fidelidapp lo crea, una sola vez, el envío real. scripts/parciales.mjs los lista.

import { registrarParcial, type DatosParcial } from '@/lib/productos/eventos';
import { leerUtm } from '@/lib/productos/utm';

const DEMORA = 1500;
export const correoValido = (c: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.trim());

type Campos = { nombre: string; correo: string; whatsapp: string };

let campos: Campos | null = null; // null hasta que hay un correo válido
let paso = 0;
let timer: ReturnType<typeof setTimeout> | null = null;
let ultimoEnviado = '';
let escuchando = false;

function datos(): DatosParcial | null {
  if (!campos || !correoValido(campos.correo)) return null;
  const utm = leerUtm();
  return {
    nombre: campos.nombre.trim().slice(0, 60),
    correo: campos.correo.trim().toLowerCase().slice(0, 120),
    whatsapp: campos.whatsapp.replace(/[^\d+]/g, '').slice(0, 20),
    paso,
    producto: 'esqueleto',
    utm: { utm_source: utm.utm_source, utm_medium: utm.utm_medium, utm_campaign: utm.utm_campaign },
  };
}

function enviar(alSalir = false) {
  if (timer) clearTimeout(timer);
  timer = null;
  const d = datos();
  if (!d) return;
  const firma = JSON.stringify(d);
  if (firma === ultimoEnviado) return; // nada cambió desde el último envío
  ultimoEnviado = firma;
  registrarParcial(d, alSalir);
}

function alOcultar() {
  if (timer && document.visibilityState === 'hidden') enviar(true);
}

function escuchar() {
  if (escuchando || typeof window === 'undefined') return;
  escuchando = true;
  document.addEventListener('visibilitychange', alOcultar);
  window.addEventListener('pagehide', () => timer && enviar(true));
}

function programar() {
  if (!campos || !correoValido(campos.correo)) return;
  escuchar();
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => enviar(), DEMORA);
}

/** Al salir de un campo del formulario de datos. Si el correo todavía no es válido, no hace nada. */
export function campoParcial(c: Campos, pasoActual: number) {
  if (!correoValido(c.correo) && !campos) return;
  // Si borró el correo después de uno válido, se conserva el último válido.
  campos = correoValido(c.correo) ? { ...c } : { ...c, correo: campos!.correo };
  paso = pasoActual;
  programar();
}

/** Al cambiar de paso: solo si ya hay un correo válido de esta visita. */
export function pasoParcial(pasoActual: number) {
  if (!campos || pasoActual === paso) return;
  paso = pasoActual;
  programar();
}

/** El formulario se envió de verdad: lo pendiente ya no sirve (el registro marca el parcial como completado). */
export function cancelarParcial() {
  if (timer) clearTimeout(timer);
  timer = null;
  campos = null;
}
