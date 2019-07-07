var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017');

var db = mongoose.connection;

var trade = mongoose.Schema({
  Commodity:{
    type:String,
    
  }
})
