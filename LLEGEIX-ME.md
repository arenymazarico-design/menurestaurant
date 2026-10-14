# Enquesta del menú — Netlify

## Què hi ha
- `public/index.html` — la pàgina per a la gent: posa el nom, tria els plats i guarda.
- `public/resultat.html` — la pàgina de resultats, protegida amb PIN.
- `netlify/functions/vots.mjs` — la part que guarda els vots (Netlify Blobs).

## PINs
- **Admin** (per defecte `1234`): pot veure, modificar, afegir i esborrar vots.
- **Lectura** (per defecte `0000`): només pot veure i copiar el resum. Aquest és el que dones a l'altra persona.

**Canvia'ls abans de compartir l'enllaç:** a Netlify, ves a *Site configuration → Environment variables* i afegeix `PIN_ADMIN` i `PIN_LECTURA`. Després fes *Deploys → Trigger deploy*.

## Com penjar-ho (aquesta app necessita "funcions": arrossegar la carpeta NO serveix)

### Opció A — amb GitHub (recomanada)
1. Crea un repositori nou a GitHub i puja-hi el contingut d'aquesta carpeta.
2. A Netlify: *Add new site → Import an existing project → GitHub* i tria el repositori.
3. Deixa la configuració tal com surt (ja ho llegeix de `netlify.toml`) i prem *Deploy*.

### Opció B — des de l'ordinador (cal Node.js)
```
cd menu-app
npm install
npx netlify-cli login
npx netlify-cli deploy --prod
```

## Enllaços
- Per al grup de WhatsApp: `https://EL-TEU-SITE.netlify.app/`
- Per a tu i la persona amb accés: `https://EL-TEU-SITE.netlify.app/resultat.html`

## Notes
- Si algú torna a guardar amb el mateix nom, se substitueix el seu menú anterior.
- Per començar una comanda nova, esborra els vots des de la pàgina de resultats (amb el PIN d'admin).
