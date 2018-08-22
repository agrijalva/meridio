app.controller("gesEnlaceCtrl", ["$scope", "$sce", "$location","filterFilter","gesEnlaceFactory", "noticiaFactory", function($scope, $sce, $location, filterFilter, gesEnlaceFactory, noticiaFactory ) {
    $scope.DataUser = JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.idUsuario = parseInt($scope.DataUser.idUsuario);

    $scope.datosEnlace = {
        idUsuario: 1,
        titulo: '',
        descripcion: '',
        link: '',
        idCategoria: 0,
        idTema: 0,
        idMateria: 0,
        idIdioma: 0,
        idFuente: 0,
        idLicencia: 0,
        idFormato: 0,
        autor: '',
        clave: ''
    }

    $scope.aurotizarEnlace = function( idEnlace){
        swal({
            title: 'Merídio',
            text: "¿Está seguro de autorizar este enlace?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function(){
            noticiaFactory.aprobarEnlace( $scope.idUsuario, idEnlace ).then(function(response){
                $scope.init();
                if( response.data.success ){
                    swal("Merídio", "Enlace aprobada correctamente");
                }
                else{
                    swal("Merídio", "No se ha podido aprobar esta enlace.");
                }
            });
        }); 
    }

    $scope.init = function() {
        noticiaFactory.enlacesTodas($scope.idUsuario).then(function(response){
            $scope.Enlaces = response.data;
        });

        $scope.loadCombos();
    }

    $scope.openNewLinck = function(){
        document.getElementById("frmEnlace").reset();
        $("#modalNuevaNoticia").modal("show");
    }

    $scope.loadCombos = function(){
        noticiaFactory.getFormato().then(function(response){
            $scope.Formato = response.data;
        });

        noticiaFactory.getFuente().then(function(response){
            $scope.Fuente = response.data;
        });

        noticiaFactory.getLicencia().then(function(response){
            $scope.Licencia = response.data;
        });

        noticiaFactory.idiomas().then(function(response){
            $scope.Idiomas = response.data;
        });

        noticiaFactory.categorias().then(function(response){
            $scope.Categorias = response.data;
        });

        $scope.getMaterias();
    }

    $scope.temaByIdMat = function( idMateria ){
        noticiaFactory.temaByIdMat( idMateria ).then(function(response){
            $scope.temas = response.data;
            // if( $scope.temas.length == 0 )
            $scope.datosEnlace.idTema = 0;
        });
    }

    $scope.getMaterias = function(){
        noticiaFactory.getMaterias().then(function(response){
            $scope.materias = response.data;
        });
    }

    $scope.guardarEnlace = function(){
        
        if($scope.datosEnlace.titulo ==  ''){
            swal("Merídio", "Falta especificar el campo: titulo");
        }
        else if($scope.datosEnlace.descripcion ==  ''){
            swal("Merídio", "Falta especificar el campo: descripcion");
        }
        else if($scope.datosEnlace.link ==  ''){
            swal("Merídio", "Falta especificar el campo: link");
        }
        else if($scope.datosEnlace.idCategoria ==  0){
            swal("Merídio", "Falta especificar el campo: categoria");
        }
        else if($scope.datosEnlace.idTema ==  0){
            swal("Merídio", "Falta especificar el campo: tema");
        }
        else if($scope.datosEnlace.idIdioma ==  0){
            swal("Merídio", "Falta especificar el campo: idioma");
        }
        else if($scope.datosEnlace.idFuente ==  0){
            swal("Merídio", "Falta especificar el campo: fuente");
        }
        else if($scope.datosEnlace.idLicencia ==  0){
            swal("Merídio", "Falta especificar el campo: licencia");
        }
        else if($scope.datosEnlace.idFormato ==  0){
            swal("Merídio", "Falta especificar el campo: formato");
        }
        // else if($scope.datosEnlace.autor ==  ''){
        //     swal("Meridio", "Falta especificar el campo: autor");
        // }
        // else if($scope.datosEnlace.clave ==  ''){
        //     swal("Meridio", "Falta especificar el campo: clave");
        // }
        else{
            noticiaFactory.nuevoEnlace( $scope.datosEnlace ).then(function(response){
                $scope.resultado = response.data;
                if( $scope.resultado.length == 0 )
                    swal("Merídio", "Ocurrio un problema al guardar el enlace"); 
                else
                    $("#modalNuevaNoticia").modal("hide");
                    noticiaFactory.enlacesTodas( $scope.idUsuario ).then(function(response){
                        $scope.Enlaces = response.data;
                    });
                    swal("Merídio", "Se guardo el nuevo enlace");   
            });
        }
    
    }	
}]);