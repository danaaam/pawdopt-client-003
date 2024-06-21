const path = require('path');

module.exports = {
  // Other configurations...
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
      "https": require.resolve("https-browserify"),
      "querystring": require.resolve("querystring-es3")
    }
  }
};
