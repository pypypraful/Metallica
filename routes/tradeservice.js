var express = require('express');
var router = express.Router();

var trades={};

router.get('/trade/:id', function(req,res){
  console.log('Get request completed');
  var id = req.params.id;
  if(id in trades)
    return res.send(trades[id]);
  else
    return res.status(400).send("There's no such id");
});

var id=1234;
var errors=[];
router.post('/trade', function(req, res){
  var arr=["quantity",'price',"side",'tradeDate','status','Counterparty','Commodity','Location'];
  for(var i=0; i<arr.length;i++){
    if(!(arr[i] in req.body)){
      console.log(arr[i]+" is missing!");
      return res.status(206).send('Incomplete content '+arr[i]+' is missing');
    }
    errors.push(typeof(req.body[arr[i]]));
  }
  d= new Set(errors.slice(0,1));
  if(!(d.has("number") && d.size==1))
  {
    console.log("Formatting errors");
    return res.status(206).send('Incomplete or Wrong Format content, Number format required for entities 1 and 2');
  }
  d = new Set(errors.slice(2,7));
  if(!(d.has("string") && d.size==1))
  {
    console.log("Formatting errors");
    return res.status(206).send('Incomplete or Wrong Format content, String format required for entities 3 to 8');
  }
  else{
  trades[id]=req.body;
  id+=1;
  return res.status(200).send('Trade created. id: '+(id-1));
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
