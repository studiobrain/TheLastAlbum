'use strict';

angular.module('theLastAlbumApp')
  .controller('AlbumsCtrl', ['$scope', 'AlbumService',
    function ($scope, AlbumService) {
      $scope.searchInput = 'Pearl Jam';
      
      //$scope.initSearch = function () {
        AlbumService.get($scope.searchInput) 
          .then(function (response) {
            console.log('ROCK ON!:', response);
          }, function (error) {
            console.log('Erroneous:', error)
          })
      //}
  }]);