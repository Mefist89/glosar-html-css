/* ═══════════════════════════════════════════
   HTML/CSS Trainer – Application Logic
   ═══════════════════════════════════════════ */

// ─── DATA ───
const GLOSSARY = [
  { tag: "&lt;html&gt;", desc: "Eticheta rădăcină a documentului HTML. Conține toate celelalte elemente.", cat: "structure" },
  { tag: "&lt;head&gt;", desc: "Definește secțiunea de antet – conține meta-informații, titlul și linkuri CSS.", cat: "structure" },
  { tag: "&lt;title&gt;", desc: "Stabilește titlul paginii afișat în tab-ul browserului.", cat: "structure" },
  { tag: "&lt;body&gt;", desc: "Conține tot conținutul vizibil al paginii web.", cat: "structure" },
  { tag: "&lt;h1&gt;", desc: "Titlu de nivel maxim (heading 1). Cel mai important titlu din pagină.", cat: "text" },
  { tag: "&lt;h2&gt;", desc: "Titlu de nivelul 2 – subtitlu important.", cat: "text" },
  { tag: "&lt;h3&gt;", desc: "Titlu de nivelul 3 – secțiune secundară.", cat: "text" },
  { tag: "&lt;h4&gt;", desc: "Titlu de nivelul 4 – subsecțiune.", cat: "text" },
  { tag: "&lt;p&gt;", desc: "Definește un paragraf de text. Adaugă spațiu automat sus și jos.", cat: "text" },
  { tag: "&lt;b&gt;", desc: "Face textul să apară îngroșat (bold).", cat: "text" },
  { tag: "&lt;i&gt;", desc: "Face textul să apară în italic (cursiv).", cat: "text" },
  { tag: "&lt;center&gt;", desc: "Aliniază conținutul pe centrul paginii (tag depreciat).", cat: "text" },
  { tag: "&lt;br&gt;", desc: "Introduce o linie nouă (break) în text. Tag auto-închis.", cat: "text" },
  { tag: "&lt;ul&gt;", desc: "Creează o listă neordonată (cu puncte/bullet points).", cat: "list" },
  { tag: "&lt;ol&gt;", desc: "Creează o listă ordonată (numerotată automat).", cat: "list" },
  { tag: "&lt;li&gt;", desc: "Definește un element individual dintr-o listă (ul sau ol).", cat: "list" },
  { tag: "&lt;table&gt;", desc: "Definește structura unui tabel HTML.", cat: "table" },
  { tag: "&lt;tr&gt;", desc: "Definește un rând (table row) în cadrul unui tabel.", cat: "table" },
  { tag: "&lt;td&gt;", desc: "Definește o celulă standard de date într-un tabel.", cat: "table" },
  { tag: "&lt;th&gt;", desc: "Definește o celulă de antet (header) într-un tabel. Textul apare bold și centrat.", cat: "table" },
  { tag: "&lt;a&gt;", desc: "Creează un hyperlink. Folosește atributul href pentru destinație.", cat: "media" },
  { tag: "&lt;img&gt;", desc: "Inserează o imagine în pagină. Atribute: src, width, height. Tag auto-închis.", cat: "media" }
];

const ATTRIBUTES = [
  { tag: "href", desc: "Specifică URL-ul destinație al unui link <a>. Ex: href=\"https://google.com\"", cat: "media" },
  { tag: "target", desc: "Determină unde se deschide linkul. target=\"_blank\" = fereastră nouă.", cat: "media" },
  { tag: "src", desc: "Specifică calea/URL-ul sursei unei imagini <img>.", cat: "media" },
  { tag: "colspan", desc: "Permite unei celule <td> să se extindă pe mai multe coloane.", cat: "table" },
  { tag: "rowspan", desc: "Permite unei celule <td> să se extindă pe mai multe rânduri.", cat: "table" },
  { tag: "border", desc: "Setează bordura vizibilă a unui tabel. Ex: border=\"1\".", cat: "table" },
  { tag: "width / height", desc: "Setează dimensiunile unui element (imagine, tabel). Ex: width=\"300\".", cat: "media" },
  { tag: "id", desc: "Identificator unic pentru un element HTML. Folosit pentru ancore și CSS.", cat: "structure" },
  { tag: "color (CSS)", desc: "Proprietate CSS pentru culoarea textului. Ex: color: orange;", cat: "text" },
  { tag: "font-size (CSS)", desc: "Proprietate CSS pentru dimensiunea fontului. Ex: font-size: 16px;", cat: "text" }
];

