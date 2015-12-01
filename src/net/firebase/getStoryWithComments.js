var Q = require('q');
var marshallStory = require('./marshallers/marshallStory');
var getComments = require('./getComments');

var getStoryWithComments = function(firebaseClient, itemId) {
  var deferred = Q.defer();

  firebaseClient.child('item/' + itemId).on('value', function(snapshot) {
    var snapshotValue = snapshot.val() || {};
    var story = marshallStory(snapshotValue);
    var childCommentIds = snapshotValue.kids || [];

    getComments(firebaseClient, childCommentIds).then(function(childComments){
      story.comments = childComments;
      deferred.resolve(story);
    });
  });

  return deferred.promise;
};

module.exports = getStoryWithComments;