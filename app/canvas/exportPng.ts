// Exporta el board a PNG dibujando en un <canvas>. Sin dependencias externas:
// html2canvas/dom-to-image fallan con CSP estricta y agregan ~50kB al bundle, y acá
// sólo hay rectángulos y texto — pintarlos a mano es más confiable que serializar DOM.

import { Board, COLORS, NOTE_H, NOTE_W, CANVAS_W, CANVAS_H } from './board';
import { buildMarkdown } from './exportMd';

/**
 * Dispara la descarga. El <a> DEBE estar en el DOM: Chrome ignora el click en anclas
 * desconectadas, así que un `a.click()` sobre un elemento suelto falla en silencio.
 */
function download(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}

function fileStamp(board: Board): string {
  const slug = (board.title || 'sesion')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  const d = new Date();
  const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  return `${slug || 'sesion'}-${day}`;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const out: string[] = [];
  for (const para of text.split('\n')) {
    if (!para.trim()) {
      out.push('');
      continue;
    }
    let line = '';
    for (const word of para.split(/\s+/)) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxW && line) {
        out.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) out.push(line);
  }
  return out;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function exportBoardPng(board: Board, scale = 2): void {
  const pad = 48;
  const headerH = 96;
  const cv = document.createElement('canvas');
  cv.width = (CANVAS_W + pad * 2) * scale;
  cv.height = (CANVAS_H + pad * 2 + headerH) * scale;
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  ctx.scale(scale, scale);

  // fondo
  ctx.fillStyle = '#0b1120';
  ctx.fillRect(0, 0, CANVAS_W + pad * 2, CANVAS_H + pad * 2 + headerH);

  // encabezado
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 34px Inter, system-ui, sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText(board.title || 'Sesión de trabajo', pad, pad);

  ctx.fillStyle = '#64748b';
  ctx.font = '400 18px Inter, system-ui, sans-serif';
  const stamp = new Date(board.updatedAt || Date.now()).toLocaleString('es-CL', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  ctx.fillText(`Villelabs · ${stamp} · ${board.notes.length} ideas`, pad, pad + 44);

  const ox = pad;
  const oy = pad + headerH;

  // zonas
  for (const z of board.zones) {
    ctx.fillStyle = 'rgba(255,255,255,0.025)';
    roundRect(ctx, ox + z.x, oy + z.y, z.w, z.h, 18);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.10)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#5aa9d0';
    ctx.font = '600 21px Inter, system-ui, sans-serif';
    ctx.fillText(z.title, ox + z.x + 18, oy + z.y + 18);

    if (z.hint) {
      ctx.fillStyle = '#64748b';
      ctx.font = '400 15px Inter, system-ui, sans-serif';
      ctx.fillText(z.hint, ox + z.x + 18, oy + z.y + 44);
    }
  }

  // notas
  for (const n of board.notes) {
    const c = COLORS[n.color] ?? COLORS.amber;
    const x = ox + n.x;
    const y = oy + n.y;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = c.fill;
    roundRect(ctx, x, y, NOTE_W, NOTE_H, 10);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = c.edge;
    ctx.lineWidth = 1;
    roundRect(ctx, x, y, NOTE_W, NOTE_H, 10);
    ctx.stroke();

    ctx.fillStyle = c.ink;
    ctx.font = '500 17px Inter, system-ui, sans-serif';
    const lines = wrap(ctx, n.text || '', NOTE_W - 28);
    const maxLines = Math.floor((NOTE_H - 44) / 23);
    lines.slice(0, maxLines).forEach((ln, i) => {
      const isLast = i === maxLines - 1 && lines.length > maxLines;
      ctx.fillText(isLast ? `${ln.slice(0, -1)}…` : ln, x + 14, y + 16 + i * 23);
    });

    if (n.votes > 0) {
      ctx.fillStyle = c.ink;
      ctx.globalAlpha = 0.75;
      ctx.font = '600 15px Inter, system-ui, sans-serif';
      ctx.fillText(`● ${n.votes}`, x + 14, y + NOTE_H - 26);
      ctx.globalAlpha = 1;
    }
  }

  cv.toBlob((blob) => {
    if (blob) download(blob, `villelabs-${fileStamp(board)}.png`);
  }, 'image/png');
}

export function exportBoardJson(board: Board): void {
  download(
    new Blob([JSON.stringify(board, null, 2)], { type: 'application/json' }),
    `villelabs-${fileStamp(board)}.json`,
  );
}

export function exportBoardMarkdown(board: Board): void {
  download(
    new Blob([buildMarkdown(board)], { type: 'text/markdown;charset=utf-8' }),
    `villelabs-${fileStamp(board)}.md`,
  );
}
