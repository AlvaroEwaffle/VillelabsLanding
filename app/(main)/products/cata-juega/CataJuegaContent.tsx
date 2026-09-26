'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Brush,
  Clock3,
  Globe2,
  Hash,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Type,
  WifiOff,
} from 'lucide-react';

/**
 * Constantes centralizadas del producto.
 * La app todavía no existe: cuando cambie el dominio, se cambia acá y en ningún otro lugar.
 */
export const CATA_JUEGA_APP_URL = 'https://cata.villelab.com';
const WHATSAPP_NUMBER = '56920115198';
const WHATSAPP_MESSAGE = 'Hola, vi Cata Juega en villelab.com y quiero probarlo con mi hija.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

type Modulo = {
  id: string;
  nombre: string;
  color: string;
  textoTarjeta: string;
  icon: typeof Brush;
  nina: string;
  papa: string;
};

const modulos: Modulo[] = [
  {
    id: 'pintar',
    nombre: 'Pintar y dibujar',
    color: '#d86144',
    textoTarjeta: '#fff8ec',
    icon: Brush,
    nina: 'Lienzo táctil, pinceles gruesos, una paleta corta y sellos. Todo lo que hace queda guardado en su galería.',
    papa: '«Pinta conmigo»: un segundo pincel en la misma hoja y una pregunta por obra, del tipo «¿qué está pasando en tu dibujo?».',
  },
  {
    id: 'cuento',
    nombre: 'Leer un cuento',
    color: '#1d7b57',
    textoTarjeta: '#fff8ec',
    icon: BookOpen,
    nina: 'Biblioteca de cuentos propios, página por página, con la ilustración grande y el texto corto para leer de a poco.',
    papa: 'Una pregunta para conversar en cada página, en una franja discreta abajo. Es exactamente lo que respalda la evidencia de más abajo.',
  },
  {
    id: 'letras',
    nombre: 'Letras',
    color: '#f6c35f',
    textoTarjeta: '#17211d',
    icon: Type,
    nina: 'Letras de lija para trazar con el dedo, el sonido inicial («yo veo algo que empieza con...») y un alfabeto móvil para armar palabras. Fonética en español.',
    papa: 'Turnos: ella arma la palabra, tú la lees en voz alta. La app te sugiere palabras de cosas que están en la casa.',
  },
  {
    id: 'numeros',
    nombre: 'Números',
    color: '#14231f',
    textoTarjeta: '#fff8ec',
    icon: Hash,
    nina: 'Barras y husos para contar arrastrando, unir cantidad con símbolo del 0 al 10 y después al 20, y trazar el número.',
    papa: 'Juego de turnos: «ahora tú pones el 7». Ella revisa sola si quedó bien, sin que la app le grite error.',
  },
  {
    id: 'mundo',
    nombre: 'Mi mundo',
    color: '#69c28f',
    textoTarjeta: '#17211d',
    icon: Globe2,
    nina: 'Animales y sus hábitats, el día y la noche, las estaciones y un mapa de Chile para ir tocando y descubriendo.',
    papa: '«Yo estuve ahí»: cuando aparece una región o un animal, te toca contar si lo conoces y cómo era.',
  },
  {
    id: 'vida-practica',
    nombre: 'Vida práctica',
    color: '#c9852f',
    textoTarjeta: '#fff8ec',
    icon: Sparkles,
    nina: 'Ordenar los pasos de una rutina real: lavarse los dientes, vestirse, poner la mesa.',
    papa: 'Después de armar la rutina en la tablet, la hacen de verdad. La app propone cuál les toca hoy.',
  },
];

type Evidencia = {
  etiqueta: string;
  titulo: string;
  detalle: string;
  hallazgo: string;
  cita: string;
  url: string;
};

