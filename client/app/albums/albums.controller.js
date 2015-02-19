'use strict';

angular.module('theLastAlbumApp')
  .controller('AlbumsCtrl', ['$scope', 'ArtistService', 'AlbumService', '$window',
    function ($scope, ArtistService, AlbumService, $window) {

      $scope.searchInput = '';
      $scope.currentArtist = '';
      $scope.artistsResult = {};
      $scope.albumsResult = {};
      $scope.artistMessage = 'choose wisely';
      $scope.albumMessage = '';
      $scope.errorMessage = '';
      $scope.searchBox = document.querySelector('.top');
      $scope.artistSection = document.querySelector('.artists');
      $scope.albumSection = document.querySelector('.albums');

      $scope.findArtist = function () {
        if ($scope.searchInput !== undefined) {
          $scope.currentArtist = $scope.searchInput;
          $scope.artistMessage = 'Finding artists matching: ' + $scope.currentArtist;
          ArtistService.get($scope.currentArtist)
            .then(function (response) {
              $scope.artistsResult = response.data.artist;
              if ($scope.artistsResult === undefined) {
                $scope.artistMessage = 'Umm...  Thats a new one to us!  Indie band maybe?';
                return;
              } else {
                $scope.artistMessage = 'Found ' + $scope.artistsResult.length + ' artists matching: ' + $scope.currentArtist;
                $scope.getThumbs($scope.artistsResult);
              }
              //console.log('ROCK ON ARTISTS!:', $scope.artistsResult);
            }, function (error) {
              console.log('Erroneous:', error);
            });
        } else {

        }
      };
      
      $scope.slideButtons = function () {
        if ($scope.searchBox.classList.contains('lifted')) {
          $scope.searchBox.classList.remove('lifted');
          $scope.searchBox.classList.add('dropped');
          $scope.scrollSections(1);
        } else {
          $scope.searchBox.classList.remove('dropped');
          $scope.searchBox.classList.add('lifted');
          $scope.scrollSections(0);
        }
      }
      
      $scope.scrollSections = function scrollToPage(dir) {
        var pagePos = 0;
        if (dir === 0) {
          pagePos = $scope.albumSection.offsetTop - 280;
        } else {
          pagePos = $scope.artistSection.offsetTop - 280;
        }
        TweenLite.to(window, 1, {
          scrollTo: {
            y: pagePos
          },
          ease: Circ.easeInOut,
        });
      }
      
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
              //console.log('ROCK ON ALBUMS!:', $scope.albumsResult);
              $scope.albumSection.style.display = 'block';
              $scope.slideButtons();
              $scope.getThumbs($scope.albumsResult);
              $scope.albumMessage = 'Found ' + $scope.albumsResult.length + ' albums matching: ' + $scope.currentArtist;
            }, function (error) {
              console.log('Erroneous:', error);
            });
        }
      };

      $scope.getThumbs = function (arr) {
        for (var i = 0; i < arr.length; i++) {
          var imageCheck = arr[i].image[2][Object.keys(arr[i].image[2])[0]];
          if (typeof imageCheck !== 'undefined' && imageCheck) {
            //console.log(imageCheck);
            arr[i].image = imageCheck;
          } else {
            //$scope.artistsResult.image = $scope.default;
            //console.log('default image');
          }
        }
      };
}]);