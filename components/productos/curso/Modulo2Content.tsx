'use client';

/*
 * /curso/modulo-2 — Módulo 2 «Ventas y prospección: ningún seguimiento se cae».
 * 5 lecciones + cierre (prueba real, semáforo antes/después, entregable: planilla de embudo con datos reales).
 */

import { useState } from 'react';
import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { useMontado } from '@/lib/productos/curso/persistencia';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaEmbudo, DiagramaPropuestaUnaPagina, DiagramaRutina20, DiagramaSecuenciaSeguimiento } from '@/components/productos/diagramas/modulos';
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
  TablaEditable,
  armarCsv,
  armarIcs,
  armarTxt,
  claveModulo,
  descargarArchivo,
  fechaCorta,
  numero,
  sumarDias,
  useFilas,
  useNegocio,
  useTextos,
  type Campo,
  type LeccionDef,
} from './leccion';

const K = {
  ideal: claveModulo(2, 'ideal'),
  lista: claveModulo(2, 'lista'),
  mensajes: claveModulo(2, 'mensajes'),
  propuesta: claveModulo(2, 'propuesta'),
  propuestas: claveModulo(2, 'propuestas'),
  embudo: claveModulo(2, 'embudo'),
};

const claseInput =
  'mt-1.5 min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none';

// ─── Lección 1 · Cliente ideal y lista del día ────────────────────────────

const CAMPOS_IDEAL: Campo[] = [
  { id: 'rubro', etiqueta: 'Rubro', placeholder: 'Ej.: cafeterías de especialidad' },
  { id: 'tamano', etiqueta: 'Tamaño', placeholder: 'Ej.: 1 a 3 locales' },
  { id: 'donde', etiqueta: 'Dónde lo encuentras', placeholder: 'Ej.: Instagram, Google Maps, ferias' },
  { id: 'senal', etiqueta: 'La señal de que te necesita ahora', placeholder: 'Ej.: abrió hace poco o cambió su carta' },
  { id: 'decide', etiqueta: 'Quién decide la compra', placeholder: 'Ej.: el dueño o el jefe de barra' },
];

const EJEMPLO_IDEAL = {
  rubro: 'Cafeterías de especialidad y oficinas con cafetera propia',
  tamano: 'Cafeterías de 1 a 3 locales; oficinas de 15 a 80 personas',
  donde: 'Instagram, Google Maps y recomendaciones de clientes',
  senal: 'Abrió hace menos de 3 meses, cambió su carta o se queja de su proveedor',
  decide: 'El dueño (cafeterías) o administración (oficinas)',
};

const COLUMNAS_LISTA = [
  { id: 'nombre', etiqueta: 'Prospecto', placeholder: 'Nombre del negocio' },
  { id: 'senal', etiqueta: 'Señal', placeholder: 'Por qué ahora' },
  { id: 'proximo', etiqueta: 'Próximo contacto', tipo: 'fecha' as const },
  { id: 'canal', etiqueta: 'Canal', placeholder: 'WhatsApp, IG…' },
];

