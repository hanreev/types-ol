const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const childProcess = require('child_process');

const srcDir = path.resolve('openlayers/examples');
const destDir = path.resolve('test');

const excludeList = [
  'Jugl'
];

let forceOverwrite = process.argv.indexOf('--force') != -1;
let cleanDestDir = process.argv.indexOf('--clean') != -1;

if (!fs.existsSync(srcDir)) {
  console.error('ERROR:', `Source dir "${srcDir}" does not exist.`);
  process.exit(1);
}

if (cleanDestDir)
  fs.removeSync(destDir);
fs.mkdirpSync(destDir);

/**
 * @param {string} srcPath
 */
function processTestFile(srcPath) {
  const basename = path.basename(srcPath).replace(path.extname(srcPath), '');
  const destPath = path.join(destDir, basename + '.ts');

  if (excludeList.indexOf(basename) != -1)
    return;

  if (fs.existsSync(destPath))
    if (forceOverwrite)
      console.log('WARNING:', `Overwriting ${destPath}`);
    else
      return;

  console.log(`# Processing ${srcPath}`);
  let content = fs.readFileSync(srcPath, 'utf-8');

  // Fix ol import
  content = content.replace(/\.\.\/src\/(ol\/.+)\.js/g, '$1');

  // Remove jsdoc comments
  content = content.replace(/\/\*.+?\*\//gs, '');

  // Fix variable types
  content = content.replace(/(const|let)\s([\w\s,]+?);/g, (_, p1, p2) => {
    p2 = p2.split(/,\s?/).map(name => name + ': any').join(', ');
    return `${p1} ${p2};`;
  });

  // Fix parameter types
  content = content.replace(/function\s?(\w+\s?)?\((.*?)\)/g, (_, p1, p2) => {
    p1 = p1 || '';
    p2 = p2 ? p2.split(/,\s?/).map(param => param + ': any').join(', ') : '';
    return `function ${p1}(${p2})`;
  });

  // Fix HTMLInputElement
  content = content.replace(/this\.value/g, '(this as HTMLInputElement).value');

  // Remove multiple blank lines
  content = content.replace(/\n{3,}/g, '\n\n');

  console.log(`# Writing to ${destPath}`);
  fs.writeFileSync(destPath, content);
}

glob.sync(path.join(srcDir, '*.js')).forEach(processTestFile);

console.log('# Formatting test files');
childProcess.execSync('yarn tsfmt -r --useTsconfig tsconfig.test.json', { stdio: 'ignore' });

console.log('# Linting test files');
childProcess.execSync('yarn lint-test', { stdio: 'inherit' });

console.log('# DONE');
