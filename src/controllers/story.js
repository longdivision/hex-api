var getStory = require('../service/getStory')

const CACHE_KEY_PREFIX = 'STORY_'

var story = function (apiClientFactory, cache, request, response) {
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
    getStory(apiClientFactory, request.params.id).then(function (story) {
      cache.set(cacheKey, story)
      response.json(story)
    })
  }
}

module.exports = story
