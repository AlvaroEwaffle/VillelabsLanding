'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock, Gift, RotateCcw, Save } from 'lucide-react';
import {
  IDENTIFICACIONES,
  MIN_FAQS,
  OPCIONES_RESPUESTA,
  PASOS,
  TEXTOS,
  esqueletoVacio,
  type Esqueleto,
  type Identificacion,
  type RespuestaId,
} from '@/lib/productos/esqueleto/datos';
import {
  borrarAvance,
  cargarAvance,
  cargarLead,
  enviarLead,
  eventos,
  guardarAvance,
  guardarLead,
  type Avance,
  type Lead,
} from '@/lib/productos/esqueleto/estado';
import { faqsCompletas } from '@/lib/productos/esqueleto/estructura';
import { getLenis } from '@/lib/lenis';
import { PASOS_UI } from './Bloques';
import Resultado from './Resultado';
import { FotoApoyo, FotoCaso, type FotoId } from './Imagenes';
import {
  DiagramaDerivacion,
  DiagramaLoQueSabe,
  DiagramaPreguntasRepetidas,
  DiagramaProbarAjustar,
  DiagramaRecorrido,
  DiagramaSinConReglas,
} from '@/components/productos/diagramas/esqueleto';
import { Kicker, botonPrimario, botonSecundario, claseInput } from './ui';
import { EXP09 } from '@/lib/productos/esqueleto/exp09';
import { cancelarParcial, campoParcial, correoValido, pasoParcial } from '@/lib/productos/esqueleto/parcial';
import EsqueletoMock from './EsqueletoMock';
import { VideoMarco } from '@/components/productos/VideoProducto';

// Secuencia: antes de cada paso, una pantalla corta «¿Te pasa esto?».
type Pantalla = { tipo: 'id'; paso: number; ident: Identificacion } | { tipo: 'paso'; paso: number };
const SECUENCIA: Pantalla[] = PASOS.flatMap((p) => {
  const ident = IDENTIFICACIONES.find((i) => i.antesDePaso === p.n);
  const pasoPantalla: Pantalla = { tipo: 'paso', paso: p.n };
  return ident ? [{ tipo: 'id', paso: p.n, ident } as Pantalla, pasoPantalla] : [pasoPantalla];
});
const RESULTADO = SECUENCIA.length + 1; // pantallas 1..N = secuencia; N+1 = resultado
const pantallaDePaso = (n: number) => SECUENCIA.findIndex((s) => s.tipo === 'paso' && s.paso === n) + 1;

// Imagen de cada pantalla. Regla 20/80 (8-nov-2026): apoyo ligado a lo que se pregunta; Álvaro solo en la portada
// y en «¿a quién le mando…?». Pasos 1 y 4 son escenas del caso (Camila en Grano Norte): ver FotoCaso.
const FOTO_IDENT: Record<string, FotoId> = {
  'mismas-preguntas': 'celularMensajes',
  'precio-noche': 'relojNoche',
  'plazo-prometido': 'cajasDespacho',
  'solo-tu-sabes': 'oficina',
};
const FOTO_PASO: Record<number, FotoId> = { 1: 'escenaBodega', 2: 'cafeteria', 3: 'listaCheck', 4: 'escenaCalendario' };
const PASOS_CASO = [1, 4];
// Diagrama de cada paso: la idea dibujada antes del formulario.
const DIAGRAMA_PASO: Record<number, () => React.ReactNode> = {
  1: DiagramaLoQueSabe,
  2: DiagramaPreguntasRepetidas,
  3: DiagramaSinConReglas,
  4: DiagramaDerivacion,
};

const avanceInicial = (): Avance => ({ esqueleto: esqueletoVacio(), pantalla: 0, respuestas: {}, terminadoEn: null });

