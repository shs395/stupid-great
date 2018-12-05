<template>
    <div>
    <!-- 뒤로가기버튼 추가 -->
        <v-container fluid justify-center>
             <v-card>
                  <v-card-title class="text-xs-center">Title : {{post_items.title}}</v-card-title>

                 <v-layout row>
                    <!-- 파이차트추가-수입 -->
                    <v-flex xs6 pa-3>
                      <div v-for="i in in_items" :key="i.id">
                         <v-card-text>{{i.is}}{{i.year}}{{i.month}}{{i.price}}{{i.name}}{{i.category}}</v-card-text>
                      </div>
                    </v-flex>   
                    <!-- 파이차트추가-지출  -->
                     <v-flex xs6 pa-3>
                      <div v-for="i in out_items" :key="i.id">
                         <v-card-text>{{i.is}}{{i.year}}{{i.month}}{{i.price}}{{i.name}}{{i.category}}</v-card-text>
                      </div>
                    </v-flex>   
                 </v-layout>
                <!-- <v-layout row>
                     <v-flex  pa-3 d-flex>                 
                         <v-text-field background-color="white" box label="Add comment here" v-model="comment" ></v-text-field> 
                     </v-flex>
                     <v-card-actions>
                      <v-btn flat color="orange" @click="saveComment">POST</v-btn>
                     </v-card-actions>
                </v-layout> -->
                <v-card-text>
                     <v-card-subtitle>Comments</v-card-subtitle>
                <v-card>
                
                  <v-layout row>
                            <v-flex  pa-3 d-flex>                 
                         <v-text-field background-color="white" box label="Add comment here" v-model="comment" ></v-text-field> 
                             </v-flex>
                          <v-card-actions>
                             <v-btn flat color="orange" @click="saveComment">POST</v-btn>
                          </v-card-actions>
                    
                    </v-layout>

                <!-- <v-data-table 
                    :items="c_items"
                    class="elevation-1"
                    hide-actions
                    hide-headers >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{props.item.body}}</td>
                        <td class="text-xs-right">{{props.item.author}}</td>
                        <td class="text-xs-right">{{props.item.createdAt}}</td>
                    </template>
                </v-data-table>
                </v-card-text> -->


             <v-data-table 
                    :items="c_items"
                    class="elevation-1"
                    hide-actions
                    hide-headers >
                    
                    <template slot="items" slot-scope="props">
                
                        <td>
                            <p><strong>{{props.item.author}}</strong><span color="gray"> |  {{props.item.createdAt}}</span><p>
                            <p>{{props.item.body}}</p>
                        </td>
                  
                       
                </template>
                </v-data-table>

                </v-card>
                </v-card-text>               
              
             </v-card>
        </v-container>
    
    </div>
</template>

<script>
    export default{
        data: function(){
            return{
                post_items:'',
                in_items:'',
                out_items:'',
                comment:'',
                c_items:[{divider:true, inset:true}],
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
                        this.getComment()
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