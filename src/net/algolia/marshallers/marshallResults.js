var getDomainFromUrl = require('../../utils/getDomainFromUrl')
var config = require('../../../config')

var marshallResults = function(response) {
  var rawResults = response.hits || [];
  var results = [];

  rawResults.forEach(function(rawResult) {
    var item = {}
    var fullUrl = rawResult.url || ''
    var domain = getDomainFromUrl(fullUrl)
    var itemDate = new Date(rawResult.created_at) || new Date()

    item.id = rawResult.objectID || '-1'
    item.title = rawResult.title || ''
    item.url = fullUrl
    item.commentsUrl = config.COMMENT_BASE_URL + item.id
    item.author = rawResult.author || ''
    item.commentCount = rawResult.num_comments || 0
    item.domain = domain
    item.time = itemDate.toISOString()
    item.score = rawResult.points || 0

    results.push(item)
  });

  return results
}

module.exports = marshallResults;
