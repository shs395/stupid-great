<template>
    <div id="sg-community-bg">
    <toolbar />
    <v-tabs fixed-tabs>
        <v-tab
        v-for="str in strs"
        :key="str"
        >
        {{ str }}
        </v-tab>
    </v-tabs>

    <StupidGreatRandom />
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
            strs : ['랜덤으로 보기', '게시물 목록 보기'],

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
