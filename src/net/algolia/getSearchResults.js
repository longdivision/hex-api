var Q = require('q')
var request = require('superagent')
var marshallResults = require('./marshallers/marshallResults')

var getSearchResults = function (query) {
  var deferred = Q.defer()

  request
    .get('http://hn.algolia.com/api/v1/search?tags=story&query=' + query)
    .end(function(error, response) {
      if (error || !response.ok) {
        deferred.reject()
      } else {
        deferred.resolve(marshallResults(response.body))
      }
    })

  return deferred.promise
}

module.exports = getSearchResults
