var DELETED_PLACEHOLDER = 'Deleted'

var marshallComment = function (responseData) {
  responseData = responseData || {}
  var comment = {}

  var currentUnixTime = Math.round(new Date() / 1000)
  var commentUnixTime = responseData.time || currentUnixTime
  var deleted = Boolean(responseData.deleted)

  comment.author = responseData.by || ''
  comment.text = responseData.text || ''
  comment.time = (new Date(commentUnixTime * 1000)).toISOString()

  if (deleted) {
    comment.text = DELETED_PLACEHOLDER
    comment.author = DELETED_PLACEHOLDER
  }

  return comment
}

module.exports = marshallComment
