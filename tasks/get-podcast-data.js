const Parser = require('rss-parser');
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml'
  }
});

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

let podcasts = [
  "https://rss.simplecast.com/podcasts/6265/rss",
  "https://feed.podbean.com/audio.javascriptair.com/feed.xml",
  "http://http203.googledevelopers.libsynpro.com/rss",
  "https://feeds.feedwrench.com/js-jabber.rss",
  "https://gomakethings.com/podcast/feed.rss",
  "https://changelog.com/podcast/feed",
  "http://exponent.fm/feed/",
  "https://rss.art19.com/freakonomics-radio",
  "https://feeds.transistor.fm/maintainers-anonymous"
];

async function getPodcastData(url) {
  let data;
  try {
    data = await parser.parseURL(url);
  } catch (e) {
    console.log(e);
  }

  if (data) {
    return {
      title: data.title,
      image: data.itunes.image,
      url: url
    }
  }

  return {
    url: url
  };

}
Promise.all(podcasts.map(getPodcastData))
  .then((data) => {
    writeFile('./src/podcasts.json', JSON.stringify(data, null, 2));
  });

