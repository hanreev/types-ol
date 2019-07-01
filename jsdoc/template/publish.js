/* global env */

const path = require('path');
const catharsis = require('catharsis');

const fs = require('fs-extra');
const helper = require('jsdoc/lib/jsdoc/util/templateHelper');
const logger = require('jsdoc/lib/jsdoc/util/logger');

const outDir = path.resolve(env.opts.destination);

/** @type {DeclarationConfig} */
const declarationConfig = env.conf.typescript.declaration;

/** @type {*} */
let data;

/** @type {Object<string, ModuleImports>} */
const MODULE_IMPORTS = {};

/** @type {Object<string, ModuleExports>} */
const MODULE_EXPORTS = {};

/** @type {Object<string, Doclet[]>} */
const MODULE_CHILDREN = {};

/** @type {string[]} */
const EXTERNAL_MODULE_WHITELIST = [
  'arcgis-rest-api',
  'geojson',
  'topojson-specification',
];

/** @type {Object<string, string>} */
const GENERIC_TYPES = {
  'module:ol/Collection.CollectionEvent': 'T'
};

/** @type {string[]} */
const ANY_GENERIC_TYPES = [
  'module:ol/structs/LRUCache~LRUCache',
  'module:ol/structs/PriorityQueue~PriorityQueue',
  'module:ol/structs/RBush~RBush',
];

/** @type {Object<string, string>} */
const TYPE_PATCHES = {
  'module:ol/Collection.CollectionEvent#element': 'T',
  'module:ol/events/condition~always': 'typeof:module:ol/functions.TRUE',
  'module:ol/events/condition~never': 'typeof:module:ol/functions.FALSE',
  'module:ol/format/GML~GML': 'module:ol/format/GML3~GML3',
  'module:ol/source/Cluster~Cluster#geometryFunction': 'function(module:ol/Feature~Feature): module:ol/geom/Point~Point',
  'module:ol/style/IconImageCache~shared': 'module:ol/style/IconImageCache~IconImageCache',
};

/** @type {Object<string, string[]>} */
const PARAM_TYPE_PATCHES = {
  // 'module:ol/layer/Tile~TileLayer': ['opt_options', 'module:ol/layer/Tile~Options'],
  // 'module:ol/layer/VectorTile~VectorTileLayer': ['opt_options', 'module:ol/layer/VectorTile~Options'],
};

/** @type {Object<string, Object<string, string[]>>} */
const PROPERTY_TYPE_PATCHES = {
  'module:ol/control/Attribution~Options': { label: ['string', 'HTMLElement'] },
  'module:ol/control/FullScreen~Options': {
    label: ['string', 'Text', 'HTMLElement'],
    labelActive: ['string', 'Text', 'HTMLElement'],
  },
};

/** @type {Object<string, string[]>} */
const IMPORT_PATCHES = {
  'module:ol/control': ['module:ol/control/util~DefaultsOptions'],
  'module:ol/geom/LinearRing': ['module:ol/geom/GeometryLayout~GeometryLayout'],
  'module:ol/geom/LineString': ['module:ol/geom/GeometryLayout~GeometryLayout'],
  'module:ol/geom/MultiLineString': ['module:ol/geom/GeometryLayout~GeometryLayout'],
  'module:ol/geom/MultiPolygon': ['module:ol/geom/GeometryLayout~GeometryLayout'],
  'module:ol/geom/Polygon': ['module:ol/geom/GeometryLayout~GeometryLayout'],
  'module:ol/proj': ['module:ol/proj/Units~Units'],
  'module:ol/source/Cluster': ['module:ol/geom/Point~Point'],
  'module:ol/tilegrid': ['module:ol/extent/Corner~Corner'],
};

/** @type {Object<string, string[]>} */
const MEMBER_PATCHES = {};

/**
 * @param {Object<string, *>} spec
 * @returns {Doclet[]}
 */
function find(spec) {
  return helper.find(data, spec);
}

/**
 * @param {Doclet} _module
 * @param {string} val
 * @returns {string}
 */
