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


Tema.prototype.get_temaByIdCat = function (req, res, next) {
    var self = this;
    var params = [];

    var params = [
        { name: 'idCategoria', value: req.query.idCategoria, type: self.model.types.INT },
    ];
    this.model.query('TEM_TEMAPORIDCATEGORIA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Tema;