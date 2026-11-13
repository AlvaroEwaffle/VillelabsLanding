'use client';

/*
 * /curso — página de venta del curso «Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar».
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
 * v1.5 (12-nov-2026, noche, OK de Álvaro «haz todos los ajustes»): común a A y B. Duración medida (1 h 30 + 6 h de práctica),
 * sin «preventa» (precio de lanzamiento; los 7 módulos listos), sin certificado, prompts dentro de las lecciones.
 * v1.6 (13-nov-2026) cierre de EXP-13 (gana B sin potencia: queda «módulo 0 primero» para todos) y EXP-15 «promesa automatizar»
 * (lib/productos/curso/exp15.ts). Hero sin la foto grande y sección «Qué te llevas / Qué vas a aprender» bajo el hero (QueTeLlevas).
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, ClipboardCheck, ClipboardList, Eye, FileSpreadsheet, FlaskConical, Handshake, LayoutDashboard, Map as MapIcon, Megaphone, MessageCircle, Sparkles, Wallet, X, type LucideIcon } from 'lucide-react';
import { LINKS } from '@/lib/productos/links';
import { ACCESO, AREAS, CASO, CURSO, FAQ, HOJAS, IA_OPCIONAL, MODULOS, PARA_QUIEN, PROYECTO_FINAL, PRECIO_CURSO, QUE_ES, textoPrecio, textoPrecioDetalle } from '@/lib/productos/curso/curso';
import { EXP15, PROMESA_EXP15 } from '@/lib/productos/curso/exp15';
import { bajarAlAncla } from '@/lib/productos/ancla';
import { VERSION_CURSO, VERSIONES_CURSO, fechaLarga } from '@/lib/productos/curso/versiones';
import CursoLead from './CursoLead';
import QueTeLlevas from './QueTeLlevas';
import QuienLoEnsena from './QuienLoEnsena';
import { TIEMPO } from '@/lib/productos/curso/llevas';
import { hotmartConUtm } from '@/lib/productos/utm';
import { trackCursoClickCompra } from '@/lib/productos/curso/tracking';
import { APOYO, type ImagenApoyo } from '@/lib/productos/apoyo';
import { DiagramaComoSeAprende, DiagramaCuelloBotella } from '@/components/productos/diagramas/curso';
import { Foto, Kicker } from './piezas';
import { Armado, DiagramaCiclo, orden, TableroMock } from './animados';
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

function BotonCompra({ ubicacion, texto = 'Quiero el curso', enBarra = false }: { ubicacion: string; texto?: string; enBarra?: boolean }) {
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
 * Cuándo se muestran las barras fijas de celular (A y B por igual). Se esconden si hay a la vista un botón de compra, el
 * formulario del módulo 0 ([data-sin-barra]), la sección de compra o el pie.
 * 13-nov-2026: la «pantalla» que se vigila se alarga 140 px hacia abajo (alto de la barra + margen), así la barra se va
 * ANTES de que el formulario o el pie (con su logo) entren por debajo de ella, y no alcanza a taparlos ni un instante.
 * También se esconde mientras se escribe en el formulario (con el teclado abierto).
 */
function useBarraVisible(): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const objetivos = Array.from(document.querySelectorAll('[data-compra], [data-sin-barra], #comprar, footer'));
    if (!objetivos.length || typeof IntersectionObserver === 'undefined') return;
    const aLaVista = new Set<Element>();
    let escribiendo = false;
    const actualizar = () => setVisible(aLaVista.size === 0 && !escribiendo);
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) aLaVista.add(e.target);
          else aLaVista.delete(e.target);
        }
        actualizar();
      },
      { rootMargin: '0px 0px 140px 0px' },
    );
    objetivos.forEach((o) => io.observe(o));
    const enFormulario = (t: EventTarget | null) => !!(t as Element | null)?.closest?.('[data-sin-barra]');
    const alEntrar = (e: FocusEvent) => {
      escribiendo = enFormulario(e.target);
      actualizar();
    };
    const alSalir = (e: FocusEvent) => {
      escribiendo = enFormulario(e.relatedTarget);
      actualizar();
    };
    document.addEventListener('focusin', alEntrar);
    document.addEventListener('focusout', alSalir);
    return () => {
      io.disconnect();
      document.removeEventListener('focusin', alEntrar);
      document.removeEventListener('focusout', alSalir);
    };
  }, []);
  return visible;
}

