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

  const items = data.items.map((item) => {
    return {
      title: item.title,
      content: item.content,
      summary: item.contentSnippet,
      media: item.enclosure,
      guid: item.guid,
      date: item.pubDate,
      link: item.link,
      isoDate: item.isoDate
    };
  });

  const meta = {
    title: data.title,
    link: data.link,
    image: data.image.url,
    itunesImage: data.itunes.image
  }

  const podcast = {
    ...meta,
    items
  }

  // TODO: add DOMPurify https://www.npmjs.com/package/dompurify

  return {
    statusCode: 200,
    body: JSON.stringify(podcast)
  }
}
