const createDOMPurify = require('dompurify');
const {
  JSDOM
} = require('jsdom');
const autop = require('autop');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitize(dirty) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p'],
    ALLOWED_ATTR: []
  });
}

function getSanitizedContent(str) {
  return sanitize(autop(str));
}

function getSummary(sanitizedContent) {
  const a = sanitizedContent.indexOf('<p>') + 3;
  const b = sanitizedContent.indexOf('</p>');
  const firstParaContent = sanitizedContent.substring(a, b);
  const firstPara = firstParaContent.replace(/&nbsp;/g, ' ');

  const words = firstPara.split(' ');
  if (words.length < 32) {
    return firstPara;
  }

  return words.slice(0, 31).join(' ') + '…';
}

module.exports = {
  getSanitizedContent,
  getSummary
}
