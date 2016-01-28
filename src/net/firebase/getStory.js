var Q = require('q')
var marshallStoryOverview = require('./marshallers/marshallStory')
var addUrlAndDomainForSelfPosts =
require('./marshallers/addUrlAndDomainForSelfPosts')

var getStory = function (firebaseClient, itemId) {
  var deferred = Q.defer()

  firebaseClient.child('item/' + itemId).once('value', function (snapshot) {
    var snapshotValue = snapshot.val() || {}

    var story = marshallStoryOverview(snapshotValue)
    story = addUrlAndDomainForSelfPosts(story)

    deferred.resolve(story)
  })

  return deferred.promise
}

module.exports = getStory
