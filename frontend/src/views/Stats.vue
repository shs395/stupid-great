<template>
  <div>
    <toolbar></toolbar>
    <v-container fluid>
      <v-layout column>
        <!-- 차트부분 -->
        <v-flex>
          <v-card>
            <v-card-text>
              <!-- <p v-show="isSimilar === true">
                나와 비슷한 사람 ({{selectedAge}}세,{{selectedSex[0]}},{{selectedJob[0]}} )의 {{selectedYear}}년 {{selectedMonth}}월 가계부 평균
              </p> -->
              <h1  class="text-md-center">
                {{viewStartAge}}~{{viewEndAge}}세 / 
                <span v-for="item in viewSex" :key="item.id">
                  {{item}}
                </span>
                /
                <span v-for="item in viewJob" :key="item.id">
                  {{item}}
                </span>
                  의 {{viewYear}}년 {{viewMonth}}월 가계부 평균
              </h1>
              <!-- searchMyResult 나 searchOthersResult 가 true 면 데이터 없는 것-->
              <h2 class="text-md-center" v-if="(searchMyResult === true)&&(searchOthersResult === true)">
                -조건에 맞는 나와 다른 사람의 데이터가 없습니다.-
              </h2>
              <h2 class="text-md-center" v-if="(searchMyResult === true)&&(searchOthersResult === false)">
                -조건에 맞는 나의 데이터가 없습니다.-
              </h2>
              <h2 class="text-md-center" v-if="(searchMyResult === false)&&(searchOthersResult === true)">
                -조건에 맞는 다른 사람의 데이터가 없습니다.-
              </h2>
              <v-tabs right> 
                <v-tab>
                  수입/지출
                </v-tab>
                <v-tab>
                  수입
                </v-tab>
                <v-tab>
                  지출
                </v-tab>
                <v-tab-item lazy="true"> 
                  <StatsChart :dataMe="dataMe" :dataOthers="dataOthers" :width="1250" :height="400" v-if="loaded"></StatsChart>
                </v-tab-item>
                <v-tab-item lazy="true">
                  <StatsChart2 :dataMe="dataMe2" :dataOthers="dataOthers2" :width="1250" :height="400" v-if="loaded"></StatsChart2>
                </v-tab-item>
                <v-tab-item lazy="true">
                  <StatsChart3 :dataMe="dataMe3" :dataOthers="dataOthers3" :width="1250" :height="400" v-if="loaded"></StatsChart3>
                </v-tab-item>
              </v-tabs>
            
            </v-card-text>
          </v-card>
        </v-flex>
        <!-- 조건검색부분 -->
        <v-flex>
          <v-card>
            <v-card-text> 
              다른 조건으로 검색하기
              <v-layout row>
                <v-flex>
                  <v-autocomplete
                    v-model="selectedStartAge"
                    :items="ageList"
                    label="시작나이"
                  >
                 </v-autocomplete>
                </v-flex>
                <v-flex>
                  <v-autocomplete
                    v-model="selectedEndAge"
                    :items="ageList"
                    label="끝나이"
                  >
                  </v-autocomplete>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="sexList"
                    v-model="selectedSex"
                    label="성별"
                    multiple
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-select
                    :items="jobList"
                    v-model="selectedJob"
                    label="직업"
                    multiple
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-select
                    v-model="selectedYear"
                    :items="years"
                    label="년"
                  ></v-select>
                </v-flex>
                <v-flex>
                   <v-select
                    v-model="selectedMonth"
                    :items="months"
                    label="월"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-btn @click="searchProcess">검색</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import toolbar from '../components/toolbar.vue'
  import StatsChart from '../components/StatsChart.vue'
  import StatsChart2 from '../components/StatsChart2.vue'
  import StatsChart3 from '../components/StatsChart3.vue'

  export default{
    name: 'stats',
    components:{
      toolbar,
      StatsChart,
      StatsChart2,
      StatsChart3,
    },
    data:function(){
      return{
        //chart 를 위한 loaded
        loaded : false,
        //select 안에 들어갈 변수
        ageList:[], //1~99세
        sexList:['남자','여자'],
        jobList:['백수','중학생','고등학생','대학생','직장인','전업주부'],
        years:[2018,2017,2016,2015,2014,2013,2012,2011,2010],
        months:[1,2,3,4,5,6,7,8,9,10,11,12],
        //선택되는 값들 (여기 값들에 따라 검색을 함 / 초기값은 나와 비슷한 사람들)
        selectedAge:[],
        selectedStartAge : '',
        selectedEndAge : '',
        selectedSex:[],
        selectedJob:[],
        selectedYear : '',
        selectedMonth : '',

        viewStartAge: '',
        viewEndAge: '',
        viewSex: '',
        viewJob: '',
        viewYear: '',
        viewMonth: '',
        
        //tabList
        tabList:[
          {name:'수입 / 지출', num:1},
          {name:'지출', num:2},
          {name:'수입', num:3}
        ],
        //타인의 수입/지출 평균
        incomeOthers:0 ,
        spendOthers:0,
        //나의 수입/지출 평균
        incomeMe:0,
        spendMe:0,
        //chart rendering을 위한 데이터
        dataMe : [],
        dataOthers: [],
        dataMe2 : [],
        dataOthers2: [],
        dataMe3 : [],
        dataOthers3: [],
        //다른 사람 몇 명인지 , 평균 구할 때 쓰임
        countOthers : 0,

        //12월 4일 수정 코드
        //내 수입
        income : [0,0,0,0,0,0,0] , 
        //내 지출
        spend : [0,0,0,0,0,0,0,0,0,0,0,0,0] , 
        //타입 수입
        oincome : [0,0,0,0,0,0,0] , 
        //타인 지출
        ospend : [0,0,0,0,0,0,0,0,0,0,0,0,0],
        
        isSimilar : true,
        searchOthersResult : false,
        searchMyResult : false,
      }
    },
    methods:{
      resetValue: function(){
        this.loaded = false
        this.incomeMe = 0
        this.spendMe = 0
        this.incomeOthers = 0
        this.spendOthers = 0
        this.dataMe = []
        this.dataOthers = []
        this.dataMe2 = []
        this.dataOthers2 = []
        this.dataMe3 = []
        this.dataOthers3 = []
        

        //12월 4일 수정 코드
        this.income = [0,0,0,0,0,0,0] , 
        this.spend = [0,0,0,0,0,0,0,0,0,0,0,0,0] , 
        this.oincome = [0,0,0,0,0,0,0] , 
        this.ospend = [0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.viewStartAge= '',
        this.viewEndAge= '',
        this.viewSex= '',
        this.viewJob= '',
        this.viewYear= '',
        this.viewMonth= ''

        this.isMe = 0

        //false 값이 데이터 찾은 것 => 일단 찾은 것으로 간주함
        this.searchOthersResult = false,
        this.searchMyResult = false
      },
      setViewValue : function(){
        this.viewStartAge= this.selectedStartAge,
        this.viewEndAge= this.selectedEndAge,
        this.viewSex= this.selectedSex,
        this.viewJob= this.selectedJob,
        this.viewYear= this.selectedYear,
        this.viewMonth= this.selectedMonth
      },
      searchProcessMe : function(){
        var findId = this.$session.get('id')
        this.$http.post('/stats/me-search',
        {
          id : findId,
          year : this.selectedYear,
          month : this.selectedMonth,
        }).then((response)=>{
          //나에 대한 것들
          console.log(response.body)
          var i = 0
          if(response.body.length < 1){
            this.searchMyResult = true
          }
          while(i < response.body.length){
            if(response.body[i].is==="수입"){
                this.incomeMe += response.body[i].price
                switch (response.body[i].category){
                  case "월급" :
                  this.income[1] += response.body[i].price
                  break;
                  case "부수입" :
                  this.income[2] += response.body[i].price
                  break;
                  case "용돈" :
                  this.income[3] += response.body[i].price
                  break;
                  case "상여" :
                  this.income[4] += response.body[i].price
                  break;
                  case "금융소득" :
                  this.income[5] += response.body[i].price
                  break;
                  case "기타" :
                  this.income[6] += response.body[i].price
                  break;
                  default : 
                  alert("switch 1 error")
                }
              }else if(response.body[i].is==="지출"){
                this.spendMe += response.body[i].price
                switch(response.body[i].category){
                  case "식비":
                  this.spend[1] += response.body[i].price
                  break;
                  case "교통/차량":
                  this.spend[2] += response.body[i].price
                  break;
                  case "문화생활":
                  this.spend[3] += response.body[i].price
                  break;
                  case "마트/편의점":
                  this.spend[4] += response.body[i].price
                  break;
                  case "패션/미용":
                  this.spend[5] += response.body[i].price
                  break;
                  case "생활용품":
                  this.spend[6] += response.body[i].price
                  break;
                  case "주거/통신":
                  this.spend[7] += response.body[i].price
                  break;
                  case "건강":
                  this.spend[8] += response.body[i].price
                  break;
                  case "교육":
                  this.spend[9] += response.body[i].price
                  break;
                  case "경조사/회비":
                  this.spend[10] += response.body[i].price
                  break;
                  case "가족":
                  this.spend[11] += response.body[i].price
                  break;
                  case "기타":
                  this.spend[12] += response.body[i].price
                  break;
                  default : 
                  alert("switch 2 error")
                }
              }else{
                alert("spendMe / incomeMe 분류 error")
              }
            i++
          }
          
        })
      },
      searchProcessOthers : function(){
        var findId = this.$session.get('id')
        if(this.selectedStartAge > this.selectedEndAge){
          alert("올바른 범위의 나이를 입력해주세요")
        }else if(this.selectedSex.length === 0){
          alert("성별을 선택해주세요")
        }else if(this.selectedJob.length === 0){
          alert("직업을 선택해주세요")
        }else{
          // alert("나이 : " + this.selectedStartAge + "~" + this.selectedEndAge + " 세\n직업 : " + this.selectedJob + "\n성별 : " + this.selectedSex + "\n" + this.selectedYear + "년 " + this.selectedMonth + "월 으로 검색합니다") 
        }
        this.$http.post('/stats/others-search',
        {
          startAge : this.selectedStartAge,
          endAge : this.selectedEndAge,
          job : this.selectedJob,
          sex : this.selectedSex,
          year : this.selectedYear,
          month : this.selectedMonth,
          id : findId
        }).then((response)=>{
          console.log(response.body)
          if(response.body.length === 1){
            this.searchOthersResult = true
          }
          var i = 0; 
          //베열의 마지막에 찾은 사람의 개수를 넣어주었기 때문에 배열 개수 -1 해줌
          //검색조건에 맞는 것 갖고와서 나랑 타인을 나눠주는 while 문
          //12월 4일 수정 코드
          while(i < response.body.length - 1){
            if(response.body[i].is==="수입"){
                this.incomeOthers += response.body[i].price
                switch (response.body[i].category){
                  case "월급" :
                  this.oincome[1] += response.body[i].price
                  break;
                  case "부수입" :
                  this.oincome[2] += response.body[i].price
                  break;
                  case "용돈" :
                  this.oincome[3] += response.body[i].price
                  break;
                  case "상여" :
                  this.oincome[4] += response.body[i].price
                  break;
                  case "금융소득" :
                  this.oincome[5] += response.body[i].price
                  break;
                  case "기타" :
                  this.oincome[6] += response.body[i].price
                  break;
                  default : 
                  alert("switch 3 error")
                }
              }else if(response.body[i].is==="지출"){
                this.spendOthers += response.body[i].price
                switch(response.body[i].category){
                  case "식비":
                  this.ospend[1] += response.body[i].price
                  break;
                  case "교통/차량":
                  this.ospend[2] += response.body[i].price
                  break;
                  case "문화생활":
                  this.ospend[3] += response.body[i].price
                  break;
                  case "마트/편의점":
                  this.ospend[4] += response.body[i].price
                  break;
                  case "패션/미용":
                  this.ospend[5] += response.body[i].price
                  break;
                  case "생활용품":
                  this.ospend[6] += response.body[i].price
                  break;
                  case "주거/통신":
                  this.ospend[7] += response.body[i].price
                  break;
                  case "건강":
                  this.ospend[8] += response.body[i].price
                  break;
                  case "교육":
                  this.ospend[9] += response.body[i].price
                  break;
                  case "경조사/회비":
                  this.ospend[10] += response.body[i].price
                  break;
                  case "가족":
                  this.ospend[11] += response.body[i].price
                  break;
                  case "기타":
                  this.ospend[12] += response.body[i].price
                  break;
                  default : 
                  alert("switch 4 error")
                }
              }else{
                alert("spendOthers / incomdeOthers 분류 error")
              }
              i++ // while문 끝
          }
          this.countOthers = response.body[response.body.length-1].length

          //다른 사람 수입 평균 구하기
        this.incomeOthers = Math.floor(this.incomeOthers / this.countOthers)
        //다른 사람 지출 평균 구하기
        this.spendOthers = Math.floor(this.spendOthers / this.countOthers)

        //0번 인덱스 => 수입 , 1번 인덱스 => 지출
        //dataMe 채우기
        this.dataMe.push(this.incomeMe)
        this.dataMe.push(this.spendMe)

        //0번 인덱스 => 수입 , 1번 인덱스 => 지출
        //dataOthers 채우기  
        this.dataOthers.push(this.incomeOthers)
        this.dataOthers.push(this.spendOthers)
        
        //12월 4일 수정 코드
        //수입,지출 카테고리 별로 나와 타인 데이터에 넣어줌
        for(var i = 1; i < 7 ; i++){
          this.oincome[i] = Math.floor(this.oincome[i] / this.countOthers)
          this.dataMe2.push(this.income[i])
          this.dataOthers2.push(this.oincome[i])
        }
        for(var i = 1; i < 13 ; i++){
          this.ospend[i] = Math.floor(this.ospend[i] / this.countOthers)
          this.dataMe3.push(this.spend[i])
          this.dataOthers3.push(this.ospend[i])
        }

        //밑에 코드 실행되는 순간 차트 렌더링
        this.loaded = true  
        // alert("내 수입 : " + this.incomeMe + " 내 지출 : " + this.spendMe + "\n다른 사람 수입 : " + this.incomeOthers + "다른 사람 지출 : " + this.spendOthers + "다른 사람 수 : " +  this.countOthers) 
        })
      },

      searchProcess: function(){ 
        //변수들 초기화 해주기  
        this.resetValue()
        //헤더에 뜨게 하는 것
        this.setViewValue()
        //내 아이디 , 년 , 월로 검색 (항상 뜨게) 
        this.searchProcessMe()
        //나를 제외한 조건에 맞는 타인에 대한 검색
        this.searchProcessOthers()
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
      }
    },
    mounted:function(){
      //ageList 에 일일히 쓰기 귀찮아서 , 나이목록 생성
      for(var i = 1 ; i<100 ; i++){
        this.ageList.push(i)
      }
      var findId = this.$session.get('id')
      this.$http.post('/stats/find',
      {
        id: findId
      }).then((response)=>{
        //현재 년 , 월 가져오기
        var currentTime = new Date()
        var month = currentTime.getMonth() + 1
        var year = currentTime.getFullYear()
        
        //현재 년,월과 나와 같은 정보를 가진 사람의 데이터 값으로 초기화 해줌
        this.selectedMonth = month
        this.selectedYear = year
        this.selectedSex.push(response.data.sex)
        this.selectedStartAge = response.data.age
        this.selectedEndAge = response.data.age
        this.selectedAge = response.data.age
        this.selectedJob.push(response.data.job)

        //검색
        this.searchProcess()         
        })
    }
  }
</script>

<style>

</style>
