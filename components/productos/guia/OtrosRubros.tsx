'use client';

import { useState } from 'react';

/*
 * El mismo primer mensaje de tres frases en otros rubros (análisis UX «Rodrigo», 8-nov-2026): con un solo caso
 * (la tostaduría) el dueño piensa «mi rubro es distinto». Son ejemplos de mensaje, no testimonios.
 */
const RUBROS = [
  {
    id: 'mantencion',
    etiqueta: 'Mantención',
    texto:
      'Hola Paula, vi que se cambiaron a la oficina nueva de Providencia, ¡felicitaciones! Hacemos la mantención de climatización de oficinas a pocas cuadras, así el primer verano no los pilla con el aire fallando. ¿Le acomoda que pase 15 minutos esta semana a revisar los equipos?',
  },
  {
    id: 'distribuidora',
    etiqueta: 'Distribuidora',
    texto:
      'Hola Jorge, vi que el colegio partió con jornada extendida este año. Distribuimos insumos de aseo a colegios de la comuna con despacho programado cada mes, así no tienen que pedir de urgencia. ¿Le sirve que le mande la lista de precios para colegios?',
  },
  {
    id: 'agencia',
    etiqueta: 'Agencia',
    texto:
      'Hola Fernanda, vi el lanzamiento de tu nueva línea de velas en Instagram, quedó muy bonito. Ayudamos a tiendas como la tuya a que esas publicaciones terminen en consultas por WhatsApp. ¿Te muestro en 15 minutos dos ideas para tu próxima campaña?',
  },
] as const;

export default function OtrosRubros() {
  const [activo, setActivo] = useState(0);
  const r = RUBROS[activo];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-sm text-slate-300">¿Tu rubro es distinto? El mismo mensaje en otros negocios:</p>
      <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Ejemplos por rubro">
        {RUBROS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={`rubro-tab-${x.id}`}
            aria-selected={activo === i}
            aria-controls="rubro-panel"
            onClick={() => setActivo(i)}
            className={`min-h-[44px] rounded-full border px-4 text-sm transition ${
              activo === i ? 'border-[#5fb2dd] bg-[#2175a1]/25 text-white' : 'border-white/15 text-slate-300 hover:border-white/30'
            }`}
          >
            {x.etiqueta}
          </button>
        ))}
      </div>
      <p id="rubro-panel" role="tabpanel" aria-labelledby={`rubro-tab-${r.id}`} className="mt-4 text-sm text-slate-100">
        {r.texto}
      </p>
    </div>
  );
}
