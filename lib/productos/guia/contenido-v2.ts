// Contenido de la Guía 1 · «Tu lista de prospectos y el primer mensaje, cada mañana» (v2).
// Fuente de verdad: VPM/Villelabs/productos-digitales/contenido-primeros-productos.html
// (sección «PRODUCTO 3 · GUÍA 1») + cambios v2 pedidos por Álvaro el 7-nov-2026.
// Caso transversal: Grano Norte, tostaduría de Valparaíso; Camila es la dueña.
// v1.2 (8-nov-2026): lenguaje del comprador («posibles clientes», «tu primer CRM»; «prospecto» se explica una vez
// en la parte 2), WhatsApp solo con quien ya te conoce (C30), umbrales de la prueba (C10) y mito del segundo
// contacto (C19) corregidos según investigacion/base-evidencia-guia1-2026-11-08.md. El título queda igual (Hotmart).

export const GUIA = {
  titulo: 'Tu lista de prospectos y el primer mensaje, cada mañana',
  etiqueta: 'Guía 1 · Ventas y clientes nuevos',
  promesa:
    'En una tarde armas la lista de a quién venderle, el primer mensaje y los seguimientos, y te queda una rutina de 20 minutos al día para que ningún posible cliente se te enfríe.',
  duracion: '2,5 a 3 horas',
  herramientas: 'Tu primer CRM en una planilla + Claude o ChatGPT de apoyo',
  resultado: [
    { texto: 'La ficha de tu cliente ideal, en una página.', partes: [1] },
    { texto: 'Tu primer CRM: una planilla con 20 posibles clientes reales, con puntaje.', partes: [2, 3] },
    { texto: 'Tu primer mensaje y 3 seguimientos (días 2, 7 y 14), con tu tono.', partes: [4, 5] },
    { texto: 'Una rutina de 20 minutos al día y tus primeros 5 días hechos, con tus números.', partes: [6] },
  ],
} as const;

export type ParteMeta = {
  n: number;
  nombre: string;
  titulo: string;
  minutos: string;
  checklist: string[];
};

export const PARTES: ParteMeta[] = [
  {
    n: 0,
    nombre: 'Diagnóstico y ruta',
    titulo: 'Tu punto de partida',
    minutos: '10 min',
    checklist: [
      'Hice el diagnóstico y tengo mi ruta.',
      'Creé la carpeta «Mi sistema de ventas» en mi computador o en Drive.',
    ],
  },
  {
    n: 1,
    nombre: 'Tu cliente ideal',
    titulo: 'A quién sí, a quién no',
    minutos: '25 min',
    checklist: ['Tengo mi ficha de cliente ideal de 4 puntos.', 'Sé qué señal busco.'],
  },
  {
    n: 2,
    nombre: 'Dónde están',
    titulo: 'Tus primeros 20 nombres',
    minutos: '35 min',
    checklist: ['Tengo 20 posibles clientes en la planilla.', 'Al menos 5 vienen de fuentes tibias.'],
  },
  {
    n: 3,
    nombre: 'Tu primera tanda',
    titulo: 'Los 20, el mismo día',
    minutos: '20 min',
    checklist: [
      'Mis 20 tienen puntaje.',
      'Sé a quién le hago seguimiento primero y con qué mensaje.',
      'Entiendo que esta tanda de 20 es mi unidad mínima y se repite cada semana.',
    ],
  },
  {
    n: 4,
    nombre: 'El primer mensaje',
    titulo: 'Tres frases y una pregunta',
    minutos: '30 min',
    checklist: [
      'Tengo mi plantilla de primer mensaje.',
      'Escribí el mensaje para mis 20, lo revisé yo y lo envié.',
    ],
  },
  {
    n: 5,
    nombre: 'Los seguimientos',
    titulo: 'Días 2, 7 y 14',
    minutos: '25 min',
    checklist: [
      'Tengo mis 3 seguimientos en plantilla.',
      'En la planilla, cada posible cliente tiene su próximo paso y una fecha exacta.',
    ],
  },
  {
    n: 6,
    nombre: 'Tu rutina y la prueba real',
    titulo: '20 minutos cada mañana',
    minutos: '30 min + 5 días',
    checklist: [
      'Hice la rutina de 20 minutos durante 5 días hábiles.',
      'Registré enviados, respuestas y conversaciones de cada día.',
      'Sé de dónde saco la tanda de la próxima semana.',
    ],
  },
];

