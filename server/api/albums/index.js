'use strict';

var express = require('express');
var Q = require('q');

var apiKey = '6df499a91475e28d7e566c03f92c5d08';
var router = express.Router();
var request = require('request');
var baseUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist='
//var testUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=metallica&api_key=' + apiKey + '&format=json';

function loadData(artist) {
  var url = baseUrl + artist + '&api_key=' + apiKey + '&format=json';
  var deferred = Q.defer();
  var finalData = {};
  request(url, function (error, response) {
    if (error) {
      return deferred.reject(new Error(error))
    }
    finalData = JSON.parse(response.body);
    deferred.resolve(finalData);
  })
  return deferred.promise;
}

router.get('/:artist', function (req, res, next) {
  var artist = req.params.artist.substring(1);
  loadData(artist)
    .then(function (response) {
      var albums = response.topalbums;
      res.json(albums);
    }, function (error) {
      res.json({
        'error': error
      }, 400);
    })
});

module.exports = router;