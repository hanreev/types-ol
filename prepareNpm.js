const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');

const srcPath = path.resolve(__dirname, '@types', 'ol');
const destPath = path.resolve(__dirname, 'ol');

// Clean
fs.removeSync(destPath);

// Build
childProcess.execSync('npm run build', { stdio: 'inherit' });
childProcess.execSync('npm run format', { stdio: 'inherit' });

// Lint
childProcess.execSync('npm run lint', { stdio: 'inherit' });

// Test
childProcess.execSync('npm run test', { stdio: 'inherit' });

// Copy
fs.copySync(srcPath, destPath);

// Add package.json
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJsonDestPath = path.join(destPath, 'package.json');

const src = require(packageJsonPath);
delete src.scripts;
delete src.devDependencies;
delete src.files;

fs.writeFileSync(packageJsonDestPath, JSON.stringify(src, null, 2));
