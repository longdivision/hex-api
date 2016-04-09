var clientFactory = require('../net/firebase/clientFactory')
var getStoryCollection = require('../net/firebase/getStoryCollection')

const CACHE_KEY = 'ASK'
const FIREBASE_COLLECTION_NAME = 'askstories'
const STORIES_TO_SHOW = 100

var ask = function (cache, request, response) {
  var cachedVersion = cache.get(CACHE_KEY)

  if (cachedVersion) {
    response.json(cachedVersion)
  } else {
    var client = clientFactory.getClient()
    
    getStoryCollection(client, FIREBASE_COLLECTION_NAME, STORIES_TO_SHOW)
      .then(function (frontPage) {
        cache.set(CACHE_KEY, frontPage)
        response.json(frontPage)
      })
  }
}

module.exports = ask
