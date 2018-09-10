var LoginView = require('../views/reference'),
    LoginModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
// var passport = require('passport');
var ActiveDirectory = require('activedirectory');

var Login = function(conf) {
    this.conf = conf || {};

    this.view = new LoginView();
    this.model = new LoginModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

Login.prototype.get_login = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'usuario', value: req.query.usuario, type: self.model.types.STRING },
        { name: 'pass', value: req.query.pass, type: self.model.types.STRING }
    ];
    
    this.model.query('USU_LOGIN_SP', params, function(error, result) {
        var ldap    = result[0].ldap;
        var baseDN  = result[0].baseDN;

        // Validacion de LDAP
        // var config = { url: 'ldap://prod406ad01.svcs.itesm.mx',
        //                baseDN: 'ou=CEM,dc=svcs,dc=itesm,dc=mx', }

        var config = { url: ldap, baseDN: baseDN }

        var ad = new ActiveDirectory(config);
        var username = req.query.usuario;
        var password = req.query.pass;
         
        ad.authenticate(username, password, function(err, auth) {
            auth = true;
            if (auth) {
                var paramsControl = [
                    { name: 'almacenado', value: result[0].almacenado, type: self.model.types.INT },
                    { name: 'usuario', value: req.query.usuario, type: self.model.types.STRING },
                    { name: 'pass', value: req.query.pass, type: self.model.types.STRING },
                    { name: 'tipoUsuario', value: result[0].tipoUsuario, type: self.model.types.INT },
                    { name: 'administrador', value: result[0].administrador, type: self.model.types.INT }
                ];

                self.model.queryAllRecordSet('USU_CONTROL_SP', paramsControl, function(error, result2) {
                    self.view.expositor(res, {
                        error: error,
                        result: result2[0]
                    });
                });
            }
            else {
                self.view.expositor(res, {
                    error: error,
                    result: [{ success: 0, msg: 'No se logro autenticarse, intente más tarde.' }]
                });
            }
        });
        // / Validacion de LDAP
    });
};

Login.prototype.get_loginLdap = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'usuario', value: req.query.usuario, type: self.model.types.STRING },
        { name: 'pass', value: req.query.pass, type: self.model.types.STRING }
    ];
    
    this.model.query('USU_LOGIN_SP', params, function(error, result) {
        console.log( result );
        
        // var config = { url: 'ldap://prod406ad01.svcs.itesm.mx',
        //                baseDN: 'ou=CEM,dc=svcs,dc=itesm,dc=mx', }

        // var ad = new ActiveDirectory(config);
        // var username = req.query.usuario; //'novusmeridio';
        // var password = req.query.pass; //'NOvu5.M3r1di0';
         
        // ad.authenticate(username, password, function(err, auth) {
        //     if (err) {
        //         console.log('ERROR: '+JSON.stringify(err));
        //         return;
        //     }

        //     console.log("auth", auth);

        //     if (auth) {
        //         console.log('Authenticated!');
        //         // Aqui va el success correcto.
        //     }
        //     else {
        //         console.log('Authentication failed!');
        //     }
        // });

        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Login.prototype.get_permisos = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idUsuario', value: req.query.usuario, type: self.model.types.STRING }];

    this.model.queryAllRecordSet('SEL_VALIDAUSUARIO_PRUEBA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Login.prototype.get_empleado = function(req, res, next) {

    var self = this;

    var params = [{ name: 'idEmpleado', value: req.query.usuario, type: self.model.types.INT }];

    this.model.query('SEL_EMPLEADO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Login;


// http://prenovus.cem.itesm.mx:1100/api/login/loginLdap/?pass=MA1307en#&usuario=A01747832
// http://prenovus.cem.itesm.mx:1100/api/login/loginLdap/?pass=5h7o-Ru4&usuario=A0010
// http://prenovus.cem.itesm.mx:1100/api/login/loginLdap/?pass=7o5h-4uR&usuario=L0010