// Ilustraciones propias del caso Grano Norte (SVG, paleta Villelab). Sin fotos de personas reales.

const C = {
  noche: '#0f172a',
  noche2: '#16213a',
  azul: '#2175a1',
  celeste: '#5fb2dd',
  claro: '#cfe8f5',
  cafe: '#8a5a3c',
};

export function Tostaduria({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 200" className={className} role="img" aria-label="La tostaduría Grano Norte en los cerros de Valparaíso">
      <rect width="320" height="200" fill={C.noche2} />
      {/* cerros y casas */}
      <path d="M0 120 Q60 70 130 95 T260 80 T320 90 V200 H0Z" fill="#1d3352" />
      {[
        [20, 98, 18, 16, C.celeste],
        [44, 90, 16, 20, C.azul],
        [66, 96, 20, 14, C.claro],
        [210, 84, 18, 18, C.celeste],
        [232, 78, 16, 22, C.claro],
        [254, 86, 20, 16, C.azul],
        [282, 82, 18, 18, C.celeste],
      ].map(([x, y, w, h, f], i) => (
        <g key={i}>
          <rect x={x as number} y={y as number} width={w as number} height={h as number} fill={f as string} opacity="0.75" />
          <rect x={(x as number) + 4} y={(y as number) + 4} width="4" height="4" fill={C.noche} opacity="0.6" />
        </g>
      ))}
      <path d="M0 160 H320 V200 H0Z" fill="#12263f" />
      {/* local */}
      <rect x="92" y="88" width="136" height="84" rx="4" fill="#24406a" />
      <rect x="86" y="80" width="148" height="14" rx="3" fill={C.noche} />
      <text x="160" y="91" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="2" fill={C.celeste}>
        GRANO NORTE
      </text>
      {/* toldo */}
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${92 + i * 17} 94 h17 l-2 14 a6.5 6.5 0 0 1 -13 0z`} fill={i % 2 ? C.claro : C.azul} />
      ))}
      {/* vitrina */}
      <rect x="102" y="116" width="58" height="46" rx="3" fill={C.noche} opacity="0.7" />
      {/* tostador */}
      <g transform="translate(112 124)">
        <rect x="6" y="18" width="30" height="16" rx="3" fill={C.cafe} />
        <circle cx="21" cy="14" r="11" fill="#a4704d" />
        <rect x="18" y="0" width="6" height="6" fill="#a4704d" />
        <circle cx="21" cy="14" r="5" fill={C.noche} opacity="0.5" />
      </g>
      {/* puerta */}
      <rect x="172" y="116" width="40" height="56" rx="3" fill={C.noche} opacity="0.8" />
      <circle cx="205" cy="146" r="2" fill={C.celeste} />
      {/* sacos */}
      <path d="M236 172 q-4 -22 8 -26 h12 q12 4 8 26z" fill="#c9a27e" />
      <text x="250" y="164" textAnchor="middle" fontSize="6" fill={C.noche} fontWeight="700">
        CAFÉ
      </text>
      {/* humo/aroma */}
      <path d="M133 118 q-6 -10 0 -18 q6 -8 0 -16" stroke={C.claro} strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
      {/* granos */}
      {[
        [40, 180],
        [62, 186],
        [290, 182],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${i * 40})`}>
          <ellipse rx="7" ry="10" fill={C.cafe} />
          <path d="M0 -9 q-3 9 0 18" stroke={C.noche} strokeWidth="1.5" fill="none" />
        </g>
      ))}
    </svg>
  );
}

export function PlanillaIlustracion({ className = '' }: { className?: string }) {
  const filas = [
    ['Cafetería Mirador', 9],
    ['Café Brisa', 7],
    ['Barra Sur', 6],
    ['Hotel Costa', 5],
    ['Café Express', 3],
  ] as const;
  return (
    <svg viewBox="0 0 320 200" className={className} role="img" aria-label="La planilla de prospectos de Camila en su computador">
      <rect width="320" height="200" fill={C.noche2} />
      <rect x="40" y="22" width="240" height="146" rx="10" fill="#0b1222" stroke={C.celeste} strokeOpacity="0.4" />
      <rect x="40" y="22" width="240" height="22" rx="10" fill={C.azul} />
      <rect x="40" y="34" width="240" height="10" fill={C.azul} />
      <text x="54" y="37" fontSize="9" fontWeight="700" fill="#fff">
        Prospectos · Grano Norte
      </text>
      {filas.map(([n, pts], i) => {
        const y = 56 + i * 21;
        const color = pts >= 8 ? C.celeste : pts >= 6 ? C.azul : '#334155';
        return (
          <g key={n}>
            <rect x="50" y={y} width="220" height="16" rx="3" fill={i % 2 ? 'transparent' : '#ffffff08'} />
            <text x="56" y={y + 11.5} fontSize="8.5" fill={C.claro}>
              {n}
            </text>
            <rect x="196" y={y + 3} width={pts * 6} height="10" rx="3" fill={color} />
            <text x="262" y={y + 11.5} fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="end">
              {pts}
            </text>
          </g>
        );
      })}
      <path d="M20 168 h280 l-14 14 h-252z" fill="#24406a" />
      {/* taza junto al computador */}
      <rect x="282" y="140" width="18" height="18" rx="4" fill="#fff" />
      <path d="M300 144 q7 0 7 5 t-7 5" stroke="#fff" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export function WhatsAppIlustracion({
  className = '',
  enviado,
  respuesta,
  contacto = 'Diego · Cafetería Mirador',
}: {
  className?: string;
  enviado: string;
  respuesta?: string;
  contacto?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[300px] rounded-[2rem] border-4 border-[#24406a] bg-[#0b1222] p-2 shadow-premium ${className}`} role="img" aria-label={`Conversación de WhatsApp de Camila con ${contacto}`}>
      <div className="flex items-center gap-2 rounded-t-[1.4rem] bg-[#16213a] px-3 py-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2175a1] text-xs font-bold text-white">{contacto[0]}</span>
        <span className="min-w-0 truncate text-sm font-semibold text-white">{contacto}</span>
      </div>
      <div className="space-y-2 px-2 py-3">
        <div className="ml-6 rounded-2xl rounded-tr-sm bg-[#2175a1] p-2.5 text-[0.8rem] leading-snug text-white">
          {enviado}
          <span className="mt-1 block text-right text-[0.65rem] text-[#cfe8f5]">9:02 ✓✓</span>
        </div>
        {respuesta && (
          <div className="mr-6 rounded-2xl rounded-tl-sm bg-[#24314d] p-2.5 text-[0.8rem] leading-snug text-slate-100">
            {respuesta}
            <span className="mt-1 block text-right text-[0.65rem] text-slate-400">9:47</span>
          </div>
        )}
      </div>
    </div>
  );
}
