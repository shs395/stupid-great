<template>
  <div>
    <toolbar></toolbar>
    <v-container fluid>
      <v-layout column>
        <!-- 차트부분 -->
        <v-flex>
          <v-card>
            <v-card-text>
               <v-tabs right>
                {{selectedYear}}년 {{selectedMonth}}월 통계
                <v-tab
                  v-for="n in 3"
                  :key="n"
                >
                  Item {{ n }}
                </v-tab>
              </v-tabs>
              <StatsChart></StatsChart>
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
  export default{
    name: 'stats',
    components:{
      toolbar,
      StatsChart
    },
    data:function(){
      return{
        age: [],
        job: [],
        sex: [],
        years:['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
                '2011','2012','2013','2014','2015','2016','2017','2018'],
        months:['1','2','3','4','5','6','7','8','9','10','11','12'],
        selectedYear : '',
        selectedMonth : '',
        ageList:['10대','20대','30대','40대','50대 이상'],
        jobList:['백수','중학생','고등학생','대학생','직장인','전업주부'],
        sexList:['남자','여자'],
        selectedAge:[],
        selectedJob:[],
        selectedSex:[]
      }
    }
  }
</script>

<style>

</style>
