export interface CaseStudyMeta {
  slug: string;
  heroImage: string;
}

export interface CaseStudyTranslation {
  slug: string;
  title: string;
  client: string;
  category: string;
  result: string;
  context: string;
  challenge: string;
  approach: string[];
  results: { metric: string; value: string }[];
  testimonial: { quote: string; author: string; role: string };
  ctaText: string;
}

// Structural data (language-independent)
export const caseStudyMeta: CaseStudyMeta[] = [
  {
    slug: 'puchacay',
    heroImage: 'https://cerveceriapuchacay.cl/assets/HeroBg.D9CN-gY4_Tqj8v.webp',
  },
  {
    slug: 'ewaffle',
    heroImage: 'https://ewaffle.cl/assets/CoverEwaffle.png',
  },
  {
    slug: 'fidelidapp',
    heroImage: 'https://res.cloudinary.com/di92lsbym/image/upload/q_auto/f_webp/v1733268677/FidelidApp/Assets/Cover3_sybmbq.jpg',
  },
  {
    slug: 'defensa-total',
    heroImage: 'https://defensatotalabogados.cl/img/Hero.png',
  },
  {
    slug: 'revenue-ai-system',
    heroImage: 'https://res.cloudinary.com/di92lsbym/image/upload/v1739838001/photo-1553877522-43269d4ea984_k7fgug_1_anllid.webp',
  },
  {
    slug: 'dra-oyarzun',
    heroImage: 'https://draoyarzun.pages.dev/assets/HeroProfile.png',
  },
  {
    slug: 'samy-studio',
    heroImage: 'https://samy-studio.com/assets/january/Fotos/IMG_4812.JPG',
  },
  {
    slug: 'conexion-industrial',
    heroImage: 'https://conexionindustrial.cl/bgphotos/home.png',
  },
];

export function getCaseStudyMeta(slug: string): CaseStudyMeta | undefined {
  return caseStudyMeta.find((cs) => cs.slug === slug);
}

