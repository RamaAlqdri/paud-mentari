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

  // Fix double icons
  content = content.replace(/RiRi([A-Za-z]+)LineLine/g, 'Ri$1Line');
  
  // Fix double className
  // E.g. <div className="mb-4" className="flex ...">
  content = content.replace(/className="([^"]+)"\s+className="([^"]+)"/g, 'className="$1 $2"');
  
  // Fix TS issue in admin forms (action prop).
  // If we have an action prop returning a Promise, wrap it or ignore.
  // We can just ignore for now or wait and see if it's still an issue.
  
  // Also missing import in program/page.tsx: "Cannot find name 'RiBookOpenLine'."
  if (file.includes('program/page.tsx') && content.includes('<RiBookOpenLine') && !content.includes('RiBookOpenLine')) {
      content = content.replace('from "@remixicon/react"', 'RiBookOpenLine, } from "@remixicon/react"'); // basic fix
  }
  
  // Also missing import in admin/layout.tsx: "Cannot find name 'Users'."
  content = content.replace(/<Users/g, '<RiTeamLine');
  content = content.replace(/<BookOpen/g, '<RiBookOpenLine');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

// Fix admin/layout.tsx imports
let adminLayout = fs.readFileSync('./app/admin/layout.tsx', 'utf8');
if (adminLayout.includes('lucide-react')) {
    adminLayout = adminLayout.replace(/from "lucide-react"/g, 'from "@remixicon/react"');
    adminLayout = adminLayout.replace(/LayoutDashboard, Users, BookOpen, Settings, LogOut/g, 'RiLayoutDashboardLine, RiTeamLine, RiBookOpenLine, RiSettings3Line, RiLogoutBoxLine');
    adminLayout = adminLayout.replace(/<LayoutDashboard/g, '<RiLayoutDashboardLine');
    adminLayout = adminLayout.replace(/<Settings/g, '<RiSettings3Line');
    adminLayout = adminLayout.replace(/<LogOut/g, '<RiLogoutBoxLine');
    fs.writeFileSync('./app/admin/layout.tsx', adminLayout, 'utf8');
}

// Fix missing types by just running npm install again for tremor and remixicon
console.log('Fix script completed.');
