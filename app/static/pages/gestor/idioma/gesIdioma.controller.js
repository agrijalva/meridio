app.controller("gesIdiomaCtrl", ["$scope", "$sce", "$location","filterFilter","gesIdiomaFactory", "noticiaFactory", function($scope, $sce, $location, filterFilter, gesIdiomaFactory, noticiaFactory ) {
    // $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.editorOptions = {
	    // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
	};

    $scope.DataUser = JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.idUsuario = parseInt($scope.DataUser.idUsuario);
    $scope.idiomas = '';
    $scope.frmIdioma = {
        cat_nombre: ''
    };

	$scope.init = function(){
        noticiaFactory.idiomas().then(function(response){
            $scope.idiomas = response.data;
        });
    };

    $scope.nuevoidioma = function(){
        document.getElementById("frmIdioma").reset();
        $('#modalNuevoIdioma').modal('show');
    };

    $scope.guardarIdioma = function(){
        if( $scope.frmIdioma.cat_nombre == '' ){
            swal( 'Alto', 'Llena todos los campos.', 'error' );
        }else{
            swal({
                title: 'Merídio',
                text: "¿Está seguro de guardar este idioma?",
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Si',
                closeOnConfirm: false
            },
            function(){
                gesIdiomaFactory.insertIdioma($scope.idUsuario, $scope.frmIdioma.cat_nombre).then(function(response){
                    if( response.data[0].success == 1 ){
                        swal( 'Listo', response.data[0].msg, 'success' );
                        $scope.init();
                        $('#modalNuevoIdioma').modal('hide');
                    }else{
                        swal( 'Alto', response.data[0].msg, 'error' );
                    }
                });
            });
        };
    };

    $scope.deleteIdioma = function( idioma ){
        swal({
            title: 'Merídio',
            text: "¿Está seguro de eliminar este idioma?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function(){
            gesIdiomaFactory.deleteIdioma(idioma.idIdioma).then(function(response){
                if( response.data[0].success == 1 ){
                    swal( 'Listo', response.data[0].msg, 'success' );
                    $scope.init();
                }else{
                    swal( 'Alto', response.data[0].msg, 'error' );
                }
            });
        });
    };

    $scope.editarIdioma = function(idioma){
        $scope.frmIdiomaEdit = {
            cat_nombre: idioma.idioma
        };
        $scope.idIdioma = idioma.idIdioma;
        $('#modalEditarIdi').modal('show');
    };

    $scope.saveEditarIdi = function(){
        swal({
            title: 'Merídio',
            text: "¿Está seguro de editar este idioma?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function(){
            gesIdiomaFactory.editIdioma($scope.idIdioma, $scope.frmIdiomaEdit.cat_nombre).then(function(response){
                if( response.data[0].success == 1 ){
                    swal( 'Listo', response.data[0].msg, 'success' );
                    $scope.init();
                    $('#modalEditarIdi').modal('hide');
                }else{
                    swal( 'Alto', response.data[0].msg, 'error' );
                }
            });
        });
    };

}]);