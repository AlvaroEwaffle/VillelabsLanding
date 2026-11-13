// Genera «La planilla lista» (bono del pack del curso, 13-nov-2026) como archivo estático detrás del candado del curso:
//   public/curso/bonos/planilla-lista.xlsx  → villelab.com/curso/bonos/planilla-lista.xlsx (solo con la cookie del curso)
// Uso (desde la raíz del repo):  npx jiti scripts/curso/planilla-lista.mts
// Si cambia lib/productos/curso/plantilla.ts, se vuelve a correr y se comitea el .xlsx nuevo.
import { writeFileSync } from 'node:fs';
import { construirPlantillaSistema, ARCHIVO_PLANILLA_LISTA } from '../../lib/productos/curso/plantilla';

// Sin await de primer nivel: jiti 1.x (el que trae el repo) no lo soporta.
async function main() {
  const wb = await construirPlantillaSistema({ lista: true });
  const destino = `public/curso/bonos/${ARCHIVO_PLANILLA_LISTA}`;
  writeFileSync(destino, Buffer.from(await wb.xlsx.writeBuffer()));
  console.log('listo:', destino);
}
main();
