const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const childProcess = require('child_process');

const BASE_DIR = process.cwd();

const patchesDir = path.resolve(BASE_DIR, 'patches');
const olDir = path.resolve(BASE_DIR, 'openlayers');

if (!(fs.existsSync(patchesDir) && fs.existsSync(olDir))) {
  console.log('# ERROR:', '"patches" directory or "openlayers" directory does not exist');
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

console.log('# DONE');
