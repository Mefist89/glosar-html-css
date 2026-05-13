Aceasta este o idee excelentă pentru a digitaliza materialele de curs și pentru a oferi o metodă modernă de pregătire pentru teze. Mai jos am structurat **Specificațiile Tehnice (TZ)** și primii pași pentru implementarea în **SvelteKit**.

---

## **Specificații Tehnice (Termeni de Referință)**

### **1. Obiectivul Aplicației**

Crearea unei aplicații web educaționale ("HTML/CSS Trainer") pentru consolidarea cunoștințelor despre unitățile de măsură a informației , topologii de rețea și dezvoltare web (HTML/CSS) conform curriculumului de clasa a 10-a.

### **2. Structura Funcțională**

- **Pagina 1: Glosar Interactiv**
- Afișarea tuturor etichetelor identificate în document: `<html>`, `<body>`, `<h1>`, `<p>`, `<b>`, `<i>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<tr>`, `<td>`, `<a>`, `<img>` .

- Afișarea atributelor cheie: `target`, `href`, `colspan`, `rowspan`, `border` .

- **Pagina 2: Quiz (Identificare Tag/Proprietate)**
- Întrebări de tip "Completează spațiul liber" sau "Potrivește coloanele".

- Exemple: "Tag-ul pentru listă ordonată" (`<ol>`) sau "Atributul pentru fereastră nouă" (`target="_blank"`).

- **Pagina 3: Verificator de Cod (Sandbox)**
- Utilizatorul scrie cod HTML/CSS pentru a îndeplini cerințe specifice:
- Crearea unui tabel cu bordură vizibilă.

- Formatarea textului cu culori specifice (ex: orange, verde, violet) și dimensiuni exacte (16px, 18px, 20px) .

- Inserarea unei imagini cu dimensiuni predefinite (ex: 300x200px sau 100x100px).

### **3. Stack Tehnologic**

- **Frontend**: SvelteKit (pentru viteză și structură curată).
- **Styling**: Tailwind CSS + DaisyUI (tema `night` sau `cyberpunk`).
- **Editor**: CodeMirror 6 (pentru input-ul de cod).
- **Stocare**: Fișier local `data.json`.
- **Logica de Verificare**: DOMParser pentru validarea structurii HTML și evaluarea stilurilor CSS injectate.

---

## **Pasul 1: Structura Datelor (`src/lib/data.json`)**

```json
{
  "glossary": [
    {
      "tag": "<table>",
      "desc": "Definește structura unui tabel",
      "cat": "table"
    },
    {
      "tag": "ol",
      "desc": "Creează o listă ordonată (numerotată)",
      "cat": "list"
    }
  ],
  "quiz": [
    { "q": "Tag-ul utilizat pentru a defini un rând în tabel", "a": "tr" },
    { "q": "Proprietatea CSS pentru lățimea unui element", "a": "width" }
  ],
  "challenges": [
    {
      "id": 1,
      "task": "Creați un titlu h1 cu textul 'Scoala mea' și o imagine 'scoala.jpg' de 300x200px",
      "validate": { "tags": ["h1", "img"], "imgSize": [300, 200] }
    }
  ]
}
```

---

## **Pasul 2: Inițializarea Proiectului**

Deschide terminalul și rulează următoarele comenzi:

```bash
# Creează proiectul SvelteKit
npm create svelte@latest html-trainer
# Alege: Skeleton project, Barebones scaffolding, Yes (TypeScript/Check), No (Vitest/Playwright)

cd html-trainer
npm install

# Instalează Tailwind CSS și DaisyUI
npm install -D tailwindcss postcss autoprefixer daisyui
npx tailwindcss init -p

```

### **Configurare Tailwind (`tailwind.config.js`)**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cyberpunk", "night"],
  },
};
```

---

## **Pasul 3: Logica de Verificare (Exemplu pentru Pagina 3)**

Vom folosi un sistem simplu de verificare bazat pe scoruri, similar cu punctajul de 15-20 puncte per item din teze.

```svelte
<script>
  let userCode = "";
  let feedback = "";

  function checkCode() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(userCode, 'text/html');

    const hasH1 = doc.querySelector('h1') !== null;
    const img = doc.querySelector('img');
    const hasCorrectImg = img && img.getAttribute('width') === '300';

    if (hasH1 && hasCorrectImg) {
      feedback = "Corect! Ai obținut 15 puncte.";
    } else {
      feedback = "Mai încearcă. Verifică tag-ul h1 și dimensiunile imaginii.";
    }
  }
</script>

<textarea bind:value={userCode} class="textarea textarea-bordered w-full h-40 font-mono"></textarea>
<button on:click={checkCode} class="btn btn-primary mt-4">Verifică Codul</button>
<p class="mt-2 text-lg">{feedback}</p>

```
