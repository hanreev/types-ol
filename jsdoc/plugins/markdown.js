/**
 * Modified from JSDoc's plugins/markdown and lib/jsdoc/util/markdown modules
 * (see https://github.com/jsdoc3/jsdoc/), which are licensed under the Apache 2
 * license (see http://www.apache.org/licenses/LICENSE-2.0).
 *
 * This version does not protect http(s) urls from being turned into links, and
 * works around an issue with `~` characters in module paths by escaping them.
 */

const marked = require('marked');
const format = require('util').format;

const tags = ['author', 'classdesc', 'description', 'exceptions', 'params', 'properties', 'returns', 'see', 'summary'];

const hasOwnProp = Object.prototype.hasOwnProperty;

const markedRenderer = new marked.Renderer();

/**
 * Allow prettyprint to work on inline code samples
 * @param {string} code
 * @param {string} language
 * @returns {string}
 */
markedRenderer.code = (code, language) => {
  const langClass = language ? ' lang-' + language : '';

  return format('<pre class="prettyprint source%s"><code>%s</code></pre>', langClass, escapeCode(code));
};

/**
 * @param {string} source
 * @returns {string}
 */
function escapeCode(source) {
  return source
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * @param {string} source
 * @returns {string}
 */
function escapeUnderscoresAndTildes(source) {
  return source.replace(/\{@[^}\r\n]+\}/g, wholeMatch => {
    return wholeMatch.replace(/(^|[^\\])_/g, '$1\\_').replace('~', '&tilde;');
  });
}

/**
 * @param {string} source
 * @returns {string}
 */
function unencodeQuotesAndTildes(source) {
  return source.replace(/\{@[^}\r\n]+\}/g, wholeMatch => {
    return wholeMatch.replace(/&quot;/g, '"').replace(/&tilde;/g, '~');
  });
}

/**
 * @param {string} source
 * @returns {string}
 */
function parse(source) {
  /** @type {string} */
  let result;

  source = escapeUnderscoresAndTildes(source);

  result = marked(source, { renderer: markedRenderer })
    .replace(/\s+$/, '')
    .replace(/&#39;/g, `'`);

  result = unencodeQuotesAndTildes(result);

  return result;
}

/**
 * @param {string} tagName
 * @param {string} text
 * @returns {boolean}
 */
function shouldProcessString(tagName, text) {
  let shouldProcess = true;

  // we only want to process `@author` and `@see` tags that contain Markdown links
  if ((tagName === 'author' || tagName === 'see') && text.indexOf('[') === -1) shouldProcess = false;

  return shouldProcess;
}

/**
 * @param {Doclet} doclet
 */
function process(doclet) {
  tags.forEach(tag => {
    if (!hasOwnProp.call(doclet, tag)) return;

    if (typeof doclet[tag] === 'string' && shouldProcessString(tag, doclet[tag])) {
      doclet[tag] = parse(doclet[tag]);
    } else if (Array.isArray(doclet[tag])) {
      /** @type {string[]} */
      const docletTags = doclet[tag];
      docletTags.forEach((value, index, original) => {
        const inner = {};

        inner[tag] = value;
        process(/** @type {Doclet} */ (inner));
        original[index] = inner[tag];
      });
    } else if (doclet[tag]) {
      process(doclet[tag]);
    }
  });
}

exports.handlers = {
  /**
   * @param {NewDocletEvent} e
   */
  newDoclet(e) {
    process(e.doclet);
  },
};
