<template>
    <div>
        <v-container fluid justify-center>
                <h2 class="text-xs-center">Title : {{post_items.title}}</h2>
                     <v-divider/>
                    <h3 class="text-xs-center"><br>Content : {{post_items.content}}</h3>
                    <v-flex xs3>
                        <p>Author : {{post_items.writer}}</p>
                        <p>CreatedAt : {{created_time1}} {{created_time2}}</p>
                    </v-flex>
                <v-layout row>
                    <v-flex xs6>
                    <v-card>
                    <v-card-text><h4>{{year}}년 {{month}}월의 수입 총합 {{total_in_price}}원</h4></v-card-text>
                    <v-divider></v-divider>
                        <v-expansion-panel popout>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_in[0]}} : {{in_price[0]}}원</div>
                                <v-card>
                                    <div  v-for="i in in_data1" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_in[1]}} : {{in_price[1]}}원</div>
                                <v-card>
                                    <div  v-for="i in in_data2" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_in[2]}}:{{in_price[2]}}원</div>
                                <v-card>
                                    <div  v-for="i in in_data3" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_in[3]}} : {{in_price[3]}}원</div>
                                <v-card>
                                    <div  v-for="i in in_data4" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_in[4]}} : {{in_price[4]}}원</div>
                                <v-card>
                                    <div  v-for="i in in_data5" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                             <v-expansion-panel-content>
                                <div slot="header">{{labels_in[5]}} : {{in_price[5]}}원</div>
                                <v-card>
                                    <div  v-for="i in in_data6" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                             
                        </v-expansion-panel>
                    </v-card>
                    </v-flex>

                       <v-flex xs6>
                        <v-card>
                    <v-card-text><h4>{{year}}년 {{month}}월의 지출 총합 {{total_out_price}}원 </h4></v-card-text>
                    <v-divider></v-divider>
                        <v-expansion-panel popout>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[0]}} : {{out_price[0]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data1" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[1]}} : {{out_price[1]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data2" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[2]}} : {{out_price[2]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data3" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[3]}} : {{out_price[3]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data4" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[4]}} : {{out_price[4]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data5" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[5]}} : {{out_price[5]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data6" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[6]}} : {{out_price[6]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data7" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[7]}} : {{out_price[7]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data8" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[8]}} : {{out_price[8]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data9" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[9]}} : {{out_price[9]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data10" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[10]}} : {{out_price[10]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data11" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <div slot="header">{{labels_out[11]}} : {{out_price[11]}}원</div>
                                <v-card>
                                    <div  v-for="i in out_data12" :key="i.id">
                                    <v-card-text>{{i.name}} : {{i.price}}원</v-card-text>
                                    </div>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        </v-card>
                    </v-flex>
                </v-layout>
        </v-container>
    
    </div>
</template>

<script>

    export default{
        data: function(){
            return{
               post_items:'', //쓴 글 데이터정보
                in_price:'',  //가계부 수입 카테고리별 총합
                out_price:'',  //가계부 지출 카테고리별 총합
               in_info_items:'', //수입의 account_info만
               out_info_items:'', //지출의 account_info만
                in_data1:[],
                in_data2:[],
                in_data3:[],
                in_data4:[],
                in_data5:[],
                in_data6:[],
                out_data1:[],
                out_data2:[],
                out_data3:[],
                out_data4:[],
                out_data5:[],
                out_data6:[],
                out_data7:[],
                out_data8:[],
                out_data9:[],
                out_data10:[],
                out_data11:[],
                out_data12:[],
                year:'',
                month:'',
                created_time1:'',
                created_time2:'',
                total_in_price:'',
                total_out_price:'',
                
                date: new Date().toISOString().substr(0, 7),   
                labels_in:['월급', '부수입', '용돈', '상여', '금융소득', '기타'],
                labels_out:['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타'],

            }
        },
        methods:{
            get(){
                this.$http.get(`/board/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.post_items=response.data,
                    this.in_info_items=this.post_items.in_account_info[0]
                    this.out_info_items=this.post_items.out_account_info[0]
                    this.year=this.out_info_items[0].year
                    this.month=this.out_info_items[0].month
                    this.created_time1=this.post_items.createdAt.slice(0,10)
                    this.created_time2=this.post_items.createdAt.slice(11,19)

                       for(var j=0; j<this.in_info_items.length; j++){
                        if(this.in_info_items[j].category=="월급"){
                           this.in_data1.push({name:this.in_info_items[j].name,price:this.in_info_items[j].price})}
                        if(this.in_info_items[j].category=="부수입"){
                           this.in_data2.push({name:this.in_info_items[j].name,price:this.in_info_items[j].price})   
                       }
                         if(this.in_info_items[j].category=="용돈"){
                           this.in_data3.push({name:this.in_info_items[j].name,price:this.in_info_items[j].price})   
                       }
                         if(this.in_info_items[j].category=="상여"){
                           this.in_data4.push({name:this.in_info_items[j].name,price:this.in_info_items[j].price})   
                       }
                         if(this.in_info_items[j].category=="금융소득"){
                           this.in_data5.push({name:this.in_info_items[j].name,price:this.in_info_items[j].price})   
                       }
                         if(this.in_info_items[j].category=="기타"){
                           this.in_data6.push({name:this.in_info_items[j].name,price:this.in_info_items[j].price})   
                       }
                   }

                   for(var j=0; j<this.out_info_items.length; j++){
                       if(this.out_info_items[j].category=="식비"){
                           this.out_data1.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="교통/차량"){
                           this.out_data2.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="문화생활"){
                           this.out_data3.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="마트/편의점"){
                           this.out_data4.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="패션/미용"){
                           this.out_data5.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="생활용품"){
                           this.out_data6.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="주거/통신"){
                           this.out_data7.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="건강"){
                           this.out_data8.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="교육"){
                           this.out_data9.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="경조사/회비"){
                           this.out_data10.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="가족"){
                           this.out_data11.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                        if(this.out_info_items[j].category=="기타"){
                           this.out_data12.push({name:this.out_info_items[j].name,price:this.out_info_items[j].price})
                       }
                   }
                
                    console.log(this.post_items)}).catch((err)=>console.log(err))
            },
            get_in_account(){
                this.loaded=false
                this.$http.get(`/board/in/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.in_price=response.data
                    console.log(this.in_price)
                    for(var i=0; i<this.in_price.length; i++){
                        this.total_in_price=this.in_price[i]
                    }
                    console.log(this.total_in_price)
                   }).catch((err)=>console.log(err))
            },
            get_out_account(){
                this.$http.get(`/board/out/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.out_price=response.data
                     for(var i=0; i<this.out_price.length; i++){
                        this.total_out_price=this.out_price[i]
                    }
                    console.log(this.out_price)}).catch((err)=>console.log(err))
            }
        
                            

            },
        mounted:function(){
            this.get()
            this.get_in_account(),
            this.get_out_account()
           

           }
    }
</script>