function registerImport(_module, val) {
  if (!val.startsWith('module:'))
    return val;

  const value = val.replace(/^module:/, '');

  /** @type {ModuleImports} */
  const _imports = MODULE_IMPORTS[_module.name] || {
    names: [],
    imported: {},
    expressions: [],
  };

  /** @type {boolean} */
  let isDefault;
  /** @type {string[]} */
  let splits;
  /** @type {string} */
  let moduleName;
  /** @type {string} */
  let importName;
  let temp;

  if (value.indexOf('.') != -1) {
    isDefault = false;
    splits = value.split('.');
  } else {
    isDefault = true;
    splits = value.split('~');
  }

  if (splits.length == 2) {
    moduleName = splits[0];
    importName = splits[1];
  } else {
    moduleName = value;
    importName = value.split('/').pop();
  }

  if (!moduleName.startsWith('ol'))
    isDefault = false;

  if (_module.name == value || _module.name == moduleName || importName == 'EventTarget')
    return importName;

  if (_imports.imported[value])
    return _imports.imported[value];

  let doclet = find({ longname: val })[0];

  if (!doclet && moduleName.startsWith('ol')) {
    doclet = find({ name: importName, memberof: _module.longname })[0];
    if (doclet)
      return importName;
  }

  if (!doclet && moduleName.startsWith('ol')) {
    splits = val.indexOf('~') != -1 ? val.split('~') : val.split('.');
    if (splits.length == 2) {
      temp = splits[0].split('/');
      temp[temp.length - 1] = splits[1];
      doclet = find({ longname: temp.join('/') })[0];
      if (doclet)
        return registerImport(_module, doclet.longname);
    }
  }

  if (!doclet && EXTERNAL_MODULE_WHITELIST.indexOf(moduleName) == -1)
    logger.warn('Invalid import or external module --', val, 'in', _module.name);

  let counter = 1;
  let availableImportName = importName;

  if (find({ name: importName, memberof: _module.longname }).length) {
    availableImportName = `${importName}_${counter}`;
    counter++;
  }

  while (_imports.names.indexOf(availableImportName) != -1) {
    availableImportName = `${importName}_${counter}`;
    counter++;
  }

  _imports.imported[value] = availableImportName;
  _imports.names.push(availableImportName);
  let expression = availableImportName;
  const _exports = MODULE_EXPORTS[moduleName];
  if ((_exports && _exports.default != importName && _exports.default != `module:${moduleName}`) || !isDefault)
    expression = importName == availableImportName ? `{ ${importName} }` : `{ ${importName} as ${availableImportName} }`;
  _imports.expressions.push(`import ${expression} from '${moduleName}';`);
  MODULE_IMPORTS[_module.name] = _imports;

  return availableImportName;
}

/**
 * @param {string[]} expressions
 * @param {Doclet} _module
 * @returns {string[]}
 */
