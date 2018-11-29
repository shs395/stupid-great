<template>
          <v-card>
            <v-card-title>
              조건 검색 나이{{age}} 직업{{job}} 성별{{sex}}
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
                  <v-checkbox v-model="job" :label="'중학생'" value="중학생"></v-checkbox>
                  <v-checkbox v-model="job" :label="'고등학생'" value="고등학생"></v-checkbox>
                  <v-checkbox v-model="job" :label="'대학생'" value="대학생"></v-checkbox>
                  <v-checkbox v-model="job" :label="'직장인'" value="직장인"></v-checkbox>
                  <v-checkbox v-model="job" :label="'주부'" value="주부"></v-checkbox>
                </v-layout>
              <v-subheader>성별</v-subheader>
                <v-layout row justify-center>
                  <v-checkbox v-model="sex" :label="'남자'" value="남자"></v-checkbox>
                  <v-checkbox v-model="sex" :label="'여자'" value="여자"></v-checkbox>
                </v-layout>
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
          </v-card>
</template>

<script>
  export default{
    name : 'StatsCondition',
    data : function(){
      return{
        age: [],
        job: [],
        sex: []
      }
    },

  }
</script>

<style>
</style>
