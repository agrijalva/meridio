var TemaView = require('../views/reference'),
    TemaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var Tema = function (conf) {
    this.conf = conf || {};

    this.view = new TemaView();
    this.model = new TemaModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Tema.prototype.get_temaByIdMat = function (req, res, next) {
    var self = this;
    var params = [];

    var params = [
        { name: 'idMateria', value: req.query.idMateria, type: self.model.types.INT },
    ];
    this.model.query('TEM_TEMAPORIDMATERIA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Tema.prototype.get_getTemas = function (req, res, next) {
    var self = this;
    
    var params = [];
    this.model.query('TEM_TODOS_SP', params, function (error, result) {
        
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Tema.prototype.get_nuevoTema = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'tema', value: req.query.tema, type: self.model.types.STRING },
        { name: 'idMateria', value: req.query.idMateria, type: self.model.types.INT },
        { name: 'estatus', value: 1, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];
    this.model.query('TEM_INSERT_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Tema.prototype.get_deleteTema = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'idTema', value: req.query.idTema, type: self.model.types.INT }
    ];
    this.model.query('TEM_DELETE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Tema.prototype.get_editarTema = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'tema', value: req.query.tema, type: self.model.types.STRING },
        { name: 'idTema', value: req.query.idTema, type: self.model.types.INT }
    ];
    this.model.query('TEM_UPDATE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Tema;