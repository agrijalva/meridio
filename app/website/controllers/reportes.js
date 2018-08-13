var TemaView = require('../views/reference'),
    TemaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var Reportes = function (conf) {
    this.conf = conf || {};

    this.view = new TemaView();
    this.model = new TemaModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Reportes.prototype.get_vistasPorMateria = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING }
    ];

    this.model.query('GRA_VISTASPORMATERIA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reportes.prototype.get_vistasPorCategoria = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING }
    ];

    this.model.query('GRA_VISTASPORCATEGORIA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reportes.prototype.get_vistasPorTema = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING }
    ];

    this.model.query('GRA_VISTASPORTEMA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reportes.prototype.get_vistasPorFormato = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING }
    ];

    this.model.query('GRA_VISTASPORFORMATO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reportes.prototype.get_vistasPorDia = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query('GRA_VISTASPORDIA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Reportes;