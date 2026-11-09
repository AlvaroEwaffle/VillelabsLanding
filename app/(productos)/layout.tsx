// Layout de los productos digitales (guía, diapositivas, módulos del curso):
// sin la navegación del sitio, para que se sientan como producto y no como landing.
export default function ProductosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-[#0f172a] text-slate-100">{children}</div>;
}
