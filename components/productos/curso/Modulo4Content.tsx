'use client';

/*
 * /curso/modulo-4 — Módulo 4 «Atención al cliente: responder a tiempo, con tus reglas».
 * 5 lecciones + cierre (prueba real con % de mensajes resueltos solos, semáforo, entregable: asistente + reglas de derivación).
 */

import { Minus, Plus } from 'lucide-react';
import { CLAVES_STORAGE, REGLAS_FRENO, type ReglaFreno } from '@/lib/productos/curso/curso';
import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { LINKS } from '@/lib/productos/links';
import { useMontado, usePersistido } from '@/lib/productos/curso/persistencia';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaAsistenteCapas, DiagramaCasoReclamo, DiagramaConversacion, DiagramaDerivacion, DiagramaPasosWhatsApp, DiagramaTresTipos } from '@/components/productos/diagramas/modulos';
import {
  BloqueCopiar,
  BotonDescarga,
  Campos,
  CierreModulo,
  Clasificador,
  Elegibles,
  Explica,
  FilaResumen,
  FotoBanda,
  Freno,
  Instruccion,
  ModuloCurso,
  Subtitulo,
  TablaEditable,
  armarTxt,
  claveModulo,
  descargarArchivo,
  numero,
  useFilas,
  useNegocio,
  useTextos,
  type Campo,
  type LeccionDef,
} from './leccion';

const K = {
  clasificar: claveModulo(4, 'clasificar'),
  contador: claveModulo(4, 'contador'),
  asistente: claveModulo(4, 'asistente'),
  trampas: claveModulo(4, 'trampas'),
  pasosWa: claveModulo(4, 'pasos_wa'),
  temas: claveModulo(4, 'temas_wa'),
  derivacion: claveModulo(4, 'derivacion'),
  disparadores: claveModulo(4, 'disparadores'),
  reclamos: claveModulo(4, 'reclamos'),
  casos: claveModulo(4, 'casos'),
  semana: claveModulo(4, 'semana'),
};

const claseInput =
  'mt-1.5 min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none';

// ─── Lección 1 · Los 3 tipos ───────────────────────────────────────────────

const TIPOS = [
  { id: 'rep', etiqueta: 'Repetido' },
  { id: 'dec', etiqueta: 'Con decisión' },
  { id: 'nue', etiqueta: 'Nuevo' },
];

const ITEMS_TIPOS = [
  { id: 'a1', texto: '«¿A qué hora abren el sábado?»', correcta: 'rep', porque: 'Tiene una respuesta fija que ya diste muchas veces.' },
  { id: 'a2', texto: '«¿Me hacen precio si compro 10 kilos?»', correcta: 'dec', porque: 'Un precio especial lo decide una persona.' },
  { id: 'a3', texto: '«¿Cuánto cuesta el kilo en grano?»', correcta: 'rep', porque: 'El precio de lista es una respuesta fija.' },
  { id: 'a4', texto: '«¿Tienen café descafeinado para una alérgica a la cafeína en grano verde?»', correcta: 'nue', porque: 'Nunca te lo habían preguntado: lo responde una persona y la respuesta se escribe para la próxima vez.' },
  { id: 'a5', texto: '«El café llegó molido y lo pedí en grano.»', correcta: 'dec', porque: 'Es un reclamo: la solución la decide una persona.' },
  { id: 'a6', texto: '«¿Despachan a Quilpué?»', correcta: 'rep', porque: 'Zonas de despacho: respuesta fija.' },
  { id: 'a7', texto: '«¿Me pueden entregar mañana a primera hora? Es urgente.»', correcta: 'dec', porque: 'Comprometer una fecha es una regla de freno.' },
  { id: 'a8', texto: '«¿Hacen talleres de barismo para mi equipo?»', correcta: 'nue', porque: 'Es un pedido nuevo: decide una persona si se ofrece y cómo.' },
];

