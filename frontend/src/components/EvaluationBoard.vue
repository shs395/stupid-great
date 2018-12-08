<template>

<v-card>
        <v-card-title><v-icon>search</v-icon>Search
            <v-spacer></v-spacer>
                <v-text-field v-model="search" label="제목 & 작성자" single-line
                    hide-details></v-text-field>
            </v-card-title>  
            <v-card-text>
               
                    <v-data-table 
                        v-model="selected"
                        hide-actions 
                        :headers="headers"
                        :items="items"
                        :search="search"
                        :pagination.sync="pagination"
                       
                        rows-per-page-text=""
                        class="elevation-1"
                        >
                     
                       <template slot="items" slot-scope="props">
                           <tr class="text-xs-center"> 
                            <router-link :to="{name:'boardshow', params:{postNumber:props.item.postNumber, writer:props.item.writer}}" tag="td">{{props.item.postNumber}}</router-link>
                            <router-link :to="{name:'boardshow', params:{postNumber:props.item.postNumber, writer:props.item.writer}}" tag="td">{{props.item.title}}</router-link>
                            <router-link :to="{name:'boardshow', params:{postNumber:props.item.postNumber, writer:props.item.writer}}" tag="td">{{props.item.writer}}</router-link>
                            <router-link :to="{name:'boardshow', params:{postNumber:props.item.postNumber, writer:props.item.writer}}" tag="td">{{props.item.createdAt.slice(0,10)}} {{props.item.createdAt.slice(11,19)}}</router-link>
                            <router-link :to="{name:'boardshow', params:{postNumber:props.item.postNumber, writer:props.item.writer}}" tag="td">{{props.item.views}}</router-link>
                          
                           </tr>
                        </template> 
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                             "{{search}}" no result.
                        </v-alert>
                    </v-data-table> 
                       <v-card-text class="text-xs-center">
                            <v-pagination v-model="pagination.page" :length="pages" ></v-pagination>
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
            _itmes:'',
            selected:'',
            pagination:
            {
                rowsPerPage:15,
                totalItems:'',
                page:1
            },
            headers: [
                {text:"게시글번호", value:"postNumber", sortable:false, align:"center"},
                {text:"제목", value:"title" ,sortable:false, align:"center"},
                {text:"작성자", value:"writer", sortable:false, align:"center"},
                {text:"작성일", value:"createdAt",sortable:false, align:"center"},
                {text:"조회수", value:"views", sortable:false, align:"center"}
            ]
        }
    },
  
  mounted(){
           this.$http.get('/board/list').then(response=>{
               this.items=response.data
               this.pagination.totalItems=this.items.length
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