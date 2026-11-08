'use client';

/*
 * /curso/modulo-1 — Módulo 1 «Marketing: que te encuentren y te escriban».
 * 5 lecciones + cierre (prueba real, semáforo antes/después, entregable: frase + 3 temas + calendario de 4 semanas).
 */

import { APOYO } from '@/lib/productos/apoyo';
import { FOTOS } from '@/lib/productos/fotos';
import { useMontado } from '@/lib/productos/curso/persistencia';
import { Pantallita } from '@/components/productos/Pantallita';
import { DiagramaDerivarComentario, DiagramaFrase, DiagramaNumerosQueImportan, DiagramaTresTemas, DiagramaUnaIdeaCincoPiezas } from '@/components/productos/diagramas/modulos';
import {
  BloqueCopiar,
  BotonDescarga,
  Campos,
  CierreModulo,
  Clasificador,
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
  type LeccionDef,
} from './leccion';

const K = {
  frase: claveModulo(1, 'frase'),
  temas: claveModulo(1, 'temas'),
  semana: claveModulo(1, 'semana'),
  clasificar: claveModulo(1, 'clasificar'),
  plantillas: claveModulo(1, 'plantillas'),
  piezas: claveModulo(1, 'piezas'),
};

const DIAS = [
  { d: 'Lunes', p: 'Post' },
  { d: 'Martes', p: 'Historia' },
  { d: 'Miércoles', p: 'Carrusel' },
  { d: 'Jueves', p: 'Reel con guion' },
  { d: 'Viernes', p: 'Correo a clientes' },
];

// ─── Lección 1 · Frase ─────────────────────────────────────────────────────

function useFraseElegida() {
  const [f] = useTextos(K.frase);
  const id = f.elegida || 'v1';
  return (f[id] ?? '').trim();
}

