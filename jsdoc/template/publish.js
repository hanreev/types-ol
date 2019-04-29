// @ts-nocheck
/* global env */

/**
 * @typedef DocletType
 * @prop {string[]} names
 *
 * @typedef DocletProp
 * @prop {string} name
 * @prop {DocletType} [type]
 * @prop {string} [description]
 * @prop {boolean} [optional]
 * @prop {*} [defaultvalue]
 *
 * @typedef DocletParam
 * @prop {string} name
 * @prop {string} [description]
 * @prop {DocletType} [type]
 * @prop {boolean} [optional]
 *
 * @typedef DocletReturns
 * @prop {string} [description]
 * @prop {DocletType} [type]
 *
 * @typedef DocletMetaCode
 * @prop {string} id
 * @prop {string} name
 * @prop {string} type
 * @prop {string} [value]
 * @prop {string[]} [paramnames]
 *
 * @typedef DocletMeta
 * @prop {string} filename
 * @prop {number} lineno
 * @prop {number} columnno
 * @prop {string} path
 * @prop {DocletMetaCode} code
 * @prop {number[]} [range]
 * @prop {Object<string, *>} [vars]
 *
 * @typedef Doclet
 * @prop {string} ___id
 * @prop {string} name
 * @prop {string} longname
 * @prop {string} kind
 * @prop {string} [description]
 * @prop {DocletMeta} [meta]
 * @prop {string} [memberof]
 * @prop {DocletType} [type]
 * @prop {string[]} [augments]
 * @prop {DocletProp[]} [properties]
 * @prop {DocletParam]} [params]
 * @prop {DocletReturns[]} [yields]
 * @prop {DocletReturns[]} [returns]
 * @prop {string} [comment]
 * @prop {boolean} [inherited]
 * @prop {boolean} [inheritDoc]
 * @prop {boolean} [undocumented]
 * @prop {boolean} [isEnum]
 * @prop {string} [scope]
 * @prop {string} [stability]
 * @prop {string} [classdesc]
 * @prop {string[]} [fires]
 * @prop {ModuleExports} [exports]
 * @prop {string[]} [force_include_members]
 */

/**
 * @typedef TypeNameExpression
 * @prop {string} [type="NameExpression"]
 * @prop {string} name
 *
 * @typedef TypeAllLiteral
 * @prop {string} [type="AllLiteral"]
 *
 * @typedef TypeNullLiteral
 * @prop {string} [type="NullLiteral"]
 *
 * @typedef TypeUndefinedLiteral
 * @prop {string} [type="UndefinedLiteral"]
 *
 * @typedef TypeFunctionLiteral
 * @prop {string} [type="FunctionLiteral"]
 *
 * @typedef TypeApplication
 * @prop {string} [type="TypeApplication"]
 * @prop {TypeNameExpression} expression
 * @prop {ParsedType[]} applications
 *
 * @typedef {(TypeNameExpression|TypeAllLiteral|TypeNullLiteral|TypeUndefinedLiteral|TypeFunctionLiteral|TypeApplication)}ParsedType
 */

/**
 * @typedef DeclarationConfig
 * @prop {'single'|'multiple'} [mode]
 * @prop {boolean} [strictGenericTypes]
 */

/**
 * @typedef ModuleImports
 * @prop {string[]} names
 * @prop {string[]} imported
 * @prop {string[]} expressions
 *
 * @typedef ModuleExports
 * @prop {string[]} exports
 * @prop {string[]} reExport
 * @prop {string} [default]
 */

/**
 * @typedef {function(Doclet, Doclet): string} DocletParser
 */

const path = require('path');
const catharsis = require('catharsis');

/** @type {import('jsdoc/lib/jsdoc/fs') & import('fs')} */
const fs = require('jsdoc/lib/jsdoc/fs');
const helper = require('jsdoc/lib/jsdoc/util/templateHelper');
const logger = require('jsdoc/lib/jsdoc/util/logger');
const rimraf = require('rimraf');

const outDir = path.resolve(env.opts.destination);

/** @type {DeclarationConfig} */
const declarationConfig = env.conf.typescript.declaration;

/** @type {*} */
let data;

/** @type {Object<string, ModuleImports>} */
const MODULE_IMPORTS = {};

/** @type {Object<string, ModuleExports>} */
const MODULE_EXPORTS = {};

