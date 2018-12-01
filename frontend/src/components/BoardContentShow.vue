<template>
    <div>
        <v-container fluid>
             <v-card>
                <v-card-title>게시글 보기</v-card-title>
              </v-card>
            <v-card-text>
                {{a_items}}
            </v-card-text>
            <v-card-text>
                {{b_items}}
            </v-card-text>
        </v-container>
        
    </div>
</template>

<script>
    export default{
        name:'board-content-show',
        data: function(){
            return{
                b_items:'',
                a_items:''
               // postNumber:''
            }
        },
        methods:{
            get_boardinfo(){
            var id=this.$session.get('id')
            this.$http.get(`/board/read/board/${id}`).then(response=>{
               this.b_items=response.data
               console.log(response.data)}).catch((err)=>console.log(err))
            },
            get_accountinfo(){
            var id=this.$session.get('id')
            this.$http.get(`/board/read/account/${id}`).then(response=>{
               this.a_items=response.data
               console.log(response.data)}).catch((err)=>console.log(err))

            }
        },
        mounted(){
            // var id=this.$session.get('id')
            // console.log(id)
            // console.log(this.$route.params.postNumber)
            // this.$http.get(`/board/read/${id}`).then(response=>{
            //    this.items=response.data
            //    console.log(response.data)}).catch((err)=>console.log(err))
            this.get_boardinfo(),
            this.get_accountinfo()
           },
    }
</script>