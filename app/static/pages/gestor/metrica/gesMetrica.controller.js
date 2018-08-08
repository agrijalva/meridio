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


	gesMetricaFactory.vistasPorDia().then(function(response){
		console.log( response.data );
        var chart = new CanvasJS.Chart("barContainer", {
			theme: "light1", // "light1", "light2", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			title: {
				text: "Vistas por día"
			},
			data: [{
				type: "area",
				dataPoints: []
			}]
		});

        var xVal = chart.options.data[0].dataPoints.length + 1, yVal = 100;
		for(var i = 0; i < 31; i++) {
			yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
			chart.options.data[0].dataPoints.push({x: xVal,y: yVal});	
			xVal++;
		}

		// var xVal = chart.options.data[0].dataPoints.length + 1, yVal = 100;
		// for(var i = 0; i < response.data.length; i++) {
		// 	chart.options.data[0].dataPoints.push({x: xVal, y: response.data[i].y});	
		// 	xVal++;
		// }

		chart.render();
	});

	
	// var chart = new CanvasJS.Chart("barContainer", {
	// 	theme: "light2", // "light1", "light2", "dark1", "dark2"
	// 	animationEnabled: true,
	// 	zoomEnabled: true,
	// 	title: {
	// 		text: "Try Zooming and Panning"
	// 	},
	// 	data: [{
	// 		type: "area",
	// 		dataPoints: []
	// 	}]
	// });

	// addDataPoints(365);  
	// chart.render();

	$scope.addDataPoints = function(data) {
		console.log( data );
		var xVal = chart.options.data[0].dataPoints.length + 1, yVal = 100;
		// for(var i = 0; i < noOfDps; i++) {
		// 	yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		// 	chart.options.data[0].dataPoints.push({x: xVal,y: yVal});	
		// 	xVal++;
		// }
	}



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