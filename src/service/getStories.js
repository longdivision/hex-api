var Q = require('q')
var getStory = require('../net/firebase/getStory')

var getStories = function (apiClientFactory, itemIds) {
  var requestFactory = apiClientFactory('firebase')

  var promises = itemIds.map(function (itemId) {
    return getStory(requestFactory, itemId)
  })

  return Q.allSettled(promises).then(function (results) {
    return results.map(function (result) {
      return result.value
    })
  })
}

module.exports = getStories