function LeccionFrase() {
  const [f, setF] = useTextos(K.frase);
  const montado = useMontado();
  const elegida = montado ? f.elegida || 'v1' : 'v1';
  const versiones = ['v1', 'v2', 'v3'];
  return (
    <>
      <Explica>
        <p>
          Cuando alguien te pregunta qué hace tu negocio y te demoras un minuto en explicarlo, tu cliente también se demora en entenderlo. Y si no lo entiende en tres segundos, sigue de largo.
        </p>
        <p>
          Tu mensaje cabe en una frase con tres piezas: <strong>para quién</strong>, <strong>el problema que tiene</strong> y <strong>el resultado que logra contigo</strong>. No describe lo que haces: describe lo que cambia para tu cliente.
        </p>
      </Explica>
      <DiagramaFrase className="mt-6" />
      <Pantallita titulo="Grano Norte · 3 versiones" className="mt-6">
        <ol className="space-y-2 text-sm">
          <li>
            <span className="font-semibold">1.</span> «Tostamos café de especialidad en Valparaíso». <span className="text-slate-400">Habla de Camila, no del cliente.</span>
          </li>
          <li>
            <span className="font-semibold">2.</span> «El mejor café para tu negocio». <span className="text-slate-400">No dice para quién ni qué resuelve.</span>
          </li>
          <li>
            <span className="font-semibold">3.</span> «Café fresco cada semana para cafeterías de la región, sin quedarte nunca sin stock». <span className="text-slate-400">Elegida: nombra a alguien y promete algo que se ve.</span>
          </li>
        </ol>
      </Pantallita>

      <Subtitulo>Escribe tus 3 versiones y elige una</Subtitulo>
      <Instruccion>No busques la perfecta: escribe rápido tres maneras distintas de decirlo y después elige.</Instruccion>
      <div className="mt-4 space-y-3">
        {versiones.map((v, i) => (
          <div key={v} className={`rounded-xl border p-3 transition ${elegida === v ? 'border-[#5fb2dd]/70 bg-[#2175a1]/10' : 'border-white/10 bg-white/[0.02]'}`}>
            <label className="block text-sm text-slate-300">
              <span className="font-medium text-slate-200">Versión {i + 1}</span>
              <textarea
                rows={2}
                value={f[v] ?? ''}
                onChange={(e) => setF((p) => ({ ...p, [v]: e.target.value }))}
                placeholder={i === 0 ? 'Para quién + su problema + el resultado' : 'Otra forma de decirlo'}
                className="mt-1.5 w-full resize-y rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none"
              />
            </label>
            <button
              type="button"
              role="radio"
              aria-checked={elegida === v}
              onClick={() => setF((p) => ({ ...p, elegida: v }))}
              className={`mt-2 inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-sm ${elegida === v ? 'border-[#5fb2dd] bg-[#2175a1] text-white' : 'border-white/15 text-slate-300 hover:border-white/30'}`}
            >
              {elegida === v ? 'Elegida' : 'Elegir esta'}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 p-4">
        <p className="text-sm font-medium text-white">Antes de quedarte con una, revisa:</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-300">
          <li>· ¿La entendería tu cliente sin que le expliques nada?</li>
          <li>· ¿Nombra a alguien concreto (no «todos»)?</li>
          <li>· ¿Promete un resultado que se puede ver?</li>
        </ul>
      </div>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis 3 versiones (.txt)"
          disabled={!montado || !versiones.some((v) => f[v]?.trim())}
          onClick={() =>
            descargarArchivo(
              'mi-frase.txt',
              armarTxt('Tu mensaje en una frase', [
                'ELEGIDA',
                (f[elegida] ?? '').trim() || '(sin escribir)',
                '',
                'VERSIONES',
                ...versiones.map((v, i) => `${i + 1}. ${(f[v] ?? '').trim() || '(sin escribir)'}`),
                '',
                'Fórmula: para quién + su problema + el resultado.',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 2 · 3 temas ───────────────────────────────────────────────────

const CAMPOS_TEMAS: Campo[] = [
  { id: 't1', etiqueta: 'Tema 1 · Lo que tu cliente quiere aprender', placeholder: 'Ej.: cómo elegir café para tu cafetería' },
  { id: 'i1', etiqueta: '3 ideas del tema 1', filas: 3, placeholder: 'Una idea por línea' },
  { id: 't2', etiqueta: 'Tema 2 · Lo que te diferencia', placeholder: 'Ej.: tostado fresco vs. café de supermercado' },
  { id: 'i2', etiqueta: '3 ideas del tema 2', filas: 3, placeholder: 'Una idea por línea' },
  { id: 't3', etiqueta: 'Tema 3 · La prueba (casos, clientes, resultados)', placeholder: 'Ej.: cafeterías que se cambiaron' },
  { id: 'i3', etiqueta: '3 ideas del tema 3', filas: 3, placeholder: 'Una idea por línea' },
];

const EJEMPLO_TEMAS = {
  t1: 'Cómo elegir café para tu cafetería',
  i1: 'Grano o molido: qué conviene según tu máquina\nCuánto café necesitas por semana\n3 preguntas para hacerle a tu proveedor',
  t2: 'Tostado fresco vs. café de supermercado',
  i2: 'Cómo leer la fecha de tostado\nPor qué el café pierde sabor después de 4 semanas\nUn día en la tostadora',
  t3: 'Cafeterías que se cambiaron',
  i3: 'Café Puerto: qué notaron sus clientes\nCuánto bajaron los reclamos por sabor\nAntes y después de la carta de una cafetería',
};

function LeccionTemas() {
  const [t] = useTextos(K.temas);
  const montado = useMontado();
  return (
    <>
      <Explica>
        <p>
          Si cada vez que te sientas a publicar no sabes de qué hablar, no te falta creatividad: te faltan <strong>temas fijos</strong>. Todo lo que publicas sale de tres:
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            <strong>Lo que tu cliente quiere aprender.</strong> Sus dudas antes de comprar.
          </li>
          <li>
            <strong>Lo que te diferencia.</strong> Por qué tú y no la alternativa de siempre.
          </li>
          <li>
            <strong>La prueba.</strong> Casos, clientes y resultados que muestran que funciona.
          </li>
        </ol>
        <p>De cada tema salen tres ideas. Con eso tienes nueve publicaciones antes de empezar.</p>
      </Explica>
      <DiagramaTresTemas className="mt-6" />
      <FotoBanda foto={APOYO.granoCuchara} posicion="center 55%" />
      <Subtitulo>Tus 3 temas y tus 9 ideas</Subtitulo>
      <Campos clave={K.temas} campos={CAMPOS_TEMAS} ejemplo={EJEMPLO_TEMAS} />
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis temas (.txt)"
          disabled={!montado || !t.t1?.trim()}
          onClick={() =>
            descargarArchivo(
              'mis-3-temas.txt',
              armarTxt(
                'Tus 3 temas',
                [1, 2, 3].flatMap((n) => [`TEMA ${n}: ${(t[`t${n}`] ?? '').trim() || '(sin escribir)'}`, ...(t[`i${n}`] ?? '').split('\n').filter(Boolean).map((x) => `  - ${x.trim()}`), '']),
              ),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 3 · Semana de contenido ──────────────────────────────────────

function LeccionSemana() {
  const [s, setS] = useTextos(K.semana);
  const [temas] = useTextos(K.temas);
  const frase = useFraseElegida();
  const negocio = useNegocio();
  const montado = useMontado();
  const idea = (s.idea ?? '').trim();
  const prompt = [
    `Eres el asistente de contenido de ${negocio.trim() || '[mi negocio]'}.`,
    `Nuestro mensaje: ${frase || '[tu frase de la lección 1]'}`,
    `Nuestros temas: ${[temas.t1, temas.t2, temas.t3].filter((x) => x?.trim()).join(' · ') || '[tus 3 temas de la lección 2]'}`,
    '',
    `Con esta idea: «${idea || '[la idea de la semana]'}», prepara 5 borradores:`,
    '1. Un post para Instagram o LinkedIn (máximo 120 palabras, una sola pregunta al final).',
    '2. Una historia de 3 pantallas (texto corto por pantalla).',
    '3. Un carrusel de 6 láminas (título + una frase por lámina).',
    '4. El guion de un reel de 30 segundos (gancho, 3 ideas, cierre).',
    '5. Un correo corto para clientes (asunto + 4 líneas).',
    '',
    'Usa español de Chile, tuteo, frases cortas y sin promesas de precio ni de plazos.',
    'Son borradores: una persona los revisa antes de publicar.',
  ].join('\n');
  const semanas = [1, 2, 3, 4];
  return (
    <>
      <Explica>
        <p>
          Publicar todos los días no significa pensar todos los días. <strong>Una idea bien pensada te da la semana completa</strong>: la conviertes en cinco piezas y las repartes de lunes a viernes.
        </p>
        <p>
          El borrador lo puede preparar un asistente como ChatGPT o Claude. Tú le das tu frase, tus temas y la idea; él te devuelve las cinco piezas y tú las ajustas. Una tarde al mes y tienes cuatro semanas listas.
        </p>
      </Explica>
      <DiagramaUnaIdeaCincoPiezas className="mt-6" />
      <Pantallita titulo="Grano Norte · semana 2" className="mt-6">
        <p className="text-sm font-semibold">Idea: «Cómo saber si tu café está fresco»</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>Lun · Post: «Tu café tiene fecha de tostado. ¿La has mirado?»</li>
          <li>Mar · Historia: foto de la etiqueta con la fecha marcada</li>
          <li>Mié · Carrusel: 5 señales de un café añejo</li>
          <li>Jue · Reel: Pedro tostando, «de la tostadora a tu barra en 48 horas»</li>
          <li>Vie · Correo a cafeterías: «¿Cuántos días tiene el café que sirves hoy?»</li>
        </ul>
      </Pantallita>

      <Subtitulo>1 · Tu prompt para la semana</Subtitulo>
      <Instruccion>Escribe la idea. El prompt se arma con tu frase y tus temas de las lecciones anteriores; cópialo en ChatGPT o Claude.</Instruccion>
      <label className="mt-3 block text-sm text-slate-300">
        <span className="font-medium text-slate-200">La idea de esta semana</span>
        <input
          value={s.idea ?? ''}
          onChange={(e) => setS((p) => ({ ...p, idea: e.target.value }))}
          placeholder="Ej.: cómo saber si tu café está fresco"
          className="mt-1.5 min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none"
        />
      </label>
      <BloqueCopiar titulo="Prompt · 5 piezas de una idea" texto={montado ? prompt : ''} nota="Funciona en ChatGPT, Claude o Gemini. Revisa cada pieza antes de publicarla." />
      <Freno>Nada se publica a nombre del negocio sin que una persona lo lea. El asistente prepara, tú decides (es la regla 15 de tus frenos).</Freno>

      <Subtitulo>2 · Tu calendario de 4 semanas</Subtitulo>
      <Instruccion>Una idea por semana, idealmente rotando tus 3 temas. Al descargar, se arma el calendario con las 5 piezas de cada semana para abrir en Google Sheets o Excel.</Instruccion>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {semanas.map((n) => (
          <label key={n} className="block rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-slate-300">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">Semana {n}</span>
            <input
              value={s[`s${n}`] ?? ''}
              onChange={(e) => setS((p) => ({ ...p, [`s${n}`]: e.target.value }))}
              placeholder={n === 1 ? temas.t1 || 'Idea de la semana' : 'Idea de la semana'}
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 text-[15px] text-slate-100 placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none"
            />
          </label>
        ))}
      </div>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar calendario (.csv)"
          disabled={!montado || !semanas.some((n) => s[`s${n}`]?.trim())}
          onClick={() =>
            descargarArchivo(
              'calendario-4-semanas.csv',
              armarCsv(
                ['Semana', 'Día', 'Pieza', 'Idea', 'Estado'],
                semanas.flatMap((n) => DIAS.map((d) => [n, d.d, d.p, (s[`s${n}`] ?? '').trim(), 'Por preparar'])),
              ),
              'text/csv',
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 4 · Comentarios y mensajes ───────────────────────────────────

const CATEGORIAS_COMENTARIO = [
  { id: 'plantilla', etiqueta: 'Plantilla' },
  { id: 'ventas', etiqueta: 'Pasa a ventas' },
  { id: 'persona', etiqueta: 'Una persona' },
];

const ITEMS_COMENTARIO = [
  { id: 'c1', texto: '«¿Qué horario tienen para retirar?»', correcta: 'plantilla', porque: 'Se repite y tiene una respuesta fija.' },
  { id: 'c2', texto: '«¿Venden por mayor? Tengo una cafetería en Viña.»', correcta: 'ventas', porque: 'Es un posible cliente: se le agradece y ventas le escribe por interno hoy mismo.' },
  { id: 'c3', texto: '«Me llegó el pedido incompleto y nadie me responde.»', correcta: 'persona', porque: 'Es un reclamo, y además en público. Lo toma una persona, siempre.' },
  { id: 'c4', texto: '«¡Qué rico se ve! ¿Es el mismo que sirven en Café Puerto?»', correcta: 'plantilla', porque: 'Se agradece con tu tono; si quiere comprar, después se deriva.' },
  { id: 'c5', texto: '«¿Me pueden cotizar 20 kilos al mes para mi oficina?»', correcta: 'ventas', porque: 'Pide una cotización: pasa a ventas con nombre y contacto.' },
  { id: 'c6', texto: '«Si me hacen 30 % de descuento les compro todos los meses.»', correcta: 'persona', porque: 'Un precio especial es una regla de freno: lo decide una persona.' },
];

const CAMPOS_PLANTILLAS: Campo[] = [
  { id: 'gracias', etiqueta: 'Agradecer un comentario', filas: 2 },
  { id: 'repetida', etiqueta: 'Responder una pregunta que se repite (horario, despacho, cómo comprar)', filas: 2 },
  { id: 'interno', etiqueta: 'Pasar a interno a alguien que quiere comprar', filas: 2 },
  { id: 'reclamo', etiqueta: 'Responder en público un reclamo (y llevarlo a interno)', filas: 2 },
];

const EJEMPLO_PLANTILLAS = {
  gracias: '¡Gracias, [nombre]! Lo tostamos el martes, así que está en su mejor momento.',
  repetida: 'Hola, [nombre]: despachamos de lunes a viernes en Valparaíso y Viña. Te dejo el detalle por interno.',
  interno: '¡Qué bueno, [nombre]! Te escribo por interno para conocer tu cafetería y contarte cómo trabajamos con locales.',
  reclamo: 'Hola, [nombre]. Lamentamos lo del pedido; ya te escribimos por interno para resolverlo hoy.',
};

function LeccionComentarios() {
  const [pl] = useTextos(K.plantillas);
  const montado = useMontado();
  return (
    <>
      <Explica>
        <p>
          Un comentario sin respuesta es una venta que se enfría. Pero no todos se responden igual: algunos se contestan con una plantilla, otros tienen que pasar a ventas el mismo día y otros los ve siempre una persona.
        </p>
        <p>
          Tus plantillas suenan como tú: <strong>cortas, cercanas y con una sola pregunta</strong>. Y una regla para no perder clientes: quien pregunta por precio o por compras grandes se lleva a interno ese mismo día, sin precios en público.
        </p>
      </Explica>
      <DiagramaDerivarComentario className="mt-6" />
      <FotoBanda foto={APOYO.celularMensajes} posicion="center 40%" />
      <Subtitulo>Práctica: ¿qué hacer con cada uno?</Subtitulo>
      <Instruccion>Seis comentarios de una semana de Grano Norte. Elige qué harías con cada uno.</Instruccion>
      <Clasificador clave={K.clasificar} categorias={CATEGORIAS_COMENTARIO} items={ITEMS_COMENTARIO} />
      <Subtitulo>Tus 4 plantillas</Subtitulo>
      <Instruccion>Escríbelas como hablas. Deja [nombre] donde va el nombre de la persona.</Instruccion>
      <Campos clave={K.plantillas} campos={CAMPOS_PLANTILLAS} ejemplo={EJEMPLO_PLANTILLAS} />
      <Freno>Precios especiales, descuentos y reclamos no se resuelven en un comentario: pasan a una persona, por interno, el mismo día.</Freno>
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar mis plantillas (.txt)"
          disabled={!montado || !CAMPOS_PLANTILLAS.some((c) => pl[c.id]?.trim())}
          onClick={() =>
            descargarArchivo(
              'plantillas-comentarios.txt',
              armarTxt('Plantillas de comentarios y mensajes', [
                ...CAMPOS_PLANTILLAS.flatMap((c) => [c.etiqueta.toUpperCase(), (pl[c.id] ?? '').trim() || '(sin escribir)', '']),
                'REGLA: quien quiere comprar o cotizar pasa a ventas el mismo día. Reclamos y precios especiales: siempre una persona.',
              ]),
            )
          }
        />
      </div>
    </>
  );
}

// ─── Lección 5 · Qué pieza trae clientes ──────────────────────────────────

const COLUMNAS_PIEZAS = [
  { id: 'pieza', etiqueta: 'Pieza', placeholder: 'Ej.: carrusel tostado fresco' },
  { id: 'mensajes', etiqueta: 'Mensajes', tipo: 'numero' as const, placeholder: '0' },
  { id: 'reuniones', etiqueta: 'Reuniones o cotizaciones', tipo: 'numero' as const, placeholder: '0' },
  { id: 'ventas', etiqueta: 'Ventas', tipo: 'numero' as const, placeholder: '0' },
];

const EJEMPLO_PIEZAS = [
  { pieza: 'Reel: de la tostadora a tu barra', mensajes: '3', reuniones: '0', ventas: '0' },
  { pieza: 'Carrusel: 5 señales de café añejo', mensajes: '9', reuniones: '2', ventas: '1' },
  { pieza: 'Correo: ¿cuántos días tiene tu café?', mensajes: '4', reuniones: '1', ventas: '0' },
];

function LeccionMedir() {
  const [filas] = useFilas(K.piezas);
  const montado = useMontado();
  const ranking = [...filas]
    .filter((f) => f.pieza?.trim())
    .sort((a, b) => numero(b.ventas) - numero(a.ventas) || numero(b.reuniones) - numero(a.reuniones) || numero(b.mensajes) - numero(a.mensajes));
  const top = montado ? ranking[0] : undefined;
  return (
    <>
      <Explica>
        <p>
          Mil reproducciones se sienten bien, pero no pagan las cuentas. El alcance no te dice si una pieza trae clientes. Mide <strong>tres números por pieza</strong>: cuántos mensajes generó, cuántas reuniones o cotizaciones y cuántas ventas.
        </p>
        <p>Te toma diez minutos el viernes: anotas los números y eliges qué repetir la semana siguiente.</p>
      </Explica>
      <DiagramaNumerosQueImportan className="mt-6" />
      <Pantallita titulo="Grano Norte · planilla semana 2" className="mt-6">
        <ul className="space-y-1.5 text-sm">
          <li>Reel: 2.400 reproducciones · 3 mensajes · 0 reuniones</li>
          <li>
            <strong>Carrusel: 600 alcance · 9 mensajes · 2 reuniones · 1 venta</strong>
          </li>
          <li>Correo: 4 respuestas · 1 reunión</li>
        </ul>
        <p className="mt-2 text-sm text-slate-400">El carrusel tuvo menos alcance, pero es el que hay que repetir.</p>
      </Pantallita>
      <Subtitulo>Tu planilla de la semana</Subtitulo>
      <Instruccion>Anota cada pieza que publicaste y sus 3 números. La planilla te dice cuál trae más clientes.</Instruccion>
      <TablaEditable clave={K.piezas} columnas={COLUMNAS_PIEZAS} ejemplo={EJEMPLO_PIEZAS} etiquetaFila="Pieza" textoAgregar="Agregar pieza" />
      {top ? (
        <div className="mt-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">La pieza que más trae</p>
          <p className="mt-1 text-white">{top.pieza}</p>
          <p className="text-sm text-slate-300">
            {numero(top.mensajes)} mensajes · {numero(top.reuniones)} reuniones · {numero(top.ventas)} ventas. Repite su formato o su tema la próxima semana.
          </p>
        </div>
      ) : null}
      <div className="mt-4">
        <BotonDescarga
          etiqueta="Descargar planilla semanal (.csv)"
          onClick={() =>
            descargarArchivo(
              'planilla-contenido-semanal.csv',
              armarCsv(
                ['Semana', 'Pieza', 'Mensajes', 'Reuniones o cotizaciones', 'Ventas'],
                (filas.length ? filas : [{ pieza: '', mensajes: '', reuniones: '', ventas: '' }]).map((f) => ['1', f.pieza ?? '', f.mensajes ?? '', f.reuniones ?? '', f.ventas ?? '']),
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
  const [f] = useTextos(K.frase);
  const [t] = useTextos(K.temas);
  const [s] = useTextos(K.semana);
  const montado = useMontado();
  const negocio = useNegocio();
  const frase = montado ? (f[f.elegida || 'v1'] ?? '').trim() : '';
  const temas = montado ? [t.t1, t.t2, t.t3].filter((x) => x?.trim()) : [];
  const semanas = montado ? [1, 2, 3, 4].map((n) => (s[`s${n}`] ?? '').trim()) : [];
  return (
    <CierreModulo
      numero={1}
      area="marketing"
      pruebaReal={[
        { id: 'p1', texto: 'Publiqué el post del lunes.' },
        { id: 'p2', texto: 'Publiqué la historia del martes.' },
        { id: 'p3', texto: 'Publiqué el carrusel del miércoles.' },
        { id: 'p4', texto: 'Publiqué el reel del jueves.' },
        { id: 'p5', texto: 'Envié el correo del viernes.' },
        { id: 'p6', texto: 'El viernes anoté mensajes, reuniones y ventas de cada pieza.' },
      ]}
      resumen={
        <>
          <FilaResumen etiqueta="Tu frase" valor={frase} leccion={1} />
          <FilaResumen etiqueta="Tus 3 temas" valor={temas.length ? temas.map((x, i) => `${i + 1}. ${x}`).join('\n') : ''} leccion={2} />
          <FilaResumen etiqueta="Calendario de 4 semanas" valor={semanas.some(Boolean) ? semanas.map((x, i) => `Semana ${i + 1}: ${x || '—'}`).join('\n') : ''} leccion={3} />
        </>
      }
      descargar={() =>
        descargarArchivo(
          'modulo-1-marketing.txt',
          armarTxt(
            'Módulo 1 · Marketing',
            [
              'TU FRASE',
              frase || '(pendiente)',
              '',
              'TUS 3 TEMAS',
              ...[1, 2, 3].flatMap((n) => [`${n}. ${(t[`t${n}`] ?? '').trim() || '(pendiente)'}`, ...(t[`i${n}`] ?? '').split('\n').filter(Boolean).map((x) => `   - ${x.trim()}`)]),
              '',
              'CALENDARIO DE 4 SEMANAS (lunes post · martes historia · miércoles carrusel · jueves reel · viernes correo)',
              ...semanas.map((x, i) => `Semana ${i + 1}: ${x || '(pendiente)'}`),
              '',
              'RUTINA DEL ÁREA: una tarde al mes preparas 4 ideas; cada viernes, 10 minutos para anotar mensajes, reuniones y ventas por pieza.',
              'NÚMERO SEMANAL: mensajes de clientes que llegaron por el contenido.',
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
    id: 'frase',
    bajada: 'Problema que resuelves + para quién + resultado. Escribes 3 versiones y eliges la que mejor se entiende.',
    portada: FOTOS.explicando,
    posicion: 'center 25%',
    contenido: <LeccionFrase />,
    checklist: [
      { id: 'l1a', texto: 'Escribí 3 versiones de mi frase.' },
      { id: 'l1b', texto: 'Elegí una y la revisé con las 3 preguntas.' },
      { id: 'l1c', texto: 'Se la leí a alguien de mi equipo o a un cliente.' },
    ],
  },
  {
    id: 'temas',
    bajada: 'Lo que tu cliente quiere aprender, lo que te diferencia y la prueba. De cada tema salen 3 ideas.',
    portada: APOYO.contenidoTripode,
    contenido: <LeccionTemas />,
    checklist: [
      { id: 'l2a', texto: 'Escribí mis 3 temas.' },
      { id: 'l2b', texto: 'Anoté 3 ideas por tema (9 en total).' },
      { id: 'l2c', texto: 'Descargué mis temas.' },
    ],
  },
  {
    id: 'semana',
    bajada: 'De una idea a 5 piezas: post, historia, carrusel, reel con guion y correo. Con el prompt listo y tu calendario de 4 semanas.',
    portada: FOTOS.tutorial,
    posicion: 'center 35%',
    contenido: <LeccionSemana />,
    checklist: [
      { id: 'l3a', texto: 'Usé el prompt con una idea y revisé las 5 piezas.' },
      { id: 'l3b', texto: 'Anoté una idea para cada una de las 4 semanas.' },
      { id: 'l3c', texto: 'Descargué el calendario y lo abrí en mi planilla.' },
    ],
  },
  {
    id: 'comentarios',
    bajada: 'Plantillas con tu tono para comentarios y mensajes, y la regla para pasar a ventas lo que puede ser un cliente.',
    portada: APOYO.celularMensajes,
    posicion: 'center 40%',
    contenido: <LeccionComentarios />,
    checklist: [
      { id: 'l4a', texto: 'Hice la práctica de los 6 comentarios.' },
      { id: 'l4b', texto: 'Escribí mis 4 plantillas.' },
      { id: 'l4c', texto: 'Le expliqué a mi equipo qué pasa a ventas y qué a una persona.' },
    ],
  },
  {
    id: 'medir',
    bajada: 'Alcance no; mensajes, reuniones y ventas sí. Una planilla semanal de 10 minutos que te dice qué repetir.',
    portada: APOYO.tableroLaptop,
    contenido: <LeccionMedir />,
    checklist: [
      { id: 'l5a', texto: 'Anoté mis piezas de la última semana con sus 3 números.' },
      { id: 'l5b', texto: 'Identifiqué la pieza que más trae.' },
      { id: 'l5c', texto: 'Agendé 10 minutos los viernes para la planilla.' },
    ],
  },
];

export default function Modulo1Content() {
  return (
    <ModuloCurso
      numero={1}
      intro="Que te encuentren y te escriban. Al terminar tienes tu mensaje en una frase, tus 3 temas, un calendario de 4 semanas y la planilla que te dice qué pieza trae clientes."
      portada={APOYO.contenidoTripode}
      lecciones={LECCIONES}
      cierre={<Cierre />}
    />
  );
}
