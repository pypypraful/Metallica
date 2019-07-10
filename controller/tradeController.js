var express = require('express');
var trade = require('../models/tradeservice.js');

exports.createTrade = (body) => {
  try{
    var newTrade = new trade({
      Commodity: body.Commodity,
      Counterparty: body.Counterparty,
      Location: body.Location,
      status: body.status,
      side: body.side,
      tradeDate: body.tradeDate,
      quantity: body.quantity,
      price: body.price
    });
    trade.createTrade(newTrade, function(err,trade){
      if(err) throw err;
      console.log("Trade Created. id:"+ trade._id);
    });
    }catch(err){
    return (err);
  }
}