function LeccionIdeal() {
  const [ideal] = useTextos(K.ideal);
  const [lista] = useFilas(K.lista);
  const montado = useMontado();
  return (
    <>
      <Explica>
        <p>
          Si tus clientes nuevos llegan solo por recomendación, tus ventas dependen de la suerte. Para cambiarlo necesitas dos cosas: saber <strong>a quién</strong> buscas y una <strong>rutina corta</strong> que no se salte.
        </p>
        <p>
          Tu cliente ideal cabe en cinco datos. La rutina dura 20 minutos al día: buscas, escribes y anotas la fecha del próximo contacto. Si ya hiciste la Guía 1 de prospección, esto es un repaso: revisa tu ficha y pasa a la lección 2.
        </p>
      </Explica>
      <DiagramaRutina20 className="mt-6" />
      <Pantallita titulo="Grano Norte · cliente ideal" className="mt-6">
        <p className="text-sm">
          <strong>Cafeterías de 1 a 3 locales</strong> en Valparaíso y Viña, que abrieron hace menos de 3 meses o cambiaron su carta. Decide el dueño. Se encuentran en Instagram y Google Maps.
        </p>
        <p className="mt-2 text-sm text-slate-400">Primera lista: 10 cafeterías, 4 de ellas abiertas este año.</p>
      </Pantallita>
      <Subtitulo>1 · Tu cliente ideal en 5 datos</Subtitulo>
      <Campos clave={K.ideal} campos={CAMPOS_IDEAL} ejemplo={EJEMPLO_IDEAL} />
      <Subtitulo>2 · Tu lista del día</Subtitulo>
      <Instruccion>Anota 10 prospectos que calcen con tu ficha y la fecha en que les vas a escribir. Lo que no tiene fecha, no existe.</Instruccion>
      <TablaEditable clave={K.lista} columnas={COLUMNAS_LISTA} etiquetaFila="Prospecto" textoAgregar="Agregar prospecto" maxFilas={40} />
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar ficha y lista (.csv)"
          disabled={!montado || (!ideal.rubro?.trim() && lista.length === 0)}
          onClick={() =>
            descargarArchivo(
              'cliente-ideal-y-lista.csv',
              armarCsv(
                ['Prospecto', 'Señal', 'Canal', 'Próximo contacto', 'Estado'],
                [
                  ...lista.map((f) => [f.nombre ?? '', f.senal ?? '', f.canal ?? '', f.proximo ?? '', 'Por contactar']),
                  [],
                  ['CLIENTE IDEAL'],
                  ...CAMPOS_IDEAL.map((c) => [c.etiqueta, ideal[c.id] ?? '']),
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

// ─── Lección 2 · Primer mensaje y seguimientos ────────────────────────────

const CAMPOS_MENSAJES: Campo[] = [
  { id: 'm0', etiqueta: 'Primer mensaje (día 0)', ayuda: 'Por qué le escribes + qué le resuelves + una pregunta fácil.', filas: 3 },
  { id: 'm3', etiqueta: 'Seguimiento 1 (día 3)', ayuda: 'Una pregunta corta.', filas: 2 },
  { id: 'm7', etiqueta: 'Seguimiento 2 (día 7)', ayuda: 'Un dato, un caso o algo que le sirva.', filas: 3 },
  { id: 'm14', etiqueta: 'Cierre amable (día 14)', ayuda: 'Deja la puerta abierta.', filas: 2 },
];

const EJEMPLO_MENSAJES = {
  m0: 'Hola, {nombre}. Vi que {negocio} abrió hace poco en el cerro, ¡felicitaciones! Tostamos café cada semana para cafeterías de la zona. ¿Te puedo dejar una muestra el jueves?',
  m3: 'Hola, {nombre}, ¿alcanzaste a ver mi mensaje del lunes? La muestra sigue en pie.',
  m7: '{nombre}, te comparto algo útil: el café pierde buena parte de su aroma después de 4 semanas de tostado. Si quieres, te cuento cómo lo resolvieron otras cafeterías de la zona.',
  m14: 'Hola, {nombre}. No te escribo más para no molestar. Si más adelante quieres probar café fresco, aquí estoy. ¿Lo dejamos para más adelante?',
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
          La mayoría de las ventas no se cierran en el primer mensaje: se cierran en el segundo o en el tercero. El problema es que casi nadie los manda, porque escribir cada uno desde cero cansa.
        </p>
        <p>
          Por eso escribes <strong>cuatro plantillas una sola vez</strong>: el primer mensaje y tres seguimientos. La regla: máximo tres frases y <strong>una sola pregunta</strong>, fácil de contestar.
        </p>
      </Explica>
      <DiagramaSecuenciaSeguimiento className="mt-6" />
      <Pantallita titulo="Grano Norte · WhatsApp" className="mt-6">
        <p className="text-sm">«Hola, Ana. Vi que Café Mirador abrió hace poco en el cerro, ¡felicitaciones! Tostamos café cada semana para cafeterías de la zona. ¿Te puedo dejar una muestra el jueves?»</p>
        <p className="mt-2 text-sm text-slate-400">Tres frases, una pregunta, cero precios.</p>
      </Pantallita>
      <Subtitulo>Tus 4 plantillas</Subtitulo>
      <Instruccion>Usa {'{nombre}'} y {'{negocio}'} donde van los datos de cada prospecto.</Instruccion>
      <Campos clave={K.mensajes} campos={CAMPOS_MENSAJES} ejemplo={EJEMPLO_MENSAJES} />
      <Subtitulo>Pruébalas con un prospecto</Subtitulo>
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
  { id: 'plazo', etiqueta: 'Plazo o frecuencia', placeholder: 'Ej.: primera entrega en 5 días hábiles' },
  { id: 'siguiente', etiqueta: 'Siguiente paso con fecha', placeholder: 'Ej.: confirmar el lunes 16 para partir el 23' },
  { id: 'vigencia', etiqueta: 'Vigencia', placeholder: 'Ej.: 15 días' },
];

const EJEMPLO_PROPUESTA = {
  cliente: 'Estudio Sur · Paula, administración',
  problema: '«El café de la oficina se acaba a mitad de mes y nadie se acuerda de pedir.»',
  incluye: 'Café en grano o molido, entregado cada 2 semanas\nMolienda según su cafetera\nDespacho incluido en Valparaíso y Viña\nAviso 2 días antes de cada entrega',
  precio: '[precio por kilo según tu lista vigente]',
  plazo: 'Primera entrega 5 días hábiles después de confirmar',
  siguiente: 'Confirmar el lunes para entregar el martes de la semana siguiente',
  vigencia: '15 días',
};

function LeccionPropuesta() {
  const [p] = useTextos(K.propuesta);
  const negocio = useNegocio();
  const montado = useMontado();
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
  return (
    <>
      <Explica>
        <p>
          Una buena propuesta no se escribe en la oficina: se escribe en la <strong>primera reunión</strong>, haciendo las preguntas correctas. Son cinco:
        </p>
        <ListaCheck items={['¿Qué problema tienes hoy?', '¿Cuánto te cuesta ese problema (en plata, tiempo o clientes)?', '¿Qué has probado antes?', '¿Quién más decide?', '¿Para cuándo lo necesitas?']} />
        <p>
          Con esas respuestas armas una propuesta de <strong>una sola página</strong>. Si no cabe en una página, todavía no entiendes bien el problema o estás ofreciendo demasiado.
        </p>
      </Explica>
      <DiagramaPropuestaUnaPagina className="mt-6" />
      <FotoBanda foto={APOYO.salaReunion} posicion="center 55%" />
      <Subtitulo>Tu propuesta de una página</Subtitulo>
      <Instruccion>Parte desde el «plan oficina» de Grano Norte o desde una conversación real tuya.</Instruccion>
      <Campos clave={K.propuesta} campos={CAMPOS_PROPUESTA} ejemplo={EJEMPLO_PROPUESTA} />
      <Freno>El precio y el plazo los decides tú, con tu lista vigente. Un asistente te puede ayudar a redactar, nunca a comprometer un descuento o una fecha.</Freno>
      {lleno ? (
        <Pantallita titulo="Vista previa · 1 página" className="mt-6">
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">{lineas().join('\n')}</pre>
        </Pantallita>
      ) : null}
      <div className="mt-4">
        <BotonDescarga etiqueta="Descargar mi propuesta (.txt)" disabled={!lleno} onClick={() => descargarArchivo('propuesta-una-pagina.txt', armarTxt('Propuesta', lineas()))} />
      </div>
    </>
  );
}

// ─── Lección 4 · Seguimiento de propuestas ────────────────────────────────

const COLUMNAS_PROPUESTAS = [
  { id: 'cliente', etiqueta: 'Cliente', placeholder: 'A quién se la enviaste' },
  { id: 'enviada', etiqueta: 'Enviada el', tipo: 'fecha' as const },
  { id: 'estado', etiqueta: 'Estado', placeholder: 'Esperando, ganada, perdida' },
];

const DIAS_SEGUIMIENTO = [3, 7, 14];

function LeccionSeguimiento() {
  const [props] = useFilas(K.propuestas);
  const montado = useMontado();
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const abiertas = props.filter((f) => f.cliente?.trim() && f.enviada && !/ganad|perdid|cerrad/i.test(f.estado ?? ''));
  const proximos = abiertas
    .map((f) => {
      const fechas = DIAS_SEGUIMIENTO.map((d) => ({ d, f: sumarDias(f.enviada, d)! }));
      const prox = fechas.find((x) => x.f >= hoy);
      return { cliente: f.cliente, prox, fechas };
    })
    .sort((a, b) => (a.prox?.f.getTime() ?? Infinity) - (b.prox?.f.getTime() ?? Infinity));
  return (
    <>
      <Explica>
        <p>
          «Quedó en responderme». Esa frase, sin una fecha al lado, es una propuesta perdida. La regla es simple: <strong>cada propuesta nace con tres fechas de seguimiento</strong>, a los 3, 7 y 14 días.
        </p>
        <p>
          Ese día, el recordatorio te avisa y deja el mensaje listo en borrador: tú lo lees, lo ajustas y lo envías. Puede ser un recordatorio de tu calendario con el texto pegado o una tarea programada en tu asistente; lo importante es que la fecha exista.
        </p>
      </Explica>
      <DiagramaSecuenciaSeguimiento className="mt-6" dias={[0, 3, 7, 14]} etiquetas={['Envías la propuesta', '¿Alcanzaste a verla?', 'Un dato o caso útil', '¿Lo dejamos para más adelante?']} />
      <Pantallita titulo="Grano Norte · propuestas abiertas" className="mt-6">
        <ul className="space-y-1 text-sm">
          <li>Estudio Sur · enviada lun 2 · hoy toca el día 7</li>
          <li>Cowork Cerro · enviada jue 5 · día 3 el domingo</li>
          <li>Café Puerto · ganada el miércoles</li>
        </ul>
      </Pantallita>
      <Subtitulo>Tus propuestas abiertas</Subtitulo>
      <Instruccion>Anota las propuestas que enviaste. Calculamos los 3 seguimientos y puedes descargarlos a tu calendario.</Instruccion>
      <TablaEditable clave={K.propuestas} columnas={COLUMNAS_PROPUESTAS} etiquetaFila="Propuesta" textoAgregar="Agregar propuesta" />
      {montado && proximos.length > 0 ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Tus próximos seguimientos</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
            {proximos.map((x, i) => (
              <li key={i}>
                <strong className="text-white">{x.cliente}</strong> · {x.prox ? `día ${x.prox.d}: ${fechaCorta(x.prox.f)}` : 'pasaron los 14 días: márcala como ganada o perdida'}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Freno>Si en un seguimiento el cliente pide cambiar precio o plazo, ya no es un seguimiento: lo responde una persona.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar recordatorios (.ics)"
          disabled={!montado || abiertas.length === 0}
          onClick={() =>
            descargarArchivo(
              'seguimientos-propuestas.ics',
              armarIcs(
                abiertas.flatMap((f) =>
                  DIAS_SEGUIMIENTO.map((d) => ({
                    fecha: sumarDias(f.enviada, d)!,
                    titulo: `Seguimiento día ${d} · ${f.cliente}`,
                    detalle: d === 3 ? '¿Alcanzaste a ver la propuesta?' : d === 7 ? 'Comparte un dato o un caso que le sirva.' : 'Cierre amable: ¿lo dejamos para más adelante?',
                  })),
                ),
              ),
              'text/calendar',
            )
          }
        />
        <p className="mt-2 text-xs text-slate-500">El archivo .ics se abre con Google Calendar, Outlook o el calendario del celular.</p>
      </div>
    </>
  );
}

// ─── Lección 5 · Embudo ───────────────────────────────────────────────────

const EJEMPLO_EMBUDO = { prospectos: '80', conversaciones: '20', propuestas: '8', cierres: '3', meta: '4' };

function calcularEmbudo(e: Record<string, string>) {
  const pr = numero(e.prospectos);
  const co = numero(e.conversaciones);
  const pp = numero(e.propuestas);
  const ci = numero(e.cierres);
  const meta = numero(e.meta);
  const tasa = (a: number, b: number) => (a > 0 ? b / a : 0);
  const tc = tasa(pr, co);
  const tp = tasa(co, pp);
  const tcierre = tasa(pp, ci);
  const total = tc * tp * tcierre;
  const necesarios = total > 0 && meta > 0 ? Math.ceil(meta / total) : 0;
  return { pr, co, pp, ci, meta, tc, tp, tcierre, necesarios, porSemana: Math.ceil(necesarios / 4) };
}

const pct = (x: number) => `${Math.round(x * 100)} %`;

function LeccionEmbudo() {
  const [e, setE] = useTextos(K.embudo);
  const montado = useMontado();
  const datos = montado ? e : {};
  const r = calcularEmbudo(datos);
  const usaEjemplo = !r.pr;
  const vista = usaEjemplo ? calcularEmbudo(EJEMPLO_EMBUDO) : r;
  const tasas = [
    { t: 'Prospecto → conversación', v: r.tc },
    { t: 'Conversación → propuesta', v: r.tp },
    { t: 'Propuesta → cierre', v: r.tcierre },
  ];
  const debil = r.pr ? [...tasas].sort((a, b) => a.v - b.v)[0] : null;
  const campos = [
    { id: 'prospectos', t: 'Prospectos contactados' },
    { id: 'conversaciones', t: 'Conversaciones' },
    { id: 'propuestas', t: 'Propuestas enviadas' },
    { id: 'cierres', t: 'Cierres' },
  ];
  return (
    <>
      <Explica>
        <p>
          ¿Cuántos mensajes necesitas mandar para cerrar una venta? Si no lo sabes, no sabes cuánto esfuerzo poner cada semana. Tu embudo tiene cuatro pisos: <strong>prospecto → conversación → propuesta → cierre</strong>. Entre piso y piso hay una tasa de paso.
        </p>
        <p>Con esas tasas haces la cuenta al revés: si quieres cierto número de clientes nuevos al mes, sabes cuántos prospectos necesitas por semana. Y ves en qué piso se te cae más gente.</p>
      </Explica>
      <DiagramaEmbudo
        className="mt-6"
        pisos={[
          { t: 'Prospectos', n: vista.pr },
          { t: 'Conversaciones', n: vista.co },
          { t: 'Propuestas', n: vista.pp },
          { t: 'Cierres', n: vista.ci },
        ]}
      />
      {usaEjemplo ? <p className="mt-2 text-center text-xs text-slate-500">Números de un mes de Grano Norte. Pon los tuyos abajo y el embudo cambia.</p> : null}
      <Subtitulo>Tu calculadora</Subtitulo>
      <Instruccion>Usa los números del último mes (o de las últimas 4 semanas). Si no los tienes, estímalos y corrígelos con la planilla.</Instruccion>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {campos.map((c) => (
          <label key={c.id} className="block text-sm text-slate-300">
            {c.t}
            <input inputMode="numeric" value={datos[c.id] ?? ''} placeholder={EJEMPLO_EMBUDO[c.id as keyof typeof EJEMPLO_EMBUDO]} onChange={(ev) => setE((p) => ({ ...p, [c.id]: ev.target.value }))} className={claseInput} />
          </label>
        ))}
        <label className="col-span-2 block text-sm text-slate-300">
          Meta: clientes nuevos al mes
          <input inputMode="numeric" value={datos.meta ?? ''} placeholder="4" onChange={(ev) => setE((p) => ({ ...p, meta: ev.target.value }))} className={claseInput} />
        </label>
      </div>
      {r.pr ? (
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
              Para {r.meta} {r.meta === 1 ? 'cliente nuevo' : 'clientes nuevos'} al mes necesitas contactar unos <strong>{r.necesarios} prospectos</strong>: <strong>{r.porSemana} por semana</strong>.
            </p>
          ) : (
            <p className="mt-3 text-sm text-slate-400">Completa los 4 pisos y la meta para calcular cuántos prospectos necesitas.</p>
          )}
          {debil && debil.v > 0 ? <p className="mt-2 text-sm text-slate-300">Tu piso más débil: {debil.t.toLowerCase()} ({pct(debil.v)}). Arregla ese primero.</p> : null}
        </div>
      ) : null}
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar planilla de embudo (.csv)"
          onClick={() =>
            descargarArchivo(
              'embudo-semanal.csv',
              armarCsv(
                ['Semana', 'Prospectos', 'Conversaciones', 'Propuestas', 'Cierres', 'Prospecto→conversación', 'Conversación→propuesta', 'Propuesta→cierre'],
                [
                  r.pr ? ['Mes de referencia', r.pr, r.co, r.pp, r.ci, pct(r.tc), pct(r.tp), pct(r.tcierre)] : ['Mes de referencia', '', '', '', '', '', '', ''],
                  ...[1, 2, 3, 4].map((s) => [`Semana ${s}`, '', '', '', '', '', '', '']),
                  [],
                  ['Cómo calcular cada tasa: conversaciones ÷ prospectos · propuestas ÷ conversaciones · cierres ÷ propuestas'],
                  r.porSemana ? [`Meta: ${r.meta} clientes al mes = ${r.porSemana} prospectos por semana`] : [],
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
  const [ideal] = useTextos(K.ideal);
  const [lista] = useFilas(K.lista);
  const [m] = useTextos(K.mensajes);
  const [p] = useTextos(K.propuesta);
  const [props] = useFilas(K.propuestas);
  const [e] = useTextos(K.embudo);
  const montado = useMontado();
  const negocio = useNegocio();
  const r = calcularEmbudo(montado ? e : {});
  const embudoTexto = r.pr ? `${r.pr} prospectos → ${r.co} conversaciones → ${r.pp} propuestas → ${r.ci} cierres${r.porSemana ? `\nMeta: ${r.meta} al mes = ${r.porSemana} prospectos por semana` : ''}` : '';
  return (
    <CierreModulo
      numero={2}
      area="ventas"
      pruebaReal={[
        { id: 'p1', texto: 'Día 1: 20 minutos de rutina.' },
        { id: 'p2', texto: 'Día 2: 20 minutos de rutina.' },
        { id: 'p3', texto: 'Día 3: 20 minutos de rutina.' },
        { id: 'p4', texto: 'Día 4: 20 minutos de rutina.' },
        { id: 'p5', texto: 'Día 5: 20 minutos de rutina.' },
        { id: 'p6', texto: 'Envié 1 propuesta con el formato de una página y sus 3 fechas de seguimiento.' },
        { id: 'p7', texto: 'Anoté los números reales de la semana en la planilla de embudo.' },
      ]}
      resumen={
        <>
          <FilaResumen etiqueta="Cliente ideal" valor={montado ? [ideal.rubro, ideal.senal].filter((x) => x?.trim()).join(' · ') : ''} leccion={1} />
          <FilaResumen etiqueta="Lista de prospectos" valor={montado && lista.length ? `${lista.length} prospectos con fecha de contacto` : ''} leccion={1} />
          <FilaResumen etiqueta="Plantillas de mensajes" valor={montado ? `${['m0', 'm3', 'm7', 'm14'].filter((k) => m[k]?.trim()).length || ''}${['m0', 'm3', 'm7', 'm14'].some((k) => m[k]?.trim()) ? ' de 4 escritas' : ''}` : ''} leccion={2} />
          <FilaResumen etiqueta="Propuesta de una página" valor={montado ? (p.cliente ?? '').trim() : ''} leccion={3} />
          <FilaResumen etiqueta="Propuestas con seguimiento" valor={montado && props.length ? `${props.length} anotadas` : ''} leccion={4} />
          <FilaResumen etiqueta="Tu embudo" valor={montado ? embudoTexto : ''} leccion={5} />
        </>
      }
      descargar={() =>
        descargarArchivo(
          'modulo-2-ventas.txt',
          armarTxt(
            'Módulo 2 · Ventas y prospección',
            [
              'CLIENTE IDEAL',
              ...CAMPOS_IDEAL.map((c) => `- ${c.etiqueta}: ${(ideal[c.id] ?? '').trim() || '(pendiente)'}`),
              '',
              `LISTA DEL DÍA: ${lista.length} prospectos`,
              ...lista.map((f) => `- ${f.nombre ?? ''} · ${f.senal ?? ''} · próximo contacto ${f.proximo || '(sin fecha)'}`),
              '',
              'PLANTILLAS',
              ...CAMPOS_MENSAJES.map((c) => `- ${c.etiqueta}: ${(m[c.id] ?? '').trim() || '(pendiente)'}`),
              '',
              'PROPUESTAS ABIERTAS',
              ...props.map((f) => `- ${f.cliente ?? ''} · enviada ${f.enviada || '?'} · ${f.estado || 'esperando'}`),
              '',
              'EMBUDO',
              embudoTexto || '(pendiente)',
              '',
              'RUTINA DEL ÁREA: 20 minutos cada día hábil (5 buscar, 10 escribir, 5 anotar). Seguimientos de propuestas a los 3, 7 y 14 días.',
              'NÚMERO SEMANAL: conversaciones nuevas (y propuestas enviadas).',
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
    id: 'ideal',
    bajada: 'Tu cliente ideal en 5 datos y la lista del día con 20 minutos de rutina. Si ya hiciste la Guía 1, es un repaso.',
    portada: FOTOS.cafe,
    posicion: 'center 30%',
    contenido: <LeccionIdeal />,
    checklist: [
      { id: 'l1a', texto: 'Completé mi cliente ideal en 5 datos.' },
      { id: 'l1b', texto: 'Anoté 10 prospectos con fecha de contacto.' },
      { id: 'l1c', texto: 'Bloqueé 20 minutos diarios en mi calendario.' },
    ],
  },
  {
    id: 'mensajes',
    bajada: 'El primer mensaje y tres seguimientos, con plantillas listas para adaptar.',
    portada: APOYO.celularMensajes,
    posicion: 'center 45%',
    contenido: <LeccionMensajes />,
    checklist: [
      { id: 'l2a', texto: 'Escribí mis 4 plantillas.' },
      { id: 'l2b', texto: 'Cada una tiene máximo 3 frases y 1 pregunta.' },
      { id: 'l2c', texto: 'Envié el primer mensaje a un prospecto real.' },
    ],
  },
  {
    id: 'propuesta',
    bajada: 'Las 5 preguntas de la primera reunión y una propuesta de una página, con el «plan oficina» de Grano Norte como ejemplo.',
    portada: FOTOS.oficina,
    posicion: 'center 35%',
    contenido: <LeccionPropuesta />,
    checklist: [
      { id: 'l3a', texto: 'Guardé las 5 preguntas para mi próxima reunión.' },
      { id: 'l3b', texto: 'Armé una propuesta de una página.' },
      { id: 'l3c', texto: 'El precio y el plazo salen de mi lista vigente.' },
    ],
  },
  {
    id: 'seguimiento',
    bajada: 'Nadie queda «esperando respuesta» sin fecha: recordatorios a los 3, 7 y 14 días, con el mensaje en borrador.',
    portada: APOYO.calendario,
    contenido: <LeccionSeguimiento />,
    checklist: [
      { id: 'l4a', texto: 'Anoté mis propuestas abiertas.' },
      { id: 'l4b', texto: 'Cargué los recordatorios en mi calendario.' },
      { id: 'l4c', texto: 'Hice hoy el seguimiento que tocaba.' },
    ],
  },
  {
    id: 'embudo',
    bajada: 'Prospecto → conversación → propuesta → cierre, con tasas de paso y la meta semanal.',
    portada: FOTOS.analista,
    posicion: 'center 25%',
    contenido: <LeccionEmbudo />,
    checklist: [
      { id: 'l5a', texto: 'Puse mis números en la calculadora.' },
      { id: 'l5b', texto: 'Sé cuántos prospectos necesito por semana.' },
      { id: 'l5c', texto: 'Descargué la planilla y la dejé en mi carpeta.' },
    ],
  },
];

export default function Modulo2Content() {
  return (
    <ModuloCurso
      numero={2}
      intro="Ningún seguimiento se cae. Al terminar tienes tu cliente ideal, la lista del día, tus mensajes de seguimiento, una propuesta de una página y tu embudo en una planilla con datos reales."
      portada={APOYO.cafeteria}
      lecciones={LECCIONES}
      cierre={<Cierre />}
    />
  );
}
