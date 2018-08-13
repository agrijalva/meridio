var Path_Reportes = API_Path + '/reportes/';

app.factory( 'gesMetricaFactory', function( $http ){
	return {
        vistasPorMateria: function( fechas ) {
            return $http({
                url: Path_Reportes + 'vistasPorMateria/',
                method: "GET",
                params: fechas,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        vistasPorCategoria: function( fechas ) {
            return $http({
                url: Path_Reportes + 'vistasPorCategoria/',
                method: "GET",
                params: fechas,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        vistasPorTema: function( fechas ) {
            return $http({
                url: Path_Reportes + 'vistasPorTema/',
                method: "GET",
                params: fechas,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        vistasPorFormato: function( fechas ) {
            return $http({
                url: Path_Reportes + 'vistasPorFormato/',
                method: "GET",
                params: fechas,
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