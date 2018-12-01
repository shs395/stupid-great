const { Router } = require('express')
const router = Router()
// const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const userModel = require('../db/models/user')

router.post('/find',async (req,res)=>{
  const user = await userModel.findOne({id:req.body.id})
  res.send(user)
})

router.post('/conditional-search',async(req,res)=>{
  console.log(req.body)
  console.log(req.body.sex)
  var startAge = req.body.startAge
  console.log("startAge : " + startAge)
  var endAge = req.body.endAge
  console.log("endAge : " + endAge)
  var find = await accountModel.find({
    $and : [
      {job : { $in : req.body.job}},
      {sex : { $in : req.body.sex}},
      {$and :  [
        {age : {$gte:startAge,$lte:endAge}}
      ]},
      {year : req.body.year},
      {month : req.body.month}
    ]
  })
  console.log(find)
  res.send("good")
})

module.exports = router;
