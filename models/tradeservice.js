var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var tradeSchema = mongoose.Schema({
  Commodity:{
    type:String
  },
  Counterparty:{
    type:String
  },
  Location:{
    type:String
  },
  status:{
    type:String
  },
  side:{
    type:String
  },
  tradeDate:{
    type:String
  },
  quantity:{
    type:Number
  },
  price:{
    type:Number
  }
});

module.exports = mongoose.model('trade',tradeSchema);
module.exports.createTrade = function(newTrade, callback){
  newTrade.save(callback);
};
