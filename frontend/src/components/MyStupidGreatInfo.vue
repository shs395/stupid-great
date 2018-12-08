<template>
    <div id="MyStupidGreatInfo">
        <v-layout row wrap>
            <v-flex v-for="post in posts.slice().reverse()" :key="post.PostNumber">
                <StupidGreatResult :result="post"/>
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
    },
    data (){
        return{
            posts : [],
        }
    },

    created (){
        this.$http.get(`/stupid_great/result/${this.$session.get('id')}`)
        .then((result)=>{
            this.posts = result.data;
        });
    }

}
</script>

<style>

</style>