// ---------- Escenas del caso (una por parte) ----------
export const ESCENAS: Record<number, { titulo: string; texto: string; ilustracion: 'tostaduria' | 'ninguna' | 'planilla' | 'whatsapp' }> = {
  0: {
    titulo: 'Conoce a Camila',
    texto:
      'Camila tiene Grano Norte, una tostaduría de café en Valparaíso. Le vende a cafeterías y a oficinas. El café es bueno; el problema es que sale a buscar clientes un lunes con ganas y el jueves ya se le olvidó a quién le escribió. En cada parte vas a ver cómo lo resuelve ella, y después lo haces tú.',
    ilustracion: 'tostaduria',
  },
  1: {
    titulo: 'Camila deja de venderle a «todos»',
    texto:
      'Camila le escribía a cualquier negocio con una máquina de café. Ahora tiene claro a quién: cafeterías independientes chicas de Valparaíso y Viña que acaban de cambiar algo.',
    ilustracion: 'ninguna',
  },
  2: {
    titulo: 'La planilla de Camila',
    texto:
      'Un domingo en la tarde, Camila abre una planilla y anota 20 nombres. Parte por sus propios clientes, que le pasan dos datos, y sigue con Google Maps e Instagram. Esa planilla es su primer CRM.',
    ilustracion: 'planilla',
  },
  3: {
    titulo: 'Camila le escribe a los 20 el lunes',
    texto:
      'El lunes, Camila manda el primer mensaje a sus 20: por WhatsApp a quienes ya la conocen y por correo o Instagram a los demás. El martes le contestan dos. No se desanima: sabe que esa es la cuenta normal y que el próximo lunes viene otra tanda.',
    ilustracion: 'planilla',
  },
  4: {
    titulo: 'El mensaje que sí le contestaron',
    texto:
      'Camila mandaba el catálogo en PDF y nadie respondía. Cambió a tres frases: algo de ellos, lo que ganan y una pregunta. Diego, de la cafetería nueva de Cerro Alegre, le había dado su WhatsApp en una feria en Viña, así que le escribió por ahí. Le contestó en una hora.',
    ilustracion: 'whatsapp',
  },
  5: {
    titulo: 'El seguimiento que cerró la venta',
    texto:
      'Café Brisa no respondió el primer correo. Al día 7 Camila les mandó el caso de la Cafetería Puerto y ahí sí: Paula pidió una muestra y le dejó su WhatsApp para coordinar.',
    ilustracion: 'whatsapp',
  },
  6: {
    titulo: 'Las mañanas de Camila',
    texto:
      'Camila abre la planilla a las 8:30 con el primer café. A las 8:50 ya mandó los seguimientos del día, sumó nombres nuevos y dejó cada fila con su fecha. Después se va a tostar tranquila.',
    ilustracion: 'ninguna',
  },
};

// ---------- Insights (ideas clave destacadas) ----------
export const INSIGHTS: Record<number, string> = {
  1: 'Si le escribes a todos, no le escribes a nadie. Un cliente ideal claro hace que tus mensajes le lleguen a quien sí puede comprarte.',
  2: 'Parte siempre por lo tibio: alguien que ya te conoce, o que conoce a un cliente tuyo, suele contestar bastante más que un desconocido.',
  3: 'De 20 mensajes, lo normal es que respondan 1 o 2. Eso no es fracaso: es la unidad de trabajo. Lo que vende es repetirla cada semana.',
  4: 'El primer mensaje no vende: abre una conversación. Si hablas solo de ti, cuesta que te contesten; si hablas de ellos, es más fácil.',
  5: 'Casi la mitad de las respuestas llega en un seguimiento, no en el primer mensaje, y mucha gente nunca vuelve a escribir. Ahí está tu ventaja.',
  6: '20 minutos todos los días te mantienen los seguimientos a tiempo y vuelven la búsqueda de clientes un hábito. Una tarde al mes deja que todos se enfríen.',
};

// ---------- Cuaderno (actividades reflexivas que se guardan) ----------
export type PreguntaCuaderno = { id: string; pregunta: string; ayuda: string; filas?: number };
export const CUADERNO: Record<number, PreguntaCuaderno[]> = {
  1: [
    { id: 'quien-compra', pregunta: '¿Quién te compra?', ayuda: 'Camila: cafeterías independientes de 1 a 3 locales en Valparaíso y Viña.' },
    { id: 'quien-decide', pregunta: '¿Quién decide la compra?', ayuda: 'Camila: el dueño o el jefe de barra.' },
    { id: 'senales', pregunta: '¿Qué señales dicen que te necesitan ahora?', ayuda: 'Camila: local nuevo, reseñas que se quejan del café, publicación buscando proveedor.', filas: 3 },
    { id: 'no-conviene', pregunta: '¿A quién NO le vas a escribir y por qué?', ayuda: 'Camila: cadenas grandes con proveedor nacional, porque decide alguien lejos.', filas: 3 },
  ],
  2: [
    { id: 'tibias', pregunta: 'Escribe 3 clientes o contactos a los que les vas a pedir un referido esta semana.', ayuda: 'Camila: Cafetería Puerto, Café del Cerro y su excompañera que trabaja en un cowork.', filas: 3 },
  ],
  3: [
    { id: 'dia-tanda', pregunta: '¿Qué día de la semana armas tu tanda nueva de 20?', ayuda: 'Camila: los domingos en la tarde arma la lista y los lunes envía.' },
  ],
  4: [
    { id: 'plantilla-mensaje', pregunta: 'Tu plantilla de primer mensaje (con [corchetes] para lo que cambia).', ayuda: 'Hola [nombre], vi que [señal]. [Lo que ganan en concreto]. ¿[Una pregunta fácil]?', filas: 4 },
  ],
  5: [
    { id: 'seg-2', pregunta: 'Tu seguimiento del día 2', ayuda: 'Recordatorio útil con una fecha concreta.', filas: 2 },
    { id: 'seg-7', pregunta: 'Tu seguimiento del día 7', ayuda: 'Un caso o un dato que aporte.', filas: 2 },
    { id: 'seg-14', pregunta: 'Tu seguimiento del día 14', ayuda: 'Cierre amable que deje la puerta abierta.', filas: 2 },
  ],
  6: [
    {
      id: 'hora-rutina',
      pregunta: '¿A qué hora haces tu rutina y dónde?',
      ayuda: 'Escríbelo así: «Si son las [hora] y estoy en [lugar], entonces abro la planilla». Camila: «Si son las 8:30 y estoy en el escritorio de la tostaduría, abro la planilla con el primer café».',
      filas: 2,
    },
    { id: 'alimentar', pregunta: '¿De dónde vas a sacar los nombres de la próxima tanda?', ayuda: 'Camila: 5 referidos de clientes, 10 de Google Maps en Viña y 5 de Instagram.', filas: 3 },
  ],
};

