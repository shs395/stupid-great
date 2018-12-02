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
  console.log("---------- 조건검색에서 조건 ----------")
  console.log(req.body)
  var startAge = req.body.startAge
  var endAge = req.body.endAge
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
  res.send(find)
})

module.exports = router;
