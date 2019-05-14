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
      'no-self-import': false,
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
const destPath = path.resolve(__dirname, 'DefinitelyTyped', 'types', 'ol');

// Clean
fs.removeSync(destPath);
fs.copySync(srcPath, destPath);

glob.sync(path.join(destPath, '**', '*.d.ts')).forEach(dtsPath => {
  configs.tsconfig.files.push(path.relative(destPath, dtsPath));
});

for (const key in configs)
  fs.writeFileSync(path.join(destPath, key + '.json'), JSON.stringify(configs[key], null, 4));

const indexPath = path.join(destPath, 'index.d.ts')
fs.writeFileSync(indexPath, header + fs.readFileSync(indexPath).toString());
