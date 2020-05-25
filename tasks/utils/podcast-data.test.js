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
