var express = require('express');
var router = express.Router();
const StupidGreatModel = require('../db/models/stupid_great')
const userModel = require('../db/models/user')

const multer = require('multer');

router.get('/', function(req, res){
    StupidGreatModel.find({}, function(err, posts){
        if(err) return console.log(err);
        res.send(posts);
    });
});

router.get('/random', function(req, res){
    StupidGreatModel.find({}, function(err, posts){
        if(err) return console.log(err);
        var result = Math.floor(Math.random() * posts.length) + 1;
        console.log(result);
        StupidGreatModel.findOne({PostNumber : result}, function(err, post){
            if(err) console.log(err);
            res.send(post);
        });
    });
})

router.post('/create', function(req, res){



     var StupidGreat = new StupidGreatModel(
        { 
            writer: req.body.writerid,
            title : req.body.post.sgTitle, 
            content: req.body.post.sgContent,
            price: parseInt(req.body.post.sgPrice),
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


router.use('/uploadImg', express.static('upload'));

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, '../sg_upload_images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        const fileName = "StupidGreatImg" + req.params.id + ".jpg";
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage
}).single('imgFile');


router.post('/create/img', function(req, res){
    upload((req, res, err) =>{
        if(err) console.log(err);
    });
    res.send('ok');
});

module.exports = router;