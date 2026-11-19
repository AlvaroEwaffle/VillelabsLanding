'use client';

import { useSyncExternalStore } from 'react';
import { ArrowRight } from 'lucide-react';
import { TALLER } from '@/lib/productos/taller';
import { medirToque } from './medicion';

// Botón al grupo del taller (ver app/lista/page.tsx). EXP-24 (19-nov-2026): hay hasta tres (1 en la pantalla 1, 2 y 3
// en la cola de B); cada toque se mide con su posición («lista · v=B · botón 2 · src=…»).
//
// 19-nov-2026 (audit «nadie llegó al grupo», ~/.claude/marca-alvaro/embudo/2026-11-19-audit-grupo.md): sin redirección
// automática; el botón es el único camino, con un toque real de la persona. El aviso sale con sendBeacon en el mismo
// toque y sin preventDefault: la navegación no espera a nada.
// Dentro del navegador de Instagram/Facebook se muestra la ayuda de los tres puntos bajo cada botón.

// Navegador interno de Instagram o Facebook. En el HTML estático (servidor) es false; en el cliente se lee del UA.
const sinSuscripcion = () => () => {};
function esAppMeta(): boolean {
  try {
    return /Instagram|FBAN|FBAV/.test(navigator.userAgent);
  } catch {
    return false;
  }
}

export default function IrAlGrupo({ boton, nota = false, className = 'mt-4' }: { boton: 1 | 2 | 3; nota?: boolean; className?: string }) {
  const enAppMeta = useSyncExternalStore(sinSuscripcion, esAppMeta, () => false);

  return (
    <div className={className}>
      <a
        href={TALLER.grupo}
        onClick={() => medirToque(boton)}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-base font-semibold text-white transition hover:bg-[#ff5c9f]"
      >
        Entrar al grupo de WhatsApp <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
      {nota && <p className="mt-2 text-center text-sm text-slate-300">Es un grupo de avisos: solo escribo yo. Sales cuando quieras.</p>}
      {enAppMeta && (
        <p className="mt-2 text-center text-sm text-slate-200">
          ¿No se abre WhatsApp? Toca los tres puntos de arriba a la derecha y elige abrir en el navegador.
        </p>
      )}
    </div>
  );
}
