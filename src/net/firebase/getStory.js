var Q = require('q');
var marshallStoryOverview = require('./marshallers/marshallStory');

var getStory = function(firebaseClient, itemId) {
  var deferred = Q.defer();

  firebaseClient.child('item/' + itemId).on('value', function(snapshot) {
    var snapshotValue = snapshot.val() || {};

    var story = marshallStoryOverview(snapshotValue);

    deferred.resolve(story);
  });

  return deferred.promise;
};

module.exports = getStory;
