var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
// const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const writerModel = require('../db/models/writer')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())


router.post('/post',(req,res,next)=>{
   var writer=new writerModel({writer:req.body.id,title:req.body.title,content:req.body.body,date:req.body.date})

    writer.save(function(err){
        if(err) {(console.log(err))}

        console.log('hi')
        res.send(writer)
    })
})

router.get('/list',(req,res,next)=>{
    writerModel.find({},function(err,writers){
        if(err) {console.log(err)}

        res.send(writers)
    })
})

   
router.all('*',(req,res,next)=>{

    res.send('api없지롱')
})


module.exports=router;