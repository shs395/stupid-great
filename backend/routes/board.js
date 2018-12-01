var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
// const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const boardModel = require('../db/models/board')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())


//게시글 작성
router.post('/post',(req,res,next)=>{
   var boardPost=new boardModel({writer:req.body.id,title:req.body.title,content:req.body.body,createdAt:req.body.createdAt})

    boardPost.save(function(err){
        if(err) {(console.log(err))}

        console.log('Saved!')
        res.send(boardPost)
    })
})

//게시글 목록보기
router.get('/list',(req,res,next)=>{
    boardModel.find({},function(err,boards){
        if(err) {console.log(err)}

        res.send(boards)
    })
})

//게시글 내용보기
router.get('/read/:id/:postNumber',async(req,res,next)=>{
    const id=req.param.id;
    const postNumber=req.params.postNumber;

    var boardFind=await boardModel.find({})
    
    console.log(boardFind)
    res.send(boardFind)
})

   
router.all('*',(req,res,next)=>{

    res.send('api없지롱')
})


module.exports=router;