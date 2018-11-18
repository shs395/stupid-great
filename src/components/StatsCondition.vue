<template>
          <v-card>
            <v-card-title>
              조건 검색
            </v-card-title>
            <v-card-text> 
              <v-subheader>나이대</v-subheader>
                <v-layout row>
                  <v-checkbox :label="'10대'"></v-checkbox>
                  <v-checkbox :label="'20대'"></v-checkbox>
                  <v-checkbox :label="'30대'"></v-checkbox>
                  <v-checkbox :label="'40대'"></v-checkbox>
                  <v-checkbox :label="'50대'"></v-checkbox>
                </v-layout>
              <v-subheader>직업</v-subheader>
                <v-layout row>
                  <v-checkbox :label="'중학생'"></v-checkbox>
                  <v-checkbox :label="'고등학생'"></v-checkbox>
                  <v-checkbox :label="'대학생'"></v-checkbox>
                  <v-checkbox :label="'직장인'"></v-checkbox>
                  <v-checkbox :label="'주부'"></v-checkbox>
                </v-layout>
              <v-subheader>성별</v-subheader>
                <v-layout row justify-center>
                  <v-checkbox :label="'남자'"></v-checkbox>
                  <v-checkbox :label="'여자'"></v-checkbox>
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

  }
</script>

<style>
</style>
