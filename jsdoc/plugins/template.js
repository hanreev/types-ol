/**
 * Define a @template tag
 * @param {Object} dictionary The tag dictionary.
 */
exports.defineTags = dictionary => {
  dictionary.defineTag('template', {
    mustHaveValue: true,
    canHaveType: true,
    canHaveName: false,
    onTagged: addTemplate,
  });
};

/**
 * @param {Doclet} doclet
 * @param {Tag<TagValue>} tag
 */
function addTemplate(doclet, tag) {
  const value = tag.value;
  if (!value.description) return;
  doclet.genericTypes = value.description.split(/\s?,\s?/).map((t, i) => {
    return {
      name: t,
      type: value.type && i === 0 ? value.type : null,
    };
  });
}
