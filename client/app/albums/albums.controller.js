'use strict';

angular.module('theLastAlbumApp')
  .controller('AlbumsCtrl', ['$scope', 'ArtistService', 'AlbumService',
    function ($scope, ArtistService, AlbumService) {

      $scope.searchInput = '';
      $scope.currentArtist = '';
      $scope.artistsResult = {};
      $scope.albumsResult = {};
      $scope.errorMessage = '';

      $scope.findArtist = function () {
        if ($scope.searchInput !== undefined) {
          $scope.currentArtist = $scope.searchInput;
          $scope.searchMessage = 'Finding artists matching: ' + $scope.currentArtist;
          ArtistService.get($scope.currentArtist)
            .then(function (response) {
              $scope.artistsResult = response.data.artist;
              if ($scope.artistsResult === undefined) {
                $scope.searchMessage = 'Umm...  Thats a new one to us!  Indie band maybe?';
                return;
              } else {
                $scope.searchMessage = 'Found ' + $scope.artistsResult.length + ' artists matching: ' + $scope.currentArtist;
              }
              console.log('ROCK ON ARTISTS!:', $scope.artistsResult);
              console.log('ROCK ON ARTISTS!:', $scope.artistsResult[0].image[0]);
              $scope.getThumb($scope.artistsResult);
            
            }, function (error) {
              console.log('Erroneous:', error);
            });
        } else {

        }
      };

      $scope.getAlbums = function () {
        if ($scope.currentArtist !== undefined) {
          AlbumService.get($scope.searchInput)
            .then(function (response) {
              $scope.albumsResult = response.data.album;
              console.log('ROCK ON ALBUMS!:', $scope.albumsResult);
            }, function (error) {
              console.log('Erroneous:', error);
            });
        }
      };
      
      $scope.getThumb = function(result) {
        if (result.image !== undefined) {
          return result.image[2][Object.keys(result.image[2])[0]];
        } else {
         console.log('no image'); 
        }
      };
}]);