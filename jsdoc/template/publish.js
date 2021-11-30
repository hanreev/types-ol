/* global env */

const path = require('path');
const catharsis = require('catharsis');

const fs = require('fs-extra');
const htmlParser = require('node-html-parser');
const helper = require('jsdoc/lib/jsdoc/util/templateHelper');
const logger = require('jsdoc/lib/jsdoc/util/logger');

const outDir = path.resolve(env.opts.destination);

/** @type {DefinitionConfig} */
const definitionConfig = env.conf.typescript.definition;

/** @type {*} */
let data;

/** @type {Object<string, ModuleImports>} */
const MODULE_IMPORTS = {};

/** @type {Object<string, ModuleExports>} */
const MODULE_EXPORTS = {};

/** @type {Object<string, string[]>} */
const MODULE_CHILDREN = {};

/** @type {string[]} */
const EXTERNAL_MODULE_WHITELIST = ['arcgis-rest-api', 'geojson', 'topojson-specification', 'rbush'];

/** @type {Object<string, DocletGenericType[]>} */
const GENERIC_TYPES = {};

/** @type {string[]} */
const ANY_GENERIC_TYPES = [
  'module:ol/structs/LRUCache~LRUCache',
  'module:ol/structs/PriorityQueue~PriorityQueue',
  'module:ol/structs/RBush~RBush',
];

/** @type {Object<string, string[]>} */
const TYPE_PATCHES = {
  'module:ol/extent~Extent': ['[number, number, number, number]'],
  'module:ol/size~Size': ['[number, number]'],
};

/** @type {Object<string, Object<string, string[]>>} */
const PARAM_TYPE_PATCHES = {};

/** @type {Object<string, string[]>} */
const RETURN_TYPE_PATCHES = {};

/** @type {Object<string, Object<string, string[]>>} */
const PROPERTY_TYPE_PATCHES = {};

/** @type {Object<string, string[]>} */
const IMPORT_PATCHES = {};

/** @type {Object<string, string[]>} */
const MEMBER_PATCHES = {
  'module:ol/Feature': ['export type ObjectWithGeometry<G> = Record<string, any> & { geometry?: G };'],
};