// ---------- Parte 0 · Diagnóstico y ruta ----------
export const GUION_VIDEO_0 =
  'Hola, soy Álvaro. Esta guía te deja un sistema chico para vender todas las semanas: a quién escribirle, qué decirle y cuándo volver a escribirle. Antes de partir, haz el diagnóstico de abajo: son nueve preguntas y te devuelven tu ruta, qué partes hacer completas, cuáles revisar rápido y cuáles puedes saltarte. En todas las partes vamos a acompañar a Camila, la dueña de Grano Norte, una tostaduría de café de Valparaíso que le vende a cafeterías y oficinas. Ella lo hace primero, tú lo haces después con tu negocio. Y un consejo: crea ahora una carpeta que se llame «Mi sistema de ventas». Ahí va a quedar todo lo que armes.';

export type Opcion = { id: string; texto: string };
export type PreguntaDiag = { id: string; pregunta: string; opciones: Opcion[] };
export const DIAGNOSTICO: PreguntaDiag[] = [
  {
    id: 'meta',
    pregunta: '¿Cuántos clientes nuevos quieres al mes?',
    opciones: [
      { id: '1-2', texto: '1 o 2' },
      { id: '3-5', texto: '3 a 5' },
      { id: '6+', texto: 'Más de 5' },
    ],
  },
  {
    id: 'tiempo',
    pregunta: '¿Cuánto tiempo le das hoy a buscar clientes nuevos?',
    opciones: [
      { id: 'nada', texto: 'Casi nada: cuando me acuerdo' },
      { id: 'rachas', texto: 'Algunos días, cuando tengo tiempo' },
      { id: 'fijo', texto: 'Un rato fijo casi todos los días' },
    ],
  },
  {
    id: 'seguimientos',
    pregunta: '¿Cuántos seguimientos haces cuando alguien no te responde?',
    opciones: [
      { id: '0', texto: 'Ninguno' },
      { id: '1', texto: 'Uno, a veces' },
      { id: '2+', texto: 'Dos o más, con fecha' },
    ],
  },
  {
    id: 'fuentes',
    pregunta: '¿Cómo encuentras clientes nuevos hoy?',
    opciones: [
      { id: 'llegan', texto: 'No busco: espero que lleguen' },
      { id: 'conocidos', texto: 'Referidos y conocidos' },
      { id: 'una', texto: 'Busco en una plataforma (Maps, Instagram o LinkedIn)' },
      { id: 'varias', texto: 'Tengo varias fuentes y las uso' },
    ],
  },
  {
    id: 'lista',
    pregunta: '¿Tienes una lista de posibles clientes?',
    opciones: [
      { id: 'no', texto: 'No' },
      { id: 'cabeza', texto: 'En la cabeza o en notas sueltas' },
      { id: 'desordenada', texto: 'Una planilla, pero desactualizada' },
      { id: 'aldia', texto: 'Una planilla al día, con estado y fecha' },
    ],
  },
  {
    id: 'ideal',
    pregunta: '¿Tienes claro quién es tu cliente ideal?',
    opciones: [
      { id: 'no', texto: 'No: le vendo a quien sea' },
      { id: 'masmenos', texto: 'Más o menos, en la cabeza' },
      { id: 'escrito', texto: 'Sí, por escrito y con señales' },
    ],
  },
  {
    id: 'mensaje',
    pregunta: '¿Cómo es tu primer mensaje a alguien que todavía no te compra?',
    opciones: [
      { id: 'no', texto: 'No escribo primero' },
      { id: 'generico', texto: 'El mismo para todos, presentando la empresa' },
      { id: 'personalizado', texto: 'Lo adapto a cada uno, corto y con una pregunta' },
    ],
  },
  {
    id: 'ia',
    pregunta: '¿Usas Claude o ChatGPT en tu trabajo?',
    opciones: [
      { id: 'nada', texto: 'No los uso' },
      { id: 'sueltas', texto: 'Les pregunto cosas sueltas' },
      { id: 'prompts', texto: 'Tengo instrucciones guardadas' },
      { id: 'agente', texto: 'Tengo un agente configurado' },
    ],
  },
  {
    id: 'esqueleto',
    pregunta: '¿Ya armaste «El esqueleto de tu agente de atención» (el material gratis de Villelab)?',
    opciones: [
      { id: 'si', texto: 'Sí, lo tengo' },
      { id: 'no', texto: 'Todavía no' },
    ],
  },
];

