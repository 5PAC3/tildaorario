# Tildaorario

Visualizzatore orario settimanale per il mio personale corso di laurea (A.S. 2026/2027).
App non ufficiale — per gli orari attendibili fa fede il sito dell'Università degli Studi di Milano.

## Funzionalità

- **Orario interattivo** — griglia a 15 minuti (8:00–20:00) con blocchi lezione contigui
- **Indicatore lezione attuale** — riquadro sulla cella ora/giorno corrente
- **Ricerca materie** — filtra mentre scrivi (debounce) e con Invio; evidenzia tutte le occorrenze
- **Densità regolabile** — slider per l'altezza righe (persistito in localStorage)
- **Temi** — 6 temi: *Rosa scuro* (default), *Rosa chiaro*, *Brutal scuro*, *Brutal chiaro*, *Scuro*, *Chiaro*, scelti da un selettore a tendina; i temi rosa seguono anche il tema di sistema quando non c'è una scelta esplicita
- **Motion** — wipe radiale al cambio tema, slide al cambio mese, animazioni dei modali e della ricerca (rispetta `prefers-reduced-motion`)
- **Link aule** — click su una lezione apre la mappa AUNICA dell'aula
- **Viste mobile** — su schermi stretti: *giorno* (lista), *giorno tabella* (griglia oraria coi blocchi) e *tabella piena*, con pallini e swipe per cambiare giorno
- **Impostazioni mobile** — su schermi stretti lock, densità, vista e temi stanno in un pannello laterale (button slider in alto a destra), che resta aperto finché non lo si chiude
- **Esportazione .ics** e stampa
- **Calendario eventi** — gestione locale + sync Supabase (WIP)

## Pagine

- `index.html` — orario settimanale
- `calendario.html` — calendario eventi
- `snake.html` — easter egg 🐍 (frecce/WASD, oppure swipe su mobile)
- `login.html`, `404.html`

## Stack

- HTML / CSS / Vanilla JS (nessun build step)
- Supabase (auth + database per il calendario) (WIP)
- [JetBrains Mono Nerd Font](https://www.nerdfonts.com/) — testo e icone dei temi non-rosa (via CDN)
- [Google Fonts](https://fonts.google.com/) — Outfit e Fraunces per i temi rosa (via `@import` in `main.css`)
- [Netlify](https://www.netlify.com/) per il deploy

## Sviluppo

```bash
# Servire in locale (qualsiasi static server)
npx serve .
# oppure
python3 -m http.server 8000
```

## Orario

L'orario sta in **`orario.json`** (chiavi `0`–`4` = lunedì–venerdì):

```json
{
  "2": [
    { "subject": "MICROECONOMIA", "start": "12:30", "end": "14:30", "room": "Aula 11 - Conservatorio (Edificio 3)" }
  ]
}
```

Viene caricato via `fetch` da `js/realtime.js`. Per aggiornarlo basta modificare il JSON:
niente da toccare nel codice.

I link delle aule (ingresso su Google Maps) stanno invece in **`aule.json`**, mappa
stanza → link, caricato nello stesso momento. Le chiavi devono combaciare **al
carattere** con il campo `room` di `orario.json`:

```json
{
  "Aula 11 - Conservatorio (Edificio 3)": "https://www.google.com/maps/search/?api=1&query=45.4657931%2C9.2026631"
}
```

Per aggiungere un'aula basta quindi aggiungere la riga in `orario.json` e, se ha un
link, la corrispondenza in `aule.json`.

## Note sul deploy

`main` è collegato a Netlify (ogni push = deploy in produzione). Il lavoro va fatto sui
branch (`dev`, `feat/*`, …). Vedi `AGENTS.md`.

### Badge "Powered by Netlify"

Netlify inietta in produzione un badge (iframe `#nl-badge-frame` dallo script HUD
`/.netlify/scripts/hud`). Sul piano gratuito spesso manca il toggle per disattivarlo,
 quindi viene nascosto lato client con **due strati**:

- **CSS** (`styles/main.css`, in fondo): regole che nascondono `#nl-badge-frame`,
  `.nl-badge`, gli iframe da `/.netlify/` e i link a netlify.com.
- **JS** (`js/netlify-badge.js`, linkato in tutte le pagine): un `MutationObserver`
  che **rimuove** quegli elementi dal DOM non appena compaiono — l'iframe viene
  iniettato *dopo* il parsing, quindi il CSS da solo non basterebbe.

Se in futuro servisse un link legittimo a netlify.com nel footer, ricordarsi che il
selettore `a[href*="netlify.com"]` lo nasconderebbe: va ristretto.
