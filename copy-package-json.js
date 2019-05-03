const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, 'package.json');
const destPath = path.resolve(__dirname, 'ol', 'package.json');

const src = require(srcPath);
delete src.scripts;
delete src.devDependencies;
delete src.files;

fs.writeFileSync(destPath, JSON.stringify(src, null, 2));
