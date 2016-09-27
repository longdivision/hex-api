if (process.env.NEW_RELIC_LICENSE_KEY) { require('newrelic') }

var logger = require('js-logger')
var NodeCache = require('node-cache')
var schedule = require('node-schedule')

var appFactory = require('./appFactory')
var cacheWarmer = require('./cache/cacheWarmer')

var cache = new NodeCache({ stdTTL: 300, checkperiod: 60 })
var app = appFactory(cache)
var warmCache = function () {
  cacheWarmer(cache)
  logger.info('Cache warmed at:', (new Date()).toString());
}
logger.useDefaults()

schedule.scheduleJob('*/4 * * * *', warmCache)

warmCache();

app.listen(app.get('port'), function () {
  logger.info('Hex API is running on port', app.get('port'))
})
