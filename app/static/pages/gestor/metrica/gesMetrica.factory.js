var Path_Reportes = API_Path + '/reportes/';

app.factory( 'gesMetricaFactory', function( $http ){
	return {
        vistasPorMateria: function() {
            return $http({
                url: Path_Reportes + 'vistasPorMateria/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        vistasPorDia: function() {
            return $http({
                url: Path_Reportes + 'vistasPorDia/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});