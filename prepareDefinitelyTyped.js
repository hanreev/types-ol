const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const childProcess = require('child_process');

const configs = {
  tsconfig: {
    compilerOptions: {
      baseUrl: '../',
      forceConsistentCasingInFileNames: true,
      lib: [
        'es6',
        'dom'
      ],
      module: 'commonjs',
      noEmit: true,
      noImplicitAny: true,
      noImplicitThis: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      typeRoots: [
        '../'
      ],
      types: []
    },
    files: []
  },
  tslint: {
    extends: 'dtslint/dt.json',
    rules: {
      'adjacent-overload-signatures': false,
      'array-type': false,
      'max-line-length': false,
      'no-unnecessary-class': false,
      'no-unnecessary-generics': false,
      'unified-signatures': false
    }
  }
};

const header = `// Type definitions for ol 5.3
// Project: https://github.com/openlayers/openlayers, https://openlayers.org
// Definitions by: Rifa'i M. Hanif <https://github.com/hanreev>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

`;

const srcPath = path.resolve(__dirname, '@types', 'ol');
const dtPath = path.resolve(__dirname, 'DefinitelyTyped');
const destPath = path.join(dtPath, 'types', 'ol');

console.log('# Preparing definitions for DefinitelyTyped');

// Clean
console.log('# Cleaning output directory');
fs.removeSync(dtPath);
fs.mkdirpSync(destPath);

// Copy .d.ts files
console.log('# Copying definition files');
fs.copySync(srcPath, destPath);

console.log('# Generating tsconfig.json and tslint.json');
// Append .d.ts path to tsconfig files
glob.sync(path.join(destPath, '**', '*.d.ts')).forEach(dtsPath => {
  configs.tsconfig.files.push(path.relative(destPath, dtsPath));
});

// Write tsconfig.json and tslint.json
for (const key in configs)
  fs.writeFileSync(path.join(destPath, key + '.json'), JSON.stringify(configs[key], null, 4));

// Prepend DefinitelyTyped header to index.d.ts
console.log('# Adding DefinitelyTyped header');
const indexPath = path.join(destPath, 'index.d.ts');
fs.writeFileSync(indexPath, header + fs.readFileSync(indexPath).toString());

// Lint using dtslint
console.log('# Linting definitions using dtslint');
const dtPackageJson = {
  name: 'DefinitelyTyped',
  version: '1.0.0',
  scripts: {
    lint: 'dtslint types'
  }
};
process.chdir(dtPath);
fs.writeFileSync('package.json', JSON.stringify(dtPackageJson, null, 4));
childProcess.execSync('npm i -D dtslint', { stdio: 'inherit' });
childProcess.execSync('npm run lint ol', { stdio: 'inherit' });
fs.readdirSync(dtPath).forEach(filename => filename != 'types' && fs.removeSync(filename));
process.chdir(__dirname);

console.log('# DONE');
