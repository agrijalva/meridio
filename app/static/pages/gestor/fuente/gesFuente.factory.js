var Path_Favorito      = API_Path + '/enlaces/';
var Path_Fuente        = API_Path + '/fuente/';

app.factory( 'gesFuenteFactory', function( $http ){
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
        insertFuente: function( idUsuario, fuente ) {
            return $http({
                url: Path_Fuente + 'insertFuente/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    fuente: fuente
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        deleteFuente: function( idFuente ) {
            return $http({
                url: Path_Fuente + 'deleteFuente/',
                method: "GET",
                params: {
                    idFuente: idFuente
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        editFuente: function( idFuente, fuente ) {
            return $http({
                url: Path_Fuente + 'editFuente/',
                method: "GET",
                params: {
                    idFuente: idFuente,
                    fuente: fuente
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});