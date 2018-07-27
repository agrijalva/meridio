var Path_Favorito      = API_Path + '/noticia/';

app.factory( 'FavoritosFactory', function( $http ){
	return {
        guardaNoticia: function( contenido ) {
            var form = document.forms.namedItem("frmNoticia");
            var oData = new FormData(form);
            oData.append("not_contenido", contenido);
            return $http({
                url: Path_Favorito + 'nueva/',
                method: "POST",
                data: oData,
                headers: {
                    'Content-Type': undefined
                }
            });
        },
        editarNoticia: function( data ) {
            var form = document.forms.namedItem("frmNoticiaEditar");
            var oData = new FormData(form);
            oData.append("idNoticia", data.idNoticia);
            oData.append("not_titulo", data.not_titulo);
            oData.append("not_subtitulo", data.not_subtitulo);
            oData.append("not_contenido", data.not_contenido);
            oData.append("not_url", data.not_url);
            return $http({
                url: Path_Favorito + 'editar/',
                method: "POST",
                data: oData,
                headers: {
                    'Content-Type': undefined
                }
            });
        },
        todas: function() {
            return $http({
                url: Path_Favorito + 'todas/',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        eliminar: function( idNoticia ) {
            return $http({
                url: Path_Favorito + 'eliminar/',
                method: "POST",
                params: {
                    idNoticia: idNoticia
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});