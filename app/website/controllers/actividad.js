var LoginView = require('../views/reference'),
    LoginModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Actividad = function(conf) {
    this.conf = conf || {};

    this.view = new LoginView();
    this.model = new LoginModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Actividad.prototype.get_favoritoAdd = function(req, res, next) {
    var self = this;

    var params =    [
                        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
                        { name: 'idEnlace', value: req.query.idEnlace, type: self.model.types.INT }
                    ];

    this.model.queryAllRecordSet('ENL_FAVORITOADD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result[0]
        });
    });
};

Actividad.prototype.get_favoritoRemove = function(req, res, next) {
    var self = this;

    var params =    [
                        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
                        { name: 'idEnlace', value: req.query.idEnlace, type: self.model.types.INT }
                    ];

    this.model.queryAllRecordSet('ENL_FAVORITOREMOVE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result[0]
        });
    });
};

Actividad.prototype.get_favoritoUsuario = function(req, res, next) {
    var self = this;

    var params =    [{ name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT } ];

    this.model.queryAllRecordSet('ENL_GETFAVORITOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result[0]
        });
    });
};

Actividad.prototype.get_viewAdd = function(req, res, next) {
    var self = this;

    var params =    [
                        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
                        { name: 'idEnlace', value: req.query.idEnlace, type: self.model.types.INT }
                    ];

    this.model.queryAllRecordSet('ENL_VIEWADD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result[0]
        });
    });
};

module.exports = Actividad;
