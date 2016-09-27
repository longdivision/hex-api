var express = require('express')
var responseTime = require('response-time')
var compression = require('compression')
var morgan = require('morgan')

var askController = require('./controllers/ask')
var jobsController = require('./controllers/jobs')
var newController = require('./controllers/new')
var searchController = require('./controllers/search')
var showController = require('./controllers/show')
var storyController = require('./controllers/story')
var topController = require('./controllers/top')

var appFactory = function (cache) {
  var app = express()
  app.use(compression())
  app.use(responseTime())
  app.use(morgan('short'))
  app.set('port', (process.env.PORT || 5000))

  app.get('/front-page', topController.bind(null, cache))
  app.get('/story/:id', storyController.bind(null, cache))

  app.use('/', express.static('docs/generated'));
  app.get('/stories/ask', askController.bind(null, cache))
  app.get('/stories/jobs', jobsController.bind(null, cache))
  app.get('/stories/new', newController.bind(null, cache))
  app.get('/stories/show',showController.bind(null, cache))
  app.get('/stories/top', topController.bind(null, cache))
  app.get('/stories/:id', storyController.bind(null, cache))
  app.get('/search/stories', searchController)

  return app
}

module.exports = appFactory
