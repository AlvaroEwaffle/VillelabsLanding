// GENERADO por scripts/guia/evidencia.mjs desde base-evidencia-guia1.json. No editar a mano: edita el JSON y corre `npm run guia:evidencia`.
// Sección «En qué se basa esta guía» de /guia. Orden: fuerte (visible), moderada por tema y, al final,
// débil y sin respaldo agrupadas como «criterio práctico, para ajustar con tus números».

export { CONTEO_EVIDENCIA, REVISION_EVIDENCIA } from './evidencia-resumen';

export type Veredicto = 'fuerte' | 'moderada' | 'débil' | 'sin respaldo';
export type FuenteEvidencia = { autor: string; anio: number | null; titulo: string; tipo: string; url: string };
export type Afirmacion = { id: string; afirmacion: string; seccionGuia: string; veredicto: Veredicto; resumen: string; fuentes: FuenteEvidencia[] };
export type TemaEvidencia = { id: string; titulo: string; ids: string[] };

export const AFIRMACIONES: Afirmacion[] = [
  {
    "id": "C01",
    "afirmacion": "Escribe tu cliente ideal en una ficha de 4 puntos: quién compra, quién decide, qué señales dicen «ahora» y a quién no le vas a escribir.",
    "seccionGuia": "Parte 1 · Tu cliente ideal",
    "veredicto": "moderada",
    "resumen": "Los estudios sobre cómo calificar posibles clientes en ventas B2B muestran que evaluar con criterios explícitos predice mejor la venta que la intuición. La ficha de 4 puntos aplica ese principio, aunque el formato en sí no está validado.",
    "fuentes": [
      {
        "autor": "Monat, J. P.",
        "anio": 2011,
        "titulo": "Industrial sales lead conversion modeling",
        "tipo": "paper",
        "url": "https://doi.org/10.1108/02634501111117610"
      }
    ]
  },
  {
    "id": "C02",
    "afirmacion": "Un cliente ideal claro hace que tus mensajes le lleguen a quien sí puede comprarte.",
    "seccionGuia": "Parte 1 · Tu cliente ideal",
    "veredicto": "débil",
    "resumen": "Se apoya por analogía en la investigación sobre calificar posibles clientes con criterios explícitos (la ficha de 4 puntos). Ningún estudio mide cuánto suben las respuestas, así que la guía ya no promete que el mensaje «rinda el doble».",
    "fuentes": [
      {
        "autor": "Monat, J. P.",
        "anio": 2011,
        "titulo": "Industrial sales lead conversion modeling",
        "tipo": "paper",
        "url": "https://doi.org/10.1108/02634501111117610"
      }
    ]
  },
  {
    "id": "C03",
    "afirmacion": "Busca señales de que te necesitan ahora: local nuevo, reseñas que se quejan o una publicación buscando proveedor.",
    "seccionGuia": "Parte 1 · Tu cliente ideal",
    "veredicto": "débil",
    "resumen": "Se sabe que el interés de un cliente que consulta se enfría en horas. Que una señal de cambio aumente la respuesta a un mensaje en frío es práctica muy usada, pero no hay un estudio que lo mida directamente.",
    "fuentes": [
      {
        "autor": "Oldroyd, J. B., McElheran, K. y Elkington, D.",
        "anio": 2011,
        "titulo": "The short life of online sales leads",
        "tipo": "articulo",
        "url": "https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
      }
    ]
  },
  {
    "id": "C04",
    "afirmacion": "Puntúa a cada posible cliente de 1 a 3 en Encaje, Señal y Acceso, y sigue primero a los de mayor puntaje.",
    "seccionGuia": "Parte 3 · Tu primera tanda",
    "veredicto": "moderada",
    "resumen": "Puntuar posibles clientes con criterios explícitos tiene respaldo en la investigación de ventas B2B. La escala 3×3 es una simplificación práctica: ajústala con tus propios resultados.",
    "fuentes": [
      {
        "autor": "Monat, J. P.",
        "anio": 2011,
        "titulo": "Industrial sales lead conversion modeling",
        "tipo": "paper",
        "url": "https://doi.org/10.1108/02634501111117610"
      }
    ]
  },
  {
    "id": "C05",
    "afirmacion": "Trabaja en tandas de 20 posibles clientes por semana como unidad mínima.",
    "seccionGuia": "Parte 3 · Tu primera tanda",
    "veredicto": "débil",
    "resumen": "Las metas concretas y con número funcionan mejor que «haz lo que puedas», pero el 20 es una regla de oficio. Además, la idea de que las listas cortas evitan la sobrecarga tiene poco respaldo.",
    "fuentes": [
      {
        "autor": "Locke, E. A. y Latham, G. P.",
        "anio": 2002,
        "titulo": "Building a practically useful theory of goal setting and task motivation: A 35-year odyssey",
        "tipo": "paper",
        "url": "https://doi.org/10.1037/0003-066X.57.9.705"
      },
      {
        "autor": "Scheibehenne, B., Greifeneder, R. y Todd, P. M.",
        "anio": 2010,
        "titulo": "Can there ever be too many options? A meta-analytic review of choice overload",
        "tipo": "paper",
        "url": "https://doi.org/10.1086/651235"
      }
    ]
  },
  {
    "id": "C06",
    "afirmacion": "Parte siempre por lo tibio: clientes, referidos y contactos que ya te conocen contestan más que un desconocido.",
    "seccionGuia": "Parte 2 · Dónde están",
    "veredicto": "moderada",
    "resumen": "Los clientes que llegan por referido resultan más valiosos y se quedan más tiempo. La ventaja en tasa de respuesta es consistente en datos de industria, pero no está medida con rigor.",
    "fuentes": [
      {
        "autor": "Schmitt, P., Skiera, B. y Van den Bulte, C.",
        "anio": 2011,
        "titulo": "Referral programs and customer value",
        "tipo": "paper",
        "url": "https://faculty.wharton.upenn.edu/wp-content/uploads/2012/04/Schmitt-Skiera-vandenBulte-2011-Referral-Programs-Customer-Value.pdf"
      },
      {
        "autor": "LinkedIn Sales Solutions",
        "anio": null,
        "titulo": "6 of the most powerful LinkedIn stats for sales professionals",
        "tipo": "articulo",
        "url": "https://business.linkedin.com/sales-solutions/blog/6/6-of-the-most-powerful-linkedin-stats-for-sales-professionals"
      }
    ]
  },
  {
    "id": "C07",
    "afirmacion": "Un referido suele contestar bastante más que un desconocido.",
    "seccionGuia": "Parte 2 · Dónde están",
    "veredicto": "moderada",
    "resumen": "Es la misma idea de partir por lo tibio. Los clientes que llegan por referido resultan más valiosos y se quedan más tiempo, y LinkedIn reporta que un contacto en común multiplica la interacción, aunque sin publicar su método. Cuánto más contesta un referido no está medido con rigor: por eso la guía ya no dice «más que diez desconocidos».",
    "fuentes": [
      {
        "autor": "Schmitt, P., Skiera, B. y Van den Bulte, C.",
        "anio": 2011,
        "titulo": "Referral programs and customer value",
        "tipo": "paper",
        "url": "https://faculty.wharton.upenn.edu/wp-content/uploads/2012/04/Schmitt-Skiera-vandenBulte-2011-Referral-Programs-Customer-Value.pdf"
      },
      {
        "autor": "LinkedIn Sales Solutions",
        "anio": null,
        "titulo": "6 of the most powerful LinkedIn stats for sales professionals",
        "tipo": "articulo",
        "url": "https://business.linkedin.com/sales-solutions/blog/6/6-of-the-most-powerful-linkedin-stats-for-sales-professionals"
      }
    ]
  },
  {
    "id": "C08",
    "afirmacion": "Pide referidos justo después de una entrega que salió bien.",
    "seccionGuia": "Parte 6 · Alimentar la lista",
    "veredicto": "débil",
    "resumen": "Se apoya en la reciprocidad y en que muchos clientes dispuestos a recomendar no lo hacen si no se les pide. No hay estudios sobre el momento exacto del pedido.",
    "fuentes": [
      {
        "autor": "Regan, D. T.",
        "anio": 1971,
        "titulo": "Effects of a favor and liking on compliance",
        "tipo": "paper",
        "url": "https://doi.org/10.1016/0022-1031(71)90025-4"
      },
      {
        "autor": "Kumar, V., Petersen, J. A. y Leone, R. P.",
        "anio": 2007,
        "titulo": "How valuable is word of mouth?",
        "tipo": "articulo",
        "url": "https://hbr.org/2007/10/how-valuable-is-word-of-mouth"
      }
    ]
  },
  {
    "id": "C09",
    "afirmacion": "De 20 mensajes, lo normal es que respondan 1 o 2.",
    "seccionGuia": "Parte 3 · Tu primera tanda",
    "veredicto": "moderada",
    "resumen": "Los benchmarks grandes de correo en frío ubican la respuesta promedio entre 3 % y 8 %, y la de los mejores sobre 10 %. Un 5 a 10 % es una expectativa realista si tus mensajes están bien dirigidos.",
    "fuentes": [
      {
        "autor": "Instantly",
        "anio": 2026,
        "titulo": "Cold Email Benchmark Report 2026",
        "tipo": "reporte",
        "url": "https://instantly.ai/cold-email-benchmark-report-2026"
      },
      {
        "autor": "Belkins",
        "anio": 2025,
        "titulo": "Sales follow-up statistics in B2B: Belkins' 2025 study",
        "tipo": "reporte",
        "url": "https://belkins.io/blog/sales-follow-up-statistics"
      },
      {
        "autor": "Gornall, W. y Strebulaev, I. A.",
        "anio": 2025,
        "titulo": "Gender, race, and entrepreneurship: A randomized field experiment on venture capitalists and angels",
        "tipo": "paper",
        "url": "https://ideas.repec.org/a/inm/ormnsc/v71y2025i6p5308-5327.html"
      }
    ]
  },
  {
    "id": "C10",
    "afirmacion": "No saques conclusiones con los primeros 25 mensajes: si después de 40 a 50 tienes 0 o 1 respuesta, revisa tu primer mensaje; si te responde más de 1 de cada 5, suma posibles clientes nuevos cada día.",
    "seccionGuia": "Parte 6 · Prueba 5 días (herramienta, Excel y quiz)",
    "veredicto": "moderada",
    "resumen": "Con 25 mensajes el margen de error es enorme: 2 respuestas de 25 calzan con una tasa real de entre 2 % y 25 % (intervalo de Wilson al 95 %). Por eso la guía pide juntar 40 a 50 mensajes antes de cambiar nada, y sus cortes calzan con la expectativa normal de 1 o 2 respuestas cada 20 que muestran los reportes de correo en frío. Los cortes exactos son criterio práctico.",
    "fuentes": [
      {
        "autor": "Instantly",
        "anio": 2026,
        "titulo": "Cold Email Benchmark Report 2026",
        "tipo": "reporte",
        "url": "https://instantly.ai/cold-email-benchmark-report-2026"
      }
    ]
  },
  {
    "id": "C11",
    "afirmacion": "El primer mensaje tiene máximo 3 frases.",
    "seccionGuia": "Parte 4 · El primer mensaje",
    "veredicto": "moderada",
    "resumen": "En más de 40 millones de correos, los de 50 a 125 palabras fueron los que más respuestas recibieron. Tres frases caen en ese rango; el dato es de correo en general, no de WhatsApp.",
    "fuentes": [
      {
        "autor": "Boomerang",
        "anio": 2016,
        "titulo": "7 tips for getting more responses to your emails (with data!)",
        "tipo": "reporte",
        "url": "https://blog.boomerangapp.com/2016/02/7-tips-for-getting-more-responses-to-your-emails-with-data/"
      }
    ]
  },
  {
    "id": "C12",
    "afirmacion": "La primera frase habla de algo específico de esa persona o de su negocio.",
    "seccionGuia": "Parte 4 · El primer mensaje",
    "veredicto": "moderada",
    "resumen": "La personalización aumentó la respuesta en experimentos con millones de correos, aunque poner solo el nombre ya no siempre funciona. Lo que se nota es que miraste su negocio.",
    "fuentes": [
      {
        "autor": "Sahni, N. S., Wheeler, S. C. y Chintagunta, P.",
        "anio": 2018,
        "titulo": "Personalization in email marketing: The role of noninformative advertising content",
        "tipo": "paper",
        "url": "https://doi.org/10.1287/mksc.2017.1066"
      },
      {
        "autor": "Defau, L. y Zauner, A.",
        "anio": 2023,
        "titulo": "Personalized subject lines in email marketing",
        "tipo": "paper",
        "url": "https://doi.org/10.1007/s11002-023-09701-7"
      },
      {
        "autor": "Sauermann, H. y Roach, M.",
        "anio": 2013,
        "titulo": "Increasing web survey response rates in innovation research: An experimental study of static and dynamic contact design features",
        "tipo": "paper",
        "url": "https://econpapers.repec.org/RePEc:eee:respol:v:42:y:2013:i:1:p:273-286"
      }
    ]
  },
  {
    "id": "C13",
    "afirmacion": "Si hablas solo de ti, cuesta que te contesten; si hablas de ellos, es más fácil.",
    "seccionGuia": "Parte 4 · El primer mensaje",
    "veredicto": "débil",
    "resumen": "Es un principio de oficio coherente con la evidencia sobre personalización, pero no encontramos un experimento que lo compare directamente.",
    "fuentes": []
  },
  {
    "id": "C14",
    "afirmacion": "Cierra con una sola pregunta fácil de responder.",
    "seccionGuia": "Parte 4 · El primer mensaje",
    "veredicto": "moderada",
    "resumen": "En correos en frío funcionan mejor las preguntas de interés que pedir una reunión con día y hora, y un primer pedido chico abre la puerta a uno mayor. Que sea solo una pregunta es criterio práctico.",
    "fuentes": [
      {
        "autor": "Gong Labs",
        "anio": null,
        "titulo": "This surprising cold email CTA will help you book a lot more meetings",
        "tipo": "reporte",
        "url": "https://www.gong.io/blog/this-surprising-cold-email-cta-will-help-you-book-a-lot-more-meetings"
      },
      {
        "autor": "Freedman, J. L. y Fraser, S. C.",
        "anio": 1966,
        "titulo": "Compliance without pressure: The foot-in-the-door technique",
        "tipo": "paper",
        "url": "https://pubmed.ncbi.nlm.nih.gov/5969145/"
      },
      {
        "autor": "Boomerang",
        "anio": 2016,
        "titulo": "7 tips for getting more responses to your emails (with data!)",
        "tipo": "reporte",
        "url": "https://blog.boomerangapp.com/2016/02/7-tips-for-getting-more-responses-to-your-emails-with-data/"
      }
    ]
  },
  {
    "id": "C15",
    "afirmacion": "Sin adjuntos ni links en el primer mensaje.",
    "seccionGuia": "Parte 4 · El primer mensaje",
    "veredicto": "débil",
    "resumen": "En correo es práctica estándar para no caer en spam y para no sonar a folleto, pero no encontramos datos primarios publicados.",
    "fuentes": []
  },
  {
    "id": "C16",
    "afirmacion": "Ofrece algo de valor primero, como una muestra gratis.",
    "seccionGuia": "Parte 4 · El primer mensaje",
    "veredicto": "moderada",
    "resumen": "Las muestras gratis pueden aumentar las ventas hasta un año después, aunque el efecto varía mucho según la marca. Recibir algo primero también predispone a responder.",
    "fuentes": [
      {
        "autor": "Bawa, K. y Shoemaker, R.",
        "anio": 2004,
        "titulo": "The effects of free sample promotions on incremental brand sales",
        "tipo": "paper",
        "url": "https://doi.org/10.1287/mksc.1030.0052"
      },
      {
        "autor": "Regan, D. T.",
        "anio": 1971,
        "titulo": "Effects of a favor and liking on compliance",
        "tipo": "paper",
        "url": "https://doi.org/10.1016/0022-1031(71)90025-4"
      }
    ]
  },
  {
    "id": "C17",
    "afirmacion": "Haz 3 seguimientos a quien no te respondió.",
    "seccionGuia": "Parte 5 · Los seguimientos",
    "veredicto": "fuerte",
    "resumen": "Volver a contactar aumenta la respuesta en meta-análisis y experimentos grandes, y en correos en frío cerca del 42 % de las respuestas llega en un seguimiento. Pasado el tercero suben las desuscripciones y los reportes de spam.",
    "fuentes": [
      {
        "autor": "Edwards, P. J. et al.",
        "anio": 2009,
        "titulo": "Methods to increase response to postal and electronic questionnaires (Cochrane)",
        "tipo": "paper",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19588449/"
      },
      {
        "autor": "Sauermann, H. y Roach, M.",
        "anio": 2013,
        "titulo": "Increasing web survey response rates in innovation research: An experimental study of static and dynamic contact design features",
        "tipo": "paper",
        "url": "https://econpapers.repec.org/RePEc:eee:respol:v:42:y:2013:i:1:p:273-286"
      },
      {
        "autor": "Instantly",
        "anio": 2026,
        "titulo": "Cold Email Benchmark Report 2026",
        "tipo": "reporte",
        "url": "https://instantly.ai/cold-email-benchmark-report-2026"
      },
      {
        "autor": "Belkins",
        "anio": 2025,
        "titulo": "Sales follow-up statistics in B2B: Belkins' 2025 study",
        "tipo": "reporte",
        "url": "https://belkins.io/blog/sales-follow-up-statistics"
      }
    ]
  },
  {
    "id": "C18",
    "afirmacion": "Los seguimientos van los días 2, 7 y 14, como punto de partida para ajustar con tus números.",
    "seccionGuia": "Parte 5 · Los seguimientos",
    "veredicto": "sin respaldo",
    "resumen": "No hay estudios que comparen calendarios de seguimiento en ventas. Es un espaciado simple y fácil de recordar: si tu rubro es más lento, estíralo.",
    "fuentes": [
      {
        "autor": "Sauermann, H. y Roach, M.",
        "anio": 2013,
        "titulo": "Increasing web survey response rates in innovation research: An experimental study of static and dynamic contact design features",
        "tipo": "paper",
        "url": "https://econpapers.repec.org/RePEc:eee:respol:v:42:y:2013:i:1:p:273-286"
      }
    ]
  },
  {
    "id": "C19",
    "afirmacion": "Casi la mitad de las respuestas llega en un seguimiento, no en el primer mensaje, y mucha gente nunca vuelve a escribir.",
    "seccionGuia": "Parte 5 · Los seguimientos",
    "veredicto": "moderada",
    "resumen": "En el reporte de Instantly 2026 (datos de 2025), el 42 % de las respuestas a correos en frío llegó en un seguimiento y el resto con el primer mensaje; Belkins (2025) también ve que el primer correo es el que más responde y que los seguimientos suman. La guía dejó de usar el dato «la mayoría de las ventas llega después del segundo contacto», que no tiene un estudio de origen verificable.",
    "fuentes": [
      {
        "autor": "Instantly",
        "anio": 2026,
        "titulo": "Cold Email Benchmark Report 2026",
        "tipo": "reporte",
        "url": "https://instantly.ai/cold-email-benchmark-report-2026"
      },
      {
        "autor": "Belkins",
        "anio": 2025,
        "titulo": "Sales follow-up statistics in B2B: Belkins' 2025 study",
        "tipo": "reporte",
        "url": "https://belkins.io/blog/sales-follow-up-statistics"
      },
      {
        "autor": "Ainora",
        "anio": 2026,
        "titulo": "\"80% of sales need 5 follow-ups\": Where the statistic really comes from",
        "tipo": "articulo",
        "url": "https://ainora.lt/blog/sales-follow-up-80-percent-5-contacts-study-2026"
      }
    ]
  },
  {
    "id": "C20",
    "afirmacion": "Cada seguimiento aporta algo nuevo; nunca escribas «¿viste mi mensaje?».",
    "seccionGuia": "Parte 5 · Los seguimientos",
    "veredicto": "moderada",
    "resumen": "Los recordatorios con redacción nueva aumentaron la respuesta en más de 30 % en un experimento con más de 24.000 personas.",
    "fuentes": [
      {
        "autor": "Sauermann, H. y Roach, M.",
        "anio": 2013,
        "titulo": "Increasing web survey response rates in innovation research: An experimental study of static and dynamic contact design features",
        "tipo": "paper",
        "url": "https://econpapers.repec.org/RePEc:eee:respol:v:42:y:2013:i:1:p:273-286"
      }
    ]
  },
  {
    "id": "C21",
    "afirmacion": "En el seguimiento del día 7, comparte un caso o un dato de un cliente parecido.",
    "seccionGuia": "Parte 5 · Los seguimientos",
    "veredicto": "moderada",
    "resumen": "Saber qué hace gente parecida influye en lo que decidimos, según experimentos de campo. No hay estudios específicos en prospección.",
    "fuentes": [
      {
        "autor": "Goldstein, N. J., Cialdini, R. B. y Griskevicius, V.",
        "anio": 2008,
        "titulo": "A room with a viewpoint: Using social norms to motivate environmental conservation in hotels",
        "tipo": "paper",
        "url": "https://doi.org/10.1086/586910"
      }
    ]
  },
  {
    "id": "C22",
    "afirmacion": "El día 14 cierra con una salida explícita: «¿Te escribo en un mes o prefieres que no?».",
    "seccionGuia": "Parte 5 · Los seguimientos",
    "veredicto": "moderada",
    "resumen": "Recordarle a la persona que es libre de decir que no aumenta la aceptación en varios meta-análisis, aunque el efecto se achica en los estudios más rigurosos. Además, la ley chilena exige ofrecer una forma de dejar de recibir comunicaciones promocionales.",
    "fuentes": [
      {
        "autor": "Carpenter, C. J.",
        "anio": 2013,
        "titulo": "A meta-analysis of the effectiveness of the \"but you are free\" compliance-gaining technique",
        "tipo": "paper",
        "url": "https://doi.org/10.1080/10510974.2012.727941"
      },
      {
        "autor": "Fillon, A. et al.",
        "anio": 2023,
        "titulo": "The effectiveness of the \"but-you-are-free\" technique: Meta-analysis and re-examination of the technique",
        "tipo": "paper",
        "url": "https://open.lnu.se/index.php/metapsychology/article/view/2640"
      },
      {
        "autor": "República de Chile",
        "anio": 1997,
        "titulo": "Ley 19.496 sobre protección de los derechos de los consumidores, art. 28 B",
        "tipo": "articulo",
        "url": "https://www.bcn.cl/leychile/navegar?idNorma=61438"
      }
    ]
  },
  {
    "id": "C23",
    "afirmacion": "Deja a cada posible cliente con su próximo paso y una fecha exacta en el momento en que le escribes.",
    "seccionGuia": "Parte 5 · Los seguimientos",
    "veredicto": "moderada",
    "resumen": "Apoyarte en un recordatorio externo libera memoria y mejora el cumplimiento de lo que planeaste, y fijar el cuándo es una forma de plan concreto.",
    "fuentes": [
      {
        "autor": "Risko, E. F. y Gilbert, S. J.",
        "anio": 2016,
        "titulo": "Cognitive offloading",
        "tipo": "paper",
        "url": "https://doi.org/10.1016/j.tics.2016.07.002"
      },
      {
        "autor": "Gollwitzer, P. M. y Sheeran, P.",
        "anio": 2006,
        "titulo": "Implementation intentions and goal achievement: A meta-analysis of effects and processes",
        "tipo": "paper",
        "url": "https://doi.org/10.1016/S0065-2601(06)38002-1"
      }
    ]
  },
  {
    "id": "C24",
    "afirmacion": "Haz tu rutina de 20 minutos todos los días, a la misma hora y en el mismo lugar.",
    "seccionGuia": "Parte 6 · Tu rutina",
    "veredicto": "fuerte",
    "resumen": "Los hábitos se forman repitiendo una conducta en el mismo contexto. Saltarte un día no arruina el proceso: retoma al siguiente.",
    "fuentes": [
      {
        "autor": "Wood, W. y Neal, D. T.",
        "anio": 2007,
        "titulo": "A new look at habits and the habit-goal interface",
        "tipo": "paper",
        "url": "https://doi.org/10.1037/0033-295X.114.4.843"
      },
      {
        "autor": "Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W. y Wardle, J.",
        "anio": 2010,
        "titulo": "How are habits formed: Modelling habit formation in the real world",
        "tipo": "paper",
        "url": "https://doi.org/10.1002/ejsp.674"
      }
    ]
  },
  {
    "id": "C25",
    "afirmacion": "Escribe a qué hora y dónde vas a hacer tu rutina.",
    "seccionGuia": "Parte 6 · Tu rutina",
    "veredicto": "fuerte",
    "resumen": "Los planes de «cuándo y dónde» aumentan la probabilidad de cumplir una meta en más de 600 pruebas experimentales. Funcionan mejor en formato «si son las 8:30 y estoy en el escritorio, entonces abro la planilla».",
    "fuentes": [
      {
        "autor": "Gollwitzer, P. M. y Sheeran, P.",
        "anio": 2006,
        "titulo": "Implementation intentions and goal achievement: A meta-analysis of effects and processes",
        "tipo": "paper",
        "url": "https://doi.org/10.1016/S0065-2601(06)38002-1"
      },
      {
        "autor": "Sheeran, P., Listrom, O. y Gollwitzer, P. M.",
        "anio": 2025,
        "titulo": "The when and how of planning: Meta-analysis of the scope and components of implementation intentions in 642 tests",
        "tipo": "paper",
        "url": "https://doi.org/10.1080/10463283.2024.2334563"
      }
    ]
  },
  {
    "id": "C26",
    "afirmacion": "Anota cada día cuántos mensajes enviaste, cuántas respuestas y cuántas conversaciones tuviste.",
    "seccionGuia": "Parte 6 · Prueba 5 días",
    "veredicto": "fuerte",
    "resumen": "Un meta-análisis de 138 experimentos muestra que registrar tu avance aumenta el logro de metas, sobre todo cuando lo anotas.",
    "fuentes": [
      {
        "autor": "Harkin, B. et al.",
        "anio": 2016,
        "titulo": "Does monitoring goal progress promote goal attainment? A meta-analysis of the experimental evidence",
        "tipo": "paper",
        "url": "https://doi.org/10.1037/bul0000025"
      }
    ]
  },
  {
    "id": "C27",
    "afirmacion": "La prueba real de 5 días hábiles sirve para partir y ver tus primeros números; no forma un hábito por sí sola.",
    "seccionGuia": "Parte 6 · Prueba 5 días",
    "veredicto": "débil",
    "resumen": "Cinco días sirven para partir, pero no forman un hábito: en promedio la automaticidad tarda semanas o meses. Tampoco alcanzan para sacar conclusiones de tus números.",
    "fuentes": [
      {
        "autor": "Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W. y Wardle, J.",
        "anio": 2010,
        "titulo": "How are habits formed: Modelling habit formation in the real world",
        "tipo": "paper",
        "url": "https://doi.org/10.1002/ejsp.674"
      }
    ]
  },
  {
    "id": "C28",
    "afirmacion": "20 minutos todos los días te mantienen los seguimientos a tiempo y vuelven la búsqueda de clientes un hábito.",
    "seccionGuia": "Parte 6 · Tu rutina",
    "veredicto": "débil",
    "resumen": "No hay estudios que comparen 20 minutos diarios con una tarde al mes. El argumento indirecto es sólido: la rutina diaria mantiene los seguimientos a tiempo y crea el hábito.",
    "fuentes": []
  },
  {
    "id": "C29",
    "afirmacion": "Revisa tu planilla todos los días para que ningún posible cliente se enfríe.",
    "seccionGuia": "Parte 6 · Tu rutina",
    "veredicto": "moderada",
    "resumen": "Cuando alguien muestra interés, responderle dentro de la primera hora aumenta mucho la probabilidad de avanzar. Aplica a quien ya te contestó, no al primer mensaje en frío.",
    "fuentes": [
      {
        "autor": "Oldroyd, J. B., McElheran, K. y Elkington, D.",
        "anio": 2011,
        "titulo": "The short life of online sales leads",
        "tipo": "articulo",
        "url": "https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
      }
    ]
  },
  {
    "id": "C30",
    "afirmacion": "Por WhatsApp, escríbele solo a quien ya te conoce o te dio su número: clientes, referidos con permiso y tu agenda. A quien no te conoce, el primer mensaje va por correo, LinkedIn o mensaje directo de Instagram, y pasas a WhatsApp cuando te dé su número.",
    "seccionGuia": "Partes 2 y 4 · Por dónde escribirle",
    "veredicto": "fuerte",
    "resumen": "No es un estudio: es la regla de la plataforma. La Política de WhatsApp Business, que cubre también la app gratuita, permite escribir solo a quien te dio su número y aceptó tus mensajes (última actualización: 23-sep-2026); quien no aceptó puede reportarte y tu número puede quedar restringido. Además, la Ley 21.719 de datos personales entra en vigencia el 1-dic-2026 (hay un proyecto para postergarla): usar el nombre y el teléfono de alguien para venderle requiere una base legal. Esto no es asesoría legal.",
    "fuentes": [
      {
        "autor": "WhatsApp",
        "anio": 2026,
        "titulo": "Política de WhatsApp Business (última actualización: 23-sep-2026)",
        "tipo": "articulo",
        "url": "https://whatsappbusiness.com/es-la/policy/"
      },
      {
        "autor": "Diario Constitucional",
        "anio": 2026,
        "titulo": "La Ley 21.719 entra en vigor el 1 de diciembre y expone vacíos en regulación de pequeñas empresas",
        "tipo": "articulo",
        "url": "https://www.diarioconstitucional.cl/2026/06/12/la-ley-21-719-entra-en-vigor-el-1-de-diciembre-y-expone-vacios-en-regulacion-de-pequenas-empresas/"
      }
    ]
  },
  {
    "id": "C31",
    "afirmacion": "Usa Claude o ChatGPT para redactar tus mensajes, siempre como borrador que revisas tú antes de enviar.",
    "seccionGuia": "Instrucciones para IA (todas las partes)",
    "veredicto": "fuerte",
    "resumen": "En experimentos con miles de profesionales, la IA redujo el tiempo de escritura y subió la calidad. Revisar y agregar un detalle propio importa: los mensajes que suenan a IA generan desconfianza y la IA tiende a hacer que todos los textos se parezcan.",
    "fuentes": [
      {
        "autor": "Noy, S. y Zhang, W.",
        "anio": 2023,
        "titulo": "Experimental evidence on the productivity effects of generative artificial intelligence",
        "tipo": "paper",
        "url": "https://doi.org/10.1126/science.adh2586"
      },
      {
        "autor": "Brynjolfsson, E., Li, D. y Raymond, L.",
        "anio": 2025,
        "titulo": "Generative AI at work",
        "tipo": "paper",
        "url": "https://econpapers.repec.org/RePEc:oup:qjecon:v:140:y:2025:i:2:p:889-942"
      },
      {
        "autor": "Dell'Acqua, F. et al.",
        "anio": 2023,
        "titulo": "Navigating the jagged technological frontier: Field experimental evidence of the effects of AI on knowledge worker productivity and quality",
        "tipo": "paper",
        "url": "https://econbiz.de/Record/navigating-the-jagged-technological-frontier-field-experimental-evidence-the-effects-knowledge-worker-productivity-and-quality-dell-acqua-fabrizio/10014466615"
      },
      {
        "autor": "Hohenstein, J. et al.",
        "anio": 2023,
        "titulo": "Artificial intelligence in communication impacts language and social relationships",
        "tipo": "paper",
        "url": "https://doi.org/10.1038/s41598-023-30938-9"
      },
      {
        "autor": "Jakesch, M., French, M., Ma, X., Hancock, J. T. y Naaman, M.",
        "anio": 2019,
        "titulo": "AI-mediated communication: How the perception that profile text was written by AI affects trustworthiness",
        "tipo": "paper",
        "url": "https://doi.org/10.1145/3290605.3300469"
      },
      {
        "autor": "Doshi, A. R. y Hauser, O. P.",
        "anio": 2024,
        "titulo": "Generative AI enhances individual creativity but reduces the collective diversity of novel content",
        "tipo": "paper",
        "url": "https://doi.org/10.1126/sciadv.adn5290"
      }
    ]
  },
  {
    "id": "C32",
    "afirmacion": "No necesitas saber de tecnología: copias la instrucción en Claude o ChatGPT, completas los corchetes y revisas el borrador.",
    "seccionGuia": "Parte 0 · Diagnóstico y ruta",
    "veredicto": "fuerte",
    "resumen": "En los grandes experimentos con IA, quienes partían con menos experiencia fueron los que más mejoraron. Esos estudios no incluyeron pymes, pero el patrón se repite.",
    "fuentes": [
      {
        "autor": "Brynjolfsson, E., Li, D. y Raymond, L.",
        "anio": 2025,
        "titulo": "Generative AI at work",
        "tipo": "paper",
        "url": "https://econpapers.repec.org/RePEc:oup:qjecon:v:140:y:2025:i:2:p:889-942"
      },
      {
        "autor": "Dell'Acqua, F. et al.",
        "anio": 2023,
        "titulo": "Navigating the jagged technological frontier: Field experimental evidence of the effects of AI on knowledge worker productivity and quality",
        "tipo": "paper",
        "url": "https://econbiz.de/Record/navigating-the-jagged-technological-frontier-field-experimental-evidence-the-effects-knowledge-worker-productivity-and-quality-dell-acqua-fabrizio/10014466615"
      },
      {
        "autor": "Noy, S. y Zhang, W.",
        "anio": 2023,
        "titulo": "Experimental evidence on the productivity effects of generative artificial intelligence",
        "tipo": "paper",
        "url": "https://doi.org/10.1126/science.adh2586"
      }
    ]
  },
  {
    "id": "C33",
    "afirmacion": "Un diagnóstico de 9 preguntas te dice qué partes hacer completas, cuáles revisar rápido y cuáles saltarte.",
    "seccionGuia": "Parte 0 · Diagnóstico y ruta",
    "veredicto": "moderada",
    "resumen": "La investigación educativa muestra que la instrucción muy guiada ayuda a quien parte y puede estorbar a quien ya domina el tema. Adaptar la ruta a tu nivel sigue ese principio.",
    "fuentes": [
      {
        "autor": "Kalyuga, S., Ayres, P., Chandler, P. y Sweller, J.",
        "anio": 2003,
        "titulo": "The expertise reversal effect",
        "tipo": "paper",
        "url": "https://doi.org/10.1207/S15326985EP3801_4"
      }
    ]
  },
  {
    "id": "C34",
    "afirmacion": "Aprendes con un caso guiado y ejemplos de «así no / así sí» antes de hacerlo con tu negocio.",
    "seccionGuia": "Diseño de la guía",
    "veredicto": "moderada",
    "resumen": "Estudiar ejemplos resueltos al empezar es más eficiente que partir desde cero, según décadas de investigación educativa, sobre todo en matemáticas y ciencias.",
    "fuentes": [
      {
        "autor": "Sweller, J. y Cooper, G. A.",
        "anio": 1985,
        "titulo": "The use of worked examples as a substitute for problem solving in learning algebra",
        "tipo": "paper",
        "url": "https://doi.org/10.1207/s1532690xci0201_3"
      },
      {
        "autor": "Kalyuga, S., Ayres, P., Chandler, P. y Sweller, J.",
        "anio": 2003,
        "titulo": "The expertise reversal effect",
        "tipo": "paper",
        "url": "https://doi.org/10.1207/S15326985EP3801_4"
      }
    ]
  }
];

