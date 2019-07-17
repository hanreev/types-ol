const path = require('path');
const glob = require('glob');
const NoEmitPlugin = require('no-emit-webpack-plugin');

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
    path: path.resolve(__dirname, 'test'),
    filename: '[name].js',
  },
  target: 'web',
  mode: 'none',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            allowJs: false,
            checkJs: false,
            noEmit: false,
          },
        },
      },
    ],
  },
  plugins: [new NoEmitPlugin()],
};