// 13-nov-2026: BarraCompraMovil (EXP-08, barra fija de compra en celular) se retiró al cerrar EXP-13: ganó la barra al módulo 0.

/**
 * Barra fija de celular que lleva al módulo 0 gratis (B de EXP-13, ganadora; desde EXP-15 la ven todos). Se esconde cuando hay un botón de compra, el formulario del módulo 0 o el pie a la vista.
 */
function BarraModulo0Movil() {
  const visible = useBarraVisible();
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-[9990] border-t border-white/10 bg-[#0f172a]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
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

/**
 * Acordeón de módulos (13-nov-2026, pedido de Álvaro: «cada módulo debe estar animado, el acordeón al hacer clic»).
 * Abre y cierra con altura (grid-template-rows 0fr → 1fr) y opacidad en 300 ms; el chevrón gira. El contenido SIEMPRE está
 * en el HTML (SEO y sin JS); cerrado queda `inert` y aria-hidden. Botón real con aria-expanded y aria-controls.
 * Con prefers-reduced-motion, sin transición. Un solo módulo abierto a la vez (estado en CursoContent).
 */
function Acordeon({ id, abierto, onToggle, cabecera, children }: { id: string; abierto: boolean; onToggle: () => void; cabecera: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={`group/acordeon rounded-2xl border transition-colors duration-300 ${abierto ? 'border-[#2175a1]/60 bg-[#2175a1]/[0.06]' : 'border-white/10 bg-white/[0.02] hover:border-[#5fb2dd]/40'}`}>
      <button
        type="button"
        id={`${id}-boton`}
        onClick={onToggle}
        aria-expanded={abierto}
        aria-controls={`${id}-panel`}
        className="flex w-full items-start gap-3 rounded-2xl p-4 text-left transition-transform duration-150 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5fb2dd] motion-reduce:transition-none sm:p-5"
      >
        <div className="min-w-0 flex-1">{cabecera}</div>
        <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 motion-reduce:transition-none ${abierto ? 'rotate-180 text-[#5fb2dd]' : ''}`} aria-hidden />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-boton`}
        aria-hidden={!abierto}
        inert={!abierto}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-5 sm:px-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

const BAJADA_ACCESO = <>Compras hoy, entras con tu código a los 7 módulos y la planilla completa, y avanzas a tu ritmo.</>;

export default function CursoContent() {
  const [moduloAbierto, setModuloAbierto] = useState<number | null>(0);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);
  const totalLecciones = MODULOS.reduce((s, m) => s + m.lecciones.length, 0);

  // EXP-15: si se llegó navegando dentro del sitio el script en línea no corrió; se asigna aquí. Aviso a GA4 una vez.
  useEffect(() => {
    EXP15.avisar(EXP15.asignar());
  }, []);

  // 13-nov-2026: si el anuncio llegó con el fbclid pegado al ancla (#parte-gratis-hero?fbclid=…), baja al formulario.
  useEffect(() => bajarAlAncla(), []);

  return (
    <main className="relative w-full overflow-x-hidden bg-[#0f172a] text-slate-100">
      {/* Hero · EXP-15 (13-nov-2026) «promesa automatizar». Base = la B de EXP-13 («módulo 0 primero», ganó sin potencia:
          2 de 6 visitas bajaron ≥25 % contra 0 de 8 en A). A = control (H1 del anuncio v17 «Ordena tu negocio en una planilla»).
          B = H1 «Aprende a automatizar…» con CRM y ERP como palabras clave. El CSS muestra lo que toca según <html data-exp15>
          (script en línea antes de pintar). Sin JS se ve A. */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 md:pt-32">
        {/* 13-nov-2026 (Álvaro: «quitando la foto grande en el Hero, ya que hay un mini avatar»): sin foto, una sola columna centrada
            (sin hueco a la derecha en escritorio). Común a A y B. */}
        <div className="mx-auto max-w-3xl">
          <div>
            <div className="exp15-A">
              <Kicker>Curso · Los 7 módulos listos</Kicker>
              <h1 className="mt-3 max-w-3xl font-serif text-[1.9rem] leading-[1.1] text-white sm:text-5xl lg:text-[3.1rem]">
                Ordena tu negocio en una planilla: clientes, pedidos y caja en un solo tablero, con ayuda de la IA
              </h1>
              <p className="mt-3 max-w-xl text-base text-slate-300 sm:text-lg">Paso a paso y sin programar: tú armas la planilla y la IA te ayuda con las fórmulas y los mensajes.</p>
            </div>
            {/* B · el antetítulo repite la pregunta del anuncio de Meta para que se sienta continuación. */}
            <div className="exp15-B">
              <p className="text-sm text-[#5fb2dd] sm:text-base">{PROMESA_EXP15.antetitulo}</p>
              <h1 className="mt-3 max-w-3xl font-serif text-[1.9rem] leading-[1.1] text-white sm:text-5xl lg:text-[3.1rem]">{PROMESA_EXP15.titulo}</h1>
              <p className="mt-3 max-w-xl text-base text-slate-300 sm:text-lg">{PROMESA_EXP15.bajada}</p>
            </div>
            <a href="#quien-lo-ensena" className="mt-3 inline-flex min-h-[44px] items-center gap-2.5 text-sm text-slate-400 hover:text-white">
              {/* 13-nov-2026 (velocidad): miniatura de 96 px (2,3 KB) en vez de la foto de 1080 px (292 KB), que React precargaba con prioridad alta. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fotos/alvaro-podcast-96.webp" alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover" />
              <span>
                Te lo enseña <span className="text-slate-200 underline decoration-white/30 underline-offset-2">Álvaro Villena</span>, que usa este mismo orden en sus propios negocios
              </span>
            </a>
            {/* Botón principal gratis (ganó en EXP-13); abajo, el formulario a la vista. Común a A y B de EXP-15. */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="#parte-gratis-hero"
                data-sin-barra
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white shadow-rosa transition hover:bg-[#ff5c9f]"
              >
                Mira gratis el módulo 0 <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            {/* B · CRM y ERP como palabras clave, bajo el botón para que el botón quepa en 360×560 (navegador de Instagram). */}
            <div className="exp15-B">
              <ul aria-label="Palabras clave" className="mt-4 flex flex-wrap gap-2">
                {PROMESA_EXP15.chips.map((c) => (
                  <li key={c.clave} className="rounded-full border border-[#5fb2dd]/40 bg-[#2175a1]/15 px-3 py-1 text-xs text-slate-200">
                    <span className="font-mono font-semibold tracking-[0.12em] text-[#9fd3ee]">{c.clave}</span> = {c.texto}
                  </li>
                ))}
              </ul>
            </div>
            <CursoLead ubicacion="hero" className="mt-6" />
            <div>
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
                  Compra el curso
                </a>{' '}
                · {textoPrecio()}
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

      {/* 13-nov-2026 · segunda sección (Álvaro: «QUÉ TE VAS A LLEVAR y QUÉ VAS A APRENDER… bien destacados, bien animados»). */}
      <QueTeLlevas />

      {/* 13-nov-2026 · tercera sección: «Quién lo enseña» sube y se funde con «En qué se basa» en un relato en primera persona. */}
      <QuienLoEnsena />

      {/* El curso en corto: franja bajo el hero (5 datos en fila en escritorio, apilados en celular). */}
      <section aria-label="El curso en corto" className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Nombre del curso elegido por Álvaro (11-nov), igual que en <title>, OG, JSON-LD y Hotmart. */}
        <Kicker>El curso</Kicker>
        <h2 className="mb-6 mt-3 max-w-3xl font-serif text-2xl leading-snug text-white sm:text-3xl">{CURSO.nombreCompleto}</h2>
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
        {/* Video 8 · venta del curso (enfoque CRM/ERP, 8-nov-2026; 12-nov sin la frase de preventa: v08b). */}
        <VideoMarco id="v08b-curso-venta" titulo="Construye con IA tu sistema CRM y ERP" duracion="40 s" className="mt-10" />
      </section>

      {/* Para quién */}
      <Seccion kicker="Para quién es" titulo="Para dueñas y dueños de pyme que hoy son el cuello de botella.">
        <Armado className="a-cascada mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-[260px_1fr_1fr]">
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
        </Armado>
        <DiagramaCuelloBotella className="mt-5" />
      </Seccion>

      {/* Qué es un CRM y un ERP + el mapa del sistema */}
      <Seccion
        kicker="El sistema"
        titulo="Tu CRM y ERP, hoja por hoja."
        bajada="Todo pasa por ti porque nada está anotado en un solo lugar. El curso junta tu negocio en una planilla: cada módulo llena una hoja y el tablero las lee todas."
      >
        <Armado className="a-cascada mt-8 grid gap-3 md:grid-cols-2">
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
        </Armado>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[380px_1fr]">
          <div className="mx-auto w-full max-w-[340px] lg:max-w-none">
            <DiagramaCiclo areas={AREAS} />
          </div>
        <Armado as="ol" className="a-cascada grid gap-4 sm:grid-cols-2">
          {AREAS.map((a, i) => (
            <li key={a.id} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="font-mono text-xs text-[#5fb2dd]">0{i + 1} · Módulo {a.modulo} · hoja {a.hoja}</p>
              <h3 className="mt-3 font-serif text-xl text-white">{a.nombre}</h3>
              <p className="mt-2 text-sm text-slate-300">{a.corto}</p>
              <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">{a.pasaA}</p>
            </li>
          ))}
        </Armado>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-slate-400">
          Al centro: el tablero del módulo 6, que lee todas las hojas y te muestra tus números del lunes. Y en el módulo 0, tus reglas de freno: lo que decide siempre una persona.
        </p>
      </Seccion>

      {/* Módulos */}
      <Seccion
        id="modulos"
        kicker="El programa"
        titulo="Lo que vamos a ver, módulo por módulo."
        bajada={
          <>
            <span className="font-serif text-2xl text-white">{TIEMPO.grande}</span> {TIEMPO.detalle}{' '}
            <span className="mt-2 block text-sm text-slate-400">
              {MODULOS.length} módulos · {totalLecciones} lecciones. Cada módulo cierra con una prueba real en tu negocio y llena una hoja de tu planilla.
            </span>
          </>
        }
      >
        {/* 13-nov-2026: los módulos como línea de tiempo que se dibuja al entrar en pantalla (.a-linea) y entran escalonados. */}
        <Armado className="relative mt-10 space-y-3 pl-5 sm:pl-7">
          <span aria-hidden className="a-linea absolute bottom-6 left-1.5 top-6 w-px bg-gradient-to-b from-[#5fb2dd] via-[#5fb2dd]/40 to-transparent sm:left-2.5" />
          {MODULOS.map((m, im) => (
            <div key={m.numero} className="a-pieza relative" style={orden(im)}>
            <span aria-hidden className={`absolute -left-[18px] top-7 h-2.5 w-2.5 rounded-full ring-4 transition-colors duration-300 sm:-left-[24px] ${moduloAbierto === m.numero ? 'bg-[#FF3D8B] ring-[#FF3D8B]/20' : 'bg-[#5fb2dd] ring-[#5fb2dd]/15'}`} />
            <Acordeon
              id={`modulo-${m.numero}`}
              abierto={moduloAbierto === m.numero}
              onToggle={() => setModuloAbierto(moduloAbierto === m.numero ? null : m.numero)}
              cabecera={
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 transition-transform duration-300 group-hover/acordeon:-rotate-2 group-hover/acordeon:scale-105 motion-reduce:transition-none sm:h-16 sm:w-16">
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
                      {m.numero === 0 ? <span className="ml-2 rounded-full bg-[#FF3D8B]/15 px-2 py-0.5 text-[10px] text-[#ff8fbd]">gratis</span> : null}
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
                  <li
                    key={l.titulo}
                    className={`flex gap-3 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${moduloAbierto === m.numero ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                    style={{ transitionDelay: moduloAbierto === m.numero ? `${120 + i * 45}ms` : '0ms' }}
                  >
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-colors duration-500 ${moduloAbierto === m.numero ? 'border-[#5fb2dd]/60 text-[#5fb2dd]' : 'border-white/15 text-slate-300'}`}>{i + 1}</span>
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
            </div>
          ))}
        </Armado>
      </Seccion>

      {/* Cómo funciona cada módulo + caso */}
      <Seccion kicker="Cómo se aprende" titulo="Idea, demo, plantilla y prueba real.">
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
          <Armado as="ul" className="a-cascada space-y-4">
            {CURSO.comoFunciona.map((x, i) => (
              <li key={x} className="flex gap-4 rounded-2xl border border-white/10 p-5">
                <span className="font-mono text-sm text-[#5fb2dd]">0{i + 1}</span>
                <p className="text-slate-300">{x}</p>
              </li>
            ))}
          </Armado>
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
      {/* 13-nov-2026: titulares sin protagonismo de «Google Sheets» (Álvaro): se habla de «tu planilla» y «tu tablero». */}
      <Seccion kicker="Proyecto final" titulo="Tu sistema en una planilla, con su tablero." bajada={PROYECTO_FINAL.texto}>
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
          {/* 13-nov-2026 (Álvaro: «mejor damos la planilla desde un inicio y que la vaya trabajando»): la planilla se entrega en el
              módulo 0 y cada módulo activa una hoja de ESA planilla. Animación: las hojas se «encienden» en el orden del curso
              y el tablero, al final, pulsa (se llena solo). */}
          <Armado className="rounded-2xl border border-white/10 p-6 md:col-span-2 md:order-last lg:col-span-3">
            <h3 className="font-serif text-xl text-white">Las hojas de tu planilla</h3>
            <p className="mt-2 max-w-2xl text-slate-300">Recibes tu planilla en el módulo 0. En cada módulo llenas una hoja, hasta que el tablero se llena solo.</p>
            <ol className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {[...HOJAS].sort((x, y) => x.modulo - y.modulo || (x.nombre === 'Productos' ? 1 : -1)).map((h, i, arr) => (
                <li key={h.nombre} className={`a-encender flex gap-3 rounded-xl border p-3 text-sm ${i === arr.length - 1 ? 'a-pulso border-[#5fb2dd]/60 bg-[#2175a1]/15' : 'border-white/10 bg-white/[0.02]'}`} style={orden(i)}>
                  <span aria-hidden className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#5fb2dd] shadow-[0_0_10px_#5fb2dd]" />
                  <span>
                    <span className="text-white">
                      {h.nombre} <span className="font-mono text-[11px] text-[#5fb2dd]">· módulo {h.modulo}</span>
                    </span>
                    <span className="mt-0.5 block text-slate-400">{h.guarda}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-slate-500">Las fórmulas vienen listas: tú llenas filas.</p>
          </Armado>
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
        <CursoLead ubicacion="antes_compra" className="max-w-3xl" />
      </section>

      {/* Compra · 12-nov-2026: ya no es preventa (los 7 módulos están grabados y abiertos para quien compra). */}
      <Seccion
        id="comprar"
        kicker="Precio"
        titulo="Entras a los 7 módulos y avanzas a tu ritmo."
        bajada={BAJADA_ACCESO}
      >
        {/* 13-nov-2026: sale «Qué recibes» (la lista de módulos «Listo»), cubierta por «Qué te llevas». Queda la tarjeta de precio
            con lo que no está arriba: cuotas, 7 días de garantía y cómo se entra (código en Hotmart). */}
        <Armado className="mt-10 max-w-xl">
          <div className="a-pieza" style={orden(0)}>
          <div className="overflow-hidden rounded-3xl border border-[#2175a1]/50 bg-gradient-to-br from-[#2175a1]/20 via-slate-900 to-slate-950">
            <div className="relative aspect-[16/8]">
              <Foto foto={APOYO.calendario} posicion="center 45%" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#13213a] via-transparent to-transparent" />
            </div>
            <div className="p-6 pt-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5fb2dd]">Precio de lanzamiento</p>
            <p className="mt-3 font-serif text-2xl text-white">
              {textoPrecio()}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {textoPrecioDetalle()}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden /> Los 7 módulos y la planilla completa del sistema, desde hoy</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden /> Cada módulo trae prompts listos para copiar en ChatGPT o Claude</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden /> Avanzas a tu ritmo: los módulos no se cierran</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" aria-hidden /> Pago único o en cuotas, con {PRECIO_CURSO.garantiaDias} días de garantía</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <BotonCompra ubicacion="comprar" />
            </div>
            <p className="mt-4 text-xs text-slate-500">{ACCESO.nota}</p>
            </div>
          </div>
          </div>
        </Armado>
      </Seccion>

      {/* FAQ */}
      <Seccion kicker="Preguntas frecuentes" titulo="Lo que más me preguntan.">
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_300px]">
        <Armado className="a-cascada space-y-3">
          {FAQ.map((f, i) => (
            <Acordeon
              key={f.p}
              id={`faq-${i}`}
              abierto={faqAbierta === i}
              onToggle={() => setFaqAbierta(faqAbierta === i ? null : i)}
              cabecera={
                <p className="text-base text-white">{f.p}</p>
              }
            >
              <p className="text-slate-300">{f.r}</p>
            </Acordeon>
          ))}
        </Armado>
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
            En 30 minutos sabes qué pieza de tu negocio está en rojo, por dónde partir y qué decisiones no deberían salir de tus manos, y te llevas la planilla donde vas a armar tu sistema. Los otros 6 módulos ya están listos para seguir a tu ritmo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BotonCompra ubicacion="cta_final" />
            <BotonModulo0 />
          </div>
          </div>
        </div>
        {/* 13-nov-2026 (Álvaro: «Estoy constantemente revisando este curso; la última actualización fue…, incluí esto porque…»).
            Primera persona. Arriba la última versión publicada con su porqué verdadero (lib/productos/curso/versiones.ts); abajo
            las anteriores como línea de tiempo. Sin promesas de contenidos futuros ni de acceso a actualizaciones (no está
            garantizado en la página ni en Hotmart). */}
        <Armado id="versiones" className="mt-10 scroll-mt-24 rounded-2xl border border-white/10 p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Producto vivo</p>
          <h3 className="mt-2 font-serif text-2xl text-white">Reviso este curso seguido: {VERSIONES_CURSO.length} versiones en su primera semana.</h3>
          <div className="a-pieza mt-5 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4 sm:p-5" style={orden(0)}>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#5fb2dd]">
              Última actualización · {fechaLarga(VERSION_CURSO.fecha)} · versión {VERSION_CURSO.version}
            </p>
            <ul className="mt-2 space-y-1 text-slate-100">
              {VERSION_CURSO.cambios.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {VERSION_CURSO.porque ? <p className="mt-2 text-sm text-slate-300">Por qué: {VERSION_CURSO.porque}</p> : null}
          </div>
          <ol className="relative mt-6 space-y-5 border-l border-white/10 pl-5">
            {VERSIONES_CURSO.slice(1, 5).map((v, i) => (
              <li key={v.version} className="a-pieza relative" style={orden(i + 1)}>
                <span aria-hidden className="a-escala absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#5fb2dd] ring-4 ring-[#5fb2dd]/15" style={orden(i + 1)} />
                <p className="text-sm text-white">
                  {fechaLarga(v.fecha)} <span className="text-slate-500">· versión {v.version}</span>
                </p>
                <ul className="mt-1 space-y-1 text-sm text-slate-400">
                  {v.cambios.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                {v.porque ? <p className="mt-1 text-sm text-slate-300">Por qué: {v.porque}</p> : null}
              </li>
            ))}
          </ol>
        </Armado>
      </section>
      {/* Barra fija de celular: la de la B de EXP-13 (módulo 0), ganadora. BarraCompraMovil queda sin uso hasta otra ronda. */}
      <BarraModulo0Movil />
    </main>
  );
}
