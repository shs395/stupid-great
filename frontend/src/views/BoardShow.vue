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
    beforeCreate: function () {
      if (!this.$session.exists()) {
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
      }
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