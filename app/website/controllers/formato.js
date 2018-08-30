var IdiomaView = require('../views/reference'),
    IdiomaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var Formato = function (conf) {
    this.conf = conf || {};

    this.view = new IdiomaView();
    this.model = new IdiomaModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Formato.prototype.get_formato = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('FOR_TODOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Formato.prototype.get_insertFormato = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'formato', value: req.query.formato, type: self.model.types.STRING },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'estatus', value: 1, type: self.model.types.INT }
    ];

    this.model.query('FOR_INSERT_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Formato.prototype.get_deleteFormato = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'idFormato', value: req.query.idFormato, type: self.model.types.INT }
    ];

    this.model.query('FOR_DELETE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Formato.prototype.get_editFormato = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'formato', value: req.query.formato, type: self.model.types.STRING },
        { name: 'idFormato', value: req.query.idFormato, type: self.model.types.INT }
    ];

    this.model.query('FOR_UPDATE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Formato;