const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

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
        '../',
        '../../node_modules/@types'
      ],
      types: []
    },
    files: []
  },
  tslint: {
    extends: 'dtslint/dtslint.json'
  }
};

const header = `// Type definitions for ol 5.3
// Project: https://github.com/openlayers/openlayers, https://openlayers.org
// Definitions by: Rifa'i M. Hanif <https://github.com/hanreev>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

`;

const srcPath = path.resolve(__dirname, '@types', 'ol');
const destPath = path.resolve(__dirname, 'DefinitelyTyped', 'types', 'ol');

// Clean
fs.removeSync(destPath);
fs.copySync(srcPath, destPath);

glob.sync(path.join(destPath, '**', '*.d.ts')).forEach(dtsPath => {
  configs.tsconfig.files.push(path.relative(destPath, dtsPath));
});

for (const key in configs)
  fs.writeFileSync(path.join(destPath, key + '.json'), JSON.stringify(configs[key], null, 2));

const indexPath = path.join(destPath, 'index.d.ts')
fs.writeFileSync(indexPath, header + fs.readFileSync(indexPath).toString());
