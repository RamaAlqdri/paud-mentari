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

  // 1. Fix Button variants
  content = content.replace(/variant="destructive"/g, 'variant="secondary" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"');
  content = content.replace(/variant="outline"/g, 'variant="secondary"');

  // 2. Fix Form action
  // e.g. <form action={deleteGuru}> -> <form action={async (fd) => { await deleteGuru(fd); }}>
  content = content.replace(/<form action={([a-zA-Z0-9_]+)}>/g, '<form action={async (fd) => { await $1(fd); }}>');

  // 3. Fix missing icons from lucide
  const iconReplacements = {
    'LayoutDashboard': 'RiLayoutDashboardLine',
    'Building': 'RiBuildingLine',
    'FileText': 'RiFileTextLine',
    'Settings': 'RiSettings3Line',
    'Clock': 'RiTimeLine',
    'CheckCircle': 'RiCheckboxCircleLine',
    'Calendar': 'RiCalendarLine',
    'User': 'RiUserLine',
    'ArrowLeft': 'RiArrowLeftLine',
    'RiRiBookOpenLineLine': 'RiBookOpenLine'
  };

  for (const [lucide, remix] of Object.entries(iconReplacements)) {
    // Replace component usage
    content = content.replace(new RegExp(`<${lucide}`, 'g'), `<${remix}`);
    // Replace import
    content = content.replace(new RegExp(`\\b${lucide}\\b`, 'g'), remix);
  }

  // Double check some specific fixes
  content = content.replace(/RiRiArrowRightLineLine/g, 'RiArrowRightLine');
  content = content.replace(/RiRiBookOpenLineLine/g, 'RiBookOpenLine');
  content = content.replace(/<Users/g, '<RiTeamLine');
  content = content.replace(/<BookOpen/g, '<RiBookOpenLine');

  // 4. Fix TextInput type="date" -> Native input
  if (content.includes('type="date"')) {
    content = content.replace(/<TextInput([^>]+)type="date"([^>]*)>/g, '<input$1type="date"$2 className="flex h-10 w-full rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-sm shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted" />');
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

// Fix lib/auth.ts for 'role' type
let authTsPath = './lib/auth.ts';
if (fs.existsSync(authTsPath)) {
  let authTs = fs.readFileSync(authTsPath, 'utf8');
  if (!authTs.includes('declare module "next-auth"')) {
    const augmentation = `
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    role: string;
  }
}
`;
    authTs = augmentation + authTs;
    fs.writeFileSync(authTsPath, authTs, 'utf8');
  }
}

console.log('Fix script 2 completed.');
