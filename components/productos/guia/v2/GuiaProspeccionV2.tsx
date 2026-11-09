'use client';

import { useEffect } from 'react';
import {
  ALIMENTAR_LISTA,
  ASI_NO,
  ASI_SI,
  CUADERNO,
  EJEMPLOS_RUBRO,
  ENTREGABLE,
  ESCENAS,
  GUIA,
  GUION_VIDEO_2,
  INSIGHTS,
  PARTES,
  PLATAFORMAS,
  PROMPTS,
  SEGUIMIENTO_COTIZACION,
  SEGUIMIENTOS,
} from '@/lib/productos/guia/contenido-v2';
import { LINKS } from '@/lib/productos/links';
import { CONTEO_EVIDENCIA, REVISION_EVIDENCIA } from '@/lib/productos/guia/evidencia-resumen';
import { calcularRuta, type Ruta } from '@/lib/productos/guia/ruta';
import { filaConDatos, parteCompleta, useProgreso, type Vista } from '@/lib/productos/guia/progreso-v2';
import { Bloque, Checklist, ConsejoAlvaro, Cuaderno, Foto, Insight, Prompt, Tarjeta, VideoPlaceholder, btnPrimario, btnSecundario } from './ui';
import { CAMILA, type PoseCamila } from '@/lib/productos/guia/caso';
import { FOTOS } from '@/lib/productos/fotos';
import { APOYO, type ImagenApoyo } from '@/lib/productos/apoyo';
import {
  ArbolRespuesta,
  CadenaReferido,
  EscaleraConversacion,
  MapaGuia,
  MatrizEncajeSenal,
  OrdenPorPuntaje,
  PlanillaAlCentro,
  SemanaAntesDespues,
} from '@/components/productos/diagramas/guia';
import { PlanillaIlustracion, Tostaduria, WhatsAppIlustracion } from './ilustraciones';
import {
  CalendarioSeguimientos,
  CicloSemanal,
  EmbudoFuentes,
  EstructuraMensaje,
  FormulaPuntaje,
  RutinaVeinte,
  TandaSemanal,
  TresPreguntas,
} from './infografias';
import { JuegoError, JuegoFuentes, JuegoOrden, JuegoProspecto } from './juegos';
import { ChipEtiqueta, Diagnostico, PruebaReal, Quiz, Temporizador } from './herramientas';
import { ExportarPlanilla, Planilla } from './Planilla';
import { Certificado } from './Certificado';
import { Pantallita } from '@/components/productos/Pantallita';
import { VideoMarco } from '@/components/productos/VideoProducto';
import { VERSIONES_GUIA, VERSION_ACTUAL, fechaLarga } from '@/lib/productos/guia/versiones';

const POSE_ESCENA: Record<number, PoseCamila> = { 0: 'saludo', 1: 'pensando', 2: 'notebook', 3: 'preocupada', 4: 'celular', 5: 'celebrando', 6: 'saludo' };

function Escena({ n }: { n: number }) {
  const e = ESCENAS[n];
  const cam = CAMILA[POSE_ESCENA[n]];
  const apoyo =
    e.ilustracion === 'tostaduria' ? (
      <Tostaduria className="h-auto w-full rounded-xl" />
    ) : e.ilustracion === 'planilla' ? (
      <PlanillaIlustracion className="h-auto w-full rounded-xl" />
    ) : e.ilustracion === 'whatsapp' ? (
      <WhatsAppIlustracion
        enviado={n === 5 ? SEGUIMIENTOS[1].texto : ASI_SI}
        respuesta={n === 5 ? '¡Dale! Déjanos una muestra el jueves.' : '¡Gracias! Sí, el jueves estamos. ¿A qué hora pasas?'}
        contacto={n === 5 ? 'Paula · Café Brisa' : 'Diego · Cafetería Mirador'}
        canal={n === 5 ? 'Correo' : 'WhatsApp'}
      />
    ) : null;
  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#16213a] to-[#0f172a]">
      <div className="flex items-end gap-3 px-4 pt-4 sm:gap-5 sm:px-6 sm:pt-6">
        {/* eslint-disable-next-line @next/next/no-img-element -- personaje WebP transparente de tamaño fijo */}
        <img src={cam.src} alt={cam.alt} width={327} height={560} className="h-40 w-auto shrink-0 sm:h-52" />
        <div className="min-w-0 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5fb2dd]">El caso · Grano Norte</p>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-white">{e.titulo}</h2>
        </div>
      </div>
      <div className={`grid items-center gap-4 border-t border-white/10 p-4 sm:p-6 ${apoyo ? 'sm:grid-cols-2' : ''}`}>
        <p className="leading-relaxed text-slate-300">{e.texto}</p>
        {apoyo && <div>{apoyo}</div>}
      </div>
    </section>
  );
}

