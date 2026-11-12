'use client';

/*
 * /curso/modulo-6 — Módulo 6 «El tablero que lo junta todo» + proyecto final «Tu ERP en Google Sheets con su tablero»
 * (curso v1.1, «El sistema de tu negocio: tu primer CRM y ERP en Google Sheets», 8-nov-2026).
 * 5 lecciones: tus números del lunes, cómo se conectan las hojas, compartirlo con tu equipo, las rutinas y cuándo
 * una planilla ya no basta. Página final: prueba real, semáforo de las 5 piezas antes/después, la hoja del proyecto
 * (imprimible), la planilla, certificado y siguiente paso. Lee lo guardado en los módulos 0–5 (mismas claves).
 * Los números del tablero de Grano Norte salen del ejemplo de lib/productos/curso/plantilla.ts.
 */

import { ArrowUpRight, Printer } from 'lucide-react';
import { AREAS, CLAVES_STORAGE, HOJAS, IA_OPCIONAL, PROYECTO_FINAL, REGLAS_FRENO, type AreaId, type ReglaFreno, type Respuesta, type Semaforo } from '@/lib/productos/curso/curso';
import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { LINKS } from '@/lib/productos/links';
import { useMontado, usePersistido } from '@/lib/productos/curso/persistencia';
import { GUIONES } from '@/lib/productos/curso/guiones';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaPlanillaOSoftware, DiagramaQuienEdita, DiagramaRutinasSistema, DiagramaTableroLee } from '@/components/productos/diagramas/sistema-m56';
import { Kicker, PuntoSemaforo } from './piezas';
import { DescargaPlantilla } from './Plantilla';
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
  semaforoGuardado,
  useMarcas,
  useNegocio,
  useTextos,
  type Campo,
  type LeccionDef,
} from './leccion';