export type Etiqueta = 'haz' | 'revisa' | 'salta';
export const ETIQUETAS: Record<Etiqueta, string> = {
  haz: 'Haz completa',
  revisa: 'Revisa rápido',
  salta: 'Puedes saltarla',
};

// ---------- Instrucciones para Claude o ChatGPT (borrador que revisa el alumno) ----------
export const PROMPTS = {
  p1: `Te paso mi negocio: [pega el esqueleto de tu agente, si lo armaste, o descríbelo en 5 líneas].
Mis 3 mejores clientes actuales son: [nombre o tipo + por qué son buenos].
Con eso, arma la ficha de mi cliente ideal en este formato:
1. Quién compra (tipo de empresa, tamaño, zona)
2. Quién decide (cargo) y quién influye
3. 3 señales de que me necesitan AHORA
4. 3 tipos de cliente que NO me convienen y por qué
Sé concreto: nada de «empresas que valoran la calidad».`,
  p2: `Esta es la ficha de mi cliente ideal: [pégala].
Dame 10 búsquedas exactas para encontrarlos:
- 4 para Google Maps (rubro + comuna)
- 3 para Instagram (hashtags o ubicaciones)
- 3 para LinkedIn (cargo + ciudad + rubro)
Y escríbeme un mensaje corto para pedirle un referido a un cliente actual.`,
  p3: `Te paso mi planilla de posibles clientes: [pega las filas].
Puntúa cada uno de 1 a 3 en Encaje, Señal y Acceso según mi cliente ideal: [pégalo].
Devuélveme la lista ordenada con el puntaje total. Le voy a escribir a los 20 hoy:
dime, para los 5 primeros, por qué conviene hacerles seguimiento antes y qué detalle usar en su mensaje.`,
  p4: `Escribe el primer mensaje para este posible cliente: [nombre, empresa, señal].
Canal: [correo, LinkedIn, Instagram, o WhatsApp solo si me dio su número].
Mi negocio: [una línea]. Mi tono: [tuteo/usted, 3 palabras].
Incluye este detalle que solo yo sé de él: [detalle].
Reglas: máximo 3 frases; la primera habla de algo específico de ellos;
la segunda dice qué ganan en concreto; la tercera es UNA pregunta fácil de responder.
Sin adjuntos, sin links, sin «quedo atenta». Dame 2 versiones: yo elijo, corrijo y envío.`,
  p5: `Este es mi primer mensaje a [nombre]: [pégalo].
Un detalle que solo yo sé de él: [detalle].
Escribe 3 seguimientos: día 2 (recordatorio útil con una propuesta concreta de fecha),
día 7 (un caso o dato que aporte) y día 14 (cierre amable que deje la puerta abierta).
Máximo 2 frases cada uno, mismo tono, nunca «¿viste mi mensaje?».`,
  p6: `Esta es mi planilla de hoy: [pega las filas].
1. Dime a quién le toca seguimiento hoy y cuál (día 2, 7 o 14), con el texto listo.
2. Escribe el primer mensaje para los nombres nuevos que agregué, con mis reglas y por el canal de cada uno.
Todo queda en borrador: yo reviso y envío.`,
} as const;

// ---------- Juego parte 1 · ¿Le escribo o no? ----------
export const TARJETAS_PROSPECTO: { texto: string; si: boolean; porque: string }[] = [
  {
    texto: 'Cadena de 40 cafeterías con proveedor nacional',
    si: false,
    porque: 'Decide un área de compras lejana y ya tiene contrato nacional. No es tu tamaño.',
  },
  {
    texto: 'Cafetería nueva en Cerro Alegre, abrió hace 2 semanas',
    si: true,
    porque: 'Señal: local nuevo. Está eligiendo proveedores justo ahora y queda en tu zona.',
  },
  {
    texto: 'Cafetería de especialidad en Viña, 2 locales, con reseñas recientes que dicen «el café sale quemado»',
    si: true,
    porque: 'Señal: reseñas que se quejan del café. Tamaño y zona calzan con tu cliente ideal.',
  },
  {
    texto: 'Restaurante de comida rápida en Santiago que sirve café de máquina',
    si: false,
    porque: 'Fuera de tu zona y no es una cafetería que cuide su café: no le cambias nada.',
  },
  {
    texto: 'Cafetería de barrio en Valparaíso que publicó en Instagram que busca proveedor de café',
    si: true,
    porque: 'Señal: publicación buscando proveedor. Es de las señales más claras: te está diciendo que busca.',
  },
  {
    texto: 'Cafetería de un local en Viña, contenta con su tostador desde hace 5 años, sin novedades',
    si: false,
    porque: 'Encaja en tipo y zona, pero no hay señal de «ahora». Anótala para más adelante; hoy no.',
  },
];

