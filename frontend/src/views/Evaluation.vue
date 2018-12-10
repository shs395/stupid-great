<template>
    <div>
        <toolbar></toolbar>
        <v-container fluid>
              <v-card>
                 <v-card-title>가계부 게시판
                        <v-spacer></v-spacer>
                        <v-btn right flat color="orange" v-on:click="savePost">POST</v-btn>
                 </v-card-title>
                        <evaluation-board></evaluation-board>
        
              </v-card>
        </v-container>
    </div>
</template>

<script>

import toolbar from '../components/toolbar'
import EvaluationBoard from '../components/EvaluationBoard'

export default{
    name: 'Evaluation',
    components:{
        toolbar,
        EvaluationBoard
    },
    data(){
        return {
            info:''
        }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
      }
    },
    methods:{
        savePost(){
            return location.href="/boardwrite";
        }
    }
}
</script>

<style>
</style>