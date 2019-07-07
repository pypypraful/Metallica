var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongod');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var tradeservice = require('./routes/tradeservice');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  saveUninitialised: true,
  resave: true
}));

app.use('/', routes);
app.use('/users', users);
app.use('/',tradeservice);

app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('Server started in port '+app.get('port'));
});




module.exports = app;
