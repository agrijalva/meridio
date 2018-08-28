var Path_Favorito      = API_Path + '/enlaces/';
var Path_Temas         = API_Path + '/tema/';

app.factory( 'gesTemaFactory', function( $http ){
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
        getTemas: function(idMateria) {
            return $http({
                url: Path_Temas + 'getTemas/',
                method: "GET",
                params: {
                    idMateria: idMateria
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        nuevoTema: function(tema,idMateria,idUsuario) {
            return $http({
                url: Path_Temas + 'nuevoTema/',
                method: "GET",
                params: {
                    tema: tema,
                    idMateria: idMateria,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        deleteTema: function(idTema) {
            return $http({
                url: Path_Temas + 'deleteTema/',
                method: "GET",
                params: {
                    idTema: idTema
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        editarTema: function(tema, idTema) {
            return $http({
                url: Path_Temas + 'editarTema/',
                method: "GET",
                params: {
                    tema: tema,
                    idTema: idTema
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});