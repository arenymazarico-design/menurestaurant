import { getStore } from "@netlify/blobs";

// PINs inicials: 1234 (admin) i 0000 (lectura). Es canvien des de resultat.html → "Canvia els PINs".
// Admin: veure, modificar, afegir i esborrar.  Lectura: només veure i treure el resum.
const DEFAULT = { admin: process.env.PIN_ADMIN || "1234", lectura: process.env.PIN_LECTURA || "0000" };
let PINS = DEFAULT;
const role = (pin) => (pin && pin === PINS.admin ? "admin" : pin && pin === PINS.lectura ? "lectura" : null);

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

const slug = (s) =>
  String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);

const txt = (s, max) => String(s ?? "").replace(/\s+/g, " ").trim().slice(0, max);

export default async (req) => {
  const store = getStore({ name: "vots-menu", consistency: "strong" });
  const conf = getStore({ name: "config-menu", consistency: "strong" });
  PINS = (await conf.get("pins", { type: "json" })) || DEFAULT;
  const url = new URL(req.url);

  // Change PINs (admin only): POST /api/vots?accio=pins&pin=ADMIN  body {admin, lectura}
  if (req.method === "POST" && url.searchParams.get("accio") === "pins") {
    if (role(url.searchParams.get("pin")) !== "admin") return json({ error: "pin" }, 401);
    const b = await req.json().catch(() => ({}));
    const admin = txt(b.admin, 30), lectura = txt(b.lectura, 30);
    if (admin.length < 4 || lectura.length < 4 || admin === lectura) return json({ error: "pins" }, 400);
    await conf.setJSON("pins", { admin, lectura });
    return json({ ok: true });
  }

  if (req.method === "POST") {
    const b = await req.json().catch(() => null);
    if (!b) return json({ error: "dades" }, 400);
    const nom = txt(b.nom, 40);
    const id = slug(nom);
    const P = parseInt(b.P), S = parseInt(b.S), D = parseInt(b.D);
    if (!id || !(P > 0) || !(S > 0) || !(D > 0)) return json({ error: "incomplet" }, 400);
    const plats = b.plats || {};
    const vot = {
      id, nom, P, S, D,
      nota: txt(b.nota, 120),
      plats: { P: txt(plats.P, 120), S: txt(plats.S, 120), D: txt(plats.D, 120) },
      ts: new Date().toISOString(),
    };
    // Admin editing someone and changing the name: remove the old entry
    const oldId = url.searchParams.get("oldId");
    if (oldId && oldId !== id) {
      if (role(url.searchParams.get("pin")) !== "admin") return json({ error: "pin" }, 401);
      await store.delete(oldId);
    }
    await store.setJSON(id, vot);
    return json({ ok: true });
  }

  if (req.method === "GET") {
    const nom = url.searchParams.get("nom");
    if (nom !== null) {
      const v = await store.get(slug(nom), { type: "json" });
      return json({ vot: v || null });
    }
    const r = role(url.searchParams.get("pin"));
    if (!r) return json({ error: "pin" }, 401);
    const { blobs } = await store.list();
    const vots = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
    return json({ role: r, vots: vots.filter(Boolean), ...(r === "admin" ? { pinLectura: PINS.lectura } : {}) });
  }

  if (req.method === "DELETE") {
    if (role(url.searchParams.get("pin")) !== "admin") return json({ error: "pin" }, 401);
    const id = url.searchParams.get("id");
    if (id) await store.delete(id);
    return json({ ok: true });
  }

  return json({ error: "metode" }, 405);
};

export const config = { path: "/api/vots" };