// Spanish case studies
export const caseStudiesEs: CaseStudyTranslation[] = [
  {
    slug: 'puchacay',
    title: 'De Instagram DMs a un Embudo de E-commerce Completo',
    client: 'Cervecería Puchacay',
    category: 'E-commerce + Embudo',
    result: '+120% leads, +35% ventas online',
    context:
      'Cervecería Puchacay es una cervecería artesanal del sur de Chile, conocida por producir cervezas de alta calidad con seguidores locales leales. A pesar de tener un gran producto, no tenían presencia de ventas online. Los pedidos se tomaban manualmente por Instagram DMs, lo que limitaba su alcance y les costaba ventas cada fin de semana.',
    challenge:
      'Sin una plataforma de e-commerce, la cervecería estaba dejando dinero sobre la mesa. Clientes que querían comprar fuera de horario o desde otras ciudades no tenían forma de hacer pedidos. No había embudo de ventas estructurado, ni analytics, ni forma de hacer seguimiento a visitantes interesados.',
    approach: [
      'Construimos un sitio e-commerce responsive optimizado para compras móviles, con catálogo limpio y checkout simplificado',
      'Implementamos un embudo de conversión completo: landing con storytelling de marca, catálogo con notas de cata, carrito y checkout integrado',
      'Integramos WhatsApp para seguimiento post-compra y actualizaciones de pedidos, manteniendo el toque personal que sus clientes valoraban',
      'Configuramos tracking de analytics en todo el embudo para identificar puntos de abandono y optimizar conversión en cada etapa',
    ],
    results: [
      { metric: 'Generación de Leads', value: '+120%' },
      { metric: 'Ventas Online', value: '+35%' },
      { metric: 'Tiempo de Procesamiento', value: '-60%' },
      { metric: 'Tasa de Recompra', value: '+45%' },
    ],
    testimonial: {
      quote: 'Pasamos de tomar pedidos por Instagram a tener una máquina de ventas real. El embudo que Álvaro construyó cambió todo para nosotros.',
      author: 'Diego Soto',
      role: 'Fundador, Cervecería Puchacay',
    },
    ctaText: '¿Listo para convertir tu presencia online en un motor de ventas?',
  },
  {
    slug: 'ewaffle',
    title: 'Un Rediseño Estratégico que Convirtió Visitantes en Clientes',
    client: 'Ewaffle',
    category: 'Web Estratégica',
    result: '+40% conversión en 3 meses',
    context:
      'Ewaffle es una agencia de contenido y creativa que produce trabajo de alta calidad para marcas establecidas. Pero su propio sitio web no reflejaba ese calibre. En un mercado saturado de agencias que se ven y suenan igual, Ewaffle luchaba por destacarse online.',
    challenge:
      'El sitio web tenía una tasa de conversión baja, con la mayoría de visitantes rebotando en segundos. La propuesta de valor estaba enterrada bajo mensajes vagos, y los potenciales clientes no podían entender rápidamente qué hacía Ewaffle diferente. El flujo de contacto era torpe, con demasiados pasos entre interés y acción.',
    approach: [
      'Rediseño completo con arquitectura enfocada en conversión que guiaba visitantes de curiosidad a contacto en un flujo claro e intencional',
      'Posicionamiento claro de servicios que comunicaba inmediatamente qué hace Ewaffle, a quién sirve y por qué es diferente',
      'Integración de casos de estudio reales con resultados medibles directamente en el homepage para construir confianza temprano',
      'Simplificación del flujo de contacto de múltiples pasos a una sola acción sin fricción con múltiples puntos de entrada',
    ],
    results: [
      { metric: 'Tasa de Conversión', value: '+40%' },
      { metric: 'Duración Promedio de Sesión', value: '+85%' },
      { metric: 'Tasa de Rebote', value: '-30%' },
      { metric: 'Leads Calificados/Mes', value: '2x' },
    ],
    testimonial: {
      quote: 'No fue solo un rediseño. Álvaro reconstruyó todo nuestro posicionamiento digital. Los clientes ahora entienden lo que hacemos antes de llamar.',
      author: 'Equipo Ewaffle',
      role: 'Agencia Creativa',
    },
    ctaText: '¿Listo para que tu sitio web sea tu mejor vendedor?',
  },
  {
    slug: 'fidelidapp',
    title: 'Escalando una Plataforma SaaS sin Escalar el Equipo de Soporte',
    client: 'Fidelidapp',
    category: 'Plataforma SaaS',
    result: '-80% carga de soporte manual',
    context:
      'Fidelidapp es una plataforma SaaS de programas de fidelización con una base creciente de negocios que la usan para gestionar recompensas y campañas de retención. A medida que la plataforma ganaba tracción, el equipo de soporte se vio desbordado. Cada onboarding de nuevo cliente requería acompañamiento manual.',
    challenge:
      'Los procesos de onboarding manual significaban que cada nuevo cliente tomaba horas de tiempo del staff. Consultas repetitivas de soporte consumían al equipo sin opción de autoservicio. La falta de herramientas admin para operaciones masivas hacía tediosas hasta las tareas simples. Los costos de soporte se comían los márgenes.',
    approach: [
      'Construimos un dashboard de autoservicio completo que daba a los usuarios control sobre sus cuentas, reduciendo la necesidad de contactar soporte',
      'Diseñamos e implementamos un flujo de onboarding automatizado que guiaba nuevos usuarios desde signup hasta su primera campaña sin intervención manual',
      'Creamos integración de base de conocimiento con ayuda contextual en toda la plataforma, respondiendo preguntas antes de que los usuarios necesitaran preguntar',
      'Desarrollamos un panel admin con operaciones masivas y herramientas de gestión que permitían al equipo manejar tareas en minutos en vez de horas',
    ],
    results: [
      { metric: 'Tickets de Soporte', value: '-80%' },
      { metric: 'Tiempo de Onboarding', value: '-65%' },
      { metric: 'Satisfacción del Cliente', value: '+25%' },
      { metric: 'Equipo de Soporte Necesario', value: '-50%' },
    ],
    testimonial: {
      quote: 'Contratábamos más soporte cada trimestre. Después de reconstruir la plataforma, redujimos el equipo y mejoramos los índices de satisfacción.',
      author: 'Equipo Fidelidapp',
      role: 'Plataforma SaaS',
    },
    ctaText: '¿Listo para escalar tu plataforma sin escalar tus problemas?',
  },
  {
    slug: 'defensa-total',
    title: 'Sistema de Generación de Leads para Servicios Legales',
    client: 'Defensa Total',
    category: 'Generación de Leads',
    result: '+200% leads calificados en 60 días',
    context:
      'Defensa Total es una firma de servicios legales chilena especializada en defensa penal, derecho laboral y derecho de familia. A pesar de una excelente trayectoria y fuerte reputación boca a boca, la firma tenía cero presencia digital. Competidores con representación inferior ganaban clientes simplemente porque aparecían en Google.',
    challenge:
      'La firma no tenía sitio web, ni mecanismo de captura de leads, ni forma de mostrar su expertise digitalmente. Clientes potenciales buscando ayuda legal encontraban a la competencia primero. Los socios eran escépticos de que el marketing digital funcionara para una profesión construida sobre confianza y referidos personales.',
    approach: [
      'Construimos una landing page enfocada en conversión con posicionamiento claro en sus tres áreas de práctica — defensa penal, derecho laboral y derecho de familia — cada una con secciones dedicadas',
      'Implementamos un formulario de calificación de leads que filtraba consultas por tipo de caso, urgencia y ubicación, asegurando que los abogados solo recibieran consultas que pudieran atender',
      'Creamos una estrategia de contenido con páginas FAQ respondiendo preguntas legales comunes en español simple, apuntando a las búsquedas exactas que hacen los potenciales clientes',
      'Configuramos integración con WhatsApp con routing automático para que leads calificados recibieran respuesta en menos de 5 minutos durante horario laboral',
    ],
    results: [
      { metric: 'Leads Calificados', value: '+200%' },
      { metric: 'Costo por Lead', value: '-45%' },
      { metric: 'Tiempo de Respuesta', value: '<5 min' },
      { metric: 'Tasa de Conversión', value: '+60%' },
    ],
    testimonial: {
      quote: 'Éramos invisibles online. Ahora recibimos más consultas calificadas del sitio web que de todas nuestras redes de referidos combinadas.',
      author: 'Marcelo Gutiérrez',
      role: 'Socio Director, Defensa Total',
    },
    ctaText: '¿Listo para hacer visibles tus servicios profesionales ante los clientes que te necesitan?',
  },
  {
    slug: 'revenue-ai-system',
    title: 'Plataforma de IA que Automatiza Operaciones de Revenue',
    client: 'Revenue AI System',
    category: 'IA Empresarial',
    result: '-70% ops manuales, 3x rendimiento',
    context:
      'Una empresa mediana con un equipo creciente se ahogaba en procesos manuales que consumían la mayoría de sus horas de trabajo. Gestión de email, calificación de leads, respuestas de soporte y procesamiento de documentos — todo manejado por personas haciendo trabajo repetitivo y basado en reglas que nunca terminaba.',
    challenge:
      'El equipo pasaba más del 60% de su tiempo en tareas repetitivas. Múltiples herramientas desconectadas habían creado silos de datos. Intentos previos de automatización fallaron porque intentaban reemplazar flujos completos en vez de augmentarlos, lo que generó resistencia del equipo.',
    approach: [
      'Auditamos todos los procesos manuales e identificamos los objetivos de automatización con mayor ROI: triage de email, calificación de leads y extracción de datos estructurados',
      'Construimos una plataforma de IA modular con integración GPT-4 para procesamiento de lenguaje natural — leer emails, puntuar leads, generar borradores de respuesta',
      'Creamos workflows automatizados que mantenían humanos en el loop para decisiones críticas mientras manejaban tareas rutinarias autónomamente',
      'Implementamos un dashboard en tiempo real mostrando tiempo ahorrado, tareas automatizadas e impacto directo en revenue',
    ],
    results: [
      { metric: 'Operaciones Manuales', value: '-70%' },
      { metric: 'Rendimiento', value: '3x' },
      { metric: 'Capacidad Liberada', value: '+25 hrs/sem' },
      { metric: 'Timeline de ROI', value: '<90 días' },
    ],
    testimonial: {
      quote: 'Esto no es solo automatización. Es una forma completamente nueva de operar. La plataforma se pagó sola en el primer mes.',
      author: 'Líder Técnico',
      role: 'Cliente Empresarial',
    },
    ctaText: '¿Listo para construir un sistema de IA que realmente funcione para tu negocio?',
  },
  {
    slug: 'dra-oyarzun',
    title: 'Presencia Digital Premium para Clínica de Estética Facial',
    client: 'Dra. Oyarzun',
    category: 'Web + Reservas',
    result: '+150% reservas online en 2 meses',
    context:
      'La Dra. Oyarzun es una especialista en estética facial con años de experiencia y una reputación sólida entre sus pacientes. Sin embargo, su presencia digital no reflejaba la calidad premium de sus servicios. La mayoría de sus pacientes llegaban por referidos, pero el potencial de crecimiento online estaba completamente desaprovechado.',
    challenge:
      'No existía un sitio web profesional que transmitiera la confianza y exclusividad que los pacientes esperan de un servicio médico-estético. Las reservas se hacían solo por teléfono, lo que limitaba la captación fuera de horario. No había forma de mostrar tratamientos, credenciales ni testimonios de pacientes satisfechos.',
    approach: [
      'Diseñamos un sitio web premium con fotografía profesional que transmite confianza, exclusividad y expertise médico desde el primer segundo',
      'Implementamos sistema de reservas online integrado que permite agendar consultas 24/7 sin necesidad de llamar',
      'Creamos páginas dedicadas por tratamiento con información detallada, preguntas frecuentes y señales de confianza (credenciales, certificaciones)',
      'Optimizamos para SEO local para que apareciera en búsquedas de estética facial en su zona de atención',
    ],
    results: [
      { metric: 'Reservas Online', value: '+150%' },
      { metric: 'Consultas Fuera de Horario', value: '+80%' },
      { metric: 'Tráfico Orgánico', value: '+120%' },
      { metric: 'Tasa de Conversión', value: '+45%' },
    ],
    testimonial: {
      quote: 'Ahora mis pacientes pueden agendar en cualquier momento y llegan informados sobre los tratamientos. El sitio trabaja por mí las 24 horas.',
      author: 'Dra. Oyarzun',
      role: 'Especialista en Estética Facial',
    },
    ctaText: '¿Listo para que tu consulta tenga la presencia digital que merece?',
  },
  {
    slug: 'samy-studio',
    title: 'Academia de Contenido con Experiencia de Marca Premium',
    client: 'Samy Studio',
    category: 'Web + Lead Gen',
    result: '+90% inscripciones en 45 días',
    context:
      'Samy Studio es una academia de creación de contenido que enseña a emprendedores y marcas a producir contenido profesional. Tenían una comunidad activa en redes sociales pero no lograban convertir seguidores en alumnos pagos. Su landing anterior era genérica y no comunicaba el valor diferencial de sus programas.',
    challenge:
      'El sitio existente no diferenciaba a Samy Studio de las docenas de "cursos de contenido" disponibles online. No había un flujo claro de conversión, ni testimonios visibles, ni forma de mostrar el antes/después del trabajo de sus alumnos. Los potenciales alumnos no entendían por qué pagar por algo que podrían aprender gratis en YouTube.',
    approach: [
      'Rediseñamos la web con un enfoque de marca premium que posiciona a Samy Studio como academia profesional, no como un curso online más',
      'Implementamos un embudo de inscripción con video de presentación, testimonios en video de alumnos y galería de trabajos antes/después',
      'Creamos landing pages específicas por programa con pricing claro, garantía de satisfacción y conteo regresivo para generar urgencia real',
      'Configuramos email marketing con secuencia de nurture para leads que no compraron inmediatamente',
    ],
    results: [
      { metric: 'Inscripciones', value: '+90%' },
      { metric: 'Tasa de Conversión', value: '+55%' },
      { metric: 'Ticket Promedio', value: '+30%' },
      { metric: 'Leads de Email', value: '3x' },
    ],
    testimonial: {
      quote: 'El nuevo sitio comunica exactamente lo que somos. Los alumnos llegan convencidos antes de la primera clase.',
      author: 'Equipo Samy Studio',
      role: 'Academia de Contenido',
    },
    ctaText: '¿Listo para que tu academia convierta seguidores en alumnos?',
  },
  {
    slug: 'conexion-industrial',
    title: 'Directorio Industrial con Búsqueda y Perfiles de Empresas',
    client: 'Conexión Industrial',
    category: 'Plataforma Web',
    result: '+300% empresas registradas en 3 meses',
    context:
      'Conexión Industrial es un directorio digital de empresas del sector industrial chileno. Buscaban crear una plataforma que conectara proveedores con compradores del rubro, reemplazando los viejos directorios en papel y las búsquedas fragmentadas en Google.',
    challenge:
      'El sector industrial en Chile dependía de relaciones personales y directorios obsoletos para encontrar proveedores. No existía una plataforma centralizada, moderna y fácil de usar. Las empresas industriales son tradicionalmente reacias a adoptar herramientas digitales, así que la plataforma necesitaba ser extremadamente simple.',
    approach: [
      'Construimos una plataforma web con sistema de búsqueda por rubro, ubicación y tipo de servicio, con filtros intuitivos pensados para usuarios no técnicos',
      'Diseñamos perfiles de empresa completos con información de contacto, catálogo de servicios, certificaciones y ubicación en mapa',
      'Implementamos un flujo de registro simplificado en 3 pasos para que las empresas pudieran crear su perfil en menos de 5 minutos',
      'Creamos un sistema de categorización por industria con taxonomía estándar del sector para facilitar la búsqueda',
    ],
    results: [
      { metric: 'Empresas Registradas', value: '+300%' },
      { metric: 'Búsquedas Mensuales', value: '+500%' },
      { metric: 'Conexiones Generadas', value: '+200%' },
      { metric: 'Tiempo de Registro', value: '<5 min' },
    ],
    testimonial: {
      quote: 'Por primera vez, las empresas industriales tienen un lugar digital donde encontrarse. La plataforma simplificó lo que antes tomaba semanas de búsqueda.',
      author: 'Equipo Conexión Industrial',
      role: 'Directorio Industrial',
    },
    ctaText: '¿Listo para construir la plataforma que conecte a tu industria?',
  },
];

