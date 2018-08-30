app.controller("gesLicenciaCtrl", ["$scope", "$sce", "$location","filterFilter","gesLicenciaFactory", 'noticiaFactory', function($scope, $sce, $location, filterFilter, gesLicenciaFactory, noticiaFactory ) {
    // $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.editorOptions = {
	    // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
    };
    $scope.DataUser = JSON.parse(localStorage.getItem("RCVUserData"));
    $scope.idUsuario = parseInt($scope.DataUser.idUsuario);
    
    $scope.licencias = '';
    $scope.frmLicencia = {
        cat_nombre: '',
        cat_desc: ''
    };

    $scope.init = function(){
        $scope.getLicencia();
    };

    $scope.getLicencia = function(){
        noticiaFactory.getLicencia().then(function(response){
            $scope.licencias = response.data;
        });
    };

    $scope.nuevaLicencia = function(){
        document.getElementById("frmLicencia").reset();
        $('#modalNuevaLic').modal('show');
    };

    $scope.guardarLicencia = function(){
        if ($scope.frmLicencia.cat_nombre == '') {
            swal('Alto', 'Llene todos los campos', 'error');
        } else {
            swal({
                title: 'Merídio',
                text: "¿Está seguro de guardar esta licencia?",
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Si',
                closeOnConfirm: false
            },
            function () {
                gesLicenciaFactory.insertLicencia($scope.idUsuario, $scope.frmLicencia.cat_nombre, $scope.frmLicencia.cat_desc).then(function (response) {
                    console.log( 'response', response );
                    if (response.data[0].success == 1) {
                        swal('Listo', response.data[0].msg, 'success');
                        $scope.getLicencia();
                        $('#modalNuevaLic').modal('hide');
                    } else {
                        swal('Alto', response.data[0].msg, 'error');
                    };
                });
            });
        };
    };

    $scope.deleteLincecia = function(licencia){
        swal({
            title: 'Merídio',
            text: "¿Está seguro de elimnar esta licencia?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function () {
            gesLicenciaFactory.deleteLicencia(licencia.idLicencia).then(function (response) {
                console.log( 'response', response );
                if (response.data[0].success == 1) {
                    swal('Listo', response.data[0].msg, 'success');
                    $scope.getLicencia();
                } else {
                    swal('Alto', response.data[0].msg, 'error');
                };
            });
        });
    };

    $scope.editarLincecia = function(licencia){
        $scope.idLicencia = licencia.idLicencia;
        $scope.frmLicenciaEdit = {
            cat_nombre: licencia.licencia,
            cat_desc: licencia.descripcion
        };
        $('#modalEditarLic').modal('show');
    };

    $scope.saveEditarLic = function(){
        swal({
            title: 'Merídio',
            text: "¿Está seguro de editar esta licencia?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function () {
            gesLicenciaFactory.editLicencia($scope.idLicencia, $scope.frmLicenciaEdit.cat_nombre, $scope.frmLicenciaEdit.cat_desc).then(function (response) {
                console.log( 'response', response );
                if (response.data[0].success == 1) {
                    swal('Listo', response.data[0].msg, 'success');
                    $scope.getLicencia();
                    $('#modalEditarLic').modal('hide');
                } else {
                    swal('Alto', response.data[0].msg, 'error');
                };
            });
        });
    };
	
}]);