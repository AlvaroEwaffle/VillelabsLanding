// Certificado de la Guía 1: se dibuja en un canvas en el navegador y se baja como PNG.
import { registrarLead } from '@/lib/productos/leads';

export type DatosCertificado = { nombre: string; correo: string; cargo: string };

const KEY = 'vl-guia-prospeccion-certificado';

/**
 * Registra a quien descargó el certificado: en el navegador (para no volver a pedir los datos) y en
 * Fidelidapp como alumno de la Guía 1 (etiquetas producto:guia-1, certificado y cargo). Ver lib/productos/leads.ts.
 */
export function registrarCertificado(datos: DatosCertificado) {
  const registro = { ...datos, guia: 'guia-1-prospeccion', fecha: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(registro));
  } catch {
    // Sin almacenamiento: no bloquea la descarga.
  }
  void registrarLead({
    nombre: datos.nombre,
    correo: datos.correo,
    producto: 'guia-1',
    detalles: { estado: 'certificado', cargo: datos.cargo },
  });
  return registro;
}

export function leerCertificado(): DatosCertificado | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DatosCertificado) : null;
  } catch {
    return null;
  }
}

function fuenteSerif() {
  // next/font genera un nombre de familia con hash: lo leemos de un elemento con font-serif.
  const el = document.querySelector('.font-serif');
  return el ? getComputedStyle(el).fontFamily : 'Georgia, serif';
}

function ajustar(ctx: CanvasRenderingContext2D, texto: string, maxW: number, base: number, familia: string, peso = '400') {
  let size = base;
  do {
    ctx.font = `${peso} ${size}px ${familia}`;
    if (ctx.measureText(texto).width <= maxW) break;
    size -= 2;
  } while (size > 18);
}

export async function generarCertificadoPNG(datos: DatosCertificado): Promise<Blob> {
  const W = 2000;
  const H = 1414;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d')!;
  const serif = fuenteSerif();
  const sans = getComputedStyle(document.body).fontFamily || 'Arial, sans-serif';
  if (document.fonts?.ready) await document.fonts.ready;

  // Fondo
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#0f172a');
  g.addColorStop(1, '#0c2c44');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // Marco
  ctx.strokeStyle = '#5fb2dd';
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 60, W - 120, H - 120);
  ctx.strokeStyle = 'rgba(95,178,221,0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(84, 84, W - 168, H - 168);
  // Grano decorativo
  ctx.fillStyle = 'rgba(33,117,161,0.35)';
  ctx.beginPath();
  ctx.ellipse(W - 260, 260, 90, 130, Math.PI / 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(W - 320, 170);
  ctx.quadraticCurveTo(W - 240, 260, W - 200, 350);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#5fb2dd';
  ctx.font = `600 34px ${sans}`;
  ctx.fillText('VILLELAB', W / 2, 220);
  ctx.fillStyle = '#ffffff';
  ctx.font = `400 92px ${serif}`;
  ctx.fillText('Certificado', W / 2, 360);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = `400 36px ${sans}`;
  ctx.fillText('Se certifica que', W / 2, 470);

  ctx.fillStyle = '#ffffff';
  ajustar(ctx, datos.nombre, W - 400, 104, serif, '600');
  ctx.fillText(datos.nombre, W / 2, 610);
  ctx.strokeStyle = '#2175a1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 520, 650);
  ctx.lineTo(W / 2 + 520, 650);
  ctx.stroke();
  if (datos.cargo) {
    ctx.fillStyle = '#94a3b8';
    ajustar(ctx, datos.cargo, W - 500, 38, sans);
    ctx.fillText(datos.cargo, W / 2, 710);
  }

  ctx.fillStyle = '#cbd5e1';
  ctx.font = `400 38px ${sans}`;
  ctx.fillText('completó', W / 2, 800);
  ctx.fillStyle = '#ffffff';
  ctx.font = `400 54px ${serif}`;
  ctx.fillText('Guía 1 · Ventas y prospección · 4 horas', W / 2, 880);
  ctx.fillStyle = '#94a3b8';
  ctx.font = `400 32px ${sans}`;
  ctx.fillText('«Tu lista de prospectos y el primer mensaje, cada mañana»', W / 2, 940);

  const fecha = new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  // Fecha (izquierda) y firma (derecha)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `400 36px ${sans}`;
  ctx.fillText(fecha, 560, 1160);
  ctx.fillStyle = '#94a3b8';
  ctx.font = `400 28px ${sans}`;
  ctx.fillText('Fecha', 560, 1220);

  ctx.fillStyle = '#ffffff';
  ctx.font = `italic 400 60px ${serif}`;
  ctx.fillText('Álvaro Villena', W - 560, 1150);
  ctx.strokeStyle = '#5fb2dd';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W - 800, 1180);
  ctx.lineTo(W - 320, 1180);
  ctx.stroke();
  ctx.fillStyle = '#94a3b8';
  ctx.font = `400 28px ${sans}`;
  ctx.fillText('Álvaro Villena, Villelab', W - 560, 1220);

  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('No se pudo generar'))), 'image/png'));
}
