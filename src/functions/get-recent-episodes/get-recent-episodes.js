const fetch = require('node-fetch');
const FeedParser = require('feedparser');
const {
  getTitle,
  getContent,
  getSubtitle,
  getSummary,
  getMedia,
  getDuration,
  getDate
} = require('./utils');

exports.handler = function(event, context, callback) {
  const body = JSON.parse(event.body);
  const url = body.url;

  let episodes = [];

  fetch(url, {
    headers: {
      Accept: 'application/rss+xml, application/xml'
    }
  }).then(function (res) {
    if (res.status !== 200) throw new Error('Bad status code');
    const responseStream = res.body;

    const feedparser = new FeedParser();
    feedparser.on('error', onError);
    feedparser.on('end', sendResponse);
    feedparser.on('readable', function () {

      if (episodes.length > 49) {
        responseStream.destroy();
      }

      let post = this.read();

      while (post && episodes.length < 50) {
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
        const guid = post.guid;

        const episode = {
          title,
          date,
          guid,
          media,
          subtitle,
          summary,
          content,
          duration
        }

        episodes.push(episode);
        post = this.read();
      }
    });

    responseStream.pipe(feedparser);
    responseStream.on('close', sendResponse);

  }).catch(onError);

  function sendResponse() {
    console.log('sending response');
    callback(null, {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        items: episodes
      })
    });
  }

  function onError(err) {
    console.log(err, err.stack);
    callback(err);
  }

}
