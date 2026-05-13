import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/lib/data.json', 'utf8'));

const enrichData = {
  "<html>": {
    "details": "Elementul rădăcină (root) înconjoară tot conținutul paginii. Orice alt element HTML trebuie să fie plasat în interiorul acestui tag. Adesea include atributul 'lang' pentru a specifica limba paginii.",
    "example": "<!DOCTYPE html>\n<html lang=\"ro\">\n  <!-- conținutul paginii -->\n</html>"
  },
  "<head>": {
    "details": "Secțiunea <head> nu este vizibilă pentru utilizatori în mod direct. Conține setări esențiale pentru browser, precum setul de caractere (meta charset), legăturile către fișierele CSS, și titlul paginii.",
    "example": "<head>\n  <meta charset=\"UTF-8\">\n  <title>Pagina Mea</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>"
  },
  "<title>": {
    "details": "Textul din interiorul tag-ului <title> apare pe tab-ul browserului și este folosit de motoarele de căutare ca titlu principal al paginii în rezultatele căutării.",
    "example": "<title>Lecția 1: Introducere în HTML</title>"
  },
  "<body>": {
    "details": "Orice text, imagine, link sau alt conținut care dorești să apară în fereastra principală a browserului trebuie plasat în interiorul tag-ului <body>.",
    "example": "<body>\n  <h1>Titlu vizibil</h1>\n  <p>Acesta este un text care apare pe ecran.</p>\n</body>"
  },
  "<h1>": {
    "details": "Folosit pentru cel mai important titlu al paginii. Este o bună practică să ai un singur <h1> pe pagină pentru o structură SEO corectă.",
    "example": "<h1>Portofoliul meu de proiecte</h1>"
  },
  "<h2>": {
    "details": "Folosit pentru secțiunile principale ale paginii, fiind subordonat titlului <h1>.",
    "example": "<h2>Proiecte web</h2>\n<p>Aici sunt proiectele pe care le-am creat în HTML.</p>"
  },
  "<h3>": {
    "details": "Titlu de nivelul 3, folosit pentru a divide o secțiune <h2> în subsecțiuni mai mici.",
    "example": "<h3>Proiectul 1: Magazin Online</h3>"
  },
  "<h4>": {
    "details": "Titlu de nivelul 4, util în ierarhii foarte adânci de conținut.",
    "example": "<h4>Specificații tehnice</h4>"
  },
  "<p>": {
    "details": "Folosit pentru a grupa blocuri de text. Browserul adaugă automat o margine (spațiu gol) deasupra și dedesubtul fiecărui paragraf pentru lizibilitate.",
    "example": "<p>HTML înseamnă HyperText Markup Language.</p>\n<p>Este limbajul de bază al web-ului.</p>"
  },
  "<b>": {
    "details": "Atrage atenția asupra unui text, făcându-l vizual mai gros (bold). Pentru a indica importanța semantică (nu doar vizuală), se preferă folosirea tag-ului <strong>.",
    "example": "<p>Atenție: Acest câmp este <b>obligatoriu</b>.</p>"
  },
  "<i>": {
    "details": "Inclină textul (italic). Deseori folosit pentru termeni tehnici, cuvinte din alte limbi sau denumiri de opere. Semantic, este de preferat <em> pentru accentuare.",
    "example": "<p>Numele științific al lupului este <i>Canis lupus</i>.</p>"
  },
  "<center>": {
    "details": "Acest tag a fost folosit în trecut pentru a centra textul și imaginile, dar acum este considerat învechit (depreciat). Astăzi, centrarea se face exclusiv prin CSS (ex: text-align: center).",
    "example": "<!-- Nu este recomandat -->\n<center>Text centrat</center>\n\n<!-- Varianta modernă -->\n<div style=\"text-align: center;\">Text centrat</div>"
  },
  "<br>": {
    "details": "Fortează trecerea la o linie nouă. Spre deosebire de paragraf (<p>), nu adaugă spațiu suplimentar între linii. Este util pentru poezii sau adrese.",
    "example": "<p>Strada Mihai Eminescu nr. 1<br>\nBucurești, România</p>"
  },
  "<ul>": {
    "details": "Un container pentru liste în care ordinea elementelor nu este importantă. Elementele din interior (< li >) vor fi marcate implicit cu un punct rotund (bullet).",
    "example": "<ul>\n  <li>Mere</li>\n  <li>Pere</li>\n  <li>Banane</li>\n</ul>"
  },
  "<ol>": {
    "details": "Un container pentru liste în care ordinea contează (cum ar fi pașii unei rețete). Elementele vor fi numerotate automat (1, 2, 3...).",
    "example": "<ol>\n  <li>Deschideți editorul.</li>\n  <li>Scrieți codul HTML.</li>\n  <li>Salvați fișierul.</li>\n</ol>"
  },
  "<li>": {
    "details": "Reprezintă un singur rând (element) dintr-o listă. Trebuie să fie întotdeauna plasat în interiorul unui tag <ul> sau <ol>.",
    "example": "<li>Acesta este un element din listă</li>"
  },
  "<table>": {
    "details": "Elementul principal pentru crearea unui tabel. Găzduiește rândurile (<tr>) și celulele (<td>, <th>).",
    "example": "<table border=\"1\">\n  <tr>\n    <th>Nume</th>\n    <th>Nota</th>\n  </tr>\n  <tr>\n    <td>Ion</td>\n    <td>10</td>\n  </tr>\n</table>"
  },
  "<tr>": {
    "details": "Definește un rând orizontal în interiorul unui tabel. Conține de obicei celule <th> (pentru antet) sau <td> (pentru date).",
    "example": "<tr>\n  <td>Măr</td>\n  <td>5 RON</td>\n</tr>"
  },
  "<td>": {
    "details": "Reprezintă o singură celulă care conține informații. Mai multe tag-uri <td> formează coloanele unui rând <tr>.",
    "example": "<td>Informație 1</td>"
  },
  "<th>": {
    "details": "Similar cu <td>, dar folosit pentru titlurile coloanelor sau rândurilor (antet). Textul din interior va fi automat aliniat pe centru și îngroșat de către browser.",
    "example": "<th>Numele Elevului</th>"
  },
  "<a>": {
    "details": "Ancora (Anchor) transformă orice conținut din interiorul său într-un link care poate fi apăsat. Atributul obligatoriu este 'href', care indică destinația.",
    "example": "<a href=\"https://wikipedia.org\">Vizitează Wikipedia</a>"
  },
  "<img>": {
    "details": "Afișează o imagine. Nu are tag de închidere. Necesită atributul 'src' pentru adresa imaginii și atributul 'alt' pentru un text descriptiv (util pentru accesibilitate).",
    "example": "<img src=\"pisica.jpg\" alt=\"O pisică jucăușă\" width=\"200\">"
  },
  "href": {
    "details": "Hypertext Reference - este cel mai important atribut al tag-ului <a>. Fără el, link-ul nu duce nicăieri.",
    "example": "<a href=\"contact.html\">Contactează-ne</a>"
  },
  "target": {
    "details": "Controlează locul unde se va deschide pagina legată de un link. Valoarea '_blank' instruiește browserul să deschidă link-ul într-un tab sau o fereastră nouă.",
    "example": "<a href=\"https://google.com\" target=\"_blank\">Google</a>"
  },
  "src": {
    "details": "Source (sursă) - indică browserului de unde să descarce fișierul imaginii. Poate fi o cale relativă (din același dosar) sau absolută (o adresă de pe internet).",
    "example": "<img src=\"https://exemplu.ro/logo.png\" alt=\"Logo\">"
  },
  "colspan": {
    "details": "Column Span - forțează o celulă dintr-un tabel (<td> sau <th>) să se extindă orizontal, combinând mai multe coloane într-una singură.",
    "example": "<tr>\n  <td colspan=\"2\">Această celulă ocupă 2 coloane</td>\n</tr>"
  },
  "rowspan": {
    "details": "Row Span - forțează o celulă să se extindă vertical, acoperind mai multe rânduri din tabel.",
    "example": "<tr>\n  <td rowspan=\"2\">Ocupă 2 rânduri</td>\n  <td>Celula 2</td>\n</tr>"
  },
  "border": {
    "details": "Adaugă o linie simplă vizibilă în jurul tabelului și a celulelor sale. Deși încă suportat, este preferat să folosiți CSS pentru stilizarea marginilor.",
    "example": "<table border=\"1\">\n  <!-- conținutul tabelului -->\n</table>"
  },
  "width / height": {
    "details": "Setează lățimea (width) și înălțimea (height) elementului în pixeli. Folosit des pentru imagini sau videoclipuri pentru a le ajusta proporțiile.",
    "example": "<img src=\"poza.jpg\" width=\"500\" height=\"300\" alt=\"Peisaj\">"
  },
  "id": {
    "details": "Un identificator unic pe pagină. Un singur element poate avea un anumit 'id'. Este folosit pentru a lega codul JavaScript de element sau pentru link-uri către părți specifice ale paginii (ancore).",
    "example": "<div id=\"sectiunea-contact\">\n  <h2>Contact</h2>\n</div>\n<!-- Link către secțiune: -->\n<a href=\"#sectiunea-contact\">Mergi la contact</a>"
  },
  "color (CSS)": {
    "details": "Aceasta este o regulă CSS, nu un atribut HTML. Se adaugă în interiorul atributului 'style' (sau într-un fișier separat) pentru a colora textul.",
    "example": "<p style=\"color: red;\">Acest text este roșu.</p>"
  },
  "font-size (CSS)": {
    "details": "Regulă CSS utilizată pentru a controla cât de mare este textul, adesea setat în pixeli (px), em sau rem.",
    "example": "<p style=\"font-size: 24px;\">Acest text este mai mare.</p>"
  }
};

data.glossary = data.glossary.map(item => {
  if (enrichData[item.tag]) {
    return { ...item, ...enrichData[item.tag] };
  }
  return item;
});

data.attributes = data.attributes.map(item => {
  if (enrichData[item.tag]) {
    return { ...item, ...enrichData[item.tag] };
  }
  return item;
});

fs.writeFileSync('./src/lib/data.json', JSON.stringify(data, null, 2));
console.log('data.json updated successfully!');
