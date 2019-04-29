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



### Configuration

```js
// file: tsconfig.json
{
  ...
  "baseUrl": "./",
  "paths": {
    "ol/*": ["node_modules/@hanreev/types-ol/ol/*"]
  },
  ...
}
```





## Configuring and Building TypeScript declaration files

Configuration is located at `jsdoc/conf.json`

```js
// file: jsdoc/conf.json

{
  ...
  "typescript": {
    "moduleRoot": "openlayers/src",
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



## License

Copyright &copy; 2019 [Rifa'i M. Hanif](https://github.com/hanreev)  
Licensed under MIT License
