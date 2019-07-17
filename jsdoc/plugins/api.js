/**
 * Define an @api tag
 * @param {Object} dictionary The tag dictionary.
 */
exports.defineTags = dictionary => {
  dictionary.defineTag('api', {
    mustHaveValue: false,
    canHaveType: false,
    canHaveName: false,
    /**
     * @param {Doclet} doclet
     */
    onTagged(doclet) {
      includeTypes(doclet);
      doclet.stability = 'stable';
    },
  });
};

/*
 * Based on @api annotations, and assuming that items with no @api annotation
 * should not be documented, this plugin removes undocumented symbols
 * from the documentation.
 */

/** @type {Array<Doclet>} */
const api = [];
/** @type {Object<string, Doclet>} */
const classes = {};
/** @type {Object<string, boolean>} */
const types = {};
/** @type {Object<string, boolean>} */
const modules = {};

/** @type {Object<string, Array<string>>} */
const force_include_members = {
  'module:ol/format/GMLBase': ['GMLNS'],
  'module:ol/format/IGC': ['IGCZ'],
  'module:ol/interaction/DragAndDrop': ['DragAndDropEvent', 'DragAndDropEventType'],
  'module:ol/interaction/DragBox': ['DragBoxEvent', 'DragBoxEventType'],
  'module:ol/interaction/Draw': ['DrawEvent', 'DrawEventType'],
  'module:ol/interaction/Select': ['SelectEvent', 'SelectEventType'],
  'module:ol/proj/epsg3857': [],
  'module:ol/proj/epsg4326': [],
  'module:ol/render/replay': [],
  'module:ol/reproj/common': [],
  'module:ol/source/common': [],
  'module:ol/source/Image': ['ImageSourceEvent', 'ImageSourceEventType'],
  'module:ol/source/Raster': ['RasterSourceEvent'],
  'module:ol/source/Vector': ['VectorSourceEvent'],
  'module:ol/tilegrid/common': [],
};

/**
 * @param {Doclet} doclet
 */
function includeAugments(doclet) {
  const augments = doclet.augments;
  if (augments) {
    /** @type {Doclet} */
    let cls;
    for (let i = augments.length - 1; i >= 0; --i) {
      cls = classes[augments[i]];
      if (cls) {
        includeAugments(cls);
        if (cls.fires) {
          if (!doclet.fires) doclet.fires = [];

          cls.fires.forEach(f => {
            if (doclet.fires.indexOf(f) == -1) doclet.fires.push(f);
          });
        }
        if (cls.observables) {
          if (!doclet.observables) doclet.observables = [];

          cls.observables.forEach(f => {
            if (doclet.observables.indexOf(f) == -1) doclet.observables.push(f);
          });
        }
      }
    }
  }
}

/**
 * @param {Doclet} item
 */
function extractTypes(item) {
  item.type.names.forEach(type => {
    const match = type.match(/^(.*<)?([^>]*)>?$/);
    if (match) {
      modules[match[2]] = true;
      types[match[2]] = true;
    }
  });
}

/**
 * @param {Doclet} doclet
 */
function includeTypes(doclet) {
  if (doclet.params) doclet.params.forEach(extractTypes);

  if (doclet.returns) doclet.returns.forEach(extractTypes);

  if (doclet.properties) doclet.properties.forEach(extractTypes);

  if (doclet.type && doclet.meta.code.type == 'MemberExpression') extractTypes(doclet);
}

exports.handlers = {
  /**
   * @param {NewDocletEvent} e
   */
  newDoclet(e) {
    const doclet = e.doclet;
    if (doclet.stability) {
      modules[doclet.longname.split(/[~.]/).shift()] = true;
      api.push(doclet);
    }

    if (doclet.kind == 'class') {
      modules[doclet.longname.split(/[~.]/).shift()] = true;
      if (!(doclet.longname in classes)) classes[doclet.longname] = doclet;
      else if ('augments' in doclet) classes[doclet.longname].augments = doclet.augments;
    }

    if (doclet.name === doclet.longname && !doclet.memberof) doclet.setMemberof(doclet.longname);
  },

  /**
   * @param {ParseCompleteEvent} e
   */
  parseComplete(e) {
    const doclets = e.doclets;
    for (let i = doclets.length - 1; i >= 0; --i) {
      const doclet = doclets[i];

      if (doclet.longname in force_include_members)
        doclet.force_include_members = force_include_members[doclet.longname];

      if (doclet.stability) {
        if (doclet.kind == 'class') includeAugments(doclet);

        if (doclet.fires) doclet.fires.sort((a, b) => (a.split(/#?event:/)[1] < b.split(/#?event:/)[1] ? -1 : 1));

        if (doclet.observables) doclet.observables.sort((a, b) => (a.name < b.name ? -1 : 1));
        // Always document namespaces and items with stability annotation
        continue;
      }

      if (doclet.kind == 'module')
        // Document all modules that are referenced by the API
        continue;

      if (doclet.isEnum || doclet.kind == 'typedef' || doclet.kind == 'function') continue;

      // FIXME: PATCHES
      if (doclet.memberof in force_include_members)
        if (force_include_members[doclet.memberof].length) {
          if (force_include_members[doclet.memberof].indexOf(doclet.name) != -1) continue;
        } else {
          continue;
        }

      if (doclet.kind == 'class') {
        includeAugments(doclet);
      } else if (
        doclet.undocumented !== false &&
        !doclet._hideConstructor &&
        !(doclet.kind == 'typedef' && doclet.longname in types)
      ) {
        if (doclet.access == 'protected') continue;
        doclet.undocumented = true;
      }
    }
  },
};
