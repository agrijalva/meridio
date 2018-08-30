app.controller("gesFuenteCtrl", ["$scope", "$sce", "$location", "filterFilter", "gesFuenteFactory", 'noticiaFactory', function ($scope, $sce, $location, filterFilter, gesFuenteFactory, noticiaFactory) {
    // $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.editorOptions = {
        // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
    };

    $scope.DataUser = JSON.parse(localStorage.getItem("RCVUserData"));
    $scope.idUsuario = parseInt($scope.DataUser.idUsuario);

    $scope.fuente = '';
    $scope.frmFuente = {
        cat_nombre: ''
    };

    $scope.init = function () {
        $scope.getFuentes();
    };

    $scope.getFuentes = function () {
        noticiaFactory.getFuente().then(function (response) {
            $scope.fuente = response.data;
        });
    };

    $scope.nuevaFuente = function () {
        document.getElementById("frmFuente").reset();
        $('#modalNuevoFue').modal('show');
    };

    $scope.guardarFuente = function () {
        if ($scope.frmFuente.cat_nombre == '') {
            swal('Alto', 'Llene todos los campos', 'error');
        } else {
            swal({
                title: 'Merídio',
                text: "¿Está seguro de guardar esta fuente?",
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Si',
                closeOnConfirm: false
            },
            function () {
                gesFuenteFactory.insertFuente($scope.idUsuario, $scope.frmFuente.cat_nombre).then(function (response) {
                    console.log( 'respose', response );
                    if (response.data[0].success == 1) {
                        swal('Listo', response.data[0].msg, 'success');
                        $scope.getFuentes();
                        $('#modalNuevoFue').modal('hide');
                    } else {
                        swal('Alto', response.data[0].msg, 'error');
                    }
                });
            });
        };
    };

    $scope.deleteFuente = function(fuente){
        swal({
            title: 'Merídio',
            text: "¿Está seguro de eliminar esta fuente?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function () {
            gesFuenteFactory.deleteFuente(fuente.idFuente).then(function (response) {
                if (response.data[0].success == 1) {
                    swal('Listo', response.data[0].msg, 'success');
                    $scope.getFuentes();
                    $('#modalNuevoFue').modal('hide');
                } else {
                    swal('Alto', response.data[0].msg, 'error');
                }
            });
        });
    };

    $scope.editarFuente = function(fuente){
        $scope.idFuente = fuente.idFuente;
        $scope.frmFuenteEdit ={
            cat_nombre: fuente.fuente
        };
        $('#modalEditarFue').modal('show');
    };

    $scope.saveEditarFue = function(){
        swal({
            title: 'Merídio',
            text: "¿Está seguro de editar esta fuente?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function () {
            gesFuenteFactory.editFuente( $scope.idFuente, $scope.frmFuenteEdit.cat_nombre ).then(function(response){
                console.log( response );
                if( response.data[0].success == 1 ){
                    swal( 'Listo', response.data[0].msg, 'success' );
                    $scope.getFuentes();
                    $('#modalEditarFue').modal('show');
                }else{
                    swal( 'Alto', response.data[0].msg, 'error' );
                }
            });
        });
    };

}]);