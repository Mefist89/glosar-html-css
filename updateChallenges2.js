import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/lib/data.json', 'utf8'));

// Updates for existing 10 challenges
const updates = {
  1: {
    hint: "Folosește <h1> pentru titlu și <p> pentru paragraf. Ambele trebuie să conțină textul specificat.",
    solution: "<h1>Școala mea</h1>\n<p>Bine ați venit!</p>"
  },
  2: {
    hint: "Tag-ul <img> nu are nevoie de tag de închidere. Adaugă atributele în interiorul tag-ului, despărțite de spațiu.",
    solution: "<img src=\"scoala.jpg\" width=\"300\" height=\"200\">"
  },
  3: {
    hint: "Structura este: <table> care conține <tr> (rânduri), care conțin <td> (celule).",
    solution: "<table border=\"1\">\n  <tr>\n    <td>Celulă 1</td>\n    <td>Celulă 2</td>\n  </tr>\n  <tr>\n    <td>Celulă 3</td>\n    <td>Celulă 4</td>\n  </tr>\n</table>"
  },
  4: {
    hint: "Lista ordonată se face cu <ol>. Fiecare element din interior trebuie să fie într-un tag <li>.",
    solution: "<ol>\n  <li>Element 1</li>\n  <li>Element 2</li>\n  <li>Element 3</li>\n</ol>"
  },
  5: {
    hint: "Tag-ul de link este <a>. Nu uita de atributul target='_blank' pentru deschidere în pagină nouă.",
    solution: "<a href=\"https://google.com\" target=\"_blank\">Google</a>"
  },
  6: {
    hint: "Atributul style îți permite să scrii CSS. Proprietățile se despart prin punct și virgulă (;).",
    solution: "<p style=\"color: orange; font-size: 20px;\">Text formatat</p>"
  },
  7: {
    hint: "Tag-ul <meta> este auto-închis. <title> trebuie să aibă și tag de închidere.</title>",
    solution: "<head>\n  <meta charset=\"UTF-8\">\n  <title>Pagina Mea</title>\n</head>"
  },
  8: {
    hint: "Tag-ul <b> face textul îngroșat, iar <i> îl face înclinat. Ambele pot fi folosite în interiorul aceluiași <p>.",
    solution: "<p>Acesta este un text <b>îngroșat</b> și acesta este <i>înclinat</i>.</p>"
  },
  9: {
    hint: "Lista neordonată folosește <ul> (unordered list), iar elementele folosesc <li>.",
    solution: "<ul>\n  <li>Măr</li>\n  <li>Păr</li>\n</ul>"
  },
  10: {
    hint: "În interiorul lui <table> pune un <tr> (rând), iar în el folosește <th> pentru antet.",
    solution: "<table>\n  <tr>\n    <th>Nume</th>\n  </tr>\n</table>"
  }
};

// Add updates to existing
for (let ch of data.challenges) {
  if (updates[ch.id]) {
    ch.hint = updates[ch.id].hint;
    ch.solution = updates[ch.id].solution;
  }
}

// Add 5 new challenges
const newChallenges = [
  {
    "id": 11,
    "title": "Linie nouă fără paragraf nou",
    "task": "Scrie un text pe două rânduri folosind un singur paragraf <p> și tag-ul <br> pentru trecerea la rând nou.",
    "hint": "Tag-ul <br> (break) este auto-închis și forțează o linie nouă.",
    "solution": "<p>Primul rând<br>Al doilea rând</p>",
    "checks": [
      { "desc": "Există un tag <p>", "selector": "p" },
      { "desc": "Există un tag <br> în interiorul <p>", "selector": "p br" }
    ]
  },
  {
    "id": 12,
    "title": "Tabel cu extindere pe coloane",
    "task": "Creează un tabel <table> cu un rând <tr> care conține o singură celulă <td> extinsă pe 2 coloane folosind atributul colspan.",
    "hint": "Folosește atributul colspan=\"2\" direct pe tag-ul <td>.",
    "solution": "<table>\n  <tr>\n    <td colspan=\"2\">Extins</td>\n  </tr>\n</table>",
    "checks": [
      { "desc": "Există un tag <table>", "selector": "table" },
      { "desc": "Există o celulă <td> cu colspan=\"2\"", "selector": "td", "attr": "colspan", "value": "2" }
    ]
  },
  {
    "id": 13,
    "title": "Link intern (ancoră)",
    "task": "Creează un element (de ex. <h2>) cu id=\"contact\" și un link <a> care să trimită către acest ID.",
    "hint": "Atributul href al linkului trebuie să conțină simbolul # urmat de id-ul elementului țintă.",
    "solution": "<h2 id=\"contact\">Contact</h2>\n<a href=\"#contact\">Sari la contact</a>",
    "checks": [
      { "desc": "Există un element cu id=\"contact\"", "selector": "[id='contact']" },
      { "desc": "Există un link către ancoră", "selector": "a", "attr": "href", "valueContains": "#contact" }
    ]
  },
  {
    "id": 14,
    "title": "Subtitlu și text",
    "task": "Creează un titlu de nivel 2 (<h2>) urmat de un titlu de nivel 3 (<h3>).",
    "hint": "Asigură-te că folosești corect <h2> și <h3>, cu tag-uri de deschidere și închidere.",
    "solution": "<h2>Secțiunea principală</h2>\n<h3>Subsecțiunea</h3>",
    "checks": [
      { "desc": "Există un tag <h2>", "selector": "h2" },
      { "desc": "Există un tag <h3>", "selector": "h3" }
    ]
  },
  {
    "id": 15,
    "title": "Document complet HTML",
    "task": "Scrie un document HTML care conține rădăcina <html>, în care se află un <head> și un <body>.",
    "hint": "Elementul <html> trebuie să cuprindă atât <head> cât și <body>. Sunt tag-uri pereche (necesită închidere).",
    "solution": "<html>\n  <head>\n    <title>Titlu</title>\n  </head>\n  <body>\n    <p>Conținut</p>\n  </body>\n</html>",
    "checks": [
      { "desc": "Există un tag <html>", "selector": "html" },
      { "desc": "Există un <head> în <html>", "selector": "html head" },
      { "desc": "Există un <body> în <html>", "selector": "html body" }
    ]
  }
];

const existingIds = new Set(data.challenges.map(c => c.id));
for (const ch of newChallenges) {
  if (!existingIds.has(ch.id)) {
    data.challenges.push(ch);
  }
}

fs.writeFileSync('./src/lib/data.json', JSON.stringify(data, null, 2));
console.log('Challenges updated with hints and solutions!');
