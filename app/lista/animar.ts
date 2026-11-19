// Estilos de las animaciones de entrada de /lista (19-nov-2026, audio de Álvaro 20:06). Van en el <style> en línea de
// app/lista/page.tsx (no en globals.css). El contenido se ve por defecto: la clase `lista-oculto` solo la pone el JS
// (AnimarLista.tsx), y solo a lo que todavía está bajo el pantallazo. Sin animación con prefers-reduced-motion ni al imprimir.
export const CSS_ANIMAR =
  '.lista-anim{transition:opacity 420ms cubic-bezier(.2,.7,.2,1),transform 420ms cubic-bezier(.2,.7,.2,1);transition-delay:var(--lista-retardo,0ms)}' +
  '.lista-oculto{opacity:0;transform:translate3d(0,14px,0)}' +
  '@media (prefers-reduced-motion:reduce){.lista-oculto{opacity:1;transform:none}.lista-anim{transition:none}}' +
  '@media print{.lista-oculto{opacity:1!important;transform:none!important}}';
