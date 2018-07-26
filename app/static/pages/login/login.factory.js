var Path_Login = API_Path + '/usuario/';

app.factory( 'loginFactory', function( $http ){
	return {
        login: function( user, pass ) {
            return $http({
                url: Path_Login + 'login/',
                method: "POST",
                params: {
                    user: user,
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