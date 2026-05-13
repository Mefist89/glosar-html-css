import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/lib/data.json', 'utf8'));

const newChallenges = [
  {
    "id": 7,
    "title": "Structura de bază (Head)",
    "task": "Creează secțiunea <head> care să conțină tag-ul <meta charset=\"UTF-8\"> și un <title> cu textul \"Pagina Mea\".",
    "checks": [
      {
        "desc": "Există un tag <head>",
        "selector": "head"
      },
      {
        "desc": "Există un tag <meta> cu charset=\"UTF-8\"",
        "selector": "meta",
        "attr": "charset",
        "value": "UTF-8"
      },
      {
        "desc": "Există un tag <title>",
        "selector": "title"
      },
      {
        "desc": "Titlul conține \"Pagina Mea\"",
        "selector": "title",
        "textContains": "pagina mea"
      }
    ]
  },
  {
    "id": 8,
    "title": "Text cu stiluri (Bold & Italic)",
    "task": "Creează un paragraf <p> care să conțină un cuvânt îngroșat folosind <b> și un cuvânt înclinat folosind <i>.",
    "checks": [
      {
        "desc": "Există un tag <p>",
        "selector": "p"
      },
      {
        "desc": "Există un tag <b> în interiorul <p>",
        "selector": "p b"
      },
      {
        "desc": "Există un tag <i> în interiorul <p>",
        "selector": "p i"
      }
    ]
  },
  {
    "id": 9,
    "title": "Listă neordonată",
    "task": "Creează o listă neordonată <ul> cu cel puțin 2 elemente <li> (ex. Măr, Păr).",
    "checks": [
      {
        "desc": "Există un tag <ul>",
        "selector": "ul"
      },
      {
        "desc": "Cel puțin 2 elemente <li>",
        "selector": "ul li",
        "minCount": 2
      }
    ]
  },
  {
    "id": 10,
    "title": "Celulă de antet (Tabel)",
    "task": "Creează un tabel <table> care conține un rând <tr> cu cel puțin o celulă de antet <th> cu textul \"Nume\".",
    "checks": [
      {
        "desc": "Există un tag <table>",
        "selector": "table"
      },
      {
        "desc": "Există un rând <tr>",
        "selector": "table tr"
      },
      {
        "desc": "Există o celulă de antet <th>",
        "selector": "table tr th"
      },
      {
        "desc": "Antetul conține \"Nume\"",
        "selector": "table tr th",
        "textContains": "nume"
      }
    ]
  }
];

// Ensure no duplicates by ID
const existingIds = new Set(data.challenges.map(c => c.id));

for (const challenge of newChallenges) {
  if (!existingIds.has(challenge.id)) {
    data.challenges.push(challenge);
  }
}

fs.writeFileSync('./src/lib/data.json', JSON.stringify(data, null, 2));
console.log('Challenges updated successfully!');