// ---------- Parte 2 · Plataformas ----------
// «canal»: por dónde va el primer mensaje. WhatsApp solo con quien ya te conoce o te dio su número (C30, política
// de WhatsApp Business); a los fríos, correo, LinkedIn o mensaje directo de Instagram.
export const PLATAFORMAS: { nombre: string; temperatura: 'tibia' | 'templada' | 'fria'; consejo: string; canal: string; camila: string }[] = [
  {
    nombre: 'Tus clientes actuales y referidos',
    temperatura: 'tibia',
    consejo: 'Pide un solo nombre a cada cliente, con su permiso para decir «me pasó tu dato».',
    canal: 'WhatsApp o correo, contando quién te pasó el dato.',
    camila: 'La Cafetería Puerto le presentó a la cafetería amiga de la esquina.',
  },
  {
    nombre: 'Tu agenda y tus contactos',
    temperatura: 'tibia',
    consejo: 'Revisa tu WhatsApp y tus correos de los últimos 6 meses: ahí hay gente que ya te conoce.',
    canal: 'Por donde ya conversaban: WhatsApp o correo.',
    camila: 'Encontró a una excompañera que hoy administra un cowork con 60 personas.',
  },
  {
    nombre: 'Grupos de WhatsApp y Facebook',
    temperatura: 'templada',
    consejo: 'Entra a grupos del rubro o del barrio y responde preguntas antes de ofrecer algo.',
    canal: 'Si alguien pregunta por lo tuyo, pregúntale en el grupo si le puedes escribir por interno.',
    camila: 'En el grupo «Emprendedores de Valpo» alguien preguntaba por café para su local.',
  },
  {
    nombre: 'Ferias y cámaras de comercio',
    temperatura: 'templada',
    consejo: 'Pide la lista de expositores o socios: viene con nombre, rubro y contacto.',
    canal: 'Correo, o WhatsApp si te dieron su número en la feria.',
    camila: 'Sacó 8 nombres de la lista de expositores de una feria gastronómica en Viña.',
  },
  {
    nombre: 'Google Maps',
    temperatura: 'fria',
    consejo: 'Busca «rubro + comuna» y ordena por reseñas recientes: ahí ves locales nuevos y quejas.',
    canal: 'Correo o Instagram. El WhatsApp de su ficha es para sus clientes, no para escribirle en frío.',
    camila: '«Cafetería + Cerro Alegre»: tres locales abiertos este año.',
  },
  {
    nombre: 'Instagram por ubicación y hashtag',
    temperatura: 'fria',
    consejo: 'Mira las publicaciones etiquetadas en tu zona y hashtags del rubro: aparecen negocios chicos que no están en Maps.',
    canal: 'Mensaje directo de Instagram.',
    camila: 'Revisó #cafeteriavalparaiso y la ubicación «Viña del Mar».',
  },
  {
    nombre: 'LinkedIn y Sales Navigator',
    temperatura: 'fria',
    consejo: 'Para empresas, busca por cargo + ciudad (ej. «jefe de administración Viña»). Sales Navigator filtra por tamaño.',
    canal: 'Mensaje de LinkedIn o correo.',
    camila: 'Para el plan oficina buscó «administración» + «Valparaíso» en empresas de 20 a 100 personas.',
  },
  {
    nombre: 'Directorios del rubro',
    temperatura: 'fria',
    consejo: 'Asociaciones gremiales, guías de proveedores y listados de rubro traen datos ya ordenados.',
    canal: 'Correo.',
    camila: 'Usó una guía de cafeterías de especialidad de la región.',
  },
  {
    nombre: 'Mercado Público (ChileCompra)',
    temperatura: 'fria',
    consejo: 'Si le vendes a instituciones, busca licitaciones y compras ágiles de tu rubro en tu región.',
    canal: 'Ofertas por la misma plataforma, según las reglas de cada compra.',
    camila: 'Encontró una compra ágil de café para una universidad de Valparaíso.',
  },
];

// ---------- Juego parte 2 · Cada fuente con su cliente ----------
export const FUENTES = [
  { id: 'clientes', nombre: 'Tus clientes actuales', detalle: 'pide 1 referido a cada uno' },
  { id: 'agenda', nombre: 'Tu agenda y tus contactos', detalle: '' },
  { id: 'maps', nombre: 'Google Maps', detalle: 'rubro + comuna' },
  { id: 'instagram', nombre: 'Instagram', detalle: 'hashtags y ubicaciones del rubro' },
  { id: 'linkedin', nombre: 'LinkedIn', detalle: 'cargo + ciudad, para empresas' },
] as const;
export type FuenteId = (typeof FUENTES)[number]['id'];

