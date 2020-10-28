[![Build Status](https://travis-ci.org/hanreev/types-ol.svg?branch=master)](https://travis-ci.org/hanreev/types-ol)
[![npm version](https://badge.fury.io/js/%40hanreev%2Ftypes-ol.svg)](https://badge.fury.io/js/%40hanreev%2Ftypes-ol)



# OpenLayers TypeScript Definition



> <h3 align="center">Definitions from this project will be syncronized with official <a href="https://www.npmjs.com/package/@types/ol">@types/ol</a> package.</h3>



This project contains TypeScript definition for [OpenLayers](https://openlayers.org/) `v6.4.3` that includes all documented API and protected class members and methods.
Check `v5.3.x` branch for [OpenLayers](https://openlayers.org/) `v5.3.x` definitions.



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

There are several ways to use this package. Please choose one:

- Install as `@types/ol`. This will simulate `@types/ol` installation from `node_modules/@hanreev/types-ol/ol` directory.  
  **Why?**

  - TypeScript compiler will look for types in `node_modules/@types` by default.
  - If you're using [Visual Studio Code](https://code.visualstudio.com/), its IntelliSense will only recognize types from `node_modules/@types`.

  ```js
  // file: package.json

  {
    ...
    "devDependencies": {
      ...
      "@hanreev/types-ol": "^3.4.2",
      "@types/ol": "file:node_modules/@hanreev/types-ol/ol",
      ...
    }
  }
  ```

  then run

  ```bash
  # NPM
  npm i

  # Yarn
  yarn install
  ```

  > **_Note:_**  
  > This package must be installed first before adding `"@types/ol": "file:node_modules/@hanreev/types-ol/ol"` in `package.json`.

- Using `compilerOptions.paths` in `tsconfig.json`

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
      "extraOptions": true, // BaseObject derivatives can accept extra properties.
      "mode": "multiple", // "single" will generate all declarations in single index.d.ts file.
      "strictGenericTypes": false // set to true to extract classes generic type from super class, members and methods.
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
> Some definition was patched manually. If you found any error please [create a new issue](https://github.com/hanreev/types-ol/issues).



## Changelog
[CHANGELOG.md](CHANGELOG.md)



## License

Copyright &copy; 2019 [Rifa'i M. Hanif](https://github.com/hanreev)  
Licensed under [MIT License](LICENSE)