function Progreso({ paso, antes }: { paso: number; antes?: boolean }) {
  const info = PASOS[paso - 1];
  const hechos = antes ? paso - 1 : paso;
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#5fb2dd]">{paso > PASOS.length ? 'Último detalle' : `Paso ${paso} de ${PASOS.length}`}</span>
        {info && !antes ? (
          <span className="inline-flex items-center gap-1 text-slate-400">
            <Clock className="h-3.5 w-3.5" /> {info.minutos} min
          </span>
        ) : null}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={PASOS.length} aria-valuenow={Math.min(hechos, PASOS.length)} aria-label="Avance de tu esqueleto">
        {PASOS.map((p) => (
          <span
            key={p.n}
            className={`h-2 rounded-full transition-colors duration-500 ${
              p.n <= hechos ? 'bg-gradient-to-r from-[#2175a1] to-[#5fb2dd]' : p.n === paso ? 'bg-[#2175a1]/40' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PantallaIdentificacion({
  ident,
  respuesta,
  responder,
  seguir,
  volver,
}: {
  ident: Identificacion;
  respuesta: RespuestaId | undefined;
  responder: (r: RespuestaId) => void;
  seguir: () => void;
  volver: () => void;
}) {
  const paso = PASOS[ident.antesDePaso - 1];
  return (
    <section className="py-4 sm:py-8" aria-labelledby={`id-${ident.id}`}>
      <FotoApoyo foto={FOTO_IDENT[ident.id] ?? 'casual'} alto="h-40 sm:h-56" className="mb-6" />
      <Kicker>¿Te pasa esto?</Kicker>
      <h1 id={`id-${ident.id}`} className="mt-4 font-serif text-[1.75rem] leading-tight text-white sm:text-4xl">
        {ident.pregunta}
      </h1>
      <div className="mt-8 grid grid-cols-3 gap-2 sm:max-w-md sm:gap-3" role="radiogroup" aria-label="Tu respuesta">
        {OPCIONES_RESPUESTA.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={respuesta === o.id}
            onClick={() => responder(o.id)}
            className={`min-h-[52px] rounded-2xl border text-base font-medium transition ${
              respuesta === o.id ? 'border-[#5fb2dd] bg-[#2175a1]/30 text-white' : 'border-white/15 bg-white/[0.03] text-slate-200 hover:border-white/30'
            }`}
          >
            {o.etiqueta}
          </button>
        ))}
      </div>
      {respuesta ? (
        <div className="mt-6 rounded-2xl border border-[#5fb2dd]/30 bg-[#5fb2dd]/[0.07] p-4 sm:p-5" aria-live="polite">
          <p className="text-base text-slate-100">{ident.respuestas[respuesta]}</p>
        </div>
      ) : null}
      <nav className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between" aria-label="Navegación">
        <button type="button" onClick={volver} className={botonSecundario}>
          <ArrowLeft className="h-4 w-4" /> Atrás
        </button>
        <button type="button" onClick={seguir} disabled={!respuesta} className={botonPrimario}>
          Ir al paso {paso.n} <ArrowRight className="h-4 w-4" />
        </button>
      </nav>
    </section>
  );
}

function DatosContacto({ onListo, onVolver }: { onListo: (l: Lead) => void; onVolver: () => void }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!nombre.trim()) return setError('Escribe tu nombre.');
        if (!correoValido(correo)) return setError('Revisa tu correo: parece que le falta algo.');
        setError('');
        setEnviando(true);
        cancelarParcial();
        onListo({ nombre: nombre.trim(), correo: correo.trim(), whatsapp: whatsapp.trim(), fecha: new Date().toISOString() });
      }}
      // Correo a medias (EXP-09): al salir de cualquier campo, si ya hay un correo válido, se guarda lo escrito.
      onBlur={() => campoParcial({ nombre, correo, whatsapp }, PASOS.length + 1)}
      className="space-y-5"
    >
      <FotoApoyo foto="cafeCerca" alto="h-40 sm:h-56" />
      <div>
        <Kicker>Tu esqueleto está listo</Kicker>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">¿A quién le mando el esqueleto de tu asistente?</h1>
        <p className="mt-3 text-slate-300">Lo ves aquí mismo apenas sigas, listo para copiar o descargar.</p>
      </div>
      <div>
        <label htmlFor="lead-nombre" className="block py-2 text-base font-medium text-white">
          Tu nombre
        </label>
        <input id="lead-nombre" autoComplete="given-name" value={nombre} onChange={(e) => setNombre(e.target.value)} className={claseInput} />
      </div>
      <div>
        <label htmlFor="lead-correo" className="block py-2 text-base font-medium text-white">
          Tu correo
        </label>
        <input id="lead-correo" type="email" inputMode="email" autoComplete="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className={claseInput} />
      </div>
      <div>
        <label htmlFor="lead-wa" className="block py-2 text-base font-medium text-white">
          WhatsApp <span className="font-normal text-slate-400">(opcional)</span>
        </label>
        <input id="lead-wa" type="tel" inputMode="tel" autoComplete="tel" placeholder="+56 9 …" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={claseInput} />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-orange-300">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button type="button" onClick={onVolver} className={botonSecundario}>
          <ArrowLeft className="h-4 w-4" /> Volver
        </button>
        <button type="submit" disabled={enviando} className={botonPrimario}>
          Ver el esqueleto de mi asistente <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-slate-500">Usamos tu correo para mandarte contenido útil para tu negocio. Te puedes dar de baja cuando quieras. Guardamos lo que escribes para no perder tu avance.</p>
    </form>
  );
}

export default function EsqueletoApp() {
  const [avance, setAvance] = useState<Avance>(avanceInicial);
  const [lead, setLead] = useState<Lead | null>(null);
  const [cargado, setCargado] = useState(false);
  const [pidiendoDatos, setPidiendoDatos] = useState(false);
  // Aviso del mínimo de preguntas frecuentes (paso 2): antes dejaba seguir con 1 de 5 y recién avisaba en el resultado.
  const [avisoFaqs, setAvisoFaqs] = useState(false);
  // Pantalla donde quedó la persona al volver (se muestra la entrada con «Seguir donde quedé»).
  const [pantallaGuardada, setPantallaGuardada] = useState(0);
  const arriba = useRef<HTMLDivElement>(null);
  const { esqueleto, pantalla } = avance;

  // EXP-09: si se llegó navegando dentro del sitio el script en línea no corrió; se asigna aquí. Aviso a GA4 una vez.
  useEffect(() => {
    EXP09.avisar(EXP09.asignar());
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- lectura única de localStorage al montar */
  useEffect(() => {
    const guardado = cargarAvance(RESULTADO);
    if (guardado) {
      setAvance({ ...guardado, pantalla: 0 });
      setPantallaGuardada(guardado.pantalla);
    }
    setLead(cargarLead());
    setCargado(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Guardado automático del avance.
  useEffect(() => {
    if (cargado) guardarAvance(avance.pantalla === 0 && pantallaGuardada > 0 ? { ...avance, pantalla: pantallaGuardada } : avance);
  }, [avance, cargado, pantallaGuardada]);

  const subir = useCallback(() => {
    const el = arriba.current;
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -96, immediate: true });
    else el.scrollIntoView({ block: 'start' });
  }, []);

  const irA = useCallback(
    (n: number) => {
      setPidiendoDatos(false);
      setAvisoFaqs(false);
      if (n > 0) setPantallaGuardada(0);
      setAvance((a) => ({ ...a, pantalla: n }));
      requestAnimationFrame(subir);
    },
    [subir],
  );

  const irAPaso = useCallback((n: number) => irA(pantallaDePaso(n)), [irA]);

  const cambiar = useCallback(
    (parcial: Partial<Esqueleto>) => setAvance((a) => ({ ...a, esqueleto: { ...a.esqueleto, ...parcial } })),
    [],
  );

  const mostrarResultado = () => {
    setPidiendoDatos(false);
    if (!avance.terminadoEn) eventos.completo();
    setAvance((a) => ({ ...a, pantalla: RESULTADO, terminadoEn: a.terminadoEn ?? Date.now() }));
    requestAnimationFrame(subir);
  };

  const actual = pantalla >= 1 && pantalla <= SECUENCIA.length ? SECUENCIA[pantalla - 1] : null;

  // Correo a medias: cada cambio de paso actualiza el paso alcanzado (solo si ya dejó un correo válido en esta visita).
  const pasoActual = pidiendoDatos ? PASOS.length + 1 : pantalla === RESULTADO ? PASOS.length + 2 : (actual?.paso ?? 0);
  useEffect(() => {
    if (pasoActual > 0) pasoParcial(pasoActual);
  }, [pasoActual]);

  const faltanFaqs = Math.max(0, MIN_FAQS - faqsCompletas(esqueleto).length);

  const siguiente = () => {
    if (actual?.tipo === 'paso' && actual.paso === 2 && faltanFaqs > 0) {
      setAvisoFaqs(true);
      return;
    }
    if (actual?.tipo === 'paso') eventos.paso(actual.paso);
    if (pantalla < SECUENCIA.length) return irA(pantalla + 1);
    if (lead) return mostrarResultado();
    setPidiendoDatos(true);
    requestAnimationFrame(subir);
  };

  const empezar = () => {
    eventos.inicio();
    irA(1);
  };

  const deCero = () => {
    borrarAvance();
    setAvance(avanceInicial());
    setPantallaGuardada(0);
  };

  const Paso = actual?.tipo === 'paso' ? PASOS_UI[actual.paso - 1] : null;
  const infoPaso = actual?.tipo === 'paso' ? PASOS[actual.paso - 1] : null;
  const esUltimoPaso = pantalla === SECUENCIA.length;

  return (
    <main className="relative w-full overflow-x-hidden bg-[#0f172a] text-slate-200" aria-label="El esqueleto de tu asistente de WhatsApp">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(33,117,161,0.28),transparent_65%)]" />
      <div ref={arriba} className="relative mx-auto max-w-3xl scroll-mt-24 px-4 pb-24 pt-28 sm:px-6 md:pt-36">
        {pantalla === 0 ? (
          <section className="py-6 sm:py-10">
            {/* Hero · EXP-09: tres variantes (A resultado · B dolor · C demostración). Las tres van en el HTML y el CSS
                muestra la que el script en línea dejó en <html data-exp09>, así no hay salto al hidratar. Sin JS se ve A.
                El botón va justo bajo el título para que título, bajada y botón quepan en el primer pantallazo del celular. */}
            <div className="exp09-C">
              <EsqueletoMock className="mb-5" />
            </div>
            <p className="exp09-sin-C inline-flex items-center gap-2 rounded-full border border-[#5fb2dd]/40 bg-[#5fb2dd]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#5fb2dd]">
              <Gift className="h-3.5 w-3.5" /> {TEXTOS.kicker}
            </p>
            <div className="exp09-A">
              <h1 className="mt-4 font-serif text-[2.1rem] leading-[1.1] text-white sm:text-5xl lg:text-[3.1rem]">Tu asistente de WhatsApp, escrito en 15 minutos</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-200 sm:text-xl">Qué responde, qué nunca promete y cuándo te avisa. Gratis, sin tarjeta.</p>
            </div>
            <div className="exp09-B">
              <p role="heading" aria-level={1} className="mt-4 font-serif text-[2.1rem] leading-[1.1] text-white sm:text-5xl lg:text-[3.1rem]">
                ¿Respondes lo mismo 30 veces al día por WhatsApp?
              </p>
              <p className="mt-4 max-w-2xl text-lg text-slate-200 sm:text-xl">Deja escrito en 15 minutos qué responde tu asistente por ti. Gratis.</p>
            </div>
            <div className="exp09-C">
              <p role="heading" aria-level={1} className="font-serif text-[1.9rem] leading-[1.1] text-white sm:text-5xl lg:text-[3.1rem]">
                Así queda el esqueleto de tu primer agente
              </p>
              <p className="mt-3 max-w-2xl text-lg text-slate-200 sm:text-xl">Lo completas en 15 minutos y te lo llevas gratis.</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              {pantallaGuardada > 0 ? (
                <>
                  <button type="button" onClick={() => irA(pantallaGuardada)} className={botonPrimario}>
                    Seguir donde quedé <ArrowRight className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={deCero} className={botonSecundario}>
                    <RotateCcw className="h-4 w-4" /> Empezar de cero
                  </button>
                </>
              ) : (
                <button type="button" onClick={empezar} disabled={!cargado} className={botonPrimario}>
                  {TEXTOS.boton} <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-400">
              <Save className="h-4 w-4" /> {TEXTOS.guardar}
            </p>

            {/* Video 2 · bienvenida (8-nov-2026) */}
            <VideoMarco id="v02-esqueleto-bienvenida" titulo="Lo que vas a armar en los próximos 15 minutos" duracion="40 s" className="mt-8" />

            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {PASOS.map((p) => (
                <li key={p.n} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2175a1] font-mono text-sm text-white">{p.n}</span>
                  <span>
                    <span className="block text-base font-medium text-white">{p.etiqueta}</span>
                    <span className="mt-0.5 block text-sm text-slate-400">{p.bajada}</span>
                  </span>
                </li>
              ))}
            </ol>
            <ul className="mt-10 space-y-2 border-t border-white/10 pt-6 text-sm text-slate-300">
              {[
                'Te vas con tu asistente escrito: lo pruebas gratis en Claude o ChatGPT y después lo conectas a tu WhatsApp (te muestro cómo).',
                '5 preguntas trampa para probarlo antes de usarlo con clientes.',
                'En cada campo, un ejemplo real armado: Grano Norte, una tostaduría de café de Valparaíso.',
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5fb2dd]" /> {x}
                </li>
              ))}
            </ul>
            <DiagramaRecorrido />
          </section>
        ) : (
          <div className="space-y-8">
            {pidiendoDatos ? (
              <>
                <Progreso paso={PASOS.length + 1} />
                <DatosContacto
                  onVolver={() => setPidiendoDatos(false)}
                  onListo={(l) => {
                    guardarLead(l);
                    setLead(l);
                    void enviarLead(l, esqueleto);
                    mostrarResultado();
                  }}
                />
              </>
            ) : pantalla === RESULTADO ? (
              <>
                <FotoApoyo foto="escritorioClaro" alto="h-44 sm:h-60" />
                <header>
                  <Kicker>Tu resultado</Kicker>
                  <h1 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">El esqueleto de tu asistente</h1>
                  <p className="mt-3 text-slate-300">
                    {lead ? `Listo, ${lead.nombre}. ` : ''}Esta es la estructura de tu asistente de WhatsApp, armada con lo que sabes de tu negocio.
                  </p>
                </header>
                <DiagramaProbarAjustar />
                <Resultado esqueleto={esqueleto} terminadoEn={avance.terminadoEn} irAPaso={irAPaso} />
                <div className="border-t border-white/10 pt-6">
                  <button type="button" onClick={() => irA(SECUENCIA.length)} className={botonSecundario}>
                    <ArrowLeft className="h-4 w-4" /> Volver a editar
                  </button>
                </div>
              </>
            ) : actual?.tipo === 'id' ? (
              <>
                <Progreso paso={actual.paso} antes />
                <PantallaIdentificacion
                  ident={actual.ident}
                  respuesta={avance.respuestas[actual.ident.id]}
                  responder={(r) => setAvance((a) => ({ ...a, respuestas: { ...a.respuestas, [actual.ident.id]: r } }))}
                  seguir={siguiente}
                  volver={() => irA(pantalla - 1)}
                />
              </>
            ) : Paso && infoPaso ? (
              <>
                <Progreso paso={infoPaso.n} />
                {PASOS_CASO.includes(infoPaso.n) ? (
                  <FotoCaso foto={FOTO_PASO[infoPaso.n]} alto="h-40 sm:h-56" />
                ) : (
                  <FotoApoyo foto={FOTO_PASO[infoPaso.n]} alto="h-40 sm:h-56" />
                )}
                <header>
                  <Kicker>
                    Paso {infoPaso.n} · {infoPaso.etiqueta}
                  </Kicker>
                  <h1 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">{infoPaso.titulo}</h1>
                  <p className="mt-3 text-slate-300">{infoPaso.bajada}</p>
                </header>
                {DIAGRAMA_PASO[infoPaso.n]?.()}
                <Paso esqueleto={esqueleto} cambiar={cambiar} />
                <nav className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between" aria-label="Navegación de pasos">
                  <button type="button" onClick={() => irA(pantalla - 1)} className={botonSecundario}>
                    <ArrowLeft className="h-4 w-4" /> Atrás
                  </button>
                  <div className="flex flex-col gap-2 sm:items-end">
                    {avisoFaqs && infoPaso.n === 2 && faltanFaqs > 0 ? (
                      <p role="alert" className="rounded-xl border border-orange-300/40 bg-orange-300/10 px-4 py-3 text-sm text-orange-100 sm:max-w-sm">
                        Te {faltanFaqs === 1 ? 'falta 1 pregunta' : `faltan ${faltanFaqs} preguntas`} con su respuesta para llegar a {MIN_FAQS}. Con menos, tu
                        asistente te va a pasar casi todo a ti. Toca las sugerencias de arriba: se agregan con un clic y solo escribes la respuesta.
                      </p>
                    ) : null}
                    <button type="button" onClick={siguiente} className={botonPrimario}>
                      {esUltimoPaso ? 'Ver el esqueleto de mi asistente' : 'Siguiente'} <ArrowRight className="h-4 w-4" />
                    </button>
                    <span className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-500">
                      <Save className="h-3.5 w-3.5" /> Tu avance se guarda solo en este navegador
                    </span>
                  </div>
                </nav>
              </>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
