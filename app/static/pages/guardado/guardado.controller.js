app.controller("FavoritosCtrl", ["$scope", "$sce", "$location","filterFilter","FavoritosFactory", function($scope, $sce, $location, filterFilter, FavoritosFactory ) {
    $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );
    $scope.editorOptions = {
	    // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
	};

	$scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.Noticias = [];
    $scope.numberOfPages=function(){
    	if( $scope.Noticias.success ){
	        return Math.ceil($scope.Noticias.data.length/$scope.pageSize);
	    }
    }

	$scope.frmNoticia = {
		idNoticia: 0,
		not_titulo: '',
		not_subtitulo: '',
		not_contenido: '',
		not_url: '',
		not_imagen: ''
	}

    $scope.openNewNews = function(){
    	$scope.frmNoticia = {
			idNoticia: 0,
			not_titulo: '',
			not_subtitulo: '',
			not_contenido: '',
			not_url: '',
			not_imagen: ''
		}
		document.getElementById("frmNoticia").reset();
    	$("#modalNuevaNoticia").modal("show");
    }

    $scope.openEditNews = function( item ){
        var aux = item.not_titulo.replace(/&#(\d+);/g, function(match, dec) {
            console.log("dec", dec)
                return String.fromCharCode(dec);
            });
        // decode : function(str) {
        //     return str.replace(/&#(\d+);/g, function(match, dec) {
        //         return String.fromCharCode(dec);
        //     });

        console.log( "not_titulo", aux );
    	$scope.frmNoticia = {
			idNoticia: item.idNoticia,
			not_titulo: htmlentities.decode(item.not_titulo),
			not_subtitulo: item.not_subtitulo,
			not_contenido: item.not_contenido,
			not_url: item.not_url,
			not_imagen: item.not_imagen
		}
		// document.getElementById("frmNoticiaEditar").reset();
    	$("#modalEditarNoticia").modal("show");
    }

    $scope.guardarNoticia = function(){
    	FavoritosFactory.guardaNoticia( $scope.frmNoticia.not_contenido ).then(function(response){
    		console.log("response", response);
    		if( response.data.success ){
    			swal("Noticias", "Noticia guardada correctamente." );
    			$scope.init();
    			$("#modalNuevaNoticia").modal("hide");
    		}
    		else{
    			swal("Noticias", response.data.msg );
    		}
    	});
    }

    $scope.editarNoticia = function(){
    	FavoritosFactory.editarNoticia( $scope.frmNoticia ).then(function(response){
    		if( response.data.success ){
    			swal("Noticias", "Noticia guardada correctamente." );
    			$scope.init();
    			$("#modalEditarNoticia").modal("hide");
    		}
    		else{
    			swal("Noticias", response.data.msg );
    		}
    	});
    }

    $scope.init = function(){
    	FavoritosFactory.todas().then(function(response){
    		$scope.Noticias = response.data;
    		// $scope.data = $scope.Noticias.data
    		console.log("Noticias", $scope.Noticias);
    	});
    }

    $scope.eliminar = function( idNoticia ){
    	swal({
            title: 'Noticias',
            text: "¿Realmente quiere eliminar esta noticia.?",
            showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si, Eliminar!',
            closeOnConfirm: false
        },
        function(){
        	FavoritosFactory.eliminar( idNoticia ).then(function(response){
	    		$scope.init();
	    		if( response.data.success ){
                	swal("Caluladora", "Noticia eliminada correctamente");
	    		}
	    		else{
	    			swal("Caluladora", "No se ha podido eliminar esta noticia.");
	    		}
	    	});
        });    	
    }

    // Editor options.
  	$scope.options = {
	    language: 'es',
	    allowedContent: true,
	    entities: false
  	};

  	// Called when the editor is completely ready.
  	$scope.onReady = function () {
	    console.log( "content", $scope.content );
  	};
}]);

(function(window){
    window.htmlentities = {
        /**
         * Converts a string to its html characters completely.
         *
         * @param {String} str String with unescaped HTML characters
         **/
        encode : function(str) {
            var buf = [];
            
            for (var i=str.length-1;i>=0;i--) {
                buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
            }
            
            return buf.join('');
        },
        /**
         * Converts an html characterSet into its original character.
         *
         * @param {String} str htmlSet entities
         **/
        decode : function(str) {
            return str.replace(/&#(\d+);/g, function(match, dec) {
                return String.fromCharCode(dec);
            });
        }
    };
})(window);