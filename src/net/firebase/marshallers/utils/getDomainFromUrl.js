var url = require('url')
var psl = require('psl')

var getDomainFromUrl = function (completeUrl) {
  var parsedUrl = url.parse(completeUrl) || {}
  var hostname = parsedUrl.hostname || ''
  var pslParsed = psl.parse(hostname)

  return pslParsed.domain || ''
}

module.exports = getDomainFromUrl
