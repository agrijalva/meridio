var MateriaView = require('../views/reference'),
    MateriaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var Materia = function (conf) {
    this.conf = conf || {};

    this.view = new MateriaView();
    this.model = new MateriaModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Materia.prototype.get_materias = function (req, res, next) {
    var self = this;
    var params = [];

    var params = [
    ];
    this.model.query('MAT_GETMATERIAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Materia;