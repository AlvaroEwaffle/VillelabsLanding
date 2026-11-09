// Guiones de los videos del curso «El sistema de tu negocio: tu primer CRM y ERP en Google Sheets» (v1.1, 8-nov-2026).
// Módulos 1–6 (claves m{N}-l{i}): grabados el 8-nov-2026; si a una lección le falta el mp4, muestra «Video próximamente»
// y el guion se puede leer debajo.
// Al final, los guiones de los videos de la v1.0 regrabados el 8-nov-2026 (claves v05, v08, v09, v11, v12, v13, v17).
// Los módulos 1–6 y esos videos se grabaron el 8-nov-2026: este archivo dice exactamente lo que dice cada video.
// Regla 20/80: Álvaro en cámara ~20 % del tiempo (apertura y, a veces, el cierre); el resto, gráficos con su voz.
// La duración se calcula sola a ~2,4 palabras por segundo (ritmo de locución en español).
// Copia en VPM/Villelabs/productos-digitales/guiones-curso-modulos-1-6.md (generada desde este archivo; regenerarla tras la v1.1).

export type Escena = { quien: 'alvaro' | 'grafico'; visual: string; voz: string };
export type Guion = { titulo: string; duracion: string; segundos: number; segundosAlvaro: number; escenas: Escena[] };

const PALABRAS_POR_SEGUNDO = 2.4;

const segundosDe = (texto: string) => Math.round(texto.trim().split(/\s+/).length / PALABRAS_POR_SEGUNDO);

const A = (visual: string, voz: string): Escena => ({ quien: 'alvaro', visual, voz });
const G = (visual: string, voz: string): Escena => ({ quien: 'grafico', visual, voz });

