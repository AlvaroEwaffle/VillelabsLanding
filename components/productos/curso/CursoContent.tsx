'use client';

/*
 * /curso — página de venta del curso «El sistema de tu negocio: tu primer CRM y ERP en Google Sheets» en preventa.
 * v1.0 (7-nov-2026) «Tu negocio de punta a punta»; v1.1 (8-nov-2026) reposicionado como «construye tu primer CRM y ERP»
 * con la investigación de demanda (persona Rodrigo) y la base de evidencia. Hero compacto (corrección de Álvaro, 8-nov):
 * cabe en el primer viewport de escritorio y «El curso en corto» queda como franja bajo el hero.
 * Precio: PRECIO_FUNDADOR en lib/productos/curso/curso.ts (null = se oculta la cifra).
 * Medición: todo clic a la compra emite curso_click_compra al dataLayer.
 * v1.2 (9-nov-2026) captura del correo antes del pago: bloque «¿Aún no?» (CursoLead) en el hero y antes de la preventa,
 * y el link de Hotmart lleva src/sck con los UTM de la visita (lib/productos/utm.ts).
 * v1.3 (10-nov-2026) EXP-08: tres heros (A resultado · B dolor · C demostración con el tablero primero), párrafo largo
 * fuera del hero y barra fija de compra en celular.
 * v1.4 (12-nov-2026, 17:00) EXP-13: dos variantes (método de 2-4 días). A = control; B = «módulo 0 primero» (botón principal
 * «Mira gratis el módulo 0», compra como enlace secundario, barra fija de celular al módulo 0, sin «primeros 20 alumnos»).
 * Variante y medición en lib/productos/curso/exp13.ts. Las B/C de EXP-10 (estructura, video primero) se retiraron sin ganador.
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, ClipboardCheck, ClipboardList, Eye, FileSpreadsheet, FlaskConical, Handshake, LayoutDashboard, Map as MapIcon, Megaphone, MessageCircle, Sparkles, Wallet, X, type LucideIcon } from 'lucide-react';
import { LINKS } from '@/lib/productos/links';
import { AREAS, CASO, CUPOS_FUNDADOR, CURSO, FAQ, HOJAS, IA_OPCIONAL, MODULOS, PARA_QUIEN, PRECIO_FUNDADOR, PREVENTA, PROYECTO_FINAL, PRECIO_CURSO, QUE_ES, textoPrecio, textoPrecioDetalle, textoPrecioDetalleSinCupo, textoPrecioSinCupo } from '@/lib/productos/curso/curso';
import { EXP13 } from '@/lib/productos/curso/exp13';
import { VERSION_CURSO, VERSIONES_CURSO, fechaLarga } from '@/lib/productos/curso/versiones';
import EnQueSeBasa from './EnQueSeBasa';
import CursoLead from './CursoLead';
import { hotmartConUtm } from '@/lib/productos/utm';
import { trackCursoClickCompra } from '@/lib/productos/curso/tracking';
import { FOTOS } from '@/lib/productos/fotos';
import { APOYO, type ImagenApoyo } from '@/lib/productos/apoyo';
import { DiagramaComoSeAprende, DiagramaCuelloBotella } from '@/components/productos/diagramas/curso';
import { DiagramaCiclo, Foto, Kicker, TableroMock } from './piezas';
import { VideoMarco } from '@/components/productos/VideoProducto';

// Imagen e ícono por módulo. Regla 20/80 (8-nov-2026): imagen de apoyo ligada al área del módulo
// (lib/productos/apoyo.ts); la cara de Álvaro queda en la portada y en «Quién lo enseña».
const IMAGEN_MODULO: Record<number, { foto: ImagenApoyo; icono: LucideIcon; posicion?: string }> = {
  0: { foto: APOYO.tableroKanban, icono: MapIcon },
  1: { foto: APOYO.cafeteria, icono: Handshake },
  2: { foto: APOYO.contenidoTripode, icono: Megaphone },
  3: { foto: APOYO.cajasDespacho, icono: ClipboardList },
  4: { foto: APOYO.celularMensajes, icono: MessageCircle },
  5: { foto: APOYO.finanzas, icono: Wallet },
  6: { foto: APOYO.tableroLaptop, icono: LayoutDashboard },
};

function BotonCompra({ ubicacion, texto = 'Quiero el curso en preventa', enBarra = false }: { ubicacion: string; texto?: string; enBarra?: boolean }) {
  return (
    <a
      href={LINKS.cursoCompra}
      data-compra={enBarra ? undefined : ubicacion}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        // Atribución: src/sck de Hotmart con los UTM de la visita (se arma al clic para no desalinear el HTML estático).
        e.currentTarget.href = hotmartConUtm(LINKS.cursoCompra, ubicacion);
        trackCursoClickCompra(ubicacion);
      }}
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] ${enBarra ? 'shrink-0 px-5' : 'px-6'} text-sm font-semibold text-white shadow-rosa transition hover:bg-[#ff5c9f]`}
    >
      {texto} <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}

/**
 * EXP-08 · barra fija de compra en celular (<768 px): precio fundador + botón a Hotmart. Aparece cuando ningún botón de
 * compra de la página está a la vista, y se esconde sobre los formularios («¿Aún no?»), la preventa y el pie, para
 * no tapar nada.
 */
