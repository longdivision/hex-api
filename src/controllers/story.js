var clientFactory = require('../net/firebase/clientFactory')
var getStoryWithComments = require('../net/firebase/getStoryWithComments')

const CACHE_KEY_PREFIX = 'STORY_'

var story = function (cache, request, response) {
  var id = request.params.id
  var cacheKey = CACHE_KEY_PREFIX + id

  if (!id) {
    response.sendStatus(404)
    return
  }

  var cachedStory = cache.get(cacheKey)

  if (cachedStory) {
    response.json(cachedStory)
  } else {
    var client = clientFactory.getClient()

    getStoryWithComments(client, request.params.id).then(function (story) {
      cache.set(cacheKey, story)
      response.json(story)
    })
  }
}

module.exports = story
