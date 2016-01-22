var apiClientFactory = require('../factory/apiClientFactory')
var getFrontPage = require('../service/getFrontPage')
var getStory = require('../service/getStory')

var cacheWarmer = function (cache) {
  getFrontPage(apiClientFactory).then(function (frontPage) {
    cache.set('FRONT_PAGE', frontPage)

    frontPage.forEach(function (frontPageStory) {
      getStory(apiClientFactory, frontPageStory.id).then(function (story) {
        var cacheKey = 'STORY_' + frontPageStory.id
        cache.set(cacheKey, story)
      })
    })
  })
}

module.exports = cacheWarmer