/** @type {Object<string, string[]>} */
const PROPERTY_AND_METHOD_PATCHES = {
  // Fix method override error
  'module:ol/format/GMLBase~GMLBase': [
    'protected readGeometryFromNode(node: Element, opt_options?: ReadOptions): Geometry;',
  ],
};

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
  if (!val.startsWith('module:')) return val;

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

  if (value.includes('.')) {
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

  if (!moduleName.startsWith('ol')) isDefault = false;

  if (_module.name == value || _module.name == moduleName || importName == 'EventTarget') return importName;

  if (_imports.imported[value]) return _imports.imported[value];

  let doclet = find({ longname: val })[0];

  if (!doclet && moduleName.startsWith('ol')) {
    doclet = find({ name: importName, memberof: _module.longname })[0];
    if (doclet) return importName;
  }

  if (!doclet && moduleName.startsWith('ol')) {
    splits = val.includes('~') ? val.split('~') : val.split('.');
    if (splits.length == 2) {
      temp = splits[0].split('/');
      temp[temp.length - 1] = splits[1];
      doclet = find({ longname: temp.join('/') })[0];
      if (doclet) return registerImport(_module, doclet.longname);
    }
  }

  if (!doclet && !EXTERNAL_MODULE_WHITELIST.includes(moduleName)) {
    logger.warn('Invalid import or external module --', val, 'in', _module.name);
    if (moduleName.startsWith('geotiff')) return importName;
  }

  let counter = 1;
  let availableImportName = importName;

  // FIXME: rbush import patch
  if (moduleName == 'rbush') {
    isDefault = true;
    availableImportName = 'RBush';
  }

  if (find({ name: importName, memberof: _module.longname }).length) {
    availableImportName = `${importName}_${counter}`;
    counter++;
  }

  while (_imports.names.includes(availableImportName)) {
    availableImportName = `${importName}_${counter}`;
    counter++;
  }

  _imports.imported[value] = availableImportName;
  _imports.names.push(availableImportName);
  let expression = availableImportName;
  const _exports = MODULE_EXPORTS[moduleName];
  if ((_exports && _exports.default != importName && _exports.default != `module:${moduleName}`) || !isDefault)
    expression =
      importName == availableImportName ? `{ ${importName} }` : `{ ${importName} as ${availableImportName} }`;
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
  if (!Array.isArray(expressions)) return logger.error('relativeImport -- Invalid argument:', expressions);

  const moduleDirname = _module.name == 'ol' ? 'ol' : path.dirname(_module.name);

  return expressions.map(expression => {
    const match = expression.match(/^((import|export)\s.+?\sfrom\s['"])(.+?)(['"];)$/);

    if (!match) return expression;

    let fromPath = match[3];

    if (!fromPath.startsWith('ol')) return expression;

    fromPath = path.relative(moduleDirname, fromPath).replace(/\\/g, '/');

    if (!fromPath) fromPath = '../' + path.basename(moduleDirname);
    else if (!fromPath.startsWith('.')) fromPath = './' + fromPath;

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
  if (!Array.isArray(expressions)) return logger.error('sortImports -- Invalid argument:', expressions);

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
    return a < b ? -1 : a > b ? 1 : 0;
  };

  /**
   * @param {string} moduleName
   * @param {boolean} [multiLine=false]
   */
  const formatExpression = (moduleName, multiLine = false) => {
    const map = importMap[moduleName];
    let expression = 'import ';
    if (map.default) expression += map.default;
    if (map.members && map.members.length) {
      if (map.default) expression += ', ';
      if (multiLine) expression += `{\n${map.members.join(',\n')}\n}`;
      else expression += `{ ${map.members.join(', ')} }`;
    }
    expression += ` from '${moduleName}';`;
    if (!multiLine && expression.length > maxLineLength) return formatExpression(moduleName, true);
    return expression;
  };

  // Relative import ol modules
  expressions = relativeImport(expressions, _module);

  expressions
    .filter(expression => expression.search(/=\s?require/) == -1)
    .forEach(expression => {
      /** @type {RegExpMatchArray} */
      const match = expression.match(/^import (?:([^{]+?),\s?)?(.+?) from ['"](.+?)['"];?$/);
      if (!match) return logger.error('sortImports -- Invalid expression:', expression);

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

  return Object.keys(importMap)
    .sort(sortFn)
    .map(moduleName => formatExpression(moduleName))
    .concat(expressions.filter(expression => expression.search(/=\s?require/) != -1));
}

/**
 * @param {ParsedType} parsedType
 * @param {Doclet} _module
 * @param {boolean} [undefinedLiteral]
 * @returns {string}
 */
function stringifyType(parsedType, _module, undefinedLiteral = true, nullLiteral = true) {
  let typeStr = /** @type {TypeApplication} */ (parsedType).expression
    ? /** @type {TypeApplication} */ (parsedType).expression.name
    : /** @type {TypeNameExpression} */ (parsedType).name;

  const suffix = getGenericType(typeStr, _module);

  if (typeStr && typeStr.startsWith('module:')) {
    if (_module) typeStr = registerImport(_module, typeStr);
    typeStr = typeStr.split('~')[1] || typeStr.split('.')[1] || typeStr.split('/').pop();
  }

  if (parsedType.type == 'TypeApplication') {
    const applications = /** @type {TypeApplication} */ (parsedType).applications.map(app => {
      const t = stringifyType(app, _module);
      return t == 'undefined' ? 'any' : t;
    });

    switch (typeStr) {
      case 'Array':
        typeStr = applications[0] + '[]';
        break;

      case 'Object':
        typeStr = `Record<${applications[0]}, ${applications[1]}>`;
        break;

      case 'Class':
        typeStr = applications.map(app => `typeof ${app.replace(/<.+>/, '')}`).join(', ');
        break;

      default:
        typeStr += `<${applications.join(', ')}>`;
        break;
    }
  } else if (parsedType.type == 'FunctionType') {
    const strictReturn = definitionConfig.strictReturnTypes;
    const functionType = /** @type {TypeFunction} */ (parsedType);
    let params = [];
    let returnType = 'void';

    if (functionType.params)
      params = functionType.params.map((param, i) => {
        let name = `p${i}`;
        if (param.optional) name += '?';
        return `${name}: ${stringifyType(param, _module)}`;
      });

    if (functionType.this) params.unshift('this: ' + stringifyType(functionType.this, _module));

    if (functionType.result && /** @type {TypeNameExpression} */ (functionType.result).name != 'void')
      returnType = stringifyType(functionType.result, _module, strictReturn, strictReturn);

    typeStr = `(${params.join(', ')}) => ${returnType == 'undefined' ? 'void' : returnType}`;
  } else if (parsedType.type == 'TypeUnion') {
    const unionType = /** @type {TypeUnion} */ (parsedType);
    let union = unionType.elements.map(t => stringifyType(t, _module));

    if (!undefinedLiteral) union = union.filter(t => t != 'undefined');
    if (!nullLiteral) union = union.filter(t => t != 'null');

    typeStr = union.join(' | ');
    if (union.length > 1) typeStr = `(${typeStr})`;
  } else if (parsedType.type == 'NullLiteral') {
    typeStr = 'null';
  } else if (parsedType.type == 'UndefinedLiteral') {
    typeStr = 'undefined';
  } else if (['UnknownLiteral', 'AllLiteral'].includes(parsedType.type)) {
    typeStr = 'any';
  } else {
    typeStr += suffix;
  }

  if (!typeStr) typeStr = 'any';

  if (typeStr == 'Array') typeStr = 'any[]';
  else if (typeStr == 'Object') typeStr = 'object';
  else if (typeStr == 'undefined' && !undefinedLiteral) typeStr = 'any';

  return typeStr;
}

/**
 * @param {string} type
 * @param {Doclet} _module
 * @returns {string}
 */
function parseFunctionType(type, _module) {
  if (!type.startsWith('function')) return;

  let expression = '() => void';

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

  if (parsedType) expression = stringifyType(parsedType, _module);
  else logger.error('parseFunctionType --', type, _module.name);

  return `(${expression})`;
}

/** @type {DocletParser} */
function parseConstFunctionType(doclet, _module) {
  const params = getParams(doclet, _module);
  const returnType = getReturnType(doclet, _module);

  // Wrap arrow function in braces
  return `((${params}) => ${returnType})`;
}

/**
 *
 * @param {Doclet} doclet
 * @param {Doclet} _module
 * @param {boolean} [undefinedLiteral]
 * @param {boolean} [nullLiteral]
 */
function getType(doclet, _module, undefinedLiteral = false, nullLiteral = true) {
  if (!doclet.type)
    if (doclet.params || doclet.yields || doclet.returns) {
      return parseConstFunctionType(doclet, _module);
    } else {
      logger.warn('Undefined type --', doclet.longname, 'in', _module.name);
      return 'any';
    }

  let types = doclet.type.names.map(typeName => {
    /** @type {ParsedType} */
    let parsedType;
    let prefix = '';
    let type = typeName;

    if (type.startsWith('typeof:')) {
      prefix = 'typeof ';
      type = type.replace(/^typeof:/, '');
    }

    const objRegex = /^\[ '(.+)' \](\..+)$/;
    if (objRegex.test(type)) type = type.replace(objRegex, '$1$2');

    if (type.startsWith('function')) type = parseFunctionType(type, _module);
    else
      try {
        parsedType = catharsis.parse(type, { jsdoc: true });
        type = stringifyType(parsedType, _module, undefinedLiteral, nullLiteral);
      } catch (error) {
        if (doclet.longname in TYPE_PATCHES)
          logger.warn('getType -- [RAW_PATCH]:', doclet.longname || _module.longname, type);
        else logger.error('getType --', doclet.longname || _module.longname, type);
      }

    // FIXME: rbush patch
    if (typeName == 'module:rbush') type += '<any>';

    return prefix + type;
  });

  if (!undefinedLiteral) types = types.filter(t => t != 'undefined');

  if (!nullLiteral) types = types.filter(t => t != 'null');

  if (types.length > 1 && types.includes('any')) types = types.filter(t => t != 'any');

  if (types.length == 1 && types[0] == 'object') types[0] = 'any';

  return types.join(' | ') || 'any';
}

/** @type {DocletParser} */
function getReturnType(doclet, _module) {
  const strictReturn = definitionConfig.strictReturnTypes;
  const returnTypes = [];

  if (doclet.yields || doclet.returns)
    (doclet.yields || doclet.returns).forEach(r => {
      returnTypes.push(getType(/** @type {Doclet} */ (r), _module, strictReturn, strictReturn));
    });

  return returnTypes.join(' | ') || 'void';
}

/** @type {DocletParser} */
function getParams(doclet, _module) {
  if (!doclet.params) return '';

  return doclet.params
    .filter(param => !param.name.includes('.'))
    .map(param => {
      let name = param.name;
      let paramType = getType(/** @type {Doclet} */ (param), _module, true, true);

      if (param.optional && !param.defaultValue) name += '?';

      if (param.variable) {
        name = '...' + name;
        if (paramType.includes('|')) paramType = `(${paramType})`;
        paramType += '[]';
      }

      const paramStr = `${name}: ${paramType}`;
      return param.defaultValue ? `${paramStr} = ${param.defaultValue}` : paramStr;
    })
    .join(', ');
}

/**
 * @param {Doclet} doclet
 * @param {string} decl
 * @param {Doclet} _module
 * @returns {string}
 */
function definition(doclet, decl, _module) {
  let prefix = '';
  let suffix = '';

  if (_module && _module.exports)
    if (doclet.name == _module.exports.default)
      if (doclet.isEnum || doclet.kind == 'constant') {
        prefix = 'declare ';
        suffix = `\n\nexport default ${registerImport(_module, doclet.name)};`;
      } else {
        prefix = 'export default ';
      }
    else if (_module.exports.exports.includes(doclet.name)) prefix = 'export ';

  return prefix + decl + suffix;
}

const PROCESSORS = {
  /** @type {DocletParser} */
  class(doclet, _module) {
    const children = [];
    let name = doclet.name + getGenericType(doclet.longname, _module, true, true, true);

    if (Array.isArray(doclet.augments) && doclet.augments.length) {
      const [augment, _augment] = doclet.augments;
      let augmentName = registerImport(_module, augment);
      if (_augment) {
        augmentName = registerImport(_module, _augment);
        const m = /^([^<]+)(.*)$/.exec(augment);
        if (m) {
          let gt = m[2];
          if (gt.startsWith('<')) {
            gt = gt
              .replace(/<(.+)>/, '$1')
              .split(',')
              .map(t => registerImport(_module, t))
              .join(',');
            gt = `<${gt}>`;
          }
          // if (gt.startsWith('<module:')) gt = '<' + registerImport(_module, gt.replace(/<(.+)>/, '$1')) + '>';
          augmentName += gt;
        }
      } else if (augment in GENERIC_TYPES && ANY_GENERIC_TYPES.includes(augment)) {
        augmentName += '<any>';
      }

      name += ` extends ${augmentName}`;
    }

    if (!doclet._hideConstructor) children.push(`constructor(${getParams(doclet, _module)});`);

    data({
      kind: ['member', 'constant', 'function'],
      inheritdoc: { '!is': true },
      inherited: { '!is': true },
      memberof: doclet.longname,
    })
      .order('access, kind desc, name')
      .get()
      .forEach((/** @type {Doclet} */ child) => {
        // Remove non alphanumeric from member name
        child.name = child.name.replace(/\W/g, '');
        const processorName = child.kind == 'function' ? 'method' : child.kind == 'constant' ? 'member' : child.kind;
        /** @type {string} */
        let childString;
        if (processorName == 'method') childString = PROCESSORS.method(child, _module, doclet.virtual);
        else childString = PROCESSORS[processorName](child, _module);
        children.push(getComment(child) + childString);
      });

    /** @type {Object<string, Array<string>>} */
    const eventTypesMap = {};

    /**
     * @param {string} eventType
     * @param {string} event
     */
    const addFire = (eventType, event) => {
      if (event.startsWith('ol')) event = 'module:' + event;

      let genericType = getGenericType(event, _module, false);
      if (genericType && genericType == getGenericType(doclet.longname, _module, false)) genericType = null;

      event = getType(/** @type {Doclet} */ ({ type: { names: [event || 'undefined'] } }), _module);
      eventTypesMap[event] = eventTypesMap[event] || [];
      eventTypesMap[event].push(eventType);
    };

    if (doclet.fires) {
      registerImport(_module, 'module:ol/events~EventsKey');

      doclet.fires
        .sort((a, b) => {
          const aMatch = a.match(/^(.*?)([#~.])?event:(.+?)$/);
          const bMatch = b.match(/^(.*?)([#~.])?event:(.+?)$/);
          if (aMatch && bMatch) return aMatch[3] < bMatch[3] ? -1 : aMatch[3] > bMatch[3] ? 1 : 0;
          return 0;
        })
        .forEach(fire => {
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
                  /** @type {Doclet} */
                  const fireTypeDoclet = data({ name: eventType, memberof: fireType }).first();
                  /** @type {Doclet} */
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

    if (Object.keys(eventTypesMap).length) {
      const listenerFunction = registerImport(_module, 'module:ol/events~ListenerFunction');
      for (const event in eventTypesMap) {
        // if (doclet.longname != 'module:ol/Observable~Observable' && event == 'BaseEvent') continue;
        const eventTypes = eventTypesMap[event].map(t => `'${t}'`).join(' | ');
        const eventTypesName = `T${doclet.name}${event.replace(/<.+?>$/, '')}Types`;
        MODULE_CHILDREN[_module.name].push(`export type ${eventTypesName} = ${eventTypes};`);
        ['on', 'once'].forEach(method => {
          children.push(
            `${method}(type: ${eventTypesName}, listener: ${listenerFunction}<${event}>): EventsKey;`,
            `${method}(type: ${eventTypesName}[], listener: ${listenerFunction}<${event}>): EventsKey[];`,
          );
        });
        children.push(
          `un(type: ${eventTypesName} | ${eventTypesName}[], listener: ${listenerFunction}<${event}>): void;`,
        );
      }
    }

    if (PROPERTY_AND_METHOD_PATCHES[doclet.longname]) children.push(...PROPERTY_AND_METHOD_PATCHES[doclet.longname]);

    const prefix = doclet.virtual ? 'abstract ' : '';
    const decl = `${prefix}class ${name} {\n${children.join('\n')}\n}`;
    return definition(doclet, decl, _module);
  },

  /** @type {DocletParser} */
  member(doclet, _module) {
    const prefix = doclet.access ? `${doclet.access} ` : '';
    return prefix + `${doclet.name}: ${getType(doclet, _module)};`;
  },

  /** @type {DocletParser} */
  constant(doclet, _module) {
    const genericType = getGenericType(doclet.longname, _module, true, true);
    const type = genericType + getType(doclet, _module).replace(/^\((.+?)\)$/, '$1');
    const decl = `const ${doclet.name}: (${type});`;
    return definition(doclet, decl, _module);
  },

  /**
   * @param {Doclet} doclet
   * @param {Doclet} _module
   * @param {boolean} [abstractClass]
   * @returns {string}
   */
  method(doclet, _module, abstractClass = false) {
    let prefix = doclet.scope == 'instance' && doclet.access ? `${doclet.access} ` : '';
    let name = doclet.name;

    if (abstractClass && doclet.virtual) prefix += 'abstract ';

    name += getGenericType(doclet.longname, _module);

    const params = getParams(doclet, _module);
    const returnType = getReturnType(doclet, _module);
    return prefix + `${name}(${params}): ${returnType};`;
  },

  /** @type {DocletParser} */
  function(doclet, _module) {
    const decl = 'function ' + PROCESSORS.method(doclet, _module);
    return definition(doclet, decl, _module);
  },

  /** @type {DocletParser} */
  typedef(doclet, _module) {
    let decl;
    const children = [];
    const addedProps = [];

    const docletName = doclet.name + getGenericType(doclet.longname, _module, true, true, true);

    if (doclet.properties) {
      doclet.properties.forEach(prop => {
        let name = prop.name;

        // Prevent duplicate property
        if (addedProps.includes(name)) return;

        addedProps.push(name);

        if (prop.optional || (doclet.name == 'Options' && prop.name == 'projection')) name += '?';

        children.push(`${name}: ${getType(/** @type {Doclet} */ (prop), _module)};`);
      });

      decl = `interface ${docletName} {\n${children.join('\n')}\n}`;
    } else {
      decl = `type ${docletName} = ${getType(doclet, _module)};`;
    }

    // Always export type
    return 'export ' + decl;
  },

  /** @type {DocletParser} */
  enum(doclet, _module) {
    const name = registerImport(_module, doclet.name) + ' ';
    const type = getType(doclet, _module);
    /** @type {Doclet} */
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
    else logger.warn('Empty enum --', doclet.longname);
    const decl = `enum ${name}{\n${children.join('\n')}\n}`;
    return definition(doclet, decl, _module);
  },
};

/**
 * @param {Doclet} doclet
 */
async function processModule(doclet) {
  MODULE_CHILDREN[doclet.name] = [];

  /** @type {string[]} */
  let children = [];

  if (doclet.longname in IMPORT_PATCHES)
    for (const importName of IMPORT_PATCHES[doclet.longname]) registerImport(doclet, importName);

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
    memberof: doclet.longname,
  })
    .sort((a, b) => {
      if (a.kind != b.kind)
        for (const kind of ['typedef', 'enum', 'constant', 'class', 'function'])
          if (a.kind == kind) return -1;
          else if (b.kind == kind) return 1;

      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    })
    .forEach(item => {
      const processorName = item.isEnum ? 'enum' : item.kind == 'member' ? 'constant' : item.kind;
      const child = PROCESSORS[processorName](item, doclet);
      const comment = getComment(item);

      if (child.includes('export ')) return children.push(comment + child);

      if (doclet.force_include_members && doclet.force_include_members.includes(item.name))
        children.push(comment + 'declare ' + child);
    });

  if (MEMBER_PATCHES[doclet.longname]) children = children.concat(MEMBER_PATCHES[doclet.longname]);

  MODULE_CHILDREN[doclet.name] = MODULE_CHILDREN[doclet.name].concat(children);

  if (doclet.name in MODULE_IMPORTS)
    MODULE_IMPORTS[doclet.name].expressions = sortImports(MODULE_IMPORTS[doclet.name].expressions, doclet);
}

/**
 * @param {Doclet} doclet
 * @param {boolean} emitOutput
 * @returns {Promise<string>}
 */
async function generateDefinition(doclet, emitOutput = true) {
  const children = MODULE_CHILDREN[doclet.name];
  const _imports = MODULE_IMPORTS[doclet.name];
  const _exports = MODULE_EXPORTS[doclet.name];

  let content = '';

  if (_imports && _imports.expressions.length) content += _imports.expressions.join('\n') + '\n';

  let reExports = [];
  if (_exports && _exports.reExports.length) {
    _exports.reExports.forEach(x => {
      const match = x.match(/^(export\s{)(.+?)(}\sfrom\s['"])(.+?)(['"];)$/);
      if (match && !match[2].includes(' as ')) {
        const names = match[2]
          .split(/,\s?/)
          .map(name => {
            name = name.trim();
            const isDuplicate = find({ name, memberof: doclet.longname }).length > 0;
            const isInvalid = !find({ name, memberof: `module:${match[4]}` }).length;

            if (!isDuplicate && isInvalid) logger.warn('Removed export --', name, 'in', doclet.longname, '--', x);

            if (isDuplicate || isInvalid) return undefined;

            return name;
          })
          .filter(x => x != undefined)
          .join(', ');

        if (names) reExports.push(match[1] + ` ${names.trim()} ` + match[3] + match[4] + match[5]);
      } else {
        reExports.push(x);
      }
    });
    reExports = relativeImport(reExports, doclet);
    MODULE_EXPORTS[doclet.name].reExports = reExports;
    if (_imports && _imports.expressions.length) content += '\n';
    content += reExports.join('\n') + '\n';
  }

  if (!content && !children.length) {
    logger.warn('Empty module --', doclet.name);
    return;
  }

  if (children.length) {
    if ((_imports && _imports.expressions.length) || reExports.length) content += '\n';
    content += children.join('\n') + '\n';
  }

  if (emitOutput) {
    let outoutPath = path.resolve(outDir, doclet.name);
    if (doclet.name == 'ol') outoutPath = path.join(outoutPath, 'index.d.ts');
    else outoutPath += '.d.ts';
    fs.mkdirpSync(path.dirname(outoutPath));
    fs.writeFileSync(outoutPath, content);
  }

  return `declare module '${doclet.name}' {\n${content}}`;
}

/**
 * @param {string} key
 * @param {Doclet} _module
 * @param {boolean} [includeBracket]
 * @param {boolean} [includeType]
 * @returns {string}
 */
function getGenericType(key, _module, includeBracket = true, includeType = false, includeDefault = false) {
  if (!(key in GENERIC_TYPES)) return '';
  const genericTypes = GENERIC_TYPES[key]
    .map(gType => {
      let type;
      if (gType.type) type = getType(/** @type {Doclet} */ (gType), _module);
      if (type) {
        if (includeType) {
          const _type = type.replace(/<.+>/, '');
          type = `${gType.name} extends ${_type}`;
          if (includeDefault) type += ` = ${_type}`;
        }
        return type;
      }

      return gType.name;
    })
    .join(', ');

  return includeBracket ? `<${genericTypes}>` : genericTypes;
}

/**
 * @param {Doclet} doclet
 * @param {string} parent
 */
function isExtendClass(doclet, parent) {
  if (doclet && doclet.longname == parent) return true;

  let result = false;
  while (doclet && Array.isArray(doclet.augments) && doclet.augments.length) {
    const augment = doclet.augments.length > 1 ? doclet.augments[1] : doclet.augments[0];
    if (augment == parent) {
      result = true;
      break;
    } else {
      doclet = data({ longname: augment }).first();
    }
  }
  return result;
}

/**
 * @param {Doclet} doclet
 */
function getComment(doclet) {
  if (!doclet.description) return '';
  const description = htmlParser.parse(doclet.description);
  return '/**\n * ' + description.text.split('\n').join('\n * ') + '\n */\n';
}

/**
 * @param {*} taffyData
 */
exports.publish = taffyData => {
  data = taffyData;

  /** @type {Object<string, DocletParam[]>} */
  const docletParams = {};
  find({ params: { isArray: true } }).forEach(doclet => (docletParams[doclet.longname] = doclet.params));

  data = helper.prune(data);
  data.sort('longname, version, since');

  find({
    longname: Object.keys(docletParams),
    params: { isArray: false },
  }).forEach(doclet => (doclet.params = docletParams[doclet.longname]));

  const members = helper.getMembers(data);

  data({
    inherited: true,
  })
    .get()
    .forEach((/** @type {Doclet} */ doclet) => {
      const ancestor = data({ longname: doclet.overrides }).first();
      if (ancestor && ancestor.virtual) doclet.inherited = false;
    });

  /**
   * Patching types
   */
  for (const longname in TYPE_PATCHES) {
    /** @type {Doclet} */
    const doclet = data({ longname }).first();
    if (!doclet) continue;
    doclet.type = { names: TYPE_PATCHES[longname] };
  }

  for (const longname in PARAM_TYPE_PATCHES) {
    /** @type {Doclet} */
    const doclet = data({ longname }).first();
    const paramTypes = PARAM_TYPE_PATCHES[longname];
    if (doclet && doclet.params)
      doclet.params = doclet.params.map(param => {
        if (param.name in paramTypes) param.type.names = paramTypes[param.name];
        return param;
      });
  }

  for (const longname in RETURN_TYPE_PATCHES) {
    /** @type {Doclet} */
    const doclet = data({ longname }).first();
    if (!doclet) continue;
    doclet.returns = RETURN_TYPE_PATCHES[longname].map(types => {
      return {
        type: { names: [types] },
      };
    });
  }

  for (const longname in PROPERTY_TYPE_PATCHES) {
    /** @type {Doclet} */
    const doclet = data({ longname }).first();
    if (!(doclet && doclet.properties)) continue;
    doclet.properties = doclet.properties.map(prop => {
      if (prop.name in PROPERTY_TYPE_PATCHES[longname]) prop.type.names = PROPERTY_TYPE_PATCHES[longname][prop.name];
      return prop;
    });
  }

  /**
   * Extract generic types
   */
  find({ genericTypes: { isArray: true } }).forEach(doclet => {
    GENERIC_TYPES[doclet.longname] = doclet.genericTypes;
  });

  /**
   * Update module exports
   */
  members.modules.forEach((/** @type {Doclet} */ doclet) => {
    if (doclet.exports) {
      const invalidExports = doclet.exports.exports.filter(exportName => {
        return find({ name: exportName, memberof: doclet.longname }).length < 1;
      });
      doclet.exports.exports = doclet.exports.exports.filter(exportName => !invalidExports.includes(exportName));

      /** @type {ModuleImports} */
      const _imports = MODULE_IMPORTS[doclet.name] || {
        names: [],
        imported: {},
        expressions: [],
      };

      if (invalidExports.length && doclet.imports)
        invalidExports.forEach(exportName => {
          for (const key in doclet.imports) {
            const members = doclet.imports[key];
            let mName = members.find(member => member == exportName);
            if (mName) {
              if (members.indexOf(mName) > 0) mName = `{${mName}}`;
              _imports.expressions.push(`import ${mName} from '${key}';`);
              doclet.exports.reExports.push(`export {${exportName}};`);
              break;
            }
          }
        });

      MODULE_EXPORTS[doclet.name] = doclet.exports;
      MODULE_IMPORTS[doclet.name] = _imports;
    }
  });

  Promise.all(members.modules.map((/** @type {Doclet} */ doclet) => processModule(doclet))).then(() => {
    // Clean output directory
    fs.removeSync(outDir);

    // Emit definition files
    Promise.all(members.modules.map((/** @type {Doclet} */ doclet) => generateDefinition(doclet))).then();
  });
};
