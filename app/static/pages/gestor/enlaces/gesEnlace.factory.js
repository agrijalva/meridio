var gesEnlace      = API_Path + '/enlaces/';

app.factory( 'gesEnlaceFactory', function( $http ){
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
        eliminar: function( idEnlace ) {
            return $http({
                url: gesEnlace + 'eliminar/',
                method: "GET",
                params: {
                    idEnlace: idEnlace
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});