export const TIPOS_PROSPECTO: { id: string; texto: string; fuente: FuenteId; porque: string }[] = [
  {
    id: 'oficina',
    texto: 'Oficina de 30 personas que quiere café para su equipo',
    fuente: 'linkedin',
    porque: 'Las empresas se encuentran por cargo: busca «administración» o «personas» + ciudad.',
  },
  {
    id: 'barrio',
    texto: 'Cafetería de barrio',
    fuente: 'maps',
    porque: 'Los negocios de calle están en Google Maps: «cafetería + Playa Ancha» y sale la lista.',
  },
  {
    id: 'especialidad',
    texto: 'Cafetería de especialidad que muestra su barra y su latte art',
    fuente: 'instagram',
    porque: 'Viven en Instagram: búscalas por hashtag o por la ubicación del barrio.',
  },
  {
    id: 'vecina',
    texto: 'La cafetería vecina de tu mejor cliente',
    fuente: 'clientes',
    porque: 'Tu cliente la conoce: pídele el referido. Es la fuente más tibia que tienes.',
  },
  {
    id: 'cowork',
    texto: 'Un excompañero que ahora administra un cowork',
    fuente: 'agenda',
    porque: 'Ya te conoce: está en tu agenda. Escríbele directo, sin buscar en ninguna parte.',
  },
];

// ---------- Juego parte 3 · ¿A quién sigues primero? ----------
export type ProspectoOrden = {
  id: string;
  nombre: string;
  datos: string;
  encaje: number;
  senal: number;
  acceso: number;
};
export const PROSPECTOS_ORDEN: ProspectoOrden[] = [
  {
    id: 'brisa',
    nombre: 'Café Brisa',
    datos: 'Viña, 2 locales. Reseñas recientes se quejan del café. Solo tienes el correo de contacto de la web.',
    encaje: 3,
    senal: 3,
    acceso: 1,
  },
  {
    id: 'express',
    nombre: 'Café Express',
    datos: 'Cadena de 40 locales con proveedor nacional. No conoces a nadie adentro.',
    encaje: 1,
    senal: 1,
    acceso: 1,
  },
  {
    id: 'mirador',
    nombre: 'Cafetería Mirador',
    datos: 'Cerro Alegre, abrió hace 2 semanas. El dueño te sigue en Instagram y te dio su WhatsApp en una feria.',
    encaje: 3,
    senal: 3,
    acceso: 3,
  },
  {
    id: 'hotel',
    nombre: 'Hotel Costa',
    datos: 'Viña. Publicó que busca proveedor de café para su desayuno, pero compra una central en Santiago.',
    encaje: 1,
    senal: 3,
    acceso: 1,
  },
  {
    id: 'barrasur',
    nombre: 'Barra Sur',
    datos: 'Valparaíso, 1 local, contenta con su proveedor. Conociste al jefe de barra en una feria y tienes su correo.',
    encaje: 3,
    senal: 1,
    acceso: 2,
  },
];

// ---------- Parte 4 ----------
export const ASI_NO =
  'Hola, somos Grano Norte, una tostaduría con más de 5 años de experiencia y café de la más alta calidad. Ofrecemos múltiples soluciones para cafeterías. Te adjunto nuestro catálogo. Quedo atenta a cualquier consulta.';
export const ASI_SI =
  'Hola Diego, vi que abrieron en Cerro Alegre hace dos semanas, ¡felicitaciones! Tostamos a 10 minutos de ustedes y despachamos al día siguiente, así nunca se quedan sin café fresco. ¿Te dejo una muestra de 250 g esta semana para que la prueben en barra?';
export const GUION_VIDEO_2 =
  'Vamos a hacerlo a mano, como lo haría Camila. Abro la planilla: Cafetería Mirador, Cerro Alegre, abrió hace dos semanas, contacto por WhatsApp. Abro WhatsApp y escribo. Primera frase, algo de ellos: «Hola Diego, vi que abrieron en Cerro Alegre hace dos semanas, ¡felicitaciones!». Segunda frase, lo que ganan: «Tostamos a 10 minutos de ustedes y despachamos al día siguiente, así nunca se quedan sin café fresco». Tercera frase, una sola pregunta fácil: «¿Te dejo una muestra de 250 g esta semana para que la prueben en barra?». Lo leo una vez, sin adjuntos ni links, y lo envío. Vuelvo a la planilla y marco «contactado», con el próximo paso y la fecha. Eso es todo. Hoy lo hiciste a mano; después vamos a aprender a automatizar todo esto.';

export const ERRORES = [
  { id: 'nosotros', texto: 'Habla solo de nosotros' },
  { id: 'preguntas', texto: 'Tres preguntas' },
  { id: 'generico', texto: 'Nada específico de esa persona' },
  { id: 'adjunto', texto: 'Adjunta catálogo' },
] as const;
export type ErrorId = (typeof ERRORES)[number]['id'];

