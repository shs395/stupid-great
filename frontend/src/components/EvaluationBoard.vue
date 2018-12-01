<template>

<v-card>
        <v-card-title><v-icon>search</v-icon>Search
            <v-spacer></v-spacer>
                <v-text-field v-model="search" label="제목 & 작성자" single-line
                    hide-details></v-text-field>
            </v-card-title>  
            <v-card-text>
                    <v-data-table 
                        hide-actions 
                       :headers="headers"
                        :items="items"
                        :search="search"
                        :pagination.sync="pagination">
                       
                        <template slot="items" slot-scope="data">
                            <td :class="headers[0].class"><a @click="readData">{{data.item.title}}</a></td>
                            <td :class="headers[1].class"><a @click="readData">{{data.item.writer}}</a></td>
                            <td :class="headers[2].class"><a @click="readData">{{data.item.createdAt}}</a></td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                             "{{search}}" no result.
                        </v-alert>
                   </v-data-table> 

                    <!-- <div v-for="item in items" :key="item.id" :pagination.sync="pagination">  -->
                        <!-- <v-card-text>{{item.title}}</v-card-text> -->
                          <!-- <v-pagination v-model="pagination.page" :length="pages"></v-pagination> -->
                       
                    <!-- </div> -->
                       <v-card-text class="text-xs-center">
                       <v-pagination v-model="pagination.page" :length="pagination.total" :total-visible="pagination.visible"></v-pagination>
                </v-card-text>
            </v-card-text>
</v-card>
</template>

<script>
export default {
    name:'EvaluationBoard',

    data: function(){
        return {
            search: '',
            d_info:'',
            items:[],
            pagination:{
                 page:1,
                 total:5,
                visible:7
            },
            headers: [
                {text:"제목", value:"title" ,sortable:false},
                {text:"작성자", value:"writer", sortable:false},
                {text:"작성일", value:"createdAt",sortable:false}
            ],   
        }
    },
    methods:{
        readData(){
            alert('게시글 페이지로 이동합니다!')
             return location.href="/boardshow";        
        }

    },
      mounted(){
           this.$http.get('/board/list').then(response=>{
               this.items=response.data
               console.log(response.data)})
           },
       computed: {
          pages () {
            if (this.pagination.rowsPerPage == null ||
               this.pagination.totalItems == null   ) return 0
               return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)

               }
          }
}


</script>

<style> 
    
</style>