/** @type {Object<string, Doclet>} */
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
  'module:ol/css~getFontFamilies': 'function(string): (Object<string, *>|null)',
  'module:ol/events/condition~always': 'typeof:module:ol/functions.TRUE',
  'module:ol/events/condition~never': 'typeof:module:ol/functions.FALSE',
  'module:ol/format/GML~GML': 'module:ol/format/GML3~GML3',
  'module:ol/source/Cluster~Cluster#geometryFunction': 'function(module:ol/Feature~Feature): module:ol/geom/Point~Point',
  'module:ol/style/IconImageCache~shared': 'module:ol/style/IconImageCache~IconImageCache',
};

/** @type {Object<string, string[]>} */
const PARAM_TYPE_PATCHES = {
  'module:ol/layer/Tile~TileLayer': ['opt_options', 'module:ol/layer/Tile~Options'],
  'module:ol/layer/VectorTile~VectorTileLayer': ['opt_options', 'module:ol/layer/VectorTile~Options'],
};

/** @type {Object<string, Object<string, string[]>} */
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
  const _imports = MODULE_IMPORTS[_module.name] || {};
  _imports.names = _imports.names || [];
  _imports.imported = _imports.imported || {};
  _imports.expressions = _imports.expressions || [];

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

  if (!doclet) {
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
 * @param {ParsedType} parsedType
 * @param {Doclet} _module
 * @returns {string}
 */
function stringifyType(parsedType, _module) {
  let typeStr = parsedType.expression ? parsedType.expression.name : parsedType.name;
  let suffix = '';

  if (typeStr in GENERIC_TYPES)
    suffix = `<${GENERIC_TYPES[typeStr]}>`;

  if (typeStr && typeStr.startsWith('module:')) {
    if (_module)
      typeStr = registerImport(_module, typeStr);
    typeStr = typeStr.split('~')[1] || typeStr.split('.')[1] || typeStr.split('/').pop();
  }

  if (parsedType.type == 'TypeApplication') {
    const applications = parsedType.applications.map(app => {
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
  } else {
    typeStr += suffix;
  }

  if (!typeStr)
    switch (parsedType.type) {
      case 'FunctionType':
        typeStr = 'Function';
        break;

      case 'NullLiteral':
      case 'UndefinedLiteral':
        typeStr = 'undefined';
        break;

      default:
        typeStr = 'any';
        break;
    }

  if (typeStr == 'Array')
    typeStr = 'any[]';
  else if (typeStr == 'Object')
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
  let genericTypes = [];

  const parse = t => {
    t = t.replace(/[()]/g, '');

    if (t.startsWith('function'))
      return parseFunctionType(t, _module);

    try {
      /** @type {ParsedType} */
      let parsedType = catharsis.parse(t, { jsdoc: true });

      // FIXME: Patch
      if (_module.name == 'ol/PluggableMap' && parsedType.name == 'FrameState')
        parsedType = Object.assign({}, parsedType, { name: 'module:ol/PluggableMap~FrameState' });

      let typeStr = parsedType.expression ? parsedType.expression.name : parsedType.name;
      if (typeStr in GENERIC_TYPES)
        genericTypes = genericTypes.concat(GENERIC_TYPES[typeStr].split(/,\s?/));

      t = stringifyType(parsedType, _module);
    } catch (error) {
      logger.error('parseFunctionType --', t);
      logger.error(error);
    }

    return t;
  };

  const match = type.match(/^function\((.+?)\)(: ?(.+?))?$/);
  if (match) {
    params = match[1].split(/,\s?/).map((p, i) => {
      let name = `param${i}`;
      if (p.startsWith('this:')) {
        name = 'this';
        p = p.replace(/^this:\s?/, '');
      }
      if (p.match(/^\?.+$/))
        name += '?';
      return `${name}: ` + (p.split(/\s?\|\s?/).map(parse).filter(t => t != 'undefined').join(' | ') || 'any');
    }).filter(p => !!p).join(', ');

    if (match[3])
      returnType = match[3].split(/\s?\|\s?/).map(parse).filter(t => t != 'undefined').join(' | ') || 'void';
  }

  let expression = `(${params}) => ${returnType}`;
  if (genericTypes.length)
    expression = `<${Array.from(new Set(genericTypes)).join(', ')}>` + expression;
  // Wrap arrow function in braces
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

  return doclet.type.names.map(type => {
    /** @type {ParsedType} */
    let parsedType;
    let prefix = '';

    if (_module.name == 'ol/source/Raster' && type == 'RasterOperationType')
      return '\'pixel\' | \'image\'';

    if (type.startsWith('typeof:')) {
      prefix = 'typeof ';
      type = type.replace(/^typeof:/, '');
    }

    if (type.startsWith('function'))
      type = parseFunctionType(type, _module);
    else
      try {
        parsedType = catharsis.parse(type, { jsdoc: true });
        type = stringifyType(parsedType, _module);
      } catch (error) {
        logger.error('getType --', doclet.longname, type);
        logger.error(error);
      }

    return prefix + type;
  }).filter(t => t != 'undefined').join(' | ') || 'any';
}

/** @type {DocletParser} */
function getReturnType(doclet, _module) {
  const returnTypes = [];

  if (doclet.yields || doclet.returns)
    (doclet.yields || doclet.returns).forEach(r => {
      returnTypes.push(getType(r, _module));
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
      let paramType = getType(param, _module);

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
      if (doclet.isEnum || doclet.kind == 'constant')
        suffix = `\n\nexport default ${registerImport(_module, doclet.name)};`;
      else
        prefix = 'export default ';
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
    }).order('access, kind desc').get().forEach(child => {
      // Remove non alphanumeric from member name
      child.name = child.name.replace(/\W/g, '');
      const processorName = child.kind == 'function' ? 'method' : child.kind == 'constant' ? 'member' : child.kind;
      children.push(PROCESSORS[processorName](child, _module));
    });

    const addFire = (eventType, fireType) => {
      if (fireType.startsWith('ol'))
        fireType = 'module:' + fireType;

      let genericType = GENERIC_TYPES[fireType];
      if (genericType && genericType == GENERIC_TYPES[doclet.longname])
        genericType = null;

      fireType = getType({ type: { names: [fireType || 'undefined'] } }, _module);

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
      doclet.fires.forEach(fire => {
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
              addFire(eventType, fireType, _module);
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
      }).join('\n\n');

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

        children.push(`${name}: ${getType(prop, _module)};`);
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

  enum: (doclet, _module) => {
    const name = registerImport(_module, doclet.name) + ' ';
    const type = getType(doclet, _module);
    let children = [];
    if (doclet.properties)
      children = doclet.properties.map(prop => {
        let value = prop.defaultvalue;
        if (type == 'string')
          value = `'${value}'`;
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
    content += _imports.expressions.join('\n') + '\n\n';

  let reExports = [];
  if (_exports && _exports.reExports.length) {
    _exports.reExports.forEach(x => {
      const match = x.match(/^(export\s{)(.+?)(}\sfrom\s['"])(.+?)(['"];)$/);
      if (match && match[2].indexOf(' as ') == -1) {
        const names = match[2].split(/,\s?/).map(name => {
          name = name.trim();
          const isDuplicate = find({ name: name, memberof: doclet.longname }).length > 0;
          const isInvalid = !find({ name: name, memberof: `module:${match[4]}` }).length;

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
    MODULE_EXPORTS[doclet.name].reExports = reExports;
    content += reExports.join('\n') + '\n\n';
  }

  if (!content && !children.length) {
    logger.warn('Empty module --', doclet.name);
    return;
  }

  if (children.length)
    content += children.join('\n\n') + '\n\n';

  content = `declare module '${doclet.name}' {\n\n${content}}`;

  if (emitOutput) {
    const moduleOutDir = path.resolve(outDir, doclet.name);
    fs.mkPath(moduleOutDir);
    fs.writeFileSync(path.resolve(moduleOutDir, 'index.d.ts'), content);
  }

  return content;
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

  find(
    { kind: ['function', 'class'] },
    [{ params: { isArray: true } }, { returns: { isArray: true } }, { yields: { isArray: true } }]
  ).forEach(doclet => {
    let genericTypes = [];

    if (doclet.longname in GENERIC_TYPES)
      genericTypes = GENERIC_TYPES[doclet.longname].split(/,\s?/);

    const merged = (doclet.params || []).concat(doclet.yields || doclet.returns || []);

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
    if (!doclet) continue;
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
  rimraf.sync(outDir);

  /**
   * Emit declaration files
   */
  if (declarationConfig.mode == 'single') {
    /**
     * Generate single declaration file
     */
    const content = members.modules.map(doclet => generateDeclaration(doclet, false)).join('\n\n');
    const outputPath = path.resolve(outDir, 'ol', 'index.d.ts');
    fs.mkPath(path.dirname(outputPath));
    fs.writeFileSync(outputPath, content);
  } else {
    /**
     * Generate multiple declaration files
     */
    members.modules.forEach(doclet => generateDeclaration(doclet));
  }
};
