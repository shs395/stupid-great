const { Router } = require('express')
const router = Router()
// const userModel = require('../db/models/user')
const accountModel = require('../db/models/account')
const userModel = require('../db/models/user')
const bodyparser = require('body-parser')
const g_category=['월급', '부수입', '용돈', '상여', '금융소득', '기타']
const l_category=['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타']

/* GET users listing. */
router.use((req, res, next)=>{
  // res.send('respond with a resource');
  next();
});

//가계부 작성
router.post('/create', async function(req,res){
  const user = await userModel.findOne({id:req.body.id})
  accountModel.create(
  {
    id: req.body.id, 
    year: req.body.year, 
    month: req.body.month,
    day: req.body.day,
    is:req.body.is, 
    price: req.body.price, 
    name: req.body.name, 
    rate: req.body.rate,
    category: req.body.category,
    sex : user.sex,
    age: user.age,
    job : user.job
  }, function(err, account){
    if(err) {
      console.log(err)
      res.send('create fail')
    }
    else{
      res.send('create')
    }
  })
})

// 반복 가계부 작성
router.post('/create/repeat', async function(req,res){
  const user = await userModel.findOne({id:req.body.id})
  var r_type = req.body.r_type;
  if(r_type=='매일' || r_type=='직접지정' || r_type =='매주'){
    var p_day = 1;
    var startDate = req.body.r_start;
    var sDate = new Date(startDate);

    if(r_type=='직접지정'){
      p_day=req.body.r_data;
    }
    else if(r_type == '매주'){
      p_day=7;
      week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      var n_day=null;
      console.log('?' + req.body.r_data)
      for(var i = 0;i<7;i++) if(week[i]==req.body.r_data) {n_day=i;break;}

      // var s_day = new Date(req.body.r_start).getDay()
      // console.log(s_day+''+n_day)
      // console.log(sDate)
      // if(n_day>=s_day){
      //   // console.log(startDate.slice())s
      //   sDate.setDate(parseInt(startDate.slice(8,10)) + (n_day-s_day));
      //   console.log(parseInt(startDate.slice(8,10)) + (n_day-s_day))
      //   console.log(sDate);
      //   console.log(new Date(sDate).format('yyyy-dd-mm'))
      // }
      // else{
      //   sDate.setDate(parseInt(startDate.slice(8,10)) + 7+(n_day-s_day));
      //   console.log(parseInt(startDate.slice(8,10)) + 7+(n_day-s_day))
      //   console.log(sDate);
      //   console.log(new Date(sDate).format('yyyy-dd-mm'))
      // }

    }
  
    //while문 돌면서 startDate부터 p_day씩 추가하면서 create, endDate 이상 될 시 멈춤, 요일은 for문 2번 나머지는 젤 큰 for문 한번 
    //시작 date 를 배열로 만들어서 for문
    //pday 만큼 for문
    
    //요일 만큼 for문 + 
    
  }
  else if(r_type == '매월'){
    console.log('매월')
    var n_day = parseInt(req.body.r_data);
    var start_year = parseInt(req.body.r_start.slice(0,4));
    var start_month = parseInt(req.body.r_start.slice(5,7));
    var end_year = parseInt(req.body.r_end.slice(0,4));
    var end_month = parseInt(req.body.r_end.slice(5,7));
    if(parseInt(req.body.r_start.slice(8,10))>n_day){
      start_month++;
      if(start_month==13){
        start_year++;
        start_month-=12;
      }
    }//시작 날짜 조정
    if(req.body.r_end.slice(8,10)<n_day){
      end_month--;
      if(end_month==0){
        end_month+=12;
        end_year--;
      }
    }//끝 날짜 조정

    promises = [];

    for(var i=start_year, j=start_month;;j++) {
      if(j==13){
        i++;
        j-=12;
      }

      if(i+'-'+j>end_year+'-'+end_month) {
        break;
      }

      if(i+'-'+j<=end_year+'-'+end_month){
        promises.push(
          accountModel.create(
          {
            id: req.body.id, 
            year: i, 
            month: j,
            day: n_day,
            is:req.body.is, 
            price: req.body.price, 
            name: req.body.name, 
            rate: req.body.rate,
            category: req.body.category,
            sex : user.sex,
            age: user.age,
            job : user.job
          })
        )
      }
    }
    Promise.all(promises).then((result)=> {
      console.log(result)
      res.send('create')
    }).catch((err)=>{
      console.log(err)
      res.send('create fail')
    })      
  }
  else if(r_type == '매년'){
    var n_month = req.body.r_data.slice(5,7);
    var n_day = req.body.r_data.slice(8,10);
    var start_year = req.body.r_start.slice(0,4);
    var end_year = req.body.r_end.slice(0,4)
    if(req.body.r_start.slice(5,10)>req.body.r_data.slice(5,10)){
      start_year++;
    }
    if(req.body.r_end.slice(5,10)<req.body.r_data.slice(5,10)){
      end_year--;
    }

    promises = [];
    for(var i = start_year; i<=end_year; i++){
      promises.push(accountModel.create(
        {
          id: req.body.id, 
          year: i, 
          month: n_month,
          day: n_day,
          is:req.body.is, 
          price: req.body.price, 
          name: req.body.name, 
          rate: req.body.rate,
          category: req.body.category,
          sex : user.sex,
          age: user.age,
          job : user.job
        }
      ))
      Promise.all(promises).then((result)=>{
        console.log(result)
        res.send('create')
      })
      .catch((err)=>{
        console.log(err)
        res.send('create fail')
      })
    }
  }
})

