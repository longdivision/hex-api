var getFrontPage = require('../service/getFrontPage');

var frontPage = function (apiClientFactory, request, response) {
  getFrontPage(apiClientFactory).then(function(frontPage) {
    response.json(frontPage);
  });
};

module.exports = frontPage;
