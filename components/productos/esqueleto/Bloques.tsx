'use client';

import { useState } from 'react';
import { Check, ChevronDown, Plus, Trash2, X } from 'lucide-react';
import {
  CANALES,
  CASOS_DERIVACION,
  CASOS_EJEMPLO,
  EJEMPLO,
  EJEMPLOS_RUBRO,
  FAQS_EJEMPLO,
  IDEAL_FAQS,
  JUEGO_FRENO,
  MAX_PRODUCTOS,
  MIN_FAQS,
  PRODUCTOS_EJEMPLO,
  REGLAS_EJEMPLO,
  REGLAS_FRENO,
  SUGERENCIAS_FAQ,
  productoVacio,
  tieneDetalleOpcional,
  type Esqueleto,
  type Producto,
} from '@/lib/productos/esqueleto/datos';
import { faqsCompletas } from '@/lib/productos/esqueleto/estructura';
import { Campo, Grupo, Opcion, VerEjemplo, botonSecundario, claseInput } from './ui';

export interface PasoProps {
  esqueleto: Esqueleto;
  cambiar: (parcial: Partial<Esqueleto>) => void;
}

const alternar = (lista: string[], id: string) => (lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]);

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
      <h2 className="font-serif text-xl text-white">{titulo}</h2>
      {children}
    </section>
  );
}

