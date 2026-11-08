'use client';

/*
 * /curso/modulo-4 — Módulo 4 «Atención y postventa: responder a tiempo y que vuelvan a comprar»
 * (curso v1.1 «El sistema de tu negocio»). Agrega la hoja Atención a la planilla del sistema
 * (lib/productos/curso/plantilla.ts), con las mismas columnas.
 * 5 lecciones + cierre (prueba real, semáforo antes/después, entregable: respuestas listas + reglas de derivación +
 * hoja Atención + mensaje de postventa). La IA o un chatbot quedan como ayuda opcional, nunca como el centro.
 */

import { useMemo } from 'react';
import { Minus, Plus } from 'lucide-react';
import { CLAVES_STORAGE, REGLAS_FRENO, type ReglaFreno } from '@/lib/productos/curso/curso';
import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { LINKS } from '@/lib/productos/links';
import { TIPOS_CASO } from '@/lib/productos/curso/plantilla';
import { useMontado, usePersistido } from '@/lib/productos/curso/persistencia';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaCasoReclamo, DiagramaConversacion } from '@/components/productos/diagramas/modulos';
import { DiagramaDerivacionPersona, DiagramaPostventa, DiagramaRespuestaRapida, DiagramaTresTiposRespuesta } from '@/components/productos/diagramas/sistema-m34';
import {
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
  armarCsv,
  armarTxt,
  claveModulo,
  descargarArchivo,
  numero,
  useFilas,
  useNegocio,
  useTextos,
  type Campo,
  type Columna,
  type Fila,
  type LeccionDef,
} from './leccion';

const K = {
  clasificar: claveModulo(4, 'clasificar'),
  contador: claveModulo(4, 'contador'),
  respuestas: claveModulo(4, 'respuestas'),
  pasosWa: claveModulo(4, 'pasos_wa'),
  vaAHoja: claveModulo(4, 'va_a_hoja'),
  casos: claveModulo(4, 'casos_hoja'),
  reclamos: claveModulo(4, 'reclamos'),
  derivacion: claveModulo(4, 'derivacion'),
  disparadores: claveModulo(4, 'disparadores'),
  postventa: claveModulo(4, 'postventa'),
  recompra: claveModulo(4, 'recompra'),
  semana: claveModulo(4, 'semana'),
};

const claseInput =
  'mt-1.5 min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none';

const isoLocal = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const masDias = (dias: number, base = new Date()) => {
  const d = new Date(base);
  d.setDate(d.getDate() + dias);
  return isoLocal(d);
};
const fechaLegible = (iso?: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
};
const diasEntre = (desde: string, hasta: string) => Math.round((Date.parse(hasta) - Date.parse(desde)) / 86400000);

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
  const dias = val('d2_rep') + val('d2_dec') + val('d2_nue') > 0 ? 2 : 1;
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
            {total} mensajes en {dias === 2 ? '2 días' : '1 día'}: {TIPOS.map((t) => `${t.etiqueta.toLowerCase()} ${Math.round((porTipo(t.id) / total) * 100)} %`).join(' · ')}.
          </p>
          <p className="mt-1 text-white">
            Si escribir cada repetido te toma 2 minutos, hoy se te van unos <strong>{Math.round((porTipo('rep') * 2) / dias)} minutos al día</strong> en contestar lo mismo. Eso es lo que atacan las respuestas listas de la próxima lección.
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
                    'Repetidos → respuestas listas. Con decisión y nuevos → una persona, y quedan en la hoja Atención.',
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
          Antes de ordenar la atención, hay que saber qué te escriben. Todos tus mensajes caben en tres tipos: <strong>repetidos</strong> (precio, horario, despacho), <strong>con decisión</strong> (un descuento, una fecha especial, un reclamo) y <strong>nuevos</strong> (lo que nunca te habían preguntado).
        </p>
        <p>
          Los repetidos se responden con un texto que ya está escrito, y lo puede mandar cualquiera de tu equipo. Los otros dos pasan por una persona y quedan anotados hasta cerrarse. La pregunta es cuántos de cada uno recibes tú: eso se mide, no se adivina.
        </p>
      </Explica>
      <DiagramaTresTiposRespuesta className="mt-6" />
      <Subtitulo>Práctica: clasifica 8 mensajes de Grano Norte</Subtitulo>
      <Clasificador clave={K.clasificar} categorias={TIPOS} items={ITEMS_TIPOS} />
      <Subtitulo>Cuenta los tuyos durante 2 días</Subtitulo>
      <Instruccion>Deja esta página abierta en el celular y suma cada mensaje que respondes. Al segundo día tienes tu número.</Instruccion>
      <Contador />
    </>
  );
}

// ─── Lección 2 · Respuestas listas para lo repetido ───────────────────────

type EstadoReglas = { elegidas: string[]; textos: Record<string, string>; propias: ReglaFreno[] };
const REGLAS_VACIAS: EstadoReglas = { elegidas: [], textos: {}, propias: [] };

