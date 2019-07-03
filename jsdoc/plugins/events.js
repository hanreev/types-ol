const events = {};

exports.handlers = {
  newDoclet: (/** @type {NewDocletEvent} */ e) => {
    const doclet = e.doclet;
    if (doclet.kind !== 'event') return;

    const cls = doclet.longname.split('#')[0];
    if (!(cls in events)) events[cls] = [];
    events[cls].push(doclet.longname);
  },

  parseComplete: (/** @type {ParseCompleteEvent} */ e) => {
    const doclets = e.doclets;
    for (let i = 0, ii = doclets.length - 1; i < ii; ++i) {
      const doclet = doclets[i];
      if (doclet.longname == 'module:ol/render/canvas/LabelCache~LabelCache')
        doclet.fires = ['module:ol/events/Event~event:Event'];
      if (doclet.fires)
        if (doclet.kind == 'class') {
          const fires = [];
          for (let j = 0, jj = doclet.fires.length; j < jj; ++j) {
            let event = doclet.fires[j].replace('event:', '');
            if (event == 'module:ol/source/Vector.VectorSourceEvent<Geometry>')
              event = 'module:ol/source/Vector.VectorSourceEvent';
            if (events[event]) fires.push.apply(fires, events[event]);
            else if (doclet.fires[j] !== 'event:ObjectEvent') fires.push(doclet.fires[j]);
          }
          doclet.fires = fires;
        }
    }
  },
};