// English case studies
export const caseStudiesEn: CaseStudyTranslation[] = [
  {
    slug: 'puchacay',
    title: 'From Instagram DMs to a Full E-commerce Funnel',
    client: 'Cerveceria Puchacay',
    category: 'E-commerce + Funnel',
    result: '+120% leads, +35% online sales',
    context: 'Cerveceria Puchacay is a craft brewery based in southern Chile, known for producing high-quality artisan beers with a loyal local following. Despite having a great product, they had virtually no online sales presence. Orders were taken manually through Instagram DMs, limiting their reach.',
    challenge: 'Without an e-commerce platform, the brewery was leaving money on the table. Customers who wanted to buy outside of business hours or from other cities had no way to order. There was no structured sales funnel, no analytics, and no way to follow up with interested visitors.',
    approach: [
      'Built a responsive e-commerce site optimized for mobile purchases, with a clean product showcase and streamlined checkout flow',
      'Implemented a full conversion funnel: landing page with brand storytelling, product catalog with tasting notes, cart system, and integrated checkout',
      'Integrated WhatsApp for post-purchase follow-up and order status updates, keeping the personal touch their customers loved',
      'Added analytics tracking across the entire funnel to identify drop-off points and optimize conversion at every stage',
    ],
    results: [
      { metric: 'Lead Generation', value: '+120%' },
      { metric: 'Online Sales', value: '+35%' },
      { metric: 'Order Processing Time', value: '-60%' },
      { metric: 'Return Customer Rate', value: '+45%' },
    ],
    testimonial: { quote: 'We went from taking orders on Instagram to having a real sales machine. The funnel Alvaro built changed everything for us.', author: 'Diego Soto', role: 'Founder, Cerveceria Puchacay' },
    ctaText: 'Ready to turn your online presence into a sales engine?',
  },
  {
    slug: 'ewaffle',
    title: 'A Strategic Redesign That Turned Visitors Into Clients',
    client: 'Ewaffle',
    category: 'Strategic Website',
    result: '+40% conversion in 3 months',
    context: 'Ewaffle is a content and creative agency that produces high-quality work for established brands. But their own website did not reflect that caliber. In a crowded market, Ewaffle was struggling to stand out online.',
    challenge: 'The website had a low conversion rate, with most visitors bouncing within seconds. The value proposition was buried under vague messaging, and the contact flow was clunky with too many steps between interest and action.',
    approach: [
      'Complete redesign with a conversion-focused architecture guiding visitors from curiosity to contact',
      'Crafted clear service positioning that immediately communicated what Ewaffle does and why they are different',
      'Integrated real case studies with measurable outcomes directly into the homepage',
      'Streamlined the contact flow to a single, frictionless action with multiple entry points',
    ],
    results: [
      { metric: 'Conversion Rate', value: '+40%' },
      { metric: 'Average Session Duration', value: '+85%' },
      { metric: 'Bounce Rate', value: '-30%' },
      { metric: 'Qualified Leads/Month', value: '2x' },
    ],
    testimonial: { quote: 'It was not just a redesign. Alvaro rebuilt our entire digital positioning. Clients now understand what we do before they even call.', author: 'Team Ewaffle', role: 'Creative Agency' },
    ctaText: 'Ready to turn your website into your best salesperson?',
  },
  {
    slug: 'fidelidapp',
    title: 'Scaling a SaaS Platform Without Scaling the Support Team',
    client: 'Fidelidapp',
    category: 'SaaS Platform',
    result: '-80% manual support load',
    context: 'Fidelidapp is a loyalty program SaaS platform with a growing user base. As the platform gained traction, the support team was overwhelmed. Every new client onboarding required manual hand-holding.',
    challenge: 'Manual onboarding processes meant each new client took hours of staff time. Repetitive support queries consumed the team with no self-service option. Support costs were eating into margins.',
    approach: [
      'Built a comprehensive self-service dashboard giving users control over their accounts',
      'Designed an automated onboarding flow guiding new users from signup to first campaign without manual intervention',
      'Created a knowledge base with contextual help throughout the platform',
      'Developed an admin panel with bulk operations and management tools',
    ],
    results: [
      { metric: 'Support Tickets', value: '-80%' },
      { metric: 'User Onboarding Time', value: '-65%' },
      { metric: 'Customer Satisfaction', value: '+25%' },
      { metric: 'Support Team Size Needed', value: '-50%' },
    ],
    testimonial: { quote: 'We were hiring more support staff every quarter. After the platform rebuild, we actually reduced the team and improved satisfaction scores.', author: 'Fidelidapp Team', role: 'SaaS Platform' },
    ctaText: 'Ready to scale your platform without scaling your problems?',
  },
  {
    slug: 'defensa-total',
    title: 'Lead Generation System for Legal Services',
    client: 'Defensa Total',
    category: 'Lead Generation',
    result: '+200% qualified leads in 60 days',
    context: 'Defensa Total is a well-established Chilean legal services firm. Despite an excellent track record, the firm had zero digital presence. Competitors were winning clients simply because they appeared in Google searches.',
    challenge: 'No website, no lead capture mechanism, no way to showcase expertise digitally. The managing partners were skeptical that digital marketing could work for a profession built on trust and referrals.',
    approach: [
      'Built a conversion-focused landing page with clear service positioning across three core practice areas',
      'Implemented a lead qualification form filtering inquiries by case type, urgency, and location',
      'Created FAQ-style content targeting exact search queries potential clients use',
      'Set up WhatsApp integration with automated routing for sub-5-minute response times',
    ],
    results: [
      { metric: 'Qualified Leads', value: '+200%' },
      { metric: 'Cost per Lead', value: '-45%' },
      { metric: 'Response Time', value: '<5 min' },
      { metric: 'Client Conversion Rate', value: '+60%' },
    ],
    testimonial: { quote: 'We were invisible online. Now we get more qualified consultations from the website than from all our referral networks combined.', author: 'Marcelo Gutierrez', role: 'Managing Partner, Defensa Total' },
    ctaText: 'Ready to make your professional services visible to the clients who need you?',
  },
  {
    slug: 'revenue-ai-system',
    title: 'Enterprise AI Platform That Automates Revenue Operations',
    client: 'Revenue AI System',
    category: 'Enterprise AI',
    result: '-70% manual ops, 3x throughput',
    context: 'A mid-size company drowning in manual processes. Email management, lead qualification, support responses, and document processing — all handled by people doing repetitive, rules-based work.',
    challenge: 'The team spent over 60% of their time on repetitive tasks. Multiple disconnected tools created data silos. Previous automation attempts failed because they tried to replace entire workflows.',
    approach: [
      'Audited all manual processes and identified highest-ROI automation targets',
      'Built a modular AI platform with GPT-4 integration for NLP tasks',
      'Created automated workflows keeping humans in the loop for critical decisions',
      'Implemented a real-time dashboard showing time saved and revenue impact',
    ],
    results: [
      { metric: 'Manual Operations', value: '-70%' },
      { metric: 'Processing Throughput', value: '3x' },
      { metric: 'Team Capacity Freed', value: '+25 hrs/week' },
      { metric: 'ROI Timeline', value: '<90 days' },
    ],
    testimonial: { quote: 'This is not just automation. It is an entirely new way of operating. The platform paid for itself in the first month.', author: 'Technical Lead', role: 'Enterprise Client' },
    ctaText: 'Ready to build an AI system that actually works for your business?',
  },
  {
    slug: 'dra-oyarzun',
    title: 'Premium Digital Presence for Facial Aesthetics Clinic',
    client: 'Dra. Oyarzun',
    category: 'Web + Bookings',
    result: '+150% online bookings in 2 months',
    context: 'Dra. Oyarzun is a facial aesthetics specialist with years of experience and a solid reputation. However, her digital presence did not reflect the premium quality of her services.',
    challenge: 'No professional website conveying trust and exclusivity. Bookings only by phone, limiting after-hours capture. No way to showcase treatments, credentials, or patient testimonials.',
    approach: [
      'Designed a premium website with professional photography conveying trust, exclusivity, and medical expertise',
      'Implemented an online booking system enabling 24/7 appointment scheduling',
      'Created dedicated treatment pages with detailed information, FAQs, and trust signals',
      'Optimized for local SEO to appear in facial aesthetics searches in her area',
    ],
    results: [
      { metric: 'Online Bookings', value: '+150%' },
      { metric: 'After-Hours Inquiries', value: '+80%' },
      { metric: 'Organic Traffic', value: '+120%' },
      { metric: 'Conversion Rate', value: '+45%' },
    ],
    testimonial: { quote: 'Now my patients can book anytime and arrive informed about treatments. The site works for me 24 hours a day.', author: 'Dra. Oyarzun', role: 'Facial Aesthetics Specialist' },
    ctaText: 'Ready for your practice to have the digital presence it deserves?',
  },
  {
    slug: 'samy-studio',
    title: 'Content Academy with Premium Brand Experience',
    client: 'Samy Studio',
    category: 'Web + Lead Gen',
    result: '+90% enrollments in 45 days',
    context: 'Samy Studio is a content creation academy teaching entrepreneurs and brands to produce professional content. They had an active social media community but could not convert followers into paying students.',
    challenge: 'The existing site did not differentiate Samy Studio from dozens of online content courses. No clear conversion flow, no visible testimonials, no before/after portfolio.',
    approach: [
      'Redesigned the website with a premium brand approach positioning Samy Studio as a professional academy',
      'Implemented an enrollment funnel with video presentation, student video testimonials, and before/after gallery',
      'Created program-specific landing pages with clear pricing, satisfaction guarantee, and real urgency',
      'Set up email marketing with nurture sequence for leads who did not purchase immediately',
    ],
    results: [
      { metric: 'Enrollments', value: '+90%' },
      { metric: 'Conversion Rate', value: '+55%' },
      { metric: 'Average Ticket', value: '+30%' },
      { metric: 'Email Leads', value: '3x' },
    ],
    testimonial: { quote: 'The new site communicates exactly what we are. Students arrive convinced before the first class.', author: 'Samy Studio Team', role: 'Content Academy' },
    ctaText: 'Ready for your academy to convert followers into students?',
  },
  {
    slug: 'conexion-industrial',
    title: 'Industrial Directory with Search and Company Profiles',
    client: 'Conexion Industrial',
    category: 'Web Platform',
    result: '+300% registered companies in 3 months',
    context: 'Conexion Industrial is a digital directory for Chilean industrial companies, seeking to create a platform connecting suppliers with buyers, replacing outdated paper directories.',
    challenge: 'The industrial sector relied on personal relationships and obsolete directories to find suppliers. No centralized, modern, easy-to-use platform existed. Industrial companies are traditionally reluctant to adopt digital tools.',
    approach: [
      'Built a web platform with search by industry, location, and service type with intuitive filters',
      'Designed complete company profiles with contact info, service catalog, certifications, and map location',
      'Implemented a simplified 3-step registration flow for under 5 minutes',
      'Created an industry categorization system with standard taxonomy',
    ],
    results: [
      { metric: 'Registered Companies', value: '+300%' },
      { metric: 'Monthly Searches', value: '+500%' },
      { metric: 'Connections Generated', value: '+200%' },
      { metric: 'Registration Time', value: '<5 min' },
    ],
    testimonial: { quote: 'For the first time, industrial companies have a digital place to find each other. The platform simplified what used to take weeks of searching.', author: 'Conexion Industrial Team', role: 'Industrial Directory' },
    ctaText: 'Ready to build the platform that connects your industry?',
  },
];

// Helper to get case studies by language
export function getCaseStudies(lang: 'es' | 'en'): CaseStudyTranslation[] {
  return lang === 'es' ? caseStudiesEs : caseStudiesEn;
}

export function getCaseStudy(slug: string, lang: 'es' | 'en' = 'es'): (CaseStudyTranslation & { heroImage: string }) | undefined {
  const studies = getCaseStudies(lang);
  const study = studies.find((cs) => cs.slug === slug);
  const meta = getCaseStudyMeta(slug);
  if (!study || !meta) return undefined;
  return { ...study, heroImage: meta.heroImage };
}

// Backwards compatibility
export type CaseStudy = CaseStudyTranslation & { heroImage: string };
export const caseStudies: CaseStudy[] = caseStudiesEs.map((cs) => ({
  ...cs,
  heroImage: getCaseStudyMeta(cs.slug)?.heroImage ?? '',
}));
