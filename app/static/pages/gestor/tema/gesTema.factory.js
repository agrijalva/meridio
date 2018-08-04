var Path_Favorito      = API_Path + '/enlaces/';

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
        }
    };
});