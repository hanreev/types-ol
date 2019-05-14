OpenLayers TypeScript Declaration
=================================

This project contains TypeScript declaration for [OpenLayers](https://openlayers.org/) `v5.3.2` that includes all documented API and protected class members and methods.



## Installation

```bash
# NPM
npm i -D @hanreev/types-ol

# Yarn
yarn add -D @hanreev/types-ol
```



### Usage

There are several ways to use this package. Please choose one:

- Install as `@types/ol`. This will simulate `@types/ol` installation from `./node_modules/@hanreev/types-ol/ol` directory.  
  **Why?**
  - TypeScript compiler will look for types in `node_modules/@types` by default.
  - If you're using [Visual Studio Code](https://code.visualstudio.com/), its IntelliSense will only recognize types from `node_modules/@types`.

  ```js
  // file: package.json
  
  {
    ...
    "devDependencies": {
      ...
      "@hanreev/types-ol": "^2.0.1",
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
  > ***Note:***  
  > This package must be installed first before adding `"@types/ol": "file:node_modules/@hanreev/types-ol/ol"` in `package.json`.

- Using `compilerOptions.paths` in `tsconfig.json`
  
  ```js
  // file: tsconfig.json

  {
    "compilerOptions": {
      ...
      "baseUrl": "./",
      "paths": {
        "ol/*": ["node_modules/@hanreev/types-ol/ol/*"]
      },
      ...
    }
  }
  ```

- Using `compilerOptions.typeRoots` and `compilerOptions.types` in `tsconfig.json`

- 
  ```js
  // file: tsconfig.json

  {
    "compilerOptions": {
      ...
      "baseUrl": "./",
      "typeRoots": [
        "node_modules/@types",
        "node_modules/@hanreev/types-ol"
      ],
      "types": [
        "ol",
        ...
      ],
      ...
    }
  }
  ```
  



## Configuring and Building TypeScript declaration files

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
      "strictGenericTypes": false // set to true to extract classes generic type from super class, members and methods.
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




> ***Note:***  
> Some declaration was patched manually. If you found any errors please [create a new issue](https://github.com/hanreev/types-ol/issues).



## Changelog

- **v1.0.2**
  - Sort imports
  - NPM compatibility as `@types/ol` 
- **v1.0.1**
  - Fix `ol/MapBrowserEventType` module
- **v1.0.0**
  - Initial release



## License

Copyright &copy; 2019 [Rifa'i M. Hanif](https://github.com/hanreev)  
Licensed under MIT License
