import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/lib/data.json', 'utf8'));

const newQuestions = [
  { "type": "fill", "q": "Tag-ul care conține meta-informații și setări esențiale (ex. titlul, CSS) este:", "a": "head", "hint": "vine înaintea <body>" },
  { "type": "fill", "q": "Tag-ul care conține tot conținutul vizibil al paginii web este:", "a": "body", "hint": "corpul paginii" },
  { "type": "fill", "q": "Tag-ul folosit pentru cel mai important titlu al paginii (heading 1) este:", "a": "h1", "hint": "heading 1" },
  { "type": "fill", "q": "Tag-ul folosit pentru un titlu secundar (heading 2) este:", "a": "h2", "hint": "heading 2" },
  { "type": "fill", "q": "Tag-ul pentru un titlu de nivel 3 este:", "a": "h3", "hint": "heading 3" },
  { "type": "fill", "q": "Tag-ul pentru un titlu de nivel 4 este:", "a": "h4", "hint": "heading 4" },
  { "type": "fill", "q": "Tag-ul HTML pentru a defini un paragraf este:", "a": "p", "hint": "paragraf" },
  { "type": "fill", "q": "Tag-ul pentru a face textul înclinat (italic) este:", "a": "i", "hint": "italic" },
  { "type": "fill", "q": "Tag-ul (acum depreciat) folosit pentru centrarea textului este:", "a": "center", "hint": "centru" },
  { "type": "fill", "q": "Tag-ul pentru a crea o listă neordonată (cu puncte) este:", "a": "ul", "hint": "unordered list" },
  { "type": "fill", "q": "Tag-ul care reprezintă un singur rând (element) dintr-o listă este:", "a": "li", "hint": "list item" },
  { "type": "fill", "q": "Tag-ul principal pentru crearea unui tabel este:", "a": "table", "hint": "tabel" },
  { "type": "fill", "q": "Tag-ul pentru a defini o celulă de antet (header) într-un tabel este:", "a": "th", "hint": "table header" },
  { "type": "fill", "q": "Tag-ul folosit pentru a crea un hyperlink (ancoră) este:", "a": "a", "hint": "anchor" }
];

// Ensure we don't add duplicates based on the answer ("a" property)
const existingAnswers = new Set(
  data.quiz.filter(q => q.type === 'fill').map(q => q.a)
);

for (const q of newQuestions) {
  if (!existingAnswers.has(q.a)) {
    // Insert before the "match" questions
    const matchIndex = data.quiz.findIndex(item => item.type === 'match');
    if (matchIndex !== -1) {
      data.quiz.splice(matchIndex, 0, q);
    } else {
      data.quiz.push(q);
    }
  }
}

fs.writeFileSync('./src/lib/data.json', JSON.stringify(data, null, 2));
console.log('Quiz updated with all missing tag questions!');
