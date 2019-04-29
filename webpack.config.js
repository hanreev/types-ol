const path = require('path');
const glob = require('glob');

module.exports = {
  entry: () => {
    const entries = {};
    glob.sync('./test/**/*.ts').forEach(file => {
      const basename = path.basename(file).replace(path.extname(file), '');
      entries[basename] = file;
    });
    return entries;
  },
  output: {
    path: path.resolve(__dirname, 'test-out'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  target: 'web',
  mode: 'none',
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            noEmit: false
          }
        }
      }
    ]
  }
};
