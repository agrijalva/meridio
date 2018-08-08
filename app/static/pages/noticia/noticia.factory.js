var Path_Noticia      = API_Path + '/categoria/';
var Path_Enlaces      = API_Path + '/enlaces/';
var Path_Tema         = API_Path + '/tema/';
var Path_Materia      = API_Path + '/materia/';
var Path_Idioma       = API_Path + '/idioma/';
var Path_Formato      = API_Path + '/formato/';
var Path_Fuente       = API_Path + '/fuente/';
var Path_Licencia     = API_Path + '/licencia/';
var Path_Actividad    = API_Path + '/actividad/';

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

        getById: function( idEnlace ) {
            return $http({
                url: Path_Enlaces + 'getById/',
                method: "GET",
                params: {
                    idEnlace: idEnlace
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getMaterias: function() {
            return $http({
                url: Path_Materia + 'materias/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        viewAdd: function( idUsuario, idEnlace ) {
            return $http({
                url: Path_Actividad + 'viewAdd/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEnlace: idEnlace
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        favoritoAdd: function( idUsuario, idEnlace ) {
            return $http({
                url: Path_Actividad + 'favoritoAdd/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEnlace: idEnlace
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        favoritoRemove: function( idUsuario, idEnlace ) {
            return $http({
                url: Path_Actividad + 'favoritoRemove/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEnlace: idEnlace
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

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

        

        getFormato: function() {
            return $http({
                url: Path_Formato + 'formato/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getFuente: function() {
            return $http({
                url: Path_Fuente + 'fuente/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getLicencia: function() {
            return $http({
                url: Path_Licencia + 'licencia/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },




        temaByIdMat: function(idMateria) {
            return $http({
                url: Path_Tema + 'temaByIdMat/',
                method: "GET",
                params: {
                    idMateria: idMateria
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

        enlacesTodas: function( idUsuario ) {
            return $http({
                url: Path_Enlaces + 'enlacesTodas/',
                method: "GET",
                params:{
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        aprobarEnlace: function( idUsuario, idEnlace ) {
            return $http({
                url: Path_Enlaces + 'aprobarEnlace/',
                method: "GET",
                params:{
                    idUsuario: idUsuario,
                    idEnlace: idEnlace
                },
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

        nuevoEnlace: function( parametros ) {
            return $http({
                url: Path_Enlaces + 'nuevoEnlace/',
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