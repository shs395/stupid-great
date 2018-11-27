var express = require('express');
var router = express.Router();
const userModel = require('../db/models/user')

/* GET users listing. */

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

module.exports = router;
