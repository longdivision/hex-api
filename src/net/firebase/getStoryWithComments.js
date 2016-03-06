var Q = require('q')
var marshallStory = require('./marshallers/marshallStory')
var getComments = require('./getComments')
var addChildCommentCounts = require('./utils/addChildCommentCounts')
var addUrlAndDomainForSelfPosts =
  require('./marshallers/addUrlAndDomainForSelfPosts')

var getStoryWithComments = function (firebaseClient, itemId) {
  var deferred = Q.defer()

  firebaseClient.child('item/' + itemId).once('value', function (snapshot) {
    var snapshotValue = snapshot.val() || {}
    var story = marshallStory(snapshotValue)
    story = addUrlAndDomainForSelfPosts(story)
    var childCommentIds = snapshotValue.kids || []

    getComments(firebaseClient, childCommentIds).then(function (childComments) {
      story.comments = childComments
      addChildCommentCounts(story)
      deferred.resolve(story)
    })
  })

  return deferred.promise
}

module.exports = getStoryWithComments
