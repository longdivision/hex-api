var getTopStoryIds = require('../net/firebase/getTopStoryIds');
var getStories = require('./getStories');

var getFrontPage = function(apiClientFactory) {
  var requestFactory = apiClientFactory('firebase');

  return getTopStoryIds(requestFactory).then(
      getStories.bind(null, apiClientFactory));
};

module.exports = getFrontPage;