export const TEMAS_EVIDENCIA: TemaEvidencia[] = [
  {
    "id": "a-quien",
    "titulo": "A quién escribirle",
    "ids": [
      "C01",
      "C02",
      "C03",
      "C04",
      "C05",
      "C06",
      "C07",
      "C08"
    ]
  },
  {
    "id": "respuestas",
    "titulo": "Cuántos te van a responder",
    "ids": [
      "C09",
      "C10"
    ]
  },
  {
    "id": "mensaje",
    "titulo": "El primer mensaje",
    "ids": [
      "C11",
      "C12",
      "C13",
      "C14",
      "C15",
      "C16"
    ]
  },
  {
    "id": "canal",
    "titulo": "Por dónde escribirle",
    "ids": [
      "C30"
    ]
  },
  {
    "id": "seguimientos",
    "titulo": "Los seguimientos",
    "ids": [
      "C17",
      "C18",
      "C19",
      "C20",
      "C21",
      "C22",
      "C23"
    ]
  },
  {
    "id": "rutina",
    "titulo": "La rutina de 20 minutos",
    "ids": [
      "C24",
      "C25",
      "C26",
      "C27",
      "C28",
      "C29"
    ]
  },
  {
    "id": "ayuda",
    "titulo": "Claude o ChatGPT como ayuda",
    "ids": [
      "C31",
      "C32"
    ]
  },
  {
    "id": "guia",
    "titulo": "Cómo está armada la guía",
    "ids": [
      "C33",
      "C34"
    ]
  }
];

const porId = new Map(AFIRMACIONES.map((a) => [a.id, a]));
export const esCriterio = (v: Veredicto) => v === 'débil' || v === 'sin respaldo';

/** Respaldo fuerte, en el orden de la guía (va visible primero). */
export const FUERTES = AFIRMACIONES.filter((a) => a.veredicto === 'fuerte');

/** Respaldo moderado, agrupado por tema. */
export const MODERADAS_POR_TEMA = TEMAS_EVIDENCIA.map((t) => ({
  ...t,
  items: t.ids.map((id) => porId.get(id)!).filter((a) => a.veredicto === 'moderada'),
})).filter((t) => t.items.length > 0);

/** Lo débil o sin respaldo, en el orden de la guía: criterio práctico, para ajustar con tus números. */
export const CRITERIO_PRACTICO = AFIRMACIONES.filter((a) => esCriterio(a.veredicto));
