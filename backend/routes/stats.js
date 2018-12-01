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
  res.send("good")
})

module.exports = router;
