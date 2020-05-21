const Parser = require('rss-parser');
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml'
  }
});

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const url = body.url;
  const data = await parser.parseURL(url);

  // TODO: add DOMPurify https://www.npmjs.com/package/dompurify

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}
