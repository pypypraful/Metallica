var express = require('express');
var router = express.Router();
var validController = require('../controller/validController.js');
var tradeController = require('../controller/tradeController.js');
const {validationResult} = require('express-validator');


router.get('/trade/:id', tradeController.findTrade);

router.post('/trade',validController.validate('trades'), function(req,res){
  errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }
  else{
    tradeController.createTrade(req.body);
    res.status(200).send("OK Success");
}
});


router.put('/trade', validController.validate('updateTrades'),tradeController.updateTrade);

router.delete('/trade/:id',tradeController.deleteTrade);



module.exports = router;