function BarraCompraMovil() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const objetivos = Array.from(document.querySelectorAll('[data-compra], [data-sin-barra], #preventa, footer'));
    if (!objetivos.length || typeof IntersectionObserver === 'undefined') return;
    const aLaVista = new Set<Element>();
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) aLaVista.add(e.target);
        else aLaVista.delete(e.target);
      }
      setVisible(aLaVista.size === 0);
    });
    objetivos.forEach((o) => io.observe(o));
    return () => io.disconnect();
  }, []);
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-[9998] border-t border-white/10 bg-[#0f172a]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="min-w-0">
          {PRECIO_FUNDADOR !== null ? (
            <>
              <p className="font-serif text-lg leading-tight text-white">${PRECIO_FUNDADOR.toLocaleString('es-CL')}</p>
              <p className="text-[11px] leading-tight text-[#5fb2dd]">precio fundador · primeros {CUPOS_FUNDADOR}</p>
            </>
          ) : (
            <p className="text-sm text-[#5fb2dd]">{textoPrecio()}</p>
          )}
        </div>
        <BotonCompra ubicacion="barra_movil" texto="Comprar" enBarra />
      </div>
    </div>
  );
}

/**
 * EXP-13 · B · barra fija de celular que lleva al módulo 0 gratis (en vez de a la compra). Misma lógica de aparición que
 * BarraCompraMovil: se esconde cuando hay un botón de compra, el formulario del módulo 0 o el pie a la vista.
 */