const QUIZ_DATA = [
  { type: "fill", q: "Tag-ul HTML utilizat pentru a defini un rând într-un tabel este:", a: "tr", hint: "table row" },
  { type: "fill", q: "Tag-ul pentru o listă ordonată (numerotată) este:", a: "ol", hint: "ordered list" },
  { type: "fill", q: "Atributul care deschide un link într-o fereastră nouă este:", a: "target", hint: "target=\"_blank\"" },
  { type: "fill", q: "Tag-ul pentru inserarea unei imagini în pagină este:", a: "img", hint: "auto-închis" },
  { type: "fill", q: "Proprietatea CSS pentru a schimba culoarea textului este:", a: "color", hint: "color: red;" },
  { type: "fill", q: "Atributul care specifică adresa URL a unui link este:", a: "href", hint: "hypertext reference" },
  { type: "fill", q: "Tag-ul HTML pentru text îngroșat (bold) este:", a: "b", hint: "bold" },
  { type: "fill", q: "Tag-ul care definește o celulă de date într-un tabel este:", a: "td", hint: "table data" },
  { type: "fill", q: "Proprietatea CSS pentru dimensiunea textului este:", a: "font-size", hint: "font-size: 16px;" },
  { type: "fill", q: "Atributul care permite unei celule să ocupe mai multe coloane este:", a: "colspan", hint: "column span" },
  { type: "fill", q: "Tag-ul pentru a crea o linie nouă (fără paragraf nou) este:", a: "br", hint: "break" },
  { type: "fill", q: "Tag-ul rădăcină al oricărui document HTML este:", a: "html", hint: "root element" },
  { type: "fill", q: "Tag-ul care definește titlul paginii în tab-ul browserului este:", a: "title", hint: "se află în <head>" },
  { type: "match",
    q: "Potrivește tag-urile cu descrierea lor corectă:",
    pairs: [
      { left: "&lt;ul&gt;", right: "Listă neordonată" },
      { left: "&lt;ol&gt;", right: "Listă ordonată" },
      { left: "&lt;li&gt;", right: "Element de listă" },
      { left: "&lt;p&gt;", right: "Paragraf" }
    ]
  },
  { type: "match",
    q: "Potrivește atributele cu funcția lor:",
    pairs: [
      { left: "href", right: "URL destinație" },
      { left: "target", right: "Fereastră nouă" },
      { left: "colspan", right: "Extindere coloane" },
      { left: "border", right: "Bordură tabel" }
    ]
  }
];

