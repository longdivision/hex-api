var clientFactory = require('../net/firebase/clientFactory')
var getStoryCollection = require('../net/firebase/getStoryCollection')

const CACHE_KEY = 'NEW'
const FIREBASE_COLLECTION_NAME = 'newstories'
const STORIES_TO_LOAD = 100

var newController = function (cache, request, response) {
  var cachedVersion = cache.get(CACHE_KEY)

  if (cachedVersion) {
    response.json(cachedVersion)
  } else {
    var client = clientFactory.getClient()
    
    getStoryCollection(client, FIREBASE_COLLECTION_NAME, STORIES_TO_LOAD)
      .then(function (frontPage) {
        cache.set(CACHE_KEY, frontPage)
        response.json(frontPage)
      })
  }
}

module.exports = newController
