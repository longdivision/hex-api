if (process.env.NEW_RELIC_LICENSE_KEY) { require('newrelic'); }

var NodeCache = require('node-cache');

var cache = new NodeCache({ stdTTL: 300, checkperiod: 60});
var appFactory = require('./appFactory');

var app = appFactory(cache);

app.listen(app.get('port'), function() {
  console.log('Hex API is running on port', app.get('port'));
});