const CHALLENGES = [
  {
    id: 1,
    title: "Titlu + Paragraf",
    task: "Creează un titlu <strong>&lt;h1&gt;</strong> cu textul <strong>\"Școala mea\"</strong> și un paragraf <strong>&lt;p&gt;</strong> cu textul <strong>\"Bine ați venit!\"</strong>.",
    validate(doc) {
      const checks = [];
      const h1 = doc.querySelector("h1");
      checks.push({ text: "Există un tag <h1>", pass: !!h1 });
      checks.push({ text: "H1 conține textul \"Școala mea\"", pass: h1 && h1.textContent.trim().toLowerCase().includes("coala mea") });
      const p = doc.querySelector("p");
      checks.push({ text: "Există un tag <p>", pass: !!p });
      checks.push({ text: "Paragraful conține \"Bine ați venit\"", pass: p && p.textContent.toLowerCase().includes("bine") });
      return checks;
    }
  },
  {
    id: 2,
    title: "Imagine cu dimensiuni",
    task: "Inserează o imagine <strong>&lt;img&gt;</strong> cu <strong>src=\"scoala.jpg\"</strong>, <strong>width=\"300\"</strong> și <strong>height=\"200\"</strong>.",
    validate(doc) {
      const checks = [];
      const img = doc.querySelector("img");
      checks.push({ text: "Există un tag <img>", pass: !!img });
      checks.push({ text: "Atributul src este \"scoala.jpg\"", pass: img && img.getAttribute("src") === "scoala.jpg" });
      checks.push({ text: "Width = 300", pass: img && img.getAttribute("width") === "300" });
      checks.push({ text: "Height = 200", pass: img && img.getAttribute("height") === "200" });
      return checks;
    }
  },
  {
    id: 3,
    title: "Tabel cu bordură",
    task: "Creează un <strong>&lt;table&gt;</strong> cu atributul <strong>border=\"1\"</strong>, care conține cel puțin <strong>2 rânduri</strong> (&lt;tr&gt;) și <strong>2 celule</strong> (&lt;td&gt;) per rând.",
    validate(doc) {
      const checks = [];
      const table = doc.querySelector("table");
      checks.push({ text: "Există un tag <table>", pass: !!table });
      checks.push({ text: "Tabelul are border=\"1\"", pass: table && table.getAttribute("border") === "1" });
      const rows = table ? table.querySelectorAll("tr") : [];
      checks.push({ text: "Cel puțin 2 rânduri <tr>", pass: rows.length >= 2 });
      let cellsOk = true;
      rows.forEach(r => { if (r.querySelectorAll("td,th").length < 2) cellsOk = false; });
      checks.push({ text: "Cel puțin 2 celule per rând", pass: rows.length >= 2 && cellsOk });
      return checks;
    }
  },
  {
    id: 4,
    title: "Liste ordonate",
    task: "Creează o <strong>listă ordonată</strong> (&lt;ol&gt;) cu cel puțin <strong>3 elemente</strong> (&lt;li&gt;).",
    validate(doc) {
      const checks = [];
      const ol = doc.querySelector("ol");
      checks.push({ text: "Există un tag <ol>", pass: !!ol });
      const items = ol ? ol.querySelectorAll("li") : [];
      checks.push({ text: "Cel puțin 3 elemente <li>", pass: items.length >= 3 });
      checks.push({ text: "Elementele au conținut text", pass: items.length >= 3 && [...items].every(li => li.textContent.trim().length > 0) });
      return checks;
    }
  },
  {
    id: 5,
    title: "Link extern",
    task: "Creează un link <strong>&lt;a&gt;</strong> cu textul <strong>\"Google\"</strong>, <strong>href=\"https://google.com\"</strong> și <strong>target=\"_blank\"</strong>.",
    validate(doc) {
      const checks = [];
      const a = doc.querySelector("a");
      checks.push({ text: "Există un tag <a>", pass: !!a });
      checks.push({ text: "Textul linkului este \"Google\"", pass: a && a.textContent.trim().toLowerCase() === "google" });
      checks.push({ text: "href conține \"google.com\"", pass: a && (a.getAttribute("href") || "").includes("google.com") });
      checks.push({ text: "target=\"_blank\"", pass: a && a.getAttribute("target") === "_blank" });
      return checks;
    }
  },
  {
    id: 6,
    title: "Text formatat CSS",
    task: "Creează un paragraf <strong>&lt;p&gt;</strong> cu <strong>style</strong> inline: culoare <strong>orange</strong> și dimensiune font <strong>20px</strong>.",
    validate(doc) {
      const checks = [];
      const p = doc.querySelector("p");
      checks.push({ text: "Există un tag <p>", pass: !!p });
      const style = p ? (p.getAttribute("style") || "") : "";
      checks.push({ text: "Stilul conține color: orange", pass: style.replace(/\s/g,"").includes("color:orange") });
      checks.push({ text: "Stilul conține font-size: 20px", pass: style.replace(/\s/g,"").includes("font-size:20px") });
      return checks;
    }
  }
];

const POINTS_PER_QUIZ = 20;
const CAT_LABELS = { structure: "Structură", text: "Text", list: "Liste", table: "Tabele", media: "Legături & Media" };

// ─── STATE ───
let currentPage = "glossary";
let currentFilter = "all";
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let currentChallenge = 0;
const completedChallenges = new Set();

