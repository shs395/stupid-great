<!-- 서버와의 통신을 테스트해보려고 만든 vue 파일 -->
<template>
  <div>
    <h1>test 페이지 : 서버와의 통신을 테스트해보려고 만든 페이지 </h1>
    <h2>주소 : /test </h2>
    <h3>로그인 후에 주소창으로 접근해야 작동함 , (세션 스토리지에 jwt 담고 있어야함)</h3>
    <v-btn @click="getUserData()">session 에 저장된 jwt 값으로 user data 받아오기</v-btn>
    <p>jwt값으로 받아온 user data : {{user_response}}</p>
  </div>
</template>
<script>
export default {
  name: 'test',
  data: function(){
    return{
      user_response : null
    }
  },
  methods:{
    getUserData : function(){
      var token = this.$session.get('jwt')
      console.log(token)
      this.$http.post('/test',
      {
        token : token
      }).then((response)=>{
        this.user_response = response.body
        console.log(response.body)
        console.log(response)
      })
    }
  }
}
</script>

<style>

</style>
