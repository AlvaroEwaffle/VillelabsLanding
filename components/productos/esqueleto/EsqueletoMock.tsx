import { EJEMPLO, FAQS_EJEMPLO, REGLAS_EJEMPLO, REGLAS_FRENO } from '@/lib/productos/esqueleto/datos';

/**
 * EXP-09 C · el esqueleto ya completado, antes del título (demostración). Mock estático con el caso de ejemplo
 * Grano Norte (datos.ts), las mismas 4 secciones de la plantilla. En celular cada fila va en una línea para que
 * título, bajada y botón quepan en el primer pantallazo.
 */
const FILAS = [
  { n: 1, etiqueta: 'Tu negocio', valor: `${EJEMPLO.negocio} · ${EJEMPLO.rubro.toLowerCase()}, ${EJEMPLO.zona.split(';')[0]}` },
  { n: 2, etiqueta: 'Preguntas de siempre', valor: `${FAQS_EJEMPLO[0].pregunta} → ${FAQS_EJEMPLO[0].respuesta}` },
  { n: 3, etiqueta: 'Nunca promete', valor: REGLAS_FRENO.filter((r) => REGLAS_EJEMPLO.includes(r.id)).map((r) => r.etiqueta).join(' · ') },
  { n: 4, etiqueta: 'Pasa a una persona', valor: `«${EJEMPLO.fraseDerivacion}»` },
];

export default function EsqueletoMock({ className = '' }: { className?: string }) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#111c33] shadow-[0_20px_60px_-30px_rgba(33,117,161,0.7)] ${className}`}
      aria-label="Ejemplo de un esqueleto completado: el asistente de Grano Norte"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#5fb2dd]">Esqueleto · {EJEMPLO.negocio}</span>
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">Completo</span>
      </div>
      <ol className="divide-y divide-white/5">
        {FILAS.map((f) => (
          <li key={f.n} className="flex items-center gap-3 px-4 py-2 sm:py-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2175a1] font-mono text-xs text-white">{f.n}</span>
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-wide text-slate-400">{f.etiqueta}</span>
              <span className="block truncate text-sm text-slate-100 sm:whitespace-normal">{f.valor}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