// Regla 20/80 (8-nov-2026): solo el primer consejo lleva la cara de Álvaro; los demás, una imagen de lo que dice.
const CONSEJOS: Record<number, { foto: ImagenApoyo; texto: string; pos?: string }> = {
  1: { foto: FOTOS.explicando, texto: 'Antes de escribirle a nadie, escribe a quién no le vas a escribir. Eso ordena todo lo demás.' },
  2: { foto: APOYO.cafeteria, texto: 'Yo parto siempre por mis clientes: un referido suele contestar bastante más que un desconocido.', pos: '40% 50%' },
  3: { foto: APOYO.planilla, texto: 'No midas el éxito por las respuestas de un día: mídelo por tandas enviadas en el mes.', pos: '45% 50%' },
  4: { foto: APOYO.escribir, texto: 'Lee tu mensaje en voz alta antes de enviarlo. Si suena a folleto, bórralo y parte de nuevo.', pos: '55% 50%' },
  5: { foto: APOYO.calendario, texto: 'Agenda el seguimiento en el mismo momento en que envías el primer mensaje, no después.', pos: '50% 50%' },
  6: { foto: APOYO.escritorioClaro, texto: 'Mi mañana parte con la planilla, no con el correo. Si abres el correo primero, se te va la mañana.', pos: '50% 50%' },
};

function Consejo({ n }: { n: number }) {
  const c = CONSEJOS[n];
  return c ? <ConsejoAlvaro foto={c.foto} pos={c.pos}>{c.texto}</ConsejoAlvaro> : null;
}

function Idea({ children }: { children: React.ReactNode }) {
  return (
    <Bloque etiqueta="La idea">
      <div className="space-y-3 text-lg leading-relaxed text-slate-200">{children}</div>
    </Bloque>
  );
}

function Ejemplo({ children }: { children: React.ReactNode }) {
  return (
    <Bloque etiqueta="Así lo hizo Camila">
      <Pantallita titulo="Grano Norte · Camila">
        <div className="sm:p-2">{children}</div>
      </Pantallita>
    </Bloque>
  );
}

