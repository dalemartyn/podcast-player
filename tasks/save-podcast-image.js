const sharp = require('sharp');
const fs = require('fs');
const fetch = require('node-fetch');

async function savePodcastImage(filename, url) {

  try {
    const stream = await fetch(url)
      .then(res => res.body);

    const path = `./public/img/podcast-images/${filename}.png`;

    saveImage(path, stream);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Use sharp to resize the images to our specified sizes
 * as png and webp and saves a json file with the image data.
 *
 * @param {string} path
 * @param {ReadableStream} imageStream
 * @returns {Promise}
 */
async function saveImage(path, imageStream) {
  return new Promise(function(resolve, reject) {
    try {
      console.log(path);

      const transformer = sharp()
        .resize({
          width: 480,
          height: 480
        })
        .png();

      const output = fs.createWriteStream(path);

      output.on('error', function (e) {
        console.log(e);
        reject(e);
      });

      output.on('finish', function () {
        resolve();
      })

      imageStream
        .pipe(transformer)
        .pipe(output);

    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}


module.exports = savePodcastImage;
