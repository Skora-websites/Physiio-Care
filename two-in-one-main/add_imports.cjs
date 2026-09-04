const fs = require('fs');
const path = require('path');

const srcPagesDir = path.join(__dirname, 'src', 'pages');
const srcAdminPagesDir = path.join(__dirname, 'src', 'admin', 'pages');

function addImports(dir, importPath) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (!file.endsWith('.jsx')) return;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('getImageUrl(') && !content.includes('import { getImageUrl }')) {
      content = `import { getImageUrl } from '${importPath}';\n` + content;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added import to ${file}`);
    }
  });
}

addImports(srcPagesDir, '../utils/imageUrl');
addImports(srcAdminPagesDir, '../../utils/imageUrl');
