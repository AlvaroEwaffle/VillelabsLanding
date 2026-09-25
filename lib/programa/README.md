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
  quien tenga el link puede escribir. Cloudflare Access es el paso que falta.
