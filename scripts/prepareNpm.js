const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');

const BASE_DIR = process.cwd();

const srcPath = path.resolve(BASE_DIR, '@types', 'ol');
const destPath = path.resolve(BASE_DIR, 'ol');

console.log('# Preparing definitions before publishing to npmjs');

// Clean
console.log('# Cleaning output directory');
fs.removeSync(destPath);

if (process.argv.includes('--skip-build') || process.argv.includes('-s')) {
  console.log('# Build task is skipped');
} else {
  // Build
  console.log('# Rebuilding definitions');
  childProcess.execSync('yarn build', { stdio: 'inherit' });
  console.log('# Formatting definitions');
  childProcess.execSync('yarn format', { stdio: 'ignore' });
}

// Lint
console.log('# Linting definitions');
childProcess.execSync('yarn lint', { stdio: 'inherit' });

// Test
console.log('# Testing definitions');
childProcess.execSync('yarn format-test', { stdio: 'ignore' });
childProcess.execSync('yarn lint-test', { stdio: 'inherit' });
childProcess.execSync('yarn test', { stdio: 'ignore' });

// Copy
console.log('# Emitting definitions to output directory');
fs.copySync(srcPath, destPath);

// Add package.json
console.log('# Copying package.json');
const packageJsonPath = path.resolve(BASE_DIR, 'package.json');
const packageJsonDestPath = path.join(destPath, 'package.json');

const src = require(packageJsonPath);
delete src.scripts;
delete src.devDependencies;
delete src.files;
delete src.husky;

fs.writeFileSync(packageJsonDestPath, JSON.stringify(src, null, 4));

console.log('# DONE');