function FilaProducto({
  p,
  i,
  total,
  actualizar,
  quitar,
}: {
  p: Producto;
  i: number;
  total: number;
  actualizar: (p: Producto) => void;
  quitar: () => void;
}) {
  const sinPrecio = !p.precio.trim();
  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">Producto {i + 1}</span>
        {total > 1 ? (
          <button
            type="button"
            onClick={quitar}
            aria-label={`Quitar producto ${i + 1}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <div className="mt-2 grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr]">
        <input aria-label={`Nombre del producto ${i + 1}`} placeholder="Nombre" value={p.nombre} onChange={(e) => actualizar({ ...p, nombre: e.target.value })} className={claseInput} />
        <input
          aria-label={`Precio o rango del producto ${i + 1}`}
          placeholder={p.cotizar ? 'Precio a cotizar' : 'Precio o rango'}
          value={p.precio}
          onChange={(e) => actualizar({ ...p, precio: e.target.value, cotizar: e.target.value.trim() ? false : p.cotizar })}
          className={claseInput}
        />
        <input aria-label={`Para quién es el producto ${i + 1}`} placeholder="Para quién es" value={p.paraQuien} onChange={(e) => actualizar({ ...p, paraQuien: e.target.value })} className={claseInput} />
      </div>
      {sinPrecio && p.nombre.trim() ? (
        <div className="mt-3">
          <Opcion activa={p.cotizar} onClick={() => actualizar({ ...p, cotizar: !p.cotizar })}>
            Precio a cotizar
          </Opcion>
          {p.cotizar ? <p className="mt-2 text-sm text-slate-400">Tu asistente dirá que el precio lo confirma una persona.</p> : null}
        </div>
      ) : null}
    </li>
  );
}


// ---------- Paso 1 · Tu negocio ----------
// Análisis UX «Rodrigo» (8-nov-2026): en el celular eran ~15 campos con la etiqueta «5 min». Quedan 5 esenciales a la
// vista (negocio, qué haces y para quién, productos con precio, horario, tuteo o usted) y el resto plegado. Los chips
// de rubro precargan un ejemplo editable.
export function Paso1({ esqueleto, cambiar }: PasoProps) {
  const setProducto = (i: number, p: Producto) => cambiar({ productos: esqueleto.productos.map((x, j) => (j === i ? p : x)) });
  const [detalle, setDetalle] = useState(() => tieneDetalleOpcional(esqueleto));
  const [cargado, setCargado] = useState<string | null>(null);

  const cargarRubro = (id: string) => {
    const ej = EJEMPLOS_RUBRO.find((x) => x.id === id);
    if (!ej) return;
    const d = ej.datos;
    const vacio = (v: string) => !v.trim();
    const sinProductos = esqueleto.productos.every((p) => !p.nombre.trim() && !p.precio.trim());
    cambiar({
      rubro: vacio(esqueleto.rubro) ? d.rubro : esqueleto.rubro,
      queHaces: vacio(esqueleto.queHaces) ? d.queHaces : esqueleto.queHaces,
      productos: sinProductos ? d.productos.map((x) => ({ ...x })) : esqueleto.productos,
      horario: vacio(esqueleto.horario) ? d.horario : esqueleto.horario,
      trato: esqueleto.trato || d.trato,
      canales: esqueleto.canales.length ? esqueleto.canales : [...d.canales],
      comoSeCompra: vacio(esqueleto.comoSeCompra) ? d.comoSeCompra : esqueleto.comoSeCompra,
      noVendes: vacio(esqueleto.noVendes) ? d.noVendes : esqueleto.noVendes,
      tiposCliente: vacio(esqueleto.tiposCliente) ? d.tiposCliente : esqueleto.tiposCliente,
      emojis: esqueleto.emojis || d.emojis,
      palabras: vacio(esqueleto.palabras) ? d.palabras : esqueleto.palabras,
    });
    setCargado(ej.etiqueta);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-base font-medium text-white">¿Qué tipo de negocio tienes?</p>
        <p className="mt-1 text-sm text-slate-400">Toca uno y te cargamos un ejemplo para que lo cambies por tus datos. Es opcional.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {EJEMPLOS_RUBRO.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => cargarRubro(r.id)}
              className="inline-flex min-h-[44px] items-center rounded-full border border-[#5fb2dd]/40 px-4 text-sm text-[#5fb2dd] hover:bg-[#5fb2dd]/10"
            >
              {r.etiqueta}
            </button>
          ))}
        </div>
        {cargado ? (
          <p className="mt-3 rounded-xl border border-[#5fb2dd]/30 bg-[#5fb2dd]/[0.07] px-4 py-3 text-sm text-slate-100" aria-live="polite">
            Cargamos un ejemplo de {cargado.toLowerCase()} en los campos que estaban vacíos. Cambia los precios y los datos por los tuyos.
          </p>
        ) : null}
      </div>

      <Seccion titulo="Lo esencial">
        <Campo etiqueta="Nombre del negocio" valor={esqueleto.negocio} onChange={(negocio) => cambiar({ negocio })} ejemplo={EJEMPLO.negocio} />
        <Campo
          etiqueta="En una frase: ¿qué vendes y a quién?"
          valor={esqueleto.queHaces}
          onChange={(queHaces) => cambiar({ queHaces })}
          ejemplo={`«${EJEMPLO.queHaces}»`}
          multilinea
          filas={2}
        />
        <div>
          <div className="flex flex-wrap items-center justify-between gap-x-3">
            <p className="py-2 text-base font-medium text-white">Tus 3 productos o servicios principales, con precio</p>
            <VerEjemplo
              id="ej-productos"
              ejemplo={
                <ul className="space-y-1">
                  {PRODUCTOS_EJEMPLO.map((p) => (
                    <li key={p.nombre}>
                      {p.nombre}: {p.precio} · para {p.paraQuien.toLowerCase()}
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
          <p className="mb-3 text-sm text-slate-400">Nombre, precio o rango, y para quién es. Sin precio, marca «Precio a cotizar».</p>
          <ul className="space-y-3">
            {esqueleto.productos.map((p, i) => (
              <FilaProducto
                key={i}
                p={p}
                i={i}
                total={esqueleto.productos.length}
                actualizar={(np) => setProducto(i, np)}
                quitar={() => cambiar({ productos: esqueleto.productos.filter((_, j) => j !== i) })}
              />
            ))}
          </ul>
          {esqueleto.productos.length < MAX_PRODUCTOS ? (
            <button type="button" onClick={() => cambiar({ productos: [...esqueleto.productos, productoVacio()] })} className={`${botonSecundario} mt-3`}>
              <Plus className="h-4 w-4" /> otro producto
            </button>
          ) : null}
        </div>
        <Campo etiqueta="Horario de atención" valor={esqueleto.horario} onChange={(horario) => cambiar({ horario })} ejemplo={EJEMPLO.horario} />
        <Grupo titulo="¿Tuteo o usted?" ejemplo="Tuteo">
          <Opcion rol="radio" activa={esqueleto.trato === 'tuteo'} onClick={() => cambiar({ trato: 'tuteo' })}>
            Tuteo
          </Opcion>
          <Opcion rol="radio" activa={esqueleto.trato === 'usted'} onClick={() => cambiar({ trato: 'usted' })}>
            Usted
          </Opcion>
        </Grupo>
      </Seccion>

      <div>
        <button
          type="button"
          onClick={() => setDetalle(!detalle)}
          aria-expanded={detalle}
          aria-controls="paso1-detalle"
          className="flex min-h-[52px] w-full items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.03] px-4 text-left text-base text-white hover:border-[#5fb2dd]"
        >
          <span>
            Agregar más detalle <span className="text-slate-400">(opcional)</span>
          </span>
          <ChevronDown className={`h-5 w-5 shrink-0 text-[#5fb2dd] transition-transform ${detalle ? 'rotate-180' : ''}`} aria-hidden />
        </button>
        {detalle ? (
          <div id="paso1-detalle" className="mt-4 space-y-6">
            <Seccion titulo="Dónde y por dónde atiendes">
              <div className="grid gap-5 sm:grid-cols-2">
                <Campo etiqueta="Rubro" valor={esqueleto.rubro} onChange={(rubro) => cambiar({ rubro })} ejemplo={EJEMPLO.rubro} placeholder="Ej.: pastelería, mantención" />
                <Campo etiqueta="Ciudad o zona" valor={esqueleto.zona} onChange={(zona) => cambiar({ zona })} ejemplo={EJEMPLO.zona} />
              </div>
              <Grupo titulo="Canales de atención" ejemplo={EJEMPLO.canales}>
                {CANALES.map((c) => (
                  <Opcion key={c} activa={esqueleto.canales.includes(c)} onClick={() => cambiar({ canales: alternar(esqueleto.canales, c) })}>
                    {c}
                  </Opcion>
                ))}
              </Grupo>
            </Seccion>
            <Seccion titulo="Cómo se compra">
              <Campo
                etiqueta="¿Cómo se compra?"
                ayuda="Pedido mínimo, despacho, plazos, medios de pago."
                valor={esqueleto.comoSeCompra}
                onChange={(comoSeCompra) => cambiar({ comoSeCompra })}
                ejemplo={EJEMPLO.comoSeCompra}
                multilinea
                filas={2}
              />
              <Campo
                etiqueta="Lo que NO vendes"
                ayuda="Así tu asistente no promete lo que no tienes."
                valor={esqueleto.noVendes}
                onChange={(noVendes) => cambiar({ noVendes })}
                ejemplo={`«${EJEMPLO.noVendes}»`}
                multilinea
                filas={2}
              />
            </Seccion>
            <Seccion titulo="Quién te compra y cómo le hablas">
              <Campo
                etiqueta="Tus 2 o 3 tipos de cliente y qué buscan"
                valor={esqueleto.tiposCliente}
                onChange={(tiposCliente) => cambiar({ tiposCliente })}
                ejemplo={EJEMPLO.tiposCliente}
                multilinea
                filas={3}
              />
              <Grupo titulo="¿Emojis?" ejemplo="Sí, uno como máximo">
                <Opcion rol="radio" activa={esqueleto.emojis === 'si'} onClick={() => cambiar({ emojis: 'si' })}>
                  Sí
                </Opcion>
                <Opcion rol="radio" activa={esqueleto.emojis === 'no'} onClick={() => cambiar({ emojis: 'no' })}>
                  No
                </Opcion>
              </Grupo>
              <Campo
                etiqueta="3 palabras que describen tu trato"
                valor={esqueleto.palabras}
                onChange={(palabras) => cambiar({ palabras })}
                ejemplo={EJEMPLO.tono}
                placeholder="Ej.: cercano, rápido, claro"
              />
            </Seccion>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ---------- Paso 2 · Las preguntas de siempre ----------
export function Paso2({ esqueleto, cambiar }: PasoProps) {
  const [rubro, setRubro] = useState(0);
  const listas = faqsCompletas(esqueleto).length;
  const yaEsta = (q: string) => esqueleto.faqs.some((f) => f.pregunta.trim().toLowerCase() === q.toLowerCase());
  const setFaq = (i: number, campo: 'pregunta' | 'respuesta', v: string) =>
    cambiar({ faqs: esqueleto.faqs.map((f, j) => (j === i ? { ...f, [campo]: v } : f)) });

  return (
    <div className="space-y-6">
      <div
        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
          listas >= MIN_FAQS ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300' : 'border-white/10 bg-white/[0.03] text-slate-300'
        }`}
        aria-live="polite"
      >
        {listas >= MIN_FAQS ? <Check className="h-5 w-5 shrink-0" /> : null}
        <p className="text-sm">
          <strong className="text-lg">
            {listas} de {MIN_FAQS}
          </strong>{' '}
          preguntas con respuesta. {listas >= MIN_FAQS ? `¡Listo! Ideal llegar a ${IDEAL_FAQS}.` : `Mínimo ${MIN_FAQS}, ideal ${IDEAL_FAQS}.`}
        </p>
      </div>

      <div>
        <p className="text-base font-medium text-white">Sugerencias: tócalas para agregarlas</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Rubros">
          {SUGERENCIAS_FAQ.map((s, i) => (
            <button
              key={s.rubro}
              type="button"
              role="tab"
              aria-selected={rubro === i}
              onClick={() => setRubro(i)}
              className={`min-h-[44px] shrink-0 rounded-full px-4 text-sm ${rubro === i ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {s.rubro}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGERENCIAS_FAQ[rubro].preguntas.map((q) => {
            const esta = yaEsta(q);
            return (
              <button
                key={q}
                type="button"
                disabled={esta}
                onClick={() => cambiar({ faqs: [...esqueleto.faqs, { pregunta: q, respuesta: '' }] })}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#5fb2dd]/40 px-4 text-sm text-[#5fb2dd] hover:bg-[#5fb2dd]/10 disabled:border-white/10 disabled:text-slate-500"
              >
                {esta ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {q}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-x-3">
          <p className="py-2 text-base font-medium text-white">Tus preguntas, cada una con tu respuesta corta</p>
          <VerEjemplo
            id="ej-faq"
            ejemplo={
              <ul className="space-y-1">
                {FAQS_EJEMPLO.map((f) => (
                  <li key={f.pregunta}>
                    {f.pregunta} → {f.respuesta}
                  </li>
                ))}
              </ul>
            }
          />
        </div>
        <ul className="space-y-3">
          {esqueleto.faqs.map((f, i) => (
            <li key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2">
                <input
                  aria-label={`Pregunta ${i + 1}`}
                  placeholder="Pregunta"
                  value={f.pregunta}
                  onChange={(e) => setFaq(i, 'pregunta', e.target.value)}
                  className={claseInput}
                />
                <button
                  type="button"
                  onClick={() => cambiar({ faqs: esqueleto.faqs.filter((_, j) => j !== i) })}
                  aria-label={`Quitar pregunta ${i + 1}`}
                  className="inline-flex h-12 w-11 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <textarea
                aria-label={`Respuesta a la pregunta ${i + 1}`}
                placeholder="Tu respuesta corta"
                rows={2}
                value={f.respuesta}
                onChange={(e) => setFaq(i, 'respuesta', e.target.value)}
                className={`${claseInput} mt-2`}
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => cambiar({ faqs: [...esqueleto.faqs, { pregunta: '', respuesta: '' }] })} className={`${botonSecundario} mt-3`}>
          <Plus className="h-4 w-4" /> otra pregunta
        </button>
      </div>
    </div>
  );
}

// ---------- Paso 3 · Lo que nunca debe prometer ----------
function JuegoFreno() {
  const [marcadas, setMarcadas] = useState<number[]>([]);
  const [revisado, setRevisado] = useState(false);
  const aciertos = JUEGO_FRENO.filter((r, i) => (r.rompe !== null) === marcadas.includes(i)).length;

  return (
    <div className="rounded-2xl border border-[#5fb2dd]/30 bg-[#5fb2dd]/[0.05] p-4 sm:p-5">
      <p className="text-xs uppercase tracking-wider text-[#5fb2dd]">Mini juego · 30 segundos</p>
      <p className="mt-1 text-base text-white">Estas son 4 respuestas de un asistente. Marca las que rompen una regla.</p>
      <ul className="mt-4 space-y-2">
        {JUEGO_FRENO.map((r, i) => {
          const marcada = marcadas.includes(i);
          const bien = (r.rompe !== null) === marcada;
          return (
            <li key={r.texto}>
              <button
                type="button"
                role="checkbox"
                aria-checked={marcada}
                onClick={() => {
                  setMarcadas((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i]));
                  setRevisado(false);
                }}
                className={`flex min-h-[44px] w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                  marcada ? 'border-[#5fb2dd] bg-[#2175a1]/25 text-white' : 'border-white/15 bg-[#0f172a]/60 text-slate-200 hover:border-white/30'
                }`}
              >
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${marcada ? 'border-[#5fb2dd] bg-[#2175a1]' : 'border-white/30'}`}>
                  {marcada ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
                <span>«{r.texto}»</span>
              </button>
              {revisado ? (
                <p className={`mt-1 px-1 text-sm ${bien ? 'text-emerald-300' : 'text-orange-300'}`}>
                  {bien ? '✓ ' : '✗ '}
                  {r.explicacion}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setRevisado(true)} className={botonSecundario}>
          Revisar mis respuestas
        </button>
        {revisado ? (
          <p className="text-sm text-slate-300" aria-live="polite">
            {aciertos === JUEGO_FRENO.length ? '¡Perfecto! Así se ve un asistente con frenos.' : `${aciertos} de ${JUEGO_FRENO.length} bien.`}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function Paso3({ esqueleto, cambiar }: PasoProps) {
  const ejemplo = REGLAS_FRENO.filter((r) => REGLAS_EJEMPLO.includes(r.id))
    .map((r) => r.etiqueta)
    .join(' · ');
  return (
    <div className="space-y-6">
      <Grupo titulo="Tu asistente nunca debe prometer…" ejemplo={ejemplo}>
        {REGLAS_FRENO.map((r) => (
          <Opcion key={r.id} activa={esqueleto.reglas.includes(r.id)} onClick={() => cambiar({ reglas: alternar(esqueleto.reglas, r.id) })}>
            {r.etiqueta}
          </Opcion>
        ))}
      </Grupo>
      <Campo
        etiqueta="Otra cosa que solo decides tú"
        valor={esqueleto.otraRegla}
        onChange={(otraRegla) => cambiar({ otraRegla })}
        ejemplo={EJEMPLO.otraRegla}
        multilinea
        filas={2}
      />
      <JuegoFreno />
    </div>
  );
}

// ---------- Paso 4 · Cuándo pasa a una persona ----------
export function Paso4({ esqueleto, cambiar }: PasoProps) {
  const ejemplo = CASOS_DERIVACION.filter((c) => CASOS_EJEMPLO.includes(c.id))
    .map((c) => c.etiqueta)
    .join(' · ');
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo etiqueta="¿A quién derivar?" valor={esqueleto.derivaNombre} onChange={(derivaNombre) => cambiar({ derivaNombre })} ejemplo={EJEMPLO.derivaNombre} placeholder="Nombre" />
        <Campo etiqueta="¿Por qué canal?" valor={esqueleto.derivaCanal} onChange={(derivaCanal) => cambiar({ derivaCanal })} ejemplo={EJEMPLO.derivaCanal} placeholder="WhatsApp, correo, teléfono…" />
      </div>
      <Grupo titulo="¿En qué casos?" ejemplo={ejemplo}>
        {CASOS_DERIVACION.map((c) => (
          <Opcion key={c.id} activa={esqueleto.derivaCasos.includes(c.id)} onClick={() => cambiar({ derivaCasos: alternar(esqueleto.derivaCasos, c.id) })}>
            {c.etiqueta}
          </Opcion>
        ))}
      </Grupo>
      <Campo
        etiqueta="Frase de derivación, con tu tono"
        valor={esqueleto.fraseDerivacion}
        onChange={(fraseDerivacion) => cambiar({ fraseDerivacion })}
        ejemplo={`«${EJEMPLO.fraseDerivacion}»`}
        multilinea
        filas={2}
      />
    </div>
  );
}

export const PASOS_UI = [Paso1, Paso2, Paso3, Paso4];
