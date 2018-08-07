var Path_Login = API_Path + '/login/';

app.factory( 'loginFactory', function( $http ){
	return {
        login: function( usuario, pass ) {
            return $http({
                url: Path_Login + 'login/',
                method: "GET",
                params: {
                    usuario: usuario,
                    pass: pass
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        recoverPass: function( user ) {
            return $http({
                url: Path_Login + 'recoverPass/',
                method: "POST",
                params: {
                    usu_email: user
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});