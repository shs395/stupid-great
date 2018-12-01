<template>
    <div>
        <toolbar></toolbar>
        <v-container fluid>
              <v-card>
                 <v-card-title>가계부 게시판
                        <v-spacer></v-spacer>
                        <v-btn right flat color="orange" v-on:click="clickpost">POST</v-btn>
                 </v-card-title>
                      <v-card-text>
                        <evaluation-board></evaluation-board>
                     </v-card-text>
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
    methods:{
        clickpost(){
            return location.href="/boardwrite";
        }
    }
}
</script>

<style>
</style>