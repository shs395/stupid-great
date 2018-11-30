<template>
  <div>
    <toolbar></toolbar>
    <v-container fluid>
      <v-layout column>
        <!-- 차트부분 -->
        <v-flex>
          <v-card>
            <v-card-text>
          
              <v-tabs>
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
              나와 다른 사람의 가계부 평균 비교해보기 
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
                  <v-select
                    :items="ageList"
                    v-model="selectedAge"
                    label="성별"
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
                  <v-btn>검색</v-btn>
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
        ageList:['10대','20대','30대','40대','50대 이상'],
        jobList:['백수','중학생','고등학생','대학생','직장인','전업주부'],
        sexList:['남자','여자'],
        selectedAge:[],
        selectedJob:[],
        selectedSex:[],
        tabList:[
          {name:'수입 / 지출', num:1},
          {name:'지출', num:2},
          {name:'수입', num:3}
        ]
      }
    },
    methods:{
      changeToOne :function(){
      this.a = 1
      },
     changeToTwo :function(){
      this.a = 2
      },
      changeToThree :function(){
      this.a = 3
      },
    }
  }
</script>

<style>

</style>
