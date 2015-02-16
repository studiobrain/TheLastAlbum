'use strict';

angular.module('theLastAlbumApp')
  .factory('ArtistService', function($http) {
    return {
      get: function(artist) {
        return $http.get('api/artists/:'+ artist);
      }
    };
  });