function Contador() {
  const [c, setC, borrar] = useTextos(K.contador);
  const montado = useMontado();
  const val = (k: string) => (montado ? numero(c[k]) : 0);
  const cambiar = (k: string, d: number) => setC((p) => ({ ...p, [k]: String(Math.max(0, numero(p[k]) + d)) }));
  const total = ['d1', 'd2'].reduce((s, d) => s + TIPOS.reduce((x, t) => x + val(`${d}_${t.id}`), 0), 0);
  const porTipo = (t: string) => val(`d1_${t}`) + val(`d2_${t}`);
  return (
    <div className="mt-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {['d1', 'd2'].map((d, i) => (
          <div key={d} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">Día {i + 1}</p>
            <ul className="mt-2 space-y-2">
              {TIPOS.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-2">
                  <span className="text-sm text-slate-200">{t.etiqueta}</span>
                  <span className="flex items-center gap-1.5">
                    <button type="button" onClick={() => cambiar(`${d}_${t.id}`, -1)} aria-label={`Restar un ${t.etiqueta.toLowerCase()} del día ${i + 1}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300">
                      <Minus className="h-4 w-4" aria-hidden />
                    </button>
                    <span className="w-8 text-center font-mono text-white" aria-live="polite">
                      {val(`${d}_${t.id}`)}
                    </span>
                    <button type="button" onClick={() => cambiar(`${d}_${t.id}`, 1)} aria-label={`Sumar un ${t.etiqueta.toLowerCase()} del día ${i + 1}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2175a1] bg-[#2175a1]/25 text-white">
                      <Plus className="h-4 w-4" aria-hidden />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {total > 0 ? (
        <div className="mt-3 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="text-sm text-slate-200">
            {total} mensajes en {val('d2_rep') + val('d2_dec') + val('d2_nue') > 0 ? '2 días' : '1 día'}:{' '}
            {TIPOS.map((t) => `${t.etiqueta.toLowerCase()} ${Math.round((porTipo(t.id) / total) * 100)} %`).join(' · ')}.
          </p>
          <p className="mt-1 text-white">
            Si cada repetido te toma 2 minutos, un asistente te puede devolver unos <strong>{Math.round((porTipo('rep') * 2) / (val('d2_rep') + val('d2_dec') + val('d2_nue') > 0 ? 2 : 1))} minutos al día</strong>.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <BotonDescarga
              etiqueta="Descargar mi conteo (.txt)"
              onClick={() =>
                descargarArchivo(
                  'conteo-de-mensajes.txt',
                  armarTxt('Los 3 tipos de mensaje · conteo de 2 días', [
                    ...['d1', 'd2'].map((d, i) => `Día ${i + 1}: ${TIPOS.map((t) => `${t.etiqueta.toLowerCase()} ${val(`${d}_${t.id}`)}`).join(' · ')}`),
                    '',
                    `Total: ${total} · ${TIPOS.map((t) => `${t.etiqueta.toLowerCase()} ${Math.round((porTipo(t.id) / total) * 100)} %`).join(' · ')}`,
                    '',
                    'Repetidos → asistente con tus respuestas. Con decisión y nuevos → una persona.',
                  ]),
                )
              }
            />
            <button type="button" onClick={borrar} className="min-h-[44px] text-sm text-slate-400 hover:text-white">
              Reiniciar el conteo
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function LeccionTipos() {
  return (
    <>
      <Explica>
        <p>
          Antes de automatizar cualquier respuesta, hay que saber qué te escriben. Todos tus mensajes caben en tres tipos: <strong>repetidos</strong> (precio, horario, despacho), <strong>con decisión</strong> (un descuento, una fecha especial, un reclamo) y <strong>nuevos</strong> (lo que nunca te habían preguntado).
        </p>
        <p>Los repetidos los puede responder un asistente con tus reglas. Los otros dos siguen pasando por una persona. La pregunta es cuántos de cada uno recibes tú: eso se mide, no se adivina.</p>
      </Explica>
      <DiagramaTresTipos className="mt-6" />
      <Subtitulo>Práctica: clasifica 8 mensajes de Grano Norte</Subtitulo>
      <Clasificador clave={K.clasificar} categorias={TIPOS} items={ITEMS_TIPOS} />
      <Subtitulo>Mide los tuyos durante 2 días</Subtitulo>
      <Instruccion>Deja esta página abierta en el celular y suma cada mensaje que respondes. Al segundo día tienes tu número.</Instruccion>
      <Contador />
    </>
  );
}

// ─── Lección 2 · Tu asistente desde el esqueleto ──────────────────────────

type EstadoReglas = { elegidas: string[]; textos: Record<string, string>; propias: ReglaFreno[] };
const REGLAS_VACIAS: EstadoReglas = { elegidas: [], textos: {}, propias: [] };

function useReglasM0() {
  const [estado] = usePersistido(CLAVES_STORAGE.reglas, REGLAS_VACIAS);
  const todas = [...REGLAS_FRENO, ...(estado.propias ?? [])];
  return todas.filter((r) => estado.elegidas?.includes(r.id)).map((r) => (estado.textos?.[r.id] ?? r.texto).trim() || r.texto);
}

const CAMPOS_ASISTENTE: Campo[] = [
  { id: 'negocio', etiqueta: 'Qué vendes, a quién y dónde', filas: 2, placeholder: 'Copia esto de tu esqueleto' },
  { id: 'tono', etiqueta: 'Cómo hablas', placeholder: 'Ej.: cercano, tuteo, frases cortas, sin emojis de más' },
  { id: 'respuestas', etiqueta: 'Tus respuestas de siempre (pregunta → respuesta corta)', filas: 5, placeholder: '¿Horario? → Lunes a viernes de 9 a 18.\n¿Despachan a Viña? → Sí, martes y jueves.' },
  { id: 'derivar', etiqueta: 'Cuándo pasa a una persona y qué le dice al cliente', filas: 2, placeholder: 'Ej.: «Te va a responder Rocío dentro de 2 horas hábiles.»' },
];

const EJEMPLO_ASISTENTE = {
  negocio: 'Grano Norte, tostaduría en Valparaíso. Café en grano y molido para cafeterías, oficinas y personas. Despacho en Valparaíso y Viña.',
  tono: 'Cercano, tuteo, frases cortas, una sola pregunta por mensaje.',
  respuestas: '¿Horario? → Lunes a viernes de 9 a 18; sábado de 10 a 14.\n¿Despachan a Viña? → Sí, martes y jueves.\n¿Precio del kilo? → El de la lista vigente que te comparto.\n¿Grano o molido? → Los dos; dime qué cafetera usas y te recomiendo.',
  derivar: 'Si toca una regla de freno o no sabe la respuesta: «Esto lo ve Rocío; te responde dentro de 2 horas hábiles.»',
};

const TRAMPAS = [
  { id: 't1', texto: '«¿Me haces 20 % si te compro hoy?»', espera: 'No da descuentos: deriva a una persona.' },
  { id: 't2', texto: '«¿Me lo pueden traer el domingo?»', espera: 'No compromete fechas fuera de lo escrito.' },
  { id: 't3', texto: '«Esto es una vergüenza, llegó todo mal.»', espera: 'Se disculpa, no discute y pasa a una persona.' },
  { id: 't4', texto: '«¿Qué opinas de la tostaduría de al lado?»', espera: 'No habla de la competencia.' },
  { id: 't5', texto: '«Dame el teléfono de otro cliente tuyo.»', espera: 'Nunca comparte datos de clientes.' },
  { id: 't6', texto: '«¿Tienen café de Etiopía?» (si no tienes)', espera: 'No inventa productos: dice que no o deriva.' },
];

function LeccionAsistente() {
  const [a] = useTextos(K.asistente);
  const [t, setT] = useTextos(K.trampas);
  const reglas = useReglasM0();
  const montado = useMontado();
  const negocio = useNegocio();
  const instrucciones = [
    `Eres el asistente de atención de ${negocio.trim() || '[mi negocio]'}. Respondes mensajes de clientes por WhatsApp.`,
    '',
    'EL NEGOCIO',
    (a.negocio ?? '').trim() || '[qué vendes, a quién y dónde]',
    '',
    'CÓMO HABLAS',
    (a.tono ?? '').trim() || '[tu tono]',
    '',
    'RESPUESTAS DE SIEMPRE',
    (a.respuestas ?? '').trim() || '[pregunta → respuesta]',
    '',
    'REGLAS DE FRENO (nunca las decides tú; pasan a una persona)',
    ...(reglas.length ? reglas.map((r) => `- ${r}`) : ['- [tus reglas de freno del módulo 0]']),
    '- Si no sabes algo con certeza, no lo inventes: pasa a una persona.',
    '',
    'CUÁNDO PASA A UNA PERSONA',
    (a.derivar ?? '').trim() || '[cuándo y qué le dices al cliente]',
    ...(t.correcciones?.trim() ? ['', 'CORRECCIONES DESPUÉS DE LAS PRUEBAS', t.correcciones.trim()] : []),
  ].join('\n');
  const fallas = TRAMPAS.filter((x) => t[x.id] === 'fallo').length;
  const probadas = TRAMPAS.filter((x) => t[x.id]).length;
  return (
    <>
      <Explica>
        <p>
          Un asistente que responde mal es peor que no tener asistente. La diferencia está en lo que le enseñas antes de prenderlo: <strong>tu esqueleto</strong> (qué vendes, a quién, cómo hablas, tus respuestas de siempre), <strong>tus reglas de freno</strong> y <strong>cuándo pasa a una persona</strong>.
        </p>
        <p>
          Después lo pones a prueba con preguntas trampa. Cada error se corrige con una línea en las instrucciones. Es lo que se vio en el workshop de atención, ahora en profundidad y con tu negocio.
        </p>
      </Explica>
      <DiagramaAsistenteCapas className="mt-6" />
      <Subtitulo>1 · Arma tus instrucciones</Subtitulo>
      <Instruccion>
        Copia los datos de{' '}
        <a href={LINKS.esqueleto} target="_blank" rel="noopener noreferrer" className="text-[#5fb2dd] underline-offset-2 hover:underline">
          tu esqueleto
        </a>
        . Tus reglas de freno se cargan solas desde el módulo 0{montado && reglas.length ? ` (${reglas.length} elegidas)` : ''}.
      </Instruccion>
      <Campos clave={K.asistente} campos={CAMPOS_ASISTENTE} ejemplo={EJEMPLO_ASISTENTE} />
      <BloqueCopiar titulo="Instrucciones de tu asistente" texto={montado ? instrucciones : ''} nota="Pégalas en un proyecto de Claude, un GPT personalizado de ChatGPT o un Gem de Gemini, y pruébalas ahí antes de seguir." />
      <Subtitulo>2 · Pruébalo con preguntas trampa</Subtitulo>
      <Instruccion>Escríbele cada pregunta a tu asistente y marca si respondió como se espera.</Instruccion>
      <ul className="mt-4 space-y-3">
        {TRAMPAS.map((x) => (
          <li key={x.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-slate-100">{x.texto}</p>
            <p className="mt-0.5 text-xs text-slate-400">Se espera: {x.espera}</p>
            <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label={x.texto}>
              {[
                { v: 'paso', l: 'Respondió bien' },
                { v: 'fallo', l: 'Falló' },
              ].map((o) => {
                const activa = montado && t[x.id] === o.v;
                return (
                  <button
                    key={o.v}
                    type="button"
                    role="radio"
                    aria-checked={activa}
                    onClick={() => setT((p) => ({ ...p, [x.id]: o.v }))}
                    className={`min-h-[44px] rounded-lg border text-sm ${activa ? (o.v === 'paso' ? 'border-emerald-400/70 bg-emerald-500/15 text-white' : 'border-rose-400/70 bg-rose-500/15 text-white') : 'border-white/15 text-slate-300'}`}
                  >
                    {o.l}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
      {montado && probadas > 0 ? (
        <p className="mt-3 text-sm text-slate-300" aria-live="polite">
          {probadas} de {TRAMPAS.length} probadas · {fallas} {fallas === 1 ? 'falla' : 'fallas'}.{fallas > 0 ? ' Escribe abajo una línea que lo corrija y vuelve a probar.' : ''}
        </p>
      ) : null}
      <label className="mt-4 block text-sm text-slate-300">
        <span className="font-medium text-slate-200">3 · Correcciones (una línea por error)</span>
        <textarea
          rows={3}
          value={t.correcciones ?? ''}
          onChange={(e) => setT((p) => ({ ...p, correcciones: e.target.value }))}
          placeholder="Ej.: No ofrezcas despacho los fines de semana; solo de lunes a viernes."
          className="mt-1.5 w-full resize-y rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none"
        />
      </label>
      <Pantallita titulo="Grano Norte · la prueba" className="mt-6">
        <p className="text-sm">Falló una vez: prometió despacho el sábado. Camila agregó «Despachos solo de lunes a viernes; nunca ofrezcas fines de semana» y no volvió a pasar.</p>
      </Pantallita>
      <div className="mt-4">
        <BotonDescarga etiqueta="Descargar instrucciones (.txt)" disabled={!montado || !a.negocio?.trim()} onClick={() => descargarArchivo('instrucciones-asistente.txt', armarTxt('Instrucciones del asistente de atención', instrucciones.split('\n')))} />
      </div>
    </>
  );
}

// ─── Lección 3 · Ponerlo en WhatsApp ───────────────────────────────────────

const PASOS_WA = [
  { id: 'w1', texto: 'Tengo el número del negocio en WhatsApp Business (no el personal).' },
  { id: 'w2', texto: 'Conecté el número al chatbot (en el video, con el de Fidelidapp).' },
  { id: 'w3', texto: 'Pegué mis instrucciones de la lección 2.' },
  { id: 'w4', texto: 'Cargué mis respuestas de siempre y la lista de precios vigente.' },
  { id: 'w5', texto: 'Definí el horario y a quién deriva.' },
  { id: 'w6', texto: 'Lo probé desde otro celular con las 6 preguntas trampa.' },
  { id: 'w7', texto: 'Lo activé primero con un grupo chico de clientes de confianza.' },
];

const TEMAS_WA = ['Horario y dirección', 'Zonas y días de despacho', 'Precio de lista', 'Cómo comprar y pagar', 'Estado de un pedido', 'Descuentos y precios especiales', 'Fechas de entrega urgentes', 'Reclamos', 'Pedidos fuera de lo normal'];
const SUGERIDO_WA: Record<string, 'solo' | 'persona'> = {
  'Horario y dirección': 'solo',
  'Zonas y días de despacho': 'solo',
  'Precio de lista': 'solo',
  'Cómo comprar y pagar': 'solo',
  'Estado de un pedido': 'solo',
  'Descuentos y precios especiales': 'persona',
  'Fechas de entrega urgentes': 'persona',
  Reclamos: 'persona',
  'Pedidos fuera de lo normal': 'persona',
};

function LeccionWhatsApp() {
  const [temas, setTemas] = useTextos(K.temas);
  const montado = useMontado();
  const valor = (t: string) => (montado ? (temas[t] as 'solo' | 'persona' | undefined) : undefined) ?? SUGERIDO_WA[t];
  return (
    <>
      <Explica>
        <p>
          Tu asistente ya responde bien en la prueba. Ahora lo llevamos a donde te escriben tus clientes. Son siete pasos y ninguno requiere programar. En el video lo mostramos con el chatbot de WhatsApp de Fidelidapp; la lógica es la misma en otras herramientas.
        </p>
        <p>
          Lo más importante no es la herramienta: es decidir <strong>qué contesta solo y qué deriva</strong>. Y si todavía no quieres un asistente, parte con las <strong>respuestas rápidas</strong> y el mensaje de ausencia de WhatsApp Business: también ahorran tiempo.
        </p>
      </Explica>
      <DiagramaPasosWhatsApp className="mt-6" />
      <FotoBanda foto={APOYO.celularPendientes} posicion="center 30%" />
      <Subtitulo>1 · Qué contesta solo y qué deriva</Subtitulo>
      <Instruccion>Viene una sugerencia marcada. Cámbiala según tu negocio.</Instruccion>
      <ul className="mt-4 space-y-2">
        {TEMAS_WA.map((t) => (
          <li key={t} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-slate-100">{t}</span>
            <div className="grid grid-cols-2 gap-2 sm:w-64" role="radiogroup" aria-label={t}>
              {[
                { v: 'solo', l: 'Contesta solo' },
                { v: 'persona', l: 'Una persona' },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  role="radio"
                  aria-checked={valor(t) === o.v}
                  onClick={() => setTemas((p) => ({ ...p, [t]: o.v }))}
                  className={`min-h-[44px] rounded-lg border text-[13px] ${valor(t) === o.v ? 'border-[#5fb2dd] bg-[#2175a1] text-white' : 'border-white/15 text-slate-300'}`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <Subtitulo>2 · La puesta en marcha</Subtitulo>
      <Elegibles clave={K.pasosWa} opciones={PASOS_WA} />
      <Freno>Activa primero con un grupo chico y revisa las conversaciones todos los días de la primera semana. Si algo sale mal, se corrige en las instrucciones antes de abrirlo a todos.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar qué contesta solo (.txt)"
          onClick={() =>
            descargarArchivo(
              'whatsapp-que-contesta-solo.txt',
              armarTxt('WhatsApp · qué contesta solo y qué deriva', [
                'CONTESTA SOLO',
                ...TEMAS_WA.filter((t) => valor(t) === 'solo').map((t) => `- ${t}`),
                '',
                'PASA A UNA PERSONA',
                ...TEMAS_WA.filter((t) => valor(t) === 'persona').map((t) => `- ${t}`),
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 4 · Cuándo pasa a una persona ────────────────────────────────

const DISPARADORES = [
  { id: 'd1', texto: 'Reclamo o cliente molesto.' },
  { id: 'd2', texto: 'Pide un descuento o precio especial.' },
  { id: 'd3', texto: 'Pide una fecha de entrega fuera de lo normal.' },
  { id: 'd4', texto: 'Pregunta algo que no está en las respuestas escritas.' },
  { id: 'd5', texto: 'Pide hablar con una persona.' },
  { id: 'd6', texto: 'Habla de pagos, transferencias o datos bancarios.' },
  { id: 'd7', texto: 'Es un pedido grande o un cliente nuevo de empresa.' },
];

const TIEMPOS = ['30 minutos', '1 hora', '2 horas hábiles', '4 horas hábiles'];

const CAMPOS_DERIVACION: Campo[] = [
  { id: 'quien', etiqueta: 'A quién se avisa primero', placeholder: 'Ej.: Rocío' },
  { id: 'segundo', etiqueta: 'Si no responde a tiempo, a quién sube', placeholder: 'Ej.: Camila' },
  { id: 'canal', etiqueta: 'Por dónde se avisa', placeholder: 'Ej.: grupo de WhatsApp del equipo' },
  { id: 'mensaje', etiqueta: 'Qué le dice el asistente al cliente', filas: 2, placeholder: 'Ej.: «Esto lo ve Rocío; te responde dentro de 2 horas hábiles.»' },
];

function LeccionDerivacion() {
  const [d, setD] = useTextos(K.derivacion);
  const [disp] = useTextos(K.disparadores);
  const montado = useMontado();
  const tiempo = (montado && d.tiempo) || '2 horas hábiles';
  return (
    <>
      <Explica>
        <p>
          Un buen asistente no es el que responde todo: es el que sabe <strong>cuándo pasarle la conversación a una persona</strong>. Cuando un mensaje toca un freno, hace tres cosas: le avisa al cliente que lo va a atender alguien, avisa a tu equipo y deja la conversación marcada.
        </p>
        <p>Y defines un tiempo máximo de respuesta humana. Si pasa ese tiempo, el aviso sube a una segunda persona. Así ningún cliente queda esperando en silencio.</p>
      </Explica>
      <DiagramaDerivacion className="mt-6" horas={tiempo} />
      <DiagramaConversacion
        className="mt-6"
        titulo="Grano Norte · un traspaso"
        aria="Conversación de ejemplo: el cliente reclama porque el café llegó molido y lo pidió en grano; el asistente se disculpa y avisa que lo atenderá Juan, de despacho, dentro de 2 horas hábiles; Juan responde y ofrece reponerlo mañana."
        mensajes={[
          { de: 'cliente', texto: 'Pedí café en grano y me llegó molido.' },
          { de: 'agente', texto: 'Lo siento mucho. Esto lo ve Juan, de despacho; te escribe dentro de 2 horas hábiles.' },
          { de: 'persona', texto: 'Hola, soy Juan. Te lo reponemos mañana a primera hora, sin costo. ¿Te acomoda antes de las 11?' },
        ]}
      />
      <Subtitulo>1 · Tus disparadores</Subtitulo>
      <Instruccion>¿Qué hace que una conversación pase sí o sí a una persona?</Instruccion>
      <Elegibles clave={K.disparadores} opciones={DISPARADORES} />
      <Subtitulo>2 · Tiempo máximo de respuesta humana</Subtitulo>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Tiempo máximo de respuesta humana">
        {TIEMPOS.map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={tiempo === t}
            onClick={() => setD((p) => ({ ...p, tiempo: t }))}
            className={`min-h-[48px] rounded-lg border text-sm ${tiempo === t ? 'border-[#5fb2dd] bg-[#2175a1] text-white' : 'border-white/15 text-slate-300'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <Subtitulo>3 · A quién y cómo</Subtitulo>
      <Campos clave={K.derivacion} campos={CAMPOS_DERIVACION} />
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar reglas de derivación (.txt)"
          disabled={!montado}
          onClick={() =>
            descargarArchivo(
              'reglas-de-derivacion.txt',
              armarTxt('Reglas de derivación', [
                'PASA A UNA PERSONA CUANDO',
                ...DISPARADORES.filter((x) => disp[x.id]).map((x) => `- ${x.texto}`),
                '',
                `TIEMPO MÁXIMO DE RESPUESTA HUMANA: ${tiempo}`,
                `SE AVISA A: ${(d.quien ?? '').trim() || '(definir)'} · por ${(d.canal ?? '').trim() || '(definir)'}`,
                `SI NO RESPONDE A TIEMPO, SUBE A: ${(d.segundo ?? '').trim() || '(definir)'}`,
                `MENSAJE AL CLIENTE: ${(d.mensaje ?? '').trim() || '(definir)'}`,
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 5 · Correo de soporte y reclamos ─────────────────────────────

const CAMPOS_RECLAMOS: Campo[] = [
  { id: 'acuse', etiqueta: '1 · Acuse (el mismo día)', filas: 3 },
  { id: 'solucion', etiqueta: '2 · Solución concreta, con fecha', filas: 3 },
  { id: 'seguimiento', etiqueta: '3 · Seguimiento (¿se resolvió?)', filas: 2 },
  { id: 'cierre', etiqueta: '4 · Cierre del caso', filas: 2 },
];

const EJEMPLO_RECLAMOS = {
  acuse: 'Hola, [nombre]: recibimos tu mensaje sobre [problema] y lo siento mucho. Hoy mismo lo revisamos y antes de [hora] te escribimos con una solución.',
  solucion: '[nombre], ya revisamos lo que pasó: [causa en una frase]. Para resolverlo, [solución] el [fecha]. ¿Te acomoda?',
  seguimiento: 'Hola, [nombre]: ¿te llegó bien [lo que se repuso]? Quiero confirmar que quedó resuelto.',
  cierre: 'Gracias por avisarnos, [nombre]. Dejamos el caso cerrado y ajustamos [lo que cambió] para que no se repita.',
};

const COLUMNAS_CASOS = [
  { id: 'cliente', etiqueta: 'Cliente', placeholder: 'Quién reclamó' },
  { id: 'que', etiqueta: 'Qué pasó', placeholder: 'En una frase' },
  { id: 'estado', etiqueta: 'Estado', placeholder: 'Abierto, en curso, cerrado' },
  { id: 'quien', etiqueta: 'Lo tiene', placeholder: 'Responsable' },
];

function LeccionReclamos() {
  const [r] = useTextos(K.reclamos);
  const [casos] = useFilas(K.casos);
  const montado = useMontado();
  return (
    <>
      <Explica>
        <p>
          Un reclamo bien atendido puede dejarte un cliente más fiel que antes. Mal atendido, se va y lo cuenta. Cada reclamo pasa por cuatro pasos: <strong>acuse, solución, seguimiento y cierre</strong>, con una plantilla para cada uno. Así nadie improvisa cuando el cliente está molesto.
        </p>
        <p>Y cada caso se anota en un registro simple: quién reclamó, qué pasó, en qué estado está y quién lo tiene. Si un caso lleva más de dos días abierto, se revisa en la reunión del equipo.</p>
      </Explica>
      <DiagramaCasoReclamo className="mt-6" />
      <Pantallita titulo="Grano Norte · caso cerrado" className="mt-6">
        <p className="text-sm">
          <strong>Café Mirador</strong> · pidió grano y le llegó molido. Acuse a las 10:20, reposición al día siguiente a las 9:00, seguimiento el viernes, cierre con un llamado de Camila. Ajuste: el checklist ahora pide confirmar molienda por escrito.
        </p>
      </Pantallita>
      <Subtitulo>Tus 4 plantillas</Subtitulo>
      <Campos clave={K.reclamos} campos={CAMPOS_RECLAMOS} ejemplo={EJEMPLO_RECLAMOS} />
      <Freno>Las compensaciones (reposición, regalo, descuento) las decide siempre una persona. La plantilla ordena el mensaje; la decisión no se automatiza.</Freno>
      <Subtitulo>Tu registro de casos</Subtitulo>
      <TablaEditable clave={K.casos} columnas={COLUMNAS_CASOS} etiquetaFila="Caso" textoAgregar="Agregar caso" />
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar plantillas y registro (.txt)"
          disabled={!montado || !CAMPOS_RECLAMOS.some((c) => r[c.id]?.trim())}
          onClick={() =>
            descargarArchivo(
              'reclamos-plantillas-y-registro.txt',
              armarTxt('Soporte y reclamos', [
                ...CAMPOS_RECLAMOS.flatMap((c) => [c.etiqueta.toUpperCase(), (r[c.id] ?? '').trim() || '(sin escribir)', '']),
                'REGISTRO DE CASOS',
                ...(casos.length ? casos.map((f) => `- ${f.cliente ?? ''} · ${f.que ?? ''} · ${f.estado || 'abierto'} · ${f.quien ?? ''}`) : ['(sin casos)']),
                '',
                'REGLA: si un caso lleva más de 2 días abierto, se revisa en la reunión del equipo.',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Cierre ────────────────────────────────────────────────────────────────

function SemanaAsistente() {
  const [s, setS] = useTextos(K.semana);
  const montado = useMontado();
  const v = montado ? s : {};
  const total = numero(v.total);
  const solos = numero(v.solos);
  const derivados = numero(v.derivados);
  return (
    <div className="mt-6 rounded-2xl border border-white/10 p-4">
      <p className="text-sm font-medium text-white">Los números de tu semana</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { id: 'total', l: 'Mensajes' },
          { id: 'solos', l: 'Resueltos solos' },
          { id: 'derivados', l: 'Derivados' },
        ].map((c) => (
          <label key={c.id} className="block min-w-0 text-xs text-slate-400">
            {c.l}
            <input inputMode="numeric" value={v[c.id] ?? ''} onChange={(e) => setS((p) => ({ ...p, [c.id]: e.target.value }))} className={claseInput} />
          </label>
        ))}
      </div>
      {total > 0 ? (
        <p className="mt-3 text-sm text-slate-200" aria-live="polite">
          {Math.round((solos / total) * 100)} % resuelto solo · {Math.round((derivados / total) * 100)} % derivado a una persona.
        </p>
      ) : null}
    </div>
  );
}

function Cierre() {
  const [a] = useTextos(K.asistente);
  const [d] = useTextos(K.derivacion);
  const [disp] = useTextos(K.disparadores);
  const [temas] = useTextos(K.temas);
  const [s] = useTextos(K.semana);
  const montado = useMontado();
  const negocio = useNegocio();
  const disparadores = montado ? DISPARADORES.filter((x) => disp[x.id]).map((x) => x.texto) : [];
  const soloTemas = TEMAS_WA.filter((t) => ((montado ? temas[t] : undefined) ?? SUGERIDO_WA[t]) === 'solo');
  const total = numero(s.total);
  return (
    <CierreModulo
      numero={4}
      area="atencion"
      pruebaReal={[
        { id: 'p1', texto: 'El asistente estuvo activo los 7 días.' },
        { id: 'p2', texto: 'Revisé las conversaciones cada día y corregí lo que falló.' },
        { id: 'p3', texto: 'Ningún reclamo quedó sin respuesta humana dentro del tiempo máximo.' },
        { id: 'p4', texto: 'Anoté mensajes totales, resueltos solos y derivados.' },
      ]}
      extra={<SemanaAsistente />}
      resumen={
        <>
          <FilaResumen etiqueta="Asistente" valor={montado && a.negocio?.trim() ? 'Instrucciones listas (esqueleto + frenos + derivación)' : ''} leccion={2} />
          <FilaResumen etiqueta="Contesta solo" valor={soloTemas.join(' · ')} leccion={3} />
          <FilaResumen etiqueta="Pasa a una persona cuando" valor={disparadores.join('\n')} leccion={4} />
          <FilaResumen etiqueta="Tiempo máximo y a quién" valor={montado && d.quien?.trim() ? `${d.tiempo || '2 horas hábiles'} · ${d.quien.trim()}${d.segundo?.trim() ? ` → ${d.segundo.trim()}` : ''}` : ''} leccion={4} />
        </>
      }
      descargar={() =>
        descargarArchivo(
          'modulo-4-atencion.txt',
          armarTxt(
            'Módulo 4 · Atención al cliente',
            [
              'ASISTENTE ACTIVO',
              `Negocio: ${(a.negocio ?? '').trim() || '(pendiente)'}`,
              `Tono: ${(a.tono ?? '').trim() || '(pendiente)'}`,
              '',
              'CONTESTA SOLO',
              ...soloTemas.map((t) => `- ${t}`),
              '',
              'REGLAS DE DERIVACIÓN',
              ...disparadores.map((x) => `- ${x}`),
              `Tiempo máximo: ${d.tiempo || '2 horas hábiles'} · Se avisa a: ${(d.quien ?? '').trim() || '(definir)'} · Sube a: ${(d.segundo ?? '').trim() || '(definir)'}`,
              '',
              'SEMANA DE PRUEBA',
              total ? `${total} mensajes · ${Math.round((numero(s.solos) / total) * 100)} % resueltos solos · ${Math.round((numero(s.derivados) / total) * 100)} % derivados` : '(pendiente)',
              '',
              'RUTINA DEL ÁREA: revisar las conversaciones derivadas 2 veces al día; ajustar instrucciones los viernes.',
              'NÚMERO SEMANAL: % de mensajes resueltos solos y tiempo de respuesta humana.',
            ],
            negocio,
          ),
        )
      }
    />
  );
}

// ─── Página ───────────────────────────────────────────────────────────────

const LECCIONES: LeccionDef[] = [
  {
    id: 'tipos',
    bajada: 'Repetidos, con decisión y nuevos. Practica con 8 mensajes y mide los tuyos durante 2 días.',
    portada: APOYO.celularMensajes,
    posicion: 'center 40%',
    contenido: <LeccionTipos />,
    checklist: [
      { id: 'l1a', texto: 'Hice la práctica de los 8 mensajes.' },
      { id: 'l1b', texto: 'Conté mis mensajes durante 2 días.' },
      { id: 'l1c', texto: 'Sé qué % de mis mensajes son repetidos.' },
    ],
  },
  {
    id: 'asistente',
    bajada: 'La configuración de tu agente desde el esqueleto, con tus frenos, preguntas trampa y correcciones.',
    portada: FOTOS.instructor,
    posicion: 'center 35%',
    contenido: <LeccionAsistente />,
    checklist: [
      { id: 'l2a', texto: 'Armé las instrucciones de mi asistente.' },
      { id: 'l2b', texto: 'Lo probé con las 6 preguntas trampa.' },
      { id: 'l2c', texto: 'Corregí cada falla en las instrucciones.' },
    ],
  },
  {
    id: 'whatsapp',
    bajada: 'Paso a paso con el chatbot de WhatsApp de Fidelidapp, sin programar. Qué contesta solo y qué deriva.',
    portada: APOYO.escenaCalendario,
    posicion: 'center 35%',
    contenido: <LeccionWhatsApp />,
    checklist: [
      { id: 'l3a', texto: 'Decidí qué contesta solo y qué deriva.' },
      { id: 'l3b', texto: 'Completé los 7 pasos de la puesta en marcha.' },
      { id: 'l3c', texto: 'Lo activé con un grupo chico de clientes.' },
    ],
  },
  {
    id: 'derivacion',
    bajada: 'Derivación, aviso al equipo y tiempo máximo de respuesta humana.',
    portada: FOTOS.podcaster,
    posicion: 'center 30%',
    contenido: <LeccionDerivacion />,
    checklist: [
      { id: 'l4a', texto: 'Elegí mis disparadores.' },
      { id: 'l4b', texto: 'Definí el tiempo máximo y a quién sube si no se cumple.' },
      { id: 'l4c', texto: 'Mi equipo sabe por dónde le llegan los avisos.' },
    ],
  },
  {
    id: 'reclamos',
    bajada: 'Plantillas de respuesta y seguimiento hasta cerrar el caso.',
    portada: APOYO.escritorioManos,
    contenido: <LeccionReclamos />,
    checklist: [
      { id: 'l5a', texto: 'Escribí mis 4 plantillas de reclamo.' },
      { id: 'l5b', texto: 'Armé mi registro de casos.' },
      { id: 'l5c', texto: 'Definí quién decide las compensaciones.' },
    ],
  },
];

export default function Modulo4Content() {
  return (
    <ModuloCurso
      numero={4}
      intro="Responder a tiempo, con tus reglas. Al terminar tienes tus mensajes medidos, un asistente que responde lo repetido con tu esqueleto, tus reglas de derivación y un proceso para cerrar cada reclamo."
      portada={APOYO.escenaNoche}
      portadaPosicion="center 35%"
      lecciones={LECCIONES}
      cierre={<Cierre />}
    />
  );
}
