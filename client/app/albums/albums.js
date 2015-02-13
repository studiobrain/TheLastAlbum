'use strict';

angular.module('theLastAlbumApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/albums', {
        templateUrl: 'app/albums/albums.html',
        controller: 'AlbumsCtrl'
      });
  });
