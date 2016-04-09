var Firebase = require('firebase')

var API_URL = 'https://hacker-news.firebaseio.com/v0/'
var client

var clientFactory = {
  getClient: function () {
    if (!client) {
      client = new Firebase(API_URL)
    }

    return client
  }
}

module.exports = clientFactory
