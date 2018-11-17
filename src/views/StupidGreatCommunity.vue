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
            <v-card>
                    <StupidGreatRandom />
            </v-card>
        </v-tab-item>

        <v-tab-item>
            <v-card>
                <h1>게시물목록</h1>
            </v-card>
        </v-tab-item>
    </v-tabs>
    </div>
</template>

<script>

import toolbar from '../components/toolbar'
import StupidGreatRandom from '../components/StupidGreatRandom'

export default {
    components: {
      toolbar,
      StupidGreatRandom,
    },
    data (){
        return {

        }
    }
}
</script>

<style>

#sg-community-bg{
  background: url(../assets/koreamoney.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  min-block-size: 753px;
}
</style>
