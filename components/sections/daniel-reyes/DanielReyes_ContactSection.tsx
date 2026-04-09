'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '56920115198';
const WHATSAPP_MSG = 'Hola, me gustaría agendar una consulta en el centro de psicología clínica.';
const BOOKING_URL = '#'; // Placeholder — replace with actual booking link

interface FormData {
  name: string;
  email: string;
  phone: string;
  consultationType: string;
  message: string;
}

export default function DanielReyes_ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // POST to Fidelidapp contact API
      await fetch('https://fidelidapp.cl/auth/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      // Silently handle — in production, show error toast
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-teal-600 opacity-[0.06]" />
      <div className="absolute -bottom-[150px] -left-[100px] w-[400px] h-[400px] rounded-full bg-teal-500 opacity-[0.04]" />

      <div className="max-w-[1140px] mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="text-[13px] font-semibold text-teal-500 tracking-widest uppercase mb-3.5">
            Contacto
          </div>
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-bold text-white leading-tight tracking-tight max-w-[600px] mx-auto">
            El primer paso es el más difícil.<br />Pero no tienes que darlo solo.
          </h2>
          <p className="text-base text-white/60 mt-3.5 max-w-[580px] mx-auto leading-relaxed mb-10">
            Agenda tu primera consulta o déjanos tus datos. Te contactamos dentro de 2 horas en día hábil.
          </p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex gap-4 justify-center flex-wrap mb-12"
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-800 rounded-[9px] font-bold transition-all hover:-translate-y-px hover:shadow-lg"
          >
            <Calendar className="w-5 h-5" />
            Agendar una consulta
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-[9px] font-semibold transition-all hover:bg-[#1fb855]"
          >
            <MessageCircle className="w-5 h-5" />
            Escribir por WhatsApp
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-[480px] mx-auto bg-white rounded-[14px] p-9 text-left"
        >
          {submitted ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Consulta enviada</h3>
              <p className="text-sm text-slate-500">Te contactaremos dentro de 2 horas en día hábil.</p>
            </div>
          ) : (
            <>
              <div className="text-xl font-bold text-slate-900 mb-1">Formulario de contacto</div>
              <div className="text-sm text-slate-400 mb-6">Te respondemos dentro de 2 horas en día hábil.</div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nombre completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-3 border-[1.5px] border-slate-200 rounded-lg text-[15px] text-slate-800 bg-white transition-all focus:outline-none focus:border-teal-600 focus:ring-[3px] focus:ring-teal-600/10"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-3 border-[1.5px] border-slate-200 rounded-lg text-[15px] text-slate-800 bg-white transition-all focus:outline-none focus:border-teal-600 focus:ring-[3px] focus:ring-teal-600/10"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Teléfono (opcional)</label>
                  <input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-3 border-[1.5px] border-slate-200 rounded-lg text-[15px] text-slate-800 bg-white transition-all focus:outline-none focus:border-teal-600 focus:ring-[3px] focus:ring-teal-600/10"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tipo de consulta</label>
                  <select
                    value={formData.consultationType}
                    onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                    className="w-full px-3.5 py-3 border-[1.5px] border-slate-200 rounded-lg text-[15px] text-slate-800 bg-white transition-all focus:outline-none focus:border-teal-600 focus:ring-[3px] focus:ring-teal-600/10"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="individual">Terapia individual</option>
                    <option value="pareja">Terapia de pareja</option>
                    <option value="sexual">Terapia sexual</option>
                    <option value="no-seguro">No estoy seguro/a</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Mensaje (opcional)</label>
                  <textarea
                    placeholder="Cuéntanos brevemente qué te motiva a buscar ayuda..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-3 border-[1.5px] border-slate-200 rounded-lg text-[15px] text-slate-800 bg-white transition-all focus:outline-none focus:border-teal-600 focus:ring-[3px] focus:ring-teal-600/10 resize-y min-h-[80px]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-teal-600 text-white rounded-[9px] text-[15px] font-semibold transition-colors hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
