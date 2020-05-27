const {
  getDuration,
  parseDuration
} = require('./podcast-data');

test('can get duration from post object', () => {
  const post = require('../example-podcasts/example-podcast-exponent.json');
  expect(getDuration(post)).toBe('48 mins');
});

test('can parse duration', () => {
  expect(parseDuration(null)).toBe(null);
  expect(parseDuration(3032)).toBe('50 mins');
  expect(parseDuration('3032')).toBe('50 mins');
  expect(parseDuration('31:48:51')).toBe('31h 48m');
  expect(parseDuration('02:48:51')).toBe('2h 48m');
  expect(parseDuration('00:48:51')).toBe('48 mins');
  expect(parseDuration('1:48:51')).toBe('1h 48m');
  expect(parseDuration('48:51')).toBe('48 mins');
  expect(parseDuration('45:00')).toBe('45 mins');
});

test('can get podcast image', () => {
  const getPodcastData = require('../get-podcast-data');

  return getPodcastData('https://www.theguardian.com/football/series/forgotten-stories-of-football/podcast.xml')
    .then((data) => {
      expect(data.meta.originalImage).toBe('https://uploads.guim.co.uk/2020/05/11/Forgotten_Stories_of_Football_Final_(1).jpg');
    });
});
