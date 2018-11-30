<!-- 서버와의 통신을 테스트해보려고 만든 vue 파일 -->
<template>
  <div>
    <h1>test 페이지 : 서버와의 통신을 테스트해보려고 만든 페이지 </h1>
    <h2>주소 : /test </h2>
    <h3>로그인 후에 주소창으로 접근해야 작동함 , (세션 스토리지에 jwt 담고 있어야함)</h3>
    <v-btn @click="getUserData()">session 에 저장된 jwt 값으로 user data 받아오기</v-btn>
    <p>jwt값으로 받아온 user data : {{user_response}}</p>
    <v-btn @click="changeToOne">1</v-btn>
    <v-btn @click="changeToTwo">2</v-btn>
    <v-btn @click="changeToThree">3</v-btn>
    <p>a 의 값 : {{a}}</p>
    <!-- <p v-if="a===1">
      <StatsChart></StatsChart>
    </p>
    <p v-if="a===2">
      <StatsChart2></StatsChart2>
    </p>
    <p v-if="a===3">
      <StatsChart3></StatsChart3>
    </p> -->

    <div v-if="a===1">
      <StatsChart></StatsChart>
    </div>
    <div v-if="a===2">
      <StatsChart2></StatsChart2>
    </div>
    <div v-if="a===3">
      <StatsChart3></StatsChart3>
    </div>

  </div>
</template>
<script>
import StatsChart from '../components/StatsChart.vue'
import StatsChart2 from '../components/StatsChart2.vue'
import StatsChart3 from '../components/StatsChart3.vue'
export default {

  name: 'test',
  components:{
    StatsChart,
    StatsChart2,
    StatsChart3
  },
  data: function(){
    return{
      user_response : null,
      a: 2
    }
  },
  methods:{
    getUserData : function(){
      var token = this.$session.get('jwt')
      console.log(token)
      this.$http.post('/users/verify',
      {
        token : token
      }).then((response)=>{
        this.user_response = response.body
        console.log(response.body) //payload 에 넣었던 값
        console.log(response)
      })
    },
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
