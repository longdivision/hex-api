var express = require('express')
var responseTime = require('response-time')
var compression = require('compression')

var frontPage = require('./controllers/frontPage')
var story = require('./controllers/story')
var apiClientFactory = require('./factory/apiClientFactory')

var appFactory = function (cache) {
  var app = express()
  app.use(compression())
  app.use(responseTime())
  app.set('port', (process.env.PORT || 5000))

  app.get('/front-page', frontPage.bind(null, apiClientFactory, cache))
  app.get('/story/:id', story.bind(null, apiClientFactory, cache))

  return app
}

module.exports = appFactory
