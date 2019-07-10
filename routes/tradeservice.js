var express = require('express');
var router = express.Router();
var validController = require('../controller/validController.js');
var tradeController = require('../controller/tradeController.js');
const {validationResult} = require('express-validator');


router.get('/trade/:id', function(req,res){
  console.log('Get request completed');
  var id = req.params.id;
  if(id in trades)
    return res.send(trades[id]);
  else
    return res.status(400).send("There's no such id");
});

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



router.put('/trade/:id', function(req,res){
  id = req.params.id;
  if(id in trades && 'status' in req.body && 'id' in req.body && Object.keys(req.body).length==2){
    Object.keys(req.body).forEach((entity)=>{
      trades[id][entity] = req.body[entity];
    });
    return res.status(200).send("HTTP OK");
  }
  else{
    return res.status(400).send("Invalid data provided");
  }
});

router.delete('/trade/:id', function(req,res){
  id = req.params.id;
  if(id in trades){
    delete trades[id];
    return res.status(200).send("HTTP OK. Successfully deleted");
  }
  else{
    return res.status(400).send("There's already no such id");
  }
})


module.exports = router;