export const MENSAJES_ERROR: { mensaje: string; error: ErrorId; porque: string; corregido: string }[] = [
  {
    mensaje:
      'Hola Paula, en Grano Norte somos tostadores con 5 años de trayectoria, trabajamos 8 orígenes y tenemos un equipo apasionado por el café. ¿Te interesa conocernos?',
    error: 'nosotros',
    porque: 'Las tres frases hablan de Grano Norte. A Paula no le dice qué gana ella.',
    corregido:
      'Hola Paula, vi que en Café Brisa sumaron métodos filtrados a la carta. Tenemos dos orígenes pensados para V60 y despachamos al día siguiente. ¿Te dejo una muestra esta semana?',
  },
  {
    mensaje:
      'Hola Diego, vi que abrieron en Cerro Alegre, ¡felicitaciones! ¿Qué café están usando? ¿Están contentos con su proveedor? ¿Te interesaría una muestra?',
    error: 'preguntas',
    porque: 'Tres preguntas seguidas cansan y no sabe cuál contestar. Una sola, fácil de responder.',
    corregido: ASI_SI,
  },
  {
    mensaje:
      'Hola, ¿qué tal? Trabajamos con muchas cafeterías de la región y tenemos café fresco a buen precio. ¿Te puedo mandar una muestra?',
    error: 'generico',
    porque: 'Podría ir a cualquier cafetería. No hay nombre ni señal: suena a mensaje masivo.',
    corregido:
      'Hola Tomás, leí en las reseñas de Barra Sur que varios piden un café menos amargo. Tenemos un tueste medio que suaviza la taza sin cambiar tu máquina. ¿Te dejo 250 g para probarlo en barra?',
  },
  {
    mensaje:
      'Hola Valentina, vi que Café Muelle abrió su segundo local en Viña. Te adjunto nuestro catálogo con precios y la lista de orígenes. ¿Lo revisas y me cuentas?',
    error: 'adjunto',
    porque: 'El primer mensaje abre una conversación: sin adjuntos ni links. El catálogo va cuando lo pida.',
    corregido:
      'Hola Valentina, vi que Café Muelle abrió su segundo local en Viña, ¡felicitaciones! Despachamos al día siguiente a los dos locales con el mismo blend, así la taza sale igual en ambos. ¿Te dejo una muestra para el local nuevo?',
  },
];

// Objeción «mi rubro es distinto» (investigación de demanda, 8-nov-2026): el mismo primer mensaje de 3 frases en
// cuatro rubros B2B chilenos, cada uno por el canal que corresponde (C30). Son ejemplos, no casos reales.
export const EJEMPLOS_RUBRO: { rubro: string; canal: string; mensaje: string }[] = [
  {
    rubro: 'Distribuidora de insumos de aseo',
    canal: 'LinkedIn, a una administradora de edificios que no la conoce',
    mensaje:
      'Hola Carolina, vi en LinkedIn que asumiste la administración de tres edificios en Ñuñoa, ¡felicitaciones! Despachamos los insumos de aseo en 48 horas, con una sola factura mensual por edificio. ¿Te mando la lista de precios para que la compares?',
  },
  {
    rubro: 'Mantención de aire acondicionado',
    canal: 'Correo, a una clínica que encontró en Google Maps',
    mensaje:
      'Hola Andrés, vi que Clínica Sonríe abrió su segunda sucursal en Providencia. Hacemos la mantención de los equipos antes o después de la atención, para no cerrar ningún box. ¿Te acomoda que pasemos una mañana a revisarlos sin costo?',
  },
  {
    rubro: 'Agencia de marketing chica',
    canal: 'Mensaje directo de Instagram, a una tienda que sigue',
    mensaje:
      'Hola Fernanda, vi que en Tienda Lúcuma lanzaron la línea de velas y que las fotos se llenaron de comentarios. Armamos campañas para tiendas chicas con un tope de presupuesto que tú defines. ¿Te muestro en 15 minutos lo que haríamos el primer mes?',
  },
  {
    rubro: 'Contabilidad para pymes',
    canal: 'WhatsApp, a un referido que dio su número',
    mensaje:
      'Hola Rodrigo, Paula de Transportes Ruta 5 me pasó tu número y me contó que estás buscando contador. Llevamos la contabilidad de varias pymes de transporte y entregamos el estado de resultados el día 10 de cada mes. ¿Te llamo el jueves 10 minutos para ver si te calza?',
  },
];

// ---------- Parte 5 ----------
export const SEGUIMIENTOS = [
  {
    dia: 'Día 2',
    nombre: 'Recordatorio útil',
    texto: 'Diego, te comento que la muestra la dejamos sin costo y en 24 h. ¿Te acomoda jueves o viernes?',
  },
  {
    dia: 'Día 7',
    nombre: 'Prueba o caso',
    texto:
      'Te cuento: la Cafetería Puerto cambió a nuestro Blend Cerro en julio y bajó las mermas de molienda. Si quieres te paso el contacto de Rosa para que te cuente.',
  },
  {
    dia: 'Día 14',
    nombre: 'Cierre amable',
    texto:
      'No quiero llenarte de mensajes. Si más adelante necesitas proveedor, aquí estamos. ¿Te escribo en un mes o prefieres que no?',
  },
];

// Cotizaciones que quedaron en nada (bonus sugerido por la investigación de demanda): quien pidió precio ya te dio
// su contacto, así que le escribes por donde te lo pidió. Mismo espaciado de la parte 5, como punto de partida.
export const SEGUIMIENTO_COTIZACION = [
  {
    cuando: 'A los 2 días',
    texto: 'Hola [nombre], te escribo por la cotización de [producto] del [fecha]. Si el monto se pasa de lo que tenías pensado, te armo una versión con [alternativa más simple]. ¿Te la mando?',
  },
  {
    cuando: 'A la semana',
    texto: 'Te cuento: [cliente parecido] partió con [versión chica] y al mes [resultado concreto]. Si quieres, te paso su contacto para que te cuente.',
  },
  {
    cuando: 'A las 2 semanas',
    texto: 'Para no insistir de más: ¿cierro esta cotización o prefieres que te escriba en [mes]?',
  },
];

