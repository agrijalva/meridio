var Path_Favorito      = API_Path + '/enlaces/';
var Path_Materia     = API_Path + '/materia/';

app.factory( 'gesMateriaFactory', function( $http ){
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
        insertMateria: function( nombre, idUsuario ) {
            return $http({
                url: Path_Materia + 'insertMateria/',
                method: "GET",
                params: {
                    nombre: nombre,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        deleteMateria: function( idMateria ) {
            return $http({
                url: Path_Materia + 'deleteMateria/',
                method: "GET",
                params: {
                    idMateria: idMateria
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        editarMateria: function( materia, idMateria ) {
            return $http({
                url: Path_Materia + 'editarMateria/',
                method: "GET",
                params: {
                    materia: materia,
                    idMateria: idMateria
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});