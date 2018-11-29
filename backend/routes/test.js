var express = require('express');
var router = express.Router();
const userModel = require('../db/models/user')
const jwt = require('jsonwebtoken');

router.post('/',(req,res)=>{
  var token = req.body.token
  console.log("request")
  console.log(req.body.token)
  jwt.verify(token, 'stupid_great', function(err, decoded) {
    console.log(decoded)    //id와 email 반환
    console.log(decoded.id) // user id 반환 
    res.send(decoded)
  });
  
})

module.exports = router;