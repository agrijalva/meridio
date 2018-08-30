app.controller("gesCategoriaCtrl", ["$scope", "$sce", "$location", "filterFilter", "gesCategoriaFactory", "noticiaFactory", function ($scope, $sce, $location, filterFilter, gesCategoriaFactory, noticiaFactory) {
    $scope.DataUser = JSON.parse(localStorage.getItem("RCVUserData"));
    $scope.idUsuario = parseInt($scope.DataUser.idUsuario);


    $scope.editorOptions = {
        // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
    };

    $scope.frmCategoria = {
        cat_nombre: '',
        cat_orden: ''
    };
    $scope.loadImg = false;

    $scope.init = function () {
        noticiaFactory.categorias().then(function (response) {
            $scope.categoria = response.data;
            angular.forEach($scope.categoria, function (value, item) {
                value.imagen = 'images/categorias/' + value.imagen;
            });
        });
    };

    $scope.stepsModel = [];

    $scope.imageUpload = function (event) {
        $scope.files = event.target.files; //FileList object

        for (var i = 0; i < $scope.files.length; i++) {
            var file = $scope.files[i];
            $scope.reader = new FileReader();
            $scope.reader.onload = $scope.imageIsLoaded;
            $scope.reader.readAsDataURL(file);
            $scope.loadImg = true;
        };
    };

    $scope.imageIsLoaded = function (e) {
        $scope.$apply(function () {
            $scope.stepsModel.push(e.target.result);
        });
    };

    $scope.nuevaCategoria = function () {
        document.getElementById("frmCategoria").reset();
        $("#modalNuevaCat").modal("show");
    };

    $scope.guardarCategoria = function () {
        swal({
            title: 'Merídio',
            text: "¿Está seguro de guardar esta categoria?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
            function () {
                if (frmCategoria.cat_nombre == '' || frmCategoria.cat_orden == '' || !$scope.loadImg) {
                    swal('Alto', 'Debes llenar todos los campos', 'warning');
                } else {
                    var img = $scope.reader.result.split(",");
                    var sendData = {
                        usuario: $scope.idUsuario,
                        nombre: $scope.frmCategoria.cat_nombre,
                        order: $scope.frmCategoria.cat_orden,
                        imagen: img[1],
                        imagenName: $scope.files[0].name,
                        imageType: $scope.files[0].type
                    };
                    gesCategoriaFactory.nuevaCategoria(sendData).then(function (response) {
                        if (response.data[0].success == 1) {
                            swal('Listo', response.data[0].msg, 'success');
                            $scope.init();
                            $("#modalNuevaCat").modal("hide");
                        } else {
                            swal('Alto', response.data[0].msg, 'error');
                        };
                    });
                };
            });
    };

    $scope.deleteCategoria = function (idCategoria) {
        swal({
            title: 'Merídio',
            text: "¿Está seguro de eliminar esta categoria?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function () {
            gesCategoriaFactory.deleteCategoria(idCategoria.idCategoria).then(function (response) {
                console.log(response)
                if (response.data[0].success == 1) {
                    swal('Listo', response.data[0].msg, 'success');
                    $scope.init();
                } else {
                    swal('Alto', response.data[0].msg, 'error');
                }
            });
        });
    };

    $scope.editarCategoria = function (categoria) {
        $scope.idCategoria = categoria.idCategoria;
        $scope.editImg = categoria.imagen;
        $("#modalEditarCat").modal("show");
        $scope.frmCategoriaEdit = {
            cat_nombre: categoria.categoria,
            cat_orden: categoria.orden
        };
    };

    $scope.saveEditarCat = function () {
        swal({
            title: 'Merídio',
            text: "¿Está seguro de editar esta categoria?",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si',
            closeOnConfirm: false
        },
        function () {
            var img = $scope.reader.result.split(",");
            var sendData = {
                usuario: $scope.idUsuario,
                nombre: $scope.frmCategoriaEdit.cat_nombre,
                order: $scope.frmCategoriaEdit.cat_orden,
                imagen: img[1],
                imagenName: $scope.files[0].name,
                imageType: $scope.files[0].type,
                idCategoria: $scope.idCategoria
            };

            gesCategoriaFactory.editarCategoria(sendData).then(function (response) {
                if (response.data[0].success == 1) {
                    swal('Listo', response.data[0].msg, 'success');
                    $scope.init();
                    $("#modalEditarCat").modal("hide");
                } else {
                    swal('Alto', response.data[0].msg, 'error');
                };
            });
        });
    };

}]);