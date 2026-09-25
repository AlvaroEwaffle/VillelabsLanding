#!/usr/bin/env bash
# Vigila programa_copiloto/{slug} en Firestore y emite una línea por comentario
# nuevo de Álvaro. Una línea = una notificación.
#
# La clave nunca se imprime: se lee de .env.local y se usa en la URL de curl,
# cuya salida va a un archivo, no a stdout.
set -uo pipefail

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
SLUG="${1:-prtech}"
ESTADO="${COPILOTO_ESTADO:-/tmp/copiloto-vistos-$SLUG.txt}"
RESP="/tmp/.copiloto-resp-$SLUG.json"

set -a; . "$REPO/.env.local"; set +a
P="$NEXT_PUBLIC_FIREBASE_PROJECT_ID"
K="$NEXT_PUBLIC_FIREBASE_API_KEY"
URL="https://firestore.googleapis.com/v1/projects/$P/databases/(default)/documents/programa_copiloto/$SLUG?key=$K"

touch "$ESTADO"

while true; do
  if curl -s --max-time 20 -o "$RESP" "$URL"; then
    python3 - "$RESP" "$ESTADO" <<'PY' || true
import json, sys, os
resp, estado = sys.argv[1], sys.argv[2]
try:
    d = json.load(open(resp))
except Exception:
    raise SystemExit
if "error" in d:
    raise SystemExit  # doc aún no existe: no es un fallo, es que no escribió nada
vals = d.get("fields", {}).get("mensajes", {}).get("arrayValue", {}).get("values", [])
vistos = set(open(estado).read().split()) if os.path.exists(estado) else set()
nuevos = []
for v in vals:
    f = v.get("mapValue", {}).get("fields", {})
    g = lambda k: f.get(k, {}).get("stringValue", "")
    mid = g("id")
    leido = f.get("leido", {}).get("booleanValue", False)
    # `leido` lo escribe el responder en el propio documento, así que el estado
    # sobrevive a reiniciar el monitor, cambiar de máquina o perder /tmp. El
    # archivo local es solo un segundo cinturón para lo que aún no respondí.
    if not mid or leido or mid in vistos or g("de") != "alvaro":
        continue
    nuevos.append(mid)
    donde = g("donde") or "—"
    texto = " ".join(g("texto").split())
    print(f"[copiloto · {donde}] {texto}", flush=True)
if nuevos:
    with open(estado, "a") as fh:
        fh.write("\n".join(nuevos) + "\n")
PY
  fi
  sleep 20
done
