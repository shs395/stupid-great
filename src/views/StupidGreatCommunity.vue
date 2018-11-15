<template>
    <div id="sg-community">
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

</style>
