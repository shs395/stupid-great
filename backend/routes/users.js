var express = require('express');
var router = express.Router();
const userModel = require('../db/models/user')
const StupidGreatModel = require('../db/models/stupid_great')
const accountModel = require('../db/models/account')
const boardModel = require('../db/models/board')
const jwt = require('jsonwebtoken');

router.post('/signup', function(req, res, next) {

    userModel.find({$or:[{id: req.body.userid}, {email: req.body.useremail} ]}, function(err, array){
      console.log(array.length)

      if(array.length == 0){

        var user = new userModel(
          {   id : req.body.userid, 
              pw : req.body.userpw, 
              sex: req.body.usersex,
              age: req.body.userage,
              job: req.body.userjob,
              email: req.body.useremail,
          });

          user.save(function (err) {
            if(err) return console.log(err);
            console.log('user information saved!');
          });

          res.send('saved')

      }else{
        res.send('exist')
      }
    });
});

router.post('/signin', function(req, res, next){
  var u_id = req.body.id;
  var u_pw = req.body.pw;

  userModel.findOne({id : u_id, pw: u_pw}, function(err, user){
    if(err) return console.log(err);
    else if(user == null){
      res.send('fail')
    }else{
      var payload = {
        _id : user._id,
        id : user.id,
        email : user.email,
        sex : user.sex,
        age : user.age,
        job : user.job
      };

      var secret = 'stupid_great';
      var options = {expiresIn : 60*60*24}

      jwt.sign(payload, secret, options, function(err, token){
        if(err) return console.log(err);
        res.json({
          state : "success",
          token : token,
          id : user.id,
          _id : user._id
        });
      })
    }
  })
});

router.post('/verify',(req,res)=>{
  var token = req.body.token
  // console.log(req.body.token) //요청된 token값 찍어줌
  jwt.verify(token, 'stupid_great', function(err, decoded) {
    console.log(decoded)    //id와 email 반환
    res.send(decoded)
  });
})

router.post('/modify',async (req,res)=>{
  await userModel.update({id : req.body.id}, {$set:
    { 
      pw:req.body.pw,
      sex : req.body.sex,
      age : req.body.age,
      job : req.body.job,
      email : req.body.email
    }
  })
  res.send("modify complete")
})

router.post('/withdrawal',async (req,res)=>{
  var u_id =  req.body.id
  await userModel.remove({id:u_id}) //usedata 삭제
  await StupidGreatModel.remove({id:u_id})  //쓴 stupidgreat 삭제
  await accountModel.remove({id:u_id})  //쓴 가계부 삭제
  await boardModel.remove({id:u_id})  //쓴 글 삭제
  res.send("withdrawal complete")
})


//본인이 쓴 게시글 리스트 가져오기
router.post('/postlist',(req,res,next)=>{
  var _id=req.body.id

  boardModel.find({writer:_id},function(err,result){
      if(err) console.log(err)

      res.send(result)
  })
})

//본인이 쓴 글 중 선택한 해당게시물 삭제
router.post('/depost',async(req,res,next)=>{
  var _id=req.body.id
  var _num=req.body.number
  
  await boardModel.remove({writer:_id,postNumber:_num})

  res.send('remove')
})

module.exports = router;
