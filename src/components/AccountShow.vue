<template>
  <v-card height="100%">
    <v-card-title>
      <!-- 수입 or 지출 인지 받아옴 -->
      {{data.date}}
      {{data.is}}
    </v-card-title>
    <v-card-text> 
      <!-- 날짜 받아온걸로 해당 날짜의 수입 or 지출 내용을 v-for로 넣기 -->
      <v-layout row>
      <v-subheader>항목</v-subheader>
      <v-subheader>이름</v-subheader>
      <v-subheader>금액</v-subheader>
      <v-subheader>평가</v-subheader>
      <!-- <v-rating v-model="rating"></v-rating> -->
      </v-layout>
      <!-- <li v-for="item in itmes">
        
      </li> -->


    </v-card-text>
    <v-card-actions>
      <v-layout row justify-center>
        <v-flex xs10>
          <div class="text-xs-center">
            <v-btn flat color="orange">추가</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-card-actions>
      
  </v-card>
</template>

<script>
import AccountComp from "../components/AccountShow";


  export default{
    name : 'AccountShow',
    props:["data"],
    methods:{
    },
    data:function(){
      return{
        items:[]
      }
    }
  }
</script>

<style>
</style>
