var express = require('express');
var responseTime = require('response-time');

var frontPage = require('./controllers/frontPage');
var story = require('./controllers/story');
var apiClientFactory = require('./factory/apiClientFactory');

var app = express();
app.use(responseTime());
app.set('port', (process.env.PORT || 5000));

app.get('/front-page', frontPage.bind(null, apiClientFactory));
app.get('/story/:id', story.bind(null, apiClientFactory));

app.listen(app.get('port'), function() {
  console.log('hacker-new-api is running on port', app.get('port'));
});
