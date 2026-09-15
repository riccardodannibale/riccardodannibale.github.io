# 🌐 riccardodannibale.github.io

Portfolio personale pubblicato tramite **GitHub Pages**.

Il sito è una **shell simulata** che permette di navigare contenuti (chi sono, studi, progetti, CV, contatti) digitando comandi. Nessun comando viene realmente eseguito sul server — tutta la logica è JavaScript lato client su una struttura dati interna al sito.

🔗 **Live:** https://riccardodannibale.github.io/

---

## ✨ Caratteristiche

- Interfaccia fullscreen in stile terminale, font monospace
- Sfondo animato con **matrix rain** di `0` e `1` (canvas, leggero)
- Prompt personalizzato, cursore lampeggiante, cronologia con `↑` / `↓`
- Autocompletamento con `Tab`
- Comandi per esplorare il portfolio (`about`, `education`, `experience`,
  `skills`, `projects`, `cv`, `contact`, `github`)
- **File system virtuale** navigabile (`ls`, `cd`, `cat`, `pwd`, `tree`)
- Banner ASCII (figlet style) all'apertura di ogni sezione, con auto-fit
  della dimensione in base al viewport
- Easter egg: comando `matrix`, comando `sudo`
- Layout completamente responsive (desktop, tablet, mobile)
- Blog delle homework in stile forum, raggiungibile dal comando `homework`
  e ritorno alla shell tramite link "← back to shell"

---

## 🗂️ Struttura del repository

```
.
├── index.md                 # Home: avvia il terminale
├── info.md                  # Pagina di fallback: info / CV / contatti
├── progetti.md              # Pagina di fallback: progetti
├── universita.md            # Pagina di fallback: percorso universitario
├── r.md                     # Pagina di reindirizzamento
├── LICENSE                  # Licenza MIT
├── README.md                # Questo file
├── _config.yml              # Configurazione Jekyll
│
├── _layouts/
│   ├── default.html         # Layout del terminale (portfolio)
│   └── homework.html        # Layout del blog delle homework
│
├── assets/
│   ├── css/
│   │   ├── terminal.css     # Stile del terminale (portfolio)
│   │   ├── homework.css     # Stile del blog delle homework
│   │   └── style.css        # Stile legacy (non più utilizzato)
│   ├── js/
│   │   └── terminal.js      # Motore del terminale simulato
│   ├── docs/
│   │   ├── Riccardo_DAnnibale_CV_ITA.pdf
│   │   └── Riccardo_DAnnibale_CV_ENG.pdf
│   └── images/              # Immagini usate nelle homework
│
└── HOMEWORK/
    ├── index.md             # Home del blog (forum) — layout: homework
    ├── homework1/index.md
    ├── homework2/index.html
    ├── homework3/index.html
    ├── ...
    └── homework11/index.html
```

---

## 🖥️ Come funziona il terminale

All'apertura della home viene avviato `assets/js/terminal.js`, che:

