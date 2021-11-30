/**
 * Define a @template tag
 * @param {Object} dictionary The tag dictionary.
 */
exports.defineTags = dictionary => {
  dictionary.defineTag('template', {
    mustHaveValue: true,
    canHaveType: true,
    canHaveName: true,
    onTagged: addTemplate,
  });
};

/**
 * @param {Doclet} doclet
 * @param {Tag<TagValue>} tag
 */
function addTemplate(doclet, tag) {
  const { name, type } = tag.value;
  if (!name) return;
  doclet.genericTypes = doclet.genericTypes || [];
  doclet.genericTypes.push({ name, type });
}
