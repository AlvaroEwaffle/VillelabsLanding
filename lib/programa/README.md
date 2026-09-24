# Programa · herramienta interna de gestión

Corre las dailies del programa. Lee GitHub, y deja cambiar estados y dejar notas.

## El día a día

```bash
npm run programa:sync            # refresca el snapshot de GitHub
npm run programa:sync -- prtech  # uno solo
```

Después, desplegar. **Ojo: `npm run deploy` publica el working tree entero a
producción.** Si hay trabajo en curso de otra rama o de otra sesión, se va con
él. Para publicar solo lo commiteado, se construye desde un worktree aparte:

```bash
git worktree add --detach /tmp/build-villelabs <commit>
cp -Rl node_modules /tmp/build-villelabs/node_modules   # enlaces duros, no copia
cp .env.local /tmp/build-villelabs/.env.local
cd /tmp/build-villelabs && npm run build
npx wrangler pages deploy ./dist --project-name=villelabs --branch=programa
```

`--branch=programa` es un **preview deployment**: sale en `programa.villelabs.pages.dev`
y no toca `villelab.com`.

## Agregar un programa

La herramienta corre varios programas con el mismo código. Lo que cambia por
programa son cinco cosas, en este orden:

1. **La llave.** Una cadena random de 12 caracteres en `LLAVE_A_SLUG`
   (`lib/programa/config.ts`), apuntando a un slug. La llave es lo que va en la
   URL; el slug es lo que nombra los archivos y el documento de Firestore.
2. **La configuración.** Una entrada en `CONFIGS` con la fase en foco, los
   sprints con sus fechas y metas, y el equipo (`login de GitHub → nombre`).
   Esto no vive en GitHub porque cambia con el planning, no con la daily.
3. **El tablero.** Un GitHub Projects v2 con los campos `Status`, `Sprint`,
   `Priority` y `Estimate`. Las opciones de `Status` tienen que ser exactamente
   `Backlog`, `Sprint Backlog`, `Ready`, `In progress`, `In review` y `Done`:
   `DEL_BOARD` en `derivar.ts` mapea esos strings y cualquier otro se muestra
   como «Sin tocar». Los **milestones son las fases** y las **épicas son
   etiquetas** `epic: …`.
4. **El snapshot.** Una entrada en `PROGRAMAS` de `scripts/programa/sync.mjs`
   con owner, repo, número de proyecto y nombre, y después
   `npm run programa:sync -- <slug>`, que escribe `data/<slug>.json`.
5. **Los datos escritos.** `data/<slug>.charter.json`, `<slug>.fase1.json` y
   `<slug>.semilla.json`, y la entrada correspondiente en
   `lib/programa/registro.ts` — que es donde se declara además **qué artefactos
   tiene** ese programa y qué bajadas o fuentes se le cambian. Un programa sin
   `roadmap` ni `pipeline` simplemente no los lista.

Las rutas `roadmap` y `pipeline` además generan sus params desde
`LLAVES_PRTECH`, no desde `LLAVES`: son afirmaciones sobre el repo `prtech-ai`,
no plantillas, y generarlas para otro programa mostraría el roadmap ajeno bajo
su llave.

Lo que **no** hay que hacer: escribir en Firestore a mano. La semilla del RAID
la aplica la página la primera vez que alguien la abre, y deja la marca
`sembrado` para que borrar la última entrada no la haga reaparecer.

## Las dos capas

| | Dónde vive | Quién la escribe |
| :--- | :--- | :--- |
| Lo que existe | `lib/programa/data/<slug>.json` | `programa:sync`, desde GitHub |
| Lo que opinamos | Firestore `programas/<slug>` | La página, en vivo |

No comparten un solo campo, a propósito: un sync no puede pisar una nota, y una
nota no puede mentir sobre si una issue está cerrada. Lo único que se cruza es
el estado, y ahí GitHub gana siempre que la issue esté cerrada.

## Las trampas, para no repetirlas

- **`wrangler` exige Node ≥22 y el del PATH es v20.10.** Anteponer
  `/opt/homebrew/opt/node@22/bin` al PATH solo para ese comando.
- **Turbopack entra en pánico con un `node_modules` symlinkeado** hacia afuera
  de la raíz del proyecto (`Symlink node_modules is invalid`). Por eso `cp -Rl`:
  enlaces duros, directorio real, cero bytes copiados.
- **Un `.next` viejo después de mover una ruta rompe el build** con 18 errores de
  `next/font/google` que no tienen nada que ver con las fuentes. `rm -rf .next dist`
  y listo.
- **Firestore rechaza ids con doble guión bajo** (`__probe__` → `invalid-argument`).
  No es un problema de reglas aunque lo parezca.
- **Los campos Status, Sprint y Priority no existen en la API REST de GitHub.**
  Solo en GraphQL de Projects v2, y esa exige token incluso para repos públicos.
- **La llave de la URL es oscuridad, no autenticación.** El sitio es estático y no
  hay dónde validar una sesión. Las reglas de Firestore además están abiertas:
  quien tenga el link puede escribir, y con una llave se llega a su programa
  entero. Cloudflare Access es el paso que falta. Mientras no esté: el link es
  la credencial y se trata como tal, una por programa.
- **Un programa nuevo no puede compartir artefactos sin más.** La bajada y la
  fuente de cada artefacto son afirmaciones sobre un contenido («las 23
  historias», «kick-off del 22-sep»). Por eso `registro.ts` permite
  sobrescribirlas por programa: sin eso, el Fase 1 de un programa nuevo
  presume las historias del otro.
