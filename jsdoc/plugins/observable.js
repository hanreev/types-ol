/**
 * Define an @observable tag
 * @param {Object} dictionary The tag dictionary.
 */
exports.defineTags = dictionary => {
  dictionary.defineTag('observable', {
    mustNotHaveValue: true,
    canHaveType: false,
    canHaveName: false,
    /**
     * @param {Doclet} doclet
     */
    onTagged(doclet) {
      doclet.observable = '';
    },
  });
};

/** @type {Object<string, Doclet>} */
const classes = {};
/** @type {Object<string, Object>} */
const observables = {};
/** @type {Object<string, string[]>} */
const fires = {};
/** @type {Object<string, Array>} */
const clsObservables = {};

exports.handlers = {
  /**
   * @param {NewDocletEvent} e
   */
  newDoclet(e) {
    const doclet = e.doclet;
    if (doclet.kind == 'class' && !(doclet.longname in classes)) classes[doclet.longname] = doclet;
  },

  /**
   * @param {ParseCompleteEvent} e
   */
  parseComplete(e) {
    const doclets = e.doclets;
    let cls, doclet, event, i, ii, observable;
    for (i = 0, ii = doclets.length - 1; i < ii; ++i) {
      doclet = doclets[i];
      cls = classes[doclet.longname.split('#')[0]];
      if (typeof doclet.observable == 'string' && cls) {
        let name = doclet.name.replace(/^[sg]et/, '');
        name = name.substr(0, 1).toLowerCase() + name.substr(1);
        const key = doclet.longname.split('#')[0] + '#' + name;
        doclet.observable = key;
        if (!observables[key]) observables[key] = {};

        observable = observables[key];
        observable.name = name;
        observable.readonly = typeof observable.readonly == 'boolean' ? observable.readonly : true;
        if (doclet.name.indexOf('get') === 0) {
          observable.type = doclet.returns[0].type;
          observable.description = doclet.returns[0].description;
        } else if (doclet.name.indexOf('set') === 0) {
          observable.readonly = false;
        }

        if (doclet.stability) observable.stability = doclet.stability;

        if (!cls.observables) cls.observables = [];

        observable = observables[doclet.observable];
        if (observable.type && cls.observables.indexOf(observable) == -1) cls.observables.push(observable);

        const tmpObservables = clsObservables[cls.longname] || [];
        clsObservables[cls.longname] = Array.from(new Set(tmpObservables.concat(cls.observables)));

        if (!cls.fires) cls.fires = [];

        event = 'module:ol/Object.ObjectEvent#event:change:' + name;
        if (cls.fires.indexOf(event) == -1) cls.fires.push(event);

        const tmpFires = fires[cls.longname] || [];
        fires[cls.longname] = Array.from(new Set(tmpFires.concat(cls.fires)));
      }
    }

    for (i = 0, ii = doclets.length - 1; i < ii; ++i) {
      doclet = doclets[i];
      if (doclet.longname in fires) doclet.fires = fires[doclet.longname];
      if (doclet.longname in clsObservables) doclet.observables = clsObservables[doclet.longname];
    }
  },
};
