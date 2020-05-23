const createDOMPurify = require('dompurify');
const {
  JSDOM
} = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

module.exports = function sanitize(dirty) {
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });

  return clean.replace(/&nbsp;/g, ' ');
}
