const { Router } = require('express')
const router = Router()
// const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const userModel = require('../db/models/user')

router.post('/find',async (req,res)=>{
  const user = await userModel.findOne({id:req.body.id})
  res.send(user)
})

router.post('/me-search',async(req,res)=>{
  console.log("내 것만 검색하기")
  console.log(req.body.year)
  console.log(req.body.month)
  console.log(req.body.id)
  var find = await accountModel.find({
    $and : [
      {year : req.body.year},
      {month : req.body.month},
      {id : req.body.id}
    ]
  })
  console.log(find)
  console.log("good")
  res.send(find)
})

router.post('/others-search',async(req,res)=>{
  console.log("---------- 조건검색에서 조건 (나 빼고 찾기) ----------")
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
      {month : req.body.month},
      {id :{$ne:req.body.id}}
    ]
  })
  console.log(find)
  console.log("*********find*********")

//일치하는 사람 id 배열에 담음 (나 빼고)
  var personCount = await accountModel.distinct("id",{
    $and : [
      {job : { $in : req.body.job}},
      {sex : { $in : req.body.sex}},
      {$and :  [
        {age : {$gte:startAge,$lte:endAge}}
      ]},
      {year : req.body.year},
      {month : req.body.month},
      {id :{$ne:req.body.id}}
    ]
  });
  console.log(personCount.length)
  console.log(personCount)
  find.push(personCount)
  console.log("*********personCount*********")
  console.log(find)

  res.send(find)
})

module.exports = router;
