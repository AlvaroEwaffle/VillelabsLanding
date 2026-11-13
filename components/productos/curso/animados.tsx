'use client';
// Diagramas y bloques animados de /curso (13-nov-2026, segundo paquete). Pedido de Álvaro: «los diagramas, que sean
// animados; están buenos, pero que tengan animaciones». No se rediseñan: se animan para explicar, una vez al entrar en
// pantalla (useArmado + CSS .a-* de globals.css). Sin JS o con reduced-motion se ven quietos y completos.
import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { useArmado } from '@/lib/productos/aparecer';
import type { Semaforo } from '@/lib/productos/curso/curso';
import { PuntoSemaforo } from './piezas';
import Contador from './Contador';

const orden = (i: number) => ({ '--i': i }) as CSSProperties;

/** Contenedor que arma sus hijos .a-* al entrar en pantalla. `i` en cada hijo con style={orden(n)}. */
export function Armado({ as: Tag = 'div', className = '', children, ...resto }: { as?: ElementType; className?: string; children: ReactNode } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useArmado(ref);
  return (
    <Tag ref={ref} className={className} {...resto}>
      {children}
    </Tag>
  );
}
export { orden };

/**
 * Las 5 hojas alrededor del tablero (antes en piezas.tsx). Animación que explica: aparecen las hojas en el orden del curso,
 * se dibuja la flecha de cada una hacia el tablero, un punto «viaja» por cada flecha (el dato pasa de la hoja al tablero) y
 * el tablero pulsa al final (lo lee todo).
 */
/*
 * 13-nov-2026 (módulo 7, «Estructura tu negocio y delega a tu agente»): con `agente`, el centro pasa a ser «Tu planilla»
 * (los datos de cada hoja entran a ella) y abajo aparece el agente del módulo 7, que toma esos datos (un punto viaja de la
 * planilla al agente) y devuelve borradores que revisas tú. Sin `agente` queda igual que antes.
 */
