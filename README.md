[![Build Status](https://travis-ci.org/hanreev/types-ol.svg?branch=master)](https://travis-ci.org/hanreev/types-ol)
[![npm version](https://badge.fury.io/js/%40hanreev%2Ftypes-ol.svg)](https://badge.fury.io/js/%40hanreev%2Ftypes-ol)



# OpenLayers TypeScript Definition



~~Definitions from this project will be syncronized with official [**@types/ol**](https://www.npmjs.com/package/@types/ol) package.~~
As of v6.6.0, OpenLayers has officially provided its own TypeScript definitions. Installation of third party package like **@hanreev/types-ol** or [**@types/ol**](https://www.npmjs.com/package/@types/ol) may no longer be needed.

This project contains TypeScript definition for [OpenLayers](https://openlayers.org/) `v6.6.0` that includes all documented API and protected class members and methods.
Check [v5.3.x branch](https://github.com/hanreev/types-ol/tree/v5.3.x) for [OpenLayers](https://openlayers.org/) `v5.3.x` definitions.



## Installation

#### Official package (recommended)

```bash
# NPM
npm i -D @types/ol

# Yarn
yarn add -D @types/ol
```

#### This project package

```bash
# NPM
npm i -D @hanreev/types-ol

# Yarn
yarn add -D @hanreev/types-ol
```



## Usage

- Add `ol` and `ol/*` ro `compilerOptions.paths` in `tsconfig.json`

  ```js
  // file: tsconfig.json
  
  {
    "compilerOptions": {
      ...
      "baseUrl": "./",
      "paths": {
        "ol": ["node_modules/@hanreev/types-ol/ol"],
        "ol/*": ["node_modules/@hanreev/types-ol/ol/*"]
      },
      ...
    }
  }
  ```



## Configuring and Building TypeScript definition files

Configuration is located at `jsdoc/conf.json`

```js
// file: jsdoc/conf.json

{
  "source": {
    ...
    "include": [
      "openlayers/src/ol" // openlayers source
    ]
  },
  ...
  "typescript": {
    "moduleRoot": "openlayers/src", // openlayers source
    "declaration": {
      "mode": "multiple", // "single" will generate all declarations in single index.d.ts file.
      "strictReturnTypes": false // set to true to include undefined and null return.
    }
  },
  ...
}
```

- Install all dependencies

  ```bash
  # NPM
  npm i

  # Yarn
  yarn install
  ```

- Run build

  ```bash
  # NPM
  npm run build-format && npm run lint

  # Yarn
  yarn build-format && yarn lint
  ```

- Run test

  ```bash
  # NPM
  npm run lint-test && npm run test
  
  # Yarn
  yarn lint-test && yarn test
  ```

> **_Note:_**  
> Some definitions were patched manually. If you found any error please [create a new issue](https://github.com/hanreev/types-ol/issues).



## Changelog
[CHANGELOG.md](CHANGELOG.md)



## License

Copyright &copy; 2019 [Rifa'i M. Hanif](https://github.com/hanreev)  
Licensed under [MIT License](LICENSE)
