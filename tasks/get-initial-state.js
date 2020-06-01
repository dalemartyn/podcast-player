const getPodcastData = require('./get-podcast-data');
const savePodcastImage = require('./save-podcast-image');
const slugify = require('@sindresorhus/slugify');

const { writeFile } = require('fs/promises');

const categories = [
  {
    title: "Web",
    slug: "web",
    podcasts: [
      "https://rss.simplecast.com/podcasts/6265/rss",                // react podcast
      "http://http203.googledevelopers.libsynpro.com/rss",           // http 203
      "https://pinecast.com/feed/ladybug-podcast",                   // ladybug
      "https://changelog.com/podcast/feed",                          // changelog
      "https://anchor.fm/s/cf40bd0/podcast/rss",                     // fist & scripts
      "https://feed.syntax.fm/rss",                                  // syntax fm
      "https://gomakethings.com/podcast/feed.rss",                   // vanilla js
      "https://anchor.fm/s/10dbd4bc/podcast/rss",                    // svelte radio
      "https://feeds.feedwrench.com/js-jabber.rss",                  // javascript jabber
      "https://feeds.transistor.fm/maintainers-anonymous",           // maintainers anonymous
    ]
  },
  {
    title: "Business",
    slug: "business",
    podcasts: [
      "http://exponent.fm/feed/",                                    // exponent
      "https://rss.art19.com/freakonomics-radio",                    // feakonomics
      "https://feeds.simplecast.com/JGE3yC0V",                       // a16z
      "https://feeds.megaphone.fm/recodedecode",                     // recode decode
      "https://rss.art19.com/tim-ferriss-show",                      // tim ferriss
      "https://feeds.npr.org/510313/podcast.xml",                    // how i built this
      "https://pinecast.com/feed/commerce-tea",                      // commerce tea
      "https://feeds.transistor.fm/rework",                          // rework
      "https://sivers.org/podcast.rss",                              // derek sivers
      "https://naval.libsyn.com/rss",                                // naval
    ]
  },
  {
    title: "Design",
    slug: "design",
    podcasts: [
      "https://rss.simplecast.com/podcasts/1034/rss",                // design details
      "https://feeds.99percentinvisible.org/99percentinvisible",     // 99% invisible
      "https://designobserver.com/show.designmatters2009-10.xml",    // design matters
      "https://www.relay.fm/presentable/feed",                       // presentable
      "http://googledesignmethod.libsyn.com/rss",                    // method podcast
      "http://designnotes.fm/rss",                                   // design notes
      "https://feeds.simplecast.com/4MvgQ73R",                       // ui breakfast
      "http://feeds.feedburner.com/uxpodcast",                       // ux podcast
      "https://feeds.pacific-content.com/wireframe",                 // wireframe
    ]
  },
  {
    title: "Technology",
    slug: "technology",
    podcasts: [
      "https://feeds.megaphone.fm/vergecast",                        // vergecast
      "http://feeds.feedburner.com/WaveformWithMkbhd",               // waveform
      "https://feeds.megaphone.fm/gadget-lab",                       // gadget lab
      "https://daringfireball.net/thetalkshow/rss",                  // the talk show daring fireball
      "https://feeds.theoutline.com/tomorrow",                       // tomorrow
    ]
  },
  {
    title: "Football",
    slug: "football",
    podcasts: [
      "https://audioboom.com/channels/2402227.rss",                  // the anfield wrap
      "https://audioboom.com/channels/5005036.rss",                  // jamie carragher
      "https://www.spreaker.com/show/3382900/episodes/feed",         // gary neville
      "https://podcasts.files.bbci.co.uk/p06kyljg.rss",              // peter crouch
      "https://rss.acast.com/footballweekly",                        // guardian football weekly
      "https://www.spreaker.com/show/3382902/episodes/feed",         // sky sports
      "https://rss.acast.com/quicklykevin",                          // quickly kevin
      "https://rss.acast.com/athleticomince",                        // athletico mince
      "https://feeds.simplecast.com/_cY16e7I",                       // red agenda
      "https://podcast.global.com/show/4329967/episodes/feed",       // blood red
    ]
  }
];

const extraPodcasts = [
  "https://podcasts.files.bbci.co.uk/p0742833.rss",                  // bbc obsessed with
];

async function getPodcast(url) {
  let data;
  try {
    data = await getPodcastData(url, 1);
  } catch (e) {
    console.log(e);
  }

  if (data.meta) {
    const meta = data.meta;
    const filename = slugify(meta.title, {
      decamelize: false
    });

    if (meta.originalImage) {
      await savePodcastImage(filename, meta.originalImage);
      meta.image = `/img/podcast-images/${filename}.png`
    }
    return meta;
  } else {
    return {
      url: url
    };
  }

}

function getAllData(categories) {
  const categoryPodcastPromises = categories.map(function(category) {
    const urls = category.podcasts;
    return Promise.all(urls.map(getPodcast));
  });

  const extraPodcastsPromises = Promise.all(extraPodcasts.map(getPodcast));

  return Promise.all(
    [
      ...categoryPodcastPromises,
      extraPodcastsPromises
    ]
  );
}

function getInitialState(data) {
  const byUrl = {};
  data.forEach((podcast) => byUrl[podcast.url] = {
    meta: podcast
  });

  const initialState = {
    byUrl,
    categories
  };

  return initialState;
}

getAllData(categories)
  .then(function(data) {
    const initialState = getInitialState(data.flat(1));
    writeFile('./src/initial-state.json', JSON.stringify(initialState, null, 2));
  })
