var Path_Favorito      = API_Path + '/enlaces/';
var Path_Formato       = API_Path + '/formato/'

app.factory( 'gesFormatoFactory', function( $http ){
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
        insertFormato: function( idUsuario, formato ) {
            return $http({
                url: Path_Formato + 'insertFormato/',
                method: "GET",
                params: {
                    formato:formato,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        deleteFormato: function( idFormato ) {
            return $http({
                url: Path_Formato + 'deleteFormato/',
                method: "GET",
                params: {
                    idFormato:idFormato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        editFormato: function( idFormato, formato ) {
            return $http({
                url: Path_Formato + 'editFormato/',
                method: "GET",
                params: {
                    idFormato:idFormato,
                    formato: formato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});