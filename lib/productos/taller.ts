// Taller en vivo del miércoles 2-dic-2026, 17:00 de Chile (18-nov-2026, ~/.claude/marca-alvaro/ESTRATEGIA-2DIC.md).
// Todo el contenido cierra en el grupo de WhatsApp del taller. La puerta medida es villelab.com/lista?src=<origen>
// (app/lista): registra el clic (Slack «🧭 lista · src=…» + GA4 lista_click) y redirige al grupo.

export const TALLER = {
  /** Link del grupo de WhatsApp del taller. Cambiarlo aquí cambia /lista y todo lo que apunta al grupo. */
  grupo: 'https://chat.whatsapp.com/FiBrARNGv1P5BxVDjGpHJf',
  /**
   * Franja «¿Prefieres armarlo en vivo?» en la portada y el resultado de /esqueleto. Es un cambio común a A y B de EXP-19:
   * se enciende en un deploy (true) y se apaga en otro (false). Con false, `?taller=1` la muestra solo a quien trae el
   * parámetro (QA o vista previa), sin tocar a las demás visitas.
   * 18-nov-2026 17:00 (corte del experimentador): true. Se enciende tras cerrar EXP-19, como pidió el revisor el 18-nov 09:50;
   * común a A y B de EXP-22. Corte del analista: si al vie 20 12:00 hay ≥100 reales expuestas y 0 clics a la lista, vuelve a false.
   */
  franjaEsqueleto: true,
} as const;

/** `src` limpio para /lista: minúsculas, letras, números y guiones, máx. 60. Vacío → «directo». */
export function srcLista(valor: string | null | undefined): string {
  const s = (valor ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  return s || 'directo';
}
