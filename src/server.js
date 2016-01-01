if (process.env.NEW_RELIC_LICENSE_KEY) { require('newrelic'); }

var express = require('express');
var responseTime = require('response-time');
var NodeCache = require('node-cache');

var frontPage = require('./controllers/frontPage');
var story = require('./controllers/story');
var apiClientFactory = require('./factory/apiClientFactory');

var cache = new NodeCache({ stdTTL: 300, checkperiod: 60});

var app = express();
app.use(responseTime());
app.set('port', (process.env.PORT || 5000));

app.get('/front-page', frontPage.bind(null, apiClientFactory, cache));
app.get('/story/:id', story.bind(null, apiClientFactory, cache));

app.listen(app.get('port'), function() {
  console.log('hacker-new-api is running on port', app.get('port'));
});