//가계부 수정
router.post('/change', async function(req,res){
  accountModel.findOneAndUpdate(
  {accountId: req.body.accountId},
  {
    price: req.body.price,
    name:req.body.name,
    category: req.body.category,
    rate: req.body.rate,
  }, function(err){
    if(err) {
      console.log(err)
      res.send('change fail')
    }
    else{
      res.send('change')
    }
  })
})

//가계부 삭제
router.post('/delete', async function(req,res){
  accountModel.deleteOne(
  {accountId: req.body.accountId},
  function(err){
    if(err) {
      console.log(err)
      res.send('delete fail')
    }
    else{
      res.send('delete')
    }
  })
})


//특정 날짜 리스트 가져오기
router.get('/list/:id/:date/:is',(req,res)=>{
  var n_y= parseInt(req.params.date.slice(0,4));
  var n_m = parseInt(req.params.date.slice(5,7));
  var n_d=parseInt(req.params.date.slice(8,10));
  accountModel.find({
    id: req.params.id, 
    year:n_y, month:n_m, day:n_d,
    is: req.params.is,
    },function(err,accounts){
    if(err) console.log(err) 
    res.send(accounts)
    } 
  )
})


//특정 기간 account 리스트 받아오기
router.get('/list/:id/:startDate/:endDate/:is', (req,res)=>{
  var s_y= parseInt(req.params.startDate.slice(0,4));
  var s_m = parseInt(req.params.startDate.slice(5,7));
  var s_d=parseInt(req.params.startDate.slice(8,10));
  var e_y= parseInt(req.params.endDate.slice(0,4));
  var e_m = parseInt(req.params.endDate.slice(5,7));
  var e_d=parseInt(req.params.endDate.slice(8,10));

  var price=[];
  if(req.params.is=='수입') {
    categories=g_category;
    price=[0,0,0,0,0,0,0];
  }
  else if(req.params.is=='지출') {
    categories = l_category;
    price=[0,0,0,0,0,0,0,0,0,0,0,0];
  }
  
  accountModel.find({
  id:req.params.id,
  
  $or:[
    {year:{$gt:s_y, $lt:e_y}}, 
    {year:{$gte:s_y, $lt:e_y}, month:{$gt:s_m}},
    {year:{$gte:s_y, $lt:e_y}, month:s_m, day:{$gte:s_d}},
    {year:{$gt:s_y, $lte:e_y}, month:{$lt:e_m}},
    {year:{$gt:s_y, $lte:e_y}, month:e_m, day:{$lte:e_d}},
    {year:{$eq:e_y, $eq:s_y}, month:{$gt:s_m, $lt:e_m}},
    {year:{$eq:e_y, $eq:s_y}, month:{$gte:s_m, $lt:e_m}, day:{$gte:s_d}},
    {year:{$eq:e_y, $eq:s_y}, month:{$gt:s_m, $lte:e_m}, day:{$lte:e_d}},
    {year:{$eq:e_y, $eq:s_y}, month:{$eq:s_m, $eq:e_m}, day:{$gte:s_d, $lte:e_d}},
  ],
  is:req.params.is,
  },'price category')
  .then((accounts)=>{
    console.log(accounts)
    var a_sz = accounts.length;
    var c_sz=categories.length;

    for(var i = 0;i<c_sz;i++){
      for(var j = 0;j<a_sz;j++){
        if(categories[i]==accounts[j].category) price[i]+=accounts[j].price
      }
    } 
    console.log(price);
    res.send(price);
  })
  .catch((err)=>{
    console.log(err)
    res.send(err)
  })
})


// //특정 아이디 가계부 가져오기
// router.get('/accountId/:accountId',(req,res)=>{
//   accountModel.findOne({
//     accountId: req.params.accountId
//     },function(err,accounts){
//     if(err) console.log(err) 
//     res.send(accounts)
//     } 
//   )
// })

module.exports = router;
