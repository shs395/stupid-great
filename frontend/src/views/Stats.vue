<template>
  <div>
    <toolbar></toolbar>
    <v-container fluid>
      <v-layout column>
        <!-- 차트부분 -->
        <v-flex>
          <v-card>
            <v-card-text>
              나와 비슷한 사람 ({{selectedAge}},{{selectedSex}},{{selectedJob}} )의 {{selectedYear}}년 {{selectedMonth}}월 가계부 평균 내 수입 {{incomeMe}} / 지출 {{spendMe}}||| 다른 사람 수입 {{incomeOthers}}/ 지출{{spendOthers}}
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
                  <StatsChart></StatsChart>
                </v-tab-item>
                <v-tab-item lazy="true">
                  <StatsChart2></StatsChart2>
                </v-tab-item>
                <v-tab-item lazy="true">
                  <StatsChart3></StatsChart3>
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
        age: [],
        job: [],
        sex: [],
        years:['2018','2017','2016','2015','2014','2013','2012','2011','2010',
              '2009','2008','2007','2006','2005','2004','2003','2002','2001','2000'],
        months:['1','2','3','4','5','6','7','8','9','10','11','12'],
        selectedYear : '',
        selectedMonth : '',
        ageList:[],
        jobList:['모두','백수','중학생','고등학생','대학생','직장인','전업주부'],
        sexList:['모두','남자','여자'],
        selectedAge:[],
        selectedStartAge : '',
        selectedEndAge : '',
        selectedJob:[],
        selectedSex:[],
        requestAge:[],
        requestJob:[],
        requestSex:[],
        searchAge : [],
        searchJob : [],
        searchSex : [],
        tabList:[
          {name:'수입 / 지출', num:1},
          {name:'지출', num:2},
          {name:'수입', num:3}
        ],
        incomeOthers:0 ,
        spendOthers:0,
        incomeMe:0,
        spendMe:0
      }
    },
    methods:{
      searchProcess: function(){
        this.incomeMe = 0
        this.spendMe = 0
        this.incomeOthers = 0
        this.spendOthers = 0
        alert(this.requestAge + this.requestJob + this.requestSex + this.selectedYear + this.selectedMonth + "으로 검색하기") 
        this.$http.post('/stats/conditional-search',
        {
          startAge : this.selectedStartAge,
          endAge : this.selectedEndAge,
          job : this.selectedJob,
          sex : this.selectedSex,
          year : this.selectedYear,
          month : this.selectedMonth,
        }).then((response)=>{
          console.log("searchProcess good")
          console.log(response.body)
          var i = 0;
          while(i < response.body.length){
            if(response.body[i].id === this.$session.get('id')){
              if(response.body[i].is==="수입"){
                this.incomeMe += response.body[i].price
              }else if(response.body[i].is==="지출"){
                this.spendMe += response.body[i].price
              }else{
                alert("spendMe / incomdeMe 분류 error")
              }
            }else{
              if(response.body[i].is==="수입"){
                this.incomeOthers += response.body[i].price
              }else if(response.body[i].is==="지출"){
                this.spendOthers += response.body[i].price
              }else{
                alert("spendOthers / incomdeOthers 분류 error")
              }
            }
            i++
          }
        })
      }
    },
    mounted:function(){
      //ageList 에 일일히 쓰기 귀찮아서 , 나이목록 생성
      var i = 0
      for(i ; i<100 ; i++){
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
        this.selectedMonth = month
        this.selectedYear = year
        this.selectedSex.push(response.data.sex)
        this.selectedStartAge = response.data.age
        this.selectedEndAge = response.data.age
        this.selectedAge = response.data.age
        this.selectedJob.push(response.data.job)
        // if(response.data.age < 10){
        //   this.selectedAge.push("10대 이하")
        // }else if(response.data.age < 20){
        //   this.selectedAge.push("10대")
        // }else if(response.data.age < 30){
        //   this.selectedAge.push("20대")
        // }else if(response.data.age < 40){
        //   this.selectedAge.push("30대")
        // }else if(response.data.age < 50){
        //   this.selectedAge.push("40대")
        // }else{
        //   this.selectedAge.push("50대")
        // }
      })
    }
  }
</script>

<style>

</style>
