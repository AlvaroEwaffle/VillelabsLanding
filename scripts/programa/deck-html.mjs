#!/usr/bin/env node
/**
 * Genera el deck de la sesión como un HTML autocontenido.
 *
 * Por qué además de la página: en una reunión el link depende de que haya
 * internet, de que la llave siga siendo la misma y de que nadie haya
 * redesplegado. Un archivo abre igual sin nada de eso, y se imprime.
 *
 * La fuente sigue siendo `prtech.sesion.json`. Este script no inventa
 * contenido: si el deck dice algo, está en el JSON.
 *
 *   node scripts/programa/deck-html.mjs [destino.html]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const AQUI = dirname(fileURLToPath(import.meta.url));
const DATOS = join(AQUI, '../../lib/programa/data/prtech.sesion.json');
const doc = JSON.parse(readFileSync(DATOS, 'utf8'));

const e = (s) =>
  String(s ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

/** Negritas con **…** y «…» como en el resto del programa. */
const rico = (s) =>
  e(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

const metricas = (items) => `
  <div class="metricas">
    ${items
      .map(
        (m) => `<div class="metrica">
      <p class="cifra">${e(m.valor)}</p>
      <p class="etiqueta">${e(m.etiqueta)}</p>
      ${m.pie ? `<p class="pie">${e(m.pie)}</p>` : ''}
    </div>`,
      )
      .join('')}
  </div>`;

const bloque = (titulo, cuerpo) => `
  <section class="bloque">
    <h3>${e(titulo)}</h3>
    ${cuerpo}
  </section>`;

function agenda(s) {
  return `
  <div class="filas">
    ${s.puntos
      .map(
        (p, i) => `<div class="fila">
      <span class="num">${i + 1}</span>
      <div>
        <p class="fila-titulo">${e(p.que)} <span class="min">${p.minutos} min</span></p>
        <p class="cuerpo">${e(p.detalle)}</p>
        <p class="sale"><span>Sale de acá:</span> ${e(p.sale)}</p>
      </div>
    </div>`,
      )
      .join('')}
  </div>
  <p class="nota">${rico(s.nota)}</p>`;
}

function review(s) {
  return `
  <div class="veredicto">
    <p class="kicker">La meta del sprint · ${e(s.veredicto.estado)}</p>
    <p class="cuerpo">${rico(s.veredicto.texto)}</p>
  </div>

  ${bloque(
    'A nivel de producto',
    `<div class="lista-borde">${s.producto
      .map(
        (p) => `<div class="item">
          <p class="item-titulo">${e(p.que)}</p>
          <p class="cuerpo">${e(p.detalle)}</p>
          <p class="ref">${e(p.ref)}</p>
        </div>`,
      )
      .join('')}</div>`,
  )}

  ${bloque(
    'A nivel de historias',
    `<div class="chips">${s.historias.cerradas.map((h) => `<span class="chip">${e(h)}</span>`).join('')}</div>
     <p class="cuerpo">${s.historias.cerradas.length} historias cerradas · ${s.historias.prs_mergeadas} PR mergeadas · ${s.historias.prs_abiertas_sin_revisar} abiertas sin revisar</p>
     <p class="pie">${e(s.historias.nota)}</p>`,
  )}

  ${bloque(
    s.validacion.titulo,
    `<p class="cuerpo">${rico(s.validacion.texto)}</p>
     ${metricas(s.validacion.metricas)}
     <p class="nota ambar">${rico(s.validacion.hallazgo)}</p>`,
  )}

  ${bloque(
    s.spike.titulo,
    `<p class="pregunta">${e(s.spike.pregunta)}</p>
     <p class="respuesta">${e(s.spike.respuesta)}</p>
     ${metricas(s.spike.metricas)}
     <p class="cuerpo">${e(s.spike.estado)}</p>
     <p class="nota">${rico(s.spike.nota)}</p>`,
  )}`;
}

function retro(s) {
  return `
  <div class="filas">
    ${s.preguntas
      .map(
        (p) => `<div class="fila pregunta-card">
      <span class="num">${p.n}</span>
      <div>
        <p class="pregunta">${e(p.pregunta)}</p>
        <p class="cuerpo">${e(p.para_pensar)}</p>
      </div>
    </div>`,
      )
      .join('')}
  </div>
  <p class="nota">${rico(s.nota)}</p>`;
}

function preplanning(s) {
  return `
  <div class="goal">
    <p class="kicker">El goal</p>
    <p class="goal-texto">${e(s.goal_propuesto)}</p>
    <p class="cuerpo">${rico(s.porque)}</p>
    <p class="pie">Venía de: «${e(s.goal_anterior)}»</p>
  </div>

  ${bloque(
    s.recorrido.titulo,
    `<div class="pasos">${s.recorrido.pasos
      .map(
        (p) => `<div class="paso ${e(p.estado)}">
          <span class="punto"></span>
          <span class="paso-n">${p.n}</span>
          <span class="paso-que">${e(p.que)}</span>
          ${p.nota ? `<span class="paso-nota">— ${e(p.nota)}</span>` : ''}
        </div>`,
      )
      .join('')}</div>`,
  )}

  ${bloque(
    'Las historias que lo sostienen',
    `<div class="filas">${s.historias
      .map(
        (h) => `<div class="fila">
          <span class="num">${h.prioridad}</span>
          <div>
            <p class="fila-titulo">${e(h.que)} <span class="ref">${e(h.ref)}</span> <span class="tamano">${e(h.tamano)}</span></p>
            <p class="cuerpo">${rico(h.porque)}</p>
          </div>
        </div>`,
      )
      .join('')}</div>`,
  )}

  ${bloque(
    'Decisiones que necesitamos de la PO',
    `<ul class="puntos">${s.decisiones.map((d) => `<li>${e(d)}</li>`).join('')}</ul>`,
  )}

  <p class="nota">${rico(s.fuera)}</p>`;
}

const CUERPOS = { agenda, review, retro, preplanning };

const slides = doc.slides
  .map(
    (s, i) => `
  <article class="slide" id="s${i}" data-i="${i}">
    <header>
      <p class="kicker">${e(doc.sesion)} · ${e(doc.fecha)}</p>
      <h1>${e(s.titulo)}</h1>
      ${s.bajada ? `<p class="bajada">${e(s.bajada)}</p>` : ''}
    </header>
    ${(CUERPOS[s.tipo] ?? (() => ''))(s)}
    <footer class="pie-slide">${i + 1} / ${doc.slides.length} · PR Tech · Villelabs</footer>
  </article>`,
  )
  .join('');

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(doc.sesion)} · PR Tech</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap" rel="stylesheet">
<style>
  :root{
    --fondo:#0f172a; --tinta:#f8fafc; --acento:#2175a1;
    --linea:rgba(255,255,255,.10); --panel:rgba(255,255,255,.03);
    --tenue:rgba(248,250,252,.55); --muy-tenue:rgba(248,250,252,.32);
    --ok:#6ee7b7; --riesgo:#fcd34d; --roto:#fda4af;
    --serif:'Fraunces',ui-serif,Georgia,'Times New Roman',serif;
    --sans:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--fondo);color:var(--tinta);font-family:var(--sans);
       font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
  .slide{display:none;max-width:860px;margin:0 auto;padding:56px 24px 96px}
  .slide.on{display:block}
  header{margin-bottom:32px}
  .kicker{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muy-tenue);margin:0 0 8px}
  h1{font-family:var(--serif);font-weight:400;font-size:40px;line-height:1.1;margin:0;text-wrap:balance}
  .bajada{font-family:var(--serif);font-size:19px;line-height:1.35;color:var(--tenue);margin:12px 0 0}
  h3{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muy-tenue);
     font-weight:600;margin:0 0 12px}
  .bloque{margin:32px 0}
  .cuerpo{color:var(--tenue);margin:6px 0}
  .pie,.ref{font-size:11px;color:var(--muy-tenue);margin:4px 0 0}
  .nota{border-left:2px solid var(--linea);padding-left:16px;color:var(--tenue);margin:20px 0 0}
  .nota.ambar{border-left-color:rgba(252,211,77,.35)}
  .filas{display:flex;flex-direction:column;gap:10px}
  .fila{display:flex;gap:16px;border:1px solid var(--linea);background:var(--panel);
        border-radius:12px;padding:16px}
  .num{font-family:var(--serif);font-size:26px;color:var(--muy-tenue);line-height:1;
       font-variant-numeric:tabular-nums;flex:0 0 auto}
  .fila-titulo{font-family:var(--serif);font-size:19px;margin:0}
  .min,.tamano{font-family:var(--sans);font-size:11px;color:var(--muy-tenue);
        border:1px solid var(--linea);border-radius:4px;padding:1px 6px;vertical-align:middle}
  .sale{font-size:12px;color:var(--tenue);margin:8px 0 0}
  .sale span{color:var(--muy-tenue)}
  .veredicto{border:1px solid var(--linea);background:var(--panel);border-radius:12px;padding:16px}
  .lista-borde{display:flex;flex-direction:column;gap:14px}
  .item{border-left:2px solid var(--linea);padding-left:16px}
  .item-titulo{font-weight:600;margin:0}
  .chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
  .chip{border:1px solid var(--linea);background:var(--panel);border-radius:8px;
        padding:3px 10px;font-size:12px;color:var(--tenue);font-variant-numeric:tabular-nums}
  .metricas{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:14px 0}
  .metrica{border:1px solid var(--linea);background:var(--panel);border-radius:12px;padding:16px}
  .cifra{font-family:var(--serif);font-size:32px;line-height:1;margin:0;
         font-variant-numeric:tabular-nums;color:var(--tinta)}
  .etiqueta{font-size:11px;line-height:1.3;color:var(--muy-tenue);margin:8px 0 0}
  .pregunta{font-family:var(--serif);font-size:23px;line-height:1.25;margin:0;text-wrap:balance}
  .respuesta{font-family:var(--serif);font-size:23px;color:var(--acento);margin:6px 0 0;
             filter:brightness(1.5)}
  .pregunta-card .cuerpo{margin-top:10px}
  .goal{margin-bottom:8px}
  .goal-texto{font-family:var(--serif);font-size:28px;line-height:1.2;margin:8px 0 12px;text-wrap:balance}
  .pasos{display:flex;flex-direction:column;gap:7px}
  .paso{display:flex;align-items:baseline;gap:12px;font-size:14px;color:var(--tenue)}
  .punto{width:7px;height:7px;border-radius:50%;background:var(--ok);flex:0 0 auto}
  .paso.riesgo .punto{background:var(--riesgo)} .paso.riesgo .paso-que{color:var(--riesgo)}
  .paso.roto .punto{background:var(--roto)} .paso.roto .paso-que{color:var(--roto)}
  .paso-n{width:18px;color:var(--muy-tenue);font-variant-numeric:tabular-nums;flex:0 0 auto}
  .paso-nota{font-size:12px;color:var(--muy-tenue)}
  .puntos{margin:0;padding-left:18px;color:var(--tenue)}
  .puntos li{margin:6px 0}
  .pie-slide{margin-top:40px;padding-top:14px;border-top:1px solid var(--linea);
             font-size:11px;color:var(--muy-tenue)}
  nav{position:fixed;left:0;right:0;bottom:0;display:flex;align-items:center;
      justify-content:center;gap:14px;padding:14px;background:linear-gradient(transparent,var(--fondo) 45%)}
  nav button{background:none;border:1px solid var(--linea);color:var(--tenue);
             border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer;font-family:inherit}
  nav button:hover:not(:disabled){border-color:rgba(255,255,255,.3);color:var(--tinta)}
  nav button:disabled{opacity:.25;cursor:not-allowed}
  .dots{display:flex;gap:8px}
  .dot{width:30px;height:5px;border-radius:99px;background:rgba(255,255,255,.15);
       border:none;padding:0;cursor:pointer}
  .dot.on{background:rgba(255,255,255,.7)}
  @media print{
    body{background:#fff;color:#0f172a}
    .slide{display:block!important;page-break-after:always;max-width:none;padding:0 0 24px}
    nav{display:none}
    h1,.cifra,.goal-texto,.pregunta,.num{color:#0f172a}
    .cuerpo,.nota,.paso{color:#334155}
    .kicker,.pie,.ref,.etiqueta,.paso-n,.paso-nota,.pie-slide{color:#64748b}
    .fila,.metrica,.veredicto,.chip{border-color:#cbd5e1;background:#f8fafc}
    .respuesta{color:#2175a1;filter:none}
  }
  @media (max-width:640px){ h1{font-size:30px} .goal-texto{font-size:22px} .slide{padding:32px 16px 90px} }
</style>
</head>
<body>
${slides}
<nav>
  <button id="prev">← Anterior</button>
  <span class="dots">${doc.slides
    .map((s, i) => `<button class="dot" data-i="${i}" aria-label="${e(s.titulo)}"></button>`)
    .join('')}</span>
  <button id="next">Siguiente →</button>
</nav>
<script>
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dot');
  var i = 0;
  function ir(n){
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function(s, k){ s.classList.toggle('on', k === i); });
    dots.forEach(function(d, k){ d.classList.toggle('on', k === i); });
    document.getElementById('prev').disabled = i === 0;
    document.getElementById('next').disabled = i === slides.length - 1;
    window.scrollTo(0, 0);
  }
  document.getElementById('prev').onclick = function(){ ir(i - 1); };
  document.getElementById('next').onclick = function(){ ir(i + 1); };
  dots.forEach(function(d){ d.onclick = function(){ ir(+d.dataset.i); }; });
  document.addEventListener('keydown', function(ev){
    if (ev.key === 'ArrowRight' || ev.key === 'PageDown' || ev.key === ' ') ir(i + 1);
    if (ev.key === 'ArrowLeft' || ev.key === 'PageUp') ir(i - 1);
  });
  ir(0);
</script>
</body>
</html>`;

const destino = resolve(process.argv[2] ?? join(AQUI, 'sesion.html'));
writeFileSync(destino, html, 'utf8');
console.log(`${destino}  ·  ${doc.slides.length} slides  ·  ${(html.length / 1024).toFixed(0)} KB`);