// ─── DOM REFS ───
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ─── INIT ───
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  renderGlossary();
  renderAttributes();
  initSearch();
  initFilters();
  initQuiz();
  initSandbox();
  initPractica();
});

// ═══════════ NAVIGATION ═══════════
function initNavigation() {
  $$(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      if (page === currentPage) return;
      $$(".nav-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      $$(".page").forEach(p => p.classList.remove("active"));
      $(`#page-${page}`).classList.add("active");
      currentPage = page;
    });
  });
}

// ═══════════ GLOSSARY ═══════════
function renderGlossary(filter = "all", search = "") {
  const grid = $("#glossary-cards");
  const filtered = GLOSSARY.filter(item => {
    const matchCat = filter === "all" || item.cat === filter;
    const matchSearch = !search || item.tag.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map(item => `
    <div class="card" data-cat="${item.cat}">
      <div class="card-tag">${item.tag}</div>
      <div class="card-desc">${item.desc}</div>
      <span class="card-cat cat-${item.cat}">${CAT_LABELS[item.cat]}</span>
    </div>
  `).join("");
}

function renderAttributes(search = "") {
  const grid = $("#attributes-cards");
  const filtered = ATTRIBUTES.filter(item => {
    const matchSearch = !search || item.tag.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search);
    return matchSearch;
  });

  grid.innerHTML = filtered.map(item => `
    <div class="card attr-card" data-cat="${item.cat}">
      <div class="card-tag">${item.tag}</div>
      <div class="card-desc">${item.desc}</div>
      <span class="card-cat cat-${item.cat}">${CAT_LABELS[item.cat]}</span>
    </div>
  `).join("");
}

function initSearch() {
  $("#glossary-search").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    renderGlossary(currentFilter, q);
    renderAttributes(q);
  });
}

function initFilters() {
  $$(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.cat;
      const search = $("#glossary-search").value.toLowerCase().trim();
      renderGlossary(currentFilter, search);
    });
  });
}

// ═══════════ QUIZ ═══════════
function initQuiz() {
  $("#quiz-check").addEventListener("click", checkQuizAnswer);
  $("#quiz-next").addEventListener("click", nextQuizQuestion);
  $("#quiz-restart").addEventListener("click", restartQuiz);
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const data = QUIZ_DATA[quizIndex];
  const total = QUIZ_DATA.length;
  quizAnswered = false;

  // Progress
  $("#progress-fill").style.width = `${((quizIndex) / total) * 100}%`;
  $("#progress-text").textContent = `Întrebarea ${quizIndex + 1} / ${total}`;

  // Question
  $("#quiz-question").innerHTML = data.q;

  // Feedback reset
  const fb = $("#quiz-feedback");
  fb.className = "quiz-feedback";
  fb.textContent = "";

  // Buttons
  $("#quiz-check").style.display = "inline-block";
  $("#quiz-next").style.display = "none";

  // Input area
  const area = $("#quiz-input-area");
  if (data.type === "fill") {
    area.innerHTML = `
      <input type="text" class="quiz-input" id="quiz-answer" placeholder="Scrie răspunsul..." autocomplete="off" />
      <p style="color:var(--text-dim);font-size:.78rem;margin-top:.4rem;">💡 Hint: ${data.hint}</p>
    `;
    setTimeout(() => { const inp = $("#quiz-answer"); if (inp) inp.focus(); }, 100);
  } else if (data.type === "match") {
    const shuffled = [...data.pairs.map(p => p.right)].sort(() => Math.random() - 0.5);
    area.innerHTML = `<div class="match-container">${data.pairs.map((p, i) => `
      <div class="match-row">
        <span class="match-label">${p.left}</span>
        <span style="color:var(--text-dim);">→</span>
        <select class="match-select" data-index="${i}">
          <option value="">— alege —</option>
          ${shuffled.map(r => `<option value="${r}">${r}</option>`).join("")}
        </select>
      </div>
    `).join("")}</div>`;
  }
}

