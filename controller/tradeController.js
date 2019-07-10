var express = require('express');
var trade = require('../models/tradeservice.js');
const {validationResult} = require('express-validator');

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

exports.findTrade = function(req,res) {
  try{
    id = req.params.id;
    trade.findById(id,function(err,tradeInfo){
      if(err)
        res.status(422).send('No such id exists');
      res.send(tradeInfo);
    });
  }catch(err){
    console.error(err);
    return err;
  }
}

exports.updateTrade = function(req,res){
  errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }
  else{
    id = req.body.id;
    trade.findByIdAndUpdate(id, {status: req.body.status},function(err, trade){
      if(err){
      res.status(422).send("Can't Update");
    }
      res.status(200).send("Updated Successfully");
    });
  }
}

exports.deleteTrade = function (req,res) {
  id = req.params.id;
  trade.findByIdAndDelete(id,function(err){
    if(err)
      res.status(422).send("Can't Delete, No such Id exists");
    res.status(200).send('Deleted Successfully');
  });
}
