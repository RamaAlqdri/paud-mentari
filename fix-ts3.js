const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Form action fixes for create* and delete* functions
  content = content.replace(/<form action={createArtikel}/g, '<form action={async (fd) => { await createArtikel(fd); }}');
  content = content.replace(/<form action={createFasilitas}/g, '<form action={async (fd) => { await createFasilitas(fd); }}');
  content = content.replace(/<form action={createGuru}/g, '<form action={async (fd) => { await createGuru(fd); }}');
  content = content.replace(/<form action={createProgram}/g, '<form action={async (fd) => { await createProgram(fd); }}');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log("Fixed create forms");
