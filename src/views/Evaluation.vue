<template>
    <div>
        <toolbar></toolbar>

     <v-card id="board_info">
        <evaluation-board></evaluation-board>
    </v-card>
    
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
        return 
    }
}
</script>

<style>
</style>