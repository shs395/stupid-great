<template>
  <div>
    <p>
      유저 Id : {{userId}}
    </p>
    <p>
      유저 Pw : {{userPw}}
    </p>
    <p>
      유저 Sex : {{userSex}}
    </p>
    <p>
      유저 Age : {{userAge}}
    </p>
    <p>
      유저 Job : {{userJob}}
    </p>
    <p>
      유저 Email : {{userEmail}}
    </p>
    <v-btn @click="modifyProcess">내 정보 수정하기</v-btn>
    <v-btn @click="withdrawalProcess">회원 탈퇴하기</v-btn>
  </div>
</template>

<script>
export default {
  name : 'MyPageInfo',
  data: function(){
    return{
      userId : '',
      userPw : '',
      userSex : '',
      userAge : '',
      userJob : '',
      userEmail : '',


    }
  },
  methods:{
    modifyProcess:function(){

    },
    withdrawalProcess:function(){
      var findId = this.$session.get('id')
      this.$http.post('/users/withdrawal',
        {
          id: findId
        }).then((response)=>{
          this.$session.destroy()
          this.$router.push('/signin')
      })
       
    }
  },
  mounted:function(){
    var findId = this.$session.get('id')
     this.$http.post('/stats/find',
      {
        id: findId
      }).then((response)=>{
        this.userId = response.data.id
        this.userPw = response.data.pw
        this.userSex = response.data.sex
        this.userAge = response.data.age
        this.userJob = response.data.job
        this.userEmail = response.data.email
        

      })

  }
}
</script>

<style>

</style>
