var Path_Favorito       = API_Path + '/enlaces/';
var Path_Idioma       = API_Path + '/idioma/'

app.factory( 'gesIdiomaFactory', function( $http ){
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
        insertIdioma: function( idUsuario, idioma ) {
            return $http({
                url: Path_Idioma + 'insertIdioma/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idioma: idioma
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        deleteIdioma: function( idIdioma ) {
            return $http({
                url: Path_Idioma + 'deleteIdioma/',
                method: "GET",
                params: {
                    idIdioma: idIdioma
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        editIdioma: function( idIdioma, idioma ) {
            return $http({
                url: Path_Idioma + 'editIdioma/',
                method: "GET",
                params: {
                    idIdioma: idIdioma,
                    idioma: idioma
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
    };
});