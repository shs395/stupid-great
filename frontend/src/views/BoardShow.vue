<template>
    <div>
        <toolbar></toolbar>
        <v-card>
            <board-content-show></board-content-show>
        </v-card>
       
    </div>
</template>

<script>

import toolbar from '../components/toolbar'
import BoardContentShow from '../components/BoardContentShow'

export default{
    name: 'Evaluation',
    components:{
        toolbar,
        BoardContentShow
    },
    data(){
        return {
            info:''
        }
    }
}
</script>

<style>
</style>