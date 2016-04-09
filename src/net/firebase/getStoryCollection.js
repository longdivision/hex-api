var getItemIds = require('./getItemIds')
var getStories = require('./getStories')

var getStoryCollection = function (firebaseClient, name, size) {
  return getItemIds(firebaseClient, name, size).then(
    getStories.bind(null, firebaseClient))
}

module.exports = getStoryCollection
