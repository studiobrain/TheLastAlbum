'use strict';

var configuration = require('../config.js');
var config = new configuration();
var express = require('express');
var Q = require('q');
var apiKey = config.getKey();
var router = express.Router();
var request = require('request');
var baseUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=';

function loadData(artist) {
  var url = baseUrl + artist + '&api_key=' + apiKey + '&format=json';
  var deferred = Q.defer();
  var finalData = {};
  request(url, function (error, response) {
    if (error) {
      return deferred.reject(new Error(error))
    }
    finalData = JSON.parse(response.body);
    deferred.resolve(finalData.results);
  })
  return deferred.promise;
}

router.get('/:artist', function (req, res, next) {
  var artist = req.params.artist.substring(1);
  loadData(artist)
    .then(function (response) {
      var artistResults = response.artistmatches;
      res.json(artistResults);
    }, function (error) {
      res.json({
        'error': error
      }, 400);
    })
});

module.exports = router;