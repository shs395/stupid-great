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
router.get('/list',async(req,res,next)=>{
    boardModel.find({},function(err,boards){
        if(err) {console.log(err)}

        res.send(boards)
    })
})

//게시글 내용보기-컨텐츠,제목
router.get('/read/board/:id',(req,res,next)=>{
    const id=req.params.id;
    console.log(id)
    boardModel.find({
        writer:id
    },function(err,result){
        if(err) {console.log(err)}
        
        console.log('find_board_info')
        res.send(result)
       
    })
})

//게시글 내용보기-가계부
router.get('/read/account/:id',async(req,res,next)=>{
    const id=req.params.id;
    const postNumber=req.params.postNumber;
    
    accountModel.find({id:id},function(err,result){
        if(err) console.log(err)

        console.log('find Account info')
        res.send(result)
    })
})


router.get('/:postNumber/:writer',(req,res,next)=>{
    const _postNumber=req.params.postNumber;
    const _writer=req.params.writer;

    boardModel.find({
        postNumber:_postNumber,
        writer:_writer     
    },function(err,result){
        if(err) console.log(err)

        console.log('find성공'+result)
        
        res.send(result)
    })  
})
   
router.all('*',(req,res,next)=>{

    res.send('Cannot Found API')

})


module.exports=router;