var Firebase = require('firebase');

var API_URL = 'https://hacker-news.firebaseio.com/v0/';
var clients = {};

var getFirebaseClient = function() {
  if (!clients.firebase) {
    clients.firebase = new Firebase(API_URL);
  }

  return clients.firebase;
};

var apiClientFactory = function(name) {
  var apiClient;

  if (name === 'firebase') {
    apiClient = getFirebaseClient();
  }

  return apiClient;
};

module.exports = apiClientFactory;
