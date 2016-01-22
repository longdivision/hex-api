var Q = require('q')
var marshallStoryOverview = require('./marshallers/marshallStory')
var addUrlForSelfPosts = require('./marshallers/addUrlForSelfPosts')

var getStory = function (firebaseClient, itemId) {
  var deferred = Q.defer()

  firebaseClient.child('item/' + itemId).once('value', function (snapshot) {
    var snapshotValue = snapshot.val() || {}

    var story = marshallStoryOverview(snapshotValue)
    story = addUrlForSelfPosts(story)

    deferred.resolve(story)
  })

  return deferred.promise
}

module.exports = getStory
