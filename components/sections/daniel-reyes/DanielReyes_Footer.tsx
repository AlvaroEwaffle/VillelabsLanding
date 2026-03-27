export default function DanielReyes_Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6">
      <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <div className="text-base font-bold text-white" style={{ fontFamily: "'Courier Prime', Courier, monospace" }}>
            SUBJETIVIDADES
          </div>
          <div className="text-[10px] font-medium text-teal-500 tracking-wider uppercase mt-0.5">
            Centro Psicología Clínica
          </div>
          <div className="text-[13px] text-slate-400 mt-1">
            Ñuñoa, Santiago de Chile | Atención online para todo Chile
          </div>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-[13px] text-slate-400 no-underline transition-colors hover:text-white">
            Privacidad
          </a>
          <a href="#" className="text-[13px] text-slate-400 no-underline transition-colors hover:text-white">
            Términos y condiciones
          </a>
        </div>
      </div>
    </footer>
  );
}
