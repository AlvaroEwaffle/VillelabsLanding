/*
 * /curso/bonos — «Tus bonos» (pack del curso, 13-nov-2026). Solo compradores: el middleware exige la cookie del curso.
 * Entrega automática, sin pasos manuales de nadie:
 *   1. La planilla lista: archivo estático /curso/bonos/planilla-lista.xlsx (mismo candado), generado desde
 *      lib/productos/curso/plantilla.ts con `lista: true` (scripts/curso/planilla-lista.mts).
 *   2. La Guía «Tus próximos 20 clientes»: /curso/bonos/guia deja la cookie de la Guía derivada de la del curso
 *      (functions/_lib/pack.ts) y entra a /guia/prospeccion. En otro navegador: /guia/acceso con el código del curso.
 */
import Link from 'next/link';
import { ArrowRight, BookOpen, Download, FileSpreadsheet, Gift } from 'lucide-react';
import { PRECIO_GUIA } from '@/lib/productos/guia/venta';
import { Kicker } from './piezas';

export default function BonosContent() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <Kicker>Curso · Construye con IA tu CRM y ERP</Kicker>
      <h1 className="mt-3 flex items-center gap-3 font-serif text-4xl text-white sm:text-5xl">
        <Gift className="h-9 w-9 shrink-0 text-[#FF3D8B]" aria-hidden /> Tus bonos
      </h1>
      <p className="mt-4 text-slate-300">
        Vienen incluidos en tu curso, sin pagar nada más: la planilla lista para usarla hoy y la Guía «Tus próximos 20 clientes».
      </p>

      {/* Bono 1 · La planilla lista */}
      <section aria-labelledby="bono-planilla" className="mt-10 rounded-3xl border border-[#2175a1]/50 bg-gradient-to-br from-[#2175a1]/20 via-slate-900 to-slate-950 p-5 sm:p-7">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">
          <FileSpreadsheet className="h-4 w-4" aria-hidden /> Bono 1 · Excel · Google Sheets
        </p>
        <h2 id="bono-planilla" className="mt-2 font-serif text-2xl text-white sm:text-3xl">La planilla lista</h2>
        <p className="mt-3 text-slate-300">
          La planilla completa del curso, en blanco y con instrucciones adentro, para usarla sola desde hoy aunque no hayas visto las lecciones: las 9 hojas conectadas (Inicio, Clientes, Origen, Productos, Pedidos, Atención, Cobranza, Caja y Tablero) y el Tablero que se calcula solo.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          <li>· En la hoja Inicio, 5 pasos para partir y cómo leerla.</li>
          <li>· Las columnas que se calculan solas van en gris, para que no las borres sin querer.</li>
          <li>· Filtros en cada hoja y avisos si una fecha o un monto quedan mal escritos.</li>
        </ul>
        <a
          href="/curso/bonos/planilla-lista.xlsx"
          download="planilla-lista.xlsx"
          className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#2175a1] px-6 text-sm font-semibold text-white transition hover:bg-[#2a86b6] sm:w-auto"
        >
          <Download className="h-4 w-4" aria-hidden /> Descargar la planilla lista (Excel)
        </a>
        <p className="mt-4 text-xs text-slate-400">
          Para Google Sheets: súbela a Google Drive, ábrela con Google Sheets y revisa en Archivo › Configuración que la configuración regional sea Chile y la zona horaria Santiago.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          ¿Ya empezaste la planilla del módulo 0? Es la misma, con los datos de tu ficha: sigue con una sola, la que prefieras. Las hojas y las columnas son las mismas, así que el curso funciona igual con cualquiera.
        </p>
      </section>

      {/* Bono 2 · La Guía */}
      <section aria-labelledby="bono-guia" className="mt-6 rounded-3xl border border-[#FF3D8B]/40 bg-gradient-to-br from-[#FF3D8B]/10 via-slate-900 to-slate-950 p-5 sm:p-7">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#ff8fbd]">
          <BookOpen className="h-4 w-4" aria-hidden /> Bono 2 · Guía interactiva
        </p>
        <h2 id="bono-guia" className="mt-2 font-serif text-2xl text-white sm:text-3xl">La Guía «Tus próximos 20 clientes»</h2>
        <p className="mt-3 text-slate-300">
          En una tarde armas tu lista de 20 posibles clientes, el primer mensaje para cada uno y los seguimientos con fecha. Se vende sola a {PRECIO_GUIA.texto} CLP; con tu curso viene incluida.
        </p>
        <a
          href="/curso/bonos/guia"
          className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white transition hover:bg-[#ff5c9f] sm:w-auto"
        >
          Abrir la Guía <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
        <p className="mt-4 text-xs text-slate-400">
          Queda abierta en este navegador. En otro celular o computador, entra a villelab.com/guia/acceso y escribe el mismo código de tu curso.
        </p>
      </section>

      <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap">
        <Link href="/curso/modulo-0" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 px-5 text-sm text-slate-300 hover:border-white/30">
          Ir al módulo 0
        </Link>
        <Link href="/curso/modulo-1" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 px-5 text-sm text-slate-300 hover:border-white/30">
          Ir al módulo 1
        </Link>
      </div>
      <p className="mt-6 text-sm text-slate-400">¿Problemas para descargar o entrar? Escríbeme por WhatsApp al +56 9 2011 5198.</p>
    </main>
  );
}
