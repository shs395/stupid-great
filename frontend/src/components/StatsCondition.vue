<template>
          <!-- <v-card>
            <v-card-title>
              나와 다른 사람의 가계부 평균 비교해보기 
            </v-card-title>
            <v-card-text> 
              <v-subheader>나이대</v-subheader>
                <v-layout row>
                  <v-checkbox v-model="age" :label="'10대'" value="10대"></v-checkbox>
                  <v-checkbox v-model="age" :label="'20대'" value="20대"></v-checkbox>
                  <v-checkbox v-model="age" :label="'30대'" value="30대"></v-checkbox>
                  <v-checkbox v-model="age" :label="'40대'" value="40대"></v-checkbox>
                  <v-checkbox v-model="age" :label="'50대'" value="50대"></v-checkbox>
                </v-layout>
              <v-subheader>직업</v-subheader>
                <v-layout row>
                  <v-checkbox v-model="job" :label="'백수'" value="백수"></v-checkbox>
                  <v-checkbox v-model="job" :label="'중학생'" value="중학생"></v-checkbox>
                  <v-checkbox v-model="job" :label="'고등학생'" value="고등학생"></v-checkbox>
                  <v-checkbox v-model="job" :label="'대학생'" value="대학생"></v-checkbox>
                  <v-checkbox v-model="job" :label="'직장인'" value="직장인"></v-checkbox>
                  <v-checkbox v-model="job" :label="'전업주부'" value="전업주부"></v-checkbox>

                </v-layout>
              <v-subheader>성별</v-subheader>
                <v-layout row justify-center>
                  <v-checkbox v-model="sex" :label="'남자'" value="male"></v-checkbox>
                  <v-checkbox v-model="sex" :label="'여자'" value="female"></v-checkbox>
                </v-layout>
              <v-subheader>날짜</v-subheader>
                <v-layout row justify-center>
                  <v-select
                    v-model="selectedYear"
                    :items="years"
                    label="년"
                  ></v-select>
                  <v-select
                    v-model="selectedMonth"
                    :items="months"
                    label="월"
                  ></v-select>
                </v-layout>
                <p>나이{{age}}</p>
                <p>직업{{job}}</p>
                <p>성별{{sex}}</p>
                <p>{{selectedYear}}</p>
                <p>{{selectedMonth}}</p>
            </v-card-text>
            <v-card-actions>
              <v-layout row justify-center>
                <v-flex xs10>
                  <div class="text-xs-center">
                    <v-btn flat color="orange">검색</v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card> -->

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
                  <!-- <v-select
                    :items=""
                    v-model="e7"
                    label="Select"
                    multiple
                  ></v-select> -->
                </v-flex>
                <v-flex>
                  <v-btn>검색</v-btn>
                </v-flex>
              </v-layout>
             

              <!-- <v-subheader>날짜</v-subheader>
                <v-layout row justify-center>
                  <v-select
                    v-model="selectedYear"
                    :items="years"
                    label="년"
                  ></v-select>
                  <v-select
                    v-model="selectedMonth"
                    :items="months"
                    label="월"
                  ></v-select>
                </v-layout>
                <p>나이{{age}}</p>
                <p>직업{{job}}</p>
                <p>성별{{sex}}</p>
                <p>{{selectedYear}}</p>
                <p>{{selectedMonth}}</p> -->
            </v-card-text>
            <!-- <v-card-actions>
              <v-layout row justify-center>
                <v-flex xs10>
                  <div class="text-xs-center">
                    <v-btn flat color="orange">검색</v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-actions> -->
          </v-card>
</template>

<script>
  export default{
    name : 'StatsCondition',
    data : function(){
      return{
        age: [],
        job: [],
        sex: [],
        years:['2000년','2001년','2002년','2003년','2004년','2005년','2006년','2007년','2008년','2009년','2010년',
                '2011년','2012년','2013년','2014년','2015년','2016년','2017년','2018년'],
        months:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        selectedYear : '',
        selectedMonth : '',
        ageList:['10대','20대','30대','40대','50대 이상'],
        jobList:['백수','중학생','고등학생','대학생','직장인','전업주부'],
        sexList:['남자','여자'],
        selectedAge:[],
        selectedJob:[],
        selectedSex:[]
      }
    },

  }
</script>

<style>
</style>
