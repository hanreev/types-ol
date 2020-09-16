const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const childProcess = require('child_process');

const BASE_DIR = process.cwd();

let globPattern = path.join(BASE_DIR, '@types', '**', '*.ts');
if (process.argv.includes('--test') || process.argv.includes('-t'))
  globPattern = path.join(BASE_DIR, 'test', '**', '*.ts');

// Run ESLint fixer
childProcess.execSync(`yarn eslint --fix "${globPattern}"`, { stdio: 'inherit' });

// Run prettier
childProcess.execSync(`yarn prettier --loglevel warn --write "${globPattern}"`, { stdio: 'inherit' });

/** @type {Promise<string>[]} */
const promises = [];
glob.sync(globPattern).forEach(filename => {
  promises.push(
    new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf-8', (error, content) => {
        if (error) reject(filename);
        const regex = /^(import .+$\n)\n^(import .+$\n)/gm;
        fs.writeFile(filename, content.replace(regex, '$1$2'), { encoding: 'utf-8' }, err => {
          if (err) reject(filename);
          resolve(filename);
        });
      });
    }),
  );
});

Promise.all(promises)
  .then()
  .catch(filenames => {
    filenames.forEach(fn => console.log('# ERROR:', path.relative(BASE_DIR, fn)));
  })
  .finally(() => {
    console.log('# DONE!!!');
  });
