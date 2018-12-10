var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
// const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const boardModel = require('../db/models/board')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

const category_in = ['월급', '부수입', '용돈', '상여', '금융소득', '기타']
const category_out = ['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타']

//조회수기능 추가하기

//게시글 작성
router.post('/post', async (req, res, next) => {
    var _year = parseInt(req.body.date.slice(0, 4))
    var _month = parseInt(req.body.date.slice(5, 7))

    //지출,수입 데이터를 나눠서 저장
    boardModel.create({
        writer: req.body.id,
        title: req.body.title,
        content: req.body.body,
        createdAt: req.body.createdAt
    }, function (err, result1) {
        accountModel.find({
            id: req.body.id,
            year: _year,
            month: _month,
            is: "수입",
        }, function (err, result2) {
            result1.in_account_info.push(result2)

            accountModel.find({
                id: req.body.id,
                year: _year,
                month: _month,
                is: "지출"
            }, function (err, result3) {
                if (err) console.log(err)

                result1.out_account_info.push(result3)
                console.log(result1)
                result1.save(function (err, data) {
                    if (!err)

                        res.send(data[0])
                })
            })
        })
    })
})

//게시글 목록보기
router.get('/list', async (req, res, next) => {

    const f = await boardModel.find({}, function (err, boards) {
        if (err) { console.log(err) }

        res.send(boards)
    })
})



//게시글 내용보기
router.get('/:postNumber/:writer', async (req, res, next) => {
    const _postNumber = req.params.postNumber;
    const _writer = req.params.writer;

    const f = await boardModel.find({
        postNumber: _postNumber,
        writer: _writer
    })

    //조회수 증가
    f[0].views++
    f[0].save()

    console.log('게시글 내용' + f[0])

    res.send(f[0])



})

//가계부 수입 데이터 가져오기
router.get('/in/:postNumber/:writer', (req, res, next) => {
    const _postNumber = req.params.postNumber;
    const _writer = req.params.writer;
    var price_in = []

    //수입 price를 받을 배열 초기화
    for (var i = 0; i < category_in.length; i++) {
        price_in.push(0)
    }

    boardModel.find({
        postNumber: _postNumber,
        writer: _writer
    }, function (err, result) {
        if (err) console.log(err)


        var r_in = result[0].in_account_info[0]

         //카테고리로 비교하여 price_in에 각각 값 저장
        for (var i = 0; i < category_in.length; i++) {
            for (var j = 0; j < r_in.length; j++) {
                if (category_in[i] == r_in[j].category)
                    price_in[i] += r_in[j].price

            }
        }

        console.log("수입 가격" + price_in)
        res.send(price_in)
    })

})

//가계부 지출 데이터 가져오기
router.get('/out/:postNumber/:writer', (req, res, next) => {
    const _postNumber = req.params.postNumber;
    const _writer = req.params.writer;
    var price_out = []

    //지출 price를 받을 배열 초기화
    for (var i = 0; i < category_out.length; i++) {
        price_out.push(0)
    }

    boardModel.find({
        postNumber: _postNumber,
        writer: _writer
    }, function (err, result) {
        if (err) console.log(err)

        var r_out = result[0].out_account_info[0];

        //카테고리로 비교하여 price_out에 각각 값 저장
        for (var i = 0; i < category_out.length; i++) {
            for (var j = 0; j < r_out.length; j++) {
                if (category_out[i] == r_out[j].category)
                    price_out[i] += r_out[j].price

            }
        }

        console.log("지출 가격" + price_out)
        res.send(price_out)

    })
})

//댓글 저장
router.post('/post/:postNumber/comment', async (req, res, next) => {
    const _postNumber = req.params.postNumber
    const _author = req.body.author
    const _body = req.body.body
    const _createdAt = req.body.createdAt

    var _comment = [{ author: _author, body: _body }]

    console.log(_comment)

    boardModel.updateOne({ postNumber: _postNumber }, { $push: { comment: _comment } }, function (err, result) {
        if (err) console.log(err)

        console.log('댓글저장!')
        console.log(result)
        res.json(result)

    })

})

//댓글 읽기
router.get('/post/:postNumber/comment', (req, res, next) => {
    const _postNumber = req.params.postNumber

    boardModel.find({
        postNumber: _postNumber
    }, function (err, result) {
        if (err) console.log(err)

        console.log('댓글정보')
        console.log(result[0].comment)
        res.json(result[0].comment)
    })
})

router.all('*', (req, res, next) => {

    res.send('API X')

})


module.exports = router;