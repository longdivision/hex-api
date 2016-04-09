var clientFactory = require('../net/firebase/clientFactory')
var getStoryCollection = require('../net/firebase/getStoryCollection')
var getStoryWithComments = require('../net/firebase/getStoryWithComments')

const COLLECTION_NAME_TO_CACHE_KEY = {
  'askstories': 'ASK',
  'jobstories': 'JOBS',
  'newstories': 'NEW',
  'showstories': 'SHOW',
  'topstories': 'TOP'
}

const ITEMS_TO_LOAD = 100

var cacheWarmer = function (cache) {
  var firebaseClient = clientFactory.getClient()

  Object.keys(COLLECTION_NAME_TO_CACHE_KEY).forEach(function(collectionName) {
    getStoryCollection(firebaseClient, collectionName, ITEMS_TO_LOAD)
      .then(function (stories) {
        cache.set(COLLECTION_NAME_TO_CACHE_KEY[collectionName], stories)

        stories.forEach(function (story) {
            getStoryWithComments(firebaseClient, story.id)
              .then(function (story) {
                var cacheKey = 'STORY_' + story.id
                cache.set(cacheKey, story)
              })
          })
      })
  })

}

module.exports = cacheWarmer
