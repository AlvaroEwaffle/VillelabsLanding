import Image from 'next/image';
import { FOTOS } from '@/lib/productos/fotos';
import { APOYO, type ApoyoId } from '@/lib/productos/apoyo';

// Imágenes de /esqueleto: una por pantalla. Regla 20/80 (8-nov-2026): Álvaro solo donde habla él
// (portada y «¿a quién le mando…?»); el resto, apoyo ligado al contenido (lib/productos/apoyo.ts).
export type FotoId = keyof typeof FOTOS | ApoyoId;
const datosDe = (id: FotoId) => (id in APOYO ? APOYO[id as ApoyoId] : FOTOS[id as keyof typeof FOTOS]);

// Encuadre por foto para que la cara quede dentro del recorte apaisado.
const ENCUADRE: Partial<Record<FotoId, string>> = {
  cafe: 'center 22%',
  cafeCerca: 'center 18%',
  analista: 'center 18%',
  explicando: 'center 20%',
  oficina: 'center 30%',
  podcaster: 'center 22%',
  podcasterCerca: 'center 30%',
  casual: 'center 15%',
  retrato: 'center 20%',
  trabajando: 'center 25%',
  ciudad: 'center 30%',
  escenaBodega: 'center 38%',
  escenaDespacho: 'center 38%',
  escenaNoche: 'center 38%',
  escenaCalendario: 'center 38%',
};

/** Foto de apoyo apaisada (banner) con esquinas redondeadas. */
export function FotoApoyo({
  foto,
  alto = 'h-44 sm:h-60',
  prioridad = false,
  className = '',
}: {
  foto: FotoId;
  alto?: string;
  prioridad?: boolean;
  className?: string;
}) {
  const f = datosDe(foto);
  return (
    <div className={`relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#131c31] ${alto} ${className}`}>
      <Image
        src={f.src}
        alt={f.alt}
        fill
        priority={prioridad}
        sizes="(min-width: 768px) 720px, 100vw"
        className="object-cover"
        style={{ objectPosition: ENCUADRE[foto] ?? 'center 25%' }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f172a]/55 via-transparent to-transparent" />
    </div>
  );
}

/** Lugar del caso de ejemplo (Camila, dueña de Grano Norte): escenas del motor de personajes o fotos de la tostaduría. */
export function FotoCaso({ foto, alto }: { foto: FotoId; alto?: string }) {
  return <FotoApoyo foto={foto} alto={alto} />;
}