// ---------- Parte 6 ----------
export const RUTINA = [
  { tramo: '0–5', min: 5, texto: 'Abre la planilla y filtra «fecha = hoy».' },
  { tramo: '5–10', min: 5, texto: 'Envía los seguimientos que tocan.' },
  { tramo: '10–17', min: 7, texto: 'Suma nombres nuevos y mándales el primer mensaje.' },
  { tramo: '17–20', min: 3, texto: 'Actualiza estado, próximo paso y fecha de cada uno.' },
];

export const ALIMENTAR_LISTA: { titulo: string; texto: string }[] = [
  { titulo: 'Una tanda nueva por semana', texto: 'Elige un día fijo para sumar 20 nombres. Si te falta tiempo, que sean 10, pero cada semana.' },
  {
    titulo: 'Pide referidos cuando te digan «gracias»',
    texto: 'Un buen momento para pedir un nombre es justo después de una entrega que salió bien. Pídelo de forma explícita: muchos clientes contentos no recomiendan si nadie se lo pide.',
  },
  { titulo: 'Rota las fuentes', texto: 'Una semana Google Maps, otra Instagram, otra LinkedIn o una feria. Así no se te agota ninguna.' },
  { titulo: 'Recicla los «ahora no»', texto: 'Quien te dijo «más adelante» vuelve a la lista con fecha. A los 30 días ya es un contacto tibio: te conoce.' },
  { titulo: 'Anota las señales al pasar', texto: 'Un local nuevo en tu camino, una publicación buscando proveedor: anótalo en la planilla en el momento.' },
];

// ---------- Cierre ----------
export const QUIZ: { pregunta: string; opciones: string[]; correcta: number; porque: string }[] = [
  {
    pregunta: 'Alguien a quien le escribiste te respondió «ahora no». ¿Qué haces?',
    opciones: [
      'Lo borro.',
      'Seguimiento en 3 días.',
      'Le pregunto cuándo le acomoda y lo dejo con fecha en la planilla.',
    ],
    correcta: 2,
    porque: '«Ahora no» no es «nunca». Con fecha en la planilla vuelve a aparecer el día que toca, sin presionar.',
  },
  {
    pregunta: 'El lunes le escribiste a tus 20 y el martes te respondieron 2. ¿Qué haces?',
    opciones: [
      'Es lo esperado: sigo con los seguimientos y armo la tanda de la próxima semana.',
      'Les vuelvo a escribir hoy mismo a los 18 que no contestaron.',
      'Cambio de rubro: este no funciona.',
    ],
    correcta: 0,
    porque: 'Que respondan 1 o 2 de 20 es la cuenta normal. Lo que vende es la tanda semanal más los seguimientos con fecha.',
  },
  {
    pregunta: 'Tu primer mensaje a una cafetería nueva lleva el catálogo en PDF «para que vean todo». ¿Qué cambias?',
    opciones: [
      'Nada: así se ve más profesional.',
      'Dejo el PDF y agrego el link a la web.',
      'Saco el adjunto y cierro con una sola pregunta fácil.',
    ],
    correcta: 2,
    porque: 'El primer mensaje no vende: abre una conversación. Sin adjuntos ni links, y una sola pregunta.',
  },
  {
    pregunta: 'Pasaron 7 días y Diego no responde. ¿Qué le mandas?',
    opciones: [
      '«¿Viste mi mensaje?»',
      'Un caso o dato que le aporte algo nuevo.',
      'El mismo primer mensaje, por si no le llegó.',
    ],
    correcta: 1,
    porque: 'Cada seguimiento aporta algo nuevo. El del día 7 es la prueba: un caso o un dato.',
  },
  {
    pregunta: 'Terminaste los 5 días: 25 mensajes enviados y 2 respuestas. ¿Qué haces?',
    opciones: [
      'Es la cuenta normal: sigo con los seguimientos y comparo cuando junte 40 a 50 mensajes.',
      'Cambio todo el mensaje: algo está mal.',
      'Dejo de buscar clientes: no funciona.',
    ],
    correcta: 0,
    porque:
      '2 de 25 está dentro de lo normal (1 o 2 de cada 20), y con tan pocos mensajes los números todavía bailan mucho. Si después de 40 a 50 mensajes tienes 0 o 1 respuesta, ahí revisa tu primer mensaje con la parte 4.',
  },
];

export const GUION_VIDEO_CURSO =
  'Lo que hiciste en esta guía funciona: lista, mensaje, seguimientos y rutina. Hoy lo hiciste a mano y con un chat. En el curso «Tu negocio de punta a punta» te enseño a que agentes hagan esto solos: buscan prospectos, preparan los mensajes, te avisan los seguimientos del día y todo queda conectado con tu planilla, corriendo en el fondo. Tú solo apruebas. Y no solo ventas: también marketing, operación, atención al cliente y finanzas.';

export const ENTREGABLE = 'Tu primer CRM: una planilla con 20 posibles clientes contactados, cada uno con su próximo paso y su fecha, y el registro de tus 5 días.';
