'use client';

/*
 * /curso/modulo-6 — Módulo 6 «Tu propia infra: arma tu sistema propio» + proyecto final «El tablero de tu negocio».
 * 5 lecciones + página final (prueba real, semáforo de las 5 áreas antes/después, tablero imprimible, certificado, siguiente paso).
 * El tablero se arma con lo guardado en los módulos 0–5 (mismas claves de localStorage).
 */

import Link from 'next/link';
import { ArrowUpRight, Check, Printer } from 'lucide-react';
import { AREAS, CLAVES_STORAGE, PROYECTO_FINAL, REGLAS_FRENO, type AreaId, type ReglaFreno, type Respuesta } from '@/lib/productos/curso/curso';
import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { LINKS } from '@/lib/productos/links';
import { useMontado, usePersistido } from '@/lib/productos/curso/persistencia';
import { GUIONES } from '@/lib/productos/curso/guiones';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaBaseInformacion, DiagramaHechoVsPropio, DiagramaPermisos, DiagramaRevisionViernes, DiagramaRutinaAutomatica } from '@/components/productos/diagramas/modulos';
import { Kicker, PuntoSemaforo } from './piezas';
import {
  BloqueCopiar,
  BotonDescarga,
  CHECKS_VACIOS,
  Campos,
  Checklist,
  Clasificador,
  ETIQUETA_SEMAFORO,
  Elegibles,
  Explica,
  FILAS_VACIAS,
  FotoBanda,
  Freno,
  Instruccion,
  ModuloCurso,
  PieModulos,
  SemaforoArea,
  Subtitulo,
  TEXTOS_VACIOS,
  VideoPendiente,
  armarTxt,
  claveModulo,
  descargarArchivo,
  nuevoId,
  rutaModulo,
  semaforoGuardado,
  useFilas,
  useMarcas,
  useNegocio,
  useTextos,
  type Campo,
  type Fila,
  type LeccionDef,
} from './leccion';

const K = {
  decision: claveModulo(6, 'decision'),
  base: claveModulo(6, 'base'),
  permisos: claveModulo(6, 'permisos'),
  rutina: claveModulo(6, 'rutina'),
  revision: claveModulo(6, 'revision'),
  frenosRevision: claveModulo(6, 'frenos_revision'),
  historial: claveModulo(6, 'historial'),
  tablero: claveModulo(6, 'tablero'),
  prueba: claveModulo(6, 'prueba'),
};

const RESPUESTAS_VACIAS: Record<string, Respuesta> = {};
type EstadoReglas = { elegidas: string[]; textos: Record<string, string>; propias: ReglaFreno[] };
const REGLAS_VACIAS: EstadoReglas = { elegidas: [], textos: {}, propias: [] };

function useReglasM0() {
  const [estado] = usePersistido(CLAVES_STORAGE.reglas, REGLAS_VACIAS);
  const todas = [...REGLAS_FRENO, ...(estado.propias ?? [])];
  return todas.filter((r) => estado.elegidas?.includes(r.id)).map((r) => (estado.textos?.[r.id] ?? r.texto).trim() || r.texto);
}

const hayTexto = (o: Record<string, string>) => Object.values(o).some((v) => typeof v === 'string' && v.trim());

// ─── Lección 1 · Producto hecho vs. lo propio ─────────────────────────────

const PREGUNTAS_DECISION = [
  { id: 'q1', texto: '¿Tu problema es común en tu rubro (responder WhatsApp, fidelizar, agendar)?', lista: 'Sí', propio: 'No, es muy mío' },
  { id: 'q2', texto: '¿Tu forma de trabajar es parte de lo que te diferencia?', lista: 'No', propio: 'Sí' },
  { id: 'q3', texto: '¿Usas varias herramientas que no se hablan entre ellas?', lista: 'No', propio: 'Sí' },
  { id: 'q4', texto: '¿Hay alguien que pueda revisar el sistema 15 minutos cada semana?', lista: 'No', propio: 'Sí' },
  { id: 'q5', texto: '¿Necesitas que funcione esta misma semana?', lista: 'Sí', propio: 'Puede esperar' },
];

