const fetch = require('node-fetch');
const FeedParser = require('feedparser');

let i = 0;

async function get(feed) {
  // Get a response stream
  await fetch(feed, {
      headers: {
        Accept: 'application/rss+xml, application/xml'
      }
    }).then(function (res) {
    if (res.status !== 200) throw new Error('Bad status code');
    const responseStream = res.body;

    // Setup feedparser stream
    const feedparser = new FeedParser();
    feedparser.on('error', (e) => {
      console.log('fp err');
      done(e);
    });
    feedparser.on('end', (e) => {
      console.log('fp end');
      done(e);
    });
    feedparser.on('close', (e) => {
      console.log('fp close');
      done(e);
    });
    feedparser.on('readable', function() {
      let post;
      if (i > 9) {
        responseStream.destroy();
      }

      while (post = this.read()) {
        console.log("=============================");
        console.log(i);

        const episode = {
          title: post.title,
          date: post.date,
          guid: post.guid,
          media: post.enclosures[0]
        }

        i += 1;

        console.log(JSON.stringify(episode, null, 2));
        episode.desciption =  post.description;
      }
    });

    responseStream.on('error', (e) => {
      console.log('rs err');
      done(e);
    });

    responseStream.on('close', (e) => {
      console.log('rs close');
      done(e);
    });

    responseStream.pipe(feedparser);

  }).catch((err) => {
    console.log(err, err.stack);
  });

  console.log('?');
}

function done(err) {
  console.log('done');

  if (err) {
    console.log(err);
  }
}

// get('https://feeds.feedwrench.com/js-jabber.rss');
// get('https://changelog.com/podcast/feed');
get('http://http203.googledevelopers.libsynpro.com/rss');
