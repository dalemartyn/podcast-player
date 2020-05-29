const fetch = require('node-fetch');
const FeedParser = require('feedparser');
const {
  getTitle,
  getContent,
  getSubtitle,
  getSummary,
  getMedia,
  getDuration,
  getDate,
  getPodcastMeta
} = require('./utils/podcast-data');

module.exports = function getPodcastData(url, numEpisodes = 1) {
  return new Promise(function(resolve, reject) {
    let podcastMeta = {};
    let episodes = [];

    fetch(url, {
      headers: {
        Accept: 'application/rss+xml, application/xml'
      }
    }).then(function (res) {
      if (res.status !== 200) throw new Error('Bad status code');
      const responseStream = res.body;

      const feedparser = new FeedParser();
      feedparser.on('error', reject);
      feedparser.on('end', resolveWithData);

      feedparser.on('readable', function () {

        if (episodes.length >= numEpisodes) {
          responseStream.destroy();
        }

        let post = this.read();

        while (post && episodes.length <= numEpisodes) {
          const media = getMedia(post);

          if (!media) {
            post = this.read();
            continue;
          }

          const title = getTitle(post);
          const content = getContent(post);
          const subtitle = getSubtitle(post);
          const summary = getSummary(post);
          const duration = getDuration(post);
          const date = getDate(post.date);
          const timestamp = post.date.valueOf();
          const guid = post.guid;

          const episode = {
            title,
            date,
            guid,
            media,
            subtitle,
            summary,
            content,
            duration,
            timestamp
          }

          if (episodes.length === 0) {
            podcastMeta = getPodcastMeta(post.meta, url);
          }

          episodes.push(episode);
          post = this.read();
        }
      });

      responseStream.pipe(feedparser);
      responseStream.on('close', resolveWithData);

    }).catch(reject);

    function resolveWithData() {
      episodes.sort((a, b) => b.timestamp - a.timestamp);
      const items = episodes.map(({timestamp, ...attrs}) => attrs);
      resolve({
        meta: podcastMeta,
        items
      })
    }

  });
}
