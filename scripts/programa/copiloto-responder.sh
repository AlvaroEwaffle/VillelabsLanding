#!/usr/bin/env bash
# Responde en el hilo del copiloto y marca como leídos los mensajes de Álvaro.
#
# Lee-modifica-escribe sobre el documento entero: es un array en un solo doc,
# así que no hay forma de appendear sin releer. Con decenas de mensajes y un
# solo escritor de este lado, alcanza.
#
#   copiloto-responder.sh "texto de la respuesta" [slug]
set -euo pipefail

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
TEXTO="${1:?falta el texto}"
SLUG="${2:-prtech}"
TMP="/tmp/.copiloto-rw-$SLUG.json"

set -a; . "$REPO/.env.local"; set +a
URL="https://firestore.googleapis.com/v1/projects/$NEXT_PUBLIC_FIREBASE_PROJECT_ID/databases/(default)/documents/programa_copiloto/$SLUG?key=$NEXT_PUBLIC_FIREBASE_API_KEY"

curl -s --max-time 20 -o "$TMP" "$URL"

python3 - "$TMP" "$TEXTO" <<'PY' > "$TMP.out"
import json, sys, time, random, datetime
doc, texto = sys.argv[1], sys.argv[2]
d = json.load(open(doc))
vals = d.get("fields", {}).get("mensajes", {}).get("arrayValue", {}).get("values", [])

leidos = 0
for v in vals:
    f = v["mapValue"]["fields"]
    if f.get("de", {}).get("stringValue") == "alvaro" and not f.get("leido", {}).get("booleanValue"):
        f["leido"] = {"booleanValue": True}
        leidos += 1

ts = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
vals.append({"mapValue": {"fields": {
    "id": {"stringValue": f"m_{int(time.time()*1000):x}_{random.randint(0,99999):05x}"},
    "de": {"stringValue": "copiloto"},
    "texto": {"stringValue": texto},
    "donde": {"stringValue": ""},
    "ts": {"stringValue": ts},
}}})

json.dump({"fields": {
    "actualizado": {"stringValue": ts},
    "mensajes": {"arrayValue": {"values": vals}},
}}, open(doc + ".body", "w"))
print(f"{leidos} marcado(s) como leído · {len(vals)} mensajes en el hilo")
PY
cat "$TMP.out"

curl -s --max-time 20 -o "$TMP.res" -w "escritura HTTP %{http_code}\n" \
  -X PATCH -H "Content-Type: application/json" --data @"$TMP.body" "$URL"

python3 -c "
import json,sys
d=json.load(open(sys.argv[1]))
print('  ERROR:', d['error']['status']) if 'error' in d else print('  respuesta publicada')
" "$TMP.res"

rm -f "$TMP" "$TMP.out" "$TMP.body" "$TMP.res"
