'use client';

/*
 * /curso/modulo-1 — Módulo 1 «Clientes y ventas: tu primer CRM, ningún cliente se te pierde».
 * Curso «El sistema de tu negocio» v1.1 (8-nov-2026). Era el módulo 2 «Ventas y prospección» en v1.0.
 * Continúa la Guía 1: la hoja Clientes usa los mismos estados que su planilla (ESTADOS_CLIENTE) y puede traer
 * la lista de posibles clientes que la persona armó en la guía, en este mismo navegador.
 * 5 lecciones + cierre (prueba real, semáforo antes/después, entregable: hoja Clientes con datos reales).
 * La hoja Clientes de este módulo se comparte entre lecciones: la propuesta (L3) se anota en ella, los
 * seguimientos (L4) y el embudo (L5) se leen de ella.
 */

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { useMontado } from '@/lib/productos/curso/persistencia';
import { CANALES, ESTADOS_CLIENTE, leerClientesGuia } from '@/lib/productos/curso/plantilla';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaEmbudo, DiagramaPropuestaUnaPagina, DiagramaSecuenciaSeguimiento } from '@/components/productos/diagramas/modulos';
import { DiagramaCanalPrimerMensaje, DiagramaHojaClientes, DiagramaRutinaCRM } from '@/components/productos/diagramas/sistema-m12';
import { DescargaPlantilla } from './Plantilla';
import {
  BotonDescarga,
  Campos,
  CierreModulo,
  Explica,
  FilaResumen,
  FotoBanda,
  Freno,
  Instruccion,
  ListaCheck,
  ModuloCurso,
  Subtitulo,
  armarCsv,
  armarIcs,
  armarTxt,
  claveModulo,
  descargarArchivo,
  fechaCorta,
  numero,
  nuevoId,
  pesos,
  useFilas,
  useNegocio,
  useTextos,
  type Campo,
  type Fila,
  type LeccionDef,
} from './leccion';

const K = {
  clientes: claveModulo(1, 'clientes'),
  ideal: claveModulo(1, 'ideal'),
  mensajes: claveModulo(1, 'mensajes'),
  propuesta: claveModulo(1, 'propuesta'),
  embudo: claveModulo(1, 'embudo'),
};

const claseInput =
  'mt-1.5 min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none';
const claseCelda =
  'mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-white/10 bg-[#0f172a] px-3 text-[15px] text-slate-100 placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none';

// ─── Fechas (AAAA-MM-DD en hora local, comparables como texto) ────────────

function isoDe(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function hoyISO(dias = 0) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return isoDe(d);
}
function aFecha(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}
const legible = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
};
function diasHasta(iso: string) {
  const f = aFecha(iso);
  if (!f) return null;
  const h = aFecha(hoyISO())!;
  return Math.round((f.getTime() - h.getTime()) / 86400000);
}

// ─── La hoja Clientes (compartida por las 5 lecciones) ────────────────────

type ClienteFila = Fila;

const ejemploClientes = (): ClienteFila[] =>
  [
    { nombre: 'Paula Soto', empresa: 'Cafetería Puerto Dulce', contacto: '+56 9 5555 0101', origen: 'Referido', estado: 'Cliente', proximo: 'Ofrecer el plan mensual', fecha: hoyISO(3), monto: '' },
    { nombre: 'Jorge Lagos', empresa: 'Oficinas Bahía SpA', contacto: 'jorge@bahia.cl', origen: 'LinkedIn', estado: 'Propuesta', proximo: 'Seguimiento de la propuesta', fecha: hoyISO(0), monto: '174000' },
    { nombre: 'Daniela Ríos', empresa: 'Café La Subida', contacto: '+56 9 5555 0103', origen: 'Instagram', estado: 'Conversación', proximo: 'Enviar muestra de 250 g', fecha: hoyISO(1), monto: '' },
    { nombre: 'Carla Muñoz', empresa: 'Restorán Mirador', contacto: 'carla@mirador.cl', origen: 'Google', estado: 'Contactado', proximo: 'Segundo mensaje con un caso', fecha: hoyISO(-1), monto: '' },
    { nombre: 'Andrés Pino', empresa: 'Panadería Las Rocas', contacto: '', origen: 'Visita o feria', estado: 'Sin mensaje', proximo: 'Primer mensaje por correo', fecha: hoyISO(2), monto: '' },
  ].map((f) => ({ ...f, _id: nuevoId() }) as ClienteFila);

function useClientes() {
  return useFilas(K.clientes);
}

const conDatos = (f: ClienteFila) => !!(f.nombre?.trim() || f.empresa?.trim());
const nombreDe = (f: ClienteFila) => [f.empresa?.trim(), f.nombre?.trim()].filter(Boolean).join(' · ') || 'Sin nombre';

/** A quién le toca hoy: próximo paso con fecha de hoy o atrasada, sin contar descartados. */
function tocaHoy(filas: ClienteFila[]) {
  const hoy = hoyISO();
  return filas.filter((f) => conDatos(f) && f.fecha && f.fecha <= hoy && f.estado !== 'Descartado').sort((a, b) => a.fecha.localeCompare(b.fecha));
}

/** CSV con las mismas columnas y el mismo orden que la hoja Clientes de la planilla del sistema. */
function csvClientes(filas: ClienteFila[]) {
  return armarCsv(
    ['Nombre', 'Empresa', 'WhatsApp o teléfono', 'Correo', 'Origen', 'Estado', 'Próximo paso', 'Fecha del próximo paso', 'Monto de la propuesta', 'Última compra', 'Notas'],
    filas.filter(conDatos).map((f) => {
      const c = (f.contacto ?? '').trim();
      const esCorreo = c.includes('@');
      return [f.nombre ?? '', f.empresa ?? '', esCorreo ? '' : c, esCorreo ? c : '', f.origen ?? '', f.estado || 'Sin mensaje', f.proximo ?? '', legible(f.fecha ?? ''), numero(f.monto) || '', '', ''];
    }),
  );
}

