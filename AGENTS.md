# AGENTS.md — Regole per assistenti AI

> Leggi questo file PRIMA di eseguire qualsiasi operazione git.

## 🚫 MAI fare push su `main`

Questo repository è collegato a **Netlify**: ogni push su `main` avvia un
**deploy in produzione**. Il piano Netlify ha un **limite mensile di deploy
(~10/mese)**, quindi i push su `main` vanno ridotti al minimo assoluto.

**Regola ferrea:** non eseguire MAI `git push` verso `main`
(né `git push origin main`, né `git push --all`, né `git push --mirror`),
a meno che l'utente non lo chieda **esplicitamente in quel preciso momento**.

- ✅ Tutto il lavoro e i test vanno fatti sui branch (`dev`, `theme/*`, `feat/*`, …).
- ✅ I push sui branch di lavoro sono liberi e incoraggiati.
- ❌ Mai pushare su `main` "per concludere" o "per mettere online".
- ❌ Mai fare merge su `main` con l'intento implicito di pusharlo subito dopo.
- ❌ Mai forzare (`--force`) su `main`.

Se l'utente dice genericamente "sistema X" o "aggiungi Y": fai i commit sul
**branch corrente** e fermati. Per qualsiasi azione che possa toccare `main`
o la produzione, **chiedi prima** e attendi un consenso esplicito.

## Contesto branch

- `main` → **produzione** (Netlify). Non toccare (vedi sopra).
- `dev` → branch di sviluppo/test.
- `theme/brutalist-concrete` → tema **brutalist**, attualmente il focus principale.

## Nota per gli assistenti

Se ti ritrovi senza contesto precedente: lo stato sicuro è **lavorare sul branch
corrente** e **non pushare mai su `main`**. In caso di dubbio, chiedi all'utente.
