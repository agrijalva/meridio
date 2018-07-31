var Path_Noticia      = API_Path + '/categoria/';
var Path_Enlaces      = API_Path + '/enlaces/';
var Path_Tema         = API_Path + '/tema/';
var Path_Idioma         = API_Path + '/idioma/';

app.factory( 'noticiaFactory', function( $http ){
	return {
        categorias: function() {
            return $http({
                url: Path_Noticia + 'categorias/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        temaByIdCat: function(idCategoria) {
            return $http({
                url: Path_Tema + 'temaByIdCat/',
                method: "GET",
                params: {
                    idCategoria: idCategoria
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        idiomas: function() {
            return $http({
                url: Path_Idioma + 'idiomas/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        enlacesTodas: function() {
            return $http({
                url: Path_Enlaces + 'enlacesTodas/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        busquedaEnlaces: function( parametros ) {
            return $http({
                url: Path_Enlaces + 'busquedaEnlaces/',
                method: "GET",
                params: parametros,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        guardaNoticia: function( contenido ) {
            var form = document.forms.namedItem("frmNoticia");
            var oData = new FormData(form);
            oData.append("not_contenido", contenido);
            return $http({
                url: Path_Noticia + 'nueva/',
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
                url: Path_Noticia + 'editar/',
                method: "POST",
                data: oData,
                headers: {
                    'Content-Type': undefined
                }
            });
        },
        todas: function() {
            return $http({
                url: Path_Noticia + 'todas/',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        eliminar: function( idNoticia ) {
            return $http({
                url: Path_Noticia + 'eliminar/',
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