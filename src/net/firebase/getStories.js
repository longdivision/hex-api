var Q = require('q')
var getStory = require('./getStory')

var getStories = function (firebaseClient, itemIds) {
  var promises = itemIds.map(function (itemId) {
    return getStory(firebaseClient, itemId)
  })

  return Q.allSettled(promises).then(function (results) {
    return results.map(function (result) {
      return result.value
    })
  })
}

module.exports = getStories
