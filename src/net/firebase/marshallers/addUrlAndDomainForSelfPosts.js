const SELF_POST_URL_PREFIX = 'https://news.ycombinator.com/item?id='
const HACKER_NEWS_DOMAIN = 'news.ycombinator.com'

var addUrlAndDomainForSelfPosts = function (story) {
  var hasUrl = Boolean(story.url)
  var url = hasUrl ? story.url : SELF_POST_URL_PREFIX + story.id
  var domain = hasUrl ? story.domain : HACKER_NEWS_DOMAIN

  return Object.assign({}, story, { url: url, domain: domain })
}

module.exports = addUrlAndDomainForSelfPosts
