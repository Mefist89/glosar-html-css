import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/lib/data.json', 'utf8'));

const ex16 = {
  "id": 16,
  "title": "Evaluare: Pagina școlii",
  "task": "Scrieți codul HTML complet pentru o pagină despre \"Școala mea\" care să conțină:<br>• <b>Titlul paginii</b> (în tab-ul browserului): \"Școala mea\"<br>• Un titlu <b>&lt;h1&gt;</b> cu denumirea liceului<br>• Un paragraf <b>&lt;p&gt;</b> de descriere (ex. când a fost creat)<br>• O listă neordonată <b>&lt;ul&gt;</b> cu minim 3 materii (elemente <b>&lt;li&gt;</b>)<br>• O imagine cu <b>src=\"scoala.jpg\"</b>, lățimea de 300 și înălțimea de 200<br>• Un link extern <b>&lt;a&gt;</b> spre site-ul liceului.",
  "hint": "Nu uita de structura principală: &lt;html&gt;, &lt;head&gt; și &lt;body&gt;. Pune &lt;title&gt; în secțiunea de head, iar restul elementelor în body.",
  "solution": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Școala mea</title>\n  </head>\n  <body>\n    <h1>Liceul Teoretic \"Exemplu\"</h1>\n    <p>Liceul nostru a fost creat în anul 1990 și are o istorie bogată.</p>\n    \n    <ul>\n      <li>Informatică</li>\n      <li>Matematică</li>\n      <li>Limba Română</li>\n    </ul>\n    \n    <img src=\"scoala.jpg\" width=\"300\" height=\"200\" alt=\"Școala mea\">\n    \n    <br><br>\n    <a href=\"https://liceul-exemplu.ro\" target=\"_blank\">Vizitează site-ul școlii</a>\n  </body>\n</html>",
  "checks": [
    { "desc": "Există structura principală (html, head, body)", "selector": "html head, html body", "minCount": 2 },
    { "desc": "Titlul paginii este \"Școala mea\"", "selector": "title", "textContains": "coala mea" },
    { "desc": "Există un titlu <h1>", "selector": "h1" },
    { "desc": "Există un paragraf de descriere <p>", "selector": "p" },
    { "desc": "Există o listă neordonată <ul> cu minim 3 materii <li>", "selector": "ul li", "minCount": 3 },
    { "desc": "Imaginea este scoala.jpg", "selector": "img", "attr": "src", "value": "scoala.jpg" },
    { "desc": "Imaginea are lățimea 300", "selector": "img", "attr": "width", "value": "300" },
    { "desc": "Imaginea are înălțimea 200", "selector": "img", "attr": "height", "value": "200" },
    { "desc": "Există un link <a>", "selector": "a", "attr": "href", "valueContains": "http" }
  ]
};

// Only add if it doesn't exist
const existingIds = new Set(data.challenges.map(c => c.id));
if (!existingIds.has(ex16.id)) {
  data.challenges.push(ex16);
  fs.writeFileSync('./src/lib/data.json', JSON.stringify(data, null, 2));
  console.log('Exercise 16 added successfully!');
} else {
  console.log('Exercise 16 already exists.');
}
