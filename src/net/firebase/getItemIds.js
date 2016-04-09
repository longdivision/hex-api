var Q = require('q')

var getItemIds = function (firebaseClient, collectionName, count) {
  var deferred = Q.defer()

  firebaseClient.child(collectionName).once('value', function (snapshot) {
    var ids = snapshot.val() || []
    ids = ids.slice(0, count - 1)

    deferred.resolve(ids)
  })

  return deferred.promise
}

module.exports = getItemIds
