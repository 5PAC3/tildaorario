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

I link delle aule (porta dell'aula) stanno invece in **`aule.json`**, mappa
stanza → link, caricato nello stesso momento. Al momento è vuoto (`{}`), perché
le aule del nuovo orario non hanno ancora un link:

```json
{
  "Aula 11 - Conservatorio (Edificio 3)": "https://esempio.it/aula"
}
```

Per aggiungere un'aula basta quindi aggiungere la riga in `orario.json` e, se ha un
link, la corrispondenza in `aule.json`.

## Note sul deploy

`main` è collegato a Netlify (ogni push = deploy in produzione). Il lavoro va fatto sui
branch (`dev`, `feat/*`, …). Vedi `AGENTS.md`.
