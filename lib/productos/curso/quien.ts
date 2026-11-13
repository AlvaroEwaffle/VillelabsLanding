// «Quién lo enseña» como bloque narrativo en primera persona (13-nov-2026, pedidos de Álvaro: «subir la parte de Quién lo
// enseña… venderme como el experto», «quitar el respaldo fuerte/moderado y las fuentes, hablar de mi experiencia» y «yo te
// cuento para qué hice este curso, qué he aprendido en mis años de experiencia, y qué te vas a llevar»).
// Regla: solo hechos con fuente escrita. Fuentes de cada frase:
//   - «Product/Program Manager… consultor en la red de Toptal»: ~/Dev/Vilo/ONTOLOGIA.md:29 («Product/Program Manager, top 3%
//     freelance en Toptal») y alvarovillena.cl/sobre-mi («Trabajo con clientes internacionales vía Toptal»).
//   - «ingeniero civil industrial»: ONTOLOGIA.md:31. (Se quitó «Universidad de Chile»: no tiene fuente fuera de este sitio.)
//   - «opero tres negocios con agentes de IA» y la línea de cada empresa: carrusel «quién soy» publicado
//     (~/Dev/alvaro-reels/src/Carrusel.tsx:156-169, instagram.com/p/DfrjAmgFsRG).
//   - «+8 años liderando equipos de producto»: alvarovillena.cl («+8 años liderando equipos de producto y transformación»).
//   - «No soy gurú… lo tengo funcionando»: mismo carrusel, Carrusel.tsx:158.
//   - Prácticas: un solo lugar (ONTOLOGIA.md:20 «cada dato vive en un solo lugar»; CLAUDE.md P-011 «mantener dos sistemas…
//     hacía que ninguno dijera la verdad»); la IA prepara y yo decido (CLAUDE.md P-001 «La firma de Álvaro queda para lo que
//     compromete plata, alcance o una fecha»); revisión semanal (CLAUDE.md «reviewed weekly»; agentes de marketing «los lunes
//     cierra la semana»); escribir antes de delegar (ViloAgent/context/PLAYBOOK-OPERACION.md:6 «desde este documento, no desde
//     memoria tribal»).
//   - Sin nombres de clientes ni de empresas donde trabajó (LATAM, PepsiCo y otros salieron el 13-nov: falta el OK expreso
//     de Álvaro para mostrarlos). La franja de clientes queda construida y apagada con MOSTRAR_CLIENTES.

/** BORRADOR — texto de Álvaro pendiente. Se reemplaza con sus palabras. Base: su frase del 7-nov («pensando desde la vista
 * al cliente es aprendo a estructurar y organizar mi negocio de punta a punta», VPM/Villelabs/productos-digitales/PLAN.md:8). */
export const PARA_QUE = 'Hice este curso para que ordenes tu negocio de punta a punta con las mismas reglas que uso en los míos.';

export const BIO =
  'Soy Álvaro Villena, ingeniero civil industrial y Product/Program Manager, y trabajo como consultor en la red de Toptal. Hoy opero tres negocios con agentes de IA. No soy gurú: soy un PM que programa, y las reglas que enseño las uso todos los días en mis negocios.';

export const DATOS = [
  { valor: 3, sufijo: '', texto: 'negocios propios que opero' },
  { valor: 8, prefijo: '+', sufijo: '', texto: 'años liderando equipos de producto' },
  { valor: null, etiqueta: 'Toptal', texto: 'consultor de su red de freelancers' },
] as const;

export const PRACTICAS = [
  {
    titulo: 'Cada dato vive en un solo lugar',
    texto: 'Cuando tuve dos sistemas para lo mismo, ninguno decía la verdad. Por eso en el curso cada cosa se anota una vez, en tu planilla.',
    modulo: 'Todo el curso',
  },
  {
    titulo: 'La IA prepara, yo decido',
    texto: 'Mis agentes me dejan borradores listos; lo que compromete plata, plazos o alcance lo firmo yo. En el curso partes por lo básico: copias un prompt en ChatGPT o Claude, te arma el primer borrador y tú decides.',
    modulo: 'Módulo 0 · reglas de freno',
  },
  {
    titulo: 'Los números se miran cada semana',
    texto: 'Reviso mis números todas las semanas. En el curso eso es el tablero de los lunes: unos 10 minutos.',
    modulo: 'Módulo 6 · el tablero',
  },
  {
    titulo: 'Lo que se repite, se escribe',
    texto: 'Antes de delegar algo, en una persona o en un agente, lo escribo en pasos. En el curso escribes tus 3 procesos más repetidos.',
    modulo: 'Módulo 3 · procesos',
  },
] as const;

export const EMPRESAS = [
  { nombre: 'Ewaffle', que: 'cursos e-learning para empresas', logo: '/logos/ewaffle.png', ancho: 120, alto: 32 },
  { nombre: 'Fidelidapp', que: 'fidelización de clientes por WhatsApp', logo: '/logos/fidelidapp.png', ancho: 40, alto: 36 },
  { nombre: 'Villelab', que: 'agentes de IA a medida', logo: '/icono.png', ancho: 36, alto: 36 },
] as const;

/** Clientes (PepsiCo, Kimberly-Clark, LATAM…): NO se muestran hasta que Álvaro confirme por escrito que se puede y cómo
 * describir la relación (KC es vía Toptal con confidencialidad). Con false no sale nada en el HTML. Sin logos descargados. */
export const MOSTRAR_CLIENTES = false;
export const CLIENTES: { nombre: string; logo?: string }[] = [];
