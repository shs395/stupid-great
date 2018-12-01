<template>
    <div>
        <v-card>
            <v-card-title>게시글 보기</v-card-title>
        </v-card>
    </div>
</template>

<script>
    export default{
        name:'boardcontentshow',
        data: function(){
            return{
                items:''
            }
        },
        // mounted(){
        //    this.$http.get(`/board/${id}/${postNumber}`).then(response=>{
        //        this.items=response.data
        //        console.log(response.data)}).catch((err)=>console.log(err))
        //    },
    }
</script>