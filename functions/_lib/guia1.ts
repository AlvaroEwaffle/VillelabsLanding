// Candado de la Guía 1 (producto Hotmart 8918629).
//
// La guía interactiva vive en /guia/prospeccion. Solo entra quien tiene la cookie `vl_g1`, que se
// obtiene en /guia/acceso con el código que reciben los compradores dentro del área de miembros de
// Hotmart (o con el link de un clic `/guia/acceso?c=CODIGO` que va en la clase «Empieza aquí»).
//
// El repo es público: aquí NO está el código ni el valor de la cookie, solo sus hashes SHA-256.
//   HASH_CODIGO = sha256(codigoNormalizado)
//   cookie      = sha256('vl-g1:' + codigoNormalizado)
//   HASH_COOKIE = sha256(cookie)
// codigoNormalizado = mayúsculas, sin espacios ni guiones. Para cambiar el código: generar uno nuevo
// (largo, ≥16 caracteres aleatorios), recalcular los dos hashes y actualizar la clase en Hotmart.

export const HASH_CODIGO = '410f5d18536b3ccfe6fdd82e266d3536d94cccc21c0446c0f7e1e8b70978c14f';
export const HASH_COOKIE = 'e12e26bee9f1e0546a00a60759cc4ea8bb6f2f6a52d39f0982dea0e01c4df592';
export const COOKIE = 'vl_g1';