function BarraModulo0Movil() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const objetivos = Array.from(document.querySelectorAll('[data-compra], [data-sin-barra], #preventa, footer'));
    if (!objetivos.length || typeof IntersectionObserver === 'undefined') return;
    const aLaVista = new Set<Element>();
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) aLaVista.add(e.target);
        else aLaVista.delete(e.target);
      }
      setVisible(aLaVista.size === 0);
    });
    objetivos.forEach((o) => io.observe(o));
    return () => io.disconnect();
  }, []);
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-[9998] border-t border-white/10 bg-[#0f172a]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-serif text-sm leading-tight text-white">Módulo 0 gratis</p>
          <p className="text-[11px] leading-tight text-[#5fb2dd]">sin tarjeta</p>
        </div>
        <Link
          href="#parte-gratis-hero"
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-5 text-sm font-semibold text-white shadow-rosa transition hover:bg-[#ff5c9f]"
        >
          Ver módulo 0 <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

// 11-nov-2026: el módulo 0 se ve dejando el correo → los botones llevan a la puerta del hero (CursoLead).
function BotonModulo0({ texto = 'Ver el módulo 0', className = 'inline-flex' }: { texto?: string; className?: string }) {
  return (
    <Link
      href="#parte-gratis-hero"
      className={`${className} min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm text-slate-200 transition hover:border-[#5fb2dd]/60 hover:text-white`}
    >
      <Eye className="h-4 w-4" aria-hidden /> {texto}
    </Link>
  );
}

function Seccion({ id, kicker, titulo, bajada, children }: { id?: string; kicker: string; titulo: string; bajada?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">{titulo}</h2>
      {bajada ? <p className="mt-4 max-w-2xl text-slate-300">{bajada}</p> : null}
      {children}
    </section>
  );
}

function Acordeon({ abierto, onToggle, cabecera, children }: { abierto: boolean; onToggle: () => void; cabecera: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border transition ${abierto ? 'border-[#2175a1]/60 bg-[#2175a1]/[0.06]' : 'border-white/10 bg-white/[0.02]'}`}>
      <button type="button" onClick={onToggle} aria-expanded={abierto} className="flex w-full items-start gap-3 p-4 text-left sm:p-5">
        <div className="min-w-0 flex-1">{cabecera}</div>
        <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition ${abierto ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {abierto ? <div className="px-4 pb-5 sm:px-5">{children}</div> : null}
    </div>
  );
}

const BAJADA_PREVENTA = (
  <>
    Compras ahora con <span className="exp13-A">precio fundador</span>
    <span className="exp13-B">precio de preventa</span>, empiezas hoy con el mapa, el diagnóstico y tu planilla base, y el resto llega semana a semana.
  </>
);

export default function CursoContent() {
  const [moduloAbierto, setModuloAbierto] = useState<number | null>(0);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);
  const totalLecciones = MODULOS.reduce((s, m) => s + m.lecciones.length, 0);

  // EXP-13: si se llegó navegando dentro del sitio el script en línea no corrió; se asigna aquí. Aviso a GA4 una vez.
  useEffect(() => {
    EXP13.avisar(EXP13.asignar());
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-[#0f172a] text-slate-100">
      {/* Hero · EXP-13 (12-nov-2026, 17:00): A control (ex A de EXP-10) · B «módulo 0 primero». Mismo título en las dos;
          el CSS muestra lo que toca según <html data-exp13> (script en línea antes de pintar). Sin JS se ve A. */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 md:pt-32">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div className="order-last">
            <figure className="relative aspect-[16/10] max-h-[260px] w-full overflow-hidden rounded-3xl border border-white/10 sm:max-h-[340px] lg:aspect-[4/5] lg:max-h-[460px]">
              <Foto foto={FOTOS.explicando} posicion="center 12%" prioridad />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/50 via-transparent to-transparent" />
            </figure>
          </div>
          <div>
            <Kicker>Curso · Preventa abierta</Kicker>
            <h1 className="mt-3 max-w-3xl font-serif text-[1.9rem] leading-[1.1] text-white sm:text-5xl lg:text-[3.1rem]">
              Ordena tu negocio en una planilla: clientes, pedidos y caja en un solo tablero
            </h1>
            {/* A · control */}
            <div className="exp13-A">
              <p className="mt-3 max-w-xl text-base text-slate-300 sm:text-lg">En 6 semanas y sin programar. El módulo 0 es gratis hoy.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <BotonCompra ubicacion="hero" />
                {/* En celular se oculta aquí (se repite en el programa y al final): un solo botón en el primer pantallazo. */}
                <BotonModulo0 texto="Ver el módulo 0 de muestra" className="hidden sm:inline-flex" />
              </div>
              <p className="mt-3 text-sm text-[#5fb2dd]">{textoPrecio()}</p>
            </div>
            {/* B · «módulo 0 primero»: el botón principal es gratis; abajo, el formulario a la vista. */}
            <div className="exp13-B">
              <p className="mt-3 max-w-xl text-base text-slate-300 sm:text-lg">7 módulos, unas 5 horas de lecciones y sin programar. El módulo 0 es gratis.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="#parte-gratis-hero"
                  data-sin-barra
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white shadow-rosa transition hover:bg-[#ff5c9f]"
                >
                  Mira gratis el módulo 0 <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
            <CursoLead ubicacion="hero" className="mt-6" />
            <div className="exp13-B">
              <p className="mt-4 py-1 text-sm leading-7 text-slate-400">
                ¿Prefieres comprarlo ya?{' '}
                <a
                  href={LINKS.cursoCompra}
                  data-compra="hero_secundario"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.currentTarget.href = hotmartConUtm(LINKS.cursoCompra, 'hero_secundario');
                    trackCursoClickCompra('hero_secundario');
                  }}
                  className="py-2 text-[#5fb2dd] underline underline-offset-2 hover:text-white"
                >
                  Compra el curso en preventa
                </a>{' '}
                · {textoPrecioSinCupo()}
              </p>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Versión {VERSION_CURSO.version} · actualizado el {fechaLarga(VERSION_CURSO.fecha)} ·{' '}
              <a href="#versiones" className="underline-offset-2 hover:text-slate-300 hover:underline">
                qué cambió
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* El curso en corto: franja bajo el hero (5 datos en fila en escritorio, apilados en celular). */}
      <section aria-label="El curso en corto" className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {CURSO.formato.map((f, i) => (
            <div key={f.etiqueta} className={`bg-[#111a2e] p-4 sm:p-5 ${i === CURSO.formato.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{f.etiqueta}</dt>
              <dd className="mt-1.5 text-sm text-slate-100">{f.valor}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-3xl text-slate-300">{CURSO.promesa}</p>
        <p className="mt-3 max-w-3xl text-sm text-slate-400">{CURSO.noEsSoftware}</p>
        {/* Video 8 · venta de la preventa (regrabado con el enfoque CRM/ERP, 8-nov-2026). */}
        <VideoMarco id="v08-curso-venta" titulo="Tu primer CRM y ERP, en 6 semanas" duracion="49 s" className="mt-10" />
      </section>

      {/* Para quién */}
      <Seccion kicker="Para quién es" titulo="Para dueñas y dueños de pyme que hoy son el cuello de botella.">
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-[260px_1fr_1fr]">
          <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 md:col-span-2 lg:col-span-1 lg:aspect-auto lg:min-h-[320px]">
            <Foto foto={APOYO.celularPendientes} posicion="55% 40%" />
          </figure>
          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="font-serif text-xl text-white">Es para ti si…</h3>
            <ul className="mt-4 space-y-3">
              {PARA_QUIEN.si.map((x) => (
                <li key={x} className="flex gap-3 text-slate-300">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="font-serif text-xl text-white">No es para ti si…</h3>
            <ul className="mt-4 space-y-3">
              {PARA_QUIEN.no.map((x) => (
                <li key={x} className="flex gap-3 text-slate-400">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DiagramaCuelloBotella className="mt-5" />
      </Seccion>

      {/* Qué es un CRM y un ERP + el mapa del sistema */}
      <Seccion
        kicker="El sistema"
        titulo="Tu primer CRM y ERP, hoja por hoja."
        bajada="Todo pasa por ti porque nada está anotado en un solo lugar. El curso junta tu negocio en una planilla: cada módulo le agrega una hoja y el tablero las lee todas."
      >
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Qué es un CRM</p>
            <p className="mt-2 font-serif text-xl text-white">Es {QUE_ES.crm}</p>
            <p className="mt-2 text-sm text-slate-400">En tu planilla: la hoja Clientes. Si hiciste la Guía 1, ya tienes la primera parte.</p>
          </div>
          <div className="rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Qué es un ERP</p>
            <p className="mt-2 font-serif text-xl text-white">Es {QUE_ES.erp}</p>
            <p className="mt-2 text-sm text-slate-400">En tu planilla: todas las hojas juntas, con un tablero que calcula tus números solo.</p>
          </div>
        </div>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[380px_1fr]">
          <div className="mx-auto w-full max-w-[340px] lg:max-w-none">
            <DiagramaCiclo areas={AREAS} />
          </div>
        <ol className="grid gap-4 sm:grid-cols-2">
          {AREAS.map((a, i) => (
            <li key={a.id} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="font-mono text-xs text-[#5fb2dd]">0{i + 1} · Módulo {a.modulo} · hoja {a.hoja}</p>
              <h3 className="mt-3 font-serif text-xl text-white">{a.nombre}</h3>
              <p className="mt-2 text-sm text-slate-300">{a.corto}</p>
              <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">{a.pasaA}</p>
            </li>
          ))}
        </ol>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-slate-400">
          Al centro: el tablero del módulo 6, que lee todas las hojas y te muestra tus números del lunes. Y en el módulo 0, tus reglas de freno: lo que decide siempre una persona.
        </p>
      </Seccion>

      {/* Módulos */}
      <Seccion
        id="modulos"
        kicker="El programa"
        titulo={`${MODULOS.length} módulos, ${totalLecciones} lecciones cortas.`}
        bajada="Cada módulo cierra con una prueba real en tu negocio y suma una hoja a tu planilla."
      >
        <div className="mt-10 space-y-3">
          {MODULOS.map((m) => (
            <Acordeon
              key={m.numero}
              abierto={moduloAbierto === m.numero}
              onToggle={() => setModuloAbierto(moduloAbierto === m.numero ? null : m.numero)}
              cabecera={
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-16 sm:w-16">
                    <Foto foto={IMAGEN_MODULO[m.numero].foto} posicion={IMAGEN_MODULO[m.numero].posicion ?? 'center'} />
                    <span className="absolute bottom-0.5 right-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-[#0f172a]/90">
                      {(() => {
                        const Icono = IMAGEN_MODULO[m.numero].icono;
                        return <Icono className="h-3.5 w-3.5 text-[#5fb2dd]" aria-hidden />;
                      })()}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">
                      Módulo {m.numero} · {m.area}
                    </p>
                    <p className="mt-1.5 font-serif text-xl text-white sm:text-2xl">{m.titulo}</p>
                    <p className="mt-1 text-xs text-slate-400">{m.duracion}</p>
                  </div>
                </div>
              }
            >
              <div className="grid gap-5 md:grid-cols-[1fr_220px]">
              <ol className="space-y-3">
                {m.lecciones.map((l, i) => (
                  <li key={l.titulo} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-[11px] text-slate-300">{i + 1}</span>
                    <div>
                      <p className="text-slate-100">{l.titulo}</p>
                      <p className="mt-0.5 text-sm text-slate-400">{l.detalle}</p>
                    </div>
                  </li>
                ))}
              </ol>
                <figure className="relative order-first aspect-[16/9] overflow-hidden rounded-xl border border-white/10 md:order-none md:aspect-[4/5]">
                  <Foto foto={IMAGEN_MODULO[m.numero].foto} posicion={IMAGEN_MODULO[m.numero].posicion ?? 'center'} />
                </figure>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#5fb2dd]/25 bg-[#5fb2dd]/[0.06] p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#5fb2dd]">
                    <FlaskConical className="h-4 w-4" aria-hidden /> Prueba real
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{m.pruebaReal}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
                    <ClipboardCheck className="h-4 w-4" aria-hidden /> Entregable
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{m.entregable}</p>
                </div>
              </div>
              {m.numero === 0 ? (
                <div className="mt-5">
                  <BotonModulo0 texto="Ver el módulo 0 completo" />
                </div>
              ) : null}
            </Acordeon>
          ))}
        </div>
      </Seccion>

      {/* Cómo funciona cada módulo + caso */}
      <Seccion kicker="Cómo se aprende" titulo="Idea, demo, plantilla y prueba real.">
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
          <ul className="space-y-4">
            {CURSO.comoFunciona.map((x, i) => (
              <li key={x} className="flex gap-4 rounded-2xl border border-white/10 p-5">
                <span className="font-mono text-sm text-[#5fb2dd]">0{i + 1}</span>
                <p className="text-slate-300">{x}</p>
              </li>
            ))}
          </ul>
          <DiagramaComoSeAprende />
          <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-white">¿Y la inteligencia artificial?</p>
              <p className="mt-1 text-sm text-slate-300">{IA_OPCIONAL}</p>
            </div>
          </div>
          </div>
          <div className="self-start overflow-hidden rounded-2xl border border-[#2175a1]/40 bg-gradient-to-br from-[#2175a1]/15 to-transparent">
            {/* Ilustración del caso: Camila en Grano Norte (motor de personajes LXD). */}
            <div className="relative aspect-[16/7]">
              <Foto foto={APOYO.escenaBodega} posicion="center 35%" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
            </div>
            <div className="p-6 pt-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5fb2dd]">El caso que recorre el curso</p>
            <h3 className="mt-3 font-serif text-2xl text-white">{CASO.nombre}</h3>
            <p className="mt-3 text-slate-300">{CASO.texto}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {CASO.datos.map((d) => (
                <div key={d.etiqueta} className="rounded-xl bg-white/[0.04] p-3">
                  <dt className="text-[11px] uppercase tracking-wider text-slate-500">{d.etiqueta}</dt>
                  <dd className="mt-1 text-sm text-slate-100">{d.valor}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-slate-500">{CASO.nota}</p>
            </div>
          </div>
        </div>
      </Seccion>

      {/* Proyecto final */}
      <Seccion kicker="Proyecto final" titulo={PROYECTO_FINAL.titulo} bajada={PROYECTO_FINAL.texto}>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <TableroMock />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <FileSpreadsheet className="h-6 w-6 text-[#5fb2dd]" aria-hidden />
            <ul className="mt-4 space-y-3">
              {PROYECTO_FINAL.incluye.map((x) => (
                <li key={x} className="flex gap-3 text-slate-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 p-6 md:col-span-2 md:order-last lg:col-span-3">
            <h3 className="font-serif text-xl text-white">Las hojas de tu planilla</h3>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {HOJAS.map((h) => (
                <li key={h.nombre} className="text-sm">
                  <p className="text-white">
                    {h.nombre} <span className="font-mono text-[11px] text-[#5fb2dd]">· módulo {h.modulo}</span>
                  </p>
                  <p className="mt-0.5 text-slate-400">{h.guarda}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">Funciona en Google Sheets, gratis, o en Excel. Las fórmulas vienen listas: tú llenas filas.</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="font-serif text-xl text-white">Al cerrar el curso</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {PROYECTO_FINAL.cierre.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </Seccion>

      {/* Antes de la compra: segunda oportunidad de dejar el correo (bloque «¿Aún no?»). */}
      <section aria-label="Parte gratis" className="mx-auto max-w-6xl px-4 sm:px-6">
        <CursoLead ubicacion="antes_preventa" className="max-w-3xl" />
      </section>

      {/* Preventa */}
      <Seccion
        id="preventa"
        kicker="Cómo funciona la preventa"
        titulo="El módulo 0 hoy. Un módulo nuevo cada semana."
        bajada={BAJADA_PREVENTA}
      >
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ol className="relative space-y-3 border-l border-white/10 pl-6">
            {PREVENTA.pasos.map((p) => (
              <li key={p.cuando} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ${p.modulo === 0 ? 'bg-[#5fb2dd] ring-4 ring-[#5fb2dd]/20' : 'border border-white/30 bg-[#0f172a]'}`}
                />
                <p className={`font-mono text-xs uppercase tracking-wider ${p.modulo === 0 ? 'text-[#5fb2dd]' : 'text-slate-500'}`}>{p.cuando}</p>
                <p className="mt-0.5 text-slate-200">{p.texto}</p>
              </li>
            ))}
          </ol>
          <div className="overflow-hidden rounded-3xl border border-[#2175a1]/50 bg-gradient-to-br from-[#2175a1]/20 via-slate-900 to-slate-950">
            <div className="relative aspect-[16/8]">
              <Foto foto={APOYO.calendario} posicion="center 45%" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#13213a] via-transparent to-transparent" />
            </div>
            <div className="p-6 pt-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5fb2dd]">Preventa</p>
            <p className="mt-3 font-serif text-2xl text-white">
              <span className="exp13-A">{textoPrecio()}</span>
              <span className="exp13-B">{textoPrecioSinCupo()}</span>
            </p>
            <p className="mt-2 text-sm text-slate-300">
              <span className="exp13-A">{textoPrecioDetalle()}</span>
              <span className="exp13-B">{textoPrecioDetalleSinCupo()}</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden /> Módulo 0 y tu planilla base al tiro</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden /> Los 7 módulos y la planilla completa del sistema</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden /> Avanzas a tu ritmo: los módulos no se cierran</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden /> Certificado al entregar tu proyecto final</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden /> Pago único o en cuotas, con {PRECIO_CURSO.garantiaDias} días de garantía</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <BotonCompra ubicacion="preventa" texto="Comprar en preventa" />
            </div>
            <p className="mt-4 text-xs text-slate-500">{PREVENTA.nota}</p>
            </div>
          </div>
        </div>
      </Seccion>

      {/* Quién lo enseña + En qué se basa */}
      <div>
      {/* Quién lo enseña */}
      <Seccion kicker="Quién lo enseña" titulo="Álvaro Villena">
        <div className="mt-10 grid items-center gap-8 md:grid-cols-[360px_1fr]">
          <div className="mx-auto grid w-full max-w-[360px] grid-cols-[1.4fr_1fr] grid-rows-2 gap-2">
            <figure className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
              <Foto foto={FOTOS.ciudad} posicion="center 30%" />
            </figure>
            <figure className="relative overflow-hidden rounded-2xl border border-white/10">
              <Foto foto={FOTOS.podcasterCerca} posicion="center 30%" />
            </figure>
            <figure className="relative overflow-hidden rounded-2xl border border-white/10">
              <Foto foto={FOTOS.trabajando} />
            </figure>
          </div>
          <div className="space-y-4 text-slate-300">
            <p>
              Ingeniero industrial de la Universidad de Chile, con más de 8 años liderando equipos de producto en LATAM Airlines, en PepsiCo a través de Toptal y en startups.
            </p>
            <p>
              Hoy dirijo Villelab y dos negocios propios, Ewaffle y Fidelidapp. Este curso es el mismo orden que uso en ellos todos los días: qué se anota y dónde, qué se revisa cada semana y qué decide siempre una persona.
            </p>
            <Link href="/sobre-mi" className="inline-flex min-h-[44px] items-center gap-1 text-sm text-[#5fb2dd] hover:text-white">
              Más sobre mí <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Seccion>

      <EnQueSeBasa />
      </div>

      {/* FAQ */}
      <Seccion kicker="Preguntas frecuentes" titulo="Lo que más nos preguntan.">
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <Acordeon
              key={f.p}
              abierto={faqAbierta === i}
              onToggle={() => setFaqAbierta(faqAbierta === i ? null : i)}
              cabecera={
                f.p.includes('precio fundador') ? (
                  <p className="text-base text-white">
                    ¿Por qué tiene <span className="exp13-A">precio fundador</span>
                    <span className="exp13-B">precio de preventa</span>?
                  </p>
                ) : (
                  <p className="text-base text-white">{f.p}</p>
                )
              }
            >
              <p className="text-slate-300">{f.r}</p>
            </Acordeon>
          ))}
        </div>
          <figure className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 lg:sticky lg:top-28 lg:block">
            <Foto foto={APOYO.mesaCafe} posicion="center" />
          </figure>
        </div>
      </Seccion>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 pb-32 pt-10 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#2175a1]/25 via-slate-900 to-slate-950 md:grid-cols-[1fr_320px]">
          <figure className="relative aspect-[16/9] md:order-last md:aspect-auto">
            <Foto foto={APOYO.tostaduriaPlanta} posicion="center" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 to-transparent md:bg-gradient-to-r" />
          </figure>
          <div className="p-6 sm:p-10">
          <h2 className="max-w-2xl font-serif text-3xl text-white sm:text-4xl">Empieza hoy con el mapa y tu planilla base.</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            En 30 minutos sabes qué pieza de tu negocio está en rojo, por dónde partir y qué decisiones no deberían salir de tus manos, y te llevas la planilla donde vas a armar tu sistema. Lo demás llega semana a semana.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BotonCompra ubicacion="cta_final" />
            <BotonModulo0 />
          </div>
          </div>
        </div>
        <div id="versiones" className="mt-10 scroll-mt-24 rounded-2xl border border-white/10 p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Producto vivo · historial de versiones</p>
          <ol className="mt-4 space-y-4">
            {VERSIONES_CURSO.map((v) => (
              <li key={v.version}>
                <p className="text-sm text-white">
                  Versión {v.version} <span className="text-slate-500">· {fechaLarga(v.fecha)}</span>
                </p>
                <ul className="mt-1 space-y-1 text-sm text-slate-400">
                  {v.cambios.map((c) => (
                    <li key={c}>· {c}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <div className="exp13-A">
        <BarraCompraMovil />
      </div>
      <div className="exp13-B">
        <BarraModulo0Movil />
      </div>
    </main>
  );
}
