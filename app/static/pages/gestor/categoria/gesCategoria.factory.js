var Path_Favorito      = API_Path + '/enlaces/';
var Path_Categorias     = API_Path+ '/categoria/'

app.factory( 'gesCategoriaFactory', function( $http ){
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
        nuevaCategoria: function(sendData) {
            return $http({
                url: Path_Categorias + 'nuevaCategoria/',
                method: "POST",
                data: sendData,
                headers: {'Content-Type': 'application/json'}
            });
        },
        deleteCategoria: function(idCategoria) {
            return $http({
                url: Path_Categorias + 'deleteCategoria/',
                method: "GET",
                params: {
                    idCategoria: idCategoria
                },
                headers: {'Content-Type': 'application/json'}
            });
        },
        editarCategoria: function(sendData) {
            return $http({
                url: Path_Categorias + 'editarCategoria/',
                method: "POST",
                data: sendData,
                headers: {'Content-Type': 'application/json'}
            });
        }
    };
});