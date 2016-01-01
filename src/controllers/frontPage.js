var getFrontPage = require('../service/getFrontPage');

const CACHE_KEY = 'FRONT_PAGE';

var frontPage = function(apiClientFactory, cache, request, response) {
  var cachedFrontPage = cache.get(CACHE_KEY);

  if (cachedFrontPage) {
    response.json(cachedFrontPage);
  } else {
    getFrontPage(apiClientFactory).then(function(frontPage) {
      cache.set(CACHE_KEY, frontPage);
      response.json(frontPage);
    });
  }
};

module.exports = frontPage;
