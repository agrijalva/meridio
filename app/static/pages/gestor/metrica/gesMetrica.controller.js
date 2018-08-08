app.controller("gesMetricaCtrl", ["$scope", "$sce", "$location", "filterFilter", "gesMetricaFactory", function ($scope, $sce, $location, filterFilter, gesMetricaFactory) {
	// $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );

	// console.log( "gesMetricaFactory", gesMetricaFactory.vistasPorMateria() );

	gesMetricaFactory.vistasPorMateria().then(function(response){
        // console.log( "response", response.data );

        optionsPie = {
			title: {
				text: "Vistas por Materia"
			},
			data: [{
				type: "doughnut",
				startAngle: 45,
				showInLegend: false,
				legendText: "",
				indexLabel: "{label} ({y})",
				yValueFormatString: "#,##0.#" % "",
				dataPoints: response.data
			}]
		};

		$("#pieContainer").CanvasJSChart(optionsPie);
	});

	
	
	// optionsBar = {
	// 	title: {
	// 		text: "Column Chart in jQuery CanvasJS"              
	// 	},
	// 	data: [              
	// 	{
	// 		// Change type to "doughnut", "line", "splineArea", etc.
	// 		type: "column",
	// 		dataPoints: [
	// 			{ label: "apple",  y: 10  },
	// 			{ label: "orange", y: 15  },
	// 			{ label: "banana", y: 25  },
	// 			{ label: "mango",  y: 30  },
	// 			{ label: "grape",  y: 28  }
	// 		]
	// 	}
	// 	]
	// };
	
	// $("#barContainer").CanvasJSChart(optionsBar);
	
	
}]);