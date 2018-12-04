<template>
    <div>
    <!-- 뒤로가기버튼 추가 -->
        <v-container fluid justify-center>
             <v-card>
                  <v-card-title>title{{post_items.title}}</v-card-title>

                 <v-layout row>
                    <!-- 파이차트추가-수입 -->
                    <v-flex xs6 pa-3>
                         {{in_items}}
                    </v-flex>   
                    <!-- 파이차트추가-지출  -->
                    <v-flex xs6 pa-3>
                        {{out_items}}
                    </v-flex>
                 </v-layout>>
                 <v-flex xs6>
                     <v-card-title>content: {{post_items.content}}</v-card-title>
                </v-flex>
                <v-flex xs6>
                     <v-card-title>auothor: {{post_items.writer}}</v-card-title>
                </v-flex>
                <v-flex xs6>
                     <v-card-title>views: {{post_items.views}}</v-card-title>
                </v-flex>
                <v-flex xs6>
                     <v-card-title>createdAt: {{post_items.createdAt}}</v-card-title>
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
                    console.log(this.post_items)}).catch((err)=>console.log(err))
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