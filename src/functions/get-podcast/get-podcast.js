require('dotenv').config();
const Parser = require('rss-parser');
const parser = new Parser();

const PODCAST_FEED_URL = process.env.PODCAST_FEED_URL;

exports.handler = async (event, context, callback) => {
  const data = await parser.parseURL(PODCAST_FEED_URL);
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}
