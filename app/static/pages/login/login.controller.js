app.controller("LoginCtrl", ["$scope", "$location","loginFactory", function($scope, $location, loginFactory) {
    $scope.user = '';
    $scope.pass = '';

    $scope.submit = function() {
    	if( $scope.user == '' && $scope.pass == '' ){
    		swal("Merídio", 'Asegurate de proporcionar tus credenciales.');
    	}
    	else if( $scope.user == '' ){
    		swal("Merídio", 'Proporciona tu usuario para poder acceder al sistema');
    	}
    	else if( $scope.pass == '' ){
    		swal("Merídio", 'Proporciona tu contraseña para poder acceder al sistema');
    	}
    	else{
	    	loginFactory.login( $scope.user, $scope.pass ) .then(function(result){
                console.log( "result", result );

                var res = result.data[0];
                if( res.success != 0 ){
                    $location.path("/enlaces/home");
                    localStorage.setItem("RCVUserData", JSON.stringify(res));
                }else{
                    swal("Merídio", res.msg );
                };
	        }, function(error){
	            console.log("Error", error);
	        });
    	};
    };

    $scope.validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}]);