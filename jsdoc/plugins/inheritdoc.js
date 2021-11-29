/* eslint-disable no-prototype-builtins */
/*
 * This is a hack to prevent inheritDoc tags from entirely removing
 * documentation of the method that inherits the documentation.
 */

/**
 * Define an @inheritDoc tag
 * @param {Object} dictionary The tag dictionary.
 */
exports.defineTags = dictionary => {
  dictionary.defineTag('inheritDoc', {
    mustHaveValue: false,
    canHaveType: false,
    canHaveName: false,
    /**
     * @param {Doclet} doclet
     */
    onTagged(doclet) {
      doclet.inheritdoc = true;
    },
  });
};

const lookup = {};
const incompleteByClass = {};
const keepKeys = ['comment', 'meta', 'name', 'memberof', 'longname', 'augment', 'stability'];

exports.handlers = {
  /**
   * @param {NewDocletEvent} e
   */
  newDoclet(e) {
    const doclet = e.doclet;
    let incompletes;
    if (!(doclet.longname in lookup)) lookup[doclet.longname] = [];

    lookup[doclet.longname].push(doclet);
    if (doclet.inheritdoc) {
      if (!(doclet.memberof in incompleteByClass)) incompleteByClass[doclet.memberof] = [];

      incompletes = incompleteByClass[doclet.memberof];
      if (!incompletes.includes(doclet.name)) incompletes.push(doclet.name);
    }
  },

  /**
   * @param {ParseCompleteEvent} e
   */
  parseComplete(e) {
    let ancestors, candidate, candidates, doclet, i, j, k, l, key;
    let incompleteDoclet, stability, incomplete, incompletes;
    const doclets = e.doclets;
    for (i = doclets.length - 1; i >= 0; --i) {
      doclet = doclets[i];
      if (doclet.augments) ancestors = [].concat(doclet.augments);

      incompletes = incompleteByClass[doclet.longname];
      if (ancestors && incompletes) {
        // collect ancestors from the whole hierarchy
        for (j = 0; j < ancestors.length; ++j) {
          candidates = lookup[ancestors[j]];
          if (candidates)
            for (k = candidates.length - 1; k >= 0; --k) {
              candidate = candidates[k];
              if (candidate.augments) ancestors = ancestors.concat(candidate.augments);
            }
        }
        // walk through all inheritDoc members
        for (j = incompletes.length - 1; j >= 0; --j) {
          incomplete = incompletes[j];
          candidates = lookup[doclet.longname + '#' + incomplete];
          if (candidates)
            // get the incomplete doclet that needs to be augmented
            for (k = candidates.length - 1; k >= 0; --k) {
              incompleteDoclet = candidates[k];
              if (incompleteDoclet.inheritdoc) break;
            }
          // find the documented ancestor
          for (k = ancestors.length - 1; k >= 0; --k) {
            candidates = lookup[ancestors[k] + '#' + incomplete];
            if (candidates)
              for (l = candidates.length - 1; l >= 0; --l) {
                candidate = candidates[l];
                if (candidate && !candidate.inheritdoc) {
                  stability = candidate.stability || incompleteDoclet.stability;
                  if (stability) {
                    incompleteDoclet.stability = stability;
                    for (key in candidate)
                      if (candidate.hasOwnProperty(key) && !keepKeys.includes(key))
                        incompleteDoclet[key] = candidate[key];
                    // We have found a matching parent doc and applied it so we
                    // don't want to ignore this doclet anymore.
                    incompleteDoclet.ignore = false;
                    // We found a match so we can stop break
                    break;
                  }
                }
              }
          }
        }
      }
    }
  },
};
