<template>
    <div>
        <toolbar></toolbar>
        <v-container fluid>
        <v-card>
            <board-content-show></board-content-show>

            <board-content-comment></board-content-comment>
            <v-btn @click="viewlist" flat color="orange">목록 보기</v-btn>
        </v-card>
        </v-container>
       <!-- 목록보기 필요 -->
    </div>
</template>

<script>

import toolbar from '../components/toolbar'
import BoardContentShow from '../components/BoardContentShow'
import BoardContentComment from '../components/BoardContentComment'

export default{
    name: 'Evaluation',
    components:{
        toolbar,
        BoardContentShow,
        BoardContentComment
    },
    methods: {
        viewlist(){
            this.$router.push('/evaluation')
        },
    },
}
</script>

<style>
</style>