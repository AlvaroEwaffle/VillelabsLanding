// Guía 1 como producto vivo (pedido de Álvaro, 8-nov-2026): se revisa y actualiza, y cada cambio
// queda aquí. La primera entrada es la versión vigente; la portada de la guía y la página de venta
// muestran su fecha. Al publicar un cambio: agregar una entrada arriba (fecha ISO + 1-3 cambios).

export type VersionGuia = { version: string; fecha: string; cambios: string[] };

export const VERSIONES_GUIA: VersionGuia[] = [
  {
    version: '1.2',
    fecha: '2026-11-08',
    cambios: [
      'Lenguaje más claro: hablamos de clientes nuevos y de tu primer CRM en Google Sheets o Excel.',
      'WhatsApp solo con quien ya te conoce o te dio su número; a los demás, por correo, LinkedIn o Instagram.',
      'Nueva sección «En qué se basa esta guía», y la prueba de 5 días te pide comparar cuando juntes 40 a 50 mensajes.',
    ],
  },
  {
    version: '1.1',
    fecha: '2026-11-08',
    cambios: [
      'Video de bienvenida en la portada.',
      'Acceso con código personal desde tu área de miembros en Hotmart.',
    ],
  },
  {
    version: '1.0',
    fecha: '2026-11-07',
    cambios: ['Lanzamiento: diagnóstico con ruta, 6 partes, planilla, mensajes y certificado.'],
  },
];

export const VERSION_ACTUAL = VERSIONES_GUIA[0];

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** '2026-11-08' → '8 de noviembre de 2026' (sin depender de la zona horaria del navegador). */
export function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}