function LeccionDecision() {
  const [d, setD] = useTextos(K.decision);
  const montado = useMontado();
  const v = montado ? d : TEXTOS_VACIOS;
  const respondidas = PREGUNTAS_DECISION.filter((q) => v[q.id]).length;
  const propio = PREGUNTAS_DECISION.filter((q) => v[q.id] === 'propio').length;
  return (
    <>
      <Explica>
        <p>
          No todo hay que construirlo. A veces una <strong>herramienta lista</strong> resuelve el 80 % en una tarde: un chatbot de WhatsApp como el de Fidelidapp, una agenda en línea, un programa de puntos. Armar <strong>lo propio</strong> conviene cuando tu forma de trabajar es lo que te diferencia o cuando tus herramientas no se hablan.
        </p>
        <p>Lo más común es una mezcla: herramientas listas para lo común y rutinas propias para lo tuyo. Lo importante es que todo lea la misma base de información (la próxima lección).</p>
      </Explica>
      <DiagramaHechoVsPropio className="mt-6" />
      <Subtitulo>¿Qué te conviene para cada área?</Subtitulo>
      <Instruccion>Responde pensando en el área que más tiempo te quita hoy.</Instruccion>
      <ul className="mt-4 space-y-3">
        {PREGUNTAS_DECISION.map((q) => (
          <li key={q.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-slate-100">{q.texto}</p>
            <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label={q.texto}>
              {[
                { val: 'lista', l: q.lista },
                { val: 'propio', l: q.propio },
              ].map((o) => (
                <button
                  key={o.val}
                  type="button"
                  role="radio"
                  aria-checked={v[q.id] === o.val}
                  onClick={() => setD((p) => ({ ...p, [q.id]: o.val }))}
                  className={`min-h-[44px] rounded-lg border text-sm ${v[q.id] === o.val ? 'border-[#5fb2dd] bg-[#2175a1] text-white' : 'border-white/15 text-slate-300'}`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {respondidas === PREGUNTAS_DECISION.length ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Para esa área</p>
          <p className="mt-1 text-white">
            {propio >= 4
              ? 'Te conviene armar lo propio: una rutina con tu asistente que lea tu base de información.'
              : propio >= 2
                ? 'Mezcla: parte con una herramienta lista y suma rutinas propias donde te diferencias.'
                : 'Parte con una herramienta lista. Configúrala con tu esqueleto y tus frenos, y listo.'}
          </p>
        </div>
      ) : null}
      <Pantallita titulo="Grano Norte · la mezcla" className="mt-6">
        <p className="text-sm">Herramienta lista para WhatsApp (el chatbot del módulo 4). Rutinas propias para el resumen del día y el reporte del lunes, porque leen sus planillas.</p>
      </Pantallita>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mi decisión (.txt)"
          disabled={respondidas < PREGUNTAS_DECISION.length}
          onClick={() =>
            descargarArchivo(
              'herramienta-lista-o-propia.txt',
              armarTxt('Herramienta lista o sistema propio', [
                ...PREGUNTAS_DECISION.map((q) => `- ${q.texto} → ${v[q.id] === 'propio' ? q.propio : q.lista}`),
                '',
                `Resultado: ${propio >= 4 ? 'armar lo propio' : propio >= 2 ? 'mezcla (herramienta lista + rutinas propias)' : 'herramienta lista'}.`,
                'En los dos casos, todo lee la misma base de información.',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 2 · Base de información ──────────────────────────────────────

function useDocumentosCurso() {
  const [m0checks] = usePersistido(CLAVES_STORAGE.checklist, CHECKS_VACIOS);
  const reglas = useReglasM0();
  const [frase] = usePersistido(claveModulo(1, 'frase'), TEXTOS_VACIOS);
  const [temas] = usePersistido(claveModulo(1, 'temas'), TEXTOS_VACIOS);
  const [mensajes] = usePersistido(claveModulo(2, 'mensajes'), TEXTOS_VACIOS);
  const [propuesta] = usePersistido(claveModulo(2, 'propuesta'), TEXTOS_VACIOS);
  const [procesos] = usePersistido(claveModulo(3, 'procesos'), TEXTOS_VACIOS);
  const [checklist] = usePersistido(claveModulo(3, 'checklist_propio'), TEXTOS_VACIOS);
  const [asistente] = usePersistido(claveModulo(4, 'asistente'), TEXTOS_VACIOS);
  const [derivacion] = usePersistido(claveModulo(4, 'derivacion'), TEXTOS_VACIOS);
  const [reclamos] = usePersistido(claveModulo(4, 'reclamos'), TEXTOS_VACIOS);
  const [cobranza] = usePersistido(claveModulo(5, 'cobranza'), TEXTOS_VACIOS);
  const [gastos] = usePersistido(claveModulo(5, 'gastos'), FILAS_VACIAS);
  const [numeros] = usePersistido(claveModulo(5, 'numeros'), TEXTOS_VACIOS);
  const [margen] = usePersistido(claveModulo(5, 'margen'), TEXTOS_VACIOS);
  return [
    { carpeta: '01 · Esqueleto', doc: 'Esqueleto de tu agente', modulo: 0, listo: !!m0checks.l3a },
    { carpeta: '02 · Reglas de freno', doc: 'Reglas de freno', modulo: 0, listo: reglas.length > 0 },
    { carpeta: '02 · Reglas de freno', doc: 'Reglas de derivación', modulo: 4, listo: hayTexto(derivacion) },
    { carpeta: '03 · Procesos', doc: '3 procesos escritos', modulo: 3, listo: hayTexto(procesos) },
    { carpeta: '03 · Procesos', doc: 'Checklist de entrega', modulo: 3, listo: hayTexto(checklist) },
    { carpeta: '04 · Plantillas', doc: 'Frase y 3 temas', modulo: 1, listo: hayTexto(frase) || hayTexto(temas) },
    { carpeta: '04 · Plantillas', doc: 'Mensajes de seguimiento y propuesta', modulo: 2, listo: hayTexto(mensajes) || hayTexto(propuesta) },
    { carpeta: '04 · Plantillas', doc: 'Instrucciones del asistente', modulo: 4, listo: hayTexto(asistente) },
    { carpeta: '04 · Plantillas', doc: 'Plantillas de reclamos y cobranza', modulo: 4, listo: hayTexto(reclamos) || hayTexto(cobranza) },
    { carpeta: '05 · Números', doc: 'Gastos, reporte del lunes y margen', modulo: 5, listo: gastos.length > 0 || hayTexto(numeros) || hayTexto(margen) },
  ];
}

const LEEME = [
  'LEEME · Mi negocio · Sistema',
  '',
  'Esta carpeta es la única versión de cómo funciona el negocio. Si algo cambia (un precio, un horario, un proceso), se cambia aquí.',
  '',
  '00 · LEEME ............ este archivo',
  '01 · Esqueleto ........ qué vendemos, a quién, precios, horario, tono, preguntas de siempre',
  '02 · Reglas de freno .. lo que decide siempre una persona + reglas de derivación',
  '03 · Procesos ......... procesos en 7 pasos o menos + checklists de entrega',
  '04 · Plantillas ....... mensajes, propuesta, reclamos, cobranza, instrucciones del asistente',
  '05 · Números .......... embudo, gastos, reporte del lunes, margen',
  '',
  'Quién actualiza cada carpeta: [nombre por carpeta]',
  'Cuándo se revisa: en la revisión de los viernes (15 min).',
  '',
  'Si usas un proyecto en Claude o ChatGPT: sube estos archivos como conocimiento del proyecto y pega en las instrucciones:',
  '«Antes de responder, revisa los archivos del proyecto. Si algo no está ahí, dilo; no lo inventes. Respeta siempre las reglas de freno.»',
];

function LeccionBase() {
  const docs = useDocumentosCurso();
  const montado = useMontado();
  const listos = montado ? docs.filter((d) => d.listo).length : 0;
  return (
    <>
      <Explica>
        <p>
          Cada asistente que armaste en el curso necesita saber lo mismo: quién eres, qué vendes, cómo hablas y qué decide una persona. Si esa información vive en cinco lugares distintos, tarde o temprano uno queda desactualizado y responde mal.
        </p>
        <p>
          Por eso juntas todo en <strong>un solo lugar ordenado</strong>: una carpeta compartida (Google Drive sirve) o un proyecto en Claude o ChatGPT donde subes esos archivos. Lo importante es que haya una sola versión: si cambia un precio, se cambia ahí y todos lo leen.
        </p>
      </Explica>
      <DiagramaBaseInformacion className="mt-6" />
      <Subtitulo>Lo que ya armaste en el curso</Subtitulo>
      <Instruccion>
        {montado ? `${listos} de ${docs.length} documentos tienen avance guardado en este navegador.` : 'Revisando tu avance…'} Descarga cada uno desde su módulo y guárdalo en su carpeta.
      </Instruccion>
      <ul className="mt-4 space-y-2">
        {docs.map((d) => (
          <li key={d.doc} className={`flex items-start gap-3 rounded-xl border p-3 ${montado && d.listo ? 'border-[#2175a1]/60 bg-[#2175a1]/10' : 'border-white/10 bg-white/[0.02]'}`}>
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${montado && d.listo ? 'border-[#2175a1] bg-[#2175a1]' : 'border-white/30'}`}>
              {montado && d.listo ? <Check className="h-3.5 w-3.5 text-white" aria-hidden /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-white">{d.doc}</span>
              <span className="block font-mono text-[11px] text-slate-400">{d.carpeta}</span>
            </span>
            {!(montado && d.listo) ? (
              <Link href={rutaModulo(d.modulo)} className="shrink-0 text-xs text-[#5fb2dd] hover:underline">
                Módulo {d.modulo}
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
      <Pantallita titulo="Grano Norte · Sistema" className="mt-6">
        <p className="text-sm">Una carpeta en Drive con 6 subcarpetas y un proyecto en Claude con los mismos archivos. Cuando Camila cambió el precio del kilo, lo cambió en un solo archivo y el asistente de WhatsApp lo supo al tiro.</p>
      </Pantallita>
      <Freno>En la base van tus reglas, procesos y plantillas, no claves ni datos bancarios. Y la base la actualiza una persona: el asistente la lee, no la cambia.</Freno>
      <div className="mt-4">
        <BotonDescarga etiqueta="Descargar el LEEME de tu carpeta (.txt)" onClick={() => descargarArchivo('00-LEEME.txt', LEEME.join('\r\n'))} />
      </div>
    </>
  );
}

// ─── Lección 3 · Permisos ──────────────────────────────────────────────────

const NIVELES = [
  { id: 'leer', etiqueta: 'Puede leer' },
  { id: 'borrador', etiqueta: 'Solo borrador' },
  { id: 'nunca', etiqueta: 'Nunca' },
];

const ACCIONES = [
  { id: 'a1', texto: 'Leer los correos de clientes para el resumen del día.', correcta: 'leer', porque: 'Leer para resumir no cambia nada.' },
  { id: 'a2', texto: 'Responder un correo de un cliente.', correcta: 'borrador', porque: 'Lo deja listo; lo envía una persona.' },
  { id: 'a3', texto: 'Hacer una transferencia a un proveedor.', correcta: 'nunca', porque: 'La plata la mueve siempre una persona.' },
  { id: 'a4', texto: 'Ver el calendario para saber qué entregas hay hoy.', correcta: 'leer', porque: 'Solo lectura.' },
  { id: 'a5', texto: 'Crear un evento con un cliente nuevo.', correcta: 'borrador', porque: 'Propone el horario; una persona lo confirma.' },
  { id: 'a6', texto: 'Borrar correos antiguos para ordenar la bandeja.', correcta: 'nunca', porque: 'Borrar no se deshace.' },
  { id: 'a7', texto: 'Leer la planilla de pagos para el reporte del lunes.', correcta: 'leer', porque: 'Solo lectura.' },
  { id: 'a8', texto: 'Enviar un recordatorio de cobranza.', correcta: 'borrador', porque: 'Toca plata y relación con el cliente: lo revisa una persona.' },
  { id: 'a9', texto: 'Confirmarle una fecha de entrega a un cliente.', correcta: 'nunca', porque: 'Comprometer una fecha es una regla de freno.' },
  { id: 'a10', texto: 'Cambiar un precio en la lista vigente.', correcta: 'nunca', porque: 'Los precios los cambia una persona en la base de información.' },
];

function LeccionPermisos() {
  const negocio = useNegocio();
  return (
    <>
      <Explica>
        <p>
          Conectar un asistente a tu correo, tu calendario y tus planillas es lo que le permite trabajar con datos reales. Darle permiso para enviar, pagar o borrar sin revisar es un riesgo que no necesitas correr.
        </p>
        <p>
          Piensa en tres niveles: lo que <strong>puede leer</strong>, lo que <strong>solo puede dejar en borrador</strong> y lo que <strong>nunca hace</strong>. Cuando conectes una herramienta (por ejemplo, al darle acceso a tu cuenta de Google), elige el permiso mínimo: si solo necesita leer el calendario, no le des permiso para modificarlo.
        </p>
      </Explica>
      <DiagramaPermisos className="mt-6" />
      <Subtitulo>Práctica: clasifica 10 acciones</Subtitulo>
      <Clasificador clave={K.permisos} categorias={NIVELES} items={ACCIONES} />
      <Pantallita titulo="Grano Norte · permisos" className="mt-6">
        <p className="text-sm">El asistente lee pedidos, pagos y el calendario; deja borradores de seguimiento y cobranza; y nunca toca la cuenta del banco. Una vez al mes, Camila revisa qué apps tienen acceso a su cuenta de Google y desconecta las que ya no usa.</p>
      </Pantallita>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar matriz de permisos (.txt)"
          onClick={() =>
            descargarArchivo(
              'matriz-de-permisos.txt',
              armarTxt(
                'Matriz de permisos del asistente',
                [
                  ...NIVELES.flatMap((n) => [n.etiqueta.toUpperCase(), ...ACCIONES.filter((a) => a.correcta === n.id).map((a) => `- ${a.texto}`), '']),
                  'REVISIÓN MENSUAL: qué herramientas tienen acceso a mis cuentas; desconectar lo que ya no uso.',
                ],
                negocio,
              ),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 4 · Rutinas automáticas ──────────────────────────────────────

const RUTINAS = [
  { id: 'resumen', t: 'Resumen del día', m: 'Módulo 3', hace: 'Lee correo, pedidos y tablero; deja qué llegó, qué falta y qué vence.', hora: 'Lunes a viernes, 8:30' },
  { id: 'prospectos', t: 'Lista de prospectos', m: 'Módulo 2', hace: 'Propone 10 prospectos que calzan con tu cliente ideal y los borradores del primer mensaje.', hora: 'Lunes a viernes, 9:00' },
  { id: 'lunes', t: 'Reporte del lunes', m: 'Módulo 5', hace: 'Arma tus 5 números comparados con la semana anterior.', hora: 'Lunes, 8:00' },
];

const CAMPOS_RUTINA: Campo[] = [
  { id: 'hora', etiqueta: 'Cuándo corre', placeholder: 'Ej.: lunes a viernes, 8:30' },
  { id: 'fuentes', etiqueta: 'Qué lee', placeholder: 'Ej.: correo, planilla de pedidos, tablero' },
  { id: 'donde', etiqueta: 'Dónde deja el borrador', placeholder: 'Ej.: en mi correo o en el grupo del equipo' },
  { id: 'quien', etiqueta: 'Quién lo revisa', placeholder: 'Ej.: Camila; si no está, Rocío' },
  { id: 'herramienta', etiqueta: 'Con qué corre', placeholder: 'Ej.: tarea programada del asistente, o recordatorio de calendario + prompt' },
];

function LeccionRutinas() {
  const [r, setR] = useTextos(K.rutina);
  const montado = useMontado();
  const negocio = useNegocio();
  const v = montado ? r : TEXTOS_VACIOS;
  const rutina = RUTINAS.find((x) => x.id === v.tipo) ?? RUTINAS[0];
  const ficha = [
    `RUTINA: ${rutina.t}`,
    `Qué hace: ${rutina.hace}`,
    `Cuándo: ${(v.hora ?? '').trim() || rutina.hora}`,
    `Qué lee: ${(v.fuentes ?? '').trim() || '(definir)'}`,
    `Dónde deja el borrador: ${(v.donde ?? '').trim() || '(definir)'}`,
    `Quién lo revisa: ${(v.quien ?? '').trim() || '(definir)'}`,
    `Con qué corre: ${(v.herramienta ?? '').trim() || '(definir)'}`,
  ];
  const prompt = [
    `Eres el asistente de ${negocio.trim() || '[mi negocio]'}. Lee primero la base de información (esqueleto, reglas de freno, procesos).`,
    `Tarea: ${rutina.t.toLowerCase()}. ${rutina.hace}`,
    `Fuentes: ${(v.fuentes ?? '').trim() || '[tus fuentes]'}.`,
    `Entrega: un borrador corto en ${(v.donde ?? '').trim() || '[dónde lo dejas]'}. No envíes, no respondas a nadie y no cambies nada.`,
    'Si falta un dato, escribe «FALTA» en vez de inventarlo.',
  ].join('\n');
  return (
    <>
      <Explica>
        <p>
          Una rutina automática es una tarea que <strong>se prepara sola, a la misma hora</strong>, sin que tengas que acordarte. En el curso diseñaste tres: el resumen del día, la lista de prospectos y el reporte del lunes. Elige una para empezar; cuando corra bien una semana, sumas la siguiente.
        </p>
        <p>
          Varios asistentes (ChatGPT, por ejemplo) ya permiten programar una tarea para que corra a una hora fija. Si el tuyo no, un recordatorio de calendario a esa hora con el prompt guardado funciona igual: abres, pegas, revisas. Lo que importa es la ficha: qué hace, cuándo, qué lee, dónde lo deja y quién lo revisa.
        </p>
      </Explica>
      <DiagramaRutinaAutomatica className="mt-6" />
      <Subtitulo>1 · Elige tu primera rutina</Subtitulo>
      <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Rutina">
        {RUTINAS.map((x) => (
          <button
            key={x.id}
            type="button"
            role="radio"
            aria-checked={rutina.id === x.id}
            onClick={() => setR((p) => ({ ...p, tipo: x.id }))}
            className={`flex min-h-[96px] flex-col items-start rounded-xl border p-3 text-left ${rutina.id === x.id ? 'border-[#5fb2dd] bg-[#2175a1]/25' : 'border-white/10 bg-white/[0.02] hover:border-white/25'}`}
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#5fb2dd]">{x.m}</span>
            <span className="text-sm font-semibold text-white">{x.t}</span>
            <span className="mt-1 text-[13px] leading-snug text-slate-300">{x.hace}</span>
          </button>
        ))}
      </div>
      <Subtitulo>2 · Su ficha</Subtitulo>
      <Campos clave={K.rutina} campos={CAMPOS_RUTINA} />
      <Pantallita titulo={`Ficha · ${rutina.t}`} className="mt-6">
        <ul className="space-y-1 text-sm">
          {ficha.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </Pantallita>
      <BloqueCopiar titulo="Prompt de la rutina" texto={montado ? prompt : ''} nota="Pruébalo a mano dos días antes de programarlo." />
      <Freno>Una rutina prepara; no envía. Lo que sale hacia un cliente, o lo que toca plata, plazos o reclamos, lo revisa una persona antes.</Freno>
      <div className="mt-4">
        <BotonDescarga etiqueta="Descargar ficha y prompt (.txt)" onClick={() => descargarArchivo('rutina-automatica.txt', armarTxt('Rutina automática', [...ficha, '', 'PROMPT', prompt], negocio))} />
      </div>
    </>
  );
}

// ─── Lección 5 · Revisión de los viernes ──────────────────────────────────

const CAMPOS_REVISION: Campo[] = [
  { id: 'hizo', etiqueta: '¿Qué hizo el sistema esta semana?', filas: 2, placeholder: 'Ej.: 5 resúmenes, 1 reporte, 38 mensajes respondidos' },
  { id: 'fallo', etiqueta: '¿Qué falló?', filas: 2, placeholder: 'Ej.: el asistente respondió tarde en la noche' },
  { id: 'ajuste', etiqueta: '¿Qué ajusto y dónde lo escribo?', filas: 2, placeholder: 'Ej.: horario del asistente → instrucciones' },
];

const FRENOS_REVISION = [
  { id: 'f1', texto: 'Ningún precio, descuento o pago salió sin una persona.' },
  { id: 'f2', texto: 'Ninguna fecha de entrega se comprometió sola.' },
  { id: 'f3', texto: 'Todos los reclamos tuvieron respuesta humana a tiempo.' },
  { id: 'f4', texto: 'La base de información está al día (precios, horarios, procesos).' },
];

function LeccionRevision() {
  const [r, setR] = useTextos(K.revision);
  const [historial, setHistorial] = useFilas(K.historial);
  const [frenos, setFrenos] = useMarcas(K.frenosRevision);
  const montado = useMontado();
  const guardar = () => {
    if (!CAMPOS_REVISION.some((c) => r[c.id]?.trim())) return;
    const ok = FRENOS_REVISION.filter((f) => frenos[f.id]).length;
    setHistorial((p) => [{ _id: nuevoId(), fecha: new Date().toLocaleDateString('es-CL'), hizo: r.hizo ?? '', fallo: r.fallo ?? '', ajuste: r.ajuste ?? '', frenos: `${ok}/${FRENOS_REVISION.length}` } as Fila, ...p].slice(0, 12));
    setR(() => ({}));
    setFrenos(() => ({}));
  };
  return (
    <>
      <Explica>
        <p>
          Un sistema que nadie revisa se desordena solo. <strong>Quince minutos los viernes</strong> lo mantienen al día: qué hizo el sistema, qué falló y qué vas a ajustar. Y revisas tus frenos: que nada que toque plata, plazos o reclamos haya salido sin una persona.
        </p>
        <p>Cada falla deja un ajuste escrito: una línea en las instrucciones, un paso en un proceso o una regla de freno más. Así el sistema aprende contigo.</p>
      </Explica>
      <DiagramaRevisionViernes className="mt-6" />
      <FotoBanda foto={APOYO.escritorioNoche} posicion="center 50%" />
      <Subtitulo>Tu revisión de esta semana</Subtitulo>
      <Campos clave={K.revision} campos={CAMPOS_REVISION} />
      <p className="mt-6 text-sm font-medium text-slate-200">Los frenos de la semana</p>
      <Elegibles clave={K.frenosRevision} opciones={FRENOS_REVISION} className="mt-2" />
      <button type="button" onClick={guardar} className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#2175a1] bg-[#2175a1]/20 px-6 text-sm font-semibold text-white hover:bg-[#2175a1]/35">
        Guardar la revisión de hoy
      </button>
      {montado && historial.length ? (
        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Tus revisiones</p>
          <ul className="mt-2 space-y-2">
            {historial.map((h) => (
              <li key={h._id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-slate-300">
                <p className="font-mono text-xs text-slate-400">
                  {h.fecha} · frenos {h.frenos}
                </p>
                {h.fallo ? <p className="mt-1">Falló: {h.fallo}</p> : null}
                {h.ajuste ? <p>Ajuste: {h.ajuste}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Pantallita titulo="Grano Norte · viernes" className="mt-6">
        <p className="text-sm">Hizo: 5 resúmenes y 41 respuestas. Falló: el asistente respondía a las 23:00 y prometía «mañana temprano». Ajuste: horario de atención en las instrucciones; fuera de horario, mensaje de ausencia.</p>
      </Pantallita>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar plantilla de revisión (.txt)"
          onClick={() =>
            descargarArchivo(
              'revision-de-los-viernes.txt',
              armarTxt('Revisión de los viernes · 15 min', [
                ...CAMPOS_REVISION.map((c) => `${c.etiqueta}\n`),
                'FRENOS',
                ...FRENOS_REVISION.map((f) => `[ ] ${f.texto}`),
                '',
                ...(historial.length ? ['HISTORIAL', ...historial.map((h) => `${h.fecha} · frenos ${h.frenos} · falló: ${h.fallo || '—'} · ajuste: ${h.ajuste || '—'}`)] : []),
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Proyecto final · El tablero de tu negocio ─────────────────────────────

const DEFAULTS_AREA: Record<AreaId, { rutina: string; plantilla: string; numero: string }> = {
  marketing: { rutina: 'Una tarde al mes: 4 ideas al calendario. Viernes, 10 min: números por pieza.', plantilla: 'Frase, 3 temas, calendario de 4 semanas y plantillas de comentarios', numero: 'Mensajes de clientes que llegaron por el contenido' },
  ventas: { rutina: '20 minutos cada día hábil. Seguimientos de propuestas a los 3, 7 y 14 días.', plantilla: 'Mensajes de seguimiento y propuesta de una página', numero: 'Conversaciones nuevas' },
  operacion: { rutina: 'Resumen del día a las 8:30. Tablero revisado a las 9:00 y a las 17:00.', plantilla: '3 procesos escritos y checklist de entrega', numero: 'Entregas a tiempo' },
  atencion: { rutina: 'Asistente activo. Derivados revisados 2 veces al día.', plantilla: 'Instrucciones del asistente, reglas de derivación y plantillas de reclamos', numero: '% de mensajes resueltos solos' },
  finanzas: { rutina: 'Cobranza en fechas fijas. Boletas los viernes. Reporte de 5 números los lunes.', plantilla: 'Planilla de gastos, reporte del lunes y margen', numero: 'Por cobrar' },
};

const ESTILOS_IMPRESION = `
@media print {
  @page { margin: 14mm; }
  html, body { background: #fff !important; }
  .mod-no-print { display: none !important; }
  .m6-final { padding: 0 !important; max-width: none !important; }
  .m6-hoja { border: none !important; padding: 0 !important; margin: 0 !important; }
  .m6-hoja, .m6-hoja *:not(.semaforo-punto) { color: #0f172a !important; background-color: transparent !important; border-color: #cbd5e1 !important; box-shadow: none !important; }
  .m6-hoja input, .m6-hoja textarea { border: none !important; padding: 0 !important; resize: none !important; }
  .m6-salto { break-before: page; }
  .semaforo-punto { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

const CAMPO_TABLERO = 'w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-[14px] text-slate-100 focus:border-[#5fb2dd] focus:outline-none';

function ProyectoFinal() {
  const montado = useMontado();
  const negocio = useNegocio();
  const reglas = useReglasM0();
  const [antes] = usePersistido(CLAVES_STORAGE.diagnostico, RESPUESTAS_VACIAS);
  const [m0checks] = usePersistido(CLAVES_STORAGE.checklist, CHECKS_VACIOS);
  const despues = {
    marketing: usePersistido(claveModulo(1, 'despues'), RESPUESTAS_VACIAS)[0],
    ventas: usePersistido(claveModulo(2, 'despues'), RESPUESTAS_VACIAS)[0],
    operacion: usePersistido(claveModulo(3, 'despues'), RESPUESTAS_VACIAS)[0],
    atencion: usePersistido(claveModulo(4, 'despues'), RESPUESTAS_VACIAS)[0],
    finanzas: usePersistido(claveModulo(5, 'despues'), RESPUESTAS_VACIAS)[0],
  } as Record<AreaId, Record<string, Respuesta>>;
  const [t, setT] = useTextos(K.tablero);
  const [prueba, setPrueba] = useMarcas(K.prueba);
  const [historial] = useFilas(K.historial);
  const [rutina] = useTextos(K.rutina);
  const valor = (area: AreaId, campo: 'rutina' | 'plantilla' | 'numero' | 'quien') => (montado ? t[`${area}_${campo}`] : undefined) ?? (campo === 'quien' ? '' : DEFAULTS_AREA[area][campo]);
  const guion = GUIONES['m6-final'];
  const rutinaActiva = RUTINAS.find((x) => x.id === rutina.tipo) ?? RUTINAS[0];

  return (
    <section className="m6-final mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <style>{ESTILOS_IMPRESION}</style>
      <div className="mod-no-print">
        <Kicker>Proyecto final</Kicker>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">{PROYECTO_FINAL.titulo}</h2>
        <p className="mt-3 text-slate-300">{PROYECTO_FINAL.texto} Junta lo que armaste en los 7 módulos en un solo documento, compáralo con el mapa del módulo 0 y guárdalo en PDF.</p>
        <div className="mt-6">
          <VideoPendiente titulo={guion?.titulo ?? 'Tu negocio en 6 semanas: antes y después'} guion={guion} portada={FOTOS.retrato} posicion="center 20%" />
        </div>

        <Subtitulo>1 · La prueba real: una rutina sola durante una semana</Subtitulo>
        <p className="mt-2 text-slate-300">Tu rutina elegida: {rutinaActiva.t.toLowerCase()}.</p>
        <Checklist
          titulo="Durante la semana"
          items={[
            { id: 'p1', texto: 'La rutina corrió sola al menos 5 días.' },
            { id: 'p2', texto: 'Revisé cada borrador antes de que saliera algo.' },
            { id: 'p3', texto: 'Hice mi revisión del viernes y anoté un ajuste.' },
          ]}
          checks={montado ? prueba : CHECKS_VACIOS}
          onToggle={(id) => setPrueba((p) => ({ ...p, [id]: !p[id] }))}
        />

        <Subtitulo>2 · Tu semáforo de las 5 áreas, hoy</Subtitulo>
        <p className="mt-2 text-slate-300">Si ya lo respondiste al cierre de cada módulo, aparece marcado. Completa lo que falte.</p>
        {AREAS.map((a) => (
          <details key={a.id} className="group mt-3 rounded-xl border border-white/10 bg-white/[0.02] px-4" open={montado && !semaforoGuardado(a.id, despues[a.id])}>
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 text-white">
              <span>{a.nombre}</span>
              <span className="flex items-center gap-2 font-mono text-xs text-slate-400">
                {montado && semaforoGuardado(a.id, despues[a.id]) ? (
                  <>
                    <PuntoSemaforo semaforo={semaforoGuardado(a.id, despues[a.id])!} /> {ETIQUETA_SEMAFORO[semaforoGuardado(a.id, despues[a.id])!]}
                  </>
                ) : (
                  'Pendiente'
                )}
              </span>
            </summary>
            <div className="pb-4">
              <SemaforoArea area={a.id} clave={claveModulo(a.modulo, 'despues')} />
            </div>
          </details>
        ))}

        <Subtitulo>3 · Tu tablero</Subtitulo>
        <p className="mt-2 text-slate-300">Revisa y ajusta la rutina, la plantilla, el número semanal y el responsable de cada área. Lo que escribas aquí queda en la hoja.</p>
      </div>

      <div className="m6-hoja mt-6 rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">El tablero de tu negocio</p>
            <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">{(montado && negocio.trim()) || 'Mi negocio'}</p>
          </div>
          <p className="font-mono text-xs text-slate-400">{montado ? new Date().toLocaleDateString('es-CL') : ''}</p>
        </div>

        <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">1 · Mapa y semáforo, antes y después</h3>
        <table className="mt-3 w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-slate-500">
              <th className="py-1 font-normal">Área</th>
              <th className="py-1 font-normal">Antes</th>
              <th className="py-1 font-normal">Después</th>
            </tr>
          </thead>
          <tbody>
            {AREAS.map((a) => {
              const s0 = montado ? semaforoGuardado(a.id, antes) : null;
              const s1 = montado ? semaforoGuardado(a.id, despues[a.id]) : null;
              return (
                <tr key={a.id} className="border-t border-white/5">
                  <td className="py-2 pr-2 text-slate-100">{a.nombre}</td>
                  <td className="py-2 pr-2">
                    {s0 ? (
                      <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <PuntoSemaforo semaforo={s0} /> {ETIQUETA_SEMAFORO[s0]}
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-2">
                    {s1 ? (
                      <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <PuntoSemaforo semaforo={s1} /> {ETIQUETA_SEMAFORO[s1]}
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">2 · Esqueleto y reglas de freno</h3>
        <p className="mt-2 text-sm text-slate-200">{montado && m0checks.l3a ? 'Esqueleto completo: vive en la carpeta 01 de la base de información.' : 'Esqueleto: pendiente (módulo 0, lección 3).'}</p>
        {montado && reglas.length ? (
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-200">
            {reglas.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        ) : (
          <p className="mt-1 text-sm text-slate-400">Reglas de freno: pendientes (módulo 0, lección 4).</p>
        )}

        <h3 className="m6-salto mt-6 text-xs uppercase tracking-wider text-slate-400">3 · Cada área: rutina, plantilla, número semanal y responsable</h3>
        <div className="mt-3 space-y-4">
          {AREAS.map((a) => (
            <div key={a.id} className="border-t border-white/10 pt-3">
              <p className="font-serif text-lg text-white">
                {a.nombre} <span className="font-mono text-[11px] text-slate-500">· módulo {a.modulo}</span>
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {(
                  [
                    { c: 'rutina', l: 'Rutina (qué, cuándo)' },
                    { c: 'quien', l: 'Quién' },
                    { c: 'plantilla', l: 'Plantilla' },
                    { c: 'numero', l: 'Número semanal' },
                  ] as const
                ).map((x) => (
                  <label key={x.c} className="block text-[11px] uppercase tracking-wider text-slate-400">
                    {x.l}
                    <textarea
                      rows={x.c === 'quien' ? 1 : 2}
                      value={valor(a.id, x.c)}
                      placeholder={x.c === 'quien' ? 'Nombre del responsable' : ''}
                      onChange={(e) => setT((p) => ({ ...p, [`${a.id}_${x.c}`]: e.target.value }))}
                      className={`mt-1 resize-y normal-case tracking-normal ${CAMPO_TABLERO}`}
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">4 · La revisión de los viernes</h3>
        <p className="mt-2 text-sm text-slate-200">15 minutos: qué hizo el sistema, qué falló, qué ajustar y revisar los frenos.{montado && historial.length ? ` Última revisión: ${historial[0].fecha}.` : ''}</p>

        <p className="mt-8 border-t border-white/10 pt-3 font-mono text-[10px] text-slate-500">Curso «Tu negocio de punta a punta» · Proyecto final · Villelab</p>
      </div>

      <div className="mod-no-print">
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => window.print()} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white hover:bg-[#ff5c9f]">
            <Printer className="h-4 w-4" aria-hidden /> Imprimir o guardar en PDF
          </button>
          <BotonDescarga
            etiqueta="Descargar tablero (.txt)"
            onClick={() =>
              descargarArchivo(
                'tablero-de-mi-negocio.txt',
                armarTxt(
                  'El tablero de tu negocio',
                  [
                    '1 · MAPA Y SEMÁFORO (antes → después)',
                    ...AREAS.map((a) => {
                      const s0 = semaforoGuardado(a.id, antes);
                      const s1 = semaforoGuardado(a.id, despues[a.id]);
                      return `- ${a.nombre}: ${s0 ? ETIQUETA_SEMAFORO[s0] : '—'} → ${s1 ? ETIQUETA_SEMAFORO[s1] : '—'}`;
                    }),
                    '',
                    '2 · REGLAS DE FRENO',
                    ...(reglas.length ? reglas.map((r, i) => `${i + 1}. ${r}`) : ['(pendientes)']),
                    '',
                    '3 · CADA ÁREA',
                    ...AREAS.flatMap((a) => [
                      a.nombre.toUpperCase(),
                      `  Rutina: ${valor(a.id, 'rutina')}`,
                      `  Quién: ${valor(a.id, 'quien') || '(definir)'}`,
                      `  Plantilla: ${valor(a.id, 'plantilla')}`,
                      `  Número semanal: ${valor(a.id, 'numero')}`,
                    ]),
                    '',
                    '4 · REVISIÓN DE LOS VIERNES: 15 min · qué hizo, qué falló, qué ajustar, frenos.',
                  ],
                  negocio,
                ),
              )
            }
          />
        </div>

        <div className="mt-8 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Certificado de finalización</p>
          <p className="mt-2 text-slate-200">Guarda tu tablero en PDF: es lo que subes para recibir tu certificado de finalización del curso.</p>
        </div>

        <div className="mt-6 grid gap-5 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-[200px_1fr]">
          <figure className="relative aspect-[16/9] sm:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOTOS.pizarra.src} alt={FOTOS.pizarra.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 30%' }} />
          </figure>
          <div className="p-5 sm:pl-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Siguiente paso opcional</p>
            <p className="mt-2 font-serif text-xl text-white">Una sesión de 90 minutos para armar contigo lo que quedó pendiente</p>
            <p className="mt-2 text-sm text-slate-400">Traes tu tablero y lo dejamos funcionando en el área que más te cuesta.</p>
            <a
              href={LINKS.agendar}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-200 hover:border-white/30"
            >
              Conversemos <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <PieModulos actual={6} />
      </div>
    </section>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────

const LECCIONES: LeccionDef[] = [
  {
    id: 'decision',
    bajada: 'Cuándo basta con una herramienta lista (como Fidelidapp) y cuándo conviene armar lo propio.',
    portada: FOTOS.tutorial,
    posicion: 'center 30%',
    contenido: <LeccionDecision />,
    checklist: [
      { id: 'l1a', texto: 'Respondí las 5 preguntas para mi área más cargada.' },
      { id: 'l1b', texto: 'Decidí qué uso listo y qué armo propio.' },
      { id: 'l1c', texto: 'Anoté qué herramientas ya pago y no uso.' },
    ],
  },
  {
    id: 'base',
    bajada: 'Esqueleto, procesos, plantillas y reglas en un solo lugar ordenado (carpeta o proyecto en Claude) que todos tus asistentes leen.',
    portada: APOYO.escritorioClaro,
    contenido: <LeccionBase />,
    checklist: [
      { id: 'l2a', texto: 'Creé la carpeta con sus 6 subcarpetas.' },
      { id: 'l2b', texto: 'Guardé ahí los documentos que armé en el curso.' },
      { id: 'l2c', texto: 'Escribí el LEEME con quién actualiza cada carpeta.' },
    ],
  },
  {
    id: 'permisos',
    bajada: 'Con permisos mínimos: qué puede leer y qué solo puede dejar en borrador.',
    portada: FOTOS.explicando,
    posicion: 'center 25%',
    contenido: <LeccionPermisos />,
    checklist: [
      { id: 'l3a', texto: 'Clasifiqué las 10 acciones.' },
      { id: 'l3b', texto: 'Revisé qué apps tienen acceso a mi correo y calendario.' },
      { id: 'l3c', texto: 'Desconecté lo que ya no uso.' },
    ],
  },
  {
    id: 'rutinas',
    bajada: 'Resumen del día, lista de prospectos y reporte del lunes: cómo dejarlas corriendo a una hora fija.',
    portada: APOYO.mesaCafe,
    contenido: <LeccionRutinas />,
    checklist: [
      { id: 'l4a', texto: 'Elegí mi primera rutina.' },
      { id: 'l4b', texto: 'Completé su ficha.' },
      { id: 'l4c', texto: 'La dejé programada (o con recordatorio y prompt).' },
    ],
  },
  {
    id: 'revision',
    bajada: '15 minutos los viernes para revisar qué hizo el sistema, qué falló y qué ajustar.',
    portada: APOYO.calendario,
    contenido: <LeccionRevision />,
    checklist: [
      { id: 'l5a', texto: 'Agendé 15 minutos los viernes.' },
      { id: 'l5b', texto: 'Hice mi primera revisión y la guardé.' },
      { id: 'l5c', texto: 'Escribí un ajuste en la base de información.' },
    ],
  },
];

export default function Modulo6Content() {
  return (
    <ModuloCurso
      numero={6}
      intro="Arma tu sistema propio. Juntas todo en una base de información, conectas correo, calendario y planillas con permisos mínimos, dejas una rutina corriendo sola y cierras con el tablero de tu negocio."
      portada={APOYO.oficina}
      lecciones={LECCIONES}
      cierre={<ProyectoFinal />}
      etiquetaCierre="Tablero"
      textoIrCierre="Ir al proyecto final: el tablero de tu negocio"
    />
  );
}