const CRUDOS: Record<string, { titulo: string; escenas: Escena[] }> = {
  // ─── Módulo 2 · Marketing y origen (era el módulo 1 en v1.0) ────────────────────────────────────────────────
  'm2-l1': {
    titulo: 'Tu mensaje en una frase',
    escenas: [
      A('Álvaro en su escritorio, plano medio', 'Si alguien te pregunta qué hace tu negocio y tardas un minuto en explicarlo, tu cliente también se demora en entenderlo. Vamos a dejarlo en una frase.'),
      G('Tres bloques que se arman: problema + para quién + resultado', 'La frase tiene tres piezas: el problema que resuelves, para quién, y el resultado que logra. No lo que haces: lo que cambia para tu cliente.'),
      G('Pantallita de Grano Norte con tres versiones, la tercera se ilumina', 'Camila, de Grano Norte, escribió tres versiones. «Tostamos café de especialidad» habla de ella. La tercera habla de su cliente: «Cafeterías de la región que quieren café fresco cada semana, sin quedarse nunca sin stock».'),
      G('Lista de chequeo: ¿se entiende sin explicar?, ¿nombra a alguien?, ¿promete un resultado?', 'Para elegir, revisa tres cosas: que se entienda sin explicar, que nombre a alguien concreto y que prometa un resultado que se pueda ver.'),
      G('El ejercicio de la lección en pantalla', 'Ahora tú. Escribe tres versiones en el ejercicio, elige una y descárgala. Esa frase va a abrir tu calendario de contenido.'),
    ],
  },
  'm2-l2': {
    titulo: 'Tus 3 temas',
    escenas: [
      A('Álvaro frente a la pizarra', '¿Te ha pasado que te sientas a publicar y no sabes de qué hablar? No te falta creatividad. Te faltan temas fijos.'),
      G('Tres columnas: lo que quiere aprender · lo que te diferencia · la prueba', 'Todo lo que publicas sale de tres temas. Uno: lo que tu cliente quiere aprender. Dos: lo que te diferencia. Tres: la prueba de que funciona, con casos y clientes.'),
      G('Las tres columnas se llenan con los temas de Grano Norte', 'En Grano Norte quedan así: cómo elegir café para tu cafetería; tostado fresco versus café de supermercado; y cafeterías que se cambiaron y qué notaron.'),
      G('De cada tema salen tres ideas en una grilla de 3 por 3', 'De cada tema saca tres ideas. Con eso tienes nueve publicaciones antes de empezar, y nunca más una pantalla en blanco.'),
      G('El ejercicio de la lección en pantalla', 'Completa tus tres temas y tus nueve ideas en el ejercicio. Los vas a usar en la próxima lección.'),
    ],
  },
  'm2-l3': {
    titulo: 'Una semana de contenido en una tarde',
    escenas: [
      A('Álvaro con una taza de café, plano medio', 'Publicar todos los días no significa pensar todos los días. Una idea bien pensada te da la semana completa.'),
      G('Una idea al centro que se abre en cinco piezas: post, historia, carrusel, reel, correo', 'Tomas una idea de tus temas y la conviertes en cinco piezas: un post, una historia, un carrusel, un reel con guion y un correo a tus clientes.'),
      G('La lista de las cinco piezas con su largo; al lado, opcional, la pantalla de ChatGPT o Claude', 'Las puedes escribir tú con la lista de la lección. Y si ya usas ChatGPT o Claude, te dejo instrucciones listas para que te arme un primer borrador con tu frase y tus temas. Es opcional: sin IA el resultado es el mismo.'),
      G('Calendario de lunes a viernes con una pieza por día', 'Después las repartes: lunes el post, martes la historia, miércoles el carrusel, jueves el reel y viernes el correo.'),
      G('Ícono de freno: una persona revisa antes de publicar', 'Un freno importante: nada se publica sin que una persona lo lea. Si un borrador lo hizo la IA, tú decides qué sale.'),
      G('El calendario de 4 semanas descargándose', 'En el ejercicio armas tus cuatro semanas y las descargas para abrirlas en Google Sheets.'),
    ],
  },
  'm2-l4': {
    titulo: 'Responder comentarios y mensajes con tu tono',
    escenas: [
      A('Álvaro con el celular en la mano', 'Un comentario sin respuesta es una venta que se enfría. Pero no todos los mensajes se responden igual.'),
      G('Árbol de decisión: ¿pregunta repetida? ¿quiere comprar? ¿reclamo?', 'Cuando llega un comentario o un mensaje, pregúntate tres cosas. ¿Es una pregunta que se repite? Respondes con tu plantilla. ¿Quiere comprar o cotizar? Pasa a ventas el mismo día. ¿Es un reclamo? Lo ve una persona, siempre.'),
      G('Pantallita: comentario de una cafetería en el post de Grano Norte y la respuesta', 'En Grano Norte, una cafetería comenta «¿venden por mayor?». No se responde con un precio en público: se le agradece, se le escribe por interno ese mismo día y entra a la hoja Clientes con su origen, Instagram.'),
      G('Tarjetas de plantillas con el tono de la marca', 'Tus plantillas suenan como tú: cortas, cercanas y con una sola pregunta al final.'),
      G('El ejercicio de la lección: Clasifica 6 mensajes', 'En el ejercicio practicas con seis mensajes de una semana típica y ajustas tus plantillas.'),
    ],
  },
  'm2-l5': {
    titulo: 'De dónde llegó cada cliente',
    escenas: [
      A('Álvaro frente a la pantalla con su planilla', 'Mil reproducciones se sienten bien, pero no pagan las cuentas. La pregunta que importa es otra: ¿de dónde llegaron tus clientes?'),
      G('La hoja Clientes con la columna Origen destacada: referido, Instagram, Google, feria', 'La respuesta ya cabe en tu CRM: la columna Origen de tu hoja Clientes. Cada contacto nuevo anota de dónde llegó. Te toma diez segundos.'),
      G('La hoja Origen contándose sola: contactos y clientes por canal', 'Y la hoja Origen de tu planilla cuenta sola, por canal, cuántos contactos llegaron y cuántos se volvieron clientes.'),
      G('Pantallita: hoja Origen de Grano Norte, con «Referido» destacado', 'En Grano Norte, Instagram trajo catorce contactos y dos clientes. Los referidos trajeron seis contactos y cuatro clientes. Camila decide pedirle un referido a cada cliente contento, sin dejar de publicar.'),
      G('Dos canales lado a lado: uno con muchos «me gusta» y cero clientes, otro con pocos «me gusta» y clientes', 'Ojo con los «me gusta»: un canal puede gustar mucho y no traer a nadie. Manda el que trae clientes que calzan con tu negocio.'),
      G('El ejercicio de la lección', 'En el ejercicio anotas tus canales, ves cuál te trae más clientes y eliges qué vas a hacer este mes con él.'),
    ],
  },

  // ─── Módulo 1 · Clientes y ventas (era el módulo 2 en v1.0) ───────────────────────────────────────────────────
  'm1-l1': {
    titulo: 'De la Guía 1 a tu hoja Clientes',
    escenas: [
      A('Álvaro en una cafetería con su notebook', 'Un CRM es el lugar donde ves a todos tus clientes y en qué va cada uno. No necesitas pagar un software para tener uno: lo armamos hoy en una planilla.'),
      G('La hoja Clientes con sus columnas: nombre, empresa, origen, estado, próximo paso, fecha', 'Es una hoja con una fila por cliente o posible cliente. Cinco datos no se negocian: quién es, de dónde llegó, en qué estado va, cuál es el próximo paso y su fecha.'),
      G('Los estados en fila: sin mensaje, contactado, respondió, conversación, propuesta, cliente', 'Cada fila avanza por estados, los mismos de la Guía 1. Si hiciste la guía, tu lista entra tal cual a esta hoja. Si no, partes con los clientes que ya te compran y las cotizaciones abiertas.'),
      G('Pantallita: la hoja de Grano Norte ordenada por fecha', 'Camila pasó a esta hoja sus treinta y cinco empresas, que vivían entre el WhatsApp y un cuaderno. Cada mañana la ordena por fecha y sabe a quién le toca hoy.'),
      G('Reloj dividido en 5 + 10 + 5 minutos', 'La rutina son veinte minutos al día: cinco para mirar a quién le toca, diez para escribir y cinco para anotar el nuevo estado y la fecha del próximo paso.'),
      G('El ejercicio de la lección', 'En el ejercicio armas tus primeras diez filas. Lo que no tiene fecha, no existe.'),
    ],
  },
  'm1-l2': {
    titulo: 'Primer mensaje y seguimientos',
    escenas: [
      A('Álvaro con el celular, plano cercano', 'Una parte grande de las respuestas llega en un seguimiento, no en el primer mensaje. Y mucha gente nunca vuelve a escribir. Ahí está tu ventaja.'),
      G('Dos caminos: «ya te conoce» → WhatsApp; «no te conoce» → correo, LinkedIn o Instagram', 'Primero, por dónde. WhatsApp, solo con quien ya te conoce o te dio su número. A los demás les escribes por correo, LinkedIn o Instagram, y pasas a WhatsApp cuando te den su número. Así no arriesgas que te bloqueen.'),
      G('Mensaje de tres frases con una sola pregunta', 'El primer mensaje tiene tres frases y una sola pregunta: por qué le escribes a esa persona, qué le puedes resolver y una pregunta fácil de contestar.'),
      G('Línea de tiempo: hoy, día 2, día 7, día 14', 'Si no responde, hay tres seguimientos: al día dos, al día siete y al día catorce. Es un calendario simple: si tu rubro es más lento, estíralo.'),
      G('Pantallita: mensaje directo de Camila en Instagram a una cafetería nueva', 'Camila le escribe por Instagram a una cafetería que abrió en Cerro Alegre: la felicita, le ofrece una muestra y le pregunta si puede pasar el jueves. Y anota en su hoja la fecha del próximo paso.'),
      G('El editor de plantillas con la vista previa', 'En el ejercicio adaptas las cuatro plantillas y ves cómo quedan con el nombre de alguien de tu hoja.'),
    ],
  },
  'm1-l3': {
    titulo: 'De la conversación a la propuesta',
    escenas: [
      A('Álvaro en la sala de reuniones', 'Una buena propuesta no se escribe en la oficina. Se escribe en la primera reunión, haciendo las preguntas correctas.'),
      G('Cinco preguntas que aparecen una a una', 'Son cinco preguntas: qué problema tienes hoy, cuánto te cuesta, qué has probado, quién más decide y para cuándo lo necesitas.'),
      G('Una hoja que se arma por bloques: problema, propuesta, precio, plazo, siguiente paso', 'Con esas respuestas armas una propuesta de una sola página: el problema con sus palabras, lo que incluye, el precio, el plazo y el siguiente paso con fecha.'),
      G('Pantallita: propuesta «Plan oficina» de Grano Norte', 'Grano Norte armó su «plan oficina» para Oficinas Bahía: café cada mes, molienda a elección y despacho incluido.'),
      G('La fila de Oficinas Bahía en la hoja Clientes: estado Propuesta, monto, fecha', 'Apenas la envías, queda en tu hoja Clientes: estado «Propuesta», su monto y la fecha del primer seguimiento. Así sabes cuánta plata tienes en propuestas abiertas.'),
      G('Ícono de freno sobre precio y plazo', 'El precio y el plazo los decide siempre una persona. Si usas IA para redactar, es un borrador: nunca compromete un descuento ni una fecha.'),
      G('El formulario de la propuesta', 'En el ejercicio armas la tuya, la descargas y la anotas en tu hoja con un clic.'),
    ],
  },
  'm1-l4': {
    titulo: 'Seguimiento de propuestas',
    escenas: [
      A('Álvaro en su escritorio', '«Quedó en responderme». Esa frase, sin una fecha al lado, es una propuesta que se enfría.'),
      G('La hoja Clientes filtrada por estado «Propuesta», con la columna de fecha destacada', 'La regla: ninguna propuesta queda en tu hoja sin la fecha del próximo seguimiento. Esa columna siempre dice cuándo vuelves a escribir.'),
      G('La fecha de una fila que avanza: día 2, día 7, día 14', 'Cuando haces un seguimiento, cambias la fecha al siguiente: día dos, día siete y día catorce. Si responde, cambias el estado: cliente, descartado o una fecha en un mes más.'),
      G('Pantallita: propuestas abiertas de Grano Norte con su monto y su fecha', 'En Grano Norte, Camila filtra sus propuestas cada mañana: sabe a quién le toca hoy y cuánta plata tiene en propuestas abiertas.'),
      G('Tres mensajes de seguimiento en tarjetas: día 2, día 7, día 14', 'Cada seguimiento suma algo nuevo: una pregunta corta para saber si la revisó, después un dato o un caso que le sirva, y al final una salida amable: «¿te escribo en un mes o prefieres que no?».'),
      G('Ícono de freno sobre el seguimiento', 'Un freno: si el cliente pide cambiar precio o plazo, eso ya no es un seguimiento. Lo responde una persona.'),
      G('La lista de propuestas del ejercicio', 'En el ejercicio ves tus propuestas abiertas, ordenadas por fecha, y si quieres las llevas a tu calendario.'),
    ],
  },
  'm1-l5': {
    titulo: 'Tu embudo en la planilla',
    escenas: [
      A('Álvaro frente a la pantalla con su planilla', '¿A cuántas personas tienes que escribirles para ganar un cliente? Tu hoja Clientes ya lo sabe.'),
      G('Los estados de la hoja se apilan en un embudo: contactados, conversación, propuesta, cliente', 'Cada fila está en un estado. Si los cuentas, tienes tu embudo: contactados, conversación, propuesta y cliente. Entre piso y piso hay una tasa de paso.'),
      G('Pantallita: el embudo de Grano Norte', 'Grano Norte contactó a cuarenta, conversó con diez, envió cinco propuestas y ganó dos clientes. La mitad de las conversaciones termina en propuesta.'),
      G('Flecha que vuelve desde la meta hacia arriba', 'Con esas tasas haces la cuenta al revés: si quieres dos clientes nuevos al mes, sabes a cuántas personas escribirles por semana. Con pocos datos los porcentajes bailan: tómalos como punto de partida.'),
      G('El piso con la tasa más baja se marca', 'Mira también dónde se te cae más gente. Si conversas harto pero envías pocas propuestas, el problema está en la reunión. Arregla primero el piso más débil.'),
      G('El Tablero de la planilla con los números de clientes y ventas', 'En tu planilla, el Tablero hace esta cuenta solo. En el ejercicio pones tu meta y ves cuántos contactos necesitas.'),
    ],
  },

  // ─── Módulo 3 · Pedidos y operación (v1.1: la hoja Pedidos) ─────────────
  'm3-l1': {
    titulo: 'Lo que se repite se escribe',
    escenas: [
      A('Álvaro en una oficina creativa', 'Si un pedido sale bien solo cuando estás tú, no tienes un proceso: tienes una memoria. Y la memoria se cansa.'),
      G('Tres tarjetas: nuevo cliente, pedido, despacho', 'Elige tus tres procesos que más se repiten. Para la mayoría son: llega un cliente nuevo, entra un pedido y sale un despacho.'),
      G('Siete pasos numerados con responsable', 'Escribe cada uno en siete pasos o menos. Cada paso empieza con un verbo y tiene un responsable.'),
      G('Pantallita: el proceso de pedido de Grano Norte, con dos pasos marcados «anotar en la hoja» y «cambiar el estado»', 'En Grano Norte, el pedido quedó en seis pasos. Fíjate en dos: anotar el pedido en la hoja Pedidos y cambiar su estado. Así el proceso y la planilla se mantienen al día solos.'),
      G('Un paso vago tachado y reescrito con verbo y responsable', 'Evita los pasos vagos como «coordinar el pedido». Mejor: «Matías confirma por WhatsApp la hora de entrega con el cliente». Si un paso no tiene responsable, nadie lo va a hacer.'),
      G('El editor de procesos', 'Escribe tus tres procesos en el ejercicio. La prueba: que alguien nuevo pueda seguirlos sin preguntarte.'),
    ],
  },
  'm3-l2': {
    titulo: 'Del WhatsApp a la hoja Pedidos',
    escenas: [
      A('Álvaro con el celular en la mano', 'Si te preguntan qué hay que entregar mañana y tienes que revisar el WhatsApp entero, tus pedidos no están en ningún lado.'),
      G('Un mensaje de WhatsApp que se convierte en una fila de planilla', 'La regla es una sola: cada pedido que llega, por WhatsApp, correo o teléfono, se anota en una fila de la hoja Pedidos. En el momento, y lo anota quien lo recibe.'),
      G('Las columnas de la hoja Pedidos se iluminan una a una', 'La fila tiene lo mismo que tu planilla: fecha, cliente, producto, cantidad, fecha de entrega, responsable y estado. El precio y el total los completa la hoja sola desde tu lista de productos.'),
      G('Pantallita: mensaje «necesito grano otra vez» con «¿cuánto?» y «¿para cuándo?» resaltados', 'Antes de anotar, revisa que el pedido diga cuánto y para cuándo. Si falta algo, se pregunta antes de confirmar.'),
      G('Respuesta al cliente: «Anotado: 4 kg de molido para el jueves. Te lo lleva Sofía.»', 'Y le respondes al cliente con lo que quedó en la fila. Si algo está mal, se corrige ahí y no el día de la entrega.'),
      G('Ícono de freno sobre la fecha de entrega', 'Un freno: ninguna fecha de entrega se confirma sin revisar stock o capacidad. Si no está en la hoja, el pedido no existe.'),
    ],
  },
  'm3-l3': {
    titulo: 'Checklist de entrega por tipo de trabajo',
    escenas: [
      A('Álvaro junto a cajas de despacho', 'Los errores de entrega casi nunca son por falta de ganas. Son por un paso que se olvidó.'),
      G('Lista de chequeo que se marca sola', 'Un checklist de entrega es la lista de lo que tiene que estar listo antes de decir «entregado». Uno por cada tipo de trabajo.'),
      G('Pantallita: checklist «nuevo cliente oficina» de Grano Norte', 'El de Grano Norte para un cliente de oficina incluye: molienda confirmada, dirección y horario de recepción, factura con los datos correctos y un mensaje de bienvenida.'),
      G('Persona del equipo marcando el checklist y cambiando el estado a «Entregado» en la hoja', 'El checklist lo marca quien entrega, no tú. Y solo con el checklist completo se cambia el estado a «Entregado» en la hoja Pedidos. Así sabes que está hecho sin preguntar.'),
      G('Tres checklists distintos: cliente nuevo, pedido recurrente, pedido especial', 'Si haces distintos tipos de trabajo, arma un checklist para cada uno. Un pedido recurrente no necesita lo mismo que un cliente nuevo. Empieza por el que más errores te da hoy.'),
      G('El checklist del ejercicio', 'Practica con el de Grano Norte y después arma el tuyo.'),
    ],
  },
  'm3-l4': {
    titulo: 'El estado de cada pedido en una vista',
    escenas: [
      A('Álvaro frente a la planilla en el notebook', '¿Cuántas veces al día te preguntan «¿cómo va lo de…?». Cada pregunta es una señal de que el estado no está a la vista.'),
      G('La columna Estado de la hoja Pedidos: por hacer, en curso, entregado', 'No necesitas otra herramienta. La hoja Pedidos ya tiene la columna Estado: por hacer, en curso, entregado o cancelado. Y una regla: quien mueve el trabajo, cambia el estado.'),
      G('La columna Atrasado se llena sola con «Sí» en una fila', 'Al lado está la columna Atrasado. Nadie la escribe: dice «Sí» cuando la fecha de entrega ya pasó y el pedido no está entregado.'),
      G('Menú «Datos → Crear un filtro» y la columna Estado sin «Entregado»', 'Con un filtro ves solo lo que no está entregado, ordenado por fecha de entrega. Arriba quedan los atrasados y lo que vence hoy.'),
      G('Pantallita: hoja Pedidos de Grano Norte filtrada, un atrasado marcado', 'En Grano Norte, Camila mira ese filtro a las nueve y a las cuatro. Dejó de preguntar.'),
      G('Muchas filas «En curso», marcadas en rosa', 'Una señal de alerta: si se llenan las filas en curso, el equipo está empezando mucho y terminando poco. Antes de abrir algo nuevo, cierra lo que está andando.'),
    ],
  },
  'm3-l5': {
    titulo: 'El resumen del día',
    escenas: [
      A('Álvaro con un café en la mañana', 'Partir el día leyendo cuarenta mensajes es partir el día atrasado. Mejor partir con un resumen de cinco minutos.'),
      G('Tres secciones: qué llegó, qué falta, qué vence', 'El resumen del día responde tres preguntas: qué llegó desde ayer, qué falta por hacer y qué vence hoy.'),
      G('La hoja Pedidos con tres filtros que se aplican uno tras otro', 'No lo prepara nadie: lo lees en la hoja Pedidos. Qué llegó son las filas con fecha de ayer u hoy. Qué falta, las que están por hacer o en curso. Qué vence, las que se entregan hoy o dicen atrasado.'),
      G('Pantallita: resumen del martes de Grano Norte', 'El martes de Grano Norte: dos pedidos nuevos, el plan oficina en curso y un despacho atrasado desde ayer, que Sofía avisa antes de las once.'),
      G('Tarjeta: «Si son las 8:30 y estoy en la tostaduría, abro la hoja Pedidos»', 'Lo que más ayuda a que se vuelva costumbre es decidir de antemano a qué hora y dónde lo vas a leer. Escríbelo así: si son las ocho y media y estoy en la tostaduría, abro la hoja Pedidos.'),
      G('Persona leyendo la planilla en cinco minutos', 'Tú lo lees en cinco minutos, decides y avisas lo que cambia. En el módulo seis lo juntas con el tablero de los lunes.'),
    ],
  },

  // ─── Módulo 4 · Atención y postventa (v1.1: la hoja Atención) ───────────
  'm4-l1': {
    titulo: 'Los 3 tipos de mensaje',
    escenas: [
      A('Álvaro a cámara (con micrófono, estilo podcast); sigue en gráficos', 'Antes de ordenar la atención, hay que saber qué te escriben. Y casi siempre lo sabemos de memoria, no con números.'),
      G('Tres cajas: repetidos, con decisión, nuevos', 'Todos tus mensajes caben en tres tipos. Repetidos: precio, horario, despacho. Con decisión: un descuento, una fecha especial, un reclamo. Y nuevos: lo que nunca te habían preguntado.'),
      G('Pantallita: conteo de dos días de Grano Norte', 'Camila contó sus mensajes dos días: de cada diez, seis eran repetidos, tres necesitaban una decisión y uno era nuevo.'),
      G('Los repetidos van a una respuesta lista; los otros, a una persona y a la hoja Atención', 'Los repetidos se responden con un texto que ya está escrito, y lo puede mandar cualquiera de tu equipo. Los otros dos pasan por una persona y quedan anotados hasta cerrarse.'),
      G('Cálculo: 40 mensajes × 60 % × 2 minutos = 48 minutos al día', 'Haz la cuenta: si recibes cuarenta mensajes al día, seis de cada diez son repetidos y cada uno te toma dos minutos, son casi cincuenta minutos diarios escribiendo lo mismo.'),
      G('El contador del ejercicio', 'Usa el contador del ejercicio durante dos días. Ese número te dice cuánto tiempo se te va en lo repetido.'),
    ],
  },
  'm4-l2': {
    titulo: 'Respuestas listas para lo repetido',
    escenas: [
      A('Álvaro con el celular, plano cercano', 'Si escribes «lunes a viernes de nueve a dieciocho» diez veces al día, no te falta tiempo. Te falta tenerlo escrito.'),
      G('Lista de preguntas con su respuesta corta al lado', 'Escribe una vez tus respuestas de siempre, con tu tono: cortas, cercanas y con una sola pregunta al final. Con seis a diez cubres casi todo.'),
      G('WhatsApp Business: «Respuestas rápidas» y el atajo /horario que despliega el texto', 'Después las guardas como respuestas rápidas en la app gratis de WhatsApp Business. Escribes «barra horario» y aparece el texto completo. Y activas el mensaje de ausencia con tu horario.'),
      G('Dos personas del equipo respondiendo lo mismo con el mismo atajo', 'Así responde igual quien sea de tu equipo, en segundos y sin preguntarte.'),
      G('Ícono de freno sobre «precio especial», «fecha» y «reclamo»', 'Un freno: lo que toca una regla de freno, como un precio especial o un reclamo, no lleva respuesta lista. Lo ve una persona.'),
      G('Nota al pie: «opcional · asistente de IA o chatbot»', 'Y si algún día quieres que conteste solo, este mismo texto sirve como instrucciones para un asistente o un chatbot. Es opcional: primero, las respuestas listas.'),
    ],
  },
  'm4-l3': {
    titulo: 'La hoja Atención: cada caso hasta cerrarlo',
    escenas: [
      A('Álvaro serio, plano medio', 'Lo que no se resuelve con una respuesta lista queda pendiente. Y si queda solo en el chat, se pierde entre los mensajes del día siguiente.'),
      G('Un reclamo de WhatsApp que se convierte en una fila de la hoja Atención', 'Por eso cada caso se anota en una fila de la hoja Atención: fecha, cliente, canal, tipo, qué pasó, responsable y estado. Queda abierto hasta que se cierra.'),
      G('La columna «Días abierto» se llena sola; una fila con 3 días se marca', 'La columna días abierto se calcula sola. Si un caso pasa los dos días abierto, se revisa en la reunión del equipo.'),
      G('Cuatro pasos: acuse, solución, seguimiento, cierre', 'Los reclamos, además, pasan por cuatro pasos: acuse el mismo día, una solución concreta con fecha, un seguimiento para confirmar que se resolvió y el cierre. Con una plantilla para cada uno, nadie improvisa.'),
      G('Pantallita: el caso del café molido equivocado, 3 días abierto y cerrado', 'En Grano Norte, el café molido equivocado se repuso al día siguiente y se cerró con un llamado de Camila. Tres días abierto, y el checklist de entrega ahora pide confirmar la molienda por escrito.'),
      G('Ícono de freno: compensaciones', 'Las compensaciones, como una reposición o un descuento, las decide siempre una persona.'),
    ],
  },
  'm4-l4': {
    titulo: 'Cuándo pasa a una persona',
    escenas: [
      A('Álvaro en su escritorio', 'Responder rápido no es responderlo todo. Hay mensajes que pasan sí o sí a una persona.'),
      G('Flujo: mensaje → quien atiende → ¿freno? → avisa y anota → persona', 'Cuando un mensaje toca un freno, quien atiende hace tres cosas: le dice al cliente quién lo va a atender y cuándo, avisa a esa persona y anota el caso en la hoja Atención.'),
      G('Reloj con el tiempo máximo de respuesta', 'Y defines un tiempo máximo: por ejemplo, dos horas hábiles. Si pasa ese tiempo, el aviso sube a una segunda persona.'),
      G('Pantallita: traspaso de un reclamo en Grano Norte', 'En Grano Norte, un reclamo por café molido equivocado lo recibe Sofía, lo anota y pasa directo a Matías, de despacho, con un aviso por el grupo del equipo.'),
      G('El formulario de derivación', 'En el ejercicio defines tus disparadores, a quién se avisa y en cuánto tiempo.'),
    ],
  },
  'm4-l5': {
    titulo: 'Postventa: que vuelvan a comprar',
    escenas: [
      A('Álvaro a cámara (con micrófono, estilo podcast); sigue en gráficos', 'Después de la entrega, muchos negocios no le vuelven a escribir al cliente. Ahí hay ventas que se pierden solo por no preguntar.'),
      G('Tres momentos en línea: día 2 o 3, «gracias», ciclo de compra', 'La postventa son tres mensajes. A los dos o tres días, uno corto para saber cómo les fue. Si te dan las gracias, ese es un buen momento para pedir un referido. Y cuando se cumple su ciclo de compra, le escribes para que vuelva.'),
      G('La columna «Última compra» de la hoja Clientes y una fecha calculada: «le toca el jueves»', 'El ciclo sale de tu hoja Clientes: la última compra, más los días que suele demorar en volver a comprar. Así sabes a quién le toca esta semana.'),
      G('Pantallita: mensaje de recompra a Cafetería Puerto Dulce', 'En Grano Norte, Puerto Dulce compra cada dos semanas. A los doce días, Camila le escribe: «¿te preparo lo mismo de siempre para el jueves?».'),
      G('Celular con un mensaje uno a uno, y una lista masiva tachada', 'Son tus clientes: ya te conocen y te dieron su número, así que por WhatsApp sí. Uno a uno y con su nombre, nunca un envío masivo.'),
      G('Las plantillas y la lista del ejercicio', 'En el ejercicio escribes tus tres mensajes y ves a quién le toca volver a comprar.'),
    ],
  },

  // ─── Módulo 5 · Cobranza y caja (v1.1: hojas Cobranza, Caja y Productos) ──
  'm5-l1': {
    titulo: 'Cobranza sin perseguir a nadie',
    escenas: [
      A('Álvaro en una cafetería', 'Perseguir pagos a fin de mes es incómodo para ti y para tu cliente. Con fechas fijas, deja de ser personal: es cómo funciona tu negocio.'),
      G('La hoja Cobranza con sus columnas: factura, cliente, monto, emisión, vencimiento, pagado, días de atraso', 'Primero, la hoja Cobranza de tu planilla. Cada factura o boleta en una fila: cliente, monto, emisión y vencimiento. Si no pones el vencimiento, se cuenta a treinta días.'),
      G('La columna «Días de atraso» llenándose sola y una fila que se marca', 'Los días de atraso se calculan solos, y el tablero suma lo que tienes por cobrar y lo vencido. En Grano Norte, una factura de noventa y seis mil pesos llevaba diez días vencida y nadie se había dado cuenta.'),
      G('Línea de tiempo: 3 días antes, el día, 5 días después, llamado', 'Después, tres recordatorios con tu tono: tres días antes del vencimiento, el mismo día y cinco días después. Si no hay respuesta, llamas.'),
      G('Ícono de freno: acuerdos de pago y datos bancarios', 'Los acuerdos de pago y cualquier cambio de datos bancarios los decide siempre una persona.'),
      G('El ejercicio: la hoja Cobranza y el archivo de calendario', 'En el ejercicio anotas tus facturas sin pagar, adaptas los tres mensajes y descargas los recordatorios para tu calendario.'),
    ],
  },
  'm5-l2': {
    titulo: 'Lo que entra y lo que sale: la hoja Caja',
    escenas: [
      A('Álvaro con el celular, mirando la app del banco', '¿Sabes cuánta plata tienes hoy sin abrir el banco? Si la respuesta es «más o menos», esta lección es para ti.'),
      G('La hoja Caja: fecha, concepto, categoría, entra, sale, saldo', 'La hoja Caja tiene una fila por movimiento: lo que entra, lo que sale y el saldo, que se calcula solo. La primera fila es el saldo de tu cuenta el día que empiezas.'),
      G('Categorías en etiquetas: cobranza, venta al contado, insumos, sueldos, arriendo, impuestos, despacho, otros', 'Con pocas categorías basta. Si dudas dónde va un gasto, la categoría sobra.'),
      G('Pantallita: el saldo de Grano Norte, 437 mil pesos', 'Camila creía que tenía más o menos un millón. La hoja dijo cuatrocientos treinta y siete mil: el café verde y el arriendo habían salido la misma quincena.'),
      G('Calendario con 10 minutos el viernes', 'Diez minutos cada viernes y la hoja queda al día. Si usas ChatGPT o Claude, te puede pasar una boleta a una fila; si no, la anotas a mano en diez segundos.'),
    ],
  },
  'm5-l3': {
    titulo: 'Tu caja de las próximas 4 semanas',
    escenas: [
      A('Álvaro frente a un calendario', 'Saber cuánta caja tienes hoy sirve. Saber cuánta vas a tener en tres semanas te salva.'),
      G('Fórmula en pantalla: caja de hoy + lo que vas a cobrar − lo que tienes que pagar', 'La cuenta es simple: caja de hoy, más lo que vas a cobrar, menos lo que tienes que pagar, semana por semana. Lo que vas a cobrar sale de tu hoja Cobranza.'),
      G('Barras de cuatro semanas; la tercera baja de cero en rojo', 'En Grano Norte, la tercera semana quedaba bajo cero: compra de café verde y arriendo, seguidos. Se vio con dos semanas de anticipación.'),
      G('Tres salidas: cobrar antes, mover una compra, conversar un plazo', 'Con tiempo hay salidas: cobrar antes lo vencido, mover una compra a la semana siguiente o conversar un plazo con un proveedor. Camila hizo las dos primeras.'),
      G('La calculadora del ejercicio', 'En el ejercicio haces tu cuenta de cuatro semanas. Repítela cada viernes: con una factura que no te paguen, cambia.'),
    ],
  },
  'm5-l4': {
    titulo: 'Precio y margen',
    escenas: [
      A('Álvaro con una calculadora', 'Vender más de un producto que te hace perder plata es trabajar más para ganar menos.'),
      G('Barra de precio dividida en costo directo y margen', 'El margen es lo que te queda después de los costos directos: insumos, envase, despacho y comisiones. Se calcula por producto.'),
      G('La hoja Productos: costo, precio, margen en pesos y en porcentaje', 'Tu hoja Productos ya tiene los precios desde el módulo cero. Ahora le sumas el costo, y la hoja calcula sola el margen. El tablero muestra el promedio.'),
      G('Pantallita: los tres productos de Grano Norte con su margen', 'Grano Norte calculó sus tres productos. El plan oficina, que Camila creía el mejor, dejaba menos margen por el despacho incluido.'),
      G('Tres caminos: subir precio, bajar costo o dejar de venderlo', 'Cuando un producto deja poco, tienes tres caminos: subir el precio, bajar un costo o dejar de venderlo. Y un cambio de precio lo decide una persona.'),
    ],
  },

  // ─── Módulo 6 · El tablero (v1.1: reemplaza «Tu propia infra») ────────────
  'm6-l1': {
    titulo: 'Tus números del lunes',
    escenas: [
      A('Álvaro en la bodega de Grano Norte, lunes temprano', 'Armaste las hojas una por una. Ahora las juntamos en la única hoja que nadie llena: el tablero.'),
      G('La hoja Tablero con sus cinco grupos de números', 'El tablero se calcula solo desde tus hojas. Son pocos números en cinco grupos: clientes y ventas, origen, pedidos, atención, y cobranza y caja.'),
      G('Avisos al lado de algunos números: «Revisar hoy», «Cobrar esta semana»', 'Al lado de algunos aparece un aviso: revisar hoy, cobrar esta semana. Esos son los que se conversan el lunes.'),
      G('Pantallita: el tablero de Grano Norte, con 96 mil vencidos y un pedido atrasado', 'El primer lunes de Grano Norte salieron dos cosas en diez minutos: noventa y seis mil pesos vencidos y un pedido atrasado. Antes, Camila se habría enterado por un reclamo.'),
      G('El ejercicio: el número que preocupa, la decisión y quién la hace', 'En el ejercicio abres tu tablero y anotas el número que más te preocupa, qué decides y quién lo hace.'),
    ],
  },
  'm6-l2': {
    titulo: 'Cómo se conectan las hojas',
    escenas: [
      A('Álvaro frente a la pizarra', 'El tablero no tiene nada escrito a mano. Cada número lee una hoja.'),
      G('Hojas conectadas con líneas al tablero', 'Los clientes activos salen de Clientes; las ventas del mes, de Pedidos; lo vencido, de Cobranza; la caja, de Caja. Por eso la regla más importante es simple: cada dato se anota una vez, en un solo lugar.'),
      G('El precio en Productos, tomado por Pedidos', 'El precio vive en Productos, y Pedidos lo toma de ahí. Si lo copias a mano en otra parte, tarde o temprano las dos versiones dejan de calzar.'),
      G('Pantallita: el lunes en que el tablero decía 160 mil vencidos', 'Un lunes, el tablero de Grano Norte decía ciento sesenta mil vencidos, pero el Cowork ya había pagado. Nadie había marcado el pago. Si un número no te calza, revisa la hoja, no la fórmula.'),
      G('El ejercicio de clasificar dónde se anota cada cosa', 'En el ejercicio decides en qué hoja va cada cosa que pasa en una semana.'),
    ],
  },
  'm6-l3': {
    titulo: 'Compartirlo con tu equipo',
    escenas: [
      A('Álvaro con el notebook, plano medio', 'Una planilla que solo abres tú sigue dependiendo de ti. El paso que cambia todo es compartirla.'),
      G('Botón «Compartir» de Google Sheets y los roles editor y lector', 'En Google Sheets tocas compartir y agregas a cada persona con su correo. Quien actualiza una hoja va como editor; quien solo mira, como lector.'),
      G('Menú Datos → Proteger hojas y rangos, con Productos y Tablero marcadas', 'Lo que cambia una sola persona se protege: los precios en Productos y el tablero. Son tus reglas de freno, escritas en la planilla.'),
      G('Pantallita: quién edita qué en Grano Norte', 'En Grano Norte, Sofía y Matías actualizan Pedidos; Camila, Clientes, Cobranza y Caja. El contador entra como lector a fin de mes.'),
      G('Ícono de freno sobre el enlace público', 'Comparte con correos, nunca con cualquier persona con el enlace: tu planilla tiene datos de tus clientes.'),
    ],
  },
  'm6-l4': {
    titulo: 'Las rutinas de tu sistema',
    escenas: [
      A('Álvaro con un café, temprano', 'Una planilla vale lo que valen sus rutinas. Si nadie la abre, en dos semanas deja de decir la verdad.'),
      G('Cuatro tarjetas: cada día 20 min, lunes 10 min, viernes 15 min, fin de mes', 'Tu sistema se mantiene con poco: veinte minutos al día con Clientes y Pedidos, diez los lunes con el tablero, quince los viernes para dejar todo al día y una revisión a fin de mes.'),
      G('Frase en pantalla: «Si son las [hora] y estoy en [lugar], entonces abro la planilla»', 'Lo que más ayuda está bien estudiado: decidir de antemano a qué hora y dónde lo vas a hacer. Escrito así: si son las ocho y media y estoy en mi escritorio, entonces abro la planilla.'),
      G('Pantallita: la frase de Camila pegada en el monitor', 'Camila lo pegó en el monitor: abre la planilla antes que el WhatsApp.'),
      G('El ejercicio de las rutinas', 'En el ejercicio escribes cuándo y dónde haces cada rutina. Y si un día no puedes, retomas al siguiente: saltarte un día no arruina nada.'),
    ],
  },
  'm6-l5': {
    titulo: 'Cuándo una planilla ya no basta',
    escenas: [
      A('Álvaro en su escritorio, tono honesto', 'Esta planilla es tu primer CRM y tu primer ERP. Para una pyme chica suele bastar por mucho tiempo, pero no para siempre.'),
      G('Dos columnas: la planilla basta / conviene mirar un software', 'Las señales son concretas: muchas personas editando a la vez, cientos de pedidos al mes, necesitar que los pedidos generen la factura o descuenten inventario solos.'),
      G('La planilla convirtiéndose en una lista de requisitos', 'Cuando llegues ahí, tu planilla no se pierde: es la mejor preparación para elegir un software. Ya sabes qué datos necesitas y qué números miras.'),
      G('Pantalla de ChatGPT o Claude revisando una hoja, con la frase «revisa tú»', 'Y si usas ChatGPT o Claude, te pueden servir de segunda mirada: les pegas una hoja y te dicen qué está incompleto. Siempre como borrador que revisas tú, y sin datos sensibles de tus clientes.'),
      A('Álvaro, plano cercano', 'Pero no compres software por una demo. Primero las rutinas, después los números, y recién ahí la herramienta.'),
    ],
  },
  'm6-final': {
    titulo: 'Tu negocio en 6 semanas: antes y después',
    escenas: [
      A('Álvaro, plano medio, tono de cierre', 'Llegaste al final. Hace seis semanas tus clientes vivían en el WhatsApp y en tu memoria. Veamos qué cambió.'),
      G('El semáforo del módulo 0 al lado del semáforo de hoy, pieza por pieza', 'Este es tu semáforo de antes y el de hoy. Cada pieza que pasó de rojo a naranja, o de naranja a verde, es tiempo que recuperaste.'),
      G('La planilla con sus hojas llenas y el tablero al final', 'Tu proyecto final es tu planilla con datos reales: clientes, origen, productos, pedidos, atención, cobranza y caja, conectados en un tablero.'),
      G('Equipo mirando el tablero en una pantalla', 'Compártela con tu equipo. Es lo que les permite saber en qué va cada cliente y cada pedido sin preguntarte.'),
      G('La hoja del proyecto final guardándose como PDF', 'Guarda la hoja del proyecto en PDF, con quién actualiza cada hoja y tus rutinas. La planilla no es un archivo que se guarda: es el que se usa cada lunes.'),
      G('Frase en pantalla: ¿Quedó algo pendiente? Lo armamos juntos.', 'Y si quedó algo pendiente, lo armamos juntos.'),
      A('Álvaro a cámara (escritorio con monitores)', 'Pero lo más difícil ya lo hiciste: anotar cómo funciona tu negocio en un solo lugar.'),
    ],
  },

  // ─── Videos de la v1.0 regrabados con el enfoque v1.1 (8-nov-2026) ─────────────
  // v10 no se regrabó (fuera de alcance): su entrada, si existe, es solo guion.
  'v08-curso-venta': {
    titulo: 'Tu primer CRM y ERP, en 6 semanas',
    escenas: [
      A('Álvaro a cámara (oficina de noche, camisa azul); sigue en gráficos', '¿Tus clientes viven en el WhatsApp y los pedidos en tu cabeza? No es desorden: nada está anotado en un solo lugar.'),
      G('Una planilla vacía; aparecen dos tarjetas: CRM y ERP', 'En este curso armas tu primer CRM y ERP en Google Sheets. El CRM es el lugar donde ves a todos tus clientes y en qué va cada uno. El ERP es donde se juntan ventas, pedidos, cobranza y caja.'),
      G('Pestañas que se suman una por semana: Clientes, Origen, Pedidos, Atención, Cobranza, Caja', 'Cada semana sumas una hoja a la misma planilla, con las fórmulas listas: tú llenas filas.'),
      G('El tablero de Grano Norte con sus números', 'Al final, un tablero te muestra tus números del lunes: lo que vendiste, lo que te deben y cuánta caja tienes. No es un software: es una planilla bien armada y rutinas cortas.'),
      A('Álvaro a cámara (oficina de noche, camisa azul)', 'Está en preventa a precio fundador.'),
      G('Botón final: El sistema de tu negocio', 'El módulo 0 y tu planilla base los recibes hoy. Te espero adentro.'),
    ],
  },
  'v09-m0-l1': {
    titulo: 'Por qué todo pasa por ti',
    escenas: [
      A('Álvaro a cámara (frente a la pizarra)', 'Si el precio está en tu cabeza, cada cotización te espera. Si el despacho se coordina de memoria, cada pedido te espera.'),
      G('Frase en pantalla: El problema no es que trabajes poco: es que nada está anotado en un solo lugar.', 'El problema no es que trabajes poco: es que nada está anotado en un solo lugar.'),
      G('Dos tarjetas: CRM y ERP, con su definición', 'Dos palabras que vas a escuchar harto. Un CRM es el lugar donde ves a todos tus clientes y en qué va cada uno. Un ERP es el sistema donde se juntan ventas, pedidos, cobranza y caja.'),
      G('El mapa: cinco hojas alrededor del tablero', 'Tu sistema tiene cinco piezas, cada una con su hoja: clientes y ventas, de dónde llegan, pedidos, atención, y cobranza con caja. Al centro, el tablero que las lee todas.'),
      G('Pantallita de Grano Norte: WhatsApp, un cuaderno y un Excel', 'Camila, de Grano Norte, vende bien, pero tiene a sus clientes repartidos entre el WhatsApp, un cuaderno y un Excel que nadie actualiza. No le falta talento: le falta un solo lugar.'),
      G('El mapa interactivo de la lección', 'Toca cada pieza en el mapa de abajo y mira qué se anota ahí. En la próxima lección vemos cuál se te cae a ti.'),
    ],
  },
  'v10-m0-l2': {
    titulo: 'Diagnóstico de 15 preguntas',
    escenas: [
      A('Álvaro con el celular en la mano', 'Ahora vamos a ver dónde estás. Son 15 preguntas, tres por cada pieza de tu sistema. Responde pensando en lo que pasa de verdad, no en lo que te gustaría.'),
      G('Semáforo: rojo, naranja y verde', 'Al final te queda un semáforo: verde lo que funciona sin ti, naranja lo que funciona a medias y rojo lo que hoy depende de ti. Y te propongo el orden: primero lo rojo. Guarda este resultado: al final del curso lo comparas.'),
    ],
  },
  'v11-m0-l3': {
    titulo: 'Tu planilla base y la ficha del negocio',
    escenas: [
      A('Álvaro en su escritorio con el notebook', 'Todo lo que viene en el curso vive en una sola planilla. Hoy la dejas lista.'),
      G('El formulario de la ficha llenándose', 'Anota el nombre de tu negocio, qué vendes, a quién y tu lista de precios. Son quince minutos.'),
      G('El archivo se descarga y se abre en Google Sheets, con sus pestañas', 'Con eso descargas tu planilla, ya con tu nombre y tus productos, y la abres en Google Sheets. Trae todas las hojas del curso conectadas: las vas a ir llenando módulo a módulo.'),
      G('El ejemplo de Grano Norte, lleno', 'Si quieres ver cómo queda, baja el ejemplo de Grano Norte. Y si usas IA, esta misma información le sirve, pero no la necesitas.'),
    ],
  },
  'v12-m0-l4': {
    titulo: 'Las reglas de freno del negocio',
    escenas: [
      A('Álvaro a cámara (con micrófono, estilo podcast)', 'Antes de que algo funcione sin ti, hay que decidir qué no puede pasar sin ti.'),
      G('Gráfico', 'Eso son las reglas de freno: precios especiales, plazos de entrega, plata y reclamos.'),
      G('Gráfico', 'Abajo tienes 15 reglas. Elige las que aplican a tu negocio y edítalas con tus palabras. Por ejemplo, Camila decidió que cualquier pedido sobre 20 kilos, cualquier descuento y cualquier reclamo pasan por ella.'),
      G('La portada del sistema: semáforo, planilla base y reglas', 'Con tu semáforo, tu planilla base y tus reglas ya tienes la portada de tu sistema. La próxima semana partimos con tu CRM: la hoja Clientes.'),
    ],
  },
  'v13-m0-cierre': {
    titulo: 'Lo que viene',
    escenas: [
      A('Álvaro a cámara (oficina creativa); sigue en gráficos', 'Ya tienes el mapa de tu negocio, tu semáforo, tu planilla base y tus reglas.'),
      G('Frase en pantalla: Más orden del que tenías hace una semana.', 'Eso ya es más orden del que tenías hace una semana.'),
      G('Tarjetas: Lo que viene', 'Si quieres seguir conmigo, el curso suma una hoja por semana hasta tu tablero. Y si todavía no, mira la grabación del último workshop.'),
    ],
  },
  'v05-guia-cierre': {
    titulo: 'De tu primer CRM al sistema de tu negocio',
    escenas: [
      A('Álvaro a cámara (oficina de noche, camisa azul)', 'Felicitaciones. Lo que hiciste en esta guía funciona: lista, mensaje, seguimientos y rutina.'),
      G('Las pestañas de la planilla: Tu planilla ya es tu primer CRM', 'Y tu planilla ya es tu primer CRM. En el curso El sistema de tu negocio la extiendes al resto: de dónde llegan tus clientes, los pedidos, la atención, la cobranza y la caja, todo en la misma planilla y con un tablero que miras los lunes.'),
      G('Botón final: Tu lista pasa sola a la hoja Clientes', 'Tu lista de esta guía pasa sola a la hoja Clientes.'),
      A('Álvaro a cámara (oficina de noche, camisa azul)', 'Te espero adentro.'),
    ],
  },
  'v17-anuncio-curso': {
    titulo: 'Tu primer CRM y ERP en Google Sheets',
    escenas: [
      A('Álvaro a cámara, vertical 9:16', '¿Tus clientes viven en el WhatsApp y los pedidos en tu cabeza? No es desorden: nada está anotado en un solo lugar.'),
      G('Pestañas de la planilla y el tablero', 'En 6 semanas armas tu primer CRM y ERP en Google Sheets: clientes, pedidos, cobranza y caja en una planilla, con un tablero que miras los lunes. Sin pagar software.'),
      A('Álvaro a cámara (oficina de noche, camisa azul)', 'Está en preventa a precio fundador.'),
      G('Botón final: Tu primer CRM y ERP en Google Sheets', 'Link en mi perfil.'),
    ],
  },
};

export const GUIONES: Record<string, Guion> = Object.fromEntries(
  Object.entries(CRUDOS).map(([id, g]) => {
    const segundos = g.escenas.reduce((s, e) => s + segundosDe(e.voz), 0);
    const segundosAlvaro = g.escenas.filter((e) => e.quien === 'alvaro').reduce((s, e) => s + segundosDe(e.voz), 0);
    return [id, { ...g, segundos, segundosAlvaro, duracion: `~${segundos} s` }];
  }),
);
