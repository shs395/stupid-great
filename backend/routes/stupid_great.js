var express = require('express');
var router = express.Router();
const StupidGreatModel = require('../db/models/stupid_great')
const userModel = require('../db/models/user')

router.get('/', function(req, res){
    StupidGreatModel.find({}, function(err, posts){
        if(err) return console.log(err);
        res.send(posts);
    });
});

router.get('/random', function(req, res){

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

module.exports = router;