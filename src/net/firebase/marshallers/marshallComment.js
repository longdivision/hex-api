var marshallComment = function(responseData) {
  responseData = responseData || {};
  var comment = {};

  var currentUnixTime = Math.round(new Date() / 1000);
  var commentUnixTime = responseData.time || currentUnixTime;

  comment.text = responseData.text || '';
  comment.author = responseData.by || '';
  comment.time = (new Date(commentUnixTime * 1000)).toISOString();

  return comment;
};

module.exports = marshallComment;
