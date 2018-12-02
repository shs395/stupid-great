<template>
  <div>
    <toolbar></toolbar>
    <v-container fluid>
      <v-layout column>
        <!-- 차트부분 -->
        <v-flex>
          <v-card>
            <v-card-text>
              나와 비슷한 사람 ({{selectedAge}},{{selectedSex}},{{selectedJob}} )의 {{selectedYear}}년 {{selectedMonth}}월 가계부 평균 내 수입 {{incomeMe}} / 지출 {{spendMe}}||| 다른 사람 수입 {{incomeOthers}}/ 지출{{spendOthers}} / 다른 사람 수 {{countOthers}}
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
                  <StatsChart :dataMe="dataMe" :dataOthers="dataOthers" v-if="loaded"></StatsChart>
                </v-tab-item>
                <v-tab-item lazy="true">
                  <StatsChart2 :dataMe="dataMe2" :dataOthers="dataOthers2" v-if="loaded"></StatsChart2>
                </v-tab-item>
                <v-tab-item lazy="true">
                  <StatsChart3 :dataMe="dataMe3" :dataOthers="dataOthers3" v-if="loaded"></StatsChart3>
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
        loaded : false,
        age: [],
        job: [],
        sex: [],
        years:[2018,2017,2016,2015,2014,2013,2012,2011,2010],
        months:[1,2,3,4,5,6,7,8,9,10,11,12],
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
        tabList:[
          {name:'수입 / 지출', num:1},
          {name:'지출', num:2},
          {name:'수입', num:3}
        ],
        incomeOthers:0 ,
        spendOthers:0,
        incomeMe:0,
        spendMe:0,
        dataMe : [],
        dataOthers: [],
        dataMe2 : [],
        dataOthers2: [],
        dataMe3 : [],
        dataOthers3: [],
        countOthers : 0,
        datacollection : ''
        // chartData: {
        //   labels:['수입 평균','지출 평균'],
        //   datasets:[
        //     {
        //       label:'나',
        //       backgroundColor: '#f879798',
        //       data : []      
        //     },
        //     {
        //       label: '다른 사람들',
        //       backgroundColor: '#f87979',
        //       data : []
        //     },
        //   ],
        //   xAxisId : 'hi'
        // }
      }
    },
    methods:{
      searchProcess: function(){ 
        this.loaded = false
        //찾을 때 0으로 값 초기화해줌
        this.incomeMe = 0
        this.spendMe = 0
        this.incomeOthers = 0
        this.spendOthers = 0
        this.dataMe = []
        this.dataOthers = []
        //검색 조건 맞나 확인
        alert(this.selectedAge + " " + this.selectedJob + " " + this.selectedSex + " " + this.selectedYear + " " + this.selectedMonth + " 으로 검색하기") 
        //조건 검색하러 요청
        this.$http.post('/stats/conditional-search',
        {
          startAge : this.selectedStartAge,
          endAge : this.selectedEndAge,
          job : this.selectedJob,
          sex : this.selectedSex,
          year : this.selectedYear,
          month : this.selectedMonth,
        }).then((response)=>{
          console.log(response.body)
          var i = 0; 
          //베열의 마지막에 찾은 사람의 개수를 넣어주었기 때문에 배열 개수 -1 해줌
          //검색조건에 맞는 것 갖고와서 나랑 타인을 나눠주는 while 문
          while(i < response.body.length - 1){
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
          //-1 해주는 이유 => 나 자신 빼주려고 
          //다른 사람 수 구하기
          this.countOthers = response.body[response.body.length-1].length - 1
          //다른 사람 수입 평균 구하기
          this.incomeOthers = Math.floor(this.incomeOthers / this.countOthers)
          //다른 사람 지출 평균 구하기
          this.spendOthers = Math.floor(this.spendOthers / this.countOthers)

          alert("countOthers : "+ this.countOthers)
          alert("incomeOthers : "+ this.incomeOthers)
          alert("spendOthers : "+ this.spendOthers)

          //0번 인덱스 => 나
          this.dataMe.push(this.incomeMe)
          this.dataMe.push(this.spendMe)
          
          //1번 인덱스 => 타인

          this.dataOthers.push(this.incomeOthers)
          this.dataOthers.push(this.spendOthers)

          alert("dataMe : " + this.dataMe)
          alert("dataOthers : "+ this.dataOthers)
          
    
          alert(this.datacollection)
          console.log("datacollections")
          console.log(this.datacollection)
          alert("loaded before true " + this.loaded)
          this.loaded = true
          alert("loaded after true" + this.loaded)
        })
      }
    },
    mounted:function(){
      this.loaded = false
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
        // this.selectedMonth = month

        //현재 년,월과 나와 같은 정보를 가진 사람의 데이터 값으로 초기화 해줌
        this.selectedMonth = 11
        this.selectedYear = year
        this.selectedSex.push(response.data.sex)
        this.selectedStartAge = response.data.age
        this.selectedEndAge = response.data.age
        this.selectedAge = response.data.age
        this.selectedJob.push(response.data.job)

        this.searchProcess()      
        })
    }
  }
</script>

<style>

</style>
