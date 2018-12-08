var express = require('express');
var router = express.Router();
const StupidGreatModel = require('../db/models/stupid_great')
const userModel = require('../db/models/user')

const multer = require('multer');

/*-------------------------------------Stupid great community----------------------------------------------*/

router.get('/', function(req, res){
    StupidGreatModel.find({}, function(err, posts){
        if(err) return console.log(err);
        res.send(posts);
    });
    
});

router.get('/:id', function(req, res){

    userModel.findOne({id: req.params.id}, function(err, user){
        if(err) return console.log(err);
        res.send(user.selectSG);
    });
    
});

router.post('/add/stupid', function(req, res){

    StupidGreatModel.findOne({PostNumber: req.body.postnum}, function(err, post){
        if(err) console.log(err);
        var s_count = post.stupid + 1;
        StupidGreatModel.findOneAndUpdate({PostNumber: req.body.postnum}, {stupid: s_count},function(err,post){
            if(err) console.log(err);
            console.log("stupid 수" + post.stupid)
        });
        userModel.findOneAndUpdate({id: req.body.userid},{ "$push" : {"selectSG" : post.PostNumber}}, function(err, user){
            if(err) console.log(err);
            res.send(user.selectSG);
        });
    });

});

router.post('/add/great', function(req, res){
    StupidGreatModel.findOne({PostNumber: req.body.postnum}, function(err, post){
        if(err) console.log(err);
        var g_count = post.great + 1;
        StupidGreatModel.findOneAndUpdate({PostNumber: req.body.postnum}, {great: g_count},function(err){
            if(err) console.log(err);
        });
        userModel.findOneAndUpdate({id: req.body.userid},{ "$push" : {"selectSG" : post.PostNumber}}, function(err, user){
            if(err) console.log(err);
            res.send(user.selectSG);
        });
    });
});

router.post('/create', function(req, res){

     var StupidGreat = new StupidGreatModel({ 
        writer: req.body.writerid,
        title : req.body.post.sgTitle, 
        content: req.body.post.sgContent,
        price: parseInt(req.body.post.sgPrice),
        image : req.body.post.sgImg,
        stupid: 0,
        great: 0
    });

    StupidGreat.save(function (err) {
        if(err) {
            console.log(err);
            res.send('fail');
        }
        console.log('stupid great information saved!');
    });

    res.send('saved');
});

/*이미지 업로드 하기*/
var imgname;

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/static/img/sg_images');
      },
      filename: function (req, file, cb) {
        imgname = new Date().valueOf() + file.originalname;
        cb(null, imgname);
      }
    }),
});

router.post('/create/img',upload.single('img'),function(req, res){
    res.json({"state": "ok", "imgname":imgname});
});

/*-------------------------------------Stupid great result page----------------------------------------------*/

router.get('/result/:id', function(req, res){
    StupidGreatModel.find({writer: req.params.id}, function(err, posts){
        if(err) console.log(err)
        res.send(posts);
    });
});

router.post('/delete/:id', function(req, res){

});

module.exports = router;