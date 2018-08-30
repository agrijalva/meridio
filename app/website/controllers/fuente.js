var IdiomaView = require('../views/reference'),
    IdiomaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var Fuente = function (conf) {
    this.conf = conf || {};

    this.view = new IdiomaView();
    this.model = new IdiomaModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Fuente.prototype.get_fuente = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('FUE_TODOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Fuente.prototype.get_insertFuente = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'fuente', value: req.query.fuente, type: self.model.types.STRING },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'estatus', value: 1, type: self.model.types.INT }
    ];

    this.model.query('FUE_INSERT_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Fuente.prototype.get_deleteFuente = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idFuente', value: req.query.idFuente, type: self.model.types.INT }
    ];

    this.model.query('FUE_DELETE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Fuente.prototype.get_editFuente = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'fuente', value: req.query.fuente, type: self.model.types.STRING },
        { name: 'idFuente', value: req.query.idFuente, type: self.model.types.INT }
    ];

    this.model.query('FUE_UPDATE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Fuente;