// Códigos de regalo (9-nov-2026, Álvaro por WA): la guía se regala por DM a cambio de feedback, sin
// pasar por Hotmart. Un código por persona, así sabemos quién la abrió y a quién pedirle testimonio.
// Aquí solo va un id opaco (R001…) y los hashes; el nombre de cada persona vive fuera del repo
// (~/.claude/guia-regalo/codigos.json). Se generan con ~/.claude/guia-regalo/nuevo.mjs.
//   hc = sha256(codigoNormalizado)   hk = sha256(sha256('vl-g1:' + codigoNormalizado))
export type Regalo = { id: string; hc: string; hk: string; vence: string };
export const REGALOS: Regalo[] = [
  // REGALOS-INICIO
  { id: 'R001', hc: 'b2366dbbfab87ab394b465b695d71452b9cba07b19126beca23c8319cd9425a1', hk: '8da8253e802cab32c4041e934333ae409b759b9764b86e6c4ee23cc00280a560', vence: '2026-11-23' },
  { id: 'R002', hc: 'e181d4c2f4bece529e9e220d6d776b5fb5b1f441c9827659ef8a517a99e4278b', hk: 'e450026e8666fd9f5ca4dde5fbbe1d683349d67b2a10aa5c6b1d04feb9c836f0', vence: '2026-11-23' },
  { id: 'R003', hc: 'c057661858a72ea815306555d3ae36fa21dece55e5bb6639f3236b7b007d1f77', hk: '622aad3a138e2d5a3e7ea7d0f1e55a9a0ffa04b0aedc16be2af4c9c109c4d97c', vence: '2026-11-23' },
  { id: 'R004', hc: 'befff81826b3c340afa7976b0561a2057e9afb24fbc3b3acd015650debec1c7c', hk: '9e582d0152e3e15c5b878e15f845503d8d1a0972b405b0d8ab0fea8cd41ce2c3', vence: '2026-11-23' },
  { id: 'R005', hc: '9c77e0782c79fe19f036ff274db79060d30c665feadde7e5203ab269bb66b5f9', hk: 'cfcbf09fce04f5f1f2a77275c164d318a1ec5b232f9f62898ebefd7549b95fbf', vence: '2026-11-23' },
  { id: 'R006', hc: 'e235439a2d2f9d16d766126f955ee6a1ac0755e60ea5b98d8f68700becea9adb', hk: '2f9bfeaffd6a84dbc54b178129ea3f83cd9d5e0a3763b66321c414124a91ce05', vence: '2026-11-23' },
  { id: 'R007', hc: '70f8cf000831492cfab5570d83c2358ed9739eb4dca986e491d4e36d5d7ec9cd', hk: '078a4a5541f2dda535df6272aded4807ad9342089e5d836c4fa4cec9e79a94e2', vence: '2026-11-23' },
  { id: 'R008', hc: 'fd14a9e0c2c6b81b51345a71a06c5c4fb1a8754c005ae156c826643d38294a2e', hk: '9cb8ea8a2987908ae3e019e32016d39230b6d70034865ddf1ac7ac8552f7ec6e', vence: '2026-11-23' },
  { id: 'R009', hc: '364b938da883444c140391b24edb911d6893e18000112b851f96517d71d4957e', hk: '871a27c69afc3438ec2de762605f4763f051e8e6b120ee8d6212fc949c8d9992', vence: '2026-11-23' },
  { id: 'R010', hc: '688d9f5a874de3314f8945cad29047687ca4f40a45af2efbe52f7e2360a217de', hk: '137970d53ad5f23c5057392acd1916be91db2a63ddb7f01338c3c41ee4d2e571', vence: '2026-11-23' },
  { id: 'R011', hc: 'b4ec8e4fca191db402ce7521a84e0e41943bcad11f2276b7d9226ea0f00abd0d', hk: '55a5bf439efb8f0f7324916752c319764c8e32c2518f0eb0eaeed6f23519aa21', vence: '2026-11-23' },
  { id: 'R012', hc: 'e2f01907a25e82d9e8a8ab138aa3b7da73434e59b2bdc266f9bde74363c25794', hk: 'a099cea5403d277846062972a96ddff0462050053faed6e4c14cd1e2c82ee80c', vence: '2026-11-23' },
  { id: 'R013', hc: '1a4fe8f18ce8f835385ffe2827f98b0ee304ed717e3b7fcf4e904da8f2bb2bdf', hk: '0549deae5592587b56c6fdbb2c79e770160c38c7b666eda021ae29cda23713ce', vence: '2026-11-23' },
  { id: 'R014', hc: '99769c24c357073ce1cf86c72fb4925ad4c05dfc28a4dc92d93e7f0e85df7eb0', hk: '0154d16ea9f5e309a26e4cb4537b5d3afb0bd65bf314060f6e195b6f11ccc17b', vence: '2026-11-23' },
  { id: 'R015', hc: '5d9747ea5a029be1e27f048d1c4b322ad62577a868e263fefa3b887bcea726a7', hk: 'c8d7089df8fca75a6080945016d293536582c85fd0625c2c9dde6a60225036e9', vence: '2026-11-23' },
  { id: 'R016', hc: '9e4baef1848c449f4cc0d9e61703dc4ac79ad34bf1d432796c9ffcd8dc56ee4d', hk: '3671b06658ca2aa43d8ff7f933f5c54599451e67ae8838f85ccb0a48a8f87738', vence: '2026-11-23' },
  { id: 'R017', hc: 'd351d03f78389d8fe38a35e14dcf883e525f10eda9f16058d549609fa52f7951', hk: 'ec1082554be7c9f00bb99b0feb66346cd35d6cce7a73e3d2e1f76a2967136e78', vence: '2026-11-23' },
  { id: 'R018', hc: '4fc16b073d9b93483b37fb874cd59eee492fd7fd472065b35c9a66d041b708f3', hk: '25a4d8de3910c6f170e168b9b7241ac433d3a1ee7f1a433dfb8030a451a50052', vence: '2026-11-23' },
  { id: 'R019', hc: '3956eb22b2f3ada036958a5f4b1653f66eaf205fff172315d29931068672c4d9', hk: 'f70b92f504f41d5a8eb48bb78b27f2b699eb5862661847cecee124ce6d543ed9', vence: '2026-11-23' },
  { id: 'R020', hc: 'de49a16e431e230699136d999cfdff55ab053a043346e1a1662bc0d13e6f2037', hk: 'add51ea952276430d9bc89d03c7530a23de7160d2a081f17ba216e760f3f11e4', vence: '2026-11-23' },
  { id: 'R021', hc: 'f190f18dc9be3d5cda0dd095ba62b164021677deaf468368290f3cc1783b0087', hk: '0aeaae4262616bd02bf47e1c261541f605995659248970adafd30f8573444ad4', vence: '2026-11-23' },
  { id: 'R022', hc: '65761763d9dc9b8b532e0fe6f4b1e4323c26194b47491fda9539c124f9e286dc', hk: '28a8ade488711939768a46504571461c643abf6d669e68b5866ccf7c8b19b0bb', vence: '2026-11-23' },
  { id: 'R023', hc: '77ecc463faca46dc8ec6bb7c1fdd927728f65dc325d99a29f5deb6a5ee78b2ae', hk: '52e0c28d8de112308aa02302df00011faf1ff5202057b59e22447a6a87fc3504', vence: '2026-11-23' },
  { id: 'R024', hc: '2c5d3a57d6b09cefb9c8593d6ede294bdc90762237c9c7ac1f8badb5d2a8452d', hk: '1a7bab220d40c41e2166dcf2184a15dbcd1a6c954609071c1e47b46648a692e6', vence: '2026-11-23' },
  { id: 'R025', hc: '97ee248e2175211135c771f008fa0c4d83104913509c08fdf2f52b37fcbe683b', hk: 'fdc84fc5c807a231dc1b61f158810d67ddb5ac7b9445d29b3f63953e33479dbc', vence: '2026-11-23' },
  { id: 'R026', hc: '8ae525460a8f22cf9d782720668d34d4953e4273c1ac90ba76e53d829f10ef05', hk: 'b5130208e20e26f6d2a80480448f002d517570f81c42c50389432e36715672a3', vence: '2026-11-23' },
  { id: 'R027', hc: '2e47e42f3aec44f5f9c3972edfbdd6dff059431b7607785153035c46b3e5d3ca', hk: '7c7d053f19f8db5f4a9177138cc57de8b1793adc35d0a0d1fd1f5949cdbc971f', vence: '2026-11-23' },
  { id: 'R028', hc: 'c9fc4d4680217b95fa7af0fc7bf6e7b4a0b7f42da7aca8d39b697e119201051a', hk: '7e7e13ea9d84935b23aa2a4d1aaae5141f6adb233e26868d1d66cddcf1d9127a', vence: '2026-11-23' },
  { id: 'R029', hc: '5f473dc827bf754d2d9b3a9e20c94f00dd7787db5df27272f06b23d1f0ac6c7f', hk: '2ad05c5ec363a9a19ed6355736d5298f35503c2dcb1f8cfe52899c3cb62431c4', vence: '2026-11-23' },
  { id: 'R030', hc: '57ef086b7ed7cbb235df90ce5915bc483b3fe433457decae0f3ffb628584abcc', hk: '3641da7361147b892ec805aad61e47ecee1bc48589198f044efe1b01cc2098da', vence: '2026-11-23' },
  { id: 'R031', hc: 'f9d76a1aef9618050bcb6c2a5cbb77b9cb72a35f06f71fd7c5c48ef576efc1d0', hk: 'b50aa04a5de32f4f30005bc029146c346568c0a7784a72f24d71271afd354b8d', vence: '2026-11-23' },
  // REGALOS-FIN
];
export const PROTEGIDO = /^\/guia\/prospeccion(\/|\.|$)/;

