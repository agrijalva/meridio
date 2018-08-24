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
    // var params = [];
    var params = [
    ];
    this.model.query('MAT_GETMATERIAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Materia.prototype.get_insertMateria = function (req, res, next) {
    var self = this;
    
    var params = [
        { name: 'materia', value: req.query.nombre, type: self.model.types.STRING },
        { name: 'estatus', value: 1, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];
    this.model.query('MAT_INSERT_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Materia.prototype.get_deleteMateria = function (req, res, next) {
    var self = this;
    
    var params = [
        { name: 'idMateria', value: req.query.idMateria, type: self.model.types.INT }
    ];
    this.model.query('MAT_DELETE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Materia.prototype.get_editarMateria = function (req, res, next) {
    var self = this;
    
    var params = [
        { name: 'materia', value: req.query.materia, type: self.model.types.STRING },
        { name: 'idMateria', value: req.query.idMateria, type: self.model.types.INT }
    ];
    this.model.query('MAT_UPDATE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Materia;