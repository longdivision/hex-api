var config = require('../../../config')
var getDomainFromUrl = require('../../utils/getDomainFromUrl')

var marshallStoryOverview = function (responseData) {
  responseData = responseData || {}
  var item = {}
  var fullUrl = responseData.url || ''
  var domain = getDomainFromUrl(fullUrl)
  var currentUnixTime = Math.round(new Date() / 1000)
  var itemUnixTime = responseData.time || currentUnixTime

  item.id = responseData.id || '-1'
  item.title = responseData.title || ''
  item.url = fullUrl
  item.commentsUrl = config.COMMENT_BASE_URL + item.id
  item.author = responseData.by || ''
  item.commentCount = responseData.descendants || 0
  item.domain = domain
  item.time = (new Date(itemUnixTime * 1000)).toISOString()
  item.score = responseData.score || 0

  return item
}

module.exports = marshallStoryOverview
