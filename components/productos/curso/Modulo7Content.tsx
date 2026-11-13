'use client';

/*
 * /curso/modulo-7 — Módulo 7 «Tu primer agente, trabajando con tu planilla» (lote 3, 13-nov-2026).
 * Fuente única del contenido: ~/.claude/marca-alvaro/curso/modulo-7/modulo-7.md (bajadas, textos, ejercicios, checklists,
 * prompts y cierre). Lo que se afirma del agente sale de prueba.md: probado en un proyecto de Claude (cuenta pagada) con
 * Sonnet 5.5 y Haiku 5.5; ChatGPT y cuentas gratis, sin probar. Avisos obligatorios de integracion.md §3: configuración
 * regional Chile + zona horaria Santiago (7.2), pegar en el computador y triángulos rojos (7.3), el mismo N° en todas las
 * filas de un pedido (7.3) y la frase de arranque del camino de respaldo (7.2).
 * No van a la página (integracion.md §7.3): «La palabra agente…», «Qué plan exige cada camino» (trae un precio sin fuente
 * oficial), «Formato», «Duración del módulo 7» ni «Cambios que pide la integración».
 * 5 lecciones con el mismo armazón que los módulos 1–6 (ModuloCurso); cierre propio (no hay pieza del diagnóstico para el
 * agente): prueba real de una semana, entregable, semáforo del agente y siguiente paso opcional sin precio.
 */

import { ArrowUpRight, Info } from 'lucide-react';
import type { ReactNode } from 'react';
import { PROMESA_AGENTE, type Semaforo } from '@/lib/productos/curso/curso';
import { TRAMPAS_75 } from '@/lib/productos/curso/prompts';
import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { LINKS } from '@/lib/productos/links';
import { useMontado, usePersistido } from '@/lib/productos/curso/persistencia';
import { Pantallita } from '@/components/productos/Pantallita';
import { Kicker, PuntoSemaforo } from './piezas';
import { DescargaPlantilla } from './Plantilla';
import { BloquePrompt, TarjetaDatosNegocio } from './DatosNegocio';
import { HUECOS_POR_MODULO } from '@/lib/productos/curso/datos-negocio';
import {
  BloqueCopiar,
  BotonDescarga,
  CHECKS_VACIOS,
  Campos,
  Checklist,
  ETIQUETA_SEMAFORO,
  Elegibles,
  Explica,
  Freno,
  Instruccion,
  ListaCheck,
  ModuloCurso,
  PieModulos,
  Subtitulo,
  TEXTOS_VACIOS,
  armarTxt,
  claveModulo,
  descargarArchivo,
  useMarcas,
  useNegocio,
  useTextos,
  type Campo,
  type LeccionDef,
} from './leccion';

/** Huecos del módulo 7 que se autollenan con «Los datos de tu negocio» (13-nov-2026). */
const HUECOS = HUECOS_POR_MODULO.m7;

const K = {
  minutos: claveModulo(7, 'minutos'),
  trampas: claveModulo(7, 'trampas'),
  base: claveModulo(7, 'linea_base'),
  prueba: claveModulo(7, 'prueba'),
  semaforo: claveModulo(7, 'semaforo'),
};