export function DiagramaCiclo({ areas, agente = false }: { areas: { nombre: string; hoja: string; modulo: number }[]; agente?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  useArmado(ref);
  const cx = 180;
  const cy = 180;
  const r = 128;
  const puntos = areas.map((a, i) => {
    const ang = ((-90 + i * 72) * Math.PI) / 180;
    return { ...a, x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
  });
  const corto = (h: string) => (h === 'Cobranza y Caja' ? 'Cobranza' : h);
  const n = puntos.length;
  const hojas = areas.map((a) => `${a.hoja} (módulo ${a.modulo})`).join(', ');
  // Agente: debajo del círculo, entre las dos hojas de abajo (x 141–219 libre), con su flecha desde la planilla.
  const ag = { y1: cy + 62, y2: 384, caja: 392 };
  return (
    <svg
      ref={ref}
      viewBox={agente ? '0 0 360 470' : '0 0 360 360'}
      role="img"
      aria-label={
        agente
          ? `Las hojas de tu sistema alrededor de tu planilla: ${hojas}. Los datos de cada hoja entran a la planilla, con su tablero del módulo 6. Abajo, tu agente del módulo 7 toma esos datos y te prepara borradores; tú revisas y envías.`
          : `Las hojas de tu sistema alrededor del tablero: ${hojas}. Todas alimentan el tablero del módulo 6.`
      }
      className="h-auto w-full"
    >
      <g className="a-pulso" style={orden(n * 2 + 2)}>
        <circle cx={cx} cy={cy} r="58" fill="#2175a1" fillOpacity="0.22" stroke="#5fb2dd" strokeDasharray="4 4" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#f1f5f9" fontSize="15">{agente ? 'Tu planilla' : 'Tablero'}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#cbd5e1" fontSize="11">{agente ? 'con su tablero' : 'módulo 6'}</text>
      </g>
      {agente ? (
        <g>
          <line x1={cx} y1={ag.y1} x2={cx} y2={ag.y2} pathLength={1} className="a-trazo" style={orden(n * 2 + 3)} stroke="#FF3D8B" strokeOpacity="0.7" strokeWidth="2" />
          <g transform={`translate(${cx} ${ag.y2}) rotate(90)`}>
            <path d="M -5 -4.5 L 3 0 L -5 4.5 z" fill="#FF3D8B" className="a-escala" style={orden(n * 2 + 5)} />
          </g>
          {/* El agente toma los datos de la planilla: el punto viaja hacia abajo. */}
          <circle cx={cx} cy={ag.y1} r="4" fill="#FF3D8B" className="a-viaja" style={{ ...orden(n * 2 + 4), '--dx': '0px', '--dy': `${ag.y2 - ag.y1}px` } as CSSProperties} />
          <g className="a-escala" style={orden(n * 2 + 6)}>
            <rect x={cx - 112} y={ag.caja} width="224" height="70" rx="16" fill="#2a1630" stroke="#FF3D8B" strokeOpacity="0.7" strokeWidth="2" />
            <text x={cx} y={ag.caja + 22} textAnchor="middle" fill="#ff8fbd" fontSize="10" fontFamily="ui-monospace, monospace">M7 · TU AGENTE</text>
            <text x={cx} y={ag.caja + 41} textAnchor="middle" fill="#f1f5f9" fontSize="12">toma tus datos y te prepara</text>
            <text x={cx} y={ag.caja + 57} textAnchor="middle" fill="#cbd5e1" fontSize="11">pedidos y cobranza · tú revisas</text>
          </g>
        </g>
      ) : null}
      {puntos.map((p, i) => {
        const dx = cx - p.x;
        const dy = cy - p.y;
        const d = Math.hypot(dx, dy);
        const x1 = p.x + (dx / d) * 38;
        const y1 = p.y + (dy / d) * 38;
        const x2 = cx - (dx / d) * 62;
        const y2 = cy - (dy / d) * 62;
        return (
          <g key={`l${p.hoja}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} className="a-trazo" style={orden(n + i)} stroke="#5fb2dd" strokeOpacity="0.55" strokeWidth="2" />
            {/* Punta aparte (un marker se vería antes de que la línea llegue). */}
            <g transform={`translate(${x2} ${y2}) rotate(${(Math.atan2(dy, dx) * 180) / Math.PI})`}>
              <path d="M -5 -4.5 L 3 0 L -5 4.5 z" fill="#5fb2dd" className="a-escala" style={orden(n + i + 3)} />
            </g>
            {/* El dato que viaja: solo existe mientras se arma (con CSS .a-viaja); quieto, no se ve. */}
            <circle cx={x1} cy={y1} r="4" fill="#5fb2dd" className="a-viaja" style={{ ...orden(n + i + 2), '--dx': `${x2 - x1}px`, '--dy': `${y2 - y1}px` } as CSSProperties} />
          </g>
        );
      })}
      {puntos.map((p, i) => (
        <g key={p.hoja} className="a-escala" style={orden(i)}>
          <circle cx={p.x} cy={p.y} r="36" fill="#131c31" stroke="#24314d" strokeWidth="2" />
          <text x={p.x} y={p.y - 4} textAnchor="middle" fill="#5fb2dd" fontSize="10" fontFamily="ui-monospace, monospace">
            M{p.modulo}
          </text>
          <text x={p.x} y={p.y + 11} textAnchor="middle" fill="#f1f5f9" fontSize="11">
            {corto(p.hoja)}
          </text>
        </g>
      ))}
    </svg>
  );
}

type FilaTablero = { area: string; dato: string; valor: string; numero?: number; antes: Semaforo; despues: Semaforo };

/**
 * Tablero del proyecto final (antes en piezas.tsx), con los números del ejemplo Grano Norte. Animación que explica: las
 * filas entran una a una, cada número cuenta hasta su valor («se calcula solo») y el semáforo pasa de «antes» a «después».
 */
export function TableroMock() {
  const ref = useRef<HTMLDivElement>(null);
  useArmado(ref);
  const filas: FilaTablero[] = [
    { area: 'Clientes', dato: 'Propuestas abiertas', valor: '$174.000', numero: 174000, antes: 'rojo', despues: 'verde' },
    { area: 'Origen', dato: 'Canal que más trae', valor: 'Referido', antes: 'amarillo', despues: 'verde' },
    { area: 'Pedidos', dato: 'Atrasados', valor: '1', numero: 1, antes: 'amarillo', despues: 'verde' },
    { area: 'Atención', dato: 'Casos abiertos', valor: '2', numero: 2, antes: 'rojo', despues: 'amarillo' },
    { area: 'Cobranza', dato: 'Vencido sin pagar', valor: '$96.000', numero: 96000, antes: 'rojo', despues: 'verde' },
    { area: 'Caja', dato: 'Caja hoy', valor: '$437.000', numero: 437000, antes: 'rojo', despues: 'verde' },
  ];
  return (
    <div ref={ref} aria-hidden className="rounded-2xl border border-[#24314d] bg-[#131c31] p-4 shadow-premium sm:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <p className="font-serif text-lg text-white">Tablero · Grano Norte</p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5fb2dd]">Lunes</p>
      </div>
      <ul className="mt-3 space-y-2.5">
        {filas.map((f, i) => (
          <li key={f.area} className="a-pieza grid grid-cols-[1fr_auto_auto] items-center gap-3 text-sm" style={orden(i)}>
            <span className="min-w-0">
              <span className="block text-slate-200">{f.area}</span>
              <span className="block truncate text-[11px] text-slate-500">{f.dato}</span>
            </span>
            <span className="font-mono text-[13px] text-[#5fb2dd]">
              {f.numero !== undefined ? <Contador valor={f.numero} prefijo={f.valor.startsWith('$') ? '$' : ''} /> : f.valor}
            </span>
            <span className="flex items-center gap-1.5">
              <PuntoSemaforo semaforo={f.antes} />
              <ArrowRight className="a-aparece h-3 w-3 text-slate-500" style={orden(i + 6)} />
              <span className="a-escala inline-flex" style={orden(i + 7)}>
                <PuntoSemaforo semaforo={f.despues} />
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">Ejemplo ficticio · se calcula solo desde tus hojas · revisión de los lunes, 10 min</p>
    </div>
  );
}
