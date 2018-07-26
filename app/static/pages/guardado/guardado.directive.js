var PathTemplates = 'pages/guardado/templates/';

app.directive('favPanelSearch', function() {
    return {
        templateUrl: PathTemplates + 'favPanelSearch.html'
    };
})

app.directive('favFeed', function() {
    return {
        templateUrl: PathTemplates + 'favFeed.html'
    };
})