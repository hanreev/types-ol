const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const childProcess = require('child_process');

const BASE_DIR = process.cwd();

const jsdocConfigPath = path.resolve(BASE_DIR, 'jsdoc', 'conf.json');
const jsdocConfig = require(jsdocConfigPath);
const olDir = path.resolve(jsdocConfig.typescript.moduleRoot, '..');
const patchesDir = path.resolve(BASE_DIR, 'patches');

if (!fs.existsSync(patchesDir)) {
  console.log('# ERROR:', '"patches" directory does not exist');
  process.exit(1);
}

if (!jsdocConfig.typescript.definition.strictReturnTypes) {
  const testsPatch = path.join(patchesDir, 'internal', 'non-strict-tests.patch');
  if (fs.existsSync(testsPatch)) {
    console.log(`# "strictReturnTypes" is disabled in "${path.relative(BASE_DIR, jsdocConfigPath)}". Applying "${path.basename(testsPatch)}"`);
    childProcess.execSync(`git checkout test`);
    childProcess.execSync(`git apply "${testsPatch}"`);
  }
}

if (!fs.existsSync(olDir)) {
  console.log('# ERROR:', '"openlayers" directory does not exist');
  process.exit(1);
}

const patches = glob.sync(path.join(patchesDir, '*.patch'));

if (!patches.length) {
  console.log('# No patch to apply. Exiting...');
  process.exit();
}

console.log('# Checkout openlayers v5.3.3');
process.chdir(olDir);
childProcess.execSync('git checkout -- .', { stdio: 'inherit' });
childProcess.execSync('git checkout v5.3.3', { stdio: 'inherit' });

console.log('# ===== APPLYING PATCHES =====');
for (const patch of patches) {
  console.log(`# Applying "${path.basename(patch)}"`);
  childProcess.execSync(`git apply "${patch}"`);
}
process.chdir(BASE_DIR);

console.log('# DONE');
