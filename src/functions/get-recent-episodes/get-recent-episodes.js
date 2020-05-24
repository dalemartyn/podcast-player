const getPodcastData = require('../../../tasks/get-podcast-data');

exports.handler = function(event, context, callback) {
  const body = JSON.parse(event.body);
  const url = body.url;

  getPodcastData(url, 30)
    .then(sendResponse)
    .catch(onError);

  function sendResponse(podcastData) {
    callback(null, {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(podcastData)
    });
  }

  function onError(err) {
    console.log(err, err.stack);
    callback(err);
  }

}