function relativeImport(expressions, _module) {
  if (!Array.isArray(expressions))
    return logger.error('relativeImport -- Invalid argument:', expressions);

  if (declarationConfig.mode == 'single')
    return expressions;

  const moduleDirname = _module.name == 'ol' ? 'ol' : path.dirname(_module.name);

  return expressions.map(expression => {
    const match = expression.match(/^((import|export)\s.+?\sfrom\s['"])(.+?)(['"];)$/);

    if (!match)
      return expression;

    let fromPath = match[3];

    if (!fromPath.startsWith('ol'))
      return expression;

    fromPath = path.relative(moduleDirname, fromPath).replace(/\\/g, '/');

    if (!fromPath)
      fromPath = '../' + path.basename(moduleDirname);
    else if (!fromPath.startsWith('.'))
      fromPath = './' + fromPath;

    return match[1] + fromPath + match[4];
  });
}

/**
 * @param {string[]} expressions
 * @param {Doclet} _module
 * @param {number} [maxLineLength=120]
 * @returns {string[]}
 */
function sortImports(expressions, _module, maxLineLength = 120) {
  if (!Array.isArray(expressions))
    return logger.error('sortImports -- Invalid argument:', expressions);

  /**
   * @typedef ImportMap
   * @prop {string} default
   * @prop {string[]} members
   */

  /** @type {Object<string, ImportMap>} */
  const importMap = {};

  /**
   * @param {string} a
   * @param {string} b
   * @returns {number}
   */
  const sortFn = (a, b) => {
    a = a.toLowerCase().replace(/^\.\//, 'zz').replace(/^\.\.\//, 'za');
    b = b.toLowerCase().replace(/^\.\//, 'zz').replace(/^\.\.\//, 'za');
    return a < b ? -1 : a > b ? 1 : 0;
  };

  const formatExpression = (moduleName, multiLine = false) => {
    const map = importMap[moduleName];
    let expression = 'import ';
    if (map.default)
      expression += map.default;
    if (map.members && map.members.length) {
      if (map.default)
        expression += ', ';
      if (multiLine)
        expression += `{\n${map.members.join(',\n')}\n}`;
      else
        expression += `{ ${map.members.join(', ')} }`;
    }
    expression += ` from '${moduleName}';`;
    if (!multiLine && expression.length > maxLineLength)
      return formatExpression(moduleName, true);
    return expression;
  };

  // Relative import ol modules
  expressions = relativeImport(expressions, _module);

  expressions.filter(expression => expression.search(/= require/) == -1)
    .forEach(expression => {
      /** @type {RegExpMatchArray} */
      const match = expression.match(/^import (?:([^{]+?),\s?)?(.+?) from ['"](.+?)['"];?$/);
      if (!match)
        return logger.error('sortImports -- Invalid expression:', expression);

      let importDefault = match[1] && match[1].trim();
      let importMembers = match[2];
      const moduleName = match[3];

      if (/{.+}/.test(importMembers)) {
        importMembers = importMembers.replace(/{\s?(.+?)\s?}/, '$1');
      } else {
        importDefault = importMembers;
        importMembers = undefined;
      }

      /** @type {ImportMap} */
      const map = {
        default: importDefault,
        members: importMembers ? importMembers.split(/,\s?/) : [],
      };

      if (!importMap[moduleName]) {
        importMap[moduleName] = map;
      } else {
        importMap[moduleName].default = importMap[moduleName].default || map.default;
        importMap[moduleName].members = importMap[moduleName].members.concat(map.members);
      }

      importMap[moduleName].members = importMap[moduleName].members.sort(sortFn);
    });

  return Object.keys(importMap).sort(sortFn).map(moduleName => formatExpression(moduleName));
}

/**
 * @param {ParsedType} parsedType
 * @param {Doclet} _module
 * @returns {string}
 */
function stringifyType(parsedType, _module, undefinedLiteral = true) {
  let suffix = '';
  let typeStr = (/** @type {TypeApplication} */ (parsedType)).expression ?
    (/** @type {TypeApplication} */ (parsedType)).expression.name :
    (/** @type {TypeNameExpression} */ (parsedType)).name;

  if (typeStr in GENERIC_TYPES)
    suffix = `<${GENERIC_TYPES[typeStr]}>`;

  if (typeStr && typeStr.startsWith('module:')) {
    if (_module)
      typeStr = registerImport(_module, typeStr);
    typeStr = typeStr.split('~')[1] || typeStr.split('.')[1] || typeStr.split('/').pop();
  }

  if (parsedType.type == 'TypeApplication') {
    const applications = (/** @type {TypeApplication} */ (parsedType)).applications.map(app => {
      const t = stringifyType(app, _module);
      return t == 'undefined' ? 'any' : t;
    });

    switch (typeStr) {
      case 'Array':
        typeStr = applications[0] + '[]';
        break;

      case 'Object':
        if (applications[0] != 'number' && applications[0] != 'string')
          typeStr = `{ [key in ${applications[0]}]: ${applications[1]} }`;
        else
          typeStr = `{ [key: ${applications[0]}]: ${applications[1]} }`;
        break;

      case 'Class':
        typeStr = applications.join(', ');
        break;

      default:
        typeStr += `<${applications.join(', ')}>`;
        break;
    }
  } else if (parsedType.type == 'FunctionType') {
    const functionType = (/** @type {TypeFunction} */ (parsedType));
    let params = [];
    let returnType = 'void';

    if (functionType.params)
      params = functionType.params.map((param, i) => {
        let name = `p${i}`;
        if (param.optional) name += '?';
        return `${name}: ${stringifyType(param, _module, false)}`;
      });

    if (functionType.this)
      params.unshift('this: ' + stringifyType(functionType.this, _module, false));

    if (functionType.result && (/** @type {TypeNameExpression} */ (functionType.result)).name != 'void')
      returnType = stringifyType(functionType.result, _module);

    typeStr = `(${params.join(', ')}) => ${returnType == 'undefined' ? 'void' : returnType}`;
  } else if (parsedType.type == 'TypeUnion') {
    const unionType = (/** @type {TypeUnion} */ (parsedType));
    const union = unionType.elements.map(t => stringifyType(t, _module)).filter(t => ['void', 'undefined'].indexOf(t) == -1);
    typeStr = union.join(' | ');
    if (union.length > 1)
      typeStr = `(${typeStr})`;
  } else {
    typeStr += suffix;
  }

  if (!typeStr)
    typeStr = 'any';

  if (typeStr == 'Array')
    typeStr = 'any[]';
  else if (typeStr == 'Object')
    typeStr = 'object';
  else if (typeStr == 'undefined' && !undefinedLiteral)
    typeStr = 'any';

  return typeStr;
}

/**
 * @param {string} type
 * @param {Doclet} _module
 * @returns {string}
 */
function parseFunctionType(type, _module) {
  if (!type.startsWith('function'))
    return;

  let params = '';
  let returnType = 'void';
  let expression = `(${params}) => ${returnType}`;

  /** @type {TypeFunction} */
  let parsedType;
  let loopCounter = 0;

  do {
    try {
      parsedType = catharsis.parse(type, { jsdoc: true });
    } catch (error) {
      type = type.replace(/\)$/, '');
    }
    loopCounter++;
  } while (!parsedType && loopCounter < 3);

  if (parsedType)
    expression = stringifyType(parsedType, _module);
  else
    logger.error('parseFunctionType --', type, _module.name);

  return `(${expression})`;
}

/** @type {DocletParser} */
function parseConstFunctionType(doclet, _module) {
  const params = getParams(doclet, _module);
  const returnType = getReturnType(doclet, _module);

  // Wrap arrow function in braces
  return `((${params}) => ${returnType})`;
}

/** @type {DocletParser} */
function getType(doclet, _module) {
  if (!doclet.type)
    if (doclet.params || doclet.yields || doclet.returns) {
      return parseConstFunctionType(doclet, _module);
    } else {
      logger.warn('Undefined type --', doclet.longname, 'in', _module.name);
      return 'any';
    }

  let types = doclet.type.names.map(type => {
    /** @type {ParsedType} */
    let parsedType;
    let prefix = '';

    if (_module.name == 'ol/source/Raster' && type == 'RasterOperationType')
      return `'pixel' | 'image'`;

    if (type.startsWith('typeof:')) {
      prefix = 'typeof ';
      type = type.replace(/^typeof:/, '');
    }

    const objRegex = /^\[ '(.+)' \](\..+)$/;
    if (objRegex.test(type))
      type = type.replace(objRegex, '$1$2');

    if (type.startsWith('function'))
      type = parseFunctionType(type, _module);
    else
      try {
        parsedType = catharsis.parse(type, { jsdoc: true });
        type = stringifyType(parsedType, _module);
      } catch (error) {
        logger.error('getType --', doclet.longname || _module.longname, type);
      }

    return prefix + type;
  }).filter(t => t != 'undefined');

  if (types.length > 1 && types.indexOf('any') != -1)
    types = types.filter(t => t != 'any');

  if (types.length == 1 && types[0] == 'object')
    types[0] = 'any';

  return types.join(' | ') || 'any';
}

/** @type {DocletParser} */
function getReturnType(doclet, _module) {
  const returnTypes = [];

  if (doclet.yields || doclet.returns)
    (doclet.yields || doclet.returns).forEach(r => {
      returnTypes.push(getType((/** @type {Doclet} */ (r)), _module));
    });

  return returnTypes.join(' | ') || 'void';
}

/** @type {DocletParser} */
function getParams(doclet, _module) {
  if (!doclet.params)
    return '';

  return doclet.params.filter(param => param.name.indexOf('.') == -1)
    .map(param => {
      let name = param.name;
      let paramType = getType((/** @type {Doclet} */ (param)), _module);

      if (param.optional && !param.defaultValue)
        name += '?';

      if (param.variable) {
        name = '...' + name;
        if (paramType.indexOf('|') != -1)
          paramType = `(${paramType})`;
        paramType += '[]';
      }

      const paramStr = `${name}: ${paramType}`;
      return param.defaultValue ? `${paramStr} = ${param.defaultValue}` : paramStr;
    }).join(', ');
}

/**
 * @param {Doclet} doclet
 * @param {string} decl
 * @param {Doclet} _module
 * @returns {string}
 */
function declaration(doclet, decl, _module) {
  let prefix = '';
  let suffix = '';

  if (_module && _module.exports)
    if (doclet.name == _module.exports.default)
      if (doclet.isEnum || doclet.kind == 'constant') {
        prefix = declarationConfig.mode == 'single' ? '' : 'declare ';
        suffix = `\n\nexport default ${registerImport(_module, doclet.name)};`;
      } else {
        prefix = 'export default ';
      }
    else if (_module.exports.exports.indexOf(doclet.name) != -1)
      prefix = 'export ';

  return prefix + decl + suffix;
}

const PROCESSORS = {
  /** @type {DocletParser} */
  class: (doclet, _module) => {
    const children = [];
    let name = doclet.name;

    if (doclet.longname in GENERIC_TYPES)
      name += `<${GENERIC_TYPES[doclet.longname]}>`;

    if (doclet.augments && doclet.augments.length) {
      const augment = doclet.augments[0];
      let augmentName = registerImport(_module, augment);
      augmentName = augment.split('~')[1] || augment.split('/').pop();
      if (augment in GENERIC_TYPES)
        if (ANY_GENERIC_TYPES.indexOf(augment) != -1)
          augmentName += '<any>';
        else
          augmentName += `<${GENERIC_TYPES[augment]}>`;
      name += ` extends ${augmentName}`;
    }

    if (!doclet._hideConstructor)
      children.push(`constructor(${getParams(doclet, _module)});`);

    data({
      kind: ['member', 'constant', 'function'],
      inheritdoc: { '!is': true },
      inherited: { '!is': true },
      memberof: doclet.longname
    }).order('access, kind desc, name').get().forEach(child => {
      // Remove non alphanumeric from member name
      child.name = child.name.replace(/\W/g, '');
      const processorName = child.kind == 'function' ? 'method' : child.kind == 'constant' ? 'member' : child.kind;
      children.push(PROCESSORS[processorName](child, _module));
    });

    /**
     * @param {string} eventType
     * @param {string} fireType
     */
    const addFire = (eventType, fireType) => {
      if (fireType.startsWith('ol'))
        fireType = 'module:' + fireType;

      let genericType = GENERIC_TYPES[fireType];
      if (genericType && genericType == GENERIC_TYPES[doclet.longname])
        genericType = null;

      fireType = getType(/** @type {Doclet} */({ type: { names: [fireType || 'undefined'] } }), _module);

      ['on', 'once', 'un'].forEach(fireMethod => {
        const returnType = fireMethod == 'un' ? 'void' : 'EventsKey';
        if (genericType)
          fireMethod += `<${genericType}>`;
        children.push(`${fireMethod}(type: '${eventType}', listener: (evt: ${fireType}) => void): ${returnType};`);
      });
    };

    if (doclet.fires) {
      registerImport(_module, 'module:ol/events~EventsKey');

      // Add default observable methods
      if (doclet.longname != 'module:ol/Observable~Observable')
        find({
          name: ['on', 'once', 'un'],
          kind: 'function',
          memberof: 'module:ol/Observable~Observable'
        }).forEach(method => {
          children.push(PROCESSORS.method(method, _module));
        });

      // Add per event observsable method
      doclet.fires.sort((a, b) => {
        const aMatch = a.match(/^(.*?)([#~.])?event:(.+?)$/);
        const bMatch = b.match(/^(.*?)([#~.])?event:(.+?)$/);
        if (aMatch && bMatch)
          return aMatch[3] < bMatch[3] ? -1 : aMatch[3] > bMatch[3] ? 1 : 0;
        return 0;
      }).forEach(fire => {
        let eventType;
        let fireType;
        const match = fire.match(/^(.*?)([#~.])?event:(.+?)$/);
        if (match) {
          fireType = match[1];
          eventType = match[3];
          switch (match[2]) {
            case '.':
            case '~':
              try {
                const fireTypeDoclet = data({ name: eventType, memberof: fireType }).first();
                const eventTypeDoclet = data({ name: eventType + 'Type', memberof: fireType }).first();
                eventTypeDoclet.properties.forEach(prop => {
                  addFire(prop.defaultvalue, fireTypeDoclet.longname);
                });
              } catch (error) {
                logger.error('Fires process failed --', doclet.longname, fire);
                return;
              }
              break;

            default:
              addFire(eventType, fireType);
              break;
          }
        } else {
          logger.error('Fires process failed --', doclet.longname, fire);
        }
      });
    }

    const decl = `class ${name} {\n${children.join('\n')}\n}`;
    return declaration(doclet, decl, _module);
  },

  /** @type {DocletParser} */
  member: (doclet, _module) => {
    const prefix = doclet.access ? `${doclet.access} ` : '';
    return prefix + `${doclet.name}: ${getType(doclet, _module)};`;
  },

  /** @type {DocletParser} */
  constant: (doclet, _module) => {
    const decl = `const ${doclet.name}: ${getType(doclet, _module)};`;
    return declaration(doclet, decl, _module);
  },

  /**
   * @param {Doclet} doclet
   * @param {Doclet} _module
   * @param {boolean} lookupOverrides
   * @returns {string}
   */
  method: (doclet, _module, lookupOverrides = true) => {
    const prefix = doclet.scope == 'instance' && doclet.access ? `${doclet.access} ` : '';
    let name = doclet.name;

    if (doclet.longname in GENERIC_TYPES)
      name += `<${GENERIC_TYPES[doclet.longname]}>`;

    const params = getParams(doclet, _module);
    const returnType = getReturnType(doclet, _module);
    let decl = prefix + `${name}(${params}): ${returnType};`;

    if (lookupOverrides && doclet.overrides) {
      const superDoclet = find({ longname: doclet.overrides })[0];
      if (superDoclet) {
        const superDecl = PROCESSORS.method(superDoclet, _module, false);
        if (superDecl != decl)
          decl += '\n' + superDecl;
      }
    }

    return decl;
  },

  /** @type {DocletParser} */
  function: (doclet, _module) => {
    // FIXME: Patch module:ol/obj.getValues
    if (doclet.longname == 'module:ol/obj.getValues')
      return ['string', 'number'].map(t => {
        const decl = `function ${doclet.name}<V>(obj: { [key: ${t}]: V }): V[];`;
        return declaration(doclet, decl, _module);
      }).join('\n');

    const decl = 'function ' + PROCESSORS.method(doclet, _module);
    return declaration(doclet, decl, _module);
  },

  /** @type {DocletParser} */
  typedef: (doclet, _module) => {
    let decl;
    const children = [];
    const addedProps = [];

    if (doclet.properties) {
      doclet.properties.forEach(prop => {
        let name = prop.name;

        // Prevent duplicate property
        if (addedProps.indexOf(name) != -1)
          return;

        addedProps.push(name);

        if (prop.optional || (doclet.name == 'Options' && prop.name == 'projection'))
          name += '?';

        children.push(`${name}: ${getType((/** @type {Doclet} */ (prop)), _module)};`);
      });

      let name = doclet.name;
      if (doclet.longname in GENERIC_TYPES)
        name += `<${GENERIC_TYPES[doclet.longname]}>`;

      decl = `interface ${name} {\n${children.join('\n')}\n}`;
    } else {
      decl = `type ${doclet.name} = ${getType(doclet, _module)};`;
    }

    // Always export type
    return 'export ' + decl;
  },

  /** @type {DocletParser} */
  enum: (doclet, _module) => {
    const name = registerImport(_module, doclet.name) + ' ';
    const type = getType(doclet, _module);
    const etDoclet = data({ name: 'module:ol/events/EventType', isEnum: true }).first();
    let children = [];
    if (doclet.properties)
      children = doclet.properties.map(prop => {
        let value = prop.defaultvalue;

        if (type == 'string') {
          // FIXME: Patch EventType enum as value
          if (value.startsWith('EventType.') && etDoclet) {
            const etPropName = value.replace('EventType.', '');
            const etProp = etDoclet.properties.find(p => p.name == etPropName);
            value = etProp ? etProp.defaultvalue : etPropName.toLowerCase();
          }

          value = `'${value}'`;
        }
        return `${prop.name} = ${value},`;
      });
    else
      logger.warn('Empty enum --', doclet.longname);
    const decl = `enum ${name}{\n${children.join('\n')}\n}`;
    return declaration(doclet, decl, _module);
  },
};

/**
 * @param {Doclet} doclet
 */
function processModule(doclet) {
  let children = [];

  if (doclet.longname in IMPORT_PATCHES)
    for (const importName of IMPORT_PATCHES[doclet.longname])
      registerImport(doclet, importName);

  // Remove class duplicates
  const classes = new Set();
  find({ kind: 'class', memberof: doclet.longname }).forEach(child => {
    if (classes.has(child.longname)) {
      data.merge(child, 'longname', false);
      data({ ___id: child.___id }).remove();
      return;
    }

    classes.add(child.longname);
  });

  find({
    kind: ['class', 'member', 'function', 'typedef', 'enum', 'constant'],
    memberof: doclet.longname
  }).sort((a, b) => {
    if (a.kind != b.kind)
      for (const kind of ['typedef', 'enum', 'constant', 'class', 'function'])
        if (a.kind == kind)
          return -1;
        else if (b.kind == kind)
          return 1;

    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }).forEach(item => {
    const processorName = item.isEnum ? 'enum' : item.kind == 'member' ? 'constant' : item.kind;
    let child = PROCESSORS[processorName](item, doclet);

    if (child.indexOf('export') == -1)
      return;

    children.push(child);
  });

  if (MEMBER_PATCHES[doclet.longname])
    children = children.concat(MEMBER_PATCHES[doclet.longname]);

  MODULE_CHILDREN[doclet.name] = children;

  if (doclet.name in MODULE_IMPORTS)
    MODULE_IMPORTS[doclet.name].expressions = sortImports(MODULE_IMPORTS[doclet.name].expressions, doclet);
}

/**
 * @param {Doclet} doclet
 * @param {boolean} emitOutput
 * @returns {string}
 */
function generateDeclaration(doclet, emitOutput = true) {
  const children = MODULE_CHILDREN[doclet.name];
  const _imports = MODULE_IMPORTS[doclet.name];
  const _exports = MODULE_EXPORTS[doclet.name];

  let content = '';

  if (_imports && _imports.expressions.length)
    content += _imports.expressions.join('\n') + '\n';

  let reExports = [];
  if (_exports && _exports.reExports.length) {
    _exports.reExports.forEach(x => {
      const match = x.match(/^(export\s{)(.+?)(}\sfrom\s['"])(.+?)(['"];)$/);
      if (match && match[2].indexOf(' as ') == -1) {
        const names = match[2].split(/,\s?/).map(name => {
          name = name.trim();
          const isDuplicate = find({ name, memberof: doclet.longname }).length > 0;
          const isInvalid = !find({ name, memberof: `module:${match[4]}` }).length;

          if (!isDuplicate && isInvalid)
            logger.warn('Removed export --', name, 'in', doclet.longname, '--', x);

          if (isDuplicate || isInvalid)
            return undefined;

          return name;
        }).filter(x => x != undefined).join(', ');

        if (names)
          reExports.push(match[1] + ` ${names.trim()} ` + match[3] + match[4] + match[5]);
      } else {
        reExports.push(x);
      }
    });
    reExports = relativeImport(reExports, doclet);
    MODULE_EXPORTS[doclet.name].reExports = reExports;
    if (_imports && _imports.expressions.length)
      content += '\n';
    content += reExports.join('\n') + '\n';
  }

  if (!content && !children.length) {
    logger.warn('Empty module --', doclet.name);
    return;
  }

  if (children.length) {
    if ((_imports && _imports.expressions.length) || reExports.length)
      content += '\n';
    content += children.join('\n') + '\n';
  }

  if (emitOutput) {
    let outoutPath = path.resolve(outDir, doclet.name);
    if (doclet.name == 'ol')
      outoutPath = path.join(outoutPath, 'index.d.ts');
    else
      outoutPath += '.d.ts';
    fs.mkdirpSync(path.dirname(outoutPath));
    fs.writeFileSync(outoutPath, content);
  }

  return `declare module '${doclet.name}' {\n${content}}`;
}

function extractGenericTypes(initial = true, strict = false) {
  if (initial)
    find({ tags: { isArray: true } }).forEach(doclet => {
      const template = doclet.tags.find(tag => tag.title == 'template');
      if (template)
        GENERIC_TYPES[doclet.longname] = template.value.split(/,\s?/).join(', ');
    });

  if (!strict) return;

  find({ kind: 'class' }).forEach(doclet => {
    let genericTypes = [];

    if (doclet.longname in GENERIC_TYPES)
      genericTypes = GENERIC_TYPES[doclet.longname].split(/,\s?/);

    if (doclet.augments && doclet.augments.length) {
      const augment = doclet.augments[0];
      if (augment in GENERIC_TYPES)
        genericTypes = genericTypes.concat(GENERIC_TYPES[augment].split(/,\s?/));
    }

    find({ kind: ['member', 'constant'], memberof: doclet.longname }).forEach(member => {
      if (!member.type) return;
      member.type.names.forEach(type => {
        if (type in GENERIC_TYPES)
          genericTypes = genericTypes.concat(GENERIC_TYPES[type].split(/,\s?/));
      });
    });

    if (genericTypes.length)
      GENERIC_TYPES[doclet.longname] = Array.from(new Set(genericTypes)).join(', ');
  });

  find({ kind: 'typedef', properties: { isArray: true } }).forEach(doclet => {
    let genericTypes = [];

    if (doclet.longname in GENERIC_TYPES)
      genericTypes = GENERIC_TYPES[doclet.longname].split(/,\s?/);

    doclet.properties.forEach(prop => {
      prop.type.names.forEach(type => {
        if (type in GENERIC_TYPES)
          genericTypes = genericTypes.concat(GENERIC_TYPES[type].split(/,\s?/));
      });
    });

    if (genericTypes.length)
      GENERIC_TYPES[doclet.longname] = Array.from(new Set(genericTypes)).join(', ');
  });

  data(
    { kind: ['function', 'class'] },
    [{ params: { isArray: true } }, { returns: { isArray: true } }, { yields: { isArray: true } }]
  ).get().forEach((/** @type {Doclet} */ doclet) => {
    let genericTypes = [];

    if (doclet.longname in GENERIC_TYPES)
      genericTypes = GENERIC_TYPES[doclet.longname].split(/,\s?/);

    const merged = ((/** @type {Doclet[]} */ (doclet.params)) || [])
      .concat((/** @type {Doclet[]} */ (doclet.yields)) || (/** @type {Doclet[]} */ (doclet.returns)) || []);

    merged.forEach(d => {
      if (!d.type) return;
      d.type.names.forEach(type => {
        if (type in GENERIC_TYPES)
          genericTypes = genericTypes.concat(GENERIC_TYPES[type].split(/,\s?/));
      });
    });

    if (genericTypes.length)
      GENERIC_TYPES[doclet.longname] = Array.from(new Set(genericTypes)).join(', ');
  });
}

exports.publish = (taffyData) => {
  data = taffyData;
  data = helper.prune(data);
  data.sort('longname, version, since');

  const members = helper.getMembers(data);

  /**
   * Patching types
   */
  for (const longname in TYPE_PATCHES) {
    const doclet = data({ longname }).first();
    if (!doclet) continue;
    doclet.type = { names: [TYPE_PATCHES[longname]] };
  }

  for (const longname in PARAM_TYPE_PATCHES) {
    const doclet = data({ longname }).first();
    const paramName = PARAM_TYPE_PATCHES[longname].shift();

    if (doclet && doclet.params)
      doclet.params = doclet.params.map(param => {
        if (param.name == paramName)
          param.type.names = PARAM_TYPE_PATCHES[longname];
        return param;
      });
  }

  for (const longname in PROPERTY_TYPE_PATCHES) {
    const doclet = data({ longname }).first();
    if (!(doclet && doclet.properties)) continue;
    doclet.properties = doclet.properties.map(prop => {
      if (prop.name in PROPERTY_TYPE_PATCHES[longname])
        prop.type.names = PROPERTY_TYPE_PATCHES[longname][prop.name];
      return prop;
    });
  }

  /**
   * Extract generic types
   * Repetation is needed because some generic types are added from parameters and members
   */

  if (declarationConfig.strictGenericTypes) {
    ANY_GENERIC_TYPES.splice(0);
    extractGenericTypes(true, true);
    for (let i = 0; i < 2; ++i)
      extractGenericTypes(false, true);
  } else {
    extractGenericTypes();
  }

  /**
   * Update module exports
   */
  members.modules.forEach(doclet => {
    doclet.exports.exports = doclet.exports.exports.filter(exportName => {
      return find({ name: exportName, memberof: doclet.longname }).length > 0;
    });

    if (doclet.force_include_members)
      doclet.force_include_members.forEach(memberName => {
        if (doclet.exports.exports.indexOf(memberName) == -1)
          doclet.exports.exports.push(memberName);
      });

    MODULE_EXPORTS[doclet.name] = doclet.exports;
  });

  // Parse module
  members.modules.forEach(processModule);

  // Clean output directory
  fs.removeSync(outDir);

  /**
   * Emit declaration files
   */
  if (declarationConfig.mode == 'single') {
    /**
     * Generate single declaration file
     */
    const content = members.modules.map(doclet => generateDeclaration(doclet, false)).join('\n\n');
    const outputPath = path.resolve(outDir, 'ol', 'index.d.ts');
    fs.mkdirpSync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, content);
  } else {
    /**
     * Generate multiple declaration files
     */
    members.modules.forEach(doclet => generateDeclaration(doclet));
  }
};