1. Inizializza il **matrix rain** su un canvas a pieno schermo (disattivato
   automaticamente se l'utente ha attivato `prefers-reduced-motion`).
2. Costruisce un **file system virtuale** in memoria che rappresenta i
   contenuti del portfolio (`about/`, `education/`, `experience/`,
   `projects/`, `homework/`, `documents/`).
3. Gestisce input, prompt, cronologia, autocompletamento e rendering
   dell'output, inclusi link e banner ASCII.

Nessun comando viene inviato al server: è tutto simulato client-side.

### Comandi disponibili

| Comando           | Descrizione                                        |
| ----------------- | -------------------------------------------------- |
| `help` / `?`      | Mostra l'elenco completo dei comandi               |
| `guide`           | Tour rapido del terminale                          |
| `about`           | Chi sono                                           |
| `education`       | Studi e certificazioni                             |
| `experience`      | Esperienze lavorative                              |
| `skills`          | Competenze tecniche                                |
| `projects`        | Elenco progetti                                    |
| `homework`        | Apre il blog delle homework di Statistica          |
| `cv`              | Link ai PDF del curriculum (ITA / ENG)             |
| `contact`         | Contatti                                           |
| `github`          | Profilo GitHub                                     |
| `ls [dir]`        | Elenca i file della directory corrente             |
| `cd <dir>`        | Cambia directory                                   |
| `cat <file>`      | Mostra il contenuto di un file                     |
| `pwd`             | Stampa la directory corrente                       |
| `tree`            | Mostra l'intero albero del file system virtuale    |
| `whoami`          | Nome utente corrente                               |
| `date`            | Data e ora correnti                                |
| `echo <text>`     | Stampa il testo                                    |
| `matrix`          | Easter egg: overlay in stile Matrix                |
| `sudo`            | Easter egg                                         |
| `clear`           | Pulisce lo schermo                                 |
| `exit`            | Easter egg                                         |

Scorciatoie: `↑` / `↓` per la cronologia, `Tab` per l'autocompletamento,
tap/click in qualsiasi punto per riportare il focus sull'input.

---

## 📚 Blog delle homework

Le homework del corso di **Statistica 2025/2026** sono pubblicate sotto
`/HOMEWORK/`, con layout a sé (`_layouts/homework.html` e
`assets/css/homework.css`).

Dal terminale si accede con:

```
homework
```

Dalla pagina del blog è possibile tornare alla shell con il link
**← back to shell** in alto.

---

## 🧪 Progetti presentati

- **ASCON on FPGA — Tesi sperimentale**
  Implementazione hardware dell'algoritmo ASCON su FPGA.
  Verilog, Vivado, interfaccia SPI, PUF simulata, pipeline della permutazione.
- **Chat P2P**
  Applicazione peer-to-peer in Python con GUI Tkinter, cifratura AES (Fernet)
  e comunicazione diretta tra peer.
- **Gym Site Manager**
  Web app per la gestione di una palestra. Backend PHP + MySQL (XAMPP),
  autenticazione utenti, calendari, messaggi e promozioni.
- **ASD Circolo Campeggiatori Romani — Scuola Vela FIV**
  Gestione e manutenzione del sito del circolo, aggiornamento contenuti e
  validazione di sicurezza.

---

## 🛠️ Tecnologie utilizzate

- **Frontend:** HTML, CSS, JavaScript (vanilla, nessuna dipendenza esterna)
- **Generatore statico:** Jekyll (tramite GitHub Pages)
- **Font:** JetBrains Mono (Google Fonts)
- **Backend dei progetti:** PHP
- **Database:** MySQL
- **Hardware design:** Verilog, Vivado
- **Software:** Python
- **Strumenti:** Git, GitHub Pages

---

## ⚙️ Esecuzione in locale

```bash
git clone https://github.com/riccardodannibale/riccardodannibale.github.io.git
cd riccardodannibale.github.io
```

Per il rendering corretto di Jekyll (layout, `permalink`, pagine `.md`):

```bash
bundle install
bundle exec jekyll serve
```

Poi apri `http://localhost:4000/` nel browser.

In alternativa, puoi aprire i file `.md` direttamente, ma i layout Jekyll
(come il terminale) non verranno renderizzati senza il server locale.

---

## 🚀 Pubblicazione

Il sito è pubblicato automaticamente tramite **GitHub Pages** ad ogni push sul branch principale (`main` / `master`).

🔗 https://riccardodannibale.github.io/

---

## 📫 Contatti

- **Email:** riccardodannibale1@gmail.com
- **GitHub:** https://github.com/riccardodannibale
- **LinkedIn:** https://www.linkedin.com/in/riccardo-d-annibale-8898562b5/

---

## 📄 Licenza

Distribuito sotto licenza **MIT**. Vedi il file [`LICENSE`](./LICENSE)
per i dettagli.

---

🧠 **Autore:** Riccardo D'Annibale
