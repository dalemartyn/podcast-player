const getPodcastData = require('./get-podcast-data');

async function get(url) {
  const data = await getPodcastData(url, 1);

  console.log(data.meta);
}

get('https://changelog.com/podcast/feed');
