// Primera pantalla de /curso · cambio de base «oferta en clave agente» (14-nov-2026, propuesta del experimentador por
// dirección de Álvaro, nota de voz 20:02: «que hable de agentes… construye tu primer agente… entiende cómo funciona, define
// sus metas, sus procesos, sus frenos… la teoría está bien, hay que empaquetarla mejor»). Común a A y B de EXP-16.
// Reemplaza a PROMESA_EXP15 (la B de EXP-15, fija desde el 14-nov): solo cambia el empaque, el contenido del curso es el mismo.
// Por qué: el anuncio que más trae (X14, utm_content=x14-chat-vs-agente) pregunta «¿chatear con ChatGPT o tener un agente?» y
// la página respondía «planilla»; 65 visitas pagadas el 14-nov, casi todas se fueron en ~4 s.
// Marco: la planilla = la memoria del agente; las reglas de freno = sus límites; el diagnóstico = por dónde partir; el tablero =
// dónde ves cómo va tu negocio. Todo sale de curso.ts (módulo 0 y módulo 7, SISTEMA_AGENTE, PROMESA_AGENTE) y de prueba.md.
// Regla de verdad: el agente PREPARA (la fila del pedido desde un WhatsApp y la cobranza del lunes) y la persona revisa y envía.
// Nada de «automatiza», «trabaja solo», «24/7», «se conecta a tu WhatsApp», «actualiza tu planilla solo», «hace todo».
// Titular descartado: «Tu primer agente trabajando en tu negocio en una semana». La semana de la prueba real del módulo 7 es la
// semana de USO del agente, después de armar la planilla (módulos 0 a 6, 7 a 8 h de práctica, «en una semana o en un mes»).
// 14-nov 20:09 (Álvaro, nota de voz): aprueba el reempaque, le gusta «tu primer agente trabajando para ti», quiere horas y que
// se note el ángulo de frenos y borradores («le va a enseñar a delegarle tareas poco a poco»). Titular final: ese.
// Horas que se pueden afirmar (curso.ts DURACION_CURSO y ~/.claude/marca-alvaro/curso/modulo-7/modulo-7.md):
//   · «Menos de 2 horas de lecciones»: VERDAD (cerca de 1 h 45 medidas: video ffprobe + lectura).
//   · «Tu primer agente en 4 horas»: NO se sostiene. El agente necesita la planilla con Productos, Pedidos y Cobranza.
//     Ruta más corta = m0 + m3 + m5 + m7: lecciones 11+14+11+9 = 45 min; práctica 25–35 + 55–65 + 60–75 + 60–77 = 200–252 min;
//     total ≈ 4 h 05 a 4 h 57, y esa ruta deja fuera Clientes (m1) y el Tablero (m6), que el marco del agente usa. La ruta mínima
//     de la auditoría del 12-nov (m0+m1+m3+m5+m6, 3 a 4 h de práctica) + m7 (~1 h) + lecciones (~1 h) ≈ 5 a 6 h. Curso completo:
//     menos de 2 h de lecciones + 7 a 8 h de práctica. Todo es criterio, sin medición con alumnos.
//   · «Cerca de una hora para armar el agente» (módulo 7: 60 a 77 min de práctica, criterio de modulo-7.md): verdad, pero no va
//     en el hero: junto a «menos de 2 horas» suma ~3 h y esconde las 7 a 8 h de práctica. Puede ir más abajo, en el módulo 7.

// 15-nov-2026 · mensaje «en lenguaje de dueño» (~/.claude/marca-alvaro/planes/mensaje-dueno-2026-11-15.md, opción 1, hero 2.1).
// OK de Álvaro por WhatsApp (15-nov 01:53: «Delega me parece bien», «Si dale ok a todo») y garantía confirmada en el chat.
// Por qué «asistente» y «con tus reglas»: el dueño que le teme a la IA teme perder el control; «con tus reglas» le dice que él
// manda, y «asistente» es palabra que ya conoce («agente» queda en segundo nivel: las piezas, el módulo 7). Nunca «automatiza».
// «Unas 2 horas de trabajo guiado»: solo vale porque desde este deploy el camino recomendado va del módulo 0 al módulo 7
// (ORDEN_RECOMENDADO en curso.ts): 20 min de lecciones + 75 a 101 min de práctica (criterio, sin medir con alumnos; la nota
// «Tiempos estimados por nosotros…» va bajo el formulario). Si ese camino se deshace, esta frase sale.
// «Lo armas en Claude» no se quita: el agente solo está probado en un proyecto de Claude con cuenta pagada (PROMESA_AGENTE).
// El antetítulo deja de repetir la pregunta del anuncio X14 (decisión del coordinador, 15-nov).
export const HERO_CURSO = {
  antetitulo: '¿Ya conversas con ChatGPT o Claude? Este es el paso siguiente.',
  titulo: 'Tu primer asistente de IA, con tus reglas',
  bajada:
    'En unas 2 horas de trabajo guiado lo armas en Claude, sin programar. Con tu planilla como memoria, te prepara pedidos y la cobranza del lunes; tú revisas y envías.',
  /** Tercera frase de la bajada de la propuesta: baja bajo el botón para que el botón quepa en 360×560 (QA 15-nov: quedaba
   * en 515–563 px). Corrección prevista en mensaje-dueno §4, falla 4. */
  despues: 'Después le enseñas cada área de tu negocio, a tu ritmo.',
  /** Garantía (Hotmart 8921667: plazo de reembolso 7 días, verificado en pantalla el 15-nov) y requisito, en la línea de compra. */
  garantia: 'Tienes 7 días para pedir la devolución desde Hotmart si el curso no es para ti.',
  requisito: 'Tu asistente se arma en Claude, con cuenta pagada y desde el computador.',
  /** Letra chica bajo el formulario: las horas son criterio del curso, no medición. */
  notaTiempos: 'Tiempos estimados por nosotros, todavía sin medir con alumnos.',
  /** Línea de confianza (pedido de Álvaro 20:09: muchos dueños le tienen miedo a la IA). */
  // Texto exacto del revisor adversario (14-nov): «apruebas» y «delegando de a poco» prometían más de lo que hace el módulo 7.
  confianza: 'Parte con frenos y 2 tareas, y solo te prepara borradores cuando se lo pides: tú revisas y envías cada uno.',
  /** Las piezas del agente. CRM y ERP siguen como palabras clave dentro de «Memoria». */
  piezasEtiqueta: 'Las piezas de tu agente',
  piezas: [
    { clave: 'Memoria', texto: 'tu planilla, tu CRM y ERP' },
    { clave: 'Frenos', texto: 'lo que siempre decides tú' },
    { clave: 'Diagnóstico', texto: 'por dónde partir' },
    { clave: 'Tablero', texto: 'cómo va tu negocio' },
  ],
} as const;
