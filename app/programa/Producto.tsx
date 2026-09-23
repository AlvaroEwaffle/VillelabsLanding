'use client';

import { COLOR_RAG } from '@/lib/programa/derivar';
import { producto, type Origen } from '@/lib/programa/metricas';

/** Cada número dice de dónde salió. Un medido y un proyectado no se discuten igual. */
const SELLO: Record<Origen, { texto: string; titulo: string }> = {
  medido: { texto: 'medido', titulo: 'Sale de una medición contra la base, con fecha y fuente.' },
  derivado: { texto: 'derivado', titulo: 'Calculado a partir de dos mediciones reales.' },
  proyectado: { texto: 'proyección', titulo: 'Extrapolación del ritmo observado. Si el ritmo cambia, esto cambia.' },
};

export function Producto() {
  const p = producto();
  const viejo = p.diasDesdeLaMedicion > 7;

  return (
    <section>
      <h2 className="mb-1 font-serif text-2xl text-white">El producto en números</h2>
      <p className="mb-3 text-xs leading-relaxed text-white/40">
        Medido el {p.medidoEl} · {p.fuente}
        {p.diasDesdeLaMedicion > 0 && (
          <span style={{ color: viejo ? COLOR_RAG.a : undefined }}>
            {' '}· hace {p.diasDesdeLaMedicion} días
          </span>
        )}
        . No se interpolan puntos: si nadie midió esta semana, el número correcto es el de la
        semana pasada, con su edad al lado.
      </p>

      {p.saturacion && p.saturacion.diasDesdeHoy < 30 && (
        <div
          className="mb-3 rounded-2xl border p-4"
          style={{ borderColor: `${COLOR_RAG.r}55`, background: `${COLOR_RAG.r}14` }}
        >
          <h3 className="font-serif text-lg" style={{ color: COLOR_RAG.r }}>
            El corpus llena el plan en {p.saturacion.diasDesdeHoy} días
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-white/70">
            Entran {Math.round(p.saturacion.unicosPorDia).toLocaleString('es-CL')} artículos nuevos
            por día, que son {p.saturacion.mbPorDia.toFixed(1)} MB. Al ritmo medido, el M0 se agota
            alrededor del {p.saturacion.fecha}. Es una proyección: si la ingesta baja o si sale{' '}
            <a
              href="https://github.com/AlvaroEwaffle/prtech-ai/issues/47"
              target="_blank"
              rel="noreferrer"
              className="text-[#7ec1e8] underline-offset-2 hover:underline"
            >
              la #47
            </a>{' '}
            —que baja el peso 48% sin borrar nada— la fecha se corre.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {p.grupos.map((g) => (
          <div key={g.titulo}>
            <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
              <h3 className="font-serif text-lg text-white/90">{g.titulo}</h3>
              <span className="text-xs text-white/35">{g.bajada}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {g.numeros.map((num) => {
                const c = COLOR_RAG[num.estado];
                return (
                  <div
                    key={num.clave}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                    style={{ borderLeft: `3px solid ${c}` }}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs text-white/50">{num.titulo}</span>
                      <span
                        className="shrink-0 cursor-help text-[10px] uppercase tracking-wide text-white/25"
                        title={SELLO[num.origen].titulo}
                      >
                        {SELLO[num.origen].texto}
                      </span>
                    </div>
                    <p
                      className="mt-0.5 font-serif text-2xl tabular-nums"
                      style={{ color: c }}
                    >
                      {num.valor}
                    </p>
                    {num.detalle && (
                      <p className="mt-0.5 text-xs leading-relaxed text-white/45">{num.detalle}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-white/30">
        Para agregar una medición hay que medir de verdad: una entrada nueva en{' '}
        <code className="text-white/45">lib/programa/data/prtech.metricas.json</code>, con fecha y
        fuente. Hoy no hay endpoint de estadísticas en el radar — mientras no lo haya, esto depende
        de que alguien corra la consulta a mano.
      </p>
    </section>
  );
}