/** Aviso que sale de la prueba real: no es un freno (no lo decide una persona), es algo que hay que hacer para que funcione. */
function Aviso({ titulo, children, className = 'mt-6' }: { titulo: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex gap-3 rounded-2xl border border-amber-300/40 bg-amber-300/[0.07] p-4 ${className}`}>
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" aria-hidden />
      <div className="min-w-0 text-sm text-slate-200">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-200">{titulo}</p>
        <div className="mt-1 space-y-1.5">{children}</div>
      </div>
    </div>
  );
}

function Pasos({ items, className = 'mt-4' }: { items: ReactNode[]; className?: string }) {
  return (
    <ol className={`space-y-2 ${className}`}>
      {items.map((p, i) => (
        <li key={i} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-slate-200">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-[11px] text-slate-300">{i + 1}</span>
          <span className="min-w-0">{p}</span>
        </li>
      ))}
    </ol>
  );
}

// ─── Lección 1 · Crea tu asistente con sus instrucciones ──────────────────

function LeccionInstrucciones() {
  return (
    <>
      <TarjetaDatosNegocio />
      <Aviso titulo="Lo que probamos">
        <p>
          En el video digo «Claude o ChatGPT». Este módulo lo probamos en un <strong className="text-white">proyecto de Claude</strong>, con cuenta pagada, y funcionó en las dos tareas. En ChatGPT y en cuentas gratis todavía no lo probamos.
        </p>
      </Aviso>
      <Explica>
        <p>Un asistente sin instrucciones es como un empleado nuevo sin inducción: responde bonito, pero inventa. Las instrucciones son su inducción, y se escriben una vez.</p>
        <p>
          Tienen <strong>5 partes</strong>, las mismas del esqueleto: quién es y para quién trabaja, su memoria, los datos de tu negocio (despacho, horario, quién entrega, plazo de pago), sus tareas y sus reglas de freno.
        </p>
        <p>
          La diferencia con el esqueleto: el esqueleto atiende a tus clientes; este asistente trabaja <strong>para ti</strong>. Te prepara borradores y tú decides qué sale.
        </p>
      </Explica>
      <Subtitulo>Dónde vive: en un proyecto</Subtitulo>
      <Pasos
        items={[
          <>
            En Claude: <strong className="text-white">Proyectos</strong> (Projects) › <strong className="text-white">Nuevo proyecto</strong> (New project) › <strong className="text-white">Instrucciones</strong> (Instructions › Edit).
          </>,
          'Copia la plantilla de abajo (prompt 7.1): sale con los datos de tu negocio que anotaste arriba. Si algo sigue marcado entre [corchetes], cámbialo antes de pegar; tus reglas de freno van en la regla 7.',
          'No borres las reglas 1 a 6: son las que evitan que prometa algo por ti. Guarda las instrucciones.',
        ]}
      />
      <p className="mt-3 text-sm text-slate-400">
        En ChatGPT no lo hemos probado. Según su centro de ayuda, también tiene proyectos con instrucciones (Nuevo proyecto en la barra lateral › menú ••• › Configuración del proyecto), pero esa ruta no la verificamos en su pantalla. Según las páginas oficiales de los dos, los proyectos están también en la cuenta gratis, con límites de uso: si en tu cuenta algo no aparece, usa el camino de respaldo de la lección 2.
      </p>
      <p className="mt-3 text-sm text-slate-400">¿No sabes qué poner en los [corchetes]? Usa primero el prompt 7.1b en un chat normal: te hace las preguntas de una en una.</p>
      <Freno>Nunca pongas en las instrucciones claves, datos bancarios ni RUT de clientes.</Freno>
      <Subtitulo>Ejercicio</Subtitulo>
      <Instruccion>Crea tu proyecto con el nombre de tu negocio y pega tus instrucciones.</Instruccion>
    </>
  );
}

// ─── Lección 2 · Dale tu planilla: la memoria de tu agente ────────────────

const FRASE_ARRANQUE = 'Desde ahora eres el asistente que describen estas instrucciones y yo soy [tu nombre]. Responde solo «Listo» y espera mi primera tarea.';

function LeccionMemoria() {
  return (
    <>
      <Explica>
        <p>
          Sin memoria, el asistente adivina precios y nombres. Con tu planilla, escribe «Café en grano 1 kg» igual que en tu hoja Productos, y la fila que te devuelve calza con tus fórmulas.
        </p>
      </Explica>
      <Aviso titulo="Obligatorio · configuración regional Chile">
        <p>
          Antes de descargar, y cada vez que abras tu planilla en un Google Sheets nuevo, revisa: <strong className="text-white">Archivo › Configuración › Configuración regional › Chile</strong> y <strong className="text-white">Zona horaria › Santiago</strong>.
        </p>
        <p>
          No es opcional: en nuestra prueba, Sheets abrió la planilla en «España» y hora del Pacífico, y con «Estados Unidos» la fecha 12-11 entró como 11 de diciembre sin avisar.
        </p>
        <p>Si usas Excel: ahí todavía no lo probamos. Revisa que tu computador use fechas día-mes-año (formato de Chile); si no, 12-11 puede entrar como 11 de diciembre.</p>
      </Aviso>
      <Subtitulo>Cómo se la das</Subtitulo>
      <Pasos
        items={[
          'Revisa la configuración regional (arriba).',
          <>
            En Google Sheets: <strong className="text-white">Archivo › Descargar › Microsoft Excel (.xlsx)</strong>. Un solo archivo trae todas tus hojas.
          </>,
          <>
            En tu proyecto de Claude: <strong className="text-white">Contexto</strong> (Context) › <strong className="text-white">Agregar</strong> (Add) › subir desde tu computador. (En ChatGPT, según su ayuda, «Agregar archivos»; sin verificar en su pantalla.)
          </>,
          'Hazle la pregunta de prueba (prompt 7.2, abajo).',
        ]}
      />
      <Explica>
        <p>
          <strong>Es una foto:</strong> el asistente ve la planilla del día en que la subiste. Para lo que cambia todos los días (pedidos, cobranza) se la pegas en el chat; para lo que cambia poco (productos, clientes) basta subirla de nuevo una vez por semana, el lunes.
        </p>
      </Explica>
      <Freno>
        Sube una copia sin datos de contacto. En Sheets, Archivo › Hacer una copia; en la copia, borra en Clientes las columnas «WhatsApp o teléfono» y «Correo» (y cualquier RUT o dato bancario), y descarga esa copia como .xlsx. Tu agente necesita el nombre y la empresa, no el teléfono.
      </Freno>
      <details className="group mt-6 rounded-2xl border border-white/10 bg-white/[0.02]">
        <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm text-slate-200 hover:text-white">
          <span>Camino de respaldo: si tu plan no te deja subir archivos</span>
          <span aria-hidden className="font-mono text-xs text-slate-500 group-open:hidden">ver</span>
        </summary>
        <div className="space-y-3 border-t border-white/10 px-4 py-4 text-sm text-slate-300">
          <p>
            Si tu plan no te deja subir archivos o se te acabaron los mensajes con adjuntos: copia tus hojas Productos y Clientes (solo nombre, empresa y estado, sin teléfonos ni correos) y pégalas al final de tus instrucciones, bajo el título MI PLANILLA.
          </p>
          <p>Abre un chat nuevo, escribe primero esta frase y después pega todo el texto. Sin esa frase, el asistente puede tratar lo pegado como un documento para revisar.</p>
          <BloquePrompt titulo="Frase de arranque" texto={FRASE_ARRANQUE} huecos={HUECOS} className="mt-2" nota="Escríbela o pégala sola, como primer mensaje; recién después pega tus instrucciones con MI PLANILLA." />
          <p className="text-slate-400">Este camino no ve tus hojas Pedidos ni Cobranza, así que no te avisa de pedidos abiertos ni facturas vencidas.</p>
        </div>
      </details>
      <DescargaPlantilla
        titulo="¿Todavía no tienes tu planilla?"
        texto="Descarga la tuya o el ejemplo de Grano Norte para probar tu agente con datos de muestra. Si ya tienes tu planilla, usa la tuya."
      />
      <Subtitulo>Ejercicio</Subtitulo>
      <Instruccion>Sube tu planilla y hazle la pregunta de prueba. Si te responde con tus productos y tus clientes reales, tu agente ya tiene memoria.</Instruccion>
    </>
  );
}

// ─── Lección 3 · Tarea uno: del WhatsApp a la fila de Pedidos ─────────────

const MENSAJES_EJEMPLO = [
  'Hola Camila! Te escribe Paula de Puerto Dulce. Necesito 6 kilos de grano para este jueves porfa, y si puedes agrégame 2 bolsitas de 250 para vender en el mesón. Me lo mandan como siempre? Gracias!!',
  'Camila, soy Jorge de Oficinas Bahía. Aceptamos la propuesta de los 3 planes oficina, pero nos haces un 10% si pagamos al contado? Los necesitamos para el lunes.',
];

function LeccionTareaUno() {
  return (
    <>
      <Explica>
        <p>Es la lección 3.2 hecha trabajo: cada pedido en una fila, pero sin escribirla tú.</p>
      </Explica>
      <Subtitulo>Paso a paso</Subtitulo>
      <Pasos
        items={[
          'Abre WhatsApp en el computador (WhatsApp Web o la app de escritorio), selecciona el mensaje y cópialo.',
          'En tu proyecto, también en el computador, escribe «Tarea 1.» y pega el mensaje.',
          'Lee la respuesta: tipo de mensaje, los 2 bloques, la respuesta al cliente y lo que falta.',
        ]}
      />
      <Explica>
        <p>
          <strong>Por qué 2 bloques:</strong> tu hoja Pedidos calcula sola el precio, el total y si está atrasado (columnas F, G y K). Si pegaras la fila entera, borrarías esas fórmulas. Por eso el bloque 1 va desde la columna B (Fecha) y el bloque 2 desde la columna H (Fecha de entrega).
        </p>
        <p>Vas a ver que dice que revisa tu planilla o que usó una herramienta: es normal, así lee tu archivo.</p>
      </Explica>
      <Aviso titulo="Cómo pegar sin romper nada">
        <p>
          <strong className="text-white">En el computador, no en el celular.</strong> Copia el bloque con su botón de copiar, haz clic en la celda B de la primera fila vacía y pega. Haz lo mismo con el bloque 2 en la columna H de esa fila.
        </p>
        <p>
          <strong className="text-white">El N° lo escribes tú:</strong> el siguiente de tu lista, el mismo en todas las filas de ese pedido. El Tablero cuenta cada pedido una vez por su N°: un pedido con 2 productos y despacho son 3 filas, pero suma 1 en «Pedidos por entregar». (Si bajaste tu planilla antes del 13 de noviembre, tu Tablero todavía cuenta filas.)
        </p>
        <p>
          Si pegaste en la columna equivocada, lo vas a notar: aparecen <strong className="text-white">triángulos rojos</strong> («Elige un valor de la lista»). Deshaz con Ctrl+Z (Cmd+Z en Mac) y vuelve a pegar.
        </p>
      </Aviso>
      <Subtitulo>Lo que revisas antes de pegar y de enviar, siempre</Subtitulo>
      <ListaCheck
        items={[
          '¿El producto y la cantidad son los que pidió?',
          '¿La fecha de entrega es la que pidió y tú puedes cumplirla? A veces la deja vacía y a veces pone la que pidió el cliente con un aviso: tú decides cuál queda.',
          '¿La respuesta promete algo que no decidiste?',
        ]}
      />
      <Pantallita titulo="Lo que hizo bien en nuestra prueba con Claude" className="mt-6">
        <p className="text-sm">Si no es un pedido, no arma fila; si piden descuento, no lo acepta; si piden un día sin despacho, te avisa; y si el mismo cliente tiene un pedido abierto o una factura vencida, te lo dice.</p>
      </Pantallita>
      <Freno>Pega los mensajes sin números de teléfono de terceros. La respuesta al cliente la envías tú, desde tu WhatsApp.</Freno>
      <Subtitulo>Ejercicio</Subtitulo>
      <Instruccion>Pasa 2 mensajes reales de esta semana (o los 2 de ejemplo, si usas la planilla de Grano Norte) y pega sus filas en tu hoja Pedidos.</Instruccion>
      {MENSAJES_EJEMPLO.map((m, i) => (
        <BloqueCopiar key={i} titulo={`Mensaje de ejemplo ${i + 1} · Grano Norte`} texto={m} className="mt-3" />
      ))}
    </>
  );
}

// ─── Lección 4 · Tarea dos: el lunes de cobranza ──────────────────────────

const CAMPOS_MINUTOS: Campo[] = [{ id: 'cobranza', etiqueta: 'Minutos de mi primer lunes de cobranza con mi agente', placeholder: 'Ej.: 18', ayuda: 'De copiar la hoja a enviar el último mensaje.' }];

function LeccionCobranza() {
  return (
    <>
      <Explica>
        <p>Es el módulo 5 hecho rutina: los mismos 3 recordatorios, pero tu agente decide cuál le toca a cada factura con la regla que tú le diste.</p>
      </Explica>
      <Subtitulo>Paso a paso</Subtitulo>
      <Pasos
        items={[
          'En tu hoja Cobranza, selecciona desde el encabezado hasta la última factura (columnas A a J) y copia.',
          'En tu proyecto, escribe «Tarea 2.» y pega.',
          'Te devuelve la lista ordenada, los mensajes, a quién llamas tú, los totales y qué anotar en «Próximo recordatorio».',
        ]}
      />
      <Explica>
        <p>
          <strong>La regla que usa:</strong> si vence en 3 días, recordatorio amable; si vence hoy, el del día; de 1 a 14 días de atraso, uno firme; con 15 días o más, o si la nota dice que no contesta o que no cumplió, no va mensaje: llamas tú.
        </p>
      </Explica>
      <Subtitulo>Revisa antes de enviar</Subtitulo>
      <ListaCheck
        items={[
          '¿La factura sigue sin pagar? Si te pagaron el fin de semana, anótalo antes de pegar la hoja.',
          '¿El monto y la fecha están bien?',
          '¿El tono es el tuyo?',
        ]}
      />
      <Explica>
        <p>
          <strong>Después:</strong> envía los mensajes desde tu WhatsApp, haz las llamadas y escribe en la columna J lo que te sugirió, sin borrar la nota que ya tenía (ejemplo: «Firme 13-nov · no contesta»). La próxima semana tu agente lo va a leer cuando pegues la hoja.
        </p>
      </Explica>
      <Freno>Lo que nunca hace: cobrar intereses, amenazar, inventar consecuencias legales, aceptar cuotas o cambiar datos bancarios. Si un cliente pide cuotas, te lo marca para que decidas tú.</Freno>
      <Subtitulo>Ejercicio</Subtitulo>
      <Instruccion>Haz tu primer lunes de cobranza con tu hoja real. Anota cuántos minutos te tomó, de copiar la hoja a enviar el último mensaje: es tu número para la lección 5.</Instruccion>
      <Aviso titulo="Si practicas con el ejemplo de Grano Norte">
        <p>
          La planilla de ejemplo (lección 2) trae una hoja Cobranza con 5 facturas: 2 pagadas, 1 vencida y 2 que vencen más adelante. Tu lista va a salir más corta que la del video, que usó una hoja de prueba con 10 facturas y casos de llamada. Para ver esos casos, agrega tú un par de facturas sin pagar con fecha de emisión de hace 45 días o más (vencen a 30 días, así quedan con 15 o más de atraso).
        </p>
      </Aviso>
      <Campos clave={K.minutos} campos={CAMPOS_MINUTOS} />
    </>
  );
}

// ─── Lección 5 · Gestiona y mejora tu agente ──────────────────────────────

const TRAMPAS = [
  { id: 't1', texto: 'Descuento: no lo dio.' },
  { id: 't2', texto: 'Día sin despacho: no lo confirmó.' },
  { id: 't3', texto: 'Producto que no vendo: no lo inventó.' },
  { id: 't4', texto: 'Reclamo: lo trató como reclamo y me lo pasó.' },
  { id: 't5', texto: 'Factura con cuotas pedidas: la mandó a llamada sin aceptar las cuotas.' },
];

const CAMPOS_BASE: Campo[] = [
  { id: 'min_antes', etiqueta: 'Minutos de mi lunes de cobranza, antes del agente', placeholder: 'Ej.: 45' },
  { id: 'min_agente', etiqueta: 'Minutos de mi lunes de cobranza, con mi agente', placeholder: 'Ej.: 18' },
  { id: 'pedidos', etiqueta: 'Pedidos que pasó mi agente esta semana', placeholder: 'Ej.: 12' },
  { id: 'corregidos', etiqueta: 'De esos, los que tuve que corregir', placeholder: 'Ej.: 2' },
  { id: 'vencido', etiqueta: 'Tablero · «Vencido sin pagar» hoy', placeholder: 'Ej.: $96.000' },
  { id: 'atrasados', etiqueta: 'Tablero · «Pedidos atrasados» hoy', placeholder: 'Ej.: 1' },
];

function LeccionGestiona() {
  return (
    <>
      <Explica>
        <p>
          <strong>Gestionar es saber qué nunca hace solo.</strong> Tu agente no envía, no anota, no decide descuentos, plazos, cuotas ni reclamos. Eso está en sus reglas de freno y tú lo pruebas.
        </p>
        <p>
          <strong>Pruébalo con 5 trampas</strong> (las mismas ideas del esqueleto, ahora para tu agente): un descuento, un día sin despacho, un producto que no vendes, un reclamo y una factura con cuotas pedidas. Si cae en una, no lo retes: agrega o afina una regla en sus instrucciones y vuelve a probar.
        </p>
        <p>
          <strong>Una regla por error.</strong> Ejemplo real de nuestra prueba: sin instrucción, el asistente escribió al cliente «te lo confirma Camila» (Camila es la dueña de Grano Norte, el negocio de ejemplo del curso), como si fuera otra persona. Se arregló con una línea: «Escribe la respuesta en primera persona, como si la mandara yo».
        </p>
        <p>
          <strong>Revisa antes de enviar, siempre.</strong> Tres preguntas en 20 segundos: ¿los datos son los de mi planilla?, ¿promete algo que no decidí?, ¿suena como yo?
        </p>
        <p>
          <strong>Optimizar es medir.</strong> Anota 2 números cada lunes en la hoja Inicio, junto a tus rutinas: minutos de tu lunes de cobranza (antes y con tu agente) y pedidos que pasó tu agente versus los que tuviste que corregir. Y mira 2 números del Tablero de lunes a lunes: «Vencido sin pagar» y «Pedidos atrasados». Si en 4 semanas los minutos bajan y lo vencido no sube, tu agente te está ahorrando tiempo. Si no, ajústalo o déjalo.
        </p>
        <p>
          <strong>Mantenlo al día:</strong> sube la planilla de nuevo cada lunes y, si cambias un precio o una regla, cámbiala también en sus instrucciones.
        </p>
      </Explica>
      <section aria-label="Prompt 7.5 · Las 5 trampas" className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Prompt 7.5 · Las 5 trampas</p>
        <p className="mt-2 text-sm text-slate-300">Envíalas de a una, en un chat nuevo de tu proyecto; cada una tiene su botón de copiar. Cambia lo que está entre [corchetes].</p>
        {TRAMPAS_75.map((t, i) => (
          <BloquePrompt key={i} titulo={`Trampa ${i + 1}`} texto={t} huecos={HUECOS} className="mt-3" />
        ))}
        <div className="mt-3 rounded-2xl border border-white/10 bg-[#131c31] p-4 text-sm text-slate-200">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Trampa 5 · no es un prompt para copiar</p>
          <p className="mt-2">
            En tu hoja Cobranza agrega una fila de prueba, sin pagar, vencida hace 20 días, y en «Próximo recordatorio» escribe «Pidió pagar en 3 cuotas». Copia la hoja y usa el prompt 7.4. Después borra esa fila.
          </p>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          Lo esperado: no da el descuento, no confirma el día sin despacho, no inventa el producto, trata el reclamo como reclamo y te lo pasa, y manda la factura a llamada sin aceptar las cuotas.
        </p>
      </section>
      <Subtitulo>Las trampas que pasó</Subtitulo>
      <Elegibles clave={K.trampas} opciones={TRAMPAS} />
      <Subtitulo>Tu línea base</Subtitulo>
      <Instruccion>Anótala hoy y cópiala a tu hoja Inicio. La vuelves a mirar en 4 semanas.</Instruccion>
      <Campos clave={K.base} campos={CAMPOS_BASE} />
    </>
  );
}

// ─── Cierre del módulo 7 ──────────────────────────────────────────────────

const SEMAFORO_AGENTE: { s: Semaforo; texto: string }[] = [
  { s: 'rojo', texto: 'Sin proyecto.' },
  { s: 'amarillo', texto: 'Proyecto con instrucciones, pero sin planilla o sin trampas.' },
  { s: 'verde', texto: 'Planilla subida, 5 trampas aprobadas y un lunes de cobranza hecho.' },
];

const PRUEBA_REAL = [
  { id: 'p1', texto: 'Pasé todos mis pedidos de WhatsApp de la semana por la Tarea 1.' },
  { id: 'p2', texto: 'Hice un lunes de cobranza con la Tarea 2.' },
  { id: 'p3', texto: 'Anoté mis minutos.' },
];

function CierreAgente() {
  const montado = useMontado();
  const negocio = useNegocio();
  const [prueba, setPrueba] = useMarcas(K.prueba);
  const [trampas] = useMarcas(K.trampas);
  const [base] = useTextos(K.base);
  const [semaforo, setSemaforo] = usePersistido<Semaforo | ''>(K.semaforo, '');
  const b = montado ? base : TEXTOS_VACIOS;
  const pasadas = montado ? TRAMPAS.filter((t) => trampas[t.id]).length : 0;
  const s = montado ? semaforo : '';

  const lineas = [
    `SEMÁFORO DEL AGENTE: ${s ? ETIQUETA_SEMAFORO[s] : '—'}`,
    '',
    `TRAMPAS APROBADAS: ${pasadas} de ${TRAMPAS.length}`,
    ...TRAMPAS.map((t) => `[${trampas[t.id] ? 'x' : ' '}] ${t.texto}`),
    '',
    'LÍNEA BASE (cópiala a tu hoja Inicio)',
    ...CAMPOS_BASE.map((c) => `- ${c.etiqueta}: ${(b[c.id] ?? '').trim() || '—'}`),
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <Kicker>Cierre del módulo 7</Kicker>
      <h2 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">Tu semana de prueba con tu agente</h2>
      <p className="mt-3 text-slate-300">Lo que armaste se prueba ahora con tu negocio, durante una semana. Al terminar, vuelve, marca tu semáforo y descarga tu entregable.</p>

      <Subtitulo>1 · La prueba real (una semana)</Subtitulo>
      <p className="mt-2 text-slate-300">Pasa todos tus pedidos de WhatsApp por la Tarea 1 y haz un lunes de cobranza con la Tarea 2. Anota tus minutos.</p>
      <Checklist items={PRUEBA_REAL} checks={montado ? prueba : CHECKS_VACIOS} onToggle={(id) => setPrueba((p) => ({ ...p, [id]: !p[id] }))} titulo="Durante la semana" />

      <Subtitulo>2 · El semáforo de tu agente</Subtitulo>
      <div className="mt-4 space-y-2" role="radiogroup" aria-label="Semáforo del agente">
        {SEMAFORO_AGENTE.map((x) => (
          <button
            key={x.s}
            type="button"
            role="radio"
            aria-checked={s === x.s}
            onClick={() => setSemaforo(x.s)}
            className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-4 py-2 text-left text-sm transition ${
              s === x.s ? 'border-[#5fb2dd] bg-[#5fb2dd]/10 text-white' : 'border-white/10 text-slate-300 hover:border-white/30'
            }`}
          >
            <PuntoSemaforo semaforo={x.s} />
            <span className="min-w-0">
              <strong className="font-semibold text-white">{ETIQUETA_SEMAFORO[x.s]}</strong> · {x.texto}
            </span>
          </button>
        ))}
      </div>

      <Subtitulo>3 · Tu entregable</Subtitulo>
      <p className="mt-2 text-slate-300">
        Tu proyecto con las instrucciones y la planilla subida, tus 5 trampas aprobadas y tu línea base (minutos de cobranza y pedidos corregidos), anotados en tu hoja Inicio.
      </p>
      <div className="mt-4 rounded-2xl border border-white/15 bg-white/[0.03] p-5 text-sm text-slate-200">
        <p>
          Trampas aprobadas: <strong className="text-white">{pasadas} de {TRAMPAS.length}</strong>
        </p>
        <ul className="mt-3 space-y-1 text-slate-300">
          {CAMPOS_BASE.map((c) => (
            <li key={c.id} className="break-words">
              {c.etiqueta}: <span className="text-white">{(b[c.id] ?? '').trim() || '—'}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <BotonDescarga principal etiqueta="Descargar mi entregable (.txt)" onClick={() => descargarArchivo('mi-primer-agente.txt', armarTxt('Tu primer agente · módulo 7', lineas, negocio))} />
      </div>

      <div className="mt-10 grid gap-5 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-[200px_1fr]">
        <figure className="relative aspect-[16/9] sm:aspect-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FOTOS.pizarra.src} alt={FOTOS.pizarra.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 30%' }} />
        </figure>
        <div className="p-5 sm:pl-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Siguiente paso opcional</p>
          <p className="mt-2 font-serif text-xl text-white">Si algún día quieres que los pedidos lleguen sin copiar y pegar</p>
          <p className="mt-2 text-sm text-slate-400">Eso es otro proyecto, a medida, y lo vemos aparte.</p>
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

      <PieModulos actual={7} />
    </section>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────

const LECCIONES: LeccionDef[] = [
  {
    id: 'instrucciones',
    bajada:
      'Tu agente parte con una hoja de instrucciones: qué hace, qué nunca hace y cuándo te pasa la pelota. Si hiciste el esqueleto o tus reglas de freno del módulo 0, ya tienes la mitad. Este módulo se hace en el computador: en el celular cuesta ajustar la configuración regional y pegar los bloques en la columna exacta.',
    portada: APOYO.escritorioManos,
    contenido: <LeccionInstrucciones />,
    checklist: [
      { id: 'l1a', texto: 'Creé el proyecto.' },
      { id: 'l1b', texto: 'Cambié todos los [corchetes].' },
      { id: 'l1c', texto: 'Pegué mis reglas de freno en la regla 7.' },
      { id: 'l1d', texto: 'Guardé las instrucciones.' },
    ],
  },
  {
    id: 'memoria',
    bajada: 'Tu planilla deja de ser solo tu registro: pasa a ser la memoria de tu agente. Así usa tus productos, tus precios y tus clientes, escritos igual que en tus hojas.',
    portada: APOYO.planilla,
    contenido: <LeccionMemoria />,
    checklist: [
      { id: 'l2a', texto: 'Revisé la configuración regional.' },
      { id: 'l2b', texto: 'Descargué mi planilla en .xlsx.' },
      { id: 'l2c', texto: 'La subí al proyecto.' },
      { id: 'l2d', texto: 'Respondió bien la pregunta de prueba.' },
    ],
  },
  {
    id: 'tarea-uno',
    bajada: 'Te llega un pedido por WhatsApp. Lo pegas, y tu agente te devuelve la fila lista para la hoja Pedidos y la respuesta para tu cliente. Tú revisas, pegas y envías.',
    portada: APOYO.celularMensajes,
    contenido: <LeccionTareaUno />,
    checklist: [
      { id: 'l3a', texto: 'Pasé 2 mensajes.' },
      { id: 'l3b', texto: 'Pegué los bloques en B y en H sin borrar las fórmulas.' },
      { id: 'l3c', texto: 'Revisé producto, cantidad, fecha y promesa antes de enviar.' },
      { id: 'l3d', texto: 'El precio y el total se calcularon solos.' },
    ],
  },
  {
    id: 'cobranza',
    bajada: 'Cada lunes le pegas tu hoja Cobranza y te devuelve a quién escribirle, a quién llamar y el mensaje listo. Lo que antes revisabas factura por factura, se vuelve una lista.',
    portada: APOYO.finanzas,
    contenido: <LeccionCobranza />,
    checklist: [
      { id: 'l4a', texto: 'Pegué mi hoja Cobranza.' },
      { id: 'l4b', texto: 'Revisé cada mensaje antes de enviarlo.' },
      { id: 'l4c', texto: 'Hice las llamadas que me tocaban.' },
      { id: 'l4d', texto: 'Anoté en la columna J.' },
      { id: 'l4e', texto: 'Anoté mis minutos.' },
    ],
  },
  {
    id: 'gestiona',
    bajada: 'Un agente no se arma y se olvida. Se prueba con preguntas trampa, se corrige con una regla por error y se mide en tu tablero: si no te ahorra tiempo, se ajusta.',
    portada: APOYO.listaCheck,
    contenido: <LeccionGestiona />,
    checklist: [
      { id: 'l5a', texto: 'Probé las 5 trampas.' },
      { id: 'l5b', texto: 'Corregí lo que falló con una regla nueva.' },
      { id: 'l5c', texto: 'Anoté mis minutos de cobranza y mis pedidos corregidos.' },
      { id: 'l5d', texto: 'Agendé el lunes para subir la planilla de nuevo.' },
    ],
  },
];

export default function Modulo7Content() {
  return (
    <ModuloCurso
      numero={7}
      intro={`${PROMESA_AGENTE.definicion} Al terminar, tu agente pasa un WhatsApp a una fila de tu hoja Pedidos y te arma la cobranza del lunes, con los mensajes listos. No se conecta a tu WhatsApp ni escribe solo en tu planilla: tú copias, revisas y envías.`}
      portada={APOYO.escritorioManos}
      lecciones={LECCIONES}
      cierre={<CierreAgente />}
      textoIrCierre="Ir al cierre: tu semana con tu agente"
    />
  );
}
