'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TALLER } from '@/lib/productos/taller';
import { medirToque } from './medicion';

// Barra fija inferior con el botón al grupo (EXP-24, solo B: vive dentro de .cola-b, que en A no se muestra). 19-nov-2026,
// pedido de Álvaro tras ver las capturas. Aparece cuando el botón 1 ya quedó arriba del pantallazo y se esconde mientras
// se ve el botón 2 o el 3 (para no mostrar dos botones iguales a la vez) o un formulario de correo abierto, o mientras se
// escribe en un campo (no tapa el botón «Avísame por correo»). Su toque se mide como «botón fijo».
// La cola tiene pb-24 para que la barra nunca tape el final. Escondida: invisible + aria-hidden (no se enfoca con Tab).

export default function BarraFija() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cuadro = 0;
    const medir = () => {
      cuadro = 0;
      const b1 = document.getElementById('boton-1');
      if (!b1) return;
      const pasoElPrimero = b1.getBoundingClientRect().bottom < 0;
      const aLaVista = (el: Element | null) => {
        const r = el?.getBoundingClientRect();
        return r ? r.top < window.innerHeight && r.bottom > 0 : false;
      };
      const otroALaVista =
        aLaVista(document.getElementById('boton-2')) ||
        aLaVista(document.getElementById('boton-3')) ||
        [...document.querySelectorAll('[data-sin-barra]')].some(aLaVista);
      const escribiendo = document.activeElement instanceof HTMLInputElement;
      setVisible(pasoElPrimero && !otroALaVista && !escribiendo);
    };
    const alMover = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir);
    };
    window.addEventListener('scroll', alMover, { passive: true });
    window.addEventListener('resize', alMover);
    document.addEventListener('focusin', alMover);
    document.addEventListener('focusout', alMover);
    // Abrir o cerrar un formulario de correo cambia lo que hay a la vista sin mover la página.
    const obs = new MutationObserver(alMover);
    obs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['data-sin-barra', 'hidden'] });
    medir();
    return () => {
      window.removeEventListener('scroll', alMover);
      window.removeEventListener('resize', alMover);
      document.removeEventListener('focusin', alMover);
      document.removeEventListener('focusout', alMover);
      obs.disconnect();
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0f172a]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-[transform,opacity] duration-200 motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0'
      }`}
    >
      <a
        href={TALLER.grupo}
        tabIndex={visible ? 0 : -1}
        onClick={() => medirToque('fijo')}
        className="mx-auto flex min-h-[52px] max-w-sm cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#FF3D8B] px-3 text-[length:clamp(16px,5.2vw,19px)] font-bold text-white transition-colors duration-200 hover:bg-[#ff5c9f] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
      >
        Entrar al grupo de WhatsApp <ArrowRight className="h-5 w-5" aria-hidden />
      </a>
    </div>
  );
}
