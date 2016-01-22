var addChildCommentsCount = function (comment) {
  var size = 0

  comment.comments.forEach(function (comment) {
    size += 1
    size += addChildCommentsCount(comment)
  })

  comment.commentCount = size
  return size
}

module.exports = addChildCommentsCount