const evidencia: Evidencia[] = [
  {
    etiqueta: 'Experimento con padres',
    titulo: 'Preguntar durante el cuento cambia lo que el niño entiende',
    detalle: '81 padres, niños de 3 años, 4 semanas, 4 grupos.',
    hallazgo:
      'A los padres de un grupo les enseñaron a pausar el video del cuento y hacer preguntas. Después de cuatro semanas, esos niños puntuaron más alto en comprensión del cuento y en vocabulario del cuento que los del grupo que solo comentaba sin preguntar y que los del grupo sin intervención.',
    cita: 'Strouse, O’Doherty y Troseth (2013). Developmental Psychology, 49(12), 2368-2382.',
    url: 'https://red.library.usd.edu/se-fp/9/',
  },
  {
    etiqueta: 'Meta-análisis',
    titulo: 'Acompañar suma, y el efecto es pequeño pero real',
    detalle: '17 estudios, 100 tamaños de efecto, 1.288 niños de 0 a 6 años.',
    hallazgo:
      'La asociación entre el uso conjunto adulto-niño y lo que el niño aprende del medio digital fue positiva y significativa: g = 0,198 (IC 95%: 0,059-0,337; p = 0,009). Los mismos autores advierten que las muestras son chicas y que falta variedad en los diseños. Es un efecto pequeño, no una revolución.',
    cita: 'Taylor, Sala, Kolak, Gerhardstein y Lingwood (2024). Educational Research Review, 44, 100614.',
    url: 'https://discovery.ucl.ac.uk/10199543/1/Taylor%20et%20al%202024.pdf',
  },
  {
    etiqueta: 'Revisión sistemática',
    titulo: 'Estar al lado no basta: importa lo que el adulto hace',
    detalle: '27 estudios de padres e hijos usando tablet o teléfono juntos.',
    hallazgo:
      'Los niños se ven más involucrados cuando el adulto está ahí, pero la revisión también encontró que elementos clave de la calidad del lenguaje bajan respecto de actividades sin dispositivo, como jugar con juguetes. Por eso el modo «juntos» le da al adulto algo concreto que decir, no solo un asiento al lado.',
    cita: 'Ewin, Reupert, McLean y Ewin (2021). Human Behavior and Emerging Technologies, 3(2), 230-254.',
    url: 'https://research.monash.edu/en/publications/the-impact-of-joint-media-engagement-on-parentchild-interactions-',
  },
  {
    etiqueta: 'Montessori',
    titulo: 'Los materiales sirven; la evidencia del método completo es más floja de lo que se dice',
    detalle: 'Revisión de la evidencia sobre educación Montessori.',
    hallazgo:
      'La revisión es directa: no hay ensayos controlados aleatorizados de buena calidad sobre Montessori como método completo. Al mismo tiempo concluye que hay amplia evidencia de que ciertos elementos funcionan, entre ellos enseñar la lectura temprana con un enfoque fónico dentro de un contexto rico en lenguaje, y dar una base sensorial a las matemáticas. Eso es lo que copiamos: los materiales, no la etiqueta.',
    cita: 'Marshall (2017). npj Science of Learning, 2, 11.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6161506/',
  },
];

const pasos = [
  {
    numero: '01',
    titulo: 'Eligen «jugamos juntos»',
    texto:
      'Al abrir un juego, la tablet pregunta si juega sola o acompañada. En «juntos» aparece una franja abajo con lo que te toca a ti: una pregunta, un turno o algo que buscar en la casa.',
  },
  {
    numero: '02',
    titulo: 'Juegan 15 o 20 minutos',
    texto:
      'Ese es el largo de una sesión. No hay niveles que completar ni racha que perder, así que el rato termina cuando ustedes quieren, no cuando la app lo permite.',
  },
  {
    numero: '03',
    titulo: 'Cierre suave y preguntas para la cena',
    texto:
      'La app propone guardar y seguir mañana. En el panel del papá quedan tres preguntas sobre lo que hizo hoy, para conversarlas después, lejos de la pantalla.',
  },
];

