app.controller("PerfilCtrl", ["$scope", "$sce", "$location","filterFilter","perfilFactory", function($scope, $sce, $location, filterFilter, perfilFactory ) {
    $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.frmDataUser      = JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.panelPerfil		= {
	    ver: true,
		editar: false,
		cambiar: false
    }
    $scope.frmPass          = {
        pass: '',
        passnew: '',
        passnewconfirm: ''
    }

    $scope.pnlNoticias =function(){
        $location.path("/admin/noticia");
    }

    $scope.init = function(){
        
    }

    $scope.pnlVer = function(){
        $location.path("/admin/perfil");
    }

    $scope.pnlEditar = function(){
        $location.path("/admin/editarperfil");
    }

    $scope.pnlCambiar = function(){
        $location.path("/admin/cambiarpassword");
        $scope.frmPass          = {
            pass: '',
            passnew: '',
            passnewconfirm: '',
        }
    }

    $scope.editarPerfil = function(){
        perfilFactory.editar( $scope.frmDataUser.idUsuario, $scope.frmDataUser.usu_nombre, $scope.frmDataUser.usu_email ) .then(function(result){
            var Resultado = result.data;
            if( Resultado.success ){
                swal("Calculadora", "Se ha actualizado su datos de perfil exitosamente.");
                localStorage.setItem("RCVUserData", JSON.stringify($scope.frmDataUser));
                $scope.pnlVer();
            }
            else{
                swal("Calculadora", Resultado.msg);
            }
        }, function(error){
            console.log("Error", error);
        });  
    }

    $scope.cambiarPasword = function(){
        var param = {
            idUsuario: $scope.DataUser.idUsuario,
            pass: $scope.frmPass.pass,
            passnew: $scope.frmPass.passnew,
            passnewconfirm: $scope.frmPass.passnewconfirm
        }

        perfilFactory.cambiarPass( param ) .then(function(result){
            var Resultado = result.data;
            if( Resultado.success ){
                swal("Calculadora", "Se ha guardado correctamente su nueva contraseña.");
                $scope.pnlVer();
            }
            else{
                switch( parseInt(Resultado.code) ){
                    case 400: swal("Calculadora", "La contraseña actual no es la correcta."); break;
                    case 410: swal("Calculadora", "La confirmación de la contraseña no coincide."); break;
                    default: swal("Calculadora", Resultado.msg);break;
                }
            }
        }, function(error){
            console.log("Error", error);
        }); 
    }

    $scope.htmlConvert = function( string ){
        var rp = String(string);
        rp.replace(/&aacute;/g, "á");
        rp.replace(/&eacute;/g, "é");
        rp.replace("&iacute;", "í");
        rp.replace(/&oacute;/g, "ó");
        rp.replace(/&uacute;/g, "ú");
        rp.replace(/&Aacute;/g, "Á");
        rp.replace(/&Eacute;/g, "É");
        rp.replace(/&Iacute;/g, "Í");
        rp.replace(/&Oacute;/g, "Ó");
        rp.replace(/&Uacute;/g, "Ú");
        rp.replace(/&ntilde;/g, "ñ");
        rp.replace(/&Ntilde;/g, "Ñ");
        return rp;
    }
}]);