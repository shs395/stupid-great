<template>
    <div>
    <!-- 뒤로가기버튼 추가 -->
        <v-container fluid>
             <v-card>
                 <v-card-title>{{post_items.title}}</v-card-title>
                 <v-layout row>
                    <v-flex xs6 pa-3>
                         {{in_items}}
                    </v-flex>    
                    <v-flex xs6 pa-3>
                        {{out_items}}
                    </v-flex>
                 </v-layout>
                 <v-flex>
                     {{post_items.content}}
                </v-flex>
             </v-card>
        </v-container>
    
    </div>
</template>

<script>
    export default{
        name:'board-content-show',
        data: function(){
            return{
                post_items:'',
                in_items:'',
                out_items:'',
               // postNumber:''
               items:'',
            }
        },
        methods:{
            get(){
              console.log(this.$route.params.postNumber)
                this.$http.get(`/board/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.post_items=response.data
                //console.log(response.data)
                }).catch((err)=>console.log(err))
            },
            get_in_account(){
                this.$http.get(`/board/in/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.in_items=response.data
                    console.log(this.in_items)}).catch((err)=>console.log(err))
            },
            get_out_account(){
                this.$http.get(`/board/out/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.out_items=response.data
                    console.log(this.out_items)}).catch((err)=>console.log(err))
            }
        },
        created(){
            this.get()
            this.get_in_account(),
            this.get_out_account()
           },
    }
</script>