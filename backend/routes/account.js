const { Router } = require('Express')
const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const bodyparser = require('body-parser')
const router = Router()


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', function(req,res){

  try{
    const result = accountModel.create({userid: req.body.userid, data:{year: req.body.year, month: req.body.month, day: req.body.day}, contents:{is:req.body.is, price: req.body.price, name: req.body.name, rate: req.body.rate}})
    console.log(result)
  }catch(err){
    console.log(err)
  }
  res.send(result)
})

module.exports = router;
