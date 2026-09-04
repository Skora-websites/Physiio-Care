const fs = require('fs');
const path = require('path');

const srcPagesDir = path.join(__dirname, 'src', 'pages');
const srcAdminPagesDir = path.join(__dirname, 'src', 'admin', 'pages');

function processFiles(dir, importPath) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (!file.endsWith('.jsx')) return;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const needsImport = !content.includes('import { getImageUrl }');
    const hasBaseUrlConst = content.includes("const baseUrl = (import.meta.env.VITE_API_URL");
    const hasInlineReplace = content.includes("(import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '')");
    
    let modified = false;

    if (hasBaseUrlConst) {
      content = content.replace(/.*const baseUrl = \(import\.meta\.env\.VITE_API_URL.*\.replace\('\/api', ''\);\n?/g, '');
      content = content.replace(/baseUrl \+ ([a-zA-Z0-9_.]+)\.([a-zA-Z0-9_]+)/g, 'getImageUrl($1.$2)');
      modified = true;
    }

    if (hasInlineReplace) {
      content = content.replace(/\(import\.meta\.env\.VITE_API_URL.*\.replace\('\/api', ''\) \+ ([a-zA-Z0-9_.]+)\.([a-zA-Z0-9_]+)/g, 'getImageUrl($1.$2)');
      modified = true;
    }

    if (modified && needsImport) {
      content = content.replace(/(import React.*?;\n)/, `$1import { getImageUrl } from '${importPath}';\n`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  });
}

processFiles(srcPagesDir, '../utils/imageUrl');
processFiles(srcAdminPagesDir, '../../utils/imageUrl');
