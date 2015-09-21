var Q = require('q');

var getTopStoryIds = function(firebaseClient) {
  var deferred = Q.defer();

  firebaseClient.child('topstories').on('value', function(snapshot) {
    var storyIds = snapshot.val() || [];
    storyIds = storyIds.slice(0, 29);

    deferred.resolve(storyIds);
  });

  return deferred.promise;
};

module.exports = getTopStoryIds;
