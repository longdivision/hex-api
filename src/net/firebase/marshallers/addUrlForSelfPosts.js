const SELF_POST_URL_PREFIX = 'https://news.ycombinator.com/item?id=';

var addUrlForSelfPosts = function(story) {
  var url = story.url || SELF_POST_URL_PREFIX + story.id;

  return Object.assign({}, story, { url: url });
};

module.exports = addUrlForSelfPosts;
