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

        <v-tab-item>
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

        <v-tab-item >
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
            <v-layout v-show="showpost" row wrap>
                <v-flex v-for="post in posts.slice().reverse()" :key="post.PostNumber">
                    <v-card id="sg-content-cards" color="transparent">
                        <stupid-great-content :title="post.title" :content="post.content" :price="post.price"></stupid-great-content>
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
    computed: {
        showpost (){
            this.$http.get('/stupid_great')
            .then((result) => {
                this.posts = result.data;
            });
            return true;
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
    height: 250px;
    margin-left:50px;
    margin-top: 30px;
}

#edit-btn{
    position : fixed;
    margin: 0 0 50px 50px;
}

#sg-community-bg{
  background: url(../assets/koreamoney.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  min-block-size: 753px;
}
</style>
