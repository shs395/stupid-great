<template>
    <div>
        <v-container fluid>
             <v-card>
                 <p>{{test1}}</p>
             </v-card>
        </v-container>
    
    </div>
</template>

<script>
    export default{
        name:'board-content-show',
        data: function(){
            return{
                b_items:'',
                a_items:'',
               // postNumber:''
               test1:''
            }
        },
        methods:{
            // get_boardinfo(){
            // var id=this.$session.get('id')
            // this.$http.get(`/board/read/board/${id}`).then(response=>{
            //    this.b_items=response.data
            //    console.log(response.data)}).catch((err)=>console.log(err))
            // },
            // get_accountinfo(){
            // var id=this.$session.get('id')
            // this.$http.get(`/board/read/account/${id}`).then(response=>{
            //    this.a_items=response.data
            //    console.log(response.data)}).catch((err)=>console.log(err))
            // },
            test(){
                console.log(this.$route.params.postNumber)
                this.$http.get(`/board/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    console.log(this.$route.params.postNumber+'1')
                    this.test1=response.data
                    console.log(response.data)}).catch((err)=>console.log(err))
            }
        },
        created(){
            // this.get_boardinfo(),
            // this.get_accountinfo(),
            console.log(this.$route.params.postNumber)
            this.test()
           },
    }
</script>