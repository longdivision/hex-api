var redis = require('redis')
var logger = require('js-logger')
var clientFactory = require('../net/firebase/clientFactory')
var getStoryCollection = require('../net/firebase/getStoryCollection')
var getStoryWithComments = require('../net/firebase/getStoryWithComments')

logger.useDefaults();

const COLLECTION_NAME_TO_CACHE_KEY = {
  'askstories': 'ASK',
  'jobstories': 'JOBS',
  'newstories': 'NEW',
  'showstories': 'SHOW',
  'topstories': 'TOP'
}

const ITEMS_TO_LOAD = 100

var cacheData = {};
var cache = {
  get: function(key) {
    return cacheData[key];
  },
  set: function(key, value) {
    cacheData[key] = value;
  }
}

var apiPrefetcher = function () {
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

logger.log('HN API prefetcher running');

var redisClient = redis.createClient(process.env.REDIS_URL);
var ONE_MINUTE_IN_MS = 60 * 1000;

setInterval(function() {
  apiPrefetcher();
  redisClient.set("hex-api-data", JSON.stringify(cacheData));
  logger.info('Published prefetched data from HN API')
}, ONE_MINUTE_IN_MS);

apiPrefetcher();
