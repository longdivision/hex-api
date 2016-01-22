var expect = require('chai').expect
var Firebase = require('firebase')

var apiClientFactory = require('../../../src/factory/apiClientFactory')

describe('apiClientFactory', function () {
  it('can create a Firebase client', function () {
    expect(apiClientFactory('firebase')).to.be.an.instanceOf(Firebase)
  })
})