function checkQuizAnswer() {
  if (quizAnswered) return;
  const data = QUIZ_DATA[quizIndex];
  const fb = $("#quiz-feedback");
  let correct = false;

  if (data.type === "fill") {
    const answer = ($("#quiz-answer")?.value || "").trim().toLowerCase().replace(/[<>]/g, "");
    correct = answer === data.a.toLowerCase();
    if (correct) {
      fb.className = "quiz-feedback correct";
      fb.textContent = `✅ Corect! Răspunsul este „${data.a}". +${POINTS_PER_QUIZ} puncte`;
    } else {
      fb.className = "quiz-feedback incorrect";
      fb.textContent = `❌ Greșit! Răspunsul corect era „${data.a}".`;
    }
  } else if (data.type === "match") {
    const selects = $$(".match-select");
    let allCorrect = true;
    selects.forEach((sel, i) => {
      const chosen = sel.value;
      const expected = data.pairs[i].right;
      if (chosen !== expected) allCorrect = false;
      sel.style.borderColor = chosen === expected ? "var(--success)" : "var(--error)";
    });
    correct = allCorrect;
    if (correct) {
      fb.className = "quiz-feedback correct";
      fb.textContent = `✅ Toate potrivirile sunt corecte! +${POINTS_PER_QUIZ} puncte`;
    } else {
      fb.className = "quiz-feedback incorrect";
      fb.textContent = `❌ Unele potriviri sunt greșite. Verifică selecțiile colorate în roșu.`;
    }
  }

  if (correct) quizScore += POINTS_PER_QUIZ;
  quizAnswered = true;
  $("#quiz-check").style.display = "none";
  $("#quiz-next").style.display = "inline-block";
}

function nextQuizQuestion() {
  quizIndex++;
  if (quizIndex >= QUIZ_DATA.length) {
    showQuizResults();
  } else {
    renderQuizQuestion();
  }
}

function showQuizResults() {
  $("#quiz-card").style.display = "none";
  $("#quiz-progress").style.display = "none";
  const results = $("#quiz-results");
  results.style.display = "block";

  const maxScore = QUIZ_DATA.length * POINTS_PER_QUIZ;
  const pct = Math.round((quizScore / maxScore) * 100);

  if (pct >= 80) {
    $("#results-icon").textContent = "🏆";
    $("#results-title").textContent = "Excelent! Ești pregătit pentru teză!";
  } else if (pct >= 50) {
    $("#results-icon").textContent = "👍";
    $("#results-title").textContent = "Bine! Mai exersează puțin.";
  } else {
    $("#results-icon").textContent = "📚";
    $("#results-title").textContent = "Mai ai de lucru. Revizuiește glosarul!";
  }

  $("#results-score").textContent = quizScore;
  $("#results-details").innerHTML = `
    Ai obținut <strong>${quizScore}</strong> din <strong>${maxScore}</strong> puncte (${pct}%).<br>
    Răspunsuri corecte: <strong>${quizScore / POINTS_PER_QUIZ}</strong> din <strong>${QUIZ_DATA.length}</strong>.
  `;
}

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  $("#quiz-card").style.display = "block";
  $("#quiz-progress").style.display = "block";
  $("#quiz-results").style.display = "none";
  renderQuizQuestion();
}

// ═══════════ SANDBOX ═══════════
function initSandbox() {
  renderChallengeSelector();
  loadChallenge(0);

  const editor = $("#code-editor");
  editor.addEventListener("input", () => {
    updateLineNumbers();
    updatePreview();
  });
  editor.addEventListener("scroll", () => {
    $("#line-numbers").style.top = `${42 - editor.scrollTop}px`;
  });
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + "  " + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 2;
      updateLineNumbers();
      updatePreview();
    }
  });

  $("#sandbox-check").addEventListener("click", checkSandboxCode);
  $("#sandbox-reset").addEventListener("click", () => {
    $("#code-editor").value = "";
    updateLineNumbers();
    updatePreview();
    const fb = $("#sandbox-feedback");
    fb.className = "sandbox-feedback";
  });
}