function HojaClientes({ maxFilas = 60 }: { maxFilas?: number }) {
  const [filas, setFilas] = useClientes();
  const montado = useMontado();
  const [aviso, setAviso] = useState('');
  const visibles = montado ? filas : [];
  const agregar = () => setFilas((p) => (p.length >= maxFilas ? p : [...p, { _id: nuevoId(), estado: 'Sin mensaje' } as ClienteFila]));
  const editar = (id: string, col: string, v: string) => setFilas((p) => p.map((f) => (f._id === id ? { ...f, [col]: v } : f)));
  const quitar = (id: string) => setFilas((p) => p.filter((f) => f._id !== id));
  const traerGuia = () => {
    const guia = leerClientesGuia();
    if (guia.length === 0) {
      setAviso('No encontramos tu lista de la Guía 1 en este navegador. Si la hiciste en otro equipo, copia las filas desde tu planilla de la guía.');
      return;
    }
    const nuevas = guia.map(
      (g) =>
        ({
          _id: nuevoId(),
          nombre: g.nombre,
          empresa: g.empresa,
          contacto: g.whatsapp || g.email,
          origen: g.fuente,
          estado: g.estado === 'Cerrado' ? 'Cliente' : g.estado || 'Sin mensaje',
          proximo: g.proximo,
          fecha: g.fecha,
          monto: '',
        }) as ClienteFila,
    );
    setFilas((p) => [...p, ...nuevas].slice(0, maxFilas));
    setAviso(`Listo: ${nuevas.length} ${nuevas.length === 1 ? 'fila traída' : 'filas traídas'} desde tu Guía 1. Revisa el estado y la fecha de cada una.`);
  };

  return (
    <div className="mt-5">
      {visibles.length === 0 ? (
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-4">
          <button type="button" onClick={traerGuia} className="inline-flex min-h-[44px] items-center gap-2 text-sm text-[#5fb2dd] hover:text-white">
            <Plus className="h-4 w-4" aria-hidden /> Traer mi lista de la Guía 1
          </button>
          <button type="button" onClick={() => setFilas(ejemploClientes())} className="inline-flex min-h-[44px] items-center gap-2 text-sm text-[#5fb2dd] hover:text-white">
            <Plus className="h-4 w-4" aria-hidden /> Partir desde el ejemplo de Grano Norte
          </button>
        </div>
      ) : null}
      {aviso ? (
        <p className="mb-3 text-sm text-slate-300" aria-live="polite">
          {aviso}
        </p>
      ) : null}
      <ol className="space-y-3">
        {visibles.map((f, i) => (
          <li key={f._id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Fila {i + 1}</span>
              <button type="button" onClick={() => quitar(f._id)} aria-label={`Quitar fila ${i + 1}`} className="-m-2 flex h-10 w-10 items-center justify-center text-slate-500 hover:text-slate-200">
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <label className="col-span-2 block min-w-0 text-xs text-slate-400">
                Nombre
                <input value={f.nombre ?? ''} placeholder="Quién decide" onChange={(e) => editar(f._id, 'nombre', e.target.value)} className={claseCelda} />
              </label>
              <label className="col-span-2 block min-w-0 text-xs text-slate-400">
                Empresa
                <input value={f.empresa ?? ''} placeholder="Nombre del negocio" onChange={(e) => editar(f._id, 'empresa', e.target.value)} className={claseCelda} />
              </label>
              <label className="col-span-2 block min-w-0 text-xs text-slate-400">
                WhatsApp o correo
                <input value={f.contacto ?? ''} placeholder="+56 9… o nombre@…" onChange={(e) => editar(f._id, 'contacto', e.target.value)} className={claseCelda} />
              </label>
              <label className="block min-w-0 text-xs text-slate-400">
                Origen
                <select value={f.origen ?? ''} onChange={(e) => editar(f._id, 'origen', e.target.value)} className={claseCelda}>
                  <option value="">—</option>
                  {[...CANALES, ...(f.origen && !CANALES.includes(f.origen) ? [f.origen] : [])].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block min-w-0 text-xs text-slate-400">
                Estado
                <select value={f.estado || 'Sin mensaje'} onChange={(e) => editar(f._id, 'estado', e.target.value)} className={claseCelda}>
                  {ESTADOS_CLIENTE.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="col-span-2 block min-w-0 text-xs text-slate-400">
                Próximo paso
                <input value={f.proximo ?? ''} placeholder="Ej.: enviar muestra" onChange={(e) => editar(f._id, 'proximo', e.target.value)} className={claseCelda} />
              </label>
              <label className="block min-w-0 text-xs text-slate-400">
                Fecha
                <input type="date" value={f.fecha ?? ''} onChange={(e) => editar(f._id, 'fecha', e.target.value)} className={claseCelda} />
              </label>
              <label className="block min-w-0 text-xs text-slate-400">
                Monto propuesta
                <input inputMode="numeric" value={f.monto ?? ''} placeholder="$" onChange={(e) => editar(f._id, 'monto', e.target.value)} className={claseCelda} />
              </label>
            </div>
          </li>
        ))}
      </ol>
      {visibles.length < maxFilas ? (
        <button type="button" onClick={agregar} className="mt-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-200 hover:border-white/30">
          <Plus className="h-4 w-4" aria-hidden /> Agregar cliente o posible cliente
        </button>
      ) : null}
    </div>
  );
}

function PanelHoy() {
  const [filas] = useClientes();
  const montado = useMontado();
  if (!montado) return null;
  const hoy = tocaHoy(filas);
  if (filas.filter(conDatos).length === 0) return null;
  return (
    <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">A quién le toca hoy</p>
      {hoy.length === 0 ? (
        <p className="mt-1 text-sm text-slate-300">Nadie tiene un próximo paso para hoy o atrasado. Revisa que cada fila tenga su fecha.</p>
      ) : (
        <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
          {hoy.map((f) => {
            const d = diasHasta(f.fecha) ?? 0;
            return (
              <li key={f._id}>
                <strong className="text-white">{nombreDe(f)}</strong> · {f.proximo?.trim() || 'sin próximo paso'} · {d === 0 ? 'hoy' : `atrasado ${-d} ${-d === 1 ? 'día' : 'días'}`}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ─── Lección 1 · De la Guía 1 a tu hoja Clientes ──────────────────────────

const CAMPOS_IDEAL: Campo[] = [
  { id: 'rubro', etiqueta: 'A quién le vendes', placeholder: 'Ej.: cafeterías de 1 a 3 locales y oficinas de 15 a 80 personas' },
  { id: 'senal', etiqueta: 'La señal de que te necesita ahora', placeholder: 'Ej.: abrió hace poco o se queja de su proveedor' },
  { id: 'decide', etiqueta: 'Quién decide la compra', placeholder: 'Ej.: el dueño o administración' },
];

const EJEMPLO_IDEAL = {
  rubro: 'Cafeterías de 1 a 3 locales y oficinas de 15 a 80 personas con cafetera propia',
  senal: 'Abrió hace menos de 3 meses, cambió su carta o se queja de su proveedor',
  decide: 'El dueño (cafeterías) o administración (oficinas)',
};

function LeccionClientes() {
  const [filas] = useClientes();
  const montado = useMontado();
  const n = montado ? filas.filter(conDatos).length : 0;
  return (
    <>
      <Explica>
        <p>
          Un CRM es <strong>el lugar donde ves a todos tus clientes y en qué va cada uno</strong>. No necesitas pagar un software para tener uno: es una hoja con una fila por persona y cinco datos que no se negocian, sobre todo el <strong>próximo paso</strong> y su <strong>fecha</strong>.
        </p>
        <p>
          Si hiciste la Guía 1, ya tienes la primera versión: tu lista de posibles clientes con su estado. Aquí la traes y le sumas a tus clientes de hoy. Si no la hiciste, parte con los clientes que ya te compran y las cotizaciones que tienes abiertas.
        </p>
      </Explica>
      <DiagramaHojaClientes className="mt-6" />
      <Pantallita titulo="Grano Norte · antes y después" className="mt-6">
        <p className="text-sm">Antes: 35 empresas repartidas entre el WhatsApp y un cuaderno. Nadie más sabía a quién le tocaba un seguimiento.</p>
        <p className="mt-2 text-sm">
          Después: <strong>una hoja Clientes</strong> con las 35 empresas, las 8 cafeterías que estaba buscando y la fecha del próximo paso de cada una. Cada mañana, Camila la ordena por fecha.
        </p>
      </Pantallita>
      <Subtitulo>1 · A quién le vendes, en 3 datos</Subtitulo>
      <Instruccion>Si ya hiciste la ficha del cliente ideal en la Guía 1, cópiala. Te sirve para decidir quién entra a la hoja y quién no.</Instruccion>
      <Campos clave={K.ideal} campos={CAMPOS_IDEAL} ejemplo={EJEMPLO_IDEAL} />
      <Subtitulo>2 · Tu hoja Clientes</Subtitulo>
      <Instruccion>
        Una fila por cliente o posible cliente. Parte con 10: tus clientes más importantes y las cotizaciones abiertas. Lo que no tiene fecha, no existe.
      </Instruccion>
      <HojaClientes />
      <PanelHoy />
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis filas para la planilla (.csv)"
          disabled={n === 0}
          onClick={() => descargarArchivo('hoja-clientes.csv', csvClientes(filas), 'text/csv')}
        />
        <p className="mt-2 text-xs text-slate-500">Las columnas vienen en el mismo orden que la hoja Clientes de tu planilla: abres el archivo, copias las filas y las pegas.</p>
      </div>
      <DescargaPlantilla
        titulo="Tu planilla del sistema, con tu hoja Clientes"
        texto="Si todavía no la tienes, descárgala aquí. Si hiciste la Guía 1 en este navegador, tu lista entra sola a la hoja Clientes."
      />
      <DiagramaRutinaCRM className="mt-6" />
    </>
  );
}

// ─── Lección 2 · Primer mensaje y seguimientos ────────────────────────────

const CAMPOS_MENSAJES: Campo[] = [
  { id: 'm0', etiqueta: 'Primer mensaje (hoy)', ayuda: 'Por qué le escribes + qué le resuelves + una pregunta fácil.', filas: 3 },
  { id: 'm3', etiqueta: 'Seguimiento 1 (día 2)', ayuda: 'Una pregunta corta.', filas: 2 },
  { id: 'm7', etiqueta: 'Seguimiento 2 (día 7)', ayuda: 'Un dato, un caso o algo que le sirva.', filas: 3 },
  { id: 'm14', etiqueta: 'Cierre amable (día 14)', ayuda: 'Deja la puerta abierta.', filas: 2 },
];

const EJEMPLO_MENSAJES = {
  m0: 'Hola, {nombre}. Vi que {negocio} abrió hace poco en el cerro, ¡felicitaciones! Tostamos café cada semana para cafeterías de la zona. ¿Te puedo dejar una muestra el jueves?',
  m3: 'Hola, {nombre}, ¿alcanzaste a ver mi mensaje? La muestra sigue en pie.',
  m7: '{nombre}, te comparto algo útil: el café pierde buena parte de su aroma después de 4 semanas de tostado. Si quieres, te cuento cómo lo resolvieron otras cafeterías de la zona.',
  m14: 'Hola, {nombre}. No te escribo más para no molestar. ¿Te escribo en un mes o prefieres que no?',
};

function reemplazar(texto: string, nombre: string, negocio: string) {
  return texto.replace(/\{nombre\}/g, nombre || '{nombre}').replace(/\{negocio\}/g, negocio || '{negocio}');
}

function LeccionMensajes() {
  const [m] = useTextos(K.mensajes);
  const montado = useMontado();
  const [prueba, setPrueba] = useState({ nombre: 'Ana', negocio: 'Café Mirador' });
  const frases = (t: string) => t.split(/[.!?]+\s/).filter((x) => x.trim()).length;
  const preguntas = (t: string) => (t.match(/\?/g) ?? []).length;
  return (
    <>
      <Explica>
        <p>
          Una parte grande de las respuestas llega en un seguimiento, no en el primer mensaje, y mucha gente nunca vuelve a escribir porque redactar cada uno desde cero cansa. Ahí está tu ventaja.
        </p>
        <p>
          Por eso escribes <strong>cuatro plantillas una sola vez</strong>: el primer mensaje y tres seguimientos. La regla: máximo tres frases y <strong>una sola pregunta</strong>, fácil de contestar. Los días 2, 7 y 14 son un calendario simple: si tu rubro es más lento, estíralo.
        </p>
      </Explica>
      <DiagramaCanalPrimerMensaje className="mt-6" />
      <DiagramaSecuenciaSeguimiento className="mt-6" dias={[0, 2, 7, 14]} etiquetas={['Primer mensaje', 'Pregunta corta', 'Un dato que le sirva', 'Cierre amable']} />
      <Pantallita titulo="Grano Norte · mensaje directo en Instagram" className="mt-6">
        <p className="text-sm">«Hola, Ana. Vi que Café Mirador abrió hace poco en el cerro, ¡felicitaciones! Tostamos café cada semana para cafeterías de la zona. ¿Te puedo dejar una muestra el jueves?»</p>
        <p className="mt-2 text-sm text-slate-400">Tres frases, una pregunta, cero precios. Ana no conocía a Camila: por eso va por Instagram y no por WhatsApp.</p>
      </Pantallita>
      <Subtitulo>Tus 4 plantillas</Subtitulo>
      <Instruccion>Usa {'{nombre}'} y {'{negocio}'} donde van los datos de cada persona.</Instruccion>
      <Campos clave={K.mensajes} campos={CAMPOS_MENSAJES} ejemplo={EJEMPLO_MENSAJES} />
      <Subtitulo>Pruébalas con alguien de tu hoja</Subtitulo>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <label className="block text-sm text-slate-300">
          Nombre
          <input value={prueba.nombre} onChange={(e) => setPrueba((p) => ({ ...p, nombre: e.target.value }))} className={claseInput} />
        </label>
        <label className="block text-sm text-slate-300">
          Negocio
          <input value={prueba.negocio} onChange={(e) => setPrueba((p) => ({ ...p, negocio: e.target.value }))} className={claseInput} />
        </label>
      </div>
      <ul className="mt-4 space-y-3">
        {CAMPOS_MENSAJES.map((c) => {
          const t = montado ? (m[c.id] ?? '').trim() : '';
          const nf = frases(t);
          const np = preguntas(t);
          return (
            <li key={c.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">{c.etiqueta}</p>
              <p className="mt-1 whitespace-pre-line text-sm text-slate-100">{t ? reemplazar(t, prueba.nombre, prueba.negocio) : 'Escribe la plantilla arriba.'}</p>
              {t ? (
                <p className={`mt-1 text-xs ${nf <= 3 && np === 1 ? 'text-emerald-300' : 'text-orange-300'}`}>
                  {nf} {nf === 1 ? 'frase' : 'frases'} · {np} {np === 1 ? 'pregunta' : 'preguntas'}
                  {nf <= 3 && np === 1 ? ' · bien' : ' · apunta a 3 frases y 1 pregunta'}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
      <Freno>Cada vez que mandas un mensaje, actualizas la fila en tu hoja Clientes: nuevo estado y la fecha del siguiente paso. Si responde, la secuencia se detiene y sigue la conversación.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis plantillas (.txt)"
          disabled={!montado || !CAMPOS_MENSAJES.some((c) => m[c.id]?.trim())}
          onClick={() =>
            descargarArchivo(
              'mensajes-de-seguimiento.txt',
              armarTxt('Primer mensaje y seguimientos', [
                ...CAMPOS_MENSAJES.flatMap((c) => [c.etiqueta.toUpperCase(), (m[c.id] ?? '').trim() || '(sin escribir)', '']),
                'REGLA: máximo 3 frases y 1 pregunta. Si responde, la secuencia se detiene.',
                'WHATSAPP: solo a quien ya te conoce o te dio su número. A los demás, por correo, LinkedIn o Instagram.',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 3 · De la conversación a la propuesta ────────────────────────

const CAMPOS_PROPUESTA: Campo[] = [
  { id: 'cliente', etiqueta: 'Cliente', placeholder: 'Nombre del negocio y de quien decide' },
  { id: 'problema', etiqueta: 'El problema, con sus palabras', filas: 2 },
  { id: 'incluye', etiqueta: 'Qué incluye', ayuda: 'Una línea por punto.', filas: 4 },
  { id: 'precio', etiqueta: 'Precio', placeholder: 'Lo pones tú, con tu lista de precios vigente' },
  { id: 'monto', etiqueta: 'Monto total (va a tu hoja Clientes)', placeholder: 'Ej.: 174000' },
  { id: 'plazo', etiqueta: 'Plazo o frecuencia', placeholder: 'Ej.: primera entrega en 5 días hábiles' },
  { id: 'siguiente', etiqueta: 'Siguiente paso con fecha', placeholder: 'Ej.: confirmar el lunes 16 para partir el 23' },
  { id: 'vigencia', etiqueta: 'Vigencia', placeholder: 'Ej.: 15 días' },
];

const EJEMPLO_PROPUESTA = {
  cliente: 'Oficinas Bahía SpA · Jorge, administración',
  problema: '«El café de la oficina se acaba a mitad de mes y nadie se acuerda de pedir.»',
  incluye: '3 planes oficina: 4 kg al mes por piso\nMolienda según su cafetera\nDespacho incluido en Valparaíso y Viña\nAviso 2 días antes de cada entrega',
  precio: '[precio del plan oficina según tu lista vigente]',
  monto: '174000',
  plazo: 'Primera entrega 5 días hábiles después de confirmar',
  siguiente: 'Confirmar el lunes para entregar el martes de la semana siguiente',
  vigencia: '15 días',
};

function LeccionPropuesta() {
  const [p] = useTextos(K.propuesta);
  const [, setFilas] = useClientes();
  const negocio = useNegocio();
  const montado = useMontado();
  const [anotada, setAnotada] = useState(false);
  const lleno = montado && !!p.cliente?.trim();
  const lineas = () => [
    `PARA: ${(p.cliente ?? '').trim()}`,
    `DE: ${negocio.trim() || '[tu negocio]'}`,
    '',
    'LO QUE NOS CONTASTE',
    (p.problema ?? '').trim(),
    '',
    'LO QUE PROPONEMOS',
    ...(p.incluye ?? '').split('\n').filter(Boolean).map((x) => `- ${x.trim()}`),
    '',
    `PRECIO: ${(p.precio ?? '').trim()}`,
    `PLAZO: ${(p.plazo ?? '').trim()}`,
    `SIGUIENTE PASO: ${(p.siguiente ?? '').trim()}`,
    `VIGENCIA: ${(p.vigencia ?? '').trim()}`,
  ];
  const anotar = () => {
    const [empresa, nombre] = (p.cliente ?? '').split('·').map((x) => x.trim());
    setFilas((prev) => {
      const i = prev.findIndex((f) => f.empresa?.trim() && f.empresa.trim().toLowerCase() === (empresa ?? '').toLowerCase());
      const cambios = { estado: 'Propuesta', proximo: 'Seguimiento de la propuesta', fecha: hoyISO(2), monto: String(numero(p.monto) || '') };
      if (i >= 0) return prev.map((f, j) => (j === i ? ({ ...f, ...cambios } as ClienteFila) : f));
      return [...prev, { _id: nuevoId(), nombre: nombre ?? '', empresa: empresa ?? '', contacto: '', origen: '', ...cambios } as ClienteFila];
    });
    setAnotada(true);
  };
  return (
    <>
      <Explica>
        <p>
          Una buena propuesta no se escribe en la oficina: se escribe en la <strong>primera reunión</strong>, haciendo las preguntas correctas. Son cinco:
        </p>
        <ListaCheck items={['¿Qué problema tienes hoy?', '¿Cuánto te cuesta ese problema (en plata, tiempo o clientes)?', '¿Qué has probado antes?', '¿Quién más decide?', '¿Para cuándo lo necesitas?']} />
        <p>
          Con esas respuestas armas una propuesta de <strong>una sola página</strong>. Y apenas la envías, queda en tu hoja Clientes: estado «Propuesta», su monto y la fecha del primer seguimiento. Así sabes cuánta plata tienes en propuestas abiertas.
        </p>
      </Explica>
      <DiagramaPropuestaUnaPagina className="mt-6" />
      <FotoBanda foto={APOYO.salaReunion} posicion="center 55%" />
      <Subtitulo>Tu propuesta de una página</Subtitulo>
      <Instruccion>Parte desde el «plan oficina» de Grano Norte o desde una conversación real tuya.</Instruccion>
      <Campos clave={K.propuesta} campos={CAMPOS_PROPUESTA} ejemplo={EJEMPLO_PROPUESTA} />
      <Freno>El precio y el plazo los decides tú, con tu lista vigente. Si usas ChatGPT o Claude para redactar, es un borrador: nunca le dejes comprometer un descuento o una fecha.</Freno>
      {lleno ? (
        <Pantallita titulo="Vista previa · 1 página" className="mt-6">
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">{lineas().join('\n')}</pre>
        </Pantallita>
      ) : null}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <BotonDescarga etiqueta="Descargar mi propuesta (.txt)" disabled={!lleno} onClick={() => descargarArchivo('propuesta-una-pagina.txt', armarTxt('Propuesta', lineas()))} />
        <button
          type="button"
          disabled={!lleno}
          onClick={anotar}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-200 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-4 w-4" aria-hidden /> Anotarla en mi hoja Clientes
        </button>
      </div>
      {anotada ? (
        <p className="mt-2 text-sm text-slate-300" aria-live="polite">
          Anotada: estado «Propuesta», su monto y el primer seguimiento en 2 días. La ves en la lección 4.
        </p>
      ) : null}
    </>
  );
}

// ─── Lección 4 · Seguimiento de propuestas ────────────────────────────────

function LeccionSeguimiento() {
  const [filas] = useClientes();
  const montado = useMontado();
  const abiertas = montado ? filas.filter((f) => conDatos(f) && f.estado === 'Propuesta') : [];
  const ordenadas = [...abiertas].sort((a, b) => (a.fecha || '9999').localeCompare(b.fecha || '9999'));
  const total = abiertas.reduce((s, f) => s + numero(f.monto), 0);
  const estadoDe = (f: ClienteFila) => {
    const d = f.fecha ? diasHasta(f.fecha) : null;
    if (d === null) return 'sin fecha: ponle una hoy';
    if (d < 0) return `atrasada ${-d} ${-d === 1 ? 'día' : 'días'}`;
    if (d === 0) return 'toca hoy';
    return `en ${d} ${d === 1 ? 'día' : 'días'} (${fechaCorta(aFecha(f.fecha)!)})`;
  };
  return (
    <>
      <Explica>
        <p>
          «Quedó en responderme». Esa frase, sin una fecha al lado, es una propuesta que se enfría. La regla: <strong>ninguna propuesta queda en tu hoja sin la fecha del próximo seguimiento</strong>.
        </p>
        <p>
          La columna «Fecha del próximo paso» siempre dice cuándo vuelves a escribir. Cuando haces un seguimiento, cambias la fecha al siguiente: día 2, día 7 y día 14. Si responde, cambias el estado. Si gana, pasa a «Cliente»; si no, a «Descartado» o a una fecha en un mes más.
        </p>
      </Explica>
      <DiagramaSecuenciaSeguimiento className="mt-6" dias={[0, 2, 7, 14]} etiquetas={['Envías la propuesta', '¿Alcanzaste a verla?', 'Un dato o caso útil', '¿Te escribo en un mes o prefieres que no?']} />
      <Pantallita titulo="Grano Norte · propuestas abiertas" className="mt-6">
        <ul className="space-y-1 text-sm">
          <li>Oficinas Bahía SpA · $174.000 · toca hoy (día 7)</li>
          <li>Cowork Cerro · $64.000 · día 2 el jueves</li>
          <li>Café Puerto · pasó a «Cliente» el miércoles</li>
        </ul>
      </Pantallita>
      <Subtitulo>Tus propuestas abiertas, desde tu hoja Clientes</Subtitulo>
      <Instruccion>Aquí aparecen las filas con estado «Propuesta». Si falta alguna, agrégala o cambia su estado en la hoja.</Instruccion>
      {abiertas.length > 0 ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">
            {abiertas.length} {abiertas.length === 1 ? 'propuesta abierta' : 'propuestas abiertas'}
            {total > 0 ? ` · ${pesos(total)}` : ''}
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
            {ordenadas.map((f) => (
              <li key={f._id}>
                <strong className="text-white">{nombreDe(f)}</strong>
                {numero(f.monto) ? ` · ${pesos(numero(f.monto))}` : ''} · {estadoDe(f)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-3 rounded-xl border border-white/10 p-4 text-sm text-slate-400">Todavía no tienes filas con estado «Propuesta». Anota una en la lección 3 o cambia el estado en tu hoja.</p>
      )}
      <HojaClientes />
      <Freno>Si en un seguimiento el cliente pide cambiar precio o plazo, ya no es un seguimiento: lo responde una persona, con tus reglas de freno.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Llevar los seguimientos a mi calendario (.ics)"
          disabled={!abiertas.some((f) => f.fecha)}
          onClick={() =>
            descargarArchivo(
              'seguimientos-propuestas.ics',
              armarIcs(abiertas.filter((f) => aFecha(f.fecha)).map((f) => ({ fecha: aFecha(f.fecha)!, titulo: `Seguimiento · ${nombreDe(f)}`, detalle: f.proximo || 'Seguimiento de la propuesta' }))),
              'text/calendar',
            )
          }
        />
        <p className="mt-2 text-xs text-slate-500">Opcional: el archivo .ics se abre con Google Calendar, Outlook o el calendario del celular. La fecha que manda es la de tu hoja.</p>
      </div>
    </>
  );
}

// ─── Lección 5 · Tu embudo en la planilla ─────────────────────────────────

/** Hasta qué piso llegó cada fila según su estado. Descartado cuenta como contactado. */
const PISO: Record<string, number> = { 'Sin mensaje': 0, Contactado: 1, Respondió: 2, Conversación: 3, Propuesta: 4, Cliente: 5, Inactivo: 5, Descartado: 1 };

function calcularEmbudo(filas: ClienteFila[], meta: number) {
  const f = filas.filter(conDatos);
  const piso = (x: ClienteFila) => PISO[x.estado || 'Sin mensaje'] ?? 0;
  const co = f.filter((x) => piso(x) >= 1).length;
  const cv = f.filter((x) => piso(x) >= 3).length;
  const pp = f.filter((x) => piso(x) >= 4).length;
  const ci = f.filter((x) => piso(x) >= 5).length;
  const tasa = (a: number, b: number) => (a > 0 ? b / a : 0);
  const total = tasa(co, ci);
  const necesarios = total > 0 && meta > 0 ? Math.ceil(meta / total) : 0;
  const porEstado = ESTADOS_CLIENTE.map((e) => ({ e, n: f.filter((x) => (x.estado || 'Sin mensaje') === e).length }));
  return { filas: f.length, co, cv, pp, ci, tc: tasa(co, cv), tp: tasa(cv, pp), tcierre: tasa(pp, ci), necesarios, porSemana: Math.ceil(necesarios / 4), porEstado };
}

const EJEMPLO_EMBUDO = { co: 40, cv: 10, pp: 5, ci: 2 };
const pct = (x: number) => `${Math.round(x * 100)} %`;

function LeccionEmbudo() {
  const [filas] = useClientes();
  const [e, setE] = useTextos(K.embudo);
  const montado = useMontado();
  const meta = montado ? numero(e.meta) : 0;
  const r = calcularEmbudo(montado ? filas : [], meta);
  const usaEjemplo = r.co === 0;
  const vista = usaEjemplo ? EJEMPLO_EMBUDO : r;
  const tasas = [
    { t: 'Contactado → conversación', v: r.tc },
    { t: 'Conversación → propuesta', v: r.tp },
    { t: 'Propuesta → cliente', v: r.tcierre },
  ];
  const debil = r.co ? [...tasas].sort((a, b) => a.v - b.v)[0] : null;
  return (
    <>
      <Explica>
        <p>
          ¿A cuántas personas tienes que escribirles para ganar un cliente? Tu hoja Clientes ya lo sabe: cada fila está en un estado, y si los cuentas tienes tu <strong>embudo</strong>: contactados → conversación → propuesta → cliente. Entre piso y piso hay una tasa de paso.
        </p>
        <p>
          Con esas tasas haces la cuenta al revés: si quieres cierto número de clientes nuevos al mes, sabes a cuántos tienes que escribirles cada semana. Y ves en qué piso se te cae más gente. En tu planilla, el Tablero hace esta misma cuenta solo.
        </p>
      </Explica>
      <DiagramaEmbudo
        className="mt-6"
        pisos={[
          { t: 'Contactados', n: vista.co },
          { t: 'Conversación', n: vista.cv },
          { t: 'Propuesta', n: vista.pp },
          { t: 'Clientes', n: vista.ci },
        ]}
      />
      {usaEjemplo ? <p className="mt-2 text-center text-xs text-slate-500">Números de ejemplo de Grano Norte. Cuando tu hoja tenga filas contactadas, el embudo usa las tuyas.</p> : null}
      {montado && r.filas > 0 ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Tu hoja hoy · {r.filas} filas</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-200 sm:grid-cols-4">
            {r.porEstado.map((x) => (
              <li key={x.e} className="flex justify-between gap-2">
                <span className="text-slate-400">{x.e}</span>
                <span className="font-mono">{x.n}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Subtitulo>Tu meta</Subtitulo>
      <label className="mt-3 block text-sm text-slate-300">
        Clientes nuevos que quieres al mes
        <input inputMode="numeric" value={montado ? (e.meta ?? '') : ''} placeholder="4" onChange={(ev) => setE((p) => ({ ...p, meta: ev.target.value }))} className={claseInput} />
      </label>
      {r.co ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <ul className="space-y-1 text-sm text-slate-200">
            {tasas.map((t) => (
              <li key={t.t} className="flex justify-between gap-3">
                <span>{t.t}</span>
                <span className="font-mono text-[#5fb2dd]">{pct(t.v)}</span>
              </li>
            ))}
          </ul>
          {r.necesarios ? (
            <p className="mt-3 text-white">
              Para {meta} {meta === 1 ? 'cliente nuevo' : 'clientes nuevos'} al mes necesitas escribirles a unas <strong>{r.necesarios} personas</strong>: <strong>{r.porSemana} por semana</strong>.
            </p>
          ) : (
            <p className="mt-3 text-sm text-slate-400">{r.ci === 0 ? 'Todavía no tienes clientes ganados desde la hoja: la cuenta aparece cuando el primero pase a «Cliente».' : 'Escribe tu meta para hacer la cuenta.'}</p>
          )}
          {debil && debil.v > 0 ? <p className="mt-2 text-sm text-slate-300">Tu piso más débil: {debil.t.toLowerCase()} ({pct(debil.v)}). Arregla ese primero.</p> : null}
          {r.co < 40 ? <p className="mt-2 text-xs text-slate-400">Con menos de 40 contactos los porcentajes todavía bailan mucho: tómalos como punto de partida y vuelve a mirarlos en un mes.</p> : null}
        </div>
      ) : null}
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mi embudo (.csv)"
          disabled={!montado || r.filas === 0}
          onClick={() =>
            descargarArchivo(
              'embudo.csv',
              armarCsv(
                ['Piso', 'Personas', 'Tasa de paso'],
                [
                  ['Contactados', r.co, ''],
                  ['Conversación', r.cv, pct(r.tc)],
                  ['Propuesta', r.pp, pct(r.tp)],
                  ['Clientes', r.ci, pct(r.tcierre)],
                  [],
                  r.porSemana ? [`Meta: ${meta} clientes al mes = escribir a ${r.porSemana} personas por semana`] : [],
                ],
              ),
              'text/csv',
            )
          }
        />
      </div>
    </>
  );
}

// ─── Cierre ────────────────────────────────────────────────────────────────

function Cierre() {
  const [filas] = useClientes();
  const [ideal] = useTextos(K.ideal);
  const [m] = useTextos(K.mensajes);
  const [p] = useTextos(K.propuesta);
  const [e] = useTextos(K.embudo);
  const montado = useMontado();
  const negocio = useNegocio();
  const lista = montado ? filas.filter(conDatos) : [];
  const conFecha = lista.filter((f) => f.fecha && f.proximo?.trim()).length;
  const abiertas = lista.filter((f) => f.estado === 'Propuesta');
  const meta = montado ? numero(e.meta) : 0;
  const r = calcularEmbudo(lista, meta);
  const embudoTexto = r.co ? `${r.co} contactados → ${r.cv} en conversación → ${r.pp} con propuesta → ${r.ci} clientes${r.porSemana ? `\nMeta: ${meta} al mes = escribir a ${r.porSemana} personas por semana` : ''}` : '';
  return (
    <CierreModulo
      numero={1}
      area="ventas"
      hoja="Clientes"
      pruebaReal={[
        { id: 'p1', texto: 'Día 1: 20 minutos con mi hoja Clientes.' },
        { id: 'p2', texto: 'Día 2: 20 minutos con mi hoja Clientes.' },
        { id: 'p3', texto: 'Día 3: 20 minutos con mi hoja Clientes.' },
        { id: 'p4', texto: 'Día 4: 20 minutos con mi hoja Clientes.' },
        { id: 'p5', texto: 'Día 5: 20 minutos con mi hoja Clientes.' },
        { id: 'p6', texto: 'Envié 1 propuesta de una página y la anoté con su monto y su fecha de seguimiento.' },
        { id: 'p7', texto: 'Al final de la semana, todas las filas tienen próximo paso y fecha (o están descartadas).' },
      ]}
      resumen={
        <>
          <FilaResumen etiqueta="A quién le vendes" valor={montado ? [ideal.rubro, ideal.senal].filter((x) => x?.trim()).join(' · ') : ''} leccion={1} />
          <FilaResumen etiqueta="Tu hoja Clientes" valor={lista.length ? `${lista.length} filas · ${conFecha} con próximo paso y fecha` : ''} leccion={1} />
          <FilaResumen etiqueta="Plantillas de mensajes" valor={montado ? `${['m0', 'm3', 'm7', 'm14'].filter((k) => m[k]?.trim()).length || ''}${['m0', 'm3', 'm7', 'm14'].some((k) => m[k]?.trim()) ? ' de 4 escritas' : ''}` : ''} leccion={2} />
          <FilaResumen etiqueta="Propuesta de una página" valor={montado ? (p.cliente ?? '').trim() : ''} leccion={3} />
          <FilaResumen etiqueta="Propuestas abiertas" valor={abiertas.length ? `${abiertas.length} · ${pesos(abiertas.reduce((s, f) => s + numero(f.monto), 0))}` : ''} leccion={4} />
          <FilaResumen etiqueta="Tu embudo" valor={embudoTexto} leccion={5} />
        </>
      }
      descargar={() =>
        descargarArchivo(
          'modulo-1-clientes-y-ventas.txt',
          armarTxt(
            'Módulo 1 · Clientes y ventas: tu primer CRM',
            [
              'A QUIÉN LE VENDES',
              ...CAMPOS_IDEAL.map((c) => `- ${c.etiqueta}: ${(ideal[c.id] ?? '').trim() || '(pendiente)'}`),
              '',
              `TU HOJA CLIENTES: ${lista.length} filas, ${conFecha} con próximo paso y fecha`,
              ...lista.map((f) => `- ${nombreDe(f)} · ${f.estado || 'Sin mensaje'} · ${f.proximo?.trim() || '(sin próximo paso)'} · ${legible(f.fecha ?? '') || '(sin fecha)'}`),
              '',
              'PLANTILLAS',
              ...CAMPOS_MENSAJES.map((c) => `- ${c.etiqueta}: ${(m[c.id] ?? '').trim() || '(pendiente)'}`),
              '',
              'PROPUESTAS ABIERTAS',
              ...(abiertas.length ? abiertas.map((f) => `- ${nombreDe(f)} · ${numero(f.monto) ? pesos(numero(f.monto)) : 'sin monto'} · seguimiento ${legible(f.fecha ?? '') || '(sin fecha)'}`) : ['(ninguna)']),
              '',
              'EMBUDO',
              embudoTexto || '(pendiente)',
              '',
              'RUTINA: 20 minutos cada día hábil, a la misma hora (5 mirar a quién le toca, 10 escribir, 5 anotar estado y fecha).',
              'WHATSAPP: solo a quien ya te conoce o te dio su número.',
              'NÚMERO SEMANAL: conversaciones nuevas y propuestas enviadas.',
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
    id: 'clientes',
    bajada: 'Una fila por cliente o posible cliente, con su estado, su próximo paso y la fecha. Si hiciste la Guía 1, traes tu lista; si no, partes con tus clientes de hoy.',
    portada: FOTOS.cafe,
    posicion: 'center 30%',
    contenido: <LeccionClientes />,
    checklist: [
      { id: 'l1a', texto: 'Armé mi hoja Clientes con al menos 10 filas.' },
      { id: 'l1b', texto: 'Cada fila tiene estado, próximo paso y fecha.' },
      { id: 'l1c', texto: 'Bloqueé 20 minutos diarios en mi calendario para revisarla.' },
    ],
  },
  {
    id: 'mensajes',
    bajada: 'El primer mensaje y tres seguimientos, con plantillas listas para adaptar. Por WhatsApp, solo a quien ya te conoce.',
    portada: APOYO.celularMensajes,
    posicion: 'center 45%',
    contenido: <LeccionMensajes />,
    checklist: [
      { id: 'l2a', texto: 'Escribí mis 4 plantillas.' },
      { id: 'l2b', texto: 'Cada una tiene máximo 3 frases y 1 pregunta.' },
      { id: 'l2c', texto: 'Le escribí a alguien de mi hoja y actualicé su fila.' },
    ],
  },
  {
    id: 'propuesta',
    bajada: 'Las 5 preguntas de la primera reunión y una propuesta de una página, que queda anotada en tu CRM con su monto.',
    portada: FOTOS.oficina,
    posicion: 'center 35%',
    contenido: <LeccionPropuesta />,
    checklist: [
      { id: 'l3a', texto: 'Guardé las 5 preguntas para mi próxima reunión.' },
      { id: 'l3b', texto: 'Armé una propuesta de una página.' },
      { id: 'l3c', texto: 'La anoté en mi hoja Clientes con su monto y su fecha.' },
    ],
  },
  {
    id: 'seguimiento',
    bajada: 'Nadie queda «esperando respuesta» sin fecha: cada propuesta tiene su próximo paso y tu hoja te muestra cuáles tocan hoy.',
    portada: APOYO.calendario,
    contenido: <LeccionSeguimiento />,
    checklist: [
      { id: 'l4a', texto: 'Todas mis propuestas abiertas tienen fecha de seguimiento.' },
      { id: 'l4b', texto: 'Hice hoy el seguimiento que tocaba y cambié la fecha al siguiente.' },
      { id: 'l4c', texto: 'Sé cuánta plata tengo en propuestas abiertas.' },
    ],
  },
  {
    id: 'embudo',
    bajada: 'Cuántos hay en cada estado, cuántos pasan al siguiente y tu meta semanal, contados desde tu hoja Clientes.',
    portada: FOTOS.analista,
    posicion: 'center 25%',
    contenido: <LeccionEmbudo />,
    checklist: [
      { id: 'l5a', texto: 'Revisé cuántas filas tengo en cada estado.' },
      { id: 'l5b', texto: 'Sé a cuántas personas tengo que escribirles por semana.' },
      { id: 'l5c', texto: 'Pasé mis filas a la hoja Clientes de mi planilla.' },
    ],
  },
];

export default function Modulo1Content() {
  return (
    <ModuloCurso
      numero={1}
      intro="Tu primer CRM: el lugar donde ves a todos tus clientes y en qué va cada uno. Al terminar tienes tu hoja Clientes con datos reales, tus mensajes de seguimiento, una propuesta de una página anotada con su monto y tu embudo contado desde la planilla."
      portada={APOYO.cafeteria}
      lecciones={LECCIONES}
      cierre={<Cierre />}
    />
  );
}

