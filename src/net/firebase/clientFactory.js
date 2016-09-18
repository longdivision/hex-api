var firebase = require('firebase')

var API_URL = 'https://hacker-news.firebaseio.com'
var client

var clientFactory = {
  getClient: function () {
    var config = {databaseURL: API_URL}
    var version = '/v0'

    if (!client) {
      client = firebase.initializeApp(config).database().ref(version)
    }

    return client
  }
}

module.exports = clientFactory
