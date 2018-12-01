const { Router } = require('express')
const router = Router()
// const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const userModel = require('../db/models/user')
const bodyparser = require('body-parser')
const g_category=['월급', '부수입', '용돈', '상여', '금융소득', '기타']
const l_category=['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타']


/* GET users listing. */
router.use((req, res, next)=>{
  // res.send('respond with a resource');
  next();
});

//가계부 작성
router.post('/create', async function(req,res){
  try{
    const user = await userModel.findOne({id:req.body.id})
    const result = accountModel.create(
      {
        id: req.body.id, 
        year: req.body.year, 
        month: req.body.month,
        day: req.body.day,
        is:req.body.is, 
        price: req.body.price, 
        name: req.body.name, 
        rate: req.body.rate,
        category: req.body.category,
        sex : user.sex,
        age: user.age,
        job : user.job
      }
    )
    console.log(result)
  }catch(err){
    console.log(err)
  }
  // res.send('create')
})

router.get('/list/:id/:date/:is',(req,res)=>{
  var n_y= parseInt(req.params.date.slice(0,4));
  var n_m = parseInt(req.params.date.slice(5,7));
  var n_d=parseInt(req.params.date.slice(8,10));
  // console.log('year: '+n_y+'month: '+n_m+'day: '+ n_d);
  accountModel.find({
    id: req.params.id, 
    year:n_y, month:n_m, day:n_d,
    is: req.params.is
    },function(err,accounts){
    if(err) console.log(err) 
    res.send(accounts)
    } 
  )
  // res.send(req.params.id+req.params.date);
})

// router.get('/list',(req,res)=>{
//   accountModel.find(function(err,accounts){
//     if(err) return res.status(500).send({error: 'database failure'});
//     res.json(accounts)
//   })
// })

router.get('/list/:id/:startDate/:endDate/:is', (req,res)=>{
  var s_y= parseInt(req.params.startDate.slice(0,4));
  var s_m = parseInt(req.params.startDate.slice(5,7));
  var s_d=parseInt(req.params.startDate.slice(8,10));
  var e_y= parseInt(req.params.endDate.slice(0,4));
  var e_m = parseInt(req.params.endDate.slice(5,7));
  var e_d=parseInt(req.params.endDate.slice(8,10));

  var price=[];
  if(req.params.is=='수입') {
    categories=g_category;
    price=[0,0,0,0,0,0,0];
  }
  else if(req.params.is=='지출') {
    categories = l_category;
    price=[0,0,0,0,0,0,0,0,0,0,0,0];
  }
  
  accountModel.find({
  id:req.params.id,
  
  $or:[
    {year:{$gt:s_y, $lt:e_y}}, 
    {year:{$gte:s_y, $lt:e_y}, month:{$gt:s_m}},
    {year:{$gte:s_y, $lt:e_y}, month:s_m, day:{$gte:s_d}},
    {year:{$gt:s_y, $lte:e_y}, month:{$lt:e_m}},
    {year:{$gt:s_y, $lte:e_y}, month:e_m, day:{$lte:e_d}},
    {year:{$eq:e_y, $eq:s_y}, month:{$gt:s_m, $lt:e_m}},
    {year:{$eq:e_y, $eq:s_y}, month:{$gte:s_m, $lt:e_m}, day:{$gte:s_d}},
    {year:{$eq:e_y, $eq:s_y}, month:{$gt:s_m, $lte:e_m}, day:{$lte:e_d}},
    {year:{$eq:e_y, $eq:s_y}, month:{$eq:s_m, $eq:e_m}, day:{$gte:s_d, $lte:e_d}},
  ],
  is:req.params.is,
  // category:categories[i]
  },'price category')
  .then((accounts)=>{
    console.log(accounts)
    var a_sz = accounts.length;
    var c_sz=categories.length;

    for(var i = 0;i<c_sz;i++){
      for(var j = 0;j<a_sz;j++){
        if(categories[i]==accounts[j].category) price[i]+=accounts[j].price
      }
    } 
    
    console.log(price);
    res.send(price);
  })
  .catch((err)=>{
    console.log(err)
  })
})

module.exports = router;
