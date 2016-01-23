var expect = require('chai').expect

var addUrlForSelfPosts =
require('../../../../../src/net/firebase/marshallers/addUrlForSelfPosts')

describe('addUrlForSelfPosts', function () {
  it('generates a Y Combinator URL for a story without an existing url',
    function () {
      var storyWithoutUrl = { id: '123' }
      var expectedUrl = 'https://news.ycombinator.com/item?id=123'

      var result = addUrlForSelfPosts(storyWithoutUrl)

      expect(result).to.deep.equal({ id: '123', url: expectedUrl })
    })

  it('does not modify a story with a url', function () {
    var storyWithUrl = { url: 'foo' }

    var result = addUrlForSelfPosts(storyWithUrl)

    expect(result).to.deep.equal(storyWithUrl)
  })
})
