<template>
    <div>
    <!-- 뒤로가기버튼 추가 -->
        <v-container fluid justify-center>
             <v-card>
                  <v-card-title>title : {{post_items.title}}</v-card-title>

                 <v-layout row>
                    <!-- 파이차트추가-수입 -->
                    <v-flex xs6 pa-3>
                      <div v-for="i in in_items" :key="i.id">
                          {{i.year}}{{i.month}}{{i.is}}{{i.price}}{{i.category}}
                      </div>
                    </v-flex>   
                    <!-- 파이차트추가-지출  -->
                    <v-flex xs6 pa-3>
                        {{out_items[0]}}
                    </v-flex>
                 </v-layout>
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
                 <v-layout>     
                     <v-flex pa-3>                 
                         <v-text-field background-color="white" box label="Comment" v-model="comment" ></v-text-field> 
                         <v-btn flat color="orange" @click="saveComment">POST</v-btn>
                     </v-flex>
                 </v-layout>
                 <v-layout row>
                  <v-flex xs8 >
                    <div v-for="i in c_items" :key="i.id">
                        댓글내용:{{i.body}}
                  </v-flex>
                 </v-layout>
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
                comment:'',
                c_items:'',
                date: new Date().toISOString().substr(0, 7),
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
            },
            saveComment(){
                var comments={author:this.$session.get('id'),body:this.comment, createdAt:this.date}
                this.comment=""
                this.$http.post(`/board/post/${this.$route.params.postNumber}/comment`,comments).then(res=>{
                     alert("댓글이 저장되었습니다!")
                     console.log(res.data)
                }).catch((err)=>{console.log(err)})
             },
             getComment(){
                 this.$http.get(`/board/post/${this.$route.params.postNumber}/comment`).then(response=>{
                     this.c_items=response.data
                     console.log(this.c_items)
                 }).catch((err)=>{console.log(err)})
             }
        },
        mounted(){
            this.get()
            this.get_in_account(),
            this.get_out_account()
            this.getComment()
           },
    }
</script>