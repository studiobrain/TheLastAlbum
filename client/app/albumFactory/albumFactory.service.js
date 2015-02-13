'use strict';

angular.module('theLastAlbumApp')
  .factory('AlbumService', function($http, $q) {
    return {
      get: function(artist) {
        return $http.get('api/albums/:'+ artist);
      }
    };
  });
