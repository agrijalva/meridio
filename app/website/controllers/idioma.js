var IdiomaView = require('../views/reference'),
    IdiomaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var Idioma = function (conf) {
    this.conf = conf || {};

    this.view = new IdiomaView();
    this.model = new IdiomaModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Idioma.prototype.get_idiomas = function(req, res, next) {
    var self = this;
    // var params = [{ name: 'idBanco', value: req.query.idBanco, type: self.model.types.INT },
    //               { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING }
    //               ];
    var params = [];

    this.model.query('IDI_TODOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Idioma;