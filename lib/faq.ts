/**
 * Preguntas frecuentes de la portada y de /agentes (13-nov-2026, auditoría AI SEO, arreglo 4).
 * Viven aquí, fuera de los componentes 'use client', para que la página (server) arme el FAQPage del JSON-LD con
 * EXACTAMENTE el mismo texto que se ve. Las respuestas van en el HTML (<details>), no solo al abrir.
 */
import { PRECIOS_AGENTES, uf } from '@/lib/precios';

export type Faq = { q: string; a: string };

export const FAQ_HOME: { es: Faq[]; en: Faq[] } = {
  es: [
    { q: '¿Es un chatbot?', a: 'No. Un chatbot conversa. Un agente hace tareas completas: lee, ordena, redacta y hace seguimiento, dentro de los límites que tú defines.' },
    { q: '¿Mi equipo tiene que saber programar?', a: 'No. Está pensado para equipos no técnicos. En la instalación acompañamos a cada persona hasta que usa su agente en un flujo real.' },
    { q: '¿Qué pasa con la información de mi empresa?', a: 'Cada persona tiene permisos según su rol, y el agente solo ve lo que necesita para su tarea. Lo definimos juntos en el diagnóstico.' },
    { q: '¿Cuánto cuesta?', a: `La reunión de descubrimiento es gratis. La implementación parte en ${uf(PRECIOS_AGENTES.implementacionUF)} y el mantenimiento parte en ${uf(PRECIOS_AGENTES.mantenimientoUF)} al mes. Valores exentos de IVA (factura exenta). Las licencias de Claude las contrata tu empresa aparte.` },
    { q: '¿Y si un agente no tiene sentido para mi equipo?', a: 'Te lo decimos en la primera llamada. Preferimos eso a venderte algo que no van a usar.' },
  ],
  en: [
    { q: 'Is it a chatbot?', a: 'No. A chatbot chats. An agent does complete tasks: reads, sorts, drafts and follows up, within limits you define.' },
    { q: 'Does my team need to code?', a: 'No. It’s built for non-technical teams. During setup we walk each person through until they use their agent on a real flow.' },
    { q: 'What about my company’s information?', a: 'Each person has role-based permissions, and the agent only sees what its task needs. We define it together in the diagnostic.' },
    { q: 'How much does it cost?', a: `The discovery call is free. Setup starts at ${uf(PRECIOS_AGENTES.implementacionUF)} and upkeep starts at ${uf(PRECIOS_AGENTES.mantenimientoUF)} per month (UF is Chile’s inflation-indexed unit). Prices are VAT-exempt. Claude licenses are paid separately by your company.` },
    { q: 'What if an agent doesn’t make sense for my team?', a: 'We’ll tell you on the first call. We’d rather do that than sell you something you won’t use.' },
  ],
};

export const FAQ_AGENTES: Faq[] = [
  { q: '¿Es un chatbot?', a: 'No. Un chatbot conversa. Un agente hace tareas completas: lee, ordena, redacta y hace seguimiento, dentro de los límites que tú defines.' },
  { q: '¿Mi equipo tiene que saber programar?', a: 'No. Está pensado para equipos de 3 a 15 personas sin perfil técnico. En la implementación acompaño a cada persona hasta que usa su agente en una tarea real.' },
  { q: '¿Por qué en UF?', a: 'La UF se ajusta con la inflación, así el precio se mantiene parejo en el tiempo. A noviembre de 2026, 12 UF son unos $495.000, 3 UF unos $124.000 y 6 UF unos $248.000. Son valores exentos de IVA: emitimos factura exenta.' },
  { q: '¿Qué pasa si un agente no tiene sentido para mi equipo?', a: 'Te lo digo en la reunión de descubrimiento. Prefiero eso a venderte algo que no van a usar.' },
];
