const {body} = require('express-validator');

exports.validate = (method) =>{
  switch (method) {
    case 'trades':{
      return [
        body('side','side must be present and can be BUY or SELL').exists().isIn(['BUY','SELL']),
        body('tradeDate',"tradeDate doesn't exists").exists().isString(),
        body('status','status must be present and can be OPEN or NOMINATED').exists().isIn(['OPEN','NOMINATED']),
        body('Counterparty',"Counterparty doesn't exists").exists().isString(),
        body('Commodity',"Commodity doesn't exists").exists().isString(),
        body('Location',"Location doesn't exists").exists().isString(),
        body('quantity',"quantity doesn't exists").exists().isInt(),
        body('price',"price doesn't exists").exists().isInt()
      ]
    }
    case 'updateTrades':{
      return [
        body('status', 'status must be present and can be OPEN or NOMINATED').exists().isIn(['OPEN','NOMINATED']),
        body('id',"Id must be present").exists()
      ]
    }
  }
}
