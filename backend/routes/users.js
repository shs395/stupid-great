var express = require('express');
var router = express.Router();
const userModel = require('../db/models/user')
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
        id : user.id,
        email : user.email
      };

      var secret = 'stupid_great';
      var options = {expiresIn : 60*60*24}

      jwt.sign(payload, secret, options, function(err, token){
        if(err) return console.log(err);
        res.json({
          state : "success",
          token : token
        });
      })
    }
  })
});

module.exports = router;