function useReglasM0() {
  const [estado] = usePersistido(CLAVES_STORAGE.reglas, REGLAS_VACIAS);
  const todas = [...REGLAS_FRENO, ...(estado.propias ?? [])];
  return todas.filter((r) => estado.elegidas?.includes(r.id)).map((r) => (estado.textos?.[r.id] ?? r.texto).trim() || r.texto);
}

const CAMPOS_RESPUESTAS: Campo[] = [
  { id: 'tono', etiqueta: 'Cómo hablas', placeholder: 'Ej.: cercano, tuteo, frases cortas, sin emojis de más' },
  {
    id: 'respuestas',
    etiqueta: 'Tus respuestas de siempre (una por línea: pregunta → respuesta)',
    filas: 6,
    placeholder: '¿Horario? → Lunes a viernes de 9 a 18.\n¿Despachan a Viña? → Sí, martes y jueves.',
  },
  { id: 'ausencia', etiqueta: 'Tu mensaje de ausencia (fuera de horario)', filas: 2, placeholder: 'Ej.: «Hola, ahora estamos cerrados. Mañana a las 9 te respondemos.»' },
];

const EJEMPLO_RESPUESTAS = {
  tono: 'Cercano, tuteo, frases cortas, una sola pregunta por mensaje.',
  respuestas:
    '¿Horario? → Lunes a viernes de 9 a 18; sábado de 10 a 14.\n¿Despachan a Viña? → Sí, martes y jueves. ¿Para qué día lo necesitas?\n¿Precio del kilo? → El grano está a $16.000 el kilo y el molido a $16.500. ¿Para cafetería u oficina?\n¿Grano o molido? → Los dos. Dime qué cafetera usas y te recomiendo la molienda.\n¿Cómo pago? → Transferencia o tarjeta al recibir. Las empresas pagan con factura a 30 días.',
  ausencia: 'Hola, ahora estamos cerrados. Mañana desde las 9:00 te respondemos. Si es un pedido, déjanos cantidad y día, y lo anotamos a primera hora.',
};

/** «¿Horario?» → «/horario». Toma la primera palabra con contenido de la pregunta. */
function atajoDe(pregunta: string, usados: Set<string>) {
  const vacias = new Set(['el', 'la', 'los', 'las', 'de', 'del', 'a', 'que', 'qué', 'cuanto', 'cuánto', 'cuanta', 'cuánta', 'como', 'cómo', 'tienen', 'hacen', 'me', 'se', 'un', 'una', 'y', 'o', 'es', 'hay']);
  const palabras = pregunta
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9ñ ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !vacias.has(w));
  let base = palabras[0] ?? 'respuesta';
  if (usados.has(base) && palabras[1]) base = `${base}-${palabras[1]}`;
  let atajo = base;
  let n = 2;
  while (usados.has(atajo)) atajo = `${base}${n++}`;
  usados.add(atajo);
  return `/${atajo}`;
}

function respuestasDe(texto?: string) {
  const usados = new Set<string>();
  return (texto ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [p, ...r] = l.split(/→|->/);
      const respuesta = r.join('→').trim();
      return { pregunta: p.trim(), respuesta, atajo: atajoDe(p, usados) };
    })
    .filter((x) => x.respuesta);
}

const PASOS_WA = [
  { id: 'w1', texto: 'Uso la app gratis WhatsApp Business con el número del negocio, no el personal.' },
  { id: 'w2', texto: 'Cargué mis respuestas como respuestas rápidas, cada una con su atajo («Herramientas para la empresa» → «Respuestas rápidas»).' },
  { id: 'w3', texto: 'Activé el mensaje de ausencia con mi horario.' },
  { id: 'w4', texto: 'Creé etiquetas para «Pedido», «Reclamo» y «Por cobrar».' },
  { id: 'w5', texto: 'Le mostré los atajos a quien más responde en mi equipo.' },
];

