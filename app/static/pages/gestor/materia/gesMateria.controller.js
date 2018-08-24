app.controller("gesMateriaCtrl", ["$scope", "$sce", "$location","filterFilter","gesMateriaFactory", "noticiaFactory", function($scope, $sce, $location, filterFilter, gesMateriaFactory, noticiaFactory ) {
    // $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.editorOptions = {
	    // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
    };
    $scope.DataUser = JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.idUsuario = parseInt($scope.DataUser.idUsuario);
    $scope.materias = '';

    $scope.frmMateria = {
        cat_nombre: ''
    };

    $scope.init = function () {
        noticiaFactory.getMaterias().then(function (response) {
            $scope.materias = response.data;
        });
    };

    $scope.nuevaMateria = function(){
        document.getElementById("frmMateria").reset();
        $("#modalNuevaMat").modal("show");
    };

    $scope.guardarMateria = function(){
        if( $scope.frmMateria.cat_nombre == '' ){
            swal( 'Alto', 'Llena todos los campos.', 'error' );
        }else{
            gesMateriaFactory.insertMateria( $scope.frmMateria.cat_nombre, $scope.idUsuario ).then(function(response){
                if( response.data[0].success == 1 ){
                    swal( 'Listo', response.data[0].msg, 'success' );
                    $scope.init();
                    $("#modalNuevaMat").modal("hide");
                }else{
                    swal( 'Alto', response.data[0].msg, 'error' );
                }
            });
        };
    };

    $scope.deleteMateria = function(materia){
        console.log( 'matyeria', materia );
        gesMateriaFactory.deleteMateria(materia.idMateria).then(function(response){
            if( response.data[0].success == 1 ){
                swal( 'Listo', response.data[0].msg, 'success' );
                $scope.init();
            }else{
                swal( 'Alto', response.data[0].msg, 'error' ); 
            }
        });
    };

    $scope.editarMateria = function(materia){
        $scope.idMateria = materia.idMateria;
        $scope.frmMateriaEdit = {
            cat_nombre: materia.materia,
        };
        $("#modalEditarMat").modal("show");
    };

    $scope.saveEditarMat = function(){
        gesMateriaFactory.editarMateria($scope.frmMateriaEdit.cat_nombre, $scope.idMateria).then(function(response){
            if( response.data[0].success == 1 ){
                $("#modalEditarMat").modal("hide");
                swal( 'Listo', response.data[0].msg, 'success' );
                $scope.init();
            }else{
                swal( 'Alto', response.data[0].msg, 'error' );
            }
        });
    };

}]);