var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
// const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const boardModel = require('../db/models/board')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

//조회수기능 추가하기

//게시글 작성
router.post('/post',async(req,res,next)=>{
    var _year=parseInt(req.body.date.slice(0,4))
    var _month=parseInt(req.body.date.slice(5,7))

    boardModel.create({
        writer:req.body.id,
        title:req.body.title,
        content:req.body.body,
        createdAt:req.body.createdAt},function(err,result1){
            accountModel.find({
                id:req.body.id,
                year:_year,
                month:_month,
                is:"수입",
            },function(err,result2){
                result1.account_info.push(result2)

                accountModel.find({
                id:req.body.id,
                year:_year,
                month:_month,
                is:"지출"
            },function(err,result3){
                if(err) console.log(err)

                result1.account_info.push(result3)
                result1.save(function(err,data){
                    if(!err) 
                    console.log(data.account_info[0])
                    res.send(data)})
                })
            })
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
// router.get('/read/board/:id',(req,res,next)=>{
//     const id=req.params.id;
//     console.log(id)
//     boardModel.find({
//         writer:id
//     },function(err,result){
//         if(err) {console.log(err)}
        
//         console.log('find_board_info')
//         res.send(result)
       
//     })
// })

// //게시글 내용보기-가계부
// router.get('/read/account/:id',async(req,res,next)=>{
//     const id=req.params.id;
//     const postNumber=req.params.postNumber;
    
//     accountModel.find({id:id},function(err,result){
//         if(err) console.log(err)

//         console.log('find Account info')
//         res.send(result)
//     })
// })


//게시글 내용보기
router.get('/:postNumber/:writer',(req,res,next)=>{
    const _postNumber=req.params.postNumber;
    const _writer=req.params.writer;

    boardModel.find({
        postNumber:_postNumber,
        writer:_writer},
        {account_info:0     
    },function(err,result){
        if(err) console.log(err)

       // console.log(result)
        res.json(result)
    })  
})

router.get('/in/:postNumber/:writer',(req,res,next)=>{
    const _postNumber=req.params.postNumber;
    const _writer=req.params.writer;
    
    boardModel.find(
        {  postNumber:_postNumber,
            writer:_writer 
        },
        {
            postNumber:0,
            writer:0,
            account_info:{$elemMatch:{$elemMatch:{is:'수입'}}}
        }  
      ,function(err,result){
            if(err) console.log(err)

            //console.log('결과'+result+'1')
            res.send(result)})
})
    
router.get('/out/:postNumber/:writer',(req,res,next)=>{
    const _postNumber=req.params.postNumber;
    const _writer=req.params.writer;
    
    boardModel.find(
        {  postNumber:_postNumber,
            writer:_writer 
        },
        {
            postNumber:0,
            writer:0,
            account_info:{$elemMatch:{$elemMatch:{is:'지출'}}}
        }  
      ,function(err,result){
            if(err) console.log(err)

            console.log('결과'+result+'1')
            res.send(result)})
})
    

router.all('*',(req,res,next)=>{

    res.send('Cannot Found API')

})


module.exports=router;