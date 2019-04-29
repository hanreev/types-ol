// @ts-nocheck
/* global env */

const path = require('path');

const moduleRoot = path.resolve(env.conf.typescript.moduleRoot);

const MODULE_EXPORTS = {};

const SOURCE_OVERRIDES = {};

const shaderSource = `
/**
 * @const
 * @type {module:ol/webgl/Fragment~WebGLFragment}
 * @api
 */
export const fragment = null;

/**
 * @const
 * @type {module:ol/webgl/Vertex~WebGLVertex}
 * @api
 */
export const vertex = null;
`;

const shaderModules = [
  'ol/render/webgl/circlereplay/defaultshader',
  'ol/render/webgl/linestringreplay/defaultshader',
  'ol/render/webgl/polygonreplay/defaultshader',
  'ol/render/webgl/texturereplay/defaultshader',
  'ol/renderer/webgl/defaultmapshader',
  'ol/renderer/webgl/tilelayershader',
];

shaderModules.forEach(moduleName => {
  const filename = path.resolve(moduleRoot, `${moduleName}.js`);
  SOURCE_OVERRIDES[filename] = `/**\n * @module ${moduleName}\n */\n${shaderSource}`;
});


function remapExports(doclet) {
  const filename = path.join(doclet.meta.path, doclet.meta.filename);

  if (!MODULE_EXPORTS[filename])
    return;

  doclet.exports = MODULE_EXPORTS[filename];

  if (doclet.exports.default == '{')
    doclet.exports.default = doclet.longname;

  if (doclet.exports.reExports.length)
    doclet.exports.reExports = doclet.exports.reExports.map(reExport => {
      return reExport.replace(/^(export\s{)(.+?)(}\sfrom\s['"])(.+?)(['"];)$/, (_, p1, p2, p3, p4, p5) => {
        p4 = path.normalize(path.join(doclet.meta.path, p4));
        p4 = path.relative(moduleRoot, p4);
        p2.split(/,\s?/).forEach(e => {
          if (e.indexOf(' as ') == -1)
            doclet.exports.exports.push(e);
        });
        return p1 + ` ${p2.trim()} ` + p3 + p4 + p5;
      });
    });
}

function extractFunctionDefinition(doclet, comment, isReturn = false) {
  if (!doclet.type)
    return;

  comment = comment || doclet.comment;
  comment = comment.replace(/^ *\*\/?( +)?/gm, '');

  const regex = isReturn ? /@return {(?:.+\|\s?)?(function.+?)}/gs : /{(?:.+\|\s?)?(function.+?)}\s+\[?(\w+)\]?/gs;
  let match;

  doclet.type.names = doclet.type.names.map(type => {
    if (type == 'function')
      do {
        match = regex.exec(comment);
        if (match && (isReturn || match[2] == doclet.name)) {
          type = match[1].replace(/\n/g, ' ');
          break;
        }
      } while (match);
    return type;
  });
}

exports.handlers = {

  newDoclet: e => {
    const doclet = e.doclet;

    if (doclet.kind == 'module')
      remapExports(doclet);

    if (doclet.type)
      extractFunctionDefinition(doclet);

    if (doclet.params)
      doclet.params.filter(param => param.name.indexOf('.') == -1)
        .forEach(param => extractFunctionDefinition(param, doclet.comment));

    if (doclet.properties)
      doclet.properties.forEach(prop => extractFunctionDefinition(prop, doclet.comment));

    if (doclet.yields || doclet.returns)
      (doclet.yields || doclet.returns).forEach(r => extractFunctionDefinition(r, doclet.comment, true));
  },

  beforeParse: e => {
    if (e.filename in SOURCE_OVERRIDES)
      e.source = SOURCE_OVERRIDES[e.filename];

    const _exports = {
      default: null,
      exports: [],
      reExports: []
    };
    const exportRegex = /^export\s([^{]+?)\s(.+?)[(\s;]/gm;
    const multipleExportRegex = /^export\s{(.+?)};/gm;
    const reExportRegex = /^export\s{.+?}\sfrom.+;/gm;
    let match;

    do {
      match = exportRegex.exec(e.source);
      if (match)
        if (match[1] == 'default')
          _exports.default = match[2];
        else
          _exports.exports.push(match[2]);
    } while (match);

    do {
      match = multipleExportRegex.exec(e.source);
      if (match)
        _exports.exports = _exports.exports.concat(match[1].split(/,\s?/));
    } while (match);

    do {
      match = reExportRegex.exec(e.source);
      if (match)
        _exports.reExports.push(match[0].replace('.js', ''));
    } while (match);

    MODULE_EXPORTS[e.filename] = _exports;

    // Fix multiple typedef in a comment
    e.source = e.source.replace(/\/\*\*.+?\*\//gs, m => {
      if (m.split('@typedef').length > 2)
        m = m.replace(/\s*?\*\s*?@typedef\s{.+}/g, tm => `\n*/\n\n/**${tm}`);
      return m;
    });

    // Fix optional parameter with multiple types
    e.source = e.source.replace(/{(.+?)=}/g, (_, p1) => `{(${p1})=}`);

    // Fix enums has undefined properties
    e.source = e.source.replace(/export const/g, 'const');
  }

};
