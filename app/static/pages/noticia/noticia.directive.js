var PathTemplates = 'pages/noticia/templates/';

app.directive('panelSearch', function() {
    return {
        templateUrl: PathTemplates + 'panelSearch.html'
    };
})

app.directive('feed', function() {
    return {
        templateUrl: PathTemplates + 'feed.html'
    };
})