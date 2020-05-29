const createDOMPurify = require('dompurify');
const {
  JSDOM
} = require('jsdom');
const autop = require('autop');
const { DateTime } = require('luxon');
const he = require('he');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitize(dirty) {
  return replaceNonBreakingSpaces(DOMPurify.sanitize(dirty));
}

function truncate(text) {
  const words = text.split(' ');

  if (words.length < 32) {
    return text;
  }

  return words.slice(0, 31).join(' ') + '…';
}

function replaceNonBreakingSpaces(str) {
  return str.replace(/&nbsp;/g, ' ');
}

function getSanitizedContent(str) {
  const sanitized = DOMPurify.sanitize(str, {
    ALLOWED_TAGS: ['p'],
    ALLOWED_ATTR: []
  });
  return sanitized;
}

function getFirstParagraph(unsanitizedContent) {
  const content = getSanitizedContent(autop(unsanitizedContent));
  const a = content.indexOf('<p>') + 3;
  const b = content.indexOf('</p>');
  const firstPara = content.substring(a, b);
  return replaceNonBreakingSpaces(firstPara);
}

function getRSSSubtitle(post) {
  const firstPara = getFirstParagraph(post.summary);
  return he.decode(truncate(firstPara));
}

function getRSSSummary(post) {
  const content = autop(post.summary);
  return getSanitizedContent(content);
}

function getItunesSubtitle(post) {
  if (post["itunes:subtitle"]) {
    const subtitle = post["itunes:subtitle"]["#"];
    if (subtitle) {
      return he.decode(truncate(subtitle));
    }
  }
  return null;
}

function getItunesSummary(post) {
  return post["itunes:summary"];
}

function getItunesDuration(post) {
  if (post["itunes:duration"]) {
    return post["itunes:duration"]["#"];
  }
  return null;
}

function getTitle(post) {
  return he.decode(sanitize(post.title));
}

function getContent(post) {
  return he.decode(sanitize(post.summary));
}

function getSubtitle(post) {
  const itunesSubtitle = getItunesSubtitle(post);

  if (itunesSubtitle) {
    return itunesSubtitle;
  }

  return getRSSSubtitle(post);
}

function getSummary(post) {
  const itunesSummary = getItunesSummary(post);

  if (itunesSummary) {
    return itunesSummary;
  }

  return getRSSSummary(post);
}

function getItunesImage(post) {
  const itunesImage = post['itunes:image'];

  if (itunesImage && itunesImage['@'] && itunesImage['@'].href) {
    return sanitize(itunesImage['@'].href);
  }

  return sanitize(post.image.url);
}

function getMedia(post) {
  return post.enclosures[0];
}

function getDuration(post) {
  return parseDuration(getItunesDuration(post));
}

function getDate(jsDate) {
  const dt = DateTime.fromJSDate(jsDate);

  return dt.toFormat('MMM dd, yyyy');
}

function getPodcastMeta(post, url) {
  const meta = {
    title: getTitle(post),
    description: he.decode(sanitize(post.description)),
    originalImage: getItunesImage(post),
    link: sanitize(post.link),
    date: getDate(post.date),
    url
  };

  const subtitle = getItunesSubtitle(post);
  if (subtitle) {
    meta.subtitle = subtitle;
  }

  return meta;
}

function parseDuration(duration) {
  if (!duration) return null;

  if (!isNaN(Number(duration))) {
    return Math.floor(Number(duration / 60)) + ' mins';
  }

  let match = duration.match(/(\d?\d):(\d\d):(\d\d)/);

  if (match) {
    const hours = Number(match[1]);
    const minutes = Math.floor(Number(match[2]));
    if (hours === 0) {
      return `${minutes} mins`;
    }
    return `${hours}h ${minutes}m`;
  }

  match = duration.match(/(\d?\d):(\d\d)/);

  if (match) {
    const minutes = Math.floor(Number(match[1]));
    return `${minutes} mins`;
  }

  return duration;
}

module.exports = {
  getTitle,
  getContent,
  getSubtitle,
  getSummary,
  getMedia,
  getDuration,
  getDate,
  getPodcastMeta,
  parseDuration
}
