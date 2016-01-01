if (process.env.NEW_RELIC_LICENSE_KEY) { require('newrelic'); }

var NodeCache = require('node-cache');
var schedule = require('node-schedule');

var appFactory = require('./appFactory');
var cacheWarmer = require('./cache/cacheWarmer');

var cache = new NodeCache({ stdTTL: 300, checkperiod: 60});
cacheWarmer(cache);

var app = appFactory(cache);

app.listen(app.get('port'), function() {
  console.log('Hex API is running on port', app.get('port'));
});

schedule.scheduleJob('*/4 * * * *', function() {
  cacheWarmer(cache);
});
