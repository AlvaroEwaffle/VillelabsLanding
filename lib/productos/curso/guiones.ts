// Guiones de los videos de los módulos 1–6 del curso «Tu negocio de punta a punta» (8-nov-2026).
// Pendientes de grabar (HeyGen con créditos limitados): mientras tanto la lección muestra el marcador
// «Video próximamente» y el guion se puede leer debajo.
// Regla 20/80: Álvaro en cámara ~20 % del tiempo (apertura y, a veces, el cierre); el resto, gráficos con su voz.
// La duración se calcula sola a ~2,4 palabras por segundo (ritmo de locución en español).
// Copia en VPM/Villelabs/productos-digitales/guiones-curso-modulos-1-6.md (generada desde este archivo).

export type Escena = { quien: 'alvaro' | 'grafico'; visual: string; voz: string };
export type Guion = { titulo: string; duracion: string; segundos: number; segundosAlvaro: number; escenas: Escena[] };

const PALABRAS_POR_SEGUNDO = 2.4;

const segundosDe = (texto: string) => Math.round(texto.trim().split(/\s+/).length / PALABRAS_POR_SEGUNDO);

const A = (visual: string, voz: string): Escena => ({ quien: 'alvaro', visual, voz });
const G = (visual: string, voz: string): Escena => ({ quien: 'grafico', visual, voz });

