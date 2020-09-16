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

/** @type {Doclet[]} */
const api = [];
/** @type {Object<string, Doclet>} */
const classes = {};
/** @type {Object<string, boolean>} */
const types = {};
/** @type {Object<string, boolean>} */
const modules = {};

/** @type {Object<string, string[]>} */
const force_include_members = {
  'module:ol/format/IGC': ['IGCZ'],
  'module:ol/Geolocation': ['GeolocationError'],
  'module:ol/interaction/DragAndDrop': ['DragAndDropEvent', 'DragAndDropEventType'],
  'module:ol/interaction/DragBox': ['DragBoxEvent'],
  'module:ol/interaction/Draw': ['DrawEvent', 'DrawEventType'],
  'module:ol/interaction/Extent': ['ExtentEvent'],
  'module:ol/interaction/Modify': ['ModifyEventType'],
  'module:ol/interaction/Select': ['SelectEvent', 'SelectEventType'],
  'module:ol/interaction/Translate': ['TranslateEventType'],
  'module:ol/layer/MapboxVector': ['SourceType'],
  'module:ol/source/Raster': ['RasterOperationType'],
  'module:ol/source/TileDebug': ['LabeledTile'],
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

      if (doclet.fires) doclet.fires.sort((a, b) => (a.split(/#?event:/)[1] < b.split(/#?event:/)[1] ? -1 : 1));

      if (doclet.stability) {
        if (doclet.kind == 'class') includeAugments(doclet);
        if (doclet.observables) doclet.observables.sort((a, b) => (a.name < b.name ? -1 : 1));
        continue;
      }

      if (doclet.isEnum || ['module', 'typedef', 'function'].includes(doclet.kind)) continue;

      // FIXME: PATCHES
      if (doclet.memberof in force_include_members && force_include_members[doclet.memberof].includes(doclet.name))
        continue;

      if (doclet.kind == 'class') {
        includeAugments(doclet);
      } else if (doclet.undocumented !== false && !doclet._hideConstructor && !(doclet.longname in types)) {
        if (doclet.access == 'protected') continue;
        doclet.undocumented = true;
      }
    }
  },
};
