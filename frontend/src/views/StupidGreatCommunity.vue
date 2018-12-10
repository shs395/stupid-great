<template>
    <div id="sg-community-bg">
    <toolbar />
    <v-tabs fixed-tabs>

        <v-tab>
            랜덤으로 보기
        </v-tab>
        <v-tab>
            게시물 목록 보기
        </v-tab>

        <v-tab-item lazy="true">
            <v-card id="random-component">
                    <StupidGreatRandom />
            </v-card>
            <v-btn
              color="indigo lighten-2"
              dark
              large
              absolute
              bottom
              right
              fab
              id="edit-btn"
              v-on:click="OnEditBtnClick"
            >
              <v-icon>edit</v-icon>
            </v-btn>
        </v-tab-item>

        <v-tab-item lazy="true">
            <v-layout row wrap>
            <v-btn
              color="indigo lighten-2"
              dark
              large
              absolute
              bottom
              right
              fab
              id="edit-btn"
              v-on:click="OnEditBtnClick"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-layout row wrap>
                <v-flex v-for="post in posts.slice().reverse()" :key="post.PostNumber">
                    <v-card id="sg-content-cards" color="transparent">
                        <stupid-great-content :post="post"></stupid-great-content>
                    </v-card>
                </v-flex>
            </v-layout>
            </v-layout>
        </v-tab-item>
    </v-tabs>
    </div>
</template>

<script>

import toolbar from '../components/toolbar'
import StupidGreatRandom from '../components/StupidGreatRandom'
import StupidGreatContent from '../components/StupidGreatContent'

export default {
    beforeCreate: function () {
      if (!this.$session.exists()) {
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
      }
    },
    created (){
        this.$http.get('/stupid_great')
        .then((result) => {
            this.posts = result.data;
        });    
    },

    components: {
      toolbar,
      StupidGreatRandom,
      StupidGreatContent,
    },

    data (){
        return {
            posts: [],
        }
    },

    methods: {
        OnEditBtnClick (){
            return location.href="/stupid-great-content-create";
        },
    }
}
</script>

<style>

#sg-content-cards{
    width: 400px;
    height: auto;
    margin-left:30px;
    margin-top: 30px;
}

#edit-btn{
    position : fixed;
    margin: 0 0 50px 50px;
}

#sg-community-bg{
  background: url(../assets/koreamoney.jpg) center; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

}
</style>
