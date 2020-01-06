const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const childProcess = require('child_process');

const { getDefinitelyTyped, consoleLogger } = require('types-publisher');
const { allReferencedFiles } = require('types-publisher/bin/lib/module-info');

const BASE_DIR = process.cwd();

const jsdocConfig = require(path.resolve(BASE_DIR, 'jsdoc', 'conf.json'));
const olDir = path.resolve(jsdocConfig.typescript.moduleRoot, '..');
const olVersion = require(path.resolve(olDir, 'package.json')).version.replace(/^(\d+)\.(\d+)(\..+)?$/, '$1.$2');

const configs = {
  tsconfig: {
    compilerOptions: {
      baseUrl: '../',
      forceConsistentCasingInFileNames: true,
      lib: ['es6', 'dom'],
      module: 'commonjs',
      noEmit: true,
      noImplicitAny: true,
      noImplicitThis: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      typeRoots: ['../'],
      types: [],
    },
    files: ['index.d.ts'],
  },
  tslint: require(path.join(BASE_DIR, 'tslint.json')),
};

const header = `// Type definitions for ol ${olVersion}
// Project: https://github.com/openlayers/openlayers, https://openlayers.org
// Definitions by: Rifa'i M. Hanif <https://github.com/hanreev>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1
// Minimum TypeScript Version: 3.1

// These definitions was generated using jsdoc. See https://github.com/hanreev/types-ol

`;

const srcPath = path.resolve(BASE_DIR, '@types', 'ol');
const dtPath = path.resolve(BASE_DIR, 'DefinitelyTyped');
const destPath = path.join(dtPath, 'types', 'ol');

/**
 * Prepare DefinitelyTyped
 */
function prepareDt() {
  console.log('# Preparing definitions for DefinitelyTyped');

  // Clean
  console.log('# Cleaning output directory');
  fs.removeSync(dtPath);
  fs.mkdirpSync(destPath);

  const dtPackageJson = {
    name: 'DefinitelyTyped',
    version: '1.0.0',
    license: 'UNLICENSED',
    scripts: {
      lint: 'dtslint types',
      test: 'node node_modules/types-publisher/bin/tester/test.js --run-from-definitely-typed',
    },
    dependencies: {
      dtslint: 'latest',
      'types-publisher': 'github:Microsoft/types-publisher#production',
    },
  };
  const dtNotNeededPackagesJson = { packages: [] };
  const gitignorePaths = ['/node_modules', 'yarn.lock', 'yarn-error.log'];
  process.chdir(dtPath);
  fs.writeFileSync('package.json', JSON.stringify(dtPackageJson, null, 4), { encoding: 'utf-8' });
  fs.writeFileSync('notNeededPackages.json', JSON.stringify(dtNotNeededPackagesJson, null, 4), { encoding: 'utf-8' });
  fs.writeFileSync('.gitignore', gitignorePaths.join('\n'), { encoding: 'utf-8' });
  process.chdir(dtPath);
  childProcess.execSync('git init', { stdio: 'inherit' });
  childProcess.execSync('git add --all', { stdio: 'inherit' });
  childProcess.execSync('git commit -m initial', { stdio: 'inherit' });
  process.chdir(BASE_DIR);
}

/**
 * Copy ol definitions
 */
function copyDefinitions() {
  // Copy .d.ts files
  console.log('# Copying definition files');
  fs.copySync(srcPath, destPath);

  console.log('# Generating tsconfig.json and tslint.json');

  // Copy test files
  console.log('# Copying test files');
  fs.copyFileSync(path.resolve('test', 'ol-tests.ts'), path.join(destPath, 'ol-tests.ts'));
  configs.tsconfig.files.push('ol-tests.ts');

  // Write tsconfig.json and tslint.json
  for (const key in configs)
    fs.writeFileSync(path.join(destPath, key + '.json'), JSON.stringify(configs[key], null, 4), { encoding: 'utf-8' });

  // Prepend DefinitelyTyped header to index.d.ts
  console.log('# Adding DefinitelyTyped header');
  const indexPath = path.join(destPath, 'index.d.ts');
  fs.writeFileSync(indexPath, header + fs.readFileSync(indexPath, 'utf-8'));
}

/**
 * Write OTHER_FILES.txt
 */
async function writeOtherFiles() {
  console.log('# Listing and writing other files');

  const options = { definitelyTypedPath: dtPath, progress: true, parseInParallel: true };
  const dt = await getDefinitelyTyped(options, consoleLogger);
  const dtFs = dt.subDir('types').subDir('ol');
  const entryFiles = configs.tsconfig.files;
  const { types, tests } = allReferencedFiles(entryFiles, dtFs, 'ol', path.resolve('./DefinitelyTyped/types/ol'));
  const usedFiles = new Set([...types.keys(), ...tests.keys(), 'tsconfig.json', 'tslint.json']);
  const otherFiles = new Set();
  glob.sync(path.join(destPath, '**', '*.d.ts')).forEach(dtsPath => {
    const dtsRelpath = path.relative(destPath, dtsPath).replace(/\\/g, '/');
    if (!usedFiles.has(dtsRelpath)) otherFiles.add(dtsRelpath);
  });
  fs.writeFileSync(path.join(destPath, 'OTHER_FILES.txt'), Array.from(otherFiles).join('\n'), { encoding: 'utf-8' });
}

/**
 * Lint and test
 */
async function lintAndTest() {
  console.log('# Linting and testing definitions');
  process.chdir(dtPath);
  await writeOtherFiles();
  childProcess.execSync('git add --all', { stdio: 'inherit' });
  childProcess.execSync('git commit -m types-ol', { stdio: 'inherit' });
  childProcess.execSync('yarn install', { stdio: 'inherit' });
  childProcess.execSync('yarn lint ol', { stdio: 'inherit' });
  childProcess.execSync('yarn test', { stdio: 'inherit' });

  console.log('# Cleanup DefinitelyTyped directory');
  fs.readdirSync(dtPath).forEach(filename => filename != 'types' && fs.removeSync(filename));
  process.chdir(BASE_DIR);
}
prepareDt();
copyDefinitions();
lintAndTest().then(() => {
  console.log('# DONE');
});
