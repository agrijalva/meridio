app.controller("gesFormatoCtrl", ["$scope", "$sce", "$location","filterFilter","gesFormatoFactory", 'noticiaFactory', function($scope, $sce, $location, filterFilter, gesFormatoFactory, noticiaFactory ) {
    // $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.editorOptions = {
	    // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
    };
    
    $scope.DataUser = JSON.parse(localStorage.getItem("RCVUserData"));
    $scope.idUsuario = parseInt($scope.DataUser.idUsuario);

    $scope.formatos = '';
    $scope.frmFormato = {
        cat_nombre: ''
    };


    $scope.init = function(){
        $scope.getFormatos()
    };

    $scope.getFormatos = function(){
        noticiaFactory.getFormato().then(function(response){
            $scope.formatos = response.data;
        });
    };

    $scope.nuevoFormato = function(){
        document.getElementById("frmFormato").reset();
        $('#modalNuevoForma').modal('show');
    };

    $scope.guardarFormato = function(){
        if ($scope.frmFormato.cat_nombre == '') {
            swal('Alto', 'Llene todos los campos', 'error');
        } else {
            swal({
                title: 'Merídio',
                text: "¿Está seguro de guardar este formato?",
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Si',
                closeOnConfirm: false
            },
            function () {
                gesFormatoFactory.insertFormato($scope.idUsuario, $scope.frmFormato.cat_nombre).then(function (response) {
                    if (response.data[0].success == 1) {
                        swal('Listo', response.data[0].msg, 'success');
                        $scope.getFormatos();
                        $('#modalNuevoForma').modal('hide');
                    } else {
                        swal('Alto', response.data[0].msg, 'error');
                    }
                });
            });
        };
    };

    $scope.deleteFormato = function(formato){
        swal({
            title: 'Merídio',
            text: "¿Está seguro de eliminar este formato?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function () {
            console.log( 'idFormato', formato.idFormato );
            gesFormatoFactory.deleteFormato(formato.idFormato).then(function (response) {
                if (response.data[0].success == 1) {
                    swal('Listo', response.data[0].msg, 'success');
                    $scope.getFormatos();
                } else {
                    swal('Alto', response.data[0].msg, 'error');
                }
            });
        });
    };

    $scope.editarFormato = function(formato){
        $scope.idFormato = formato.idFormato;
        $scope.frmFormatoEdit = {
            cat_nombre: formato.formato
        };
        $('#modalEditarForm').modal('show');
    };

    $scope.saveEditarForm = function(){
        swal({
            title: 'Merídio',
            text: "¿Está seguro de editar este formato?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function () {
            gesFormatoFactory.editFormato($scope.idFormato, $scope.frmFormatoEdit.cat_nombre).then(function (response) {
                console.log( 'respose', response );
                if (response.data[0].success == 1) {
                    swal('Listo', response.data[0].msg, 'success');
                    $scope.getFormatos();
                    $('#modalEditarForm').modal('hide');
                } else {
                    swal('Alto', response.data[0].msg, 'error');
                }
            });
        });
    };
    
}]);