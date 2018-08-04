app.controller("gestorCtrl", ["$scope", "$location", "noticiaFactory", function($scope, $location, noticiaFactory) {
    $scope.user = '';
    $scope.pass = '';

    $scope.datosEnlace = {
        idUsuario: 1,
        titulo: '',
        descripcion: '',
        link: '',
        idCategoria: 0,
        idTema: 0,
        idIdioma: 0,
        idFuente: 0,
        idLicencia: 0,
        idFormato: 0,
        autor: '',
        clave: ''
    }

    $scope.init = function() {
        noticiaFactory.enlacesTodas().then(function(response){
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
    }

    $scope.temaByIdCat = function( idCategoria ){
        noticiaFactory.temaByIdCat( idCategoria ).then(function(response){
            $scope.Temas = response.data;
            if( $scope.Temas.length == 0 )
                $scope.datosEnlace.idTema = 0;
        });
    }

    $scope.guardarEnlace = function(){
        
        if($scope.datosEnlace.titulo ==  ''){
            swal("Meridio", "Falta especificar el campo: titulo");
        }
        else if($scope.datosEnlace.descripcion ==  ''){
            swal("Meridio", "Falta especificar el campo: descripcion");
        }
        else if($scope.datosEnlace.link ==  ''){
            swal("Meridio", "Falta especificar el campo: link");
        }
        else if($scope.datosEnlace.idCategoria ==  0){
            swal("Meridio", "Falta especificar el campo: categoria");
        }
        else if($scope.datosEnlace.idTema ==  0){
            swal("Meridio", "Falta especificar el campo: tema");
        }
        else if($scope.datosEnlace.idIdioma ==  0){
            swal("Meridio", "Falta especificar el campo: idioma");
        }
        else if($scope.datosEnlace.idFuente ==  0){
            swal("Meridio", "Falta especificar el campo: fuente");
        }
        else if($scope.datosEnlace.idLicencia ==  0){
            swal("Meridio", "Falta especificar el campo: licencia");
        }
        else if($scope.datosEnlace.idFormato ==  0){
            swal("Meridio", "Falta especificar el campo: formato");
        }
        else if($scope.datosEnlace.autor ==  ''){
            swal("Meridio", "Falta especificar el campo: autor");
        }
        else if($scope.datosEnlace.clave ==  ''){
            swal("Meridio", "Falta especificar el campo: clave");
        }
        else{
            noticiaFactory.nuevoEnlace( $scope.datosEnlace ).then(function(response){
                $scope.resultado = response.data;
                if( $scope.resultado.length == 0 )
                    swal("Meridio", "Ocurrio un problema al guardar el enlace"); 
                else
                    $("#modalNuevaNoticia").modal("hide");
                    noticiaFactory.enlacesTodas().then(function(response){
                        $scope.Enlaces = response.data;
                    });
                    swal("Meridio", "Se guardo el nuevo enlace");   
            });

        }
    
    }
}]);