var Q = require('q');
var marshallComment = require('./marshallers/marshallComment');

var getComment = function(firebaseClient, commentId) {
  var deferred = Q.defer();

  firebaseClient.child('item/' + commentId).on('value', function(snapshot) {
    var snapshotValue = snapshot.val() || {};
    var comment = marshallComment(snapshotValue);
    var childCommentIds = snapshotValue.kids || [];

    var promises = childCommentIds.map(function(childCommentId) {
      return getComment(firebaseClient, childCommentId);
    });

    Q.allSettled(promises).then(function(results) {
      var childComments = results.map(function(result) {
        return result.value;
      });

      comment.comments = childComments;
      deferred.resolve(comment);
    });
  });

  return deferred.promise;
};

var getComments = function(firebaseClient, commentIds) {
  var deferred = Q.defer();

  var promises = commentIds.map(function(childCommentId) {
    return getComment(firebaseClient, childCommentId);
  });

  Q.allSettled(promises).then(function(results) {
    var childComments = results.map(function(result) {
      return result.value;
    });

    deferred.resolve(childComments);
  });

  return deferred.promise;
};

module.exports = getComments;
