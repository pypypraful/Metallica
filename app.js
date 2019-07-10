var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var mongo = require('mongod');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var tradeservice = require('./routes/tradeservice');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/',tradeservice);

app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('Server started in port '+app.get('port'));
});




module.exports = app;
