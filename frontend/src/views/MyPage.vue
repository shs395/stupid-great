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
        <v-tab-item>
          <MyPageInfo></MyPageInfo>
        </v-tab-item>
        <v-tab-item>
          <my-post-info><my-post-info>
        </v-tab-item>
        <v-tab-item>
            stupid-great
        </v-tab-item>

    </v-tabs>
    </v-app>

</template>

<script>
import toolbar from '../components/toolbar'
import MyPageInfo from '../components/MyPageInfo'
import MyPostInfo from '../components/MyPostInfo'
  export default {
    name : 'mypage',
    components: {
        toolbar,
        MyPageInfo,
        MyPostInfo
    },
    data () {
      return { }
    },
    methods: {
    }
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