function renderChallengeSelector() {
  const container = $("#challenge-selector");
  container.innerHTML = CHALLENGES.map((ch, i) => `
    <button class="challenge-btn ${i === 0 ? 'active' : ''} ${completedChallenges.has(i) ? 'completed' : ''}" data-idx="${i}">
      ${completedChallenges.has(i) ? '✅' : `#${ch.id}`} ${ch.title}
    </button>
  `).join("");

  container.querySelectorAll(".challenge-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      loadChallenge(parseInt(btn.dataset.idx));
    });
  });
}

function loadChallenge(idx) {
  currentChallenge = idx;
  const ch = CHALLENGES[idx];

  // Update selector
  $$(".challenge-btn").forEach((b, i) => {
    b.classList.toggle("active", i === idx);
  });

  // Description
  $("#challenge-desc").innerHTML = `<strong>Provocarea #${ch.id}:</strong> ${ch.task}`;

  // Clear editor & feedback
  $("#code-editor").value = "";
  updateLineNumbers();
  updatePreview();
  const fb = $("#sandbox-feedback");
  fb.className = "sandbox-feedback";
}

function updateLineNumbers() {
  const lines = ($("#code-editor").value || "").split("\n").length;
  const nums = [];
  for (let i = 1; i <= Math.max(lines, 1); i++) nums.push(i);
  $("#line-numbers").textContent = nums.join("\n");
}

function updatePreview() {
  const code = $("#code-editor").value;
  const frame = $("#preview-frame");
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();
}

function checkSandboxCode() {
  const code = $("#code-editor").value.trim();
  const fb = $("#sandbox-feedback");

  if (!code) {
    fb.className = "sandbox-feedback show error";
    fb.innerHTML = "⚠️ Editorul este gol. Scrie cod HTML mai întâi!";
    return;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(code, "text/html");
  const ch = CHALLENGES[currentChallenge];
  const checks = ch.validate(doc);

  const allPass = checks.every(c => c.pass);
  const somePass = checks.some(c => c.pass);
  const passCount = checks.filter(c => c.pass).length;

  const listHTML = `<ul class="check-list">${checks.map(c =>
    `<li class="${c.pass ? 'pass' : 'fail'}">${c.text}</li>`
  ).join("")}</ul>`;

  if (allPass) {
    fb.className = "sandbox-feedback show success";
    fb.innerHTML = `🎉 <strong>Felicitări!</strong> Toate cerințele sunt îndeplinite! (+15 puncte)${listHTML}`;
    completedChallenges.add(currentChallenge);
    renderChallengeSelector();
  } else if (somePass) {
    fb.className = "sandbox-feedback show partial";
    fb.innerHTML = `⚡ <strong>Aproape!</strong> Ai rezolvat ${passCount}/${checks.length} cerințe. Mai verifică:${listHTML}`;
  } else {
    fb.className = "sandbox-feedback show error";
    fb.innerHTML = `❌ <strong>Mai încearcă.</strong> Nicio cerință nu este îndeplinită încă.${listHTML}`;
  }
}

// ═══════════ PRACTICA ═══════════
function initPractica() {
  const htmlEditor = $("#practica-html-editor");
  const cssEditor = $("#practica-css-editor");
  if (!htmlEditor || !cssEditor) return;

  const updatePracticaPreview = () => {
    const htmlCode = htmlEditor.value;
    const cssCode = cssEditor.value;
    const frame = $("#practica-preview-frame");
    if (!frame) return;
    const doc = frame.contentDocument || frame.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
      </body>
      </html>
    `);
    doc.close();
  };

  const updatePracticaLineNumbers = (editor, linesEl) => {
    if (!linesEl) return;
    const lines = (editor.value || "").split("\n").length;
    const nums = [];
    for (let i = 1; i <= Math.max(lines, 1); i++) nums.push(i);
    linesEl.textContent = nums.join("\\n");
  };

  [htmlEditor, cssEditor].forEach(editor => {
    const linesEl = editor.id === "practica-html-editor" ? $("#practica-html-lines") : $("#practica-css-lines");
    
    editor.addEventListener("input", () => {
      updatePracticaLineNumbers(editor, linesEl);
      updatePracticaPreview();
    });
    
    editor.addEventListener("scroll", () => {
      if (linesEl) linesEl.style.top = `${42 - editor.scrollTop}px`;
    });
    
    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + "  " + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
        updatePracticaLineNumbers(editor, linesEl);
        updatePracticaPreview();
      }
    });
  });

  updatePracticaPreview();
}
