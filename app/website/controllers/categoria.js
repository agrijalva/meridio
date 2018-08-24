var CategoriaView = require('../views/reference'),
    CategoriaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
var fs = require("fs");

var Categoria = function (conf) {
    this.conf = conf || {};

    this.view = new CategoriaView();
    this.model = new CategoriaModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Categoria.prototype.get_categorias = function (req, res, next) {
    var self = this;
    // var params = [{ name: 'idBanco', value: req.query.idBanco, type: self.model.types.INT },
    //               { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING }
    //               ];
    var params = [];

    this.model.query('CAT_TODOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Categoria.prototype.post_nuevaCategoria = function (req, res, next) {
    var self = this;

    var params = [
        { name: 'categoria', value: req.body.nombre, type: self.model.types.STRING },
        { name: 'descripcion', value: '', type: self.model.types.STRING },
        { name: 'imagen', value: req.body.imagenName, type: self.model.types.STRING },
        { name: 'estatus', value: 1, type: self.model.types.INT },
        { name: 'idUsuario', value: req.body.usuario, type: self.model.types.INT },
        { name: 'orden', value: req.body.order, type: self.model.types.INT },
    ];

    var name = req.body.imagenName;
    var ruta = './app/static/images/categorias/' + name;
    fs.writeFile(ruta, req.body.imagen, 'base64', function (err) {
        if (err) {
            self.view.expositor(res, {
                error: 'Error al insertar la categoria.',
            });
        } else {
            self.model.query('CAT_INSERT_SP', params, function (error, result) {
                console.log('result', result);
                console.log('error', error);
                self.view.expositor(res, {
                    error: error,
                    result: result
                });
            });
        }
    });
};

Categoria.prototype.get_deleteCategoria = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'idCategoria', value: req.query.idCategoria, type: self.model.types.INT }
    ];
    console.log(params);
    this.model.query('CAT_DELETE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Categoria.prototype.post_editarCategoria = function (req, res, next) {
    var self = this;

    var params = [
        { name: 'categoria', value: req.body.nombre, type: self.model.types.STRING },
        { name: 'descripcion', value: '', type: self.model.types.STRING },
        { name: 'imagen', value: req.body.imagenName, type: self.model.types.STRING },
        { name: 'estatus', value: 1, type: self.model.types.INT },
        { name: 'idUsuario', value: req.body.usuario, type: self.model.types.INT },
        { name: 'orden', value: req.body.order, type: self.model.types.INT },
        { name: 'idCategoria', value: req.body.idCategoria, type: self.model.types.INT }
    ];

    var name = req.body.imagenName;
    var ruta = './app/static/images/categorias/' + name;
    fs.writeFile(ruta, req.body.imagen, 'base64', function (err) {
        if (err) {
            self.view.expositor(res, {
                error: 'Error al insertar la categoria.',
            });
        } else {
            self.model.query('CAT_UPDATE_SP', params, function (error, result) {
                console.log('result', result);
                console.log('error', error);
                self.view.expositor(res, {
                    error: error,
                    result: result
                });
            });
        };
    });
};

module.exports = Categoria;