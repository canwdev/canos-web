const fs = require('fs');
const Path = require('path');

function isBase64Image(str) {
  return /^data:image\/([a-zA-Z]*);base64,/.test(str)
}

function isSrcHttpUrl(url) {
  return /^(https?:)/gi.test(url)
}

function isUrlImage(url) {
  return /\.(?:jpg|jpeg|jfif|pjpeg|pjp|gif|apng|png|webp|svg|avif)$/gi.test(url)
}

function svg(buffer) {
  const base64 = buffer.toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

function img(buffer, ext) {
  return '"data:image/' + ext + ';base64,' + buffer.toString('base64') + '"';
}

module.exports = functions = (options = {}) => {
  const {
    base = process.cwd()
  } = options
  return {
    // https://github.com/sass/node-sass#options
    'url($file)': (url) => {
      let str = url.getValue()

      if (isBase64Image(str) || isSrcHttpUrl(str) || /^\//ig.test(str) || !isUrlImage(str)) {
        url.setValue(`url(${str})`)
        return url;
      }

      const filePath = Path.join(base, str);
      // console.log(filePath)
      const buffer = fs.readFileSync(filePath);

      if (/\.svg$/gi.test(str)) {
        str = svg(buffer)
      } else {
        str = img(buffer)
      }

      url.setValue(`url(${str})`)
      return url;
    }
  }
}
