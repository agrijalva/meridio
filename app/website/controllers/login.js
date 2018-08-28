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
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Login.prototype.get_loginLdap = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'usuario', value: req.query.usuario, type: self.model.types.STRING },
        { name: 'pass', value: req.query.pass, type: self.model.types.STRING }
    ];
    
    // var LdapStrategy = require('passport-ldapauth');
 
    // passport.use(new LdapStrategy({
    //     server: {
    //       url: 'ldap://10.97.26.5:636'
    //     }
    // }));


    var config = { url: 'ldap://10.97.26.5:636',
                   baseDN: 'dc=TEC,dc=com',
                   username: 'L00576843@TEC',
                   password: 'VEmema30!' }
    // var ad = new ActiveDirectory(config);
    // console.log( ad );



    var ad = new ActiveDirectory(config);
    var username = 'L00576843@TEC';
    var password = 'VEmema30!';
     
    ad.authenticate(username, password, function(err, auth) {
      if (err) {
        console.log('ERROR: '+JSON.stringify(err));
        return;
      }
      
      if (auth) {
        console.log('Authenticated!');
      }
      else {
        console.log('Authentication failed!');
      }
    });

    this.model.query('USU_LOGIN_SP', params, function(error, result) {
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
