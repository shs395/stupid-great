<template>
    <v-app id="mypage">
        <toolbar />
        <v-tabs fixed-tabs>
        <v-tab>
            나의 정보 보기
        </v-tab>
        <v-tab>
            나의 가계부 글 보기
        </v-tab>
        <v-tab>
            나의 stupid-great 보기 
        </v-tab>
        <v-tab-item lazy="true">
          <MyPageInfo></MyPageInfo>
        </v-tab-item>
        <v-tab-item lazy="true">
          <my-post-info><my-post-info>
        </v-tab-item>
        <v-tab-item lazy="true">
            <my-stupid-great-info />
        </v-tab-item>

    </v-tabs>
    </v-app>

</template>

<script>
import toolbar from '../components/toolbar'
import MyPageInfo from '../components/MyPageInfo'
import MyPostInfo from '../components/MyPostInfo'
import MyStupidGreatInfo from '../components/MyStupidGreatInfo'

  export default {
    name : 'mypage',
    components: {
        toolbar,
        MyPageInfo,
        MyPostInfo,
        MyStupidGreatInfo
    },
    data () {
      return { }
    },
    methods: {
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
      }
    },
  }
</script>

<style>
#signin{
  width : 350px;
  padding-top: 150px;
  margin: 0 auto;
}
#title{
  text-align: center;
  font-size: 45px;
}

#signbtn{
  text-align: center;
}

#link{
  text-align: center;
}

#footer{
  margin-top:240px;
}

#signin-bg{
  background: url(../assets/koreamoney.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  min-block-size: 753px;
}
</style>
