'use strict';

angular.module('theLastAlbumApp')
  .controller('AlbumsCtrl', ['$scope', 'ArtistService', 'AlbumService', '$window',
    function ($scope, ArtistService, AlbumService, $window) {

      $scope.searchInput = '';
      $scope.currentArtist = '';
      $scope.artistsResult = {};
      $scope.albumsResult = {};
      $scope.searchMessage = 'choose wisely';
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
                $scope.getThumbs();
              }
              console.log('ROCK ON ARTISTS!:', $scope.artistsResult);
            }, function (error) {
              console.log('Erroneous:', error);
            });
        } else {

        }
      };

      $scope.getAlbums = function (result) {
        console.log('result', result.name);
        $scope.currentArtist = result.name;
        if ($scope.currentArtist !== undefined) {
          AlbumService.get($scope.currentArtist)
            .then(function (response) {
              $scope.albumsResult = response.data.album;
              if ($scope.albumsResult === undefined) {
                $window.alert('Bummer!  We cant find any albums based on that artist/combo...'); 
              }
              console.log('ROCK ON ALBUMS!:', $scope.albumsResult);
            }, function (error) {
              console.log('Erroneous:', error);
            });
        }
      };

      $scope.getThumbs = function () {
        for (var i = 0; i < $scope.artistsResult.length; i++) {
          var imageCheck = $scope.artistsResult[i].image[2][Object.keys($scope.artistsResult[i].image[2])[0]];
          if (typeof imageCheck !== 'undefined' && imageCheck) {
            console.log(imageCheck);
            $scope.artistsResult[i].image = imageCheck;
          } else {
            //$scope.artistsResult.image = $scope.default;
            console.log('default image');
          }
        }
      };
}]);