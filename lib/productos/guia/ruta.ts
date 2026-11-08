// Ruta recomendada a partir del diagnóstico de la parte 0.
import type { Etiqueta } from './contenido-v2';

export type PasoRuta = { parte: number; etiqueta: Etiqueta; porque: string; mira: string };
export type Ruta = { pasos: PasoRuta[]; orden: number[]; consejoIA: string; esqueleto: boolean; tandas: string };

type R = Record<string, string | undefined>;

function p1(r: R): PasoRuta {
  if (r.ideal === 'escrito')
    return { parte: 1, etiqueta: 'salta', porque: 'Ya tienes tu cliente ideal por escrito y con señales.', mira: 'Si quieres, juega «¿Prospecto o no?» para comprobarlo.' };
  if (r.ideal === 'masmenos')
    return { parte: 1, etiqueta: 'revisa', porque: 'Lo tienes en la cabeza, pero no por escrito.', mira: 'Mira la infografía de las 3 preguntas y llena tu cuaderno: con eso basta.' };
  return { parte: 1, etiqueta: 'haz', porque: 'Si le escribes a cualquiera, el resto del sistema no rinde.', mira: 'Haz todo, sobre todo el cuaderno: es la base de los mensajes.' };
}

function p2(r: R): PasoRuta {
  if (r.fuentes === 'varias' && r.lista === 'aldia')
    return { parte: 2, etiqueta: 'salta', porque: 'Ya buscas en varias fuentes y tienes la lista al día.', mira: 'Solo pasa tus prospectos a la planilla de la guía para usarla en las partes 3, 5 y 6.' };
  if (r.fuentes === 'una' || r.fuentes === 'varias' || r.lista === 'desordenada')
    return { parte: 2, etiqueta: 'revisa', porque: 'Ya buscas, pero te falta ordenar o sumar fuentes tibias.', mira: 'Mira la lista de plataformas y arma tus 20 en la planilla.' };
  return { parte: 2, etiqueta: 'haz', porque: 'Sin lista no hay a quién escribirle.', mira: 'Haz todo: las plataformas, el juego y los 20 nombres en la planilla.' };
}

function p3(r: R): PasoRuta {
  if (r.lista === 'aldia' && r.seguimientos === '2+')
    return { parte: 3, etiqueta: 'revisa', porque: 'Ya trabajas con lista y seguimientos.', mira: 'Mira el insight de la tanda semanal y puntúa tus 20.' };
  return { parte: 3, etiqueta: 'haz', porque: 'Aquí está el cambio de expectativa: 20 mensajes, 1 o 2 respuestas, y repetir.', mira: 'Haz todo: el puntaje decide a quién sigues primero.' };
}

function p4(r: R): PasoRuta {
  if (r.mensaje === 'personalizado')
    return { parte: 4, etiqueta: 'revisa', porque: 'Ya adaptas tus mensajes.', mira: 'Juega «Encuentra el error» y guarda tu plantilla en el cuaderno.' };
  return { parte: 4, etiqueta: 'haz', porque: r.mensaje === 'generico' ? 'Un mensaje igual para todos se nota y no se responde.' : 'Escribir primero es lo que abre las conversaciones.', mira: 'Haz todo: «Así no / Así sí», el video y el juego.' };
}

function p5(r: R): PasoRuta {
  if (r.seguimientos === '2+')
    return { parte: 5, etiqueta: 'revisa', porque: 'Ya haces seguimiento con fecha.', mira: 'Mira el calendario y deja la fecha exacta en cada fila de la planilla.' };
  return { parte: 5, etiqueta: 'haz', porque: 'La mayoría de las ventas se activa después del segundo contacto.', mira: 'Haz todo: los 3 seguimientos y el calendario.' };
}

function p6(r: R): PasoRuta {
  if (r.tiempo === 'fijo')
    return { parte: 6, etiqueta: 'revisa', porque: 'Ya tienes un rato fijo para prospectar.', mira: 'Ajusta tu rutina a los 4 tramos y haz la prueba real de 5 días.' };
  return { parte: 6, etiqueta: 'haz', porque: 'Sin una hora fija, todo lo anterior se cae la segunda semana.', mira: 'Haz todo y no te saltes la prueba real de 5 días.' };
}

export function calcularRuta(r: R): Ruta {
  const pasos = [p1(r), p2(r), p3(r), p4(r), p5(r), p6(r)];
  // Orden: las que hay que hacer y revisar en su secuencia natural; las que puedes saltar, al final.
  const orden = [
    ...pasos.filter((p) => p.etiqueta !== 'salta').map((p) => p.parte),
    ...pasos.filter((p) => p.etiqueta === 'salta').map((p) => p.parte),
  ];
  const consejoIA =
    r.ia === 'agente'
      ? 'Tienes un agente configurado: pásale cada bloque «Pásale esto a tu agente» y guarda lo que te devuelva en tu carpeta.'
      : r.ia === 'prompts'
        ? 'Ya guardas prompts: suma los 6 de esta guía a tu colección.'
        : r.ia === 'sueltas'
          ? 'Pasas de preguntas sueltas a instrucciones completas: copia cada bloque tal cual y completa los [corchetes].'
          : 'No necesitas saber de IA: copia cada bloque en Claude o ChatGPT, completa los [corchetes] y listo.';
  const tandas =
    r.meta === '6+'
      ? 'Para más de 5 clientes al mes, apunta a 2 tandas de 20 por semana.'
      : r.meta === '3-5'
        ? 'Para 3 a 5 clientes al mes, apunta a una tanda de 20 cada semana, sin saltarte ninguna.'
        : 'Para 1 o 2 clientes al mes, una tanda de 20 por semana te sobra.';
  return { pasos, orden, consejoIA, esqueleto: r.esqueleto === 'si', tandas };
}
