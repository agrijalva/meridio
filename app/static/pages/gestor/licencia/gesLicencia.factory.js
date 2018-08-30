var Path_Favorito      = API_Path + '/enlaces/';
var Path_Licencia      = API_Path + '/licencia/';

app.factory( 'gesLicenciaFactory', function( $http ){
	return {
        favoritoUsuario: function( idUsuario ) {
            return $http({
                url: Path_Actividad + 'favoritoUsuario/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        insertLicencia: function( idUsuario, licencia, descripcion ) {
            return $http({
                url: Path_Licencia + 'insertLicencia/',
                method: "GET",
                params: {
                    licencia: licencia,
                    idUsuario: idUsuario,
                    descripcion: descripcion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        deleteLicencia: function( idLicencia ) {
            return $http({
                url: Path_Licencia + 'deleteLicencia/',
                method: "GET",
                params: {
                    idLicencia: idLicencia
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        editLicencia: function( idLicencia, licencia, descripcion ) {
            return $http({
                url: Path_Licencia + 'editLicencia/',
                method: "GET",
                params: {
                    idLicencia: idLicencia,
                    licencia: licencia,
                    descripcion: descripcion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});