var CategoriaView = require('../views/reference'),
    CategoriaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var Enlaces = function (conf) {
    this.conf = conf || {};

    this.view = new CategoriaView();
    this.model = new CategoriaModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Enlaces.prototype.get_enlacesTodas = function(req, res, next) {
    var self = this;
    // var params = [{ name: 'idBanco', value: req.query.idBanco, type: self.model.types.INT },
    //               { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING }
    //               ];
    
    var params = [];

    this.model.query('ENL_TODAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Enlaces.prototype.get_getById = function(req, res, next) {
    var self = this;
    var params = [{ name: 'idEnlace', value: req.query.idEnlace, type: self.model.types.STRING } ];

    this.model.query('ENL_SOLOUNO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result[0]
        });
    });
};

Enlaces.prototype.get_busquedaEnlaces = function(req, res, next) {
    var self = this;
    var params = [];
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idCategoria', value: req.query.idCategoria, type: self.model.types.INT },
        { name: 'idTema', value: req.query.idTema, type: self.model.types.INT },
        { name: 'titulo', value: req.query.titulo, type: self.model.types.STRING },
        { name: 'descripcion', value: req.query.descripcion, type: self.model.types.STRING },
        { name: 'clave', value: req.query.clave, type: self.model.types.STRING },
        { name: 'idIdioma', value: req.query.idIdioma, type: self.model.types.STRING }
    ];

    this.model.query('ENL_BUSQUEDA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Enlaces;