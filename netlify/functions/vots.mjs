import { getStore } from "@netlify/blobs";

// PINs. Canvia'ls aquí o defineix les variables PIN_ADMIN i PIN_LECTURA a Netlify.
// Admin: veure, modificar, afegir i esborrar.  Lectura: només veure i treure el resum.
const PIN_ADMIN = process.env.PIN_ADMIN || "1234";
const PIN_LECTURA = process.env.PIN_LECTURA || "0000";
const role = (pin) => (pin && pin === PIN_ADMIN ? "admin" : pin && pin === PIN_LECTURA ? "lectura" : null);

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

const slug = (s) =>
  String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);

const txt = (s, max) => String(s ?? "").replace(/\s+/g, " ").trim().slice(0, max);

export default async (req) => {
  const store = getStore({ name: "vots-menu", consistency: "strong" });
  const url = new URL(req.url);

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
    return json({ role: r, vots: vots.filter(Boolean) });
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
