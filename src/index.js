if (process.env.NEW_RELIC_LICENSE_KEY) { require('newrelic') }

var logger = require('js-logger')
var redis = require("redis")

var appFactory = require('./appFactory')

logger.useDefaults()

var cacheData = {};
var cache = {
  get: function(key) {
    return cacheData[key];
  },
  set: function(key, value) {
    cacheData[key] = value;
  }
}

var app = appFactory(cache)

app.listen(app.get('port'), function () {
  logger.info('Hex API is running on port', app.get('port'))
})

var redisClient = redis.createClient(process.env.REDIS_URL);
var TWO_MINUTES_IN_MS = 2 * 60 * 1000;
var loadPrefetchedData = function() {
  redisClient.get("hex-api-data", function(err, prefetchedData) {
    if (prefetchedData) {
      prefetchedData = JSON.parse(prefetchedData)
      cacheData = Object.assign(cacheData, prefetchedData)
      logger.info('Received latest prefetched API data')
    } else {
      logger.info('Prefetched API data not available')
    }
  });
}

setInterval(loadPrefetchedData, TWO_MINUTES_IN_MS);

loadPrefetchedData();
