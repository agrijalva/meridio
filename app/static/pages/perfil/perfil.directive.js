var PathTemplates = 'pages/perfil/templates/';

app.directive('verPerfil', function() {
    return {
        templateUrl: PathTemplates + 'verPerfil.html'
    };
})

app.directive('editarPerfil', function() {
    return {
        templateUrl: PathTemplates + 'editarPerfil.html'
    };
})

app.directive('cambiarPassword', function() {
    return {
        templateUrl: PathTemplates + 'cambiarPassword.html'
    };
})