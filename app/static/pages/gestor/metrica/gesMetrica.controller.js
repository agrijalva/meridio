app.controller("gesMetricaCtrl", ["$scope", "$sce", "$location", "filterFilter", "gesMetricaFactory", function ($scope, gesMetricaFactory) {
	// $scope.DataUser     	= JSON.parse( localStorage.getItem("RCVUserData") );
	$scope.editorOptions = {
		// settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
	};

	optionsPie = {
		title: {
			text: "Hola"
		},
		data: [{
			type: "pie",
			startAngle: 45,
			showInLegend: "true",
			legendText: "{label}",
			indexLabel: "{label} ({y})",
			yValueFormatString: "#,##0.#" % "",
			dataPoints: [
				{ label: "Organic", y: 36 },
				{ label: "Email Marketing", y: 31 },
				{ label: "Referrals", y: 7 },
				{ label: "Twitter", y: 7 },
				{ label: "Facebook", y: 6 },
				{ label: "Google", y: 10 },
				{ label: "Others", y: 3 }
			]
		}]
	};
	
	optionsBar = {
		title: {
			text: "Column Chart in jQuery CanvasJS"              
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: "apple",  y: 10  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }
			]
		}
		]
	};
	
	$("#barContainer").CanvasJSChart(optionsBar);
	
	$("#pieContainer").CanvasJSChart(optionsPie);
}]);