const principios = [
  {
    icon: ShieldCheck,
    titulo: 'Sin cuentas',
    texto: 'No pedimos correo, ni nombre, ni teléfono. Se abre y se juega.',
  },
  {
    icon: Heart,
    titulo: 'Sin publicidad',
    texto: 'Nadie le vende nada a tu hija mientras juega. No hay compras dentro del juego.',
  },
  {
    icon: Clock3,
    titulo: 'Sin recompensas adictivas',
    texto:
      'Sin monedas, sin estrellas que llueven, sin rachas que se rompen. Un sonido suave y un «listo» basta.',
  },
  {
    icon: WifiOff,
    titulo: 'Sin red',
    texto: 'Funciona sin internet. Sirve igual en el auto, en el campo o cuando se cayó el wifi.',
  },
];

export default function CataJuegaContent() {
  return (
    <main className="bg-[#f6efe2] text-[#17211d]">
      {/* 1. Hero */}
      <section className="border-b border-[#17211d]/10 bg-[#14231f] text-[#fff8ec] pt-24 md:pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.95fr)] lg:px-8 lg:pb-20">
          <div className="flex flex-col justify-center py-4">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#f6c35f]">
              <span className="inline-flex items-center gap-2 rounded-md border border-[#f6c35f]/30 bg-[#f6c35f]/10 px-3 py-2">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Cata Juega
              </span>
              <span className="rounded-md border border-white/15 px-3 py-2 text-white/70">
                Un producto de Villelabs
              </span>
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Seis juegos para tablet, hechos para jugar acompañada.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Cata Juega es una aplicación de espíritu Montessori para niñas y niños de 4 a 7 años.
              Cada juego tiene un modo «juntos» que te da a ti, el adulto, una pregunta o un turno
              concreto. Sin cuentas, sin publicidad, sin red.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={CATA_JUEGA_APP_URL}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-[#f6c35f] px-7 py-3 text-base font-semibold text-[#17211d] transition hover:bg-[#f2b63f] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#f6c35f]/40"
              >
                Jugar ahora
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-white/25 px-7 py-3 text-base font-semibold text-white transition hover:border-[#69c28f] hover:bg-white/[0.06] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#69c28f]/30"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Preguntar por WhatsApp
              </a>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Se abre en el navegador de la tablet y se puede instalar como app. Horizontal, sin
              descargas de tienda.
            </p>
          </div>

          {/* Maqueta del hub: no es una captura de pantalla, es un dibujo del producto */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border border-white/15 bg-[#fff8ec] p-3 shadow-2xl shadow-black/40">
              <div className="rounded-xl bg-[#f6efe2] p-4">
                <p className="mb-4 text-center text-lg font-semibold text-[#17211d]">
                  ¿Qué quieres hacer hoy?
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {modulos.map((modulo) => (
                    <div
                      key={modulo.id}
                      className="flex aspect-[4/3] flex-col justify-between rounded-lg p-3"
                      style={{ backgroundColor: modulo.color, color: modulo.textoTarjeta }}
                    >
                      <modulo.icon className="h-6 w-6" aria-hidden="true" />
                      <span className="text-sm font-semibold leading-tight">{modulo.nombre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-sm leading-6 text-white/70">
              Así se ve el inicio: seis tarjetas grandes y nada más. No es una captura de pantalla,
              es la maqueta del hub.
            </p>
          </div>
        </div>
      </section>

      {/* 2. La base */}
      <section className="border-b border-[#17211d]/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b4452c]">
              La base
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#17211d] sm:text-4xl">
              La tablet ayuda cuando hay un adulto al lado.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4f5a54]">
              No lo inventamos nosotros. Hay investigación que lo midió, y la citamos con muestra,
              edad y resultado. También te decimos dónde se pone floja.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {evidencia.map((item) => (
              <article
                key={item.titulo}
                className="flex flex-col rounded-xl border border-[#17211d]/12 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1d7b57]">
                  {item.etiqueta}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug text-[#17211d]">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#b4452c]">{item.detalle}</p>
                <p className="mt-4 flex-1 text-base leading-7 text-[#3d4843]">{item.hallazgo}</p>
                <p className="mt-5 border-t border-[#17211d]/10 pt-4 text-sm leading-6 text-[#4f5a54]">
                  {item.cita}{' '}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1d7b57] underline underline-offset-2 hover:text-[#145c40]"
                  >
                    Ver la fuente
                  </a>
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-[#f6c35f]/70 bg-[#fdf3dc] p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-[#17211d]">Lo que la evidencia no dice</h3>
            <p className="mt-4 text-base leading-7 text-[#3d4843]">
              La evidencia más sólida es con niños de 2 a 5 años. El meta-análisis llega hasta los 6,
              pero la mayoría de los experimentos individuales son con niños más chicos. Para una
              niña de 6 años esto aplica <strong>por diseño, no por estudio directo</strong>: tomamos
              el mecanismo que sí se midió, que el adulto pregunte y participe, y lo construimos
              dentro del juego. Y no existe ninguna evidencia sobre esta app en particular. Todavía
              no la hay porque recién está naciendo.
            </p>
            <p className="mt-4 text-base leading-7 text-[#3d4843]">
              La Academia Americana de Pediatría recomienda usar pantallas acompañado: un adulto al
              lado, haciendo preguntas o ayudando al niño a conectar lo que pasa en la pantalla con
              su vida diaria. Esa recomendación, en la página que citamos, está dirigida a niños de 1
              a 3 años.{' '}
              <a
                href="https://www.aap.org/en/patient-care/media-and-children/center-of-excellence-on-social-media-and-youth-mental-health/qa-portal/qa-portal-library/qa-portal-library-questions/preferred-method-of-screen-time/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#1d7b57] underline underline-offset-2 hover:text-[#145c40]"
              >
                Ver la fuente
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Cómo se juega */}
      <section className="border-b border-[#17211d]/10 bg-[#fffaf0]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b4452c]">
              Cómo se juega
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#17211d] sm:text-4xl">
              Una sesión corta, con principio y con final.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pasos.map((paso) => (
              <div
                key={paso.numero}
                className="rounded-xl border border-[#17211d]/12 bg-white p-6 shadow-sm"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#1d7b57] text-base font-semibold text-white">
                  {paso.numero}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-[#17211d]">{paso.titulo}</h3>
                <p className="mt-3 text-base leading-7 text-[#3d4843]">{paso.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Los seis juegos */}
      <section className="border-b border-[#17211d]/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b4452c]">
              Los seis juegos
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#17211d] sm:text-4xl">
              Cada juego trae algo para ella y algo para ti.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4f5a54]">
              Eso es el modo «juntos»: no es un botón para padres, es un papel dentro del juego.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {modulos.map((modulo) => (
              <article
                key={modulo.id}
                className="flex flex-col overflow-hidden rounded-xl border border-[#17211d]/12 bg-white shadow-sm"
              >
                <div
                  className="flex items-center gap-3 px-6 py-5"
                  style={{ backgroundColor: modulo.color, color: modulo.textoTarjeta }}
                >
                  <modulo.icon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <h3 className="text-xl font-semibold">{modulo.nombre}</h3>
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1d7b57]">
                      Ella
                    </p>
                    <p className="mt-2 text-base leading-7 text-[#3d4843]">{modulo.nina}</p>
                  </div>
                  <div className="border-t border-[#17211d]/10 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b4452c]">
                      Tú, en modo juntos
                    </p>
                    <p className="mt-2 text-base leading-7 text-[#3d4843]">{modulo.papa}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Principios */}
      <section className="border-b border-white/10 bg-[#14231f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f6c35f]">
              Principios
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Lo que esta app no va a hacer nunca.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {principios.map((principio) => (
              <div
                key={principio.titulo}
                className="rounded-xl border border-white/12 bg-white/[0.05] p-6"
              >
                <principio.icon className="mb-4 h-6 w-6 text-[#69c28f]" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">{principio.titulo}</h3>
                <p className="mt-2 text-base leading-7 text-white/80">{principio.texto}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white/12 bg-white/[0.05] p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-white">Todo se guarda en la tablet</h3>
              <p className="mt-4 text-base leading-7 text-white/80">
                Los dibujos, las palabras que armó y el progreso viven en el navegador de la tablet,
                no en un servidor nuestro. Si no hay cuenta, no hay perfil que se pueda filtrar.
              </p>
            </div>
            <div className="rounded-xl border border-[#f6c35f]/40 bg-[#f6c35f]/10 p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-[#f6c35f]">Tocar no es aprender</h3>
              <p className="mt-4 text-base leading-7 text-white/85">
                En un experimento con 170 niños de 2 a 4 años, tocar la pantalla para que algo se
                mueva no mejoró el aprendizaje de palabras: los niños aprendieron significativamente
                más en la condición de solo mirar que en la interactiva de arrastrar, y solo los de 4
                años lograron llevar lo aprendido a los objetos reales. Por eso acá cada interacción
                pide decidir, trazar, contar u ordenar. Nunca tocar para que pase algo.
              </p>
              <p className="mt-5 text-sm leading-6 text-white/70">
                Russo-Johnson, Troseth, Duncan y Mesghina (2017). «All Tapped Out: Touchscreen
                Interactivity and Young Children’s Word Learning». Frontiers in Psychology.{' '}
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5388766/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#f6c35f] underline underline-offset-2 hover:text-[#fbd88f]"
                >
                  Ver la fuente
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Para quién */}
      <section className="border-b border-[#17211d]/10 bg-[#fffaf0]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b4452c]">
              Para quién
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#17211d] sm:text-4xl">
              Para la mamá, el papá o la abuela que va a estar ahí.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4f5a54]">
              Niñas y niños de 4 a 7 años, y un adulto que quiere que la tablet sea tiempo juntos y
              no un rato de cada uno por su lado.
            </p>
          </div>
          <div className="grid gap-5">
            <div className="rounded-xl border border-[#17211d]/12 bg-white p-6 shadow-sm lg:p-8">
              <h3 className="text-xl font-semibold text-[#17211d]">Es para ti si</h3>
              <ul className="mt-4 space-y-3 text-base leading-7 text-[#3d4843]">
                <li>
                  Tienes una niña o un niño de 4 a 7 años y quieres que el rato de tablet sea rato
                  juntos.
                </li>
                <li>
                  Te incomoda que las apps infantiles pidan cuenta, muestren publicidad y repartan
                  premios cada treinta segundos.
                </li>
                <li>
                  Prefieres veinte minutos buenos a una hora de scroll, y quieres saber de qué
                  conversar después.
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#17211d]/12 bg-[#f6efe2] p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-[#17211d]">No es para ti si</h3>
              <p className="mt-4 text-base leading-7 text-[#3d4843]">
                Buscas algo que entretenga sola a tu hija mientras tú haces otra cosa. Cata Juega
                funciona sola, pero está pensada para el otro caso. Si nadie se sienta al lado, le
                estás sacando la mitad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA final */}
      <section className="bg-[#14231f] text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Ábrela en la tablet y juega veinte minutos con ella.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
            No hay que registrarse ni descargar nada de una tienda. Si después quieres contarnos cómo
            les fue, escríbenos por WhatsApp: lo estamos construyendo con lo que nos cuentan.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={CATA_JUEGA_APP_URL}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-[#f6c35f] px-7 py-3 text-base font-semibold text-[#17211d] transition hover:bg-[#f2b63f] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#f6c35f]/40"
            >
              Jugar ahora
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-white/25 px-7 py-3 text-base font-semibold text-white transition hover:border-[#69c28f] hover:bg-white/[0.06] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#69c28f]/30"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Preguntar por WhatsApp
            </a>
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-white/12 bg-white/[0.05] p-6">
            <p className="text-base leading-7 text-white/85">
              Nació para Cata, 6 años, y su papá. Un producto de{' '}
              <Link
                href="/products"
                className="font-semibold text-[#f6c35f] underline underline-offset-2 hover:text-[#fbd88f]"
              >
                Villelabs
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