const CRUDOS: Record<string, { titulo: string; escenas: Escena[] }> = {
  // ─── Módulo 1 · Marketing ────────────────────────────────────────────────
  'm1-l1': {
    titulo: 'Tu mensaje en una frase',
    escenas: [
      A('Álvaro en su escritorio, plano medio', 'Si alguien te pregunta qué hace tu negocio y tardas un minuto en explicarlo, tu cliente también se demora en entenderlo. Vamos a dejarlo en una frase.'),
      G('Tres bloques que se arman: problema + para quién + resultado', 'La frase tiene tres piezas: el problema que resuelves, para quién, y el resultado que logra. No lo que haces: lo que cambia para tu cliente.'),
      G('Pantallita de Grano Norte con tres versiones, la tercera se ilumina', 'Camila, de Grano Norte, escribió tres versiones. «Tostamos café de especialidad» habla de ella. La tercera habla de su cliente: «Cafeterías de la región que quieren café fresco cada semana, sin quedarse nunca sin stock».'),
      G('Lista de chequeo: ¿se entiende sin explicar?, ¿nombra a alguien?, ¿promete un resultado?', 'Para elegir, revisa tres cosas: que se entienda sin explicar, que nombre a alguien concreto y que prometa un resultado que se pueda ver.'),
      G('El ejercicio de la lección en pantalla', 'Ahora tú. Escribe tres versiones en el ejercicio, elige una y descárgala. Esa frase va a abrir tu calendario de contenido.'),
    ],
  },
  'm1-l2': {
    titulo: 'Tus 3 temas',
    escenas: [
      A('Álvaro frente a la pizarra', '¿Te ha pasado que te sientas a publicar y no sabes de qué hablar? No te falta creatividad. Te faltan temas fijos.'),
      G('Tres columnas: lo que quiere aprender · lo que te diferencia · la prueba', 'Todo lo que publicas sale de tres temas. Uno: lo que tu cliente quiere aprender. Dos: lo que te diferencia. Tres: la prueba de que funciona, con casos y clientes.'),
      G('Las tres columnas se llenan con los temas de Grano Norte', 'En Grano Norte quedan así: cómo elegir café para tu cafetería; tostado fresco versus café de supermercado; y cafeterías que se cambiaron y qué notaron.'),
      G('De cada tema salen tres ideas en una grilla de 3 por 3', 'De cada tema saca tres ideas. Con eso tienes nueve publicaciones antes de empezar, y nunca más una pantalla en blanco.'),
      G('El ejercicio de la lección en pantalla', 'Completa tus tres temas y tus nueve ideas en el ejercicio. Los vas a usar en la próxima lección.'),
    ],
  },
  'm1-l3': {
    titulo: 'Una semana de contenido en una tarde',
    escenas: [
      A('Álvaro con una taza de café, plano medio', 'Publicar todos los días no significa pensar todos los días. Una idea bien pensada te da la semana completa.'),
      G('Una idea al centro que se abre en cinco piezas: post, historia, carrusel, reel, correo', 'Tomas una idea de tus temas y la conviertes en cinco piezas: un post, una historia, un carrusel, un reel con guion y un correo a tus clientes.'),
      G('Pantalla de un asistente (ChatGPT o Claude) con el prompt de la lección', 'El borrador lo puede preparar un asistente como ChatGPT o Claude. Le pegas tu frase, tus temas y la idea, y te devuelve las cinco piezas con tu tono.'),
      G('Calendario de lunes a viernes con una pieza por día', 'Después las repartes: lunes el post, martes la historia, miércoles el carrusel, jueves el reel y viernes el correo.'),
      G('Ícono de freno: una persona revisa antes de publicar', 'Un freno importante: nada se publica sin que una persona lo lea. El asistente prepara, tú decides.'),
      G('El calendario de 4 semanas descargándose', 'En el ejercicio armas tus cuatro semanas y las descargas para abrirlas en Google Sheets.'),
    ],
  },
  'm1-l4': {
    titulo: 'Responder comentarios y mensajes con tu tono',
    escenas: [
      A('Álvaro con el celular en la mano', 'Un comentario sin respuesta es una venta que se enfría. Pero no todos los mensajes se responden igual.'),
      G('Árbol de decisión: ¿pregunta repetida? ¿quiere comprar? ¿reclamo?', 'Cuando llega un comentario o un mensaje, pregúntate tres cosas. ¿Es una pregunta que se repite? Respondes con tu plantilla. ¿Quiere comprar o cotizar? Pasa a ventas el mismo día. ¿Es un reclamo? Lo ve una persona, siempre.'),
      G('Pantallita: comentario de una cafetería en el post de Grano Norte y la respuesta', 'En Grano Norte, una cafetería comenta «¿venden por mayor?». No se responde con un precio en público: se le agradece y se le escribe por interno ese mismo día.'),
      G('Tarjetas de plantillas con el tono de la marca', 'Tus plantillas suenan como tú: cortas, cercanas y con una sola pregunta al final.'),
      G('El ejercicio de clasificar mensajes', 'En el ejercicio practicas con seis mensajes reales de una semana y ajustas tus plantillas.'),
    ],
  },
  'm1-l5': {
    titulo: 'Qué pieza trae clientes',
    escenas: [
      A('Álvaro frente a la pantalla con datos', 'Mil reproducciones se sienten bien, pero no pagan las cuentas. Vamos a medir lo que sí importa.'),
      G('Embudo con «alcance» tachado y tres números: mensajes, reuniones, ventas', 'El alcance no te dice si una pieza trae clientes. Mide tres números por pieza: cuántos mensajes generó, cuántas reuniones o cotizaciones, y cuántas ventas.'),
      G('Planilla semanal de Grano Norte con una fila destacada', 'En Grano Norte, el carrusel de tostado fresco tuvo menos alcance que el reel, pero trajo nueve mensajes y dos reuniones. Esa es la pieza que hay que repetir.'),
      G('Calendario con un bloque de 10 minutos el viernes', 'Te toma diez minutos a la semana: el viernes anotas los tres números y eliges qué repetir la semana siguiente.'),
      G('Dos piezas lado a lado: una con muchos «me gusta» y cero mensajes, otra con pocos «me gusta» y cinco mensajes', 'Ojo con los «me gusta»: una pieza puede gustar mucho y no traer a nadie. Si una pieza trae mensajes de clientes que calzan con tu cliente ideal, esa manda, aunque se vea menos.'),
      G('La planilla del ejercicio', 'En el ejercicio anotas tus piezas y la planilla te marca cuál trae más conversaciones.'),
    ],
  },

  // ─── Módulo 2 · Ventas ───────────────────────────────────────────────────
  'm2-l1': {
    titulo: 'Cliente ideal y lista del día',
    escenas: [
      A('Álvaro en una cafetería con su notebook', 'Si tus clientes nuevos llegan solo por recomendación, tus ventas dependen de la suerte. Vamos a cambiar eso con veinte minutos al día.'),
      G('Ficha del cliente ideal con cinco campos', 'Primero, tu cliente ideal en cinco datos: el rubro, el tamaño, dónde lo encuentras, qué señal muestra cuando te necesita y quién decide la compra.'),
      G('Pantallita: ficha de Grano Norte, cafeterías de 1 a 3 locales', 'Para Grano Norte: cafeterías de uno a tres locales en la región. La señal: abrieron hace poco o cambiaron de carta.'),
      G('Reloj dividido en 5 + 10 + 5 minutos', 'Después, la rutina: cinco minutos para buscar, diez para escribir y cinco para anotar la fecha del próximo contacto.'),
      G('Lista del día con diez nombres y fechas', 'Si ya hiciste la Guía 1, esto es un repaso. Si no, completa tu ficha y tu primera lista en el ejercicio.'),
    ],
  },
  'm2-l2': {
    titulo: 'Primer mensaje y seguimientos',
    escenas: [
      A('Álvaro con el celular, plano cercano', 'La mayoría de las ventas no se cierran en el primer mensaje. Se cierran en el segundo o en el tercero. El problema es que casi nadie los manda.'),
      G('Mensaje de tres frases con una sola pregunta', 'El primer mensaje tiene tres frases y una sola pregunta: por qué le escribes a esa persona, qué le puedes resolver y una pregunta fácil de contestar.'),
      G('Línea de tiempo: día 0, día 3, día 7, día 14', 'Si no responde, hay tres seguimientos: al día tres, al día siete y al día catorce. El último es un cierre amable que deja la puerta abierta.'),
      G('Pantallita: mensaje de Camila a una cafetería nueva', 'Camila le escribe a una cafetería que abrió en Cerro Alegre: la felicita, le ofrece una muestra de su tostado de la semana y le pregunta si puede pasar el jueves.'),
      G('El editor de plantillas con la vista previa', 'En el ejercicio adaptas las cuatro plantillas y ves cómo quedan con el nombre de un prospecto real.'),
    ],
  },
  'm2-l3': {
    titulo: 'De la conversación a la propuesta',
    escenas: [
      A('Álvaro en la sala de reuniones', 'Una buena propuesta no se escribe en la oficina. Se escribe en la primera reunión, haciendo las preguntas correctas.'),
      G('Cinco preguntas que aparecen una a una', 'Son cinco preguntas: qué problema tienes hoy, cuánto te cuesta, qué has probado, quién más decide y para cuándo lo necesitas.'),
      G('Una hoja que se arma por bloques: problema, propuesta, precio, plazo, siguiente paso', 'Con esas respuestas armas una propuesta de una sola página: el problema con sus palabras, lo que incluye, el precio, el plazo y el siguiente paso con fecha.'),
      G('Pantallita: propuesta «Plan oficina» de Grano Norte', 'Grano Norte armó su «plan oficina»: café en grano cada dos semanas, molienda a elección y despacho incluido.'),
      G('Ícono de freno sobre precio y plazo', 'El precio y el plazo los decide siempre una persona. El asistente te ayuda a redactar, no a comprometer.'),
      G('El formulario de la propuesta', 'En el ejercicio armas la tuya y la descargas lista para enviar.'),
    ],
  },
  'm2-l4': {
    titulo: 'Seguimiento de propuestas',
    escenas: [
      A('Álvaro en su escritorio', '«Quedó en responderme». Esa frase, sin una fecha al lado, es una propuesta perdida.'),
      G('Una propuesta con tres alarmas: día 3, día 7, día 14', 'Cada propuesta que envías nace con tres fechas de seguimiento: a los tres, a los siete y a los catorce días.'),
      G('Calendario con los recordatorios y un borrador listo', 'Ese día, el recordatorio te deja el mensaje en borrador. Tú lo lees, lo ajustas y lo envías.'),
      G('Pantallita: lista de propuestas de Grano Norte con su próxima fecha', 'En Grano Norte, Camila mira su lista cada mañana y sabe exactamente a quién le toca seguimiento hoy.'),
      G('Tres mensajes de seguimiento en tarjetas: día 3, día 7, día 14', 'Cada seguimiento suma algo nuevo: al día tres, una pregunta corta para saber si la revisó; al día siete, un dato o un caso que le sirva; y al día catorce, un cierre amable: «¿lo dejamos para más adelante?». Esa pregunta suele traer la respuesta que faltaba.'),
      G('Ícono de freno sobre el seguimiento', 'Un freno: si el cliente pide cambiar precio o plazo, eso ya no es un seguimiento. Lo responde una persona.'),
      G('Archivo de calendario descargándose', 'En el ejercicio anotas tus propuestas y descargas los recordatorios para tu calendario.'),
    ],
  },
  'm2-l5': {
    titulo: 'Tu embudo en una planilla',
    escenas: [
      A('Álvaro frente a la pantalla con datos', '¿Cuántos mensajes necesitas mandar para cerrar una venta? Si no lo sabes, no sabes cuánto esfuerzo poner cada semana.'),
      G('Embudo de cuatro pisos: prospecto, conversación, propuesta, cierre', 'Tu embudo tiene cuatro pisos: prospectos, conversaciones, propuestas y cierres. Entre piso y piso hay una tasa de paso.'),
      G('Pantallita: los números de un mes de Grano Norte', 'Grano Norte escribió a 80 cafeterías, conversó con 20, envió 8 propuestas y cerró 3. Una de cada cuatro conversaciones termina en propuesta.'),
      G('Flecha que vuelve desde la meta hacia arriba', 'Con esas tasas haces la cuenta al revés: si quieres dos clientes nuevos al mes, sabes cuántos prospectos necesitas por semana.'),
      G('El piso con la tasa más baja se marca en rosa', 'Mira también dónde se te cae más gente. Si conversas harto pero envías pocas propuestas, el problema está en la reunión, no en la prospección. Arregla primero el piso más débil.'),
      G('La calculadora del ejercicio', 'Pon tus números en la calculadora y descarga la planilla para llevarla cada semana.'),
    ],
  },

  // ─── Módulo 3 · Operación ────────────────────────────────────────────────
  'm3-l1': {
    titulo: 'Lo que se repite se escribe',
    escenas: [
      A('Álvaro en una oficina creativa', 'Si un pedido sale bien solo cuando estás tú, no tienes un proceso: tienes una memoria. Y la memoria se cansa.'),
      G('Tres tarjetas: nuevo cliente, pedido, despacho', 'Elige tus tres procesos que más se repiten. Para la mayoría son: llega un cliente nuevo, entra un pedido y sale un despacho.'),
      G('Siete pasos numerados con responsable', 'Escribe cada uno en siete pasos o menos. Cada paso empieza con un verbo y tiene un responsable.'),
      G('Pantallita: el proceso de pedido de oficina de Grano Norte', 'En Grano Norte, el pedido de oficina quedó en seis pasos: recibir, confirmar stock, tostar, envasar, despachar y avisar al cliente.'),
      G('Un paso vago tachado y reescrito con verbo y responsable', 'Evita los pasos vagos como «coordinar el pedido». Mejor: «Juan confirma por WhatsApp la hora de entrega con el cliente». Si un paso no tiene responsable, nadie lo va a hacer.'),
      G('El editor de procesos', 'Escribe tus tres procesos en el ejercicio. La prueba: que alguien nuevo pueda seguirlos sin preguntarte.'),
    ],
  },
  'm3-l2': {
    titulo: 'De la reunión a las tareas',
    escenas: [
      A('Álvaro en la sala de reuniones', 'Las reuniones no fallan por lo que se habla. Fallan por lo que nadie anota.'),
      G('Notas desordenadas que se convierten en una tabla: qué, quién, cuándo', 'Al terminar una reunión, tus notas o la grabación pasan a una lista de tareas. Cada tarea con tres datos: qué, quién y para cuándo.'),
      G('Asistente con la transcripción pegada y la tabla de tareas resultante', 'Un asistente como ChatGPT o Claude puede sacar esa lista de una transcripción en segundos. Tú la revisas antes de compartirla.'),
      G('Pantallita: transcripción de la reunión semanal de Grano Norte', 'En la reunión semanal de Grano Norte salieron cuatro tareas que antes se perdían, como confirmar el despacho del viernes.'),
      G('Ícono de freno: compromisos con clientes', 'Un freno: ninguna fecha comprometida con un cliente sale de esa lista sin que una persona la confirme.'),
      G('La lista de tareas compartida en el grupo del equipo', 'Y la lista se comparte el mismo día, en el grupo del equipo o en el tablero. Una tarea que nadie ve es una tarea que nadie hace.'),
    ],
  },
  'm3-l3': {
    titulo: 'Checklist de entrega por tipo de trabajo',
    escenas: [
      A('Álvaro junto a cajas de despacho', 'Los errores de entrega casi nunca son por falta de ganas. Son por un paso que se olvidó.'),
      G('Lista de chequeo que se marca sola', 'Un checklist de entrega es la lista de lo que tiene que estar listo antes de decir «entregado». Uno por cada tipo de trabajo.'),
      G('Pantallita: checklist «nuevo cliente oficina» de Grano Norte', 'El de Grano Norte para un cliente de oficina incluye: molienda confirmada, dirección y horario de recepción, factura con los datos correctos y un mensaje de bienvenida.'),
      G('Persona del equipo marcando el checklist en el celular', 'El checklist lo marca quien entrega, no tú. Así sabes que está hecho sin preguntar.'),
      G('Tres checklists distintos: cliente nuevo, pedido recurrente, pedido especial', 'Si haces distintos tipos de trabajo, arma un checklist para cada uno. Un pedido recurrente no necesita lo mismo que un cliente nuevo. Empieza por el que más errores te da hoy.'),
      G('El checklist del ejercicio', 'Practica con el de Grano Norte y después arma el tuyo.'),
    ],
  },
  'm3-l4': {
    titulo: 'Estado de proyectos en una vista',
    escenas: [
      A('Álvaro frente a un tablero de notas', '¿Cuántas veces al día te preguntan «¿cómo va lo de…?». Cada pregunta es una señal de que el estado no está a la vista.'),
      G('Tres columnas: por hacer, en curso, listo', 'Un tablero simple tiene tres columnas: por hacer, en curso y listo. Cada pedido o proyecto es una tarjeta que avanza.'),
      G('Tarjeta con responsable y fecha', 'Cada tarjeta lleva quién es responsable y para cuándo. Y una regla: quien mueve el trabajo, mueve la tarjeta.'),
      G('Pantallita: tablero de pedidos de Grano Norte', 'En Grano Norte, el tablero de pedidos se revisa a las nueve y a las cinco. Camila dejó de preguntar.'),
      G('Columna «en curso» con demasiadas tarjetas, marcada en rosa', 'Una señal de alerta: si la columna «en curso» se llena, el equipo está empezando mucho y terminando poco. Antes de abrir algo nuevo, cierra lo que está andando.'),
      G('El tablero del ejercicio', 'En el ejercicio armas tu tablero y lo descargas para pasarlo a una planilla compartida.'),
    ],
  },
  'm3-l5': {
    titulo: 'El resumen del día',
    escenas: [
      A('Álvaro con un café en la mañana', 'Partir el día leyendo cuarenta mensajes es partir el día atrasado. Mejor partir con un resumen de cinco minutos.'),
      G('Tres secciones: qué llegó, qué falta, qué vence', 'El resumen del día responde tres preguntas: qué llegó desde ayer, qué falta por hacer y qué vence hoy.'),
      G('Fuentes (correo, WhatsApp, planilla) que entran a un borrador a las 8:30', 'Se prepara solo, en borrador, cada mañana: un asistente lee tu correo, tu planilla de pedidos y tu tablero, y deja el resumen listo.'),
      G('Pantallita: resumen del martes de Grano Norte', 'El martes de Grano Norte: dos pedidos nuevos, un pago por confirmar y el despacho a una oficina que vence hoy.'),
      G('Persona leyendo el resumen en cinco minutos', 'Tú lo lees en cinco minutos y decides. El asistente ordena; las decisiones siguen siendo tuyas.'),
      G('La plantilla del resumen descargándose', 'En el ejercicio eliges qué fuentes revisa tu resumen, a qué hora llega y quién lo lee. Te queda la plantilla y el prompt para dejarlo corriendo en el módulo 6.'),
    ],
  },

  // ─── Módulo 4 · Atención al cliente ──────────────────────────────────────
  'm4-l1': {
    titulo: 'Los 3 tipos de mensaje',
    escenas: [
      A('Álvaro con el celular lleno de notificaciones', 'Antes de automatizar cualquier respuesta, hay que saber qué te escriben. Y casi nadie lo sabe con números.'),
      G('Tres cajas: repetidos, con decisión, nuevos', 'Todos tus mensajes caben en tres tipos. Repetidos: precio, horario, despacho. Con decisión: un descuento, una fecha especial, un reclamo. Y nuevos: lo que nunca te habían preguntado.'),
      G('Pantallita: conteo de dos días de Grano Norte', 'Camila contó sus mensajes dos días: de cada diez, seis eran repetidos, tres necesitaban una decisión y uno era nuevo.'),
      G('Los repetidos se van a un asistente; los otros, a una persona', 'Los repetidos los puede responder un asistente con tus reglas. Los otros dos siguen pasando por una persona.'),
      G('Cálculo: 40 mensajes × 60 % × 2 minutos = 48 minutos al día', 'Haz la cuenta: si recibes cuarenta mensajes al día, seis de cada diez son repetidos y cada uno te toma dos minutos, son casi cincuenta minutos diarios respondiendo lo mismo.'),
      G('El contador del ejercicio', 'Usa el contador del ejercicio durante dos días. Ese número te dice cuánto tiempo puedes recuperar.'),
    ],
  },
  'm4-l2': {
    titulo: 'Tu asistente desde el esqueleto',
    escenas: [
      A('Álvaro explicando con una tablet', 'Un asistente que responde mal es peor que no tener asistente. La diferencia está en lo que le enseñas antes de prenderlo.'),
      G('El esqueleto se transforma en instrucciones: quién eres, cómo hablas, qué sabes, qué no', 'Partes de tu esqueleto: qué vendes, a quién, cómo hablas y tus respuestas de siempre. A eso le sumas tus reglas de freno y cuándo pasar a una persona.'),
      G('Lista de preguntas trampa con marcas de pasó y falló', 'Después lo pones a prueba con preguntas trampa: un descuento que no existe, una fecha imposible, un cliente enojado. Cada error se corrige en las instrucciones.'),
      G('Pantallita: prueba del asistente de Grano Norte', 'El asistente de Grano Norte falló una sola vez: prometió despacho el sábado. Camila agregó una línea y no volvió a pasar.'),
      G('El armador de instrucciones', 'Arma tus instrucciones en el ejercicio y pruébalas en ChatGPT o Claude antes de seguir.'),
    ],
  },
  'm4-l3': {
    titulo: 'Ponerlo en WhatsApp',
    escenas: [
      A('Álvaro con el celular, plano cercano', 'Tu asistente ya responde bien en la prueba. Ahora lo llevamos a donde te escriben tus clientes: WhatsApp.'),
      G('Siete pasos en línea: número, conexión, instrucciones, respuestas, horario, prueba, grupo chico', 'Son siete pasos y ninguno requiere programar: el número de WhatsApp Business, conectarlo al chatbot, pegar tus instrucciones, cargar tus respuestas, definir horario y derivación, probar desde otro celular y partir con un grupo chico de clientes.'),
      G('Pantalla del chatbot de WhatsApp (grabación de Fidelidapp)', 'En el curso lo mostramos con el chatbot de WhatsApp de Fidelidapp, pero la lógica es la misma en otras herramientas.'),
      G('Dos columnas: contesta solo / pasa a una persona', 'Lo más importante no es la herramienta: es decidir qué contesta solo y qué deriva.'),
      G('WhatsApp Business con respuestas rápidas', 'Y si todavía no quieres un asistente, parte con las respuestas rápidas de WhatsApp Business. También ahorra tiempo.'),
    ],
  },
  'm4-l4': {
    titulo: 'Cuándo pasa a una persona',
    escenas: [
      A('Álvaro en su escritorio', 'Un buen asistente no es el que responde todo. Es el que sabe cuándo pasarle la conversación a una persona.'),
      G('Flujo: mensaje → asistente → ¿freno? → aviso al equipo → persona', 'Cuando un mensaje toca un freno, el asistente hace tres cosas: le avisa al cliente que lo va a atender una persona, avisa a tu equipo y deja la conversación marcada.'),
      G('Reloj con el tiempo máximo de respuesta humana', 'Y defines un tiempo máximo: por ejemplo, dos horas hábiles. Si pasa ese tiempo, el aviso sube a una segunda persona.'),
      G('Pantallita: traspaso de un reclamo en Grano Norte', 'En Grano Norte, un reclamo por café molido equivocado pasa directo a Juan, de despacho, con un aviso por el grupo del equipo.'),
      G('El formulario de derivación', 'En el ejercicio defines tus disparadores, a quién se avisa y en cuánto tiempo.'),
    ],
  },
  'm4-l5': {
    titulo: 'Correo de soporte y reclamos',
    escenas: [
      A('Álvaro serio, plano medio', 'Un reclamo bien atendido puede dejarte un cliente más fiel que antes. Mal atendido, se va y lo cuenta.'),
      G('Cuatro pasos: acuse, solución, seguimiento, cierre', 'Cada reclamo pasa por cuatro pasos: acuse el mismo día, una solución concreta, un seguimiento para confirmar que se resolvió y el cierre del caso.'),
      G('Plantillas de correo con espacios para completar', 'Para cada paso tienes una plantilla. Así nadie improvisa cuando el cliente está molesto.'),
      G('Pantallita: el caso del café molido equivocado', 'En Grano Norte, el café molido equivocado se repuso al día siguiente y se cerró con un llamado de Camila.'),
      G('Ícono de freno: compensaciones', 'Las compensaciones, como una reposición o un descuento, las decide siempre una persona.'),
      G('Registro de casos con estados: abierto, en curso, cerrado', 'Y anota cada caso en un registro simple: quién reclamó, qué pasó, en qué estado está y quién lo tiene. Si un caso lleva más de dos días abierto, se revisa en la reunión.'),
      G('El registro y las plantillas del ejercicio', 'En el ejercicio ajustas tus cuatro plantillas y practicas con tu primer caso.'),
    ],
  },

  // ─── Módulo 5 · Finanzas ─────────────────────────────────────────────────
  'm5-l1': {
    titulo: 'Cobranza sin perseguir a nadie',
    escenas: [
      A('Álvaro en una cafetería', 'Perseguir pagos a fin de mes es incómodo para ti y para tu cliente. Con fechas fijas, deja de ser personal.'),
      G('Línea de tiempo: 3 días antes, el día, 5 días después, llamado', 'Tres recordatorios con tu tono: uno tres días antes del vencimiento, otro el mismo día y otro cinco días después. Si no hay respuesta, llamas.'),
      G('Pantallita: los tres mensajes de Grano Norte', 'Los mensajes de Grano Norte son cortos y amables: le recuerdan la factura, el monto y cómo pagar. Nada de amenazas.'),
      G('Calendario con los recordatorios cargados', 'Los recordatorios quedan en tu calendario o se preparan en borrador. Una persona revisa antes de enviar.'),
      G('Ícono de freno: acuerdos de pago y datos bancarios', 'Los acuerdos de pago y cualquier cambio de datos bancarios los decide siempre una persona.'),
      G('Archivo de calendario con los recordatorios de una factura', 'En el ejercicio adaptas los tres mensajes, pones la fecha de vencimiento y descargas los recordatorios para tu calendario.'),
    ],
  },
  'm5-l2': {
    titulo: 'Gastos y facturas en una planilla',
    escenas: [
      A('Álvaro con una boleta en la mano', '¿Tienes boletas en la billetera, en el auto y en el correo? No necesitas un contador más: necesitas una planilla y diez minutos.'),
      G('Ocho categorías en tarjetas', 'Empieza con pocas categorías: insumos, envases, despacho, arriendo, sueldos, servicios, marketing y otros.'),
      G('Foto de boleta → asistente extrae fecha, proveedor, monto y categoría → revisas → planilla', 'Para no digitar todo, le sacas foto a la boleta y un asistente extrae la fecha, el proveedor, el monto y la categoría. Tú revisas y lo pegas en la planilla.'),
      G('Pantallita: la planilla de gastos de octubre de Grano Norte', 'Camila descubrió que los envases le costaban casi lo mismo que el despacho. No lo sabía hasta verlo en una fila.'),
      G('Ícono de freno sobre los datos', 'Un cuidado: a un asistente le pasas la boleta, no tus claves ni los datos completos de tu cuenta bancaria.'),
      G('La planilla del ejercicio', 'En el ejercicio eliges tus categorías y descargas la planilla.'),
    ],
  },
  'm5-l3': {
    titulo: 'Tus 5 números del lunes',
    escenas: [
      A('Álvaro frente a la pantalla con datos', 'No necesitas un tablero con cincuenta indicadores. Necesitas cinco números cada lunes.'),
      G('Cinco tarjetas que aparecen: ventas, por cobrar, pagado, caja, reuniones', 'Ventas de la semana, lo que tienes por cobrar, lo que ya te pagaron, la caja disponible y las reuniones agendadas para la semana que viene.'),
      G('Reporte en borrador que se prepara solo el lunes temprano', 'El reporte se prepara en borrador cada lunes temprano con tus planillas. Tú lo lees con el primer café.'),
      G('Pantallita: el reporte del lunes de Grano Norte con flechas de subida y bajada', 'En Grano Norte, el lunes mostró que lo por cobrar subía tres semanas seguidas. Esa semana se activó la cobranza.'),
      G('Las cinco tarjetas comparadas con la semana anterior', 'El valor no está en un número suelto, sino en compararlo con la semana anterior. Si algo sube o baja dos semanas seguidas, ahí hay una decisión que tomar.'),
      G('El reporte del ejercicio', 'En el ejercicio completas tus cinco números y ves cómo queda tu primer reporte.'),
    ],
  },
  'm5-l4': {
    titulo: 'Precio y margen',
    escenas: [
      A('Álvaro con una calculadora', 'Vender más de un producto que te hace perder plata es trabajar más para ganar menos.'),
      G('Barra de precio dividida en costo directo y margen', 'El margen es lo que te queda después de los costos directos: insumos, envase, despacho y comisiones. Se calcula por producto.'),
      G('Pantallita: los tres productos de Grano Norte con su margen', 'Grano Norte calculó sus tres productos. El plan oficina, que creía el mejor, dejaba menos margen por el despacho incluido.'),
      G('Tres caminos: subir precio, bajar costo o dejar de venderlo', 'Cuando un producto deja poco margen, tienes tres caminos: subir el precio, bajar un costo o dejar de venderlo.'),
      G('Ícono de freno sobre los precios', 'Y recuerda tu freno: un cambio de precio lo decide una persona y se avisa con tiempo a los clientes que ya compran.'),
      G('La calculadora del ejercicio', 'Pon tus tres productos en la calculadora y mira cuál te está haciendo perder.'),
    ],
  },

  // ─── Módulo 6 · Tu propia infra ──────────────────────────────────────────
  'm6-l1': {
    titulo: 'Del producto hecho a lo tuyo',
    escenas: [
      A('Álvaro en su escritorio con dos monitores', 'No todo hay que construirlo. A veces una herramienta lista resuelve el ochenta por ciento en una tarde.'),
      G('Dos columnas: herramienta lista / sistema propio', 'Una herramienta lista sirve cuando tu problema es común, como responder WhatsApp o un programa de fidelización. Armar lo tuyo conviene cuando tu forma de trabajar es lo que te diferencia.'),
      G('Cinco preguntas con sí o no', 'Para decidir, responde cinco preguntas en el ejercicio: qué tan común es tu problema, cuánto cambia tu proceso, cuántas herramientas usas hoy, quién lo va a mantener y cuánto tiempo tienes.'),
      G('Pantallita: decisión de Grano Norte', 'Grano Norte usa una herramienta lista para WhatsApp y armó lo propio para su resumen del día y su reporte del lunes.'),
      A('Álvaro, plano medio', 'Lo importante es que las dos cosas lean la misma base de información. Eso es lo que armamos en la próxima lección.'),
    ],
  },
  'm6-l2': {
    titulo: 'Tu base de información',
    escenas: [
      A('Álvaro explicando con una tablet', 'Cada asistente que armaste en el curso necesita saber lo mismo: quién eres, qué vendes y qué decide una persona.'),
      G('Una carpeta que se abre en cinco subcarpetas', 'Por eso juntas todo en un solo lugar: tu esqueleto, tus reglas de freno, tus procesos, tus plantillas y tus números.'),
      G('La carpeta conectada a un proyecto en Claude o ChatGPT', 'Puede ser una carpeta compartida o un proyecto en Claude o ChatGPT. Lo importante es que haya una sola versión.'),
      G('Pantallita: la carpeta «Grano Norte · Sistema»', 'En Grano Norte, la carpeta se llama «Grano Norte · Sistema». Cuando cambia un precio, se cambia ahí y todos los asistentes lo leen.'),
      G('Archivo «LEEME» al inicio de la carpeta', 'Agrega un archivo al inicio que explique qué hay en cada carpeta y quién la actualiza. Si alguien nuevo entra al equipo, empieza por ahí.'),
      G('Checklist de documentos del curso', 'El ejercicio te muestra qué documentos ya armaste en el curso y cuáles faltan.'),
    ],
  },
  'm6-l3': {
    titulo: 'Conectar correo, calendario y planillas',
    escenas: [
      A('Álvaro serio, plano cercano', 'Conectar un asistente a tu correo es útil. Darle permiso para enviar sin revisar es un riesgo que no necesitas correr.'),
      G('Tres niveles: leer, dejar en borrador, nunca', 'Piensa en tres niveles. Lo que puede leer: correos, calendario, planillas. Lo que solo puede dejar en borrador: respuestas, eventos, recordatorios. Y lo que nunca hace: pagar, borrar o comprometer una fecha.'),
      G('Pantalla de permisos de una cuenta de Google, con permisos mínimos marcados', 'Cuando conectes una herramienta, dale el permiso mínimo. Si solo necesita leer el calendario, no le des acceso para modificarlo.'),
      G('Pantallita: la matriz de permisos de Grano Norte', 'En Grano Norte, el asistente lee pedidos y pagos, deja borradores de seguimiento y nunca toca la cuenta del banco.'),
      G('Lista de conexiones activas con una revisión mensual', 'Y una vez al mes revisa qué herramientas tienen acceso a tus cuentas. Lo que ya no usas, lo desconectas.'),
      G('El ejercicio de clasificar acciones', 'En el ejercicio clasificas diez acciones y te queda tu matriz de permisos.'),
    ],
  },
  'm6-l4': {
    titulo: 'Tus rutinas automáticas',
    escenas: [
      A('Álvaro con un café, temprano', 'Una rutina automática es una tarea que se prepara sola, a la misma hora, sin que tengas que acordarte.'),
      G('Tres rutinas en tarjetas: resumen del día, lista de prospectos, reporte del lunes', 'En el curso armaste tres: el resumen del día, la lista de prospectos y el reporte del lunes. Elige una para empezar.'),
      G('Ficha de rutina: qué, cuándo, con qué, quién revisa', 'Cada rutina tiene una ficha: qué prepara, a qué hora, qué fuentes lee, dónde deja el resultado y quién lo revisa.'),
      G('Reloj a las 8:30 y un borrador que aparece', 'Muchos asistentes ya permiten programar una tarea a una hora fija. Si el tuyo no, un recordatorio de calendario con el prompt guardado funciona igual.'),
      G('Pantallita: la rutina del resumen diario de Grano Norte', 'En Grano Norte, el resumen está listo a las ocho y media, de lunes a viernes, y Camila lo lee antes de abrir el WhatsApp.'),
    ],
  },
  'm6-l5': {
    titulo: 'Frenos y revisión semanal',
    escenas: [
      A('Álvaro en su escritorio, viernes por la tarde', 'Un sistema que nadie revisa se desordena solo. Quince minutos a la semana lo mantienen al día.'),
      G('Ciclo de tres pasos: qué hizo, qué falló, qué ajustar', 'Cada viernes respondes tres preguntas: qué hizo el sistema esta semana, qué falló y qué vas a ajustar.'),
      G('Lista de frenos con marcas de revisión', 'Y revisas tus frenos: que nada que toque plata, plazos o reclamos haya salido sin una persona.'),
      G('Pantallita: la revisión de un viernes de Grano Norte', 'En la revisión de Grano Norte apareció que el asistente respondía bien, pero tarde en la noche. Se ajustó el horario y listo.'),
      G('Tabla: falla → ajuste → dónde se escribe', 'Cada falla deja un ajuste escrito: una línea nueva en las instrucciones, un paso en un proceso o una regla de freno más. Así el sistema aprende contigo.'),
      G('El registro semanal del ejercicio', 'En el ejercicio haces tu primera revisión. Guárdala: la próxima semana compararás.'),
    ],
  },
  'm6-final': {
    titulo: 'Tu negocio en 6 semanas: antes y después',
    escenas: [
      A('Álvaro, plano medio, tono de cierre', 'Llegaste al final. Hace seis semanas todo pasaba por ti. Veamos qué cambió.'),
      G('El semáforo del módulo 0 al lado del semáforo de hoy, área por área', 'Este es tu semáforo de antes y el de hoy. Cada área que pasó de rojo a naranja, o de naranja a verde, es tiempo que recuperaste.'),
      G('El tablero de tu negocio armándose página por página', 'Tu tablero junta todo: el mapa, tus reglas de freno y, por cada área, su rutina, su plantilla y su número semanal.'),
      G('Equipo mirando el tablero impreso', 'Muéstraselo a tu equipo. Es el documento que les permite avanzar sin preguntarte todo.'),
      G('El tablero en la pantalla, guardándose como PDF', 'Guárdalo en PDF y repásalo cada viernes en tu revisión semanal. El tablero no es un documento que se archiva: es el que se usa.'),
      A('Álvaro, plano cercano', 'Y si quedó algo pendiente, lo armamos juntos. Pero lo más difícil ya lo hiciste: escribir cómo funciona tu negocio.'),
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
