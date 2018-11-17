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

        <v-tab-item >
            <v-layout row wrap>
                <v-flex v-for="i in 30" :key="i">
                    <v-card id="sg-content-card" color="transparent">
                        <stupid-great-content  />
                    </v-card>
                </v-flex>
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

        }
    }
}
</script>

<style>

#sg-content-card{
    margin-left: 50px;
    margin-top:30px;
    width: 400px;
    height: 250px;

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
