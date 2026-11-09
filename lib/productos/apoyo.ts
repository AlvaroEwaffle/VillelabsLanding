// Imágenes de apoyo (el ~80 % de la regla 20/80 de la guía de marca, 8-nov-2026):
// lugares y objetos ligados al contenido, sin personas reconocibles (manos u objetos sí).
// Fotos de Pexels (licencia libre, sin atribución obligatoria; igual dejamos el crédito aquí).
// Archivos en public/fotos/apoyo/, JPEG de 1400 px de ancho, calidad ~78.
// Las ilustraciones propias (motor de personajes LXD) viven en public/productos/caso/.

export type ImagenApoyo = { src: string; alt: string };

export const APOYO = {
  // Celular, mensajes y WhatsApp
  celularMensajes: { src: '/fotos/apoyo/celular-mensajes.jpg', alt: 'Manos escribiendo un mensaje en el celular frente al computador' }, // Vladislav Šmigelski · pexels.com/photo/12355752
  relojNoche: { src: '/fotos/apoyo/reloj-noche.jpg', alt: 'Reloj despertador marcando las 11:38 de la noche en el velador' }, // Gui Salcedo · pexels.com/photo/16483806

  // La tostaduría del caso (Grano Norte) y su bodega
  tostadora: { src: '/fotos/apoyo/tostadora.jpg', alt: 'Granos recién tostados girando en la bandeja de enfriado de la tostadora' }, // Raphael Loquellano · pexels.com/photo/16139709
  tostadoraPanel: { src: '/fotos/apoyo/tostadora-panel.jpg', alt: 'Panel de control de una tostadora de café' }, // cottonbro studio · pexels.com/photo/4820811
  tostaduriaPlanta: { src: '/fotos/apoyo/tostaduria-planta.jpg', alt: 'Vista desde arriba de una tostaduría: la tostadora, una mesa con notebook y las herramientas' }, // cottonbro studio · pexels.com/photo/4820783
  bodegaSacos: { src: '/fotos/apoyo/bodega-sacos.jpg', alt: 'Bodega de una tostaduría con sacos de café verde sobre pallets' }, // cottonbro studio · pexels.com/photo/4820781
  sacosCafe: { src: '/fotos/apoyo/sacos-cafe.jpg', alt: 'Sacos de café apilados en la bodega' }, // Diego Abello Rico · pexels.com/photo/13830911
  bolsasKraft: { src: '/fotos/apoyo/bolsas-kraft.jpg', alt: 'Bolsas de café en papel kraft apiladas, listas para despachar' }, // Alinson Torres · pexels.com/photo/34891786
  granoCuchara: { src: '/fotos/apoyo/grano-cuchara.jpg', alt: 'Cuchara de madera con café en grano sobre una mesa' }, // Picas Joe · pexels.com/photo/11348016

  // Las cafeterías clientes
  cafeteria: { src: '/fotos/apoyo/cafeteria.jpg', alt: 'Cafetería luminosa con mesas y sillas vacías' }, // Gül Işık · pexels.com/photo/15860802
  cafeteriaBarra: { src: '/fotos/apoyo/cafeteria-barra.jpg', alt: 'Barra de una cafetería con vitrina de pasteles y luz cálida' }, // Việt Anh Nguyễn · pexels.com/photo/31710814
  cafeteriaTaza: { src: '/fotos/apoyo/cafeteria-taza.jpg', alt: 'Taza de café sobre una mesa con la barra de la cafetería al fondo' }, // Rachel Claire · pexels.com/photo/5864250

  // Despacho y operación
  cajasDespacho: { src: '/fotos/apoyo/cajas-despacho.jpg', alt: 'Cajas de despacho junto a un carro de carga en la puerta de la bodega' }, // Tima Miroshnichenko · pexels.com/photo/6169055
  cajasEtiquetas: { src: '/fotos/apoyo/cajas-etiquetas.jpg', alt: 'Cajas con etiqueta de envío vistas desde arriba' }, // Polina Tankilevitch · pexels.com/photo/4440794

  // Escritorio, planilla, calendario y oficina
  calendario: { src: '/fotos/apoyo/calendario.jpg', alt: 'Calendario mensual impreso sobre un escritorio oscuro junto al notebook' }, // PNW Production · pexels.com/photo/8250989
  escritorioNoche: { src: '/fotos/apoyo/escritorio-noche.jpg', alt: 'Cuaderno negro, lápiz, café y notebook sobre una mesa de madera' }, // Polina · pexels.com/photo/5827789
  escritorioClaro: { src: '/fotos/apoyo/escritorio-claro.jpg', alt: 'Escritorio visto desde arriba con notebook, cuaderno abierto y una taza de café' }, // Katrin Bolovtsova · pexels.com/photo/6193649
  escritorioManos: { src: '/fotos/apoyo/escritorio-manos.jpg', alt: 'Manos escribiendo en el teclado de un notebook' }, // Vitaly Gariev · pexels.com/photo/20955062
  planilla: { src: '/fotos/apoyo/planilla.jpg', alt: 'Lápiz apuntando una fila de una planilla impresa junto a la calculadora' }, // RDNE Stock project · pexels.com/photo/8292880
  listaCheck: { src: '/fotos/apoyo/lista-check.jpg', alt: 'Mano marcando una lista de tareas en un cuaderno' }, // Jakub Zerdzicki · pexels.com/photo/35719571
  finanzas: { src: '/fotos/apoyo/finanzas.jpg', alt: 'Mano con una calculadora sobre una factura' }, // Kindel Media · pexels.com/photo/7688524
  contenidoTripode: { src: '/fotos/apoyo/contenido-tripode.jpg', alt: 'Celular en un trípode grabando una mesa con productos' }, // Polina Tankilevitch · pexels.com/photo/7669541
  tableroLaptop: { src: '/fotos/apoyo/tablero-laptop.jpg', alt: 'Notebook con un tablero de indicadores en pantalla' }, // Lukas Blazek · pexels.com/photo/577210
  tableroKanban: { src: '/fotos/apoyo/tablero-kanban.jpg', alt: 'Tablero de tareas con notas adhesivas en una pared oscura' }, // cottonbro studio · pexels.com/photo/6804093
  oficina: { src: '/fotos/apoyo/oficina.jpg', alt: 'Oficina con escritorios de madera, notebooks y audífonos' }, // Pavel Danilyuk · pexels.com/photo/7658310
  mesaCafe: { src: '/fotos/apoyo/mesa-cafe.jpg', alt: 'Notebook y un café con leche sobre una mesa de madera' }, // Pixabay · pexels.com/photo/414584
  escribir: { src: '/fotos/apoyo/escribir.jpg', alt: 'Mano escribiendo en un notebook con la pantalla en blanco' }, // Lukas Blazek · pexels.com/photo/574089

  // Workshop online
  microfono: { src: '/fotos/apoyo/microfono.jpg', alt: 'Micrófono en un brazo articulado frente a la pantalla, listo para transmitir' }, // Alpha En · pexels.com/photo/31726558
  workshopOnline: { src: '/fotos/apoyo/workshop-online.jpg', alt: 'Audífonos con micrófono sobre un notebook, listos para la sesión en vivo' }, // Yan Krukau · pexels.com/photo/8866719
  salaReunion: { src: '/fotos/apoyo/sala-reunion.jpg', alt: 'Sala de reuniones vacía con una pizarra blanca' }, // Mikhail Nilov · pexels.com/photo/9301900

  // Ilustraciones propias (motor de personajes LXD, escenas del caso Grano Norte)
  escenaBodega: { src: '/productos/caso/escena-bodega.webp', alt: 'Ilustración: Camila trabaja en su notebook con la bodega de Grano Norte detrás' },
  escenaDespacho: { src: '/productos/caso/escena-despacho.webp', alt: 'Ilustración: Camila revisa los pedidos en el andén de despacho de Grano Norte' },
  escenaNoche: { src: '/productos/caso/escena-noche.webp', alt: 'Ilustración: Camila, preocupada, mira su celular de noche' },
  escenaCalendario: { src: '/productos/caso/escena-calendario.webp', alt: 'Ilustración: Camila con su celular frente al calendario de la semana' },
  // Ilustración SVG propia (sin logos de apps): el celular con los chats pendientes.
  celularPendientes: { src: '/productos/caso/celular-pendientes.svg', alt: 'Ilustración: celular con la lista de chats y 23 mensajes sin responder' },
} as const satisfies Record<string, ImagenApoyo>;

export type ApoyoId = keyof typeof APOYO;
