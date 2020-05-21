const Parser = require('rss-parser');
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml'
  }
});
const savePodcastImage = require('./save-podcast-image');
const slugify = require('@sindresorhus/slugify');

const { writeFile } = require('fs/promises');

let podcasts = [
  "https://rss.simplecast.com/podcasts/6265/rss",
  "https://feed.podbean.com/audio.javascriptair.com/feed.xml",
  "http://http203.googledevelopers.libsynpro.com/rss",
  "https://feeds.feedwrench.com/js-jabber.rss",
  "https://gomakethings.com/podcast/feed.rss",
  "https://changelog.com/podcast/feed",
  "https://anchor.fm/s/10dbd4bc/podcast/rss",
  "https://feeds.transistor.fm/maintainers-anonymous",
  "http://exponent.fm/feed/",
  "https://rss.art19.com/freakonomics-radio"
];

async function getPodcastData(url) {
  let data;
  try {
    data = await parser.parseURL(url);
  } catch (e) {
    console.log(e);
  }

  if (data) {
    const filename = slugify(data.title, {
      decamelize: false
    });
    await savePodcastImage(filename, data.itunes.image);

    return {
      title: data.title,
      image: `/img/podcast-images/${filename}.png`,
      url: url,
      description: data.description
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