export async function sha256(texto: string): Promise<string> {
  const datos = new TextEncoder().encode(texto);
  const hash = await crypto.subtle.digest('SHA-256', datos);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function normalizar(codigo: string): string {
  return codigo.toUpperCase().replace(/[\s-]+/g, '');
}

/** Devuelve el valor de cookie si el código es válido; si no, null. */
export async function cookieParaCodigo(codigo: string): Promise<string | null> {
  return (await canjear(codigo))?.cookie ?? null;
}

/** Valida el código de Hotmart o uno de regalo vigente. `regalo` trae el id cuando es de regalo. */
export async function canjear(codigo: string): Promise<{ cookie: string; regalo?: string } | null> {
  const norm = normalizar(codigo);
  if (norm.length < 8 || norm.length > 64) return null;
  const h = await sha256(norm);
  const cookie = () => sha256(`vl-g1:${norm}`);
  if (h === HASH_CODIGO) return { cookie: await cookie() };
  const hoy = new Date().toISOString().slice(0, 10);
  const r = REGALOS.find((x) => x.hc === h && x.vence >= hoy);
  return r ? { cookie: await cookie(), regalo: r.id } : null;
}

export async function tieneAcceso(request: Request): Promise<boolean> {
  const cookies = request.headers.get('cookie') ?? '';
  const m = cookies.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]{64})`));
  if (!m) return false;
  const hk = await sha256(m[1]);
  return hk === HASH_COOKIE || REGALOS.some((x) => x.hk === hk);
}
