const { Router } = require('Express')
const router = Router()
const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const bodyparser = require('body-parser')



/* GET users listing. */
router.use((req, res, next)=>{
  // res.send('respond with a resource');
  next();
});

//가계부 작성
router.post('/create', function(req,res){
  try{
    const result = accountModel.create(
      {
        userid: req.body.userid, 
        year: req.body.year, 
        month: req.body.month,
        day: req.body.day,
        is:req.body.is, 
        price: req.body.price, 
        name: req.body.name, 
        rate: req.body.rate,
        category: req.body.category
      }
    )
    console.log(result)
  }catch(err){
    console.log(err)
  }
  res.send('create')
})

router.get('/list/:id/:date/:is',(req,res)=>{
  var n_y= parseInt(req.params.date.slice(0,4));
  var n_m = parseInt(req.params.date.slice(5,7));
  var n_d=parseInt(req.params.date.slice(8,10));
  console.log('year: '+n_y+'month: '+n_m+'day: '+ n_d);
  console.log(req.params.is)
  accountModel.find({
    userid: req.params.id, 
    year:n_y, month:n_m, day:n_d,
    is: req.params.is
    },function(err,accounts){
    if(err) console.log(err) 
    res.send(accounts)
    } 
  )
  // res.send(req.params.id+req.params.date);
})

router.get('/list',(req,res)=>{
  accountModel.find(function(err,accounts){
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(accounts)
  })

})

module.exports = router;
