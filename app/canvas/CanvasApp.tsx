'use client';

import { useCallback, useEffect, useRef, useState, useReducer } from 'react';
import {
  Action,
  Board,
  COLORS,
  COLOR_ORDER,
  CANVAS_H,
  CANVAS_W,
  ColorKey,
  NOTE_H,
  NOTE_W,
  TEMPLATES,
  TemplateKey,
  applyAction,
  createBoard,
  loadBoard,
  saveBoard,
  slotInZone,
  templateByKey,
  uid,
} from './board';
import { exportBoardJson, exportBoardMarkdown, exportBoardPng } from './exportPng';

interface View {
  x: number;
  y: number;
  scale: number;
}

const MIN_SCALE = 0.18;
const MAX_SCALE = 1.6;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function CanvasApp() {
  const [board, dispatch] = useReducer(applyAction, null as unknown as Board);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>({ x: 0, y: 0, scale: 0.42 });
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [ink, setInk] = useState<ColorKey>('amber');
  const [showHelp, setShowHelp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const panRef = useRef<{ px: number; py: number; vx: number; vy: number } | null>(null);

  // Carga diferida: el primer render debe ser idéntico en server y cliente (export estático).
  useEffect(() => {
    dispatch({ type: 'board/load', board: loadBoard() ?? createBoard('valor') });
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && board) saveBoard(board);
  }, [board, ready]);

  const toCanvas = useCallback(
    (clientX: number, clientY: number) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return { x: 0, y: 0 };
      return {
        x: (clientX - r.left - view.x) / view.scale,
        y: (clientY - r.top - view.y) / view.scale,
      };
    },
    [view],
  );

  const addNote = useCallback(
    (x: number, y: number, color: ColorKey, edit = true) => {
      const id = uid();
      dispatch({
        type: 'note/add',
        note: { id, text: '', x: Math.round(x), y: Math.round(y), color, votes: 0, createdAt: Date.now() },
      });
      setSelected(id);
      if (edit) setEditing(id);
      return id;
    },
    [],
  );

  /** Nueva nota al centro de la vista (botón / tecla N). */
  const addCentered = useCallback(() => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const p = toCanvas(r.left + r.width / 2, r.top + r.height / 2);
    addNote(p.x - NOTE_W / 2, p.y - NOTE_H / 2, ink);
  }, [addNote, ink, toCanvas]);

  // --- teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT');
      if (e.key === 'Escape') {
        setEditing(null);
        setSelected(null);
        setMenuOpen(false);
        return;
      }
      if (typing) return;
      if ((e.key === 'n' || e.key === 'N') && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        addCentered();
      }
      if ((e.key === 'Backspace' || e.key === 'Delete') && selected) {
        e.preventDefault();
        dispatch({ type: 'note/delete', id: selected });
        setSelected(null);
      }
      if (e.key === '?') setShowHelp((s) => !s);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [addCentered, selected]);

  // --- rueda: pan normal, zoom con ctrl/cmd (trackpad pinch incluido)
  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const r = node.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        setView((v) => {
          const next = clamp(v.scale * (1 - e.deltaY * 0.0022), MIN_SCALE, MAX_SCALE);
          const k = next / v.scale;
          return { scale: next, x: mx - (mx - v.x) * k, y: my - (my - v.y) * k };
        });
      } else {
        setView((v) => ({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, []);

  const fit = useCallback(() => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const s = clamp(Math.min(r.width / (CANVAS_W + 80), r.height / (CANVAS_H + 80)), MIN_SCALE, MAX_SCALE);
    setView({ scale: s, x: (r.width - CANVAS_W * s) / 2, y: (r.height - CANVAS_H * s) / 2 });
  }, []);

  useEffect(() => {
    if (ready) fit();
  }, [ready, fit]);

  // --- arrastre de notas
  const onNoteDown = (e: React.PointerEvent, id: string) => {
    if (editing === id) return;
    e.stopPropagation();
    const n = board.notes.find((x) => x.id === id);
    if (!n) return;
    const p = toCanvas(e.clientX, e.clientY);
    dragRef.current = { id, dx: p.x - n.x, dy: p.y - n.y };
    setSelected(id);
    dispatch({ type: 'note/front', id });
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragRef.current) {
      const p = toCanvas(e.clientX, e.clientY);
      dispatch({
        type: 'note/move',
        id: dragRef.current.id,
        x: clamp(p.x - dragRef.current.dx, -200, CANVAS_W + 200),
        y: clamp(p.y - dragRef.current.dy, -200, CANVAS_H + 200),
      });
      return;
    }
    if (panRef.current) {
      setView((v) => ({
        ...v,
        x: panRef.current!.vx + (e.clientX - panRef.current!.px),
        y: panRef.current!.vy + (e.clientY - panRef.current!.py),
      }));
    }
  };

  const endPointer = () => {
    dragRef.current = null;
    panRef.current = null;
  };

  const onSurfaceDown = (e: React.PointerEvent) => {
    setSelected(null);
    setEditing(null);
    setMenuOpen(false);
    panRef.current = { px: e.clientX, py: e.clientY, vx: view.x, vy: view.y };
  };

  const onSurfaceDouble = (e: React.MouseEvent) => {
    const p = toCanvas(e.clientX, e.clientY);
    addNote(p.x - NOTE_W / 2, p.y - NOTE_H / 2, ink);
  };

  const addToZone = (zoneId: string) => {
    const z = board.zones.find((x) => x.id === zoneId);
    if (!z) return;
    const p = slotInZone(board, z);
    addNote(p.x, p.y, ink);
  };

  const switchTemplate = (t: TemplateKey) => {
    const hasWork = board.notes.length > 0;
    if (hasWork && !window.confirm('Se va a limpiar el lienzo actual. ¿Exportaste lo que necesitabas?')) return;
    dispatch({ type: 'board/template', template: t, id: uid() });
    setMenuOpen(false);
    setTimeout(fit, 0);
  };

  const importJson = (f: File) => {
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const b = JSON.parse(String(rd.result)) as Board;
        if (!Array.isArray(b.notes) || !Array.isArray(b.zones)) throw new Error('formato');
        dispatch({ type: 'board/load', board: b });
        setTimeout(fit, 0);
      } catch {
        window.alert('Ese archivo no es un lienzo válido.');
      }
    };
    rd.readAsText(f);
  };

  if (!ready || !board) {
    return (
      <div className="h-screen w-full grid place-items-center bg-[#0b1120] text-white/40 text-sm font-light">
        Cargando lienzo…
      </div>
    );
  }

  const tpl = templateByKey(board.template);
  const totalVotes = board.notes.reduce((a, n) => a + n.votes, 0);

  return (
    <div className="h-screen w-full flex flex-col bg-[#0b1120] text-white overflow-hidden select-none">
      {/* ------------------------------------------------------- barra */}
      <header className="flex-none border-b border-white/10 bg-[#0f172a]/80 backdrop-blur px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 mr-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-[#143b53] grid place-items-center text-[13px] font-bold shadow-accent-lg">
            V
          </div>
          <input
            value={board.title}
            onChange={(e) => dispatch({ type: 'board/title', title: e.target.value })}
            className="bg-transparent text-[15px] font-medium outline-none focus:bg-white/5 rounded px-2 py-1 min-w-[220px] max-w-[380px]"
            aria-label="Título de la sesión"
          />
        </div>

        {/* plantillas */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:border-accent/40 text-xs font-medium transition-colors"
          >
            {tpl.name} ▾
          </button>
          {menuOpen && (
            <div className="absolute z-40 mt-2 w-[340px] rounded-xl border border-white/10 bg-[#15203a] shadow-2xl p-1.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => switchTemplate(t.key)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                    t.key === board.template ? 'bg-accent/15 border border-accent/30' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px] font-semibold">{t.name}</span>
                    {t.stage && <span className="text-[10px] uppercase tracking-wider text-accent">{t.stage}</span>}
                  </div>
                  <p className="text-[11.5px] text-white/45 leading-snug mt-0.5">{t.blurb}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* colores */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 bg-white/[0.03]">
          {COLOR_ORDER.map((c) => (
            <button
              key={c}
              onClick={() => {
                setInk(c);
                if (selected) dispatch({ type: 'note/color', id: selected, color: c });
              }}
              style={{ background: COLORS[c].fill }}
              className={`w-5 h-5 rounded-md transition-transform ${
                ink === c ? 'ring-2 ring-white/80 scale-110' : 'hover:scale-110 opacity-80'
              }`}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>

        <button
          onClick={addCentered}
          className="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/90 text-xs font-semibold transition-colors"
        >
          + Nota <span className="opacity-60 font-normal">N</span>
        </button>

        <div className="flex-1" />

        <span className="text-[11px] text-white/35 tabular-nums hidden md:inline">
          {board.notes.length} ideas · {totalVotes} votos
        </span>

        {/* zoom */}
        <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/[0.03] px-1">
          <button
            onClick={() => setView((v) => ({ ...v, scale: clamp(v.scale / 1.25, MIN_SCALE, MAX_SCALE) }))}
            className="w-7 h-7 rounded hover:bg-white/10 text-sm"
          >
            −
          </button>
          <button onClick={fit} className="px-2 h-7 rounded hover:bg-white/10 text-[11px] tabular-nums">
            {Math.round(view.scale * 100)}%
          </button>
          <button
            onClick={() => setView((v) => ({ ...v, scale: clamp(v.scale * 1.25, MIN_SCALE, MAX_SCALE) }))}
            className="w-7 h-7 rounded hover:bg-white/10 text-sm"
          >
            +
          </button>
        </div>

        <button
          onClick={() => exportBoardMarkdown(board)}
          className="px-3 py-1.5 rounded-lg bg-white text-[#0b1120] hover:bg-white/90 text-xs font-semibold transition-colors"
          title="Descarga un .md con todo lo recogido, agrupado por pregunta y ordenado por votos"
        >
          ↓ Descargar reporte
        </button>
        <button
          onClick={() => exportBoardPng(board)}
          className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:border-accent/40 text-xs font-medium transition-colors"
        >
          PNG
        </button>
        <button
          onClick={() => exportBoardJson(board)}
          className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:border-accent/40 text-xs transition-colors"
          title="Guardar el lienzo para retomarlo después"
        >
          ↓ JSON
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:border-accent/40 text-xs transition-colors"
          title="Abrir un lienzo guardado"
        >
          ↑
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) importJson(f);
            e.target.value = '';
          }}
        />
        <button
          onClick={() => setShowHelp((s) => !s)}
          className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.03] hover:border-accent/40 text-xs transition-colors"
        >
          ?
        </button>
      </header>

      {/* ------------------------------------------------------- lienzo */}
      <div
        ref={wrapRef}
        onPointerDown={onSurfaceDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={onSurfaceDouble}
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing touch-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.055) 1px, transparent 0)',
          backgroundSize: `${28 * view.scale}px ${28 * view.scale}px`,
          backgroundPosition: `${view.x}px ${view.y}px`,
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          }}
        >
          {/* zonas */}
          {board.zones.map((z) => (
            <div
              key={z.id}
              className="absolute rounded-2xl border border-white/10 bg-white/[0.02]"
              style={{ left: z.x, top: z.y, width: z.w, height: z.h }}
            >
              <div className="px-5 pt-4 pb-2">
                <input
                  value={z.title}
                  onChange={(e) => dispatch({ type: 'zone/title', id: z.id, title: e.target.value })}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="bg-transparent text-accent font-semibold text-[21px] outline-none focus:bg-white/5 rounded px-1 -ml-1 w-full"
                />
                {z.hint && <p className="text-white/35 text-[15px] mt-1 leading-snug">{z.hint}</p>}
              </div>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => addToZone(z.id)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-white/50 hover:text-white hover:border-accent/40 text-[15px] transition-colors"
              >
                + agregar aquí
              </button>
            </div>
          ))}

          {/* notas */}
          {board.notes.map((n) => {
            const c = COLORS[n.color] ?? COLORS.amber;
            const isSel = selected === n.id;
            const isEdit = editing === n.id;
            return (
              <div
                key={n.id}
                onPointerDown={(e) => onNoteDown(e, n.id)}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setEditing(n.id);
                }}
                className="absolute rounded-xl shadow-lg transition-shadow"
                style={{
                  left: n.x,
                  top: n.y,
                  width: NOTE_W,
                  height: NOTE_H,
                  background: c.fill,
                  border: `1px solid ${c.edge}`,
                  boxShadow: isSel ? '0 0 0 3px rgba(33,117,161,.9), 0 12px 28px rgba(0,0,0,.4)' : '0 8px 20px rgba(0,0,0,.32)',
                  cursor: isEdit ? 'text' : 'grab',
                }}
              >
                {isEdit ? (
                  <textarea
                    autoFocus
                    value={n.text}
                    onChange={(e) => dispatch({ type: 'note/text', id: n.id, text: e.target.value })}
                    onBlur={() => setEditing(null)}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="w-full h-full bg-transparent resize-none outline-none p-3.5 text-[17px] leading-[1.35] font-medium"
                    style={{ color: c.ink }}
                    placeholder="Escribe la idea…"
                  />
                ) : (
                  <div
                    className="w-full h-full p-3.5 text-[17px] leading-[1.35] font-medium overflow-hidden whitespace-pre-wrap break-words"
                    style={{ color: c.ink }}
                  >
                    {n.text || <span className="opacity-35">doble clic para escribir</span>}
                  </div>
                )}

                {/* votos */}
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => dispatch({ type: 'note/vote', id: n.id, delta: 1 })}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    dispatch({ type: 'note/vote', id: n.id, delta: -1 });
                  }}
                  className="absolute bottom-2 left-3 text-[15px] font-semibold opacity-55 hover:opacity-100 transition-opacity"
                  style={{ color: c.ink }}
                  title="Clic = +1 voto · clic derecho = −1"
                >
                  ● {n.votes}
                </button>

                {isSel && !isEdit && (
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => {
                      dispatch({ type: 'note/delete', id: n.id });
                      setSelected(null);
                    }}
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#0f172a] border border-white/20 text-white/70 hover:text-white hover:border-rose-400/60 text-[15px] grid place-items-center"
                    title="Eliminar"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* vacío */}
        {board.notes.length === 0 && (
          <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none">
            <p className="text-white/30 text-sm font-light bg-[#0f172a]/70 backdrop-blur px-4 py-2 rounded-full border border-white/10">
              Doble clic en cualquier parte para crear la primera idea · <kbd className="text-white/50">N</kbd> también sirve
            </p>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------- ayuda */}
      {showHelp && (
        <div
          className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-6"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="max-w-lg w-full rounded-2xl border border-white/10 bg-[#15203a] p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-medium mb-1">Cómo facilitar con esto</h2>
            <p className="text-white/45 text-sm mb-5">
              Comparte pantalla, elige la plantilla de la etapa y captura lo que el cliente dice. Al cerrar, exporta el
              PNG y te queda el acta.
            </p>
            <dl className="space-y-2.5 text-sm">
              {[
                ['Doble clic', 'crear una idea donde apuntes'],
                ['N', 'crear al centro de la vista'],
                ['Arrastrar', 'mover la idea (o el lienzo si arrastras el fondo)'],
                ['Doble clic en la nota', 'editar el texto'],
                ['● número', 'clic suma voto · clic derecho resta'],
                ['Supr', 'eliminar la idea seleccionada'],
                ['⌘/Ctrl + rueda', 'zoom · rueda sola desplaza'],
                ['Esc', 'salir de edición'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4">
                  <dt className="w-44 flex-none text-accent font-medium">{k}</dt>
                  <dd className="text-white/60">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-white/30 text-xs mt-5 leading-relaxed">
              Todo se guarda solo en este navegador. Para retomar la sesión en otro equipo, exporta el JSON y ábrelo
              con ↑.
            </p>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-5 w-full py-2.5 rounded-lg bg-accent hover:bg-accent/90 text-sm font-medium transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
