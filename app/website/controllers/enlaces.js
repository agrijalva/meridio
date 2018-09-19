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
    var params = [{ name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }];
    
    // var params = [];

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

Enlaces.prototype.get_eliminar = function(req, res, next) {
    var self = this;
    var params = [{ name: 'idEnlace', value: req.query.idEnlace, type: self.model.types.INT } ];

    this.model.query('ENL_DELETE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Enlaces.prototype.get_aprobarEnlace = function(req, res, next) {
    var self = this;
    var params = [  
                    { name: 'idEnlace', value: req.query.idEnlace, type: self.model.types.STRING },
                    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.STRING } 
                ];

    this.model.query('ENL_APROBAR_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result[0]
        });
    });
};

Enlaces.prototype.get_busquedaEnlaces = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idCategoria', value: req.query.idCategoria, type: self.model.types.INT },
        { name: 'idTema', value: req.query.idTema, type: self.model.types.INT },
        { name: 'idMateria', value: req.query.idMateria, type: self.model.types.INT },
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

Enlaces.prototype.get_nuevoEnlace = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'titulo', value: req.query.titulo, type: self.model.types.STRING },
        { name: 'descripcion', value: req.query.descripcion, type: self.model.types.STRING },
        { name: 'link', value: req.query.link, type: self.model.types.STRING },
        { name: 'idCategoria', value: req.query.idCategoria, type: self.model.types.INT },
        { name: 'idMateria', value: req.query.idMateria, type: self.model.types.INT },
        { name: 'idTema', value: req.query.idTema, type: self.model.types.INT },
        { name: 'idIdioma', value: req.query.idIdioma, type: self.model.types.INT },
        { name: 'idFuente', value: req.query.idFuente, type: self.model.types.INT },
        { name: 'idLicencia', value: req.query.idLicencia, type: self.model.types.INT },
        { name: 'idFormato', value: req.query.idFormato, type: self.model.types.INT },
        { name: 'autor', value: req.query.autor, type: self.model.types.STRING },
        { name: 'clave', value: req.query.clave, type: self.model.types.STRING }
    ];
    
    this.model.query('ENL_INSERT_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Enlaces.prototype.get_actualizaEnlace = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idEnlace', value: req.query.idEnlace, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'titulo', value: req.query.titulo, type: self.model.types.STRING },
        { name: 'descripcion', value: req.query.descripcion, type: self.model.types.STRING },
        { name: 'link', value: req.query.link, type: self.model.types.STRING },
        { name: 'idCategoria', value: req.query.idCategoria, type: self.model.types.INT },
        { name: 'idMateria', value: req.query.idMateria, type: self.model.types.INT },
        { name: 'idTema', value: req.query.idTema, type: self.model.types.INT },
        { name: 'idIdioma', value: req.query.idIdioma, type: self.model.types.INT },
        { name: 'idFuente', value: req.query.idFuente, type: self.model.types.INT },
        { name: 'idLicencia', value: req.query.idLicencia, type: self.model.types.INT },
        { name: 'idFormato', value: req.query.idFormato, type: self.model.types.INT },
        { name: 'autor', value: req.query.autor, type: self.model.types.STRING },
        { name: 'clave', value: req.query.clave, type: self.model.types.STRING }
    ];
    
    this.model.query('ENL_UPDATE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Enlaces;