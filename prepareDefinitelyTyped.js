const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const childProcess = require('child_process');

const olVersion = require('./openlayers/package.json').version.replace(/^(\d+)\.(\d+)(\.\d+)?$/, '$1.$2');

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
  tslint: require('./tslint.json')
};

const header = `// Type definitions for ol ${olVersion}
// Project: https://github.com/openlayers/openlayers, https://openlayers.org
// Definitions by: Rifa'i M. Hanif <https://github.com/hanreev>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

`;

const srcPath = path.resolve(__dirname, '@types', 'ol');
const testSrcPath = path.resolve(__dirname, 'test');
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

// Copy test files
console.log('# Copying test files');
fs.copySync(testSrcPath, path.join(destPath, 'test'));

// Copy test files
console.log('# Writing ol-tests.ts file');
const testContent = glob.sync(path.join(destPath, 'test', '*.ts')).map(testPath => {
  const relPath = path.relative(destPath, testPath).replace(/\\/g, '/');
  return `import './${relPath}';`;
}).join('\n') + '\n';
fs.writeFileSync(path.join(destPath, 'ol-tests.ts'), testContent);

console.log('# Generating tsconfig.json and tslint.json');
// Append .d.ts path to tsconfig files
['*.d.ts', '*[!.d].ts'].forEach(ext => {
  glob.sync(path.join(destPath, '**', ext)).forEach(dtsPath => {
    configs.tsconfig.files.push(path.relative(destPath, dtsPath).replace(/\\/g, '/'));
  });
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
childProcess.execSync('yarn add -D dtslint', { stdio: 'inherit' });
childProcess.execSync('yarn lint ol', { stdio: 'inherit' });
fs.readdirSync(dtPath).forEach(filename => filename != 'types' && fs.removeSync(filename));
process.chdir(__dirname);

console.log('# DONE');
