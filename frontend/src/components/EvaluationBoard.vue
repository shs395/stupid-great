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
                        :pagination.sync="pagination">
                     
                         <template slot="items" slot-scope="props"> 
                           <tr @click="readData(props.item)">
                            <td class="text-xs-center">{{props.item.postNumber}}</td>
                            <td class="text-xs-center">{{props.item.title}}</td>
                            <td class="text-xs-center">{{props.item.writer}}</td>
                            <td class="text-xs-center">{{props.item.createdAt}}</td>
                           </tr>
                        </template> 

                        
            
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                             "{{search}}" no result.
                        </v-alert>
                   </v-data-table> 
              
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
            selected:[],
            pagination:{
                 page:1,
                 total:5,
                visible:7
            },
            headers: [
                {text:"게시글번호", value:"postNumber", sortable:false, align:"center"},
                {text:"제목", value:"title" ,sortable:false, align:"center"},
                {text:"작성자", value:"writer", sortable:false, align:"center"},
                {text:"작성일", value:"createdAt",sortable:false, align:"center"}
            ],   
        }
    },
    methods:{
        // readData(){
        //     alert('게시글 페이지로 이동합니다!')
        //      return location.href="/boardshow";        
        //}
        readData(a){
             if (event.target.classList.contains('btn__content')) return;
             alert(a.title+'게시글로 이동합니다');
             this.$router.push('/boardshow')
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