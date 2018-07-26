app.controller("LoginCtrl", ["$scope", "$location","loginFactory", function($scope, $location, loginFactory) {
    $scope.user = '';
    $scope.pass = '';

    $scope.submit = function() {
    	if( $scope.user == '' && $scope.pass == '' ){
    		swal("Calculadora", 'Asegurate de proporcionar tus credenciales.');
    	}
    	else if( $scope.user == '' ){
    		swal("Calculadora", 'Proporciona tu usuario para poder acceder al sistema');
    	}
    	else if( $scope.pass == '' ){
    		swal("Calculadora", 'Proporciona tu contrasema para poder acceder al sistema');
    	}
    	else{
	    	loginFactory.login( $scope.user, $scope.pass ) .then(function(result){
	    		var Resultado = result.data;
	    		if( Resultado.success ){
                    localStorage.setItem("RCVUserData", JSON.stringify(Resultado.data));

                    $location.path("/enlaces/home");
	    		}

                switch( parseInt(Resultado.code) ){
                    case 400: swal("Calculadora", "El email que proporcionó no es válido."); break;
                    case 410: swal("Calculadora", "La contraseña no es correcta."); break;
                }
	        }, function(error){
	            console.log("Error", error);
	        });
    	}
    }

    $scope.recuperarContrasenia = function(){
        swal({
            title: "Recuperar Contraseña",
            text: "Correo electrónico:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            cancelButtonClass: "btn-danger",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Recuperar Contraseña",
            imageUrl: 'images/key.jpg'
        },function(inputValue){
            if (inputValue === false) return false;
              
            if (inputValue === "") {
                swal.showInputError("Proporciona tu cuenta de correo.");
                return false
            }
            else if( !$scope.validateEmail(inputValue) ){
                swal.showInputError("Proporciona una cuenta de correo válida.");
                return false
            }
            else{
                loginFactory.recoverPass( inputValue ) .then(function(result){
                    var Resultado = result.data;
                    swal("Calculadora",Resultado.msg);
                }, function(error){
                    console.log("Error", error);
                });                
            }
        });
    }

    $scope.validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}]);