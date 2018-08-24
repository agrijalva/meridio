app.controller("gesTemaCtrl", ["$scope", "$sce", "$location","filterFilter","gesTemaFactory", function($scope, $sce, $location, filterFilter, gesTemaFactory ) {
    // $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.editorOptions = {
	    // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
	};

    $scope.DataUser = JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.idUsuario = parseInt($scope.DataUser.idUsuario);
    $scope.temas = '';

    $scope.frmTema = {
        cat_nombre: ''
    };


    $scope.init = function () {
        gesTemaFactory.getTemas().then(function (response) {
            $scope.temas = response.data;
        });
    };

    $scope.nuevaTema = function(){
        document.getElementById("frmTema").reset();
        $("#modalNuevoTem").modal("show");
    };

    $scope.guardarTema = function(){
        if( $scope.frmTema.cat_nombre == '' ){
            swal( 'Alto', 'Llena todos los campos.', 'error' );
        }else{
            gesTemaFactory.nuevoTema($scope.frmTema.cat_nombre, $scope.idUsuario).then(function(response){
                if( response.data[0].success == 1 ){
                    swal( 'Listo', response.data[0].msg, 'success' );
                    $scope.init();
                    $("#modalNuevoTem").modal("hide");
                }else{
                    swal( 'Alto', response.data[0].msg, 'error' ); 
                }
            });
        };
    };

    $scope.deleteTema = function(tema){
        gesTemaFactory.deleteTema(parseInt(tema.idTema)).then(function(response){
            console.log( 'res', response );
            if( response.data[0].success == 1 ){
                swal( 'Listo', response.data[0].msg, 'success' );
                $scope.init();
            }else{
                swal( 'Alto', response.data[0].msg, 'error' ); 
            };
        });
    };

    $scope.editarTema = function(tema){
        $scope.idTema = tema.idTema;
        $scope.frmTemaEdit = {
            cat_nombre: tema.tema,
        };
        $("#modalEditarTem").modal("show");
    };

    $scope.saveEditarTem = function(){
        gesTemaFactory.editarTema($scope.frmTemaEdit.cat_nombre, $scope.idTema).then(function(response){
            if( response.data[0].success == 1 ){
                swal( 'Listo', response.data[0].msg, 'success' );
                $scope.init();
                $("#modalEditarTem").modal("hide");
            }else{
                swal( 'Alto', response.data[0].msg, 'error' ); 
            }
        });
    }
	
}]);