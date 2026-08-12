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

  // Replace lucide-react with @remixicon/react
  content = content.replace(/from "lucide-react"/g, 'from "@remixicon/react"');
  // Simple icon replacements
  content = content.replace(/<BookOpen/g, '<RiBookOpenLine');
  content = content.replace(/<Users/g, '<RiTeamLine');
  content = content.replace(/<Heart/g, '<RiHeartLine');
  content = content.replace(/<Star/g, '<RiStarLine');
  content = content.replace(/<ArrowRight/g, '<RiArrowRightLine');
  content = content.replace(/<Menu/g, '<RiMenuLine');
  content = content.replace(/<Search/g, '<RiSearchLine');
  content = content.replace(/<Plus/g, '<RiAddLine');
  content = content.replace(/<Trash2/g, '<RiDeleteBinLine');
  content = content.replace(/<Edit/g, '<RiEditLine');
  content = content.replace(/<MapPin/g, '<RiMapPinLine');
  content = content.replace(/<Phone/g, '<RiPhoneLine');
  content = content.replace(/<Mail/g, '<RiMailLine');
  content = content.replace(/<LogOut/g, '<RiLogoutBoxLine');

  // Replace lucide-react imports with Ri equivalent
  content = content.replace(/BookOpen,/g, 'RiBookOpenLine,');
  content = content.replace(/Users,/g, 'RiTeamLine,');
  content = content.replace(/Heart,/g, 'RiHeartLine,');
  content = content.replace(/Star,/g, 'RiStarLine,');
  content = content.replace(/ArrowRight/g, 'RiArrowRightLine');
  content = content.replace(/Search/g, 'RiSearchLine');
  content = content.replace(/Plus/g, 'RiAddLine');
  content = content.replace(/Trash2/g, 'RiDeleteBinLine');
  content = content.replace(/Edit/g, 'RiEditLine');
  content = content.replace(/MapPin/g, 'RiMapPinLine');
  content = content.replace(/Phone/g, 'RiPhoneLine');
  content = content.replace(/Mail/g, 'RiMailLine');
  content = content.replace(/LogOut/g, 'RiLogoutBoxLine');


  // Replace UI imports
  content = content.replace(/import { Button } from "@\/components\/ui\/button"/g, 'import { Button } from "@tremor/react"');
  content = content.replace(/import { Input } from "@\/components\/ui\/input"/g, 'import { TextInput } from "@tremor/react"');
  content = content.replace(/import { Label } from "@\/components\/ui\/label"/g, '');
  
  content = content.replace(/import { Card, CardContent } from "@\/components\/ui\/card"/g, 'import { Card } from "@tremor/react"');
  content = content.replace(/import { Card, CardContent, CardHeader, CardTitle } from "@\/components\/ui\/card"/g, 'import { Card } from "@tremor/react"');
  content = content.replace(/import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@\/components\/ui\/card"/g, 'import { Card } from "@tremor/react"');
  
  content = content.replace(/import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@\/components\/ui\/table"/g, 'import { Table, TableBody, TableCell, TableHead as TableHeaderCell, TableHead, TableRow } from "@tremor/react"');
  
  content = content.replace(/import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@\/components\/ui\/select"/g, 'import { Select, SelectItem } from "@tremor/react"');

  // Components replacement
  content = content.replace(/<CardContent/g, '<div');
  content = content.replace(/<\/CardContent>/g, '</div>');
  content = content.replace(/<CardHeader/g, '<div className="mb-4"');
  content = content.replace(/<\/CardHeader>/g, '</div>');
  content = content.replace(/<CardTitle/g, '<h3 className="text-xl font-semibold"');
  content = content.replace(/<\/CardTitle>/g, '</h3>');
  content = content.replace(/<CardDescription/g, '<p className="text-sm text-gray-500"');
  content = content.replace(/<\/CardDescription>/g, '</p>');
  
  content = content.replace(/<Input /g, '<TextInput ');
  content = content.replace(/<Label /g, '<label className="text-sm font-medium block mb-1" ');
  content = content.replace(/<\/Label>/g, '</label>');

  content = content.replace(/<TableHeader>/g, '<TableHead>');
  content = content.replace(/<\/TableHeader>/g, '</TableHead>');
  content = content.replace(/<TableHead/g, '<TableHeaderCell');
  content = content.replace(/<\/TableHead>/g, '</TableHeaderCell>');

  content = content.replace(/<SelectTrigger.*?>/g, '');
  content = content.replace(/<\/SelectTrigger>/g, '');
  content = content.replace(/<SelectValue/g, '/* SelectValue */ <span');
  content = content.replace(/<\/SelectValue>/g, '</span>');
  content = content.replace(/<SelectContent>/g, '');
  content = content.replace(/<\/SelectContent>/g, '');
  
  if (content !== originalContent) {
    // Add tremor import if not exists but we need it (Card, TextInput, Button)
    if (content.includes('<TextInput') && !content.includes('TextInput } from "@tremor/react"')) {
      content = content.replace('import { Button } from "@tremor/react"', 'import { Button, TextInput } from "@tremor/react"');
    }
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log('Migration script completed.');
