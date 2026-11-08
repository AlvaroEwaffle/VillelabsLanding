import type { ReactNode } from 'react';

/**
 * Ejemplo del caso (Grano Norte) como una «pantallita» clara sobre el fondo azul noche:
 * barra de ventana con tres puntos, fondo claro y texto oscuro, para que contraste y se lea como una pantalla.
 * Los colores oscuros de los hijos se corrigen en app/globals.css (.pantallita).
 */
export function Pantallita({ titulo = 'Grano Norte', children, className = '' }: { titulo?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`pantallita ${className}`}>
      <div className="pantallita__barra" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{titulo}</span>
      </div>
      <div className="pantallita__cuerpo">{children}</div>
    </div>
  );
}
