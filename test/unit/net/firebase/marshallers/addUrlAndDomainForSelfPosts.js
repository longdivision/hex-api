var expect = require('chai').expect

var addUrlAndDomainForSelfPosts = require('../../../../../src/net/firebase/' +
  'marshallers/addUrlAndDomainForSelfPosts')

describe('addUrlAndDomainForSelfPosts', function () {
  it('uses a Hacker News URL and domain for a story without an existing URL',
    function () {
      var storyWithoutUrl = { id: '123' }
      var expected = {
        id: '123',
        url: 'https://news.ycombinator.com/item?id=123',
        domain: 'news.ycombinator.com'
      }

      var result = addUrlAndDomainForSelfPosts(storyWithoutUrl)

      expect(result).to.deep.equal(expected)
    })

  it('does not modify the URL or domain of a story with a url', function () {
    var storyWithUrl = { url: 'foo', domain: 'bar' }

    var result = addUrlAndDomainForSelfPosts(storyWithUrl)

    expect(result).to.deep.equal(storyWithUrl)
  })
})