function LeccionRespuestas() {
  const [v] = useTextos(K.respuestas);
  const reglas = useReglasM0();
  const montado = useMontado();
  const lista = montado ? respuestasDe(v.respuestas) : [];
  return (
    <>
      <Explica>
        <p>
          Si escribes «lunes a viernes de 9 a 18» diez veces al día, no te falta tiempo: te falta tenerlo escrito. Las <strong>respuestas listas</strong> son tus respuestas de siempre, escritas una vez con tu tono: cortas, cercanas y con una sola pregunta al final.
        </p>
        <p>
          Se guardan como <strong>respuestas rápidas en la app gratis de WhatsApp Business</strong>: escribes «/horario» y aparece el texto completo. Así responde igual quien sea de tu equipo, en segundos y sin preguntarte. Descarga el texto y guárdalo junto a tu planilla, para que no viva solo en un celular.
        </p>
      </Explica>
      <DiagramaRespuestaRapida className="mt-6" />
      <Subtitulo>1 · Escribe tus respuestas de siempre</Subtitulo>
      <Instruccion>Parte por los repetidos que contaste en la lección 1. Con 6 a 10 respuestas cubres casi todo.</Instruccion>
      <Campos clave={K.respuestas} campos={CAMPOS_RESPUESTAS} ejemplo={EJEMPLO_RESPUESTAS} />
      {lista.length ? (
        <div className="mt-5" aria-live="polite">
          <p className="text-sm font-medium text-white">Tus atajos para WhatsApp Business</p>
          <ul className="mt-2 space-y-2">
            {lista.map((x) => (
              <li key={x.atajo} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <p className="font-mono text-sm text-[#5fb2dd]">{x.atajo}</p>
                <p className="mt-1 break-words text-sm text-slate-200">{x.respuesta}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Subtitulo>2 · Cárgalas en WhatsApp Business</Subtitulo>
      <Elegibles clave={K.pasosWa} opciones={PASOS_WA} />
      <FotoBanda foto={APOYO.celularPendientes} posicion="center 30%" />
      <Freno>
        Las respuestas listas son para lo repetido. Si una pregunta toca una de tus reglas de freno{montado && reglas.length ? ` (elegiste ${reglas.length} en el módulo 0)` : ''}, como un precio especial, una fecha o un reclamo, no lleva respuesta lista: la ve una persona (lección 4).
      </Freno>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <p className="text-sm font-medium text-white">Opcional · si algún día quieres que conteste solo</p>
        <p className="mt-1 text-sm text-slate-300">
          Este mismo texto sirve como instrucciones para un asistente de IA o un chatbot de WhatsApp (como el de Fidelidapp). No es parte del curso ni lo necesitas: primero las respuestas listas, y solo si un día el volumen no te da, lo automatizas. Si quieres verlo,{' '}
          <a href={LINKS.esqueleto} target="_blank" rel="noopener noreferrer" className="text-[#5fb2dd] underline-offset-2 hover:underline">
            el esqueleto gratis
          </a>{' '}
          parte de lo mismo.
        </p>
      </div>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis respuestas listas (.txt)"
          disabled={!montado || lista.length === 0}
          onClick={() =>
            descargarArchivo(
              'respuestas-listas.txt',
              armarTxt('Respuestas listas para WhatsApp Business', [
                `TONO: ${(v.tono ?? '').trim() || '(definir)'}`,
                '',
                'RESPUESTAS RÁPIDAS (atajo → texto)',
                ...lista.flatMap((x) => [`${x.atajo}  (${x.pregunta})`, x.respuesta, '']),
                'MENSAJE DE AUSENCIA',
                (v.ausencia ?? '').trim() || '(sin escribir)',
                '',
                'REGLA: lo que toca una regla de freno no lleva respuesta lista; lo ve una persona.',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 3 · La hoja Atención ─────────────────────────────────────────

const DESTINO = [
  { id: 'lista', etiqueta: 'Respuesta lista' },
  { id: 'hoja', etiqueta: 'Hoja Atención' },
];

const ITEMS_DESTINO = [
  { id: 'h1', texto: '«¿Despachan los sábados?»', correcta: 'lista', porque: 'Es repetido: se responde con el atajo y listo. No queda nada pendiente.' },
  { id: 'h2', texto: '«El molido llegó muy fino para nuestra cafetera.»', correcta: 'hoja', porque: 'Es un reclamo: queda abierto hasta que se resuelve y se cierra.' },
  { id: 'h3', texto: '«¿Nos pueden conseguir descafeinado para una sala?»', correcta: 'hoja', porque: 'Es un pedido especial: alguien tiene que averiguar y volver a escribir.' },
  { id: 'h4', texto: '«¿Cuánto cuesta el kilo en grano?»', correcta: 'lista', porque: 'Precio de lista: respuesta lista.' },
  { id: 'h5', texto: '«Quiero cambiar las bolsas de 250 g por una de 1 kg.»', correcta: 'hoja', porque: 'Un cambio o devolución queda anotado hasta que se hace.' },
];

const COLUMNAS_CASOS: Columna[] = [
  { id: 'fecha', etiqueta: 'Fecha', tipo: 'fecha' },
  { id: 'cierre', etiqueta: 'Fecha de cierre', tipo: 'fecha' },
  { id: 'cliente', etiqueta: 'Cliente', placeholder: 'Quién escribió' },
  { id: 'canal', etiqueta: 'Canal', placeholder: 'WhatsApp, correo, teléfono' },
  { id: 'tipo', etiqueta: 'Tipo', placeholder: 'Reclamo, pedido especial, cambio…' },
  { id: 'que', etiqueta: 'Qué pasó', placeholder: 'En una frase' },
  { id: 'responsable', etiqueta: 'Responsable', placeholder: 'Quién lo tiene' },
  { id: 'estado', etiqueta: 'Estado', placeholder: 'Abierto o Cerrado' },
];

function ejemploCasos(): Record<string, string>[] {
  return [
    { fecha: masDias(-3), cierre: '', cliente: 'Cowork Cerro Alegre', canal: 'WhatsApp', tipo: 'Reclamo', que: 'El molido llegó muy fino para su cafetera', responsable: 'Camila', estado: 'Abierto' },
    { fecha: masDias(-2), cierre: '', cliente: 'Oficinas Bahía SpA', canal: 'WhatsApp', tipo: 'Pedido especial', que: 'Quieren descafeinado para una sala', responsable: 'Camila', estado: 'Abierto' },
    { fecha: masDias(-6), cierre: masDias(-6), cliente: 'Restorán Mirador', canal: 'Correo', tipo: 'Consulta', que: '¿Despachan los sábados? (no estaba en las respuestas)', responsable: 'Sofía', estado: 'Cerrado' },
  ];
}

const cerrado = (f: Fila) => /cerr/i.test(f.estado ?? '') || !!f.cierre;
const conCaso = (f: Fila) => !!(f.cliente?.trim() || f.que?.trim());
const tipoDe = (s?: string) => TIPOS_CASO.find((t) => t.toLowerCase().startsWith((s ?? '').trim().toLowerCase().slice(0, 4))) ?? (s ?? '').trim();

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

function descargarCasos(filas: Fila[]) {
  const hoy = isoLocal(new Date());
  descargarArchivo(
    'hoja-atencion.csv',
    armarCsv(
      ['Fecha', 'Cliente', 'Canal', 'Tipo', 'Qué pasó', 'Responsable', 'Estado', 'Fecha de cierre', 'Días abierto'],
      filas.filter(conCaso).map((f) => [
        fechaLegible(f.fecha),
        f.cliente ?? '',
        f.canal ?? '',
        tipoDe(f.tipo),
        f.que ?? '',
        f.responsable ?? '',
        cerrado(f) ? 'Cerrado' : 'Abierto',
        fechaLegible(f.cierre),
        f.fecha ? diasEntre(f.fecha, f.cierre || hoy) : '',
      ]),
    ),
    'text/csv',
  );
}

function LeccionHojaAtencion() {
  const [r] = useTextos(K.reclamos);
  const [casos] = useFilas(K.casos);
  const montado = useMontado();
  const ejemplo = useMemo(() => ejemploCasos(), []);
  const hoy = montado ? isoLocal(new Date()) : '';
  const lista = montado ? casos.filter(conCaso) : [];
  const abiertos = lista.filter((f) => !cerrado(f));
  const viejos = abiertos.filter((f) => f.fecha && diasEntre(f.fecha, hoy) > 2);
  return (
    <>
      <Explica>
        <p>
          Lo que no se resuelve con una respuesta lista queda pendiente: un reclamo, un cambio, un pedido especial, una pregunta que hay que averiguar. Si queda solo en el chat, se pierde entre los cuarenta mensajes del día siguiente.
        </p>
        <p>
          Por eso cada caso se anota en una fila de la <strong>hoja Atención</strong>, con las mismas columnas de tu planilla: fecha, cliente, canal, tipo, qué pasó, responsable y estado. Queda <strong>abierto hasta que se cierra</strong>, y la columna «Días abierto» se calcula sola. Si un caso pasa los 2 días abierto, se revisa en la reunión del equipo.
        </p>
        <p>Los reclamos, además, pasan por cuatro pasos: acuse, solución, seguimiento y cierre. Con una plantilla para cada uno, nadie improvisa cuando el cliente está molesto.</p>
      </Explica>
      <Subtitulo>Práctica: ¿respuesta lista u hoja Atención?</Subtitulo>
      <Clasificador clave={K.vaAHoja} categorias={DESTINO} items={ITEMS_DESTINO} />
      <Subtitulo>Tus casos de esta semana</Subtitulo>
      <Instruccion>Anota los casos abiertos que tienes hoy (o parte con el ejemplo). Descárgalos y pégalos en la hoja Atención de tu planilla.</Instruccion>
      <TablaEditable clave={K.casos} columnas={COLUMNAS_CASOS} ejemplo={ejemplo} etiquetaFila="Caso" textoAgregar="Agregar caso" />
      {lista.length ? (
        <p className={`mt-3 rounded-xl border p-3 text-sm ${viejos.length ? 'border-rose-400/40 bg-rose-500/[0.08] text-rose-100' : 'border-white/10 bg-white/[0.02] text-slate-200'}`} aria-live="polite">
          {lista.length} {lista.length === 1 ? 'caso' : 'casos'} · {abiertos.length} {abiertos.length === 1 ? 'abierto' : 'abiertos'}
          {viejos.length ? ` · ${viejos.length} con más de 2 días: ${viejos.map((f) => f.cliente || f.que).join(' · ')}. Revísalos esta semana.` : '. Ninguno pasa los 2 días.'}
        </p>
      ) : null}
      <div className="mt-4">
        <BotonDescarga etiqueta="Descargar para la hoja Atención (.csv)" disabled={!montado || lista.length === 0} onClick={() => descargarCasos(casos)} />
      </div>
      <Subtitulo>Un reclamo, de principio a fin</Subtitulo>
      <DiagramaCasoReclamo className="mt-4" />
      <Pantallita titulo="Grano Norte · caso cerrado" className="mt-6">
        <p className="text-sm">
          <strong>Café Mirador</strong> · pidió grano y le llegó molido. Fila abierta a las 10:20 con el acuse, reposición al día siguiente a las 9:00, seguimiento el viernes y cierre con un llamado de Camila: 3 días abierto. Ajuste: el checklist de entrega ahora pide confirmar la molienda por escrito.
        </p>
      </Pantallita>
      <Subtitulo>Tus 4 plantillas de reclamo</Subtitulo>
      <Campos clave={K.reclamos} campos={CAMPOS_RECLAMOS} ejemplo={EJEMPLO_RECLAMOS} />
      <Freno>Las compensaciones (reposición, regalo, descuento) las decide siempre una persona. La plantilla ordena el mensaje; la decisión no se automatiza.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis plantillas de reclamo (.txt)"
          disabled={!montado || !CAMPOS_RECLAMOS.some((c) => r[c.id]?.trim())}
          onClick={() =>
            descargarArchivo(
              'plantillas-de-reclamo.txt',
              armarTxt('Reclamos · las 4 plantillas', [
                ...CAMPOS_RECLAMOS.flatMap((c) => [c.etiqueta.toUpperCase(), (r[c.id] ?? '').trim() || '(sin escribir)', '']),
                'REGLA: cada reclamo queda en la hoja Atención hasta cerrarlo. Si lleva más de 2 días abierto, se revisa en la reunión del equipo.',
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
  { id: 'd4', texto: 'Pregunta algo que no está en las respuestas listas.' },
  { id: 'd5', texto: 'Pide hablar contigo.' },
  { id: 'd6', texto: 'Habla de pagos, transferencias o datos bancarios.' },
  { id: 'd7', texto: 'Es un pedido grande o un cliente nuevo de empresa.' },
];

const TIEMPOS = ['30 minutos', '1 hora', '2 horas hábiles', '4 horas hábiles'];

const CAMPOS_DERIVACION: Campo[] = [
  { id: 'quien', etiqueta: 'A quién se avisa primero', placeholder: 'Ej.: Sofía' },
  { id: 'segundo', etiqueta: 'Si no responde a tiempo, a quién sube', placeholder: 'Ej.: Camila' },
  { id: 'canal', etiqueta: 'Por dónde se avisa', placeholder: 'Ej.: grupo de WhatsApp del equipo' },
  { id: 'mensaje', etiqueta: 'Qué se le dice al cliente mientras tanto', filas: 2, placeholder: 'Ej.: «Esto lo ve Sofía; te responde dentro de 2 horas hábiles.»' },
];

function LeccionDerivacion() {
  const [d, setD] = useTextos(K.derivacion);
  const [disp] = useTextos(K.disparadores);
  const reglas = useReglasM0();
  const montado = useMontado();
  const tiempo = (montado && d.tiempo) || '2 horas hábiles';
  return (
    <>
      <Explica>
        <p>
          Responder rápido no es responderlo todo. Hay mensajes que <strong>pasan sí o sí a una persona</strong>: los que tocan tus reglas de freno. Cuando llega uno, quien atiende hace tres cosas: le dice al cliente quién lo va a atender y cuándo, avisa a esa persona y anota el caso en la hoja Atención.
        </p>
        <p>
          Y defines un tiempo máximo de respuesta. Si pasa ese tiempo, el aviso sube a una segunda persona. Así ningún cliente queda esperando en silencio
          {montado && reglas.length ? `, y tus ${reglas.length} reglas de freno del módulo 0 se cumplen sin que tengas que estar mirando el celular` : ''}.
        </p>
      </Explica>
      <DiagramaDerivacionPersona className="mt-6" horas={tiempo} />
      <DiagramaConversacion
        className="mt-6"
        titulo="Grano Norte · un traspaso"
        aria="Conversación de ejemplo: el cliente reclama porque el café llegó molido y lo pidió en grano; Sofía, que atiende el WhatsApp, se disculpa, le avisa que lo atenderá Matías, de despacho, dentro de 2 horas hábiles, y anota el caso; Matías responde y ofrece reponerlo mañana."
        mensajes={[
          { de: 'cliente', texto: 'Pedí café en grano y me llegó molido.' },
          { de: 'agente', texto: 'Lo siento mucho. Ya lo anoté: esto lo ve Matías, de despacho, y te escribe dentro de 2 horas hábiles.' },
          { de: 'persona', texto: 'Hola, soy Matías. Te lo reponemos mañana a primera hora, sin costo. ¿Te acomoda antes de las 11?' },
        ]}
      />
      <Subtitulo>1 · Tus disparadores</Subtitulo>
      <Instruccion>¿Qué hace que una conversación pase sí o sí a una persona?</Instruccion>
      <Elegibles clave={K.disparadores} opciones={DISPARADORES} />
      <Subtitulo>2 · Tiempo máximo de respuesta</Subtitulo>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Tiempo máximo de respuesta de una persona">
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
                `TIEMPO MÁXIMO DE RESPUESTA: ${tiempo}`,
                `SE AVISA A: ${(d.quien ?? '').trim() || '(definir)'} · por ${(d.canal ?? '').trim() || '(definir)'}`,
                `SI NO RESPONDE A TIEMPO, SUBE A: ${(d.segundo ?? '').trim() || '(definir)'}`,
                `MENSAJE AL CLIENTE: ${(d.mensaje ?? '').trim() || '(definir)'}`,
                'Y SIEMPRE: el caso se anota en la hoja Atención.',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 5 · Postventa ────────────────────────────────────────────────

const CAMPOS_POSTVENTA: Campo[] = [
  { id: 'como', etiqueta: '1 · A los 2 o 3 días de la entrega', filas: 2 },
  { id: 'referido', etiqueta: '2 · Cuando te dan las gracias: el referido', filas: 3 },
  { id: 'recompra', etiqueta: '3 · Cuando le toca volver a comprar', filas: 2 },
];

const EJEMPLO_POSTVENTA = {
  como: 'Hola, [nombre]: ¿cómo les fue con el café de esta semana? ¿La molienda les quedó bien para su cafetera?',
  referido: '¡Qué bueno, [nombre]! Gracias por contarme. ¿Conoces a otra cafetería u oficina a la que le pueda servir? Si me pasas su contacto, le escribo de tu parte.',
  recompra: 'Hola, [nombre]: por lo que llevas, ya se te debe estar acabando el café. ¿Te preparo lo mismo de siempre para el [día]?',
};

const COLUMNAS_RECOMPRA: Columna[] = [
  { id: 'cliente', etiqueta: 'Cliente', placeholder: 'Nombre o empresa' },
  { id: 'ultima', etiqueta: 'Última compra', tipo: 'fecha' },
  { id: 'ciclo', etiqueta: 'Compra cada (días)', tipo: 'numero', placeholder: 'Ej.: 14' },
];

function ejemploRecompra(): Record<string, string>[] {
  return [
    { cliente: 'Cafetería Puerto Dulce', ultima: masDias(-12), ciclo: '14' },
    { cliente: 'Cowork Cerro Alegre', ultima: masDias(-10), ciclo: '30' },
    { cliente: 'Estudio Contable Ríos', ultima: masDias(-29), ciclo: '30' },
  ];
}

function LeccionPostventa() {
  const [p] = useTextos(K.postventa);
  const [filas] = useFilas(K.recompra);
  const montado = useMontado();
  const ejemplo = useMemo(() => ejemploRecompra(), []);
  const hoy = montado ? isoLocal(new Date()) : '';
  const lista = montado
    ? filas
        .filter((f) => f.cliente?.trim() && f.ultima && numero(f.ciclo) > 0)
        .map((f) => ({ cliente: f.cliente!.trim(), toca: masDias(numero(f.ciclo), new Date(`${f.ultima}T12:00:00`)) }))
        .sort((a, b) => a.toca.localeCompare(b.toca))
    : [];
  const estaSemana = lista.filter((x) => diasEntre(hoy, x.toca) <= 7);
  return (
    <>
      <Explica>
        <p>
          Quien ya te compró te conoce y confía en ti: muchas veces es más fácil que vuelva a comprar a que llegue alguien nuevo. Y casi nadie le escribe al cliente después de la entrega: ahí hay ventas que se pierden solo por no preguntar.
        </p>
        <p>
          La postventa son tres mensajes, uno a uno y con su nombre. <strong>A los 2 o 3 días</strong>, uno corto para saber cómo les fue. <strong>Si te dan las gracias</strong>, ese es un buen momento para pedir un referido. Y <strong>cuando se cumple su ciclo de compra</strong>, le escribes para que vuelva a comprar. Cada mensaje queda en la hoja Atención como «Postventa».
        </p>
        <p>
          Son tus clientes: ya te conocen y te dieron su número, así que por WhatsApp sí. Lo que no se hace es mandar la misma lista a todos de una vez: un envío masivo se nota y puede hacer que te reporten.
        </p>
      </Explica>
      <DiagramaPostventa className="mt-6" />
      <Subtitulo>Tus 3 mensajes de postventa</Subtitulo>
      <Campos clave={K.postventa} campos={CAMPOS_POSTVENTA} ejemplo={EJEMPLO_POSTVENTA} />
      <Subtitulo>¿A quién le toca volver a comprar?</Subtitulo>
      <Instruccion>
        Usa la columna «Última compra» de tu hoja Clientes. Anota cada cuántos días suele comprar cada uno y te queda la fecha en que le toca.
      </Instruccion>
      <TablaEditable clave={K.recompra} columnas={COLUMNAS_RECOMPRA} ejemplo={ejemplo} etiquetaFila="Cliente" textoAgregar="Agregar cliente" />
      {lista.length ? (
        <div className="mt-3 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="text-sm font-medium text-white">
            {estaSemana.length ? `Esta semana le toca a ${estaSemana.length}:` : 'Esta semana no le toca a nadie. Los próximos:'}
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            {(estaSemana.length ? estaSemana : lista.slice(0, 3)).map((x) => (
              <li key={x.cliente} className="break-words">
                {x.cliente} · {x.toca < hoy ? `le tocaba el ${fechaLegible(x.toca)}` : `le toca el ${fechaLegible(x.toca)}`}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Freno>Un descuento para que vuelva a comprar lo decide una persona. El mensaje recuerda; no regala.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mi postventa (.txt)"
          disabled={!montado || !CAMPOS_POSTVENTA.some((c) => p[c.id]?.trim())}
          onClick={() =>
            descargarArchivo(
              'postventa.txt',
              armarTxt('Postventa · que vuelvan a comprar', [
                ...CAMPOS_POSTVENTA.flatMap((c) => [c.etiqueta.toUpperCase(), (p[c.id] ?? '').trim() || '(sin escribir)', '']),
                'A QUIÉN LE TOCA',
                ...(lista.length ? lista.map((x) => `- ${x.cliente}: ${fechaLegible(x.toca)}`) : ['(pendiente)']),
                '',
                'REGLA: uno a uno y con su nombre, solo a clientes. Cada mensaje queda en la hoja Atención como «Postventa».',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Cierre ────────────────────────────────────────────────────────────────

function SemanaAtencion() {
  const [s, setS] = useTextos(K.semana);
  const montado = useMontado();
  const v = montado ? s : {};
  const anotados = numero(v.anotados);
  const cerrados = numero(v.cerrados);
  return (
    <div className="mt-6 rounded-2xl border border-white/10 p-4">
      <p className="text-sm font-medium text-white">Los números de tu semana</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { id: 'anotados', l: 'Casos anotados' },
          { id: 'cerrados', l: 'Casos cerrados' },
          { id: 'postventa', l: 'Mensajes de postventa' },
          { id: 'recompras', l: 'Volvieron a comprar' },
        ].map((c) => (
          <label key={c.id} className="block min-w-0 text-xs text-slate-400">
            {c.l}
            <input inputMode="numeric" value={v[c.id] ?? ''} onChange={(e) => setS((p) => ({ ...p, [c.id]: e.target.value }))} className={claseInput} />
          </label>
        ))}
      </div>
      {anotados > 0 ? (
        <p className="mt-3 text-sm text-slate-200" aria-live="polite">
          {Math.round((Math.min(cerrados, anotados) / anotados) * 100)} % de los casos cerrados en la semana.
        </p>
      ) : null}
    </div>
  );
}

function Cierre() {
  const [v] = useTextos(K.respuestas);
  const [d] = useTextos(K.derivacion);
  const [disp] = useTextos(K.disparadores);
  const [casos] = useFilas(K.casos);
  const [p] = useTextos(K.postventa);
  const [s] = useTextos(K.semana);
  const montado = useMontado();
  const negocio = useNegocio();
  const respuestas = montado ? respuestasDe(v.respuestas) : [];
  const disparadores = montado ? DISPARADORES.filter((x) => disp[x.id]).map((x) => x.texto) : [];
  const lista = montado ? casos.filter(conCaso) : [];
  const abiertos = lista.filter((f) => !cerrado(f)).length;
  const postventaLista = montado ? CAMPOS_POSTVENTA.filter((c) => p[c.id]?.trim()).length : 0;
  const anotados = numero(s.anotados);
  return (
    <CierreModulo
      numero={4}
      area="atencion"
      hoja="Atención"
      pruebaReal={[
        { id: 'p1', texto: 'Mi equipo y yo usamos las respuestas listas toda la semana.' },
        { id: 'p2', texto: 'Anoté cada reclamo o caso especial en la hoja Atención.' },
        { id: 'p3', texto: 'Ningún caso pasó 2 días abierto sin que alguien lo revisara.' },
        { id: 'p4', texto: 'Le escribí a 3 clientes después de la entrega.' },
        { id: 'p5', texto: 'Le escribí a quien le tocaba volver a comprar.' },
      ]}
      extra={<SemanaAtencion />}
      resumen={
        <>
          <FilaResumen etiqueta="Respuestas listas" valor={respuestas.length ? `${respuestas.length} atajos: ${respuestas.map((x) => x.atajo).join(' ')}` : ''} leccion={2} />
          <FilaResumen etiqueta="Hoja Atención" valor={lista.length ? `${lista.length} ${lista.length === 1 ? 'caso' : 'casos'} · ${abiertos} ${abiertos === 1 ? 'abierto' : 'abiertos'}` : ''} leccion={3} />
          <FilaResumen etiqueta="Pasa a una persona cuando" valor={disparadores.join('\n')} leccion={4} />
          <FilaResumen etiqueta="Tiempo máximo y a quién" valor={montado && d.quien?.trim() ? `${d.tiempo || '2 horas hábiles'} · ${d.quien.trim()}${d.segundo?.trim() ? ` → ${d.segundo.trim()}` : ''}` : ''} leccion={4} />
          <FilaResumen etiqueta="Postventa" valor={postventaLista ? `${postventaLista} de 3 mensajes escritos` : ''} leccion={5} />
        </>
      }
      descargar={() =>
        descargarArchivo(
          'modulo-4-atencion-y-postventa.txt',
          armarTxt(
            'Módulo 4 · Atención y postventa',
            [
              'RESPUESTAS LISTAS (WhatsApp Business)',
              ...(respuestas.length ? respuestas.map((x) => `${x.atajo} → ${x.respuesta}`) : ['(pendiente)']),
              '',
              'HOJA ATENCIÓN',
              ...(lista.length ? lista.map((f) => `- ${fechaLegible(f.fecha)} · ${f.cliente ?? ''} · ${tipoDe(f.tipo)} · ${f.que ?? ''} · ${f.responsable ?? ''} · ${cerrado(f) ? 'Cerrado' : 'Abierto'}`) : ['(pendiente)']),
              '',
              'REGLAS DE DERIVACIÓN',
              ...disparadores.map((x) => `- ${x}`),
              `Tiempo máximo: ${d.tiempo || '2 horas hábiles'} · Se avisa a: ${(d.quien ?? '').trim() || '(definir)'} · Sube a: ${(d.segundo ?? '').trim() || '(definir)'}`,
              '',
              'POSTVENTA',
              ...CAMPOS_POSTVENTA.map((c) => `${c.etiqueta}: ${(p[c.id] ?? '').trim() || '(pendiente)'}`),
              '',
              'SEMANA DE PRUEBA',
              anotados
                ? `${anotados} casos anotados · ${numero(s.cerrados)} cerrados · ${numero(s.postventa)} mensajes de postventa · ${numero(s.recompras)} volvieron a comprar`
                : '(pendiente)',
              '',
              'RUTINA: cada mañana, revisar los casos abiertos de la hoja Atención; los viernes, los que llevan más de 2 días.',
              'NÚMERO SEMANAL: casos cerrados vs. anotados, y clientes que volvieron a comprar.',
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
    bajada: 'Repetidos, con decisión y nuevos. Practica con 8 mensajes y cuenta los tuyos durante 2 días.',
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
    id: 'respuestas',
    bajada: 'Escribes una vez tus respuestas de siempre y las dejas como respuestas rápidas de WhatsApp Business, para que responda igual cualquiera del equipo.',
    portada: FOTOS.instructor,
    posicion: 'center 35%',
    contenido: <LeccionRespuestas />,
    checklist: [
      { id: 'l2a', texto: 'Escribí mis respuestas de siempre con mi tono.' },
      { id: 'l2b', texto: 'Las cargué como respuestas rápidas en WhatsApp Business.' },
      { id: 'l2c', texto: 'Mi equipo conoce los atajos.' },
    ],
  },
  {
    id: 'hoja-atencion',
    bajada: 'Reclamos, cambios y pedidos especiales en una fila, con responsable y fecha, abiertos hasta cerrarlos. Y las 4 plantillas de reclamo.',
    portada: APOYO.escritorioManos,
    contenido: <LeccionHojaAtencion />,
    checklist: [
      { id: 'l3a', texto: 'Anoté mis casos abiertos con las columnas de la hoja.' },
      { id: 'l3b', texto: 'Los pegué en la hoja Atención de mi planilla.' },
      { id: 'l3c', texto: 'Escribí mis 4 plantillas de reclamo.' },
    ],
  },
  {
    id: 'derivacion',
    bajada: 'Qué casos van siempre a ti o a tu equipo, cómo se avisa y el tiempo máximo de respuesta.',
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
    id: 'postventa',
    bajada: 'El mensaje después de la entrega, cuándo pedir un referido y a quién le toca volver a comprar.',
    portada: APOYO.escenaCalendario,
    posicion: 'center 35%',
    contenido: <LeccionPostventa />,
    checklist: [
      { id: 'l5a', texto: 'Escribí mis 3 mensajes de postventa.' },
      { id: 'l5b', texto: 'Anoté cada cuántos días compran mis clientes principales.' },
      { id: 'l5c', texto: 'Le escribí a uno que le tocaba volver a comprar.' },
    ],
  },
];

export default function Modulo4Content() {
  return (
    <ModuloCurso
      numero={4}
      intro="Responder a tiempo y que vuelvan a comprar. Agregas la hoja Atención a tu planilla: al terminar tienes tus mensajes contados, respuestas listas en WhatsApp Business, cada caso anotado hasta cerrarlo, tus reglas de derivación y tus mensajes de postventa."
      portada={APOYO.escenaNoche}
      portadaPosicion="center 35%"
      lecciones={LECCIONES}
      cierre={<Cierre />}
    />
  );
}
