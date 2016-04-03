var getSearchResults = require('../net/algolia/getSearchResults')

var search = function (request, response) {
  var query = request.query.q

  if (!query) {
    response.sendStatus(404)
    return
  }

  getSearchResults(query)
    .then(function(results) {
      response.json({
        results: results
      })
    }).catch(function() {
      response.sendStatus(500)
    })
}

module.exports = search
