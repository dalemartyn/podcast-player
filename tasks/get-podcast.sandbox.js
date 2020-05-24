const getPodcastData = require('./get-podcast-data');

async function get(url) {
  await getPodcastData(url, 1);
}

get('https://nav.al/podcast/feed');
