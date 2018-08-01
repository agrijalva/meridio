app.controller("linkCtrl", ["$scope", "$location", "noticiaFactory", function($scope, $location, noticiaFactory) {
    $scope.user = '';
    $scope.pass = '';

    $scope.init = function() {
    	var URLactual = window.location.toString();
        var identificador = URLactual.split('?').pop();

        noticiaFactory.getById( identificador ).then(function(response){
            $scope.enlace = response.data;

            setTimeout( function(){
                location.href = $scope.enlace.URL;
            },2000);
        });
    }
}]);