const K = {
  lunes: claveModulo(6, 'lunes'),
  donde: claveModulo(6, 'donde'),
  quien: claveModulo(6, 'quien'),
  rutinas: claveModulo(6, 'rutinas'),
  senales: claveModulo(6, 'senales'),
  hojas: claveModulo(6, 'hojas'),
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

/** Hojas que se llenan con datos (sin Inicio ni Tablero, que no se llenan a mano). */
const HOJAS_DATOS = HOJAS.filter((h) => h.nombre !== 'Inicio' && h.nombre !== 'Tablero');
const idHoja = (nombre: string) =>
  nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

// ─── Lección 1 · Tus números del lunes ────────────────────────────────────

// Mismas etiquetas y secciones que la hoja Tablero de la planilla; valores del ejemplo de Grano Norte.
const TABLERO_EJEMPLO: { titulo: string; filas: { l: string; v: string; alerta?: string }[] }[] = [
  {
    titulo: 'Clientes y ventas (CRM) · módulo 1',
    filas: [
      { l: 'Clientes activos', v: '3' },
      { l: 'Posibles clientes en conversación o propuesta', v: '2' },
      { l: 'Propuestas abiertas ($)', v: '$174.000' },
      { l: 'Próximos pasos para hoy o atrasados', v: '2', alerta: 'Revisar hoy' },
    ],
  },
  {
    titulo: 'Marketing y origen · módulo 2',
    filas: [
      { l: 'Canal que más clientes te trae', v: 'Referido' },
      { l: 'Contactos con su origen anotado', v: '100 %' },
    ],
  },
  {
    titulo: 'Pedidos y operación · módulo 3',
    filas: [
      { l: 'Ventas del mes', v: '$311.000' },
      { l: 'Pedidos por entregar', v: '3' },
      { l: 'Pedidos atrasados', v: '1', alerta: 'Revisar hoy' },
    ],
  },
  {
    titulo: 'Atención y postventa · módulo 4',
    filas: [
      { l: 'Casos abiertos', v: '2' },
      { l: 'Reclamos abiertos', v: '1', alerta: 'Lo ve una persona' },
    ],
  },
  {
    titulo: 'Cobranza y caja · módulo 5',
    filas: [
      { l: 'Por cobrar', v: '$165.000' },
      { l: 'Vencido sin pagar', v: '$96.000', alerta: 'Cobrar esta semana' },
      { l: 'Por cobrar en las próximas 4 semanas', v: '$69.000' },
      { l: 'Caja hoy', v: '$437.000' },
      { l: 'Margen promedio de tus productos', v: '27 %' },
    ],
  },
];

function TableroEjemplo() {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#24314d] bg-[#131c31]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <p className="font-serif text-lg text-white">Tablero de Grano Norte</p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5fb2dd]">Lunes</p>
      </div>
      <div className="space-y-4 p-4">
        {TABLERO_EJEMPLO.map((s) => (
          <div key={s.titulo}>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5fb2dd]">{s.titulo}</p>
            <ul className="mt-1.5 space-y-1">
              {s.filas.map((f) => (
                <li key={f.l} className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-white/5 py-1 text-sm">
                  <span className="min-w-0 text-slate-300">{f.l}</span>
                  <span className="flex items-baseline gap-2">
                    {f.alerta ? <span className="text-[11px] italic text-rose-300">{f.alerta}</span> : null}
                    <span className="font-mono font-semibold text-white">{f.v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const CAMPOS_LUNES: Campo[] = [
  { id: 'numero', etiqueta: 'El número que más me preocupa esta semana', placeholder: 'Ej.: $96.000 vencidos sin pagar' },
  { id: 'decision', etiqueta: 'Qué decidimos hacer', filas: 2, placeholder: 'Ej.: llamar hoy a Puerto Dulce por la F-1021' },
  { id: 'quien', etiqueta: 'Quién lo hace y para cuándo', placeholder: 'Ej.: Camila, hoy antes de las 13:00' },
];

const EJEMPLO_LUNES = {
  numero: '$96.000 vencidos sin pagar y 1 pedido atrasado.',
  decision: 'Llamar hoy a Puerto Dulce por la F-1021. Sofía entrega el pedido del Cowork mañana a primera hora y le avisa.',
  quien: 'Camila (cobranza) y Sofía (pedido), hoy.',
};

function LeccionLunes() {
  return (
    <>
      <Explica>
        <p>
          Hasta aquí armaste las hojas una por una. La <strong>hoja Tablero</strong> las junta: es la única que nadie llena, porque se calcula sola desde las demás. Cada lunes la miras 10 minutos con tu equipo y sabes cómo va el negocio sin preguntarle a nadie.
        </p>
        <p>
          Son pocos números, en cinco grupos: <strong>clientes y ventas</strong> (cuántos clientes activos, cuánta plata hay en propuestas, a quién le toca un seguimiento hoy), <strong>origen</strong> (qué canal te trae más clientes), <strong>pedidos</strong> (ventas del mes, por entregar y atrasados), <strong>atención</strong> (casos y reclamos abiertos) y <strong>cobranza y caja</strong> (por cobrar, vencido, lo que entra en 4 semanas, la caja de hoy y el margen). Al lado de algunos aparece un aviso: «Revisar hoy», «Cobrar esta semana».
        </p>
      </Explica>
      <TableroEjemplo />
      <Pantallita titulo="Grano Norte · el primer lunes" className="mt-6">
        <p className="text-sm">En 10 minutos salieron dos cosas: $96.000 vencidos y un pedido atrasado. Antes, Camila se habría enterado por un reclamo o a fin de mes.</p>
      </Pantallita>
      <Subtitulo>Tu primer lunes con el tablero</Subtitulo>
      <Instruccion>Abre la hoja Tablero de tu planilla (o el ejemplo de Grano Norte, si todavía no tienes datos) y responde.</Instruccion>
      <Campos clave={K.lunes} campos={CAMPOS_LUNES} ejemplo={EJEMPLO_LUNES} />
      <DescargaPlantilla titulo="Abre tu tablero" texto="La hoja Tablero ya viene armada en la planilla del sistema, con las fórmulas listas. Si todavía no tienes datos, mira el ejemplo de Grano Norte: los números de arriba salen de ahí." />
      <Freno>El tablero muestra; no decide. Lo que se hace con un número (cobrar, dar un plazo, cambiar un precio) lo decide una persona.</Freno>
    </>
  );
}

// ─── Lección 2 · Cómo se conectan las hojas ───────────────────────────────

const CONEXIONES = [
  { n: 'Clientes activos, propuestas abiertas, próximos pasos', lee: 'Clientes: las columnas Estado, Monto de la propuesta y Fecha del próximo paso.' },
  { n: 'Canal que más clientes te trae', lee: 'Origen, que a su vez cuenta la columna Origen de Clientes.' },
  { n: 'Ventas del mes, por entregar, atrasados', lee: 'Pedidos: Fecha, Total, Estado y Fecha de entrega. El precio sale de Productos.' },
  { n: 'Casos y reclamos abiertos', lee: 'Atención: Tipo y Estado.' },
  { n: 'Por cobrar, vencido, próximas 4 semanas', lee: 'Cobranza: Monto, Vencimiento y Pagado.' },
  { n: 'Caja hoy', lee: 'Caja: lo que entra menos lo que sale.' },
  { n: 'Margen promedio', lee: 'Productos: Costo y Precio.' },
];

const DONDE_HOJAS = [
  { id: 'clientes', etiqueta: 'Clientes' },
  { id: 'pedidos', etiqueta: 'Pedidos' },
  { id: 'atencion', etiqueta: 'Atención' },
  { id: 'cobranza', etiqueta: 'Cobranza' },
  { id: 'caja', etiqueta: 'Caja' },
  { id: 'productos', etiqueta: 'Productos' },
];

const DONDE_ITEMS = [
  { id: 'd1', texto: 'Una oficina te pide cotización por WhatsApp.', correcta: 'clientes', porque: 'Es un posible cliente: va a Clientes con estado y próximo paso.' },
  { id: 'd2', texto: 'Puerto Dulce te pide 5 kilos para el jueves.', correcta: 'pedidos', porque: 'Es un pedido con fecha de entrega y responsable.' },
  { id: 'd3', texto: 'El Cowork reclama que el molido llegó muy fino.', correcta: 'atencion', porque: 'Es un caso: queda abierto en Atención hasta cerrarlo.' },
  { id: 'd4', texto: 'Emitiste la factura del pedido 4.', correcta: 'cobranza', porque: 'Cada factura va a Cobranza con su vencimiento.' },
  { id: 'd5', texto: 'Pagaste el arriendo.', correcta: 'caja', porque: 'Es plata que sale: una fila en Caja.' },
  { id: 'd6', texto: 'El café verde subió y cambias el precio del kilo.', correcta: 'productos', porque: 'El precio vive en un solo lugar: Productos. Pedidos lo toma de ahí.' },
  { id: 'd7', texto: 'Estudio Ríos te pagó la F-1022.', correcta: 'cobranza', porque: 'Se marca «Sí» en Pagado. Y la plata que entra se anota también en Caja.' },
  { id: 'd8', texto: 'La propuesta a Oficinas Bahía se aceptó.', correcta: 'clientes', porque: 'Cambia su estado a «Cliente». El pedido nuevo va a Pedidos.' },
];

function LeccionConexiones() {
  return (
    <>
      <Explica>
        <p>
          El tablero no tiene nada escrito a mano: <strong>cada número lee una hoja</strong>. Por eso la regla más importante de tu sistema es simple: <strong>cada dato se anota una vez, en un solo lugar</strong>. El precio vive en Productos; el estado de un cliente, en Clientes; si una factura se pagó, en Cobranza. Si copias un número a mano en otra parte, tarde o temprano las dos versiones dejan de calzar.
        </p>
        <p>
          La otra cara: si una hoja queda sin actualizar, el tablero miente. Si nadie marca los pagos en Cobranza, el tablero dice que tienes plata vencida que ya entró. Por eso, cuando un número no te calza, el problema casi nunca está en la fórmula: está en una hoja que nadie abrió esa semana.
        </p>
      </Explica>
      <DiagramaTableroLee className="mt-6" />
      <Subtitulo>Qué lee cada número</Subtitulo>
      <ul className="mt-4 space-y-2">
        {CONEXIONES.map((c) => (
          <li key={c.n} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-sm font-semibold text-white">{c.n}</p>
            <p className="mt-0.5 text-sm text-slate-300">{c.lee}</p>
          </li>
        ))}
      </ul>
      <Subtitulo>Práctica: ¿dónde se anota?</Subtitulo>
      <Instruccion>Ocho cosas que pasan en una semana de Grano Norte. Elige la hoja donde va cada una.</Instruccion>
      <Clasificador clave={K.donde} categorias={DONDE_HOJAS} items={DONDE_ITEMS} />
      <Pantallita titulo="Grano Norte · el número que no calzaba" className="mt-6">
        <p className="text-sm">Un lunes, el tablero decía $160.000 vencidos. Camila sabía que el Cowork ya había pagado. Nadie había marcado el pago en Cobranza. Desde ese día, quien recibe un pago lo marca ahí y lo anota en Caja el mismo día.</p>
      </Pantallita>
      <Freno>No escribas encima de las fórmulas del tablero para «arreglar» un número. Arregla la hoja que lo alimenta.</Freno>
    </>
  );
}

// ─── Lección 3 · Compartirlo con tu equipo ────────────────────────────────

const PASOS_COMPARTIR = [
  'Abre tu planilla en Google Sheets y toca «Compartir» (arriba a la derecha).',
  'Agrega a cada persona con su correo. Quien actualiza una hoja va como «Editor»; quien solo mira, como «Lector».',
  'Protege lo que cambia una sola persona: menú «Datos» → «Proteger hojas y rangos» → elige la hoja (Productos y Tablero) → «Restringir quién puede editar» → solo tú.',
  'Si algo se borra por error, «Archivo» → «Historial de versiones» te deja volver a una versión anterior.',
];

function LeccionCompartir() {
  const [q] = useTextos(K.quien);
  const montado = useMontado();
  const negocio = useNegocio();
  const reglas = useReglasM0();
  const v = montado ? q : TEXTOS_VACIOS;
  const campos: Campo[] = HOJAS_DATOS.map((h) => ({ id: idHoja(h.nombre), etiqueta: `${h.nombre} · ${h.guarda}`, placeholder: `Ej.: ${h.quien}` }));
  return (
    <>
      <Explica>
        <p>
          Una planilla que solo abres tú sigue dependiendo de ti. El paso que cambia todo es <strong>compartirla</strong>: que quien vende actualice Clientes, que quien recibe pedidos los anote en Pedidos, que quien cobra marque los pagos. Así cada uno ve en qué va todo sin preguntarte.
        </p>
        <p>
          Compartir no es soltar el control. Google Sheets te deja dar tres tipos de acceso: <strong>editor</strong> (actualiza), <strong>lector</strong> (solo mira) y <strong>hojas protegidas</strong>, que cambia solo una persona. Las hojas protegidas son tus <strong>reglas de freno</strong> del módulo 0, escritas en la planilla: si los precios los decides tú, la hoja Productos la editas solo tú.
        </p>
      </Explica>
      <DiagramaQuienEdita className="mt-6" />
      <Subtitulo>Paso a paso en Google Sheets</Subtitulo>
      <ol className="mt-4 space-y-2">
        {PASOS_COMPARTIR.map((p, i) => (
          <li key={p} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-slate-200">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-[11px] text-slate-300">{i + 1}</span>
            <span className="min-w-0">{p}</span>
          </li>
        ))}
      </ol>
      <Subtitulo>Quién actualiza cada hoja</Subtitulo>
      <Instruccion>Un nombre por hoja (puede ser el tuyo). Si nadie es dueño de una hoja, esa hoja se desactualiza.</Instruccion>
      <Campos clave={K.quien} campos={campos} />
      {montado && reglas.length ? (
        <div className="mt-6 rounded-2xl border border-white/10 p-4">
          <p className="text-sm font-medium text-white">Tus reglas de freno del módulo 0</p>
          <p className="mt-1 text-sm text-slate-400">Revisa cuáles se traducen en una hoja protegida.</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            {reglas.map((r) => (
              <li key={r}>· {r}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <Pantallita titulo="Grano Norte · quién edita qué" className="mt-6">
        <p className="text-sm">Sofía actualiza Pedidos y Atención; Matías, Pedidos; Camila, Clientes, Cobranza y Caja. Productos y Tablero están protegidas: solo Camila. El contador entra como lector a fin de mes.</p>
      </Pantallita>
      <Freno>Comparte con correos de personas, nunca con «cualquier persona con el enlace»: tu planilla tiene datos de tus clientes. Y cuando alguien deja el equipo, quítale el acceso ese mismo día.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar quién actualiza qué (.txt)"
          onClick={() =>
            descargarArchivo(
              'quien-actualiza-que.txt',
              armarTxt(
                'Quién actualiza cada hoja',
                [
                  ...HOJAS_DATOS.map((h) => `- ${h.nombre}: ${(v[idHoja(h.nombre)] ?? '').trim() || h.quien}`),
                  '- Tablero: nadie lo llena; se mira los lunes.',
                  '',
                  'PROTEGIDAS (las edita solo una persona): Productos y Tablero.',
                  ...(reglas.length ? ['', 'REGLAS DE FRENO', ...reglas.map((r, i) => `${i + 1}. ${r}`)] : []),
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

// ─── Lección 4 · Las rutinas de tu sistema ────────────────────────────────

const RUTINAS = [
  { id: 'diaria', t: 'Cada día · 20 min', que: 'Clientes (a quién le toca hoy) y Pedidos (qué llegó, qué falta, qué vence).', hora: '8:30', lugar: 'mi escritorio, antes de abrir el WhatsApp' },
  { id: 'lunes', t: 'Lunes · 10 min', que: 'El tablero con el equipo: qué se arregla esta semana.', hora: '9:00', lugar: 'la mesa de la bodega, con el equipo' },
  { id: 'viernes', t: 'Viernes · 15 min', que: 'Que cada hoja esté al día: casos abiertos, pagos en Cobranza, movimientos en Caja y la cuenta de 4 semanas.', hora: '16:00', lugar: 'mi escritorio' },
  { id: 'mes', t: 'Fin de mes', que: 'Precios y costos en Productos; el mes comparado en el tablero.', hora: 'el último viernes, 16:30', lugar: 'mi escritorio' },
];

function frase(v: Record<string, string>, r: (typeof RUTINAS)[number]) {
  const hora = (v[`${r.id}_hora`] ?? '').trim() || '[hora]';
  const lugar = (v[`${r.id}_lugar`] ?? '').trim() || '[lugar]';
  return `Si son las ${hora} y estoy en ${lugar}, entonces abro la planilla y reviso ${r.que.charAt(0).toLowerCase()}${r.que.slice(1)}`;
}

const FRENOS_VIERNES = [
  { id: 'f1', texto: 'Ningún precio, descuento o pago salió sin una persona.' },
  { id: 'f2', texto: 'Ninguna fecha de entrega se comprometió sin confirmar.' },
  { id: 'f3', texto: 'Todos los reclamos tuvieron respuesta de una persona a tiempo.' },
  { id: 'f4', texto: 'Cada hoja tiene los datos de esta semana.' },
];

function LeccionRutinas() {
  const [r, setR] = useTextos(K.rutinas);
  const montado = useMontado();
  const negocio = useNegocio();
  const v = montado ? r : TEXTOS_VACIOS;
  return (
    <>
      <Explica>
        <p>
          Una planilla vale lo que valen sus rutinas: si nadie la abre, deja de decir la verdad en dos semanas. Tu sistema se mantiene con poco: <strong>20 minutos al día, 10 los lunes y 15 los viernes</strong>, más una revisión a fin de mes.
        </p>
        <p>
          Lo que más ayuda está bien estudiado: <strong>decidir de antemano a qué hora y dónde</strong> lo vas a hacer, y hacerlo siempre en el mismo momento y lugar. Escrito así: «Si son las [hora] y estoy en [lugar], entonces abro la planilla». Suena simple, y por eso funciona: no dependes de acordarte ni de tener ganas.
        </p>
      </Explica>
      <DiagramaRutinasSistema className="mt-6" />
      <Subtitulo>Tus rutinas: cuándo y dónde</Subtitulo>
      <div className="mt-4 space-y-3">
        {RUTINAS.map((x) => (
          <div key={x.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-sm font-semibold text-white">{x.t}</p>
            <p className="mt-0.5 text-sm text-slate-400">{x.que}</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-[140px_1fr]">
              <label className="block min-w-0 text-xs text-slate-400">
                A qué hora
                <input
                  value={v[`${x.id}_hora`] ?? ''}
                  onChange={(e) => setR((p) => ({ ...p, [`${x.id}_hora`]: e.target.value }))}
                  placeholder={`Ej.: ${x.hora}`}
                  className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-white/10 bg-[#0f172a] px-3 text-[15px] text-slate-100 placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none"
                />
              </label>
              <label className="block min-w-0 text-xs text-slate-400">
                Dónde
                <input
                  value={v[`${x.id}_lugar`] ?? ''}
                  onChange={(e) => setR((p) => ({ ...p, [`${x.id}_lugar`]: e.target.value }))}
                  placeholder={`Ej.: ${x.lugar}`}
                  className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-white/10 bg-[#0f172a] px-3 text-[15px] text-slate-100 placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none"
                />
              </label>
            </div>
            {montado && (v[`${x.id}_hora`] || v[`${x.id}_lugar`]) ? <p className="mt-2 text-sm italic text-[#5fb2dd]">{frase(v, x)}</p> : null}
          </div>
        ))}
      </div>
      <Subtitulo>La revisión del viernes: tus frenos</Subtitulo>
      <Instruccion>Al final de los 15 minutos del viernes, marca lo que se cumplió. Si algo no, escribe el ajuste: un paso más en un proceso o una regla de freno nueva.</Instruccion>
      <Elegibles clave={claveModulo(6, 'frenos_viernes')} opciones={FRENOS_VIERNES} />
      <FotoBanda foto={APOYO.escritorioNoche} posicion="center 50%" />
      <Pantallita titulo="Grano Norte · las rutinas" className="mt-6">
        <p className="text-sm">«Si son las 8:30 y estoy en mi escritorio, abro la planilla antes que el WhatsApp.» Camila lo pegó en el monitor. Los lunes a las 9:00, el tablero se mira de pie, con café, en la bodega.</p>
      </Pantallita>
      <Freno>Si un día no puedes, retoma al siguiente: saltarte un día no arruina la rutina. Lo que la arruina es esperar al lunes para «empezar de nuevo».</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis rutinas (.txt)"
          onClick={() =>
            descargarArchivo(
              'rutinas-de-mi-sistema.txt',
              armarTxt('Las rutinas de tu sistema', [...RUTINAS.flatMap((x) => [x.t.toUpperCase(), frase(v, x), '']), 'REVISIÓN DEL VIERNES · FRENOS', ...FRENOS_VIERNES.map((f) => `[ ] ${f.texto}`)], negocio),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 5 · Cuándo una planilla ya no basta ──────────────────────────

const SENALES = [
  { id: 's1', texto: 'Más de 5 personas editan la planilla, y a veces al mismo tiempo se pisan.' },
  { id: 's2', texto: 'Tienes cientos de pedidos al mes y la hoja Pedidos se pone lenta.' },
  { id: 's3', texto: 'Necesitas que los pedidos generen la factura electrónica o descuenten inventario solos.' },
  { id: 's4', texto: 'Se rompen fórmulas seguido porque alguien escribe encima.' },
  { id: 's5', texto: 'Tus clientes necesitan entrar a ver sus pedidos o su estado de cuenta.' },
  { id: 's6', texto: 'Llevas al menos 3 meses usando la planilla con tus rutinas, y sabes qué te falta.' },
];

const PROMPT_REVISAR = [
  'Te pego abajo mi hoja Clientes (es una planilla de un negocio chico). Revísala y dime, en una lista corta:',
  '1. Qué filas no tienen próximo paso o no tienen fecha.',
  '2. Qué clientes en «Conversación» o «Propuesta» tienen la fecha del próximo paso vencida.',
  '3. Qué filas no tienen anotado el Origen.',
  'No inventes datos: si algo no está en la hoja, dilo. No cambies nada; solo dime qué revisar.',
  '',
  '[pega aquí las columnas Nombre, Empresa, Origen, Estado, Próximo paso y Fecha; sin teléfonos, correos ni RUT]',
].join('\n');

function LeccionCuandoNoBasta() {
  const [s] = useMarcas(K.senales);
  const montado = useMontado();
  const n = montado ? SENALES.filter((x) => s[x.id]).length : 0;
  return (
    <>
      <Explica>
        <p>
          Esta planilla es tu primer CRM y tu primer ERP. Para una pyme de 3 a 15 personas suele bastar por mucho tiempo, y tiene una ventaja que ningún software te da: la entiendes completa, porque la armaste tú.
        </p>
        <p>
          Pero hay un punto en que se queda chica. Las señales son concretas: muchas personas editando a la vez, cientos de pedidos al mes, la necesidad de conectar la facturación electrónica o el inventario. Cuando llegues ahí, tu planilla no se pierde: <strong>es la mejor preparación para elegir un software</strong>. Ya sabes qué datos necesitas, quién los actualiza y qué números miras. La mayoría de los CRM y ERP te dejan importar tus hojas tal como están.
        </p>
      </Explica>
      <DiagramaPlanillaOSoftware className="mt-6" />
      <Subtitulo>¿Cuántas señales tienes hoy?</Subtitulo>
      <Elegibles clave={K.senales} opciones={SENALES} />
      {montado ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="text-white">
            {n <= 1
              ? 'La planilla te sobra. Dedica el tiempo a las rutinas, no a buscar software.'
              : n <= 3
                ? 'Empieza a mirar opciones, sin apuro. Anota qué te falta y prueba 2 o 3 con tus datos antes de pagar.'
                : 'Es momento de evaluar un software de CRM o ERP. Tu planilla es la lista de requisitos: lo que no sabe hacer, lo tiene que hacer el software.'}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {n} de {SENALES.length} señales.
          </p>
        </div>
      ) : null}
      <Pantallita titulo="Grano Norte · por ahora, planilla" className="mt-6">
        <p className="text-sm">Camila marcó una señal: quiere que los pedidos generen la factura sola. Por ahora sigue con la planilla y anota qué le falta; lo vuelve a mirar en tres meses, con números.</p>
      </Pantallita>
      <Subtitulo>La IA como segunda mirada</Subtitulo>
      <p className="mt-3 text-slate-300">{IA_OPCIONAL} Un uso que sirve: pegarle una hoja y pedirle que te diga qué está incompleto.</p>
      <BloqueCopiar titulo="Texto para copiar · revisar tu hoja Clientes" texto={PROMPT_REVISAR} nota="Funciona en ChatGPT, Claude o Gemini. Revisa lo que te responde contra tu planilla: tú decides." />
      <Freno>No le pegues a una IA datos que no compartirías: teléfonos, correos, RUT ni datos bancarios de tus clientes. Y la decisión de comprar un software, con su costo mensual, la toma una persona con números, no con una demo.</Freno>
    </>
  );
}

// ─── Proyecto final · Tu ERP en Google Sheets con su tablero ──────────────

function EstadoSemaforo({ s }: { s: Semaforo | null }) {
  return s ? (
    <span className="inline-flex items-center gap-1.5 text-slate-300">
      <PuntoSemaforo semaforo={s} /> {ETIQUETA_SEMAFORO[s]}
    </span>
  ) : (
    <span className="text-slate-500">—</span>
  );
}

const ESTILOS_IMPRESION = `
@media print {
  @page { margin: 14mm; }
  html, body { background: #fff !important; }
  .mod-no-print { display: none !important; }
  .m6-final { padding: 0 !important; max-width: none !important; }
  .m6-hoja { border: none !important; padding: 0 !important; margin: 0 !important; }
  .m6-hoja, .m6-hoja *:not(.semaforo-punto) { color: #0f172a !important; background-color: transparent !important; border-color: #cbd5e1 !important; box-shadow: none !important; }
  .m6-salto { break-before: page; }
  .semaforo-punto { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

function ProyectoFinal() {
  const montado = useMontado();
  const negocio = useNegocio();
  const reglas = useReglasM0();
  const [antes] = usePersistido(CLAVES_STORAGE.diagnostico, RESPUESTAS_VACIAS);
  // Semáforo «después» guardado al cierre de cada módulo (la clave usa el número de módulo de cada pieza).
  const d1 = usePersistido(claveModulo(1, 'despues'), RESPUESTAS_VACIAS)[0];
  const d2 = usePersistido(claveModulo(2, 'despues'), RESPUESTAS_VACIAS)[0];
  const d3 = usePersistido(claveModulo(3, 'despues'), RESPUESTAS_VACIAS)[0];
  const d4 = usePersistido(claveModulo(4, 'despues'), RESPUESTAS_VACIAS)[0];
  const d5 = usePersistido(claveModulo(5, 'despues'), RESPUESTAS_VACIAS)[0];
  const porModulo: Record<number, Record<string, Respuesta>> = { 1: d1, 2: d2, 3: d3, 4: d4, 5: d5 };
  const despues = Object.fromEntries(AREAS.map((a) => [a.id, porModulo[a.modulo] ?? RESPUESTAS_VACIAS])) as Record<AreaId, Record<string, Respuesta>>;
  const [prueba, setPrueba] = useMarcas(K.prueba);
  const [hojas] = useMarcas(K.hojas);
  const [quien] = useTextos(K.quien);
  const [rutinas] = useTextos(K.rutinas);
  const guion = GUIONES['m6-final'];
  const q = montado ? quien : TEXTOS_VACIOS;
  const r = montado ? rutinas : TEXTOS_VACIOS;
  const listas = montado ? HOJAS_DATOS.filter((h) => hojas[idHoja(h.nombre)]).length : 0;

  const lineasTxt = [
    '1 · SEMÁFORO (antes → después)',
    ...AREAS.map((a) => {
      const s0 = semaforoGuardado(a.id, antes);
      const s1 = semaforoGuardado(a.id, despues[a.id]);
      return `- ${a.nombre}: ${s0 ? ETIQUETA_SEMAFORO[s0] : '—'} → ${s1 ? ETIQUETA_SEMAFORO[s1] : '—'}`;
    }),
    '',
    '2 · LAS HOJAS DE TU SISTEMA (con datos reales · quién la actualiza)',
    ...HOJAS_DATOS.map((h) => `[${hojas[idHoja(h.nombre)] ? 'x' : ' '}] ${h.nombre} · ${(q[idHoja(h.nombre)] ?? '').trim() || h.quien}`),
    '- Tablero: se calcula solo; se mira los lunes.',
    '',
    '3 · TUS RUTINAS',
    ...RUTINAS.map((x) => `- ${x.t}: ${frase(r, x)}`),
    '',
    '4 · REGLAS DE FRENO (hojas protegidas: Productos y Tablero)',
    ...(reglas.length ? reglas.map((x, i) => `${i + 1}. ${x}`) : ['(pendientes: módulo 0, lección 4)']),
  ];

  return (
    <section className="m6-final mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <style>{ESTILOS_IMPRESION}</style>
      <div className="mod-no-print">
        <Kicker>Proyecto final</Kicker>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">{PROYECTO_FINAL.titulo}</h2>
        <p className="mt-3 text-slate-300">
          {PROYECTO_FINAL.texto} Aquí juntas lo que armaste en los 7 módulos: compruebas que cada hoja tenga datos reales, comparas tu semáforo con el del módulo 0 y dejas escrito quién actualiza qué y cuándo.
        </p>
        <div className="mt-6">
          <VideoPendiente titulo={guion?.titulo ?? 'Tu negocio en 6 semanas: antes y después'} guion={guion} portada={FOTOS.retrato} posicion="center 20%" clave="m6-final" />
        </div>

        <Subtitulo>1 · La prueba real: una semana con tu sistema</Subtitulo>
        <p className="mt-2 text-slate-300">Una semana con tus rutinas y el tablero revisado el lunes con tu equipo.</p>
        <Checklist
          titulo="Durante la semana"
          items={[
            { id: 'p1', texto: 'Hice la rutina diaria de 20 minutos al menos 4 días.' },
            { id: 'p2', texto: 'El lunes miramos el tablero con el equipo y decidimos una cosa.' },
            { id: 'p3', texto: 'El viernes revisé que cada hoja estuviera al día y mis frenos.' },
          ]}
          checks={montado ? prueba : CHECKS_VACIOS}
          onToggle={(id) => setPrueba((p) => ({ ...p, [id]: !p[id] }))}
        />

        <Subtitulo>2 · Tu semáforo de las 5 piezas, hoy</Subtitulo>
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

        <Subtitulo>3 · Las hojas de tu sistema</Subtitulo>
        <p className="mt-2 text-slate-300">Marca las hojas que ya tienen datos reales de tu negocio. El tablero solo dice la verdad si todas están al día.</p>
        <Elegibles clave={K.hojas} opciones={HOJAS_DATOS.map((h) => ({ id: idHoja(h.nombre), texto: `${h.nombre} · ${h.guarda}` }))} />
        <p className="mt-3 text-sm text-slate-400">
          {listas} de {HOJAS_DATOS.length} hojas con datos reales.
        </p>
      </div>

      <div className="m6-hoja mt-8 rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Tu ERP en Google Sheets · proyecto final</p>
            <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">{(montado && negocio.trim()) || 'Mi negocio'}</p>
          </div>
          <p className="font-mono text-xs text-slate-400">{montado ? new Date().toLocaleDateString('es-CL') : ''}</p>
        </div>

        <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">1 · Semáforo, antes y después</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {AREAS.map((a) => {
            const s0 = montado ? semaforoGuardado(a.id, antes) : null;
            const s1 = montado ? semaforoGuardado(a.id, despues[a.id]) : null;
            return (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-white/5 pt-2 first:border-t-0 first:pt-0">
                <span className="text-slate-100">
                  {a.nombre} <span className="font-mono text-[11px] text-slate-500">· hoja {a.hoja}</span>
                </span>
                <span className="flex items-center gap-2 text-xs">
                  <EstadoSemaforo s={s0} /> <span aria-hidden className="text-slate-500">→</span> <EstadoSemaforo s={s1} />
                </span>
              </li>
            );
          })}
        </ul>

        <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">2 · Las hojas y quién las actualiza</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
          {HOJAS_DATOS.map((h) => (
            <li key={h.nombre} className="flex gap-2">
              <span aria-hidden className={montado && hojas[idHoja(h.nombre)] ? 'text-[#5fb2dd]' : 'text-slate-500'}>
                {montado && hojas[idHoja(h.nombre)] ? '✓' : '○'}
              </span>
              <span className="min-w-0">
                <strong className="font-semibold text-white">{h.nombre}</strong> · {(q[idHoja(h.nombre)] ?? '').trim() || h.quien}
              </span>
            </li>
          ))}
          <li className="flex gap-2">
            <span aria-hidden className="text-[#5fb2dd]">✓</span>
            <span className="min-w-0">
              <strong className="font-semibold text-white">Tablero</strong> · se calcula solo; se mira los lunes con el equipo.
            </span>
          </li>
        </ul>

        <h3 className="m6-salto mt-6 text-xs uppercase tracking-wider text-slate-400">3 · Tus rutinas</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
          {RUTINAS.map((x) => (
            <li key={x.id}>
              <strong className="font-semibold text-white">{x.t}.</strong> {frase(r, x)}
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">4 · Reglas de freno · hojas protegidas: Productos y Tablero</h3>
        {montado && reglas.length ? (
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-200">
            {reglas.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        ) : (
          <p className="mt-2 text-sm text-slate-400">Pendientes: módulo 0, lección 4.</p>
        )}

        <p className="mt-8 border-t border-white/10 pt-3 font-mono text-[10px] text-slate-500">Curso «El sistema de tu negocio» · Proyecto final · Villelab</p>
      </div>

      <div className="mod-no-print">
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => window.print()} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white hover:bg-[#ff5c9f]">
            <Printer className="h-4 w-4" aria-hidden /> Imprimir o guardar en PDF
          </button>
          <BotonDescarga etiqueta="Descargar proyecto final (.txt)" onClick={() => descargarArchivo('proyecto-final-mi-sistema.txt', armarTxt(PROYECTO_FINAL.titulo, lineasTxt, negocio))} />
        </div>

        <DescargaPlantilla className="mt-8" titulo="Tu planilla del sistema" />

        <div className="mt-8 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Certificado de finalización</p>
          <p className="mt-2 text-slate-200">Guarda esta hoja en PDF y tenla junto a tu planilla con datos reales: eso es tu proyecto final, y al entregarlo recibes tu certificado de finalización del curso.</p>
        </div>

        <div className="mt-6 grid gap-5 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-[200px_1fr]">
          <figure className="relative aspect-[16/9] sm:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOTOS.pizarra.src} alt={FOTOS.pizarra.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 30%' }} />
          </figure>
          <div className="p-5 sm:pl-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Siguiente paso opcional</p>
            <p className="mt-2 font-serif text-xl text-white">Una sesión de 90 minutos para armar contigo lo que quedó pendiente</p>
            <p className="mt-2 text-sm text-slate-400">Traes tu planilla y la dejamos funcionando en la hoja que más te cuesta.</p>
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
    id: 'lunes',
    bajada: 'Ventas del mes, propuestas abiertas, pedidos atrasados, casos abiertos, por cobrar y caja: la hoja Tablero los calcula sola desde tus hojas.',
    portada: APOYO.tableroLaptop,
    contenido: <LeccionLunes />,
    checklist: [
      { id: 'l1a', texto: 'Abrí la hoja Tablero (la mía o la del ejemplo).' },
      { id: 'l1b', texto: 'Entiendo qué dice cada número.' },
      { id: 'l1c', texto: 'Anoté el número que más me preocupa y qué hago con él.' },
    ],
  },
  {
    id: 'conexiones',
    bajada: 'Qué lee cada número del tablero, por qué cada dato se anota en un solo lugar y qué pasa si una hoja queda sin actualizar.',
    portada: FOTOS.pizarra,
    posicion: 'center 30%',
    contenido: <LeccionConexiones />,
    checklist: [
      { id: 'l2a', texto: 'Sé qué hoja alimenta cada número.' },
      { id: 'l2b', texto: 'Hice la práctica de dónde se anota cada cosa.' },
      { id: 'l2c', texto: 'Revisé que no tengo un mismo dato anotado en dos lugares.' },
    ],
  },
  {
    id: 'compartir',
    bajada: 'Google Sheets con permisos: quién edita cada hoja, quién solo mira y qué hojas quedan protegidas.',
    portada: APOYO.oficina,
    contenido: <LeccionCompartir />,
    checklist: [
      { id: 'l3a', texto: 'Compartí la planilla con mi equipo, con correos.' },
      { id: 'l3b', texto: 'Protegí Productos y Tablero.' },
      { id: 'l3c', texto: 'Cada hoja tiene un responsable.' },
    ],
  },
  {
    id: 'rutinas',
    bajada: '20 minutos al día, 10 los lunes y 15 los viernes: a qué hora, dónde y quién actualiza cada hoja.',
    portada: APOYO.mesaCafe,
    contenido: <LeccionRutinas />,
    checklist: [
      { id: 'l4a', texto: 'Escribí cuándo y dónde hago cada rutina.' },
      { id: 'l4b', texto: 'Las agendé en mi calendario.' },
      { id: 'l4c', texto: 'Hice mi primera revisión del viernes.' },
    ],
  },
  {
    id: 'cuando-no-basta',
    bajada: 'Las señales concretas para pasar a un software de CRM o ERP, y por qué tu planilla te deja listo para hacerlo.',
    portada: FOTOS.tutorial,
    posicion: 'center 30%',
    contenido: <LeccionCuandoNoBasta />,
    checklist: [
      { id: 'l5a', texto: 'Revisé cuántas señales tengo hoy.' },
      { id: 'l5b', texto: 'Anoté qué le falta a mi planilla, si algo.' },
      { id: 'l5c', texto: 'Decidí cuándo lo vuelvo a mirar.' },
    ],
  },
];

export default function Modulo6Content() {
  return (
    <ModuloCurso
      numero={6}
      intro="El tablero que lo junta todo. Al terminar tienes tu ERP en Google Sheets: tus hojas conectadas en un tablero que miras los lunes, compartido con tu equipo con permisos, tus rutinas escritas y claro cuándo te convendría pasar a un software."
      portada={APOYO.oficina}
      lecciones={LECCIONES}
      cierre={<ProyectoFinal />}
      etiquetaCierre="Final"
      textoIrCierre="Ir al proyecto final: tu ERP en Google Sheets"
    />
  );
}
