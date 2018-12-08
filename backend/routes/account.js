const { Router } = require('express')
const router = Router()
const accountModel = require('../db/models/account')
const userModel = require('../db/models/user')
const g_category=['월급', '부수입', '용돈', '상여', '금융소득', '기타']
const l_category=['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타']

/* GET users listing. */
router.use((req, res, next)=>{
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
    var p_day = 1;//날짜 간격
    var startDate = req.body.r_start;//기간 시작 날짜
    var endDate = req.body.r_end;//기간 끝 날짜
    
    if(r_type=='직접지정'){
      p_day=parseInt(req.body.r_data);//받아온 간격
    }
    else if(r_type == '매주'){
      p_day=7;//일주일 간격
      week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      var n_day=null;
      for(var i = 0;i<7;i++) if(week[i]==req.body.r_data) {n_day=i;break;}//현재 요일

      var s_day = new Date(req.body.r_start).getDay()//기간 시작일의 요일
      if(n_day>=s_day){//시작 요일 <= 반복 요일
        //기간 시작일 조정
        var sDate = new Date(startDate);
        sDate.setDate(sDate.getDate()+ (n_day-s_day));
        startDate=sDate.toISOString().slice(0,10);//기간 시작일 조정
      }
      else{//시작 요일 > 반복 요일
        //기간 시작일 조정
        var sDate = new Date(startDate);
        sDate.setDate(sDate.getDate() + 7+(n_day-s_day));//다음주로 바꿔줌
        startDate=sDate.toISOString().slice(0,10);
      }
    }

    promises=[];
    var i = startDate;
    while(true) {
      if(i>endDate) {//기간 끝 날짜 초과시 멈추기
        break;
      }
      promises.push(//create
        accountModel.create(
        {
          id: req.body.id, 
          year: i.slice(0,4), 
          month: i.slice(5,7),
          day: i.slice(8,10),
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
      var sDate = new Date(i);//현재 날짜에서 날짜 간격만큼 +하기
      sDate.setDate(sDate.getDate()+p_day)
      i=sDate.toISOString().slice(0,10);
    }
    Promise.all(promises).then((result)=> {
      console.log(result)
      res.send('create')//성공시
    }).catch((err)=>{
      console.log(err)
      res.send('create fail')//실패시
    }) 
  }
  else if(r_type == '매월'){
    var n_day = parseInt(req.body.r_data);
    var startDate = req.body.r_start;
    var endDate = req.body.r_end;
    
    //시작 날짜 조정
    var sDate = new Date(startDate);
    if(parseInt(startDate.slice(8,10))>n_day){
      sDate.setMonth(sDate.getMonth()+1);
    }
    sDate.setDate(n_day);
    startDate=sDate.toISOString().slice(0,10);

    promises = [];
    var i = startDate;
    while(true){
      if(i>endDate) {//기간 끝 날짜보다 초과시 멈춤
        break;
      }
      promises.push(
        accountModel.create(
        {
          id: req.body.id, 
          year: i.slice(0,4), 
          month: i.slice(5,7),
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

      //달+1 해주기
      var sDate = new Date(i);
      sDate.setMonth(sDate.getMonth()+1);
      i = sDate.toISOString().slice(0,10)
    }
    Promise.all(promises).then((result)=> {
      console.log(result)
      res.send('create')//성공시
    }).catch((err)=>{
      console.log(err)
      res.send('create fail')//실패시
    })      
  }
  else if(r_type == '매년'){
    var n_month = req.body.r_data.slice(5,7);//지정 달
    var n_day = req.body.r_data.slice(8,10);//지정 일
    var start_year = req.body.r_start.slice(0,4);
    var end_year = req.body.r_end.slice(0,4)
    if(req.body.r_start.slice(5,10)>req.body.r_data.slice(5,10)){
      start_year++;//기간 시작 년도 조정
    }
    if(req.body.r_end.slice(5,10)<req.body.r_data.slice(5,10)){
      end_year--;//기간 끝 년도 조정
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
module.exports = router;
