var Path_Perfil      = API_Path + '/usuario/';

app.factory( 'perfilFactory', function( $http ){
	return {
        editar: function( idUsuario, nombre, email ) {
            return $http({
                url: Path_Perfil + 'editar/',
                method: "POST",
                params: {
                    idUsuario: idUsuario,
                    nombre: nombre,
                    email: email
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        cambiarPass: function( param ) {
            return $http({
                url: Path_Perfil + 'cambiarPass/',
                method: "POST",
                params: param,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});