app.controller("gesMetricaCtrl", ["$scope", "$sce", "$location", "filterFilter", "gesMetricaFactory", function ($scope, $sce, $location, filterFilter, gesMetricaFactory) {
	// $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );

	// console.log( "gesMetricaFactory", gesMetricaFactory.vistasPorMateria() );
	$scope.fechas = {
		fechaInicio: '2018-08-03',
		fechaFin: '2018-08-13'
	}

	gesMetricaFactory.vistasPorMateria( $scope.fechas ).then(function(response){
		$scope.Materias = response.data;
        optionsPie = {
			title: {
				text: "",
				verticalAlign: "center",
			},
			data: [{
				type: "doughnut",
				startAngle: 45,
				showInLegend: false,
				legendText: "",
				indexLabel: "{label} ({y}%)",
				yValueFormatString: "#,##0.#" % "",
				dataPoints: response.data
			}]
		};

		$("#pieContainer").CanvasJSChart(optionsPie);
	});


	gesMetricaFactory.vistasPorCategoria( $scope.fechas ).then(function(response){
		$scope.Categorias = response.data;
        optionsPie = {
			title: {
				text: ""
			},
			data: [{
				type: "doughnut",
				startAngle: 45,
				showInLegend: false,
				legendText: "",
				indexLabel: "{label} ({y}%)",
				yValueFormatString: "#,##0.#" % "",
				dataPoints: response.data
			}]
		};

		$("#pieCategoria").CanvasJSChart(optionsPie);
	});

	gesMetricaFactory.vistasPorTema( $scope.fechas ).then(function(response){
		$scope.Temas = response.data;
        optionsPie = {
			title: {
				text: ""
			},
			data: [{
				type: "doughnut",
				startAngle: 45,
				showInLegend: false,
				legendText: "",
				indexLabel: "{label} ({y}%)",
				yValueFormatString: "#,##0.#" % "",
				dataPoints: response.data
			}]
		};

		$("#pieTema").CanvasJSChart(optionsPie);
	});

	gesMetricaFactory.vistasPorFormato( $scope.fechas ).then(function(response){
		$scope.Formatos = response.data;
        optionsPie = {
			title: {
				text: ""
			},
			data: [{
				type: "doughnut",
				startAngle: 45,
				showInLegend: false,
				legendText: "",
				indexLabel: "{label} ({y}%)",
				yValueFormatString: "#,##0.#" % "",
				dataPoints: response.data
			}]
		};

		$("#pieFormato").CanvasJSChart(optionsPie);
	});


	gesMetricaFactory.vistasPorDia().then(function(response){
		// console.log( response.data );
  //       var chart = new CanvasJS.Chart("barContainer", {
		// 	// theme: "light1", // "light1", "light2", "dark1", "dark2"
		// 	animationEnabled: true,
		// 	zoomEnabled: true,
		// 	title: {
		// 		text: "Vistas por día"
		// 	},
		// 	data: [{
		// 		type: "line",
		// 		dataPoints: []
		// 	}]
		// });

  // //       var xVal = chart.options.data[0].dataPoints.length + 1, yVal = 100;
		// // for(var i = 0; i < 31; i++) {
		// // 	yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		// // 	chart.options.data[0].dataPoints.push({x: xVal,y: yVal});	
		// // 	xVal++;
		// // }

		// var xVal = chart.options.data[0].dataPoints.length + 1, yVal = 100;
		// for(var i = 0; i < response.data.length; i++) {
		// 	chart.options.data[0].dataPoints.push({x: xVal, y: response.data[i].y});	
		// 	xVal++;
		// }

		// chart.render();



		/////// Nueva grafica
		var chart = new CanvasJS.Chart("barContainer", {
			animationEnabled: true,
			title:{
				text: "Vistas por día"
			},
			axisX:{
				valueFormatString: "DD MMM",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY: {
				title: "Vistas totales",
				includeZero: false,
				valueFormatString: "###0",
				crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function(e) {
						return CanvasJS.formatNumber(e.value, "###0");
					}
				}
			},
			data: [{
				type: "line",
				xValueFormatString: "DD MMM",
				yValueFormatString: "###0",
				dataPoints: []
			}]
		});



		// var xVal = chart.options.data[0].dataPoints.length + 1, yVal = 100;
		for(var i = 0; i < response.data.length; i++) {
			chart.options.data[0].dataPoints.push({x: new Date(response.data[i].x), y: response.data[i].y});	
			// xVal++;
		}
		chart.render();
	});	



	




}]);