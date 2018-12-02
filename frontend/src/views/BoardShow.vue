<template>
    <div>
        <toolbar></toolbar>
        <v-card>
            <v-card-title>게시글 보기</v-card-title>
            <board-content-show></board-content-show>
            <!-- <router-view></router-view> -->
        </v-card>
       <!-- 목록보기 필요 -->
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
        
        }
    }
}
</script>

<style>
</style>