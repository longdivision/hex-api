var getStory = require('../service/getStory');

var story = function (apiClientFactory, request, response) {
  if(!request.params.id) {
    response.sendStatus(404);
  } else {
    getStory(apiClientFactory, request.params.id).then(function(story) {
      response.json(story);
    });
  }
};

module.exports = story;