function ContenidoParte({ n, irA }: { n: number; irA: (v: Vista) => void }) {
  const [p, actualizar] = useProgreso();
  const insight = INSIGHTS[n];
  switch (n) {
    case 0:
      return (
        <>
          <Escena n={0} />
          <MapaGuia />
          <Bloque etiqueta="Antes de partir">
            <Tarjeta className="flex items-start gap-4">
              <svg viewBox="0 0 48 40" className="h-12 w-14 shrink-0" aria-hidden="true">
                <path d="M2 8a4 4 0 0 1 4-4h12l5 5h19a4 4 0 0 1 4 4v21a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="#2175a1" />
                <path d="M2 14h44v20a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="#5fb2dd" />
              </svg>
              <div>
                <p className="font-semibold text-white">Crea la carpeta «Mi sistema de ventas»</p>
                <p className="mt-1 text-sm text-slate-300">
                  En tu computador o en Google Drive. Ahí guardas todo lo que descargues: tu planilla en Excel, el esqueleto de tu asistente, tus
                  mensajes y tu certificado.
                </p>
              </div>
            </Tarjeta>
          </Bloque>
          <Diagnostico
            respuestas={p.diagnostico}
            onGuardar={(diagnostico) => actualizar((x) => ({ ...x, diagnostico }))}
            onIrAParte={(k) => irA(k)}
          />
        </>
      );
    case 1:
      return (
        <>
          <Escena n={1} />
          <Idea>
            <p>
              Tu cliente ideal no es «pymes» ni «todos los que toman café». Es un tipo de negocio, con una persona que decide y una señal de
              que te necesita ahora.
            </p>
          </Idea>
          <TresPreguntas />
          <MatrizEncajeSenal />
          <Insight>{insight}</Insight>
          <Consejo n={n} />
          <figure className="mt-8">
            <Foto foto={APOYO.cafeteriaBarra} className="aspect-[16/9] w-full sm:aspect-[21/9]" pos="50% 55%" sizes="(min-width: 768px) 720px, 100vw" />
            <figcaption className="mt-2 text-xs text-slate-400">El cliente ideal de Grano Norte: cafeterías independientes de 1 a 3 locales.</figcaption>
          </figure>
          <Ejemplo>
            <ul className="space-y-1">
              <li>
                <strong className="text-white">Quién compra:</strong> cafeterías independientes de 1 a 3 locales en Valparaíso y Viña.
              </li>
              <li>
                <strong className="text-white">Quién decide:</strong> el dueño o el jefe de barra.
              </li>
              <li>
                <strong className="text-white">Señales:</strong> local nuevo, reseñas que se quejan del café, publicación buscando proveedor.
              </li>
            </ul>
          </Ejemplo>
          <Prompt texto={PROMPTS.p1} />
          <JuegoProspecto />
          <Cuaderno preguntas={CUADERNO[1]} titulo="Tu cuaderno · tu cliente ideal" />
        </>
      );
    case 2:
      return (
        <>
          <Escena n={2} />
          <Idea>
            <p>Hay muchas fuentes; ordénalas de la más tibia a la más fría y empieza siempre por las tibias.</p>
            <p>
              En ventas a estos nombres les dicen «prospectos»: gente que podría comprarte y todavía no lo ha hecho. Aquí les decimos posibles
              clientes, y la planilla donde los anotas es tu primer CRM.
            </p>
            <p>
              Cada fuente tiene su canal: por WhatsApp solo le escribes a quien ya te conoce o te dio su número. A los demás, el primer mensaje va
              por correo, LinkedIn o Instagram.
            </p>
          </Idea>
          <EmbudoFuentes />
          <CadenaReferido />
          <Insight>{insight}</Insight>
          <Consejo n={n} />
          <Bloque etiqueta="Dónde buscar" titulo="Cada fuente, con un consejo concreto">
            <div className="grid gap-2 sm:grid-cols-2">
              {PLATAFORMAS.map((pl) => (
                <Tarjeta key={pl.nombre} className="!p-4">
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: pl.temperatura === 'tibia' ? '#5fb2dd' : pl.temperatura === 'templada' ? '#2175a1' : '#475569' }}
                      aria-hidden="true"
                    />
                    {pl.nombre}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{pl.consejo}</p>
                  <p className="mt-2 text-sm text-slate-200">
                    <span className="font-semibold text-[#5fb2dd]">Por dónde le escribes:</span> {pl.canal}
                  </p>
                  <p className="mt-2 text-sm text-[#cfe8f5]">Camila: {pl.camila}</p>
                </Tarjeta>
              ))}
            </div>
          </Bloque>
          <Prompt texto={PROMPTS.p2} />
          <JuegoFuentes />
          <Cuaderno preguntas={CUADERNO[2]} titulo="Tu cuaderno · fuentes tibias" />
          <Bloque etiqueta="Tu planilla · tus primeros 20 nombres" titulo="Arma tu lista aquí mismo">
            <p className="text-slate-300">
              Pon el temporizador y llena 20 filas. El puntaje lo agregas en la parte 3 y el próximo paso con fecha en la parte 5.
            </p>
            <div className="mt-4">
              <Temporizador />
            </div>
            <Planilla modo="base" />
            <ExportarPlanilla />
          </Bloque>
        </>
      );
    case 3:
      return (
        <>
          <Escena n={3} />
          <Idea>
            <p>
              Le escribes a los 20 el mismo día, porque van a responder 1 o 2. Lo que acabas de armar es tu unidad mínima de trabajo, y se
              repite: cada semana, una tanda nueva.
            </p>
            <p>
              El puntaje no sirve para dejar a 15 sin escribir: sirve para decidir a quién le haces seguimiento primero y con qué mensaje.
              Puntúa de 1 a 3 en Encaje, Señal y Acceso. Es una regla práctica: si con el tiempo ves que otra cosa predice mejor quién te
              compra, ajústala.
            </p>
            <p>
              ¿Por qué 20? Es un número chico y fijo: la tarea cabe en una tarde y la repites cada semana. Si te sobra o te falta, ajústalo, pero
              que sea un número fijo.
            </p>
          </Idea>
          <TandaSemanal />
          <Insight>{insight}</Insight>
          <Consejo n={n} />
          <FormulaPuntaje />
          <OrdenPorPuntaje />
          <Ejemplo>
            Camila le escribió a sus 20 el lunes. Cafetería Mirador (9 puntos) recibe el seguimiento más cuidado; Café Express (3) también
            recibió su mensaje, pero su seguimiento va al final. El domingo siguiente, Camila arma otros 20.
          </Ejemplo>
          <Prompt texto={PROMPTS.p3} />
          <JuegoOrden />
          <Bloque etiqueta="Tu planilla · puntaje" titulo="Puntúa a tus 20">
            <Planilla modo="puntaje" />
          </Bloque>
          <Cuaderno preguntas={CUADERNO[3]} titulo="Tu cuaderno · tu tanda semanal" />
        </>
      );
    case 4:
      return (
        <>
          <Escena n={4} />
          <Idea>
            <p>El primer mensaje no vende: abre una conversación. Máximo 3 frases. Sin adjuntos ni links en el primero.</p>
            <p>El nombre solo no basta: lo que se nota es que miraste su negocio.</p>
          </Idea>
          <Bloque etiqueta="Por dónde le escribes" titulo="WhatsApp, solo con quien ya te conoce">
            <div className="grid gap-2 sm:grid-cols-2">
              <Tarjeta className="!p-4">
                <p className="font-semibold text-white">WhatsApp</p>
                <p className="mt-1 text-sm text-slate-300">
                  Para tus clientes, los referidos que te dieron permiso y la gente de tu agenda o que te dio su número.
                </p>
              </Tarjeta>
              <Tarjeta className="!p-4">
                <p className="font-semibold text-white">Correo, LinkedIn o Instagram</p>
                <p className="mt-1 text-sm text-slate-300">
                  Para quien no te conoce: lo que encontraste en Google Maps, Instagram, LinkedIn o un directorio. Cuando te responda y te dé su
                  número, pasas a WhatsApp.
                </p>
              </Tarjeta>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Así no te arriesgas a que te reporten o te bloqueen el número: la política de WhatsApp Business pide que la persona te haya dado su
              número y aceptado tus mensajes. Y nada de envíos masivos: aquí se escribe uno a uno, a mano.
            </p>
          </Bloque>
          <EstructuraMensaje />
          <EscaleraConversacion />
          <Insight>{insight}</Insight>
          <Consejo n={n} />
          <Bloque etiqueta="Así lo hizo Camila">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-rose-300/30 bg-rose-300/[0.07] p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-200">Así no</p>
                <p className="mt-2 leading-relaxed text-slate-200">{ASI_NO}</p>
              </div>
              <div className="rounded-2xl border border-[#5fb2dd]/50 bg-[#2175a1]/15 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5fb2dd]">Así sí</p>
                <p className="mt-2 leading-relaxed text-white">{ASI_SI}</p>
              </div>
            </div>
          </Bloque>
          <Bloque etiqueta="Video 2 · 50 s">
            <VideoPlaceholder titulo="El primer mensaje, a mano" duracion="50 s" guion={GUION_VIDEO_2} etiquetaGuion="Leer lo que digo en el video" video="v04-guia-primer-mensaje" />
            {/* C30: el video (grabado antes de la revisión) no dice por qué va por WhatsApp. Sacar esta nota si se regraba. */}
            <p className="mt-3 rounded-xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-3 text-sm text-slate-200">
              Ojo con el canal: en el video Camila le escribe a Diego por WhatsApp porque él le dio su número en una feria. A quien no te conoce,
              el primer mensaje va por correo, LinkedIn o Instagram.
            </p>
          </Bloque>
          <Bloque etiqueta="Otros rubros" titulo="El mismo mensaje de 3 frases, en otros negocios">
            <div className="grid gap-2 sm:grid-cols-2">
              {EJEMPLOS_RUBRO.map((e) => (
                <Tarjeta key={e.rubro} className="!p-4">
                  <p className="font-semibold text-white">{e.rubro}</p>
                  <p className="mt-0.5 text-xs text-[#5fb2dd]">{e.canal}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">«{e.mensaje}»</p>
                </Tarjeta>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">Son ejemplos para que veas la estructura; cambia los datos por los de tu negocio.</p>
          </Bloque>
          <Prompt texto={PROMPTS.p4} />
          <JuegoError />
          <Cuaderno preguntas={CUADERNO[4]} titulo="Tu cuaderno · tu plantilla" />
        </>
      );
    case 5:
      return (
        <>
          <Escena n={5} />
          <Idea>
            <p>Tres seguimientos, cada uno aporta algo nuevo, nunca «¿viste mi mensaje?».</p>
            <p>
              Los días 2, 7 y 14 son un calendario simple, un punto de partida para ajustar con tus números: si tu rubro es más lento, estíralo.
            </p>
          </Idea>
          <Insight>{insight}</Insight>
          <Consejo n={n} />
          <CalendarioSeguimientos />
          <ArbolRespuesta />
          <Bloque etiqueta="Así lo hizo Camila">
            <ol className="relative space-y-3 border-l border-[#5fb2dd]/40 pl-5">
              {SEGUIMIENTOS.map((s) => (
                <li key={s.dia} className="relative">
                  <span className="absolute -left-[27px] top-4 h-3 w-3 rounded-full bg-[#5fb2dd]" aria-hidden="true" />
                  <Tarjeta>
                    <p className="text-sm font-semibold text-[#5fb2dd]">
                      {s.dia} · {s.nombre}
                    </p>
                    <p className="mt-1 leading-relaxed text-slate-100">«{s.texto}»</p>
                  </Tarjeta>
                </li>
              ))}
            </ol>
          </Bloque>
          <Bloque etiqueta="Bonus · cotizaciones sin respuesta" titulo="¿Mandaste cotizaciones que quedaron en nada?">
            <p className="text-slate-300">
              Son tus posibles clientes más tibios: ya te pidieron precio. Escríbeles por donde te la pidieron, con este mismo espaciado.
            </p>
            <ol className="mt-3 space-y-2">
              {SEGUIMIENTO_COTIZACION.map((s) => (
                <li key={s.cuando}>
                  <Tarjeta className="!p-4">
                    <p className="text-sm font-semibold text-[#5fb2dd]">{s.cuando}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-100">«{s.texto}»</p>
                  </Tarjeta>
                </li>
              ))}
            </ol>
          </Bloque>
          <Prompt texto={PROMPTS.p5} />
          <Bloque etiqueta="Regla de oro">
            <div className="rounded-2xl border border-[#5fb2dd]/50 bg-gradient-to-br from-[#2175a1]/30 to-transparent p-5 sm:p-6">
              <p className="font-serif text-2xl leading-snug text-white">
                Todos los mensajes los revisas tú antes de enviarlos. Claude o ChatGPT te ayudan con el borrador; tú decides qué sale.
              </p>
              <p className="mt-3 text-sm text-slate-300">
                Agrega siempre un detalle que solo tú sabes de esa persona: los mensajes que salen tal cual del chat se parecen todos.
              </p>
            </div>
          </Bloque>
          <Cuaderno preguntas={CUADERNO[5]} titulo="Tu cuaderno · tus seguimientos" />
          <Bloque etiqueta="Tu planilla · próximo paso y fecha" titulo="Cada posible cliente con su fecha exacta">
            <Planilla modo="seguimiento" />
          </Bloque>
        </>
      );
    case 6:
      return (
        <>
          <Escena n={6} />
          <Idea>
            <p>Tu rutina de cada mañana, en cuatro tramos. Siempre a la misma hora.</p>
          </Idea>
          <RutinaVeinte />
          <PlanillaAlCentro />
          <Insight>{insight}</Insight>
          <Consejo n={n} />
          <figure className="mt-8">
            <Foto foto={APOYO.escenaCalendario} className="aspect-[16/9] w-full sm:aspect-[21/9]" pos="50% 40%" sizes="(min-width: 768px) 720px, 100vw" />
            <figcaption className="mt-2 text-xs text-slate-400">Lunes 8:30 en Grano Norte: Camila con su celular y la semana a la vista.</figcaption>
          </figure>
          <Ejemplo>
            Lunes 8:30 en Grano Norte: le toca el día 2 a Cafetería Mirador y el día 7 a Café Brisa. Camila envía esos dos, suma 4 nombres
            nuevos, les manda el primer mensaje y deja cada fila con su próximo paso y fecha. 8:50, listo.
          </Ejemplo>
          <Prompt titulo="Con Claude o ChatGPT · cada mañana, si quieres" texto={PROMPTS.p6} />
          <Bloque etiqueta="Prueba real · 5 días" titulo="Haz la rutina 5 días hábiles y anota tus números">
            <p className="text-slate-300">
              Cinco días no forman un hábito: sirven para partir y ver tus primeros números. Si un día no puedes, retoma al siguiente; saltarse un
              día no arruina el hábito. Y no saques conclusiones con 25 mensajes: compara cuando juntes 40 a 50.
            </p>
            <p className="mt-2 text-slate-300">Esto queda en tu planilla: hoja «Prueba 5 días» y en el Dashboard del Excel.</p>
            <div className="mt-4">
              <PruebaReal prueba={p.prueba} actualizar={actualizar} />
            </div>
          </Bloque>
          <Bloque etiqueta="Último paso" titulo="Sigue alimentando la lista">
            <div className="grid gap-2 sm:grid-cols-2">
              {ALIMENTAR_LISTA.map((a) => (
                <Tarjeta key={a.titulo} className="!p-4">
                  <p className="font-semibold text-white">{a.titulo}</p>
                  <p className="mt-1 text-sm text-slate-300">{a.texto}</p>
                </Tarjeta>
              ))}
            </div>
          </Bloque>
          <CicloSemanal />
          <Cuaderno preguntas={CUADERNO[6]} titulo="Tu cuaderno · tu rutina" />
          <Bloque etiqueta="Tu planilla completa" titulo="Todo en un solo lugar">
            <Planilla modo="completa" />
            <ExportarPlanilla />
          </Bloque>
        </>
      );
    default:
      return null;
  }
}

function Portada({ irA, ruta }: { irA: (v: Vista) => void; ruta: Ruta | null }) {
  const [p] = useProgreso();
  const hechas = PARTES.filter((x) => parteCompleta(p, x.n, x.checklist.length)).length;
  const orden = ruta ? [0, ...ruta.orden] : PARTES.map((x) => x.n);
  const siguiente = orden.map((n) => PARTES[n]).find((x) => !parteCompleta(p, x.n, x.checklist.length));
  return (
    <>
      <header className="pt-8 sm:pt-14">
        {/* Video de bienvenida en la portada (pedido de Álvaro, 8-nov): es lo primero que ve el comprador. */}
        <VideoMarco id="v03-guia-parte0" titulo="Bienvenida: cómo usar esta guía" duracion="40 s" />
        <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5fb2dd]">{GUIA.etiqueta}</p>
        <h1 className="mt-3 font-serif text-4xl leading-[1.08] text-white sm:text-5xl">{GUIA.titulo}</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-300">{GUIA.promesa}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-300">
          <span className="rounded-full border border-white/15 px-3 py-1">6 partes + diagnóstico</span>
          <span className="rounded-full border border-white/15 px-3 py-1">{GUIA.duracion}</span>
          <span className="rounded-full border border-white/15 px-3 py-1">{GUIA.herramientas}</span>
        </div>
        <details className="mt-4 text-sm text-slate-400">
          <summary className="cursor-pointer">
            Guía viva · versión {VERSION_ACTUAL.version}, actualizada el {fechaLarga(VERSION_ACTUAL.fecha)}
          </summary>
          <ul className="mt-2 space-y-2 border-l border-white/10 pl-4">
            {VERSIONES_GUIA.map((v) => (
              <li key={v.version}>
                <span className="text-slate-200">v{v.version} · {fechaLarga(v.fecha)}:</span> {v.cambios.join(' ')}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            La evidencia detrás de cada recomendación se revisa cada tres meses (la próxima, en {REVISION_EVIDENCIA.proxima}).{' '}
            <a href={`${LINKS.guiaVenta}#en-que-se-basa`} target="_blank" rel="noopener" className="text-[#5fb2dd] underline underline-offset-2">
              En qué se basa esta guía ↗
            </a>
          </p>
        </details>
        <button type="button" className={`${btnPrimario} mt-6 w-full sm:w-auto`} onClick={() => irA(siguiente ? siguiente.n : 'cierre')}>
          {hechas === 0 ? 'Empezar por el diagnóstico' : siguiente ? `Seguir en la parte ${siguiente.n}` : 'Ir al cierre'}
        </button>
        </div>
      </header>

      <section className="mt-10 grid items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-[#16213a] p-4 sm:grid-cols-2 sm:p-6">
        <Tostaduria className="h-auto w-full rounded-xl" />
        <p className="leading-relaxed text-slate-300">
          {/* eslint-disable-next-line @next/next/no-img-element -- personaje WebP de tamaño fijo */}
          <img src={CAMILA.retrato.src} alt={CAMILA.retrato.alt} width={72} height={72} className="float-left mr-3 h-[72px] w-[72px] rounded-full" />
          Vas a acompañar a <strong className="text-white">Camila</strong>, dueña de <strong className="text-white">Grano Norte</strong>, una
          tostaduría de Valparaíso que le vende a cafeterías y oficinas. Ella lo hace primero; tú, después, con tu negocio.
        </p>
      </section>

      <Bloque etiqueta="Lo que tienes al terminar">
        <ul className="space-y-2">
          {GUIA.resultado.map((r) => {
            const ok = r.partes.every((n) => parteCompleta(p, n, PARTES[n].checklist.length));
            return (
              <li key={r.texto} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm ${
                    ok ? 'border-[#5fb2dd] bg-[#2175a1] text-white' : 'border-white/25 text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className={ok ? 'text-white' : 'text-slate-300'}>{r.texto}</span>
              </li>
            );
          })}
        </ul>
      </Bloque>

      <Bloque etiqueta={ruta ? 'Tu ruta' : 'Las partes'}>
        <div className="mb-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#5fb2dd]" style={{ width: `${(hechas / PARTES.length) * 100}%` }} />
          </div>
          <span className="text-sm text-slate-400">
            {hechas}/{PARTES.length}
          </span>
        </div>
        {!ruta && <p className="mb-3 text-sm text-slate-400">Haz el diagnóstico de la parte 0 y aquí aparece tu ruta personalizada.</p>}
        <ul className="space-y-2">
          {orden.map((n) => {
            const x = PARTES[n];
            const ok = parteCompleta(p, x.n, x.checklist.length);
            const paso = ruta?.pasos.find((s) => s.parte === n);
            return (
              <li key={x.n}>
                <button
                  type="button"
                  onClick={() => irA(x.n)}
                  className={`flex min-h-[64px] w-full items-center gap-4 rounded-2xl border p-4 text-left transition hover:border-[#5fb2dd]/60 ${
                    paso?.etiqueta === 'haz' ? 'border-[#5fb2dd]/50 bg-[#2175a1]/10' : 'border-white/10 bg-white/[0.03]'
                  } ${paso?.etiqueta === 'salta' ? 'opacity-75' : ''}`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-lg ${
                      ok ? 'bg-[#2175a1] text-white' : 'border border-white/20 text-slate-300'
                    }`}
                  >
                    {ok ? '✓' : x.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-widest text-slate-400">
                      Parte {x.n} · {x.nombre} · {x.minutos}
                    </span>
                    <span className="block font-serif text-lg leading-snug text-white">{x.titulo}</span>
                    {paso && (
                      <span className="mt-1 block">
                        <ChipEtiqueta e={paso.etiqueta} />
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => irA('cierre')}
              className="flex min-h-[64px] w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-[#5fb2dd]/60"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 font-serif text-lg text-slate-300">★</span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-slate-400">Cierre</span>
                <span className="block font-serif text-lg text-white">Quiz final y certificado</span>
              </span>
            </button>
          </li>
        </ul>
      </Bloque>
    </>
  );
}

function Cierre({ irA }: { irA: (v: Vista) => void }) {
  const [p, actualizar] = useProgreso();
  const prospectos = p.prospectos.filter(filaConDatos).length;
  return (
    <>
      <header className="pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5fb2dd]">Evaluación y cierre</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-white">Cerremos con lo que ya tienes</h1>
      </header>
      <SemanaAntesDespues />
      <Quiz respuestas={p.quiz} actualizar={actualizar} />
      <Bloque etiqueta="Tu entregable">
        <Tarjeta>
          <p className="text-lg text-white">{ENTREGABLE}</p>
          <p className="mt-2 text-sm text-slate-400">
            Hoy tienes {prospectos} {prospectos === 1 ? 'posible cliente' : 'posibles clientes'} en tu planilla. Descárgala y guárdala en «Mi sistema de ventas».
          </p>
        </Tarjeta>
        <ExportarPlanilla />
      </Bloque>
      <Bloque etiqueta="En qué se basa esta guía">
        <Tarjeta>
          <p className="leading-relaxed text-slate-200">
            Revisé las {CONTEO_EVIDENCIA.total} recomendaciones de esta guía contra estudios, reportes de la industria y las reglas de WhatsApp.{' '}
            {CONTEO_EVIDENCIA.fuerte} tienen respaldo fuerte, como volver a escribir a quien no respondió, decidir a qué hora y dónde haces tu rutina,
            anotar tus números y usar Claude o ChatGPT como borrador que tú revisas.
          </p>
          <p className="mt-3 leading-relaxed text-slate-300">
            Los números exactos (20 nombres, días 2, 7 y 14, comparar a los 40 o 50 mensajes) son criterio práctico: un punto de partida para
            ajustar con tus números. La evidencia se revisa cada tres meses.
          </p>
          <a href={`${LINKS.guiaVenta}#en-que-se-basa`} target="_blank" rel="noopener" className={`${btnSecundario} mt-4`}>
            Ver el detalle y las fuentes ↗
          </a>
        </Tarjeta>
      </Bloque>
      <Certificado />
      <div className="mt-8">
        <button type="button" className={btnSecundario} onClick={() => irA('portada')}>
          Volver al índice
        </button>
      </div>
    </>
  );
}

export default function GuiaProspeccionV2() {
  const [p, actualizar] = useProgreso();
  const vista = p.vista;
  const ruta = p.diagnostico ? calcularRuta(p.diagnostico) : null;

  // Al cambiar de parte, ir al inicio sin animación (el sitio tiene scroll-behavior: smooth).
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [vista]);

  const irA = (v: Vista) => actualizar((x) => ({ ...x, vista: v }));

  const parte = typeof vista === 'number' ? PARTES[vista] : null;
  const completa = parte ? parteCompleta(p, parte.n, parte.checklist.length) : false;
  const etiquetaDe = (n: number) => ruta?.pasos.find((s) => s.parte === n)?.etiqueta;
  // Siguiente según la ruta (si hay), si no, la parte siguiente.
  const orden = ruta ? [0, ...ruta.orden] : PARTES.map((x) => x.n);
  const idx = parte ? orden.indexOf(parte.n) : -1;
  const siguienteN = idx >= 0 && idx < orden.length - 1 ? orden[idx + 1] : null;
  const anteriorN = idx > 0 ? orden[idx - 1] : null;

  return (
    <div className="min-h-screen font-sans">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#0f172a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2">
          <button
            type="button"
            onClick={() => irA('portada')}
            aria-label="Índice de la guía"
            className="flex min-h-[44px] min-w-[44px] items-center gap-2 text-sm font-semibold text-white sm:pr-2"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-[#5fb2dd] sm:hidden" strokeWidth="2" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
            </svg>
            <span className="hidden font-serif text-lg sm:inline">Villelab</span>
            <span className="hidden text-slate-400 sm:inline">· Guía 1</span>
          </button>
          <div className="ml-auto flex items-center gap-1 overflow-x-auto" role="list" aria-label="Partes">
            {PARTES.map((x) => {
              const ok = parteCompleta(p, x.n, x.checklist.length);
              const actual = vista === x.n;
              const et = etiquetaDe(x.n);
              return (
                <button
                  key={x.n}
                  type="button"
                  role="listitem"
                  aria-label={`Parte ${x.n}${ok ? ', completa' : ''}${et === 'salta' ? ', puedes saltarla' : ''}`}
                  aria-current={actual ? 'page' : undefined}
                  onClick={() => irA(x.n)}
                  className="flex h-11 w-9 shrink-0 items-center justify-center sm:w-10"
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                      actual
                        ? 'bg-white text-[#0f172a]'
                        : ok
                          ? 'bg-[#2175a1] text-white'
                          : et === 'haz'
                            ? 'border border-[#5fb2dd] text-[#5fb2dd]'
                            : et === 'salta'
                              ? 'border border-dashed border-white/20 text-slate-500'
                              : 'border border-white/20 text-slate-400'
                    }`}
                  >
                    {x.n}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 pb-24">
        {vista === 'portada' && <Portada irA={irA} ruta={ruta} />}
        {vista === 'cierre' && <Cierre irA={irA} />}
        {parte && (
          <>
            <header className="pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5fb2dd]">
                Parte {parte.n} · {parte.nombre} · {parte.minutos}
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">{parte.titulo}</h1>
              {ruta && parte.n > 0 && (
                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
                  <ChipEtiqueta e={ruta.pasos[parte.n - 1].etiqueta} />
                  <span className="ml-2 text-slate-300">{ruta.pasos[parte.n - 1].mira}</span>
                </div>
              )}
            </header>
            <ContenidoParte n={parte.n} irA={irA} />
            <Checklist
              items={parte.checklist}
              valores={p.checks[String(parte.n)] ?? []}
              onCambio={(i, v) =>
                actualizar((x) => {
                  const actual = [...(x.checks[String(parte.n)] ?? [])];
                  actual[i] = v;
                  return { ...x, checks: { ...x.checks, [String(parte.n)]: actual } };
                })
              }
            />
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              <button type="button" className={btnSecundario} onClick={() => irA(anteriorN ?? 'portada')}>
                ← {anteriorN === null ? 'Índice' : `Parte ${anteriorN}`}
              </button>
              <button type="button" className={btnPrimario} disabled={!completa} onClick={() => irA(siguienteN ?? 'cierre')}>
                {siguienteN === null ? 'Ir al cierre →' : `Siguiente: parte ${siguienteN} →`}
              </button>
            </div>
            {!completa && <p className="mt-2 text-right text-sm text-slate-500">Marca el checklist para seguir.</p>}
          </>
        )}
      </main>
    </div>
  );
}
