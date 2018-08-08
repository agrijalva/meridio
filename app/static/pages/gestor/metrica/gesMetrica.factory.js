var Path_Favorito = API_Path + '/metrica/';

app.factory( 'gesMetricaFactory', function( $http ){
	return {
        // favoritoUsuario: function( idUsuario ) {
        //     return $http({
        //         url: Path_Actividad + 'favoritoUsuario/',
        //         method: "GET",
        //         params: {
        //             idUsuario: idUsuario
        //         },
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        // }
    };
});