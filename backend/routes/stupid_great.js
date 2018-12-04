var express = require('express');
var router = express.Router();
const StupidGreatModel = require('../db/models/stupid_great')
const userModel = require('../db/models/user')

const multer = require('multer');


router.get('/:id', function(req, res){
    StupidGreatModel.find({}, function(err, posts){
        if(err) return console.log(err);
        userModel.findOne({id: req.params.id}, function(err, user){
            if(err) return console.log(err);
            res.json({"data" : posts, "read" : user});
        });
    });
});

/*router.get('/content/random', function(req, res){

    StupidGreatModel.find({}, function(err, posts){
        if(err) return console.log(err);
        
        var lastPostNumber = posts[posts.length -1].PostNumber;

        var result = Math.floor(Math.random() * lastPostNumber) + 1;
        console.log(result);

        StupidGreatModel.findOne({PostNumber : result}, function(err, post){
            if(err) console.log(err);
            console.log(post);
            if(post){
                res.send(post);
            }
             next();
        });      
    });
});
*/
router.post('/add/stupid', function(req, res){

    StupidGreatModel.findOne({PostNumber: req.body.postnum}, function(err, sgpost){
        if(err) console.log(err);
        var s_count = sgpost.stupid;
        s_count++;
        StupidGreatModel.findOneAndUpdate({PostNumber: req.body.postnum}, {stupid: s_count},function(err, post){
            if(err) console.log(err);
        });
        userModel.findOneAndUpdate({id: req.body.userid},{$push : {sgSelect : sgpost.PostNumber}}, function(err, user){
            if(err) console.log(err);
            res.send(user);
        });
    });

});

router.post('/add/great', function(req, res){
    StupidGreatModel.findOne({PostNumber: req.body.postnum}, function(err, sgpost){
        if(err) console.log(err);
        var g_count = sgpost.great;
        g_count++;
        StupidGreatModel.findOneAndUpdate({PostNumber: req.body.postnum}, {great: g_count},function(err, post){
            if(err) console.log(err);
        });
        userModel.findOneAndUpdate({id: req.body.userid},{$push : {sgSelect : sgpost.PostNumber}}, function(err, user){
            if(err) console.log(err);
            res.send(user)
        });
    })
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

module.exports = router;