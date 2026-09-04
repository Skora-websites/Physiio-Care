const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(pagesDir);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    if (file.startsWith('Doctor')) {
      content = content.replace(/import Footer from '\.\.\/components\/Footer';/g, "import DoctorFooter from '../components/DoctorFooter';");
      content = content.replace(/<Footer /g, "<DoctorFooter phone={d?.contactPhone} email={d?.contactEmail} ");
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${file}`);
    } else if (file.startsWith('PlayZone')) {
      content = content.replace(/import Footer from '\.\.\/components\/Footer';/g, "import PlayZoneFooter from '../components/PlayZoneFooter';");
      content = content.replace(/<Footer /g, "<PlayZoneFooter phone={d?.contactPhone} email={d?.contactEmail} ");
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${file}`);
    }
  }
});
