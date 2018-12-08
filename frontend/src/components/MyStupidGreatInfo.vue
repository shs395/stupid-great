<template>
    <div id="MyStupidGreatInfo">
        <v-layout row wrap>
            <v-flex v-for="i in 30" :key="i">
                <StupidGreatResult />
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import StupidGreatResult from './StupidGreatResult'
export default {
    name : 'MyStupidGreatInfo',
    components : {
        StupidGreatResult
    }

}
</script>

<style>

</style>
