var getStoryWithComments = require('../net/firebase/getStoryWithComments');

var getStory = function(apiClientFactory, itemId) {
  var requestFactory = apiClientFactory('firebase');

  return getStoryWithComments(requestFactory, itemId);
};

module.exports = getStory;
