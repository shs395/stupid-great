<template>

<div id="evaluation_board">
    <v-flex xs12 sm4 text-cs-center>
        <div>
            <v-btn id="writing_btn" small>글 작성하기</v-btn>
        </div>   
    </v-flex>

    <div>
        <v-app>
            <v-card>
                <v-card-title >제목 & 작성자
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" label="Search" single-line
                        hide-details></v-text-field>
                    </v-card-title>
                    <v-data-table 
                        :headers="headers"
                        :items="body"
                        :search="search">
                        
                        <template slot="items" slot-scope="data">
                            <td class="text-xs-left">{{data.item.title}}</td>
                            <td class="text-xs-left">{{data.item.writer}}</td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icoon="warning">
                            Your Search for "{{search}}" found no results.
                        </v-alert>
                    </v-data-table>
                </v-card>
            </v-app>
        </div>  
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
   
</template>

<script>
export default {
    name:'EvaluationBoard',

    data: function(){
        return {
            headers: [
                {
                    text : '제목',
                    align: 'left',
                    sortable: false,
                    value: 'title'
                },
                {
                    text: '작성자',
                    value:'writer'

                }

            ],
            body:[
                {
                    value:false,
                    title:'서강준의 가계부',
                    writer:'서강준'
                },
                {
                    value:false,
                    title:'강동원의 가계부',
                    writer:'강동원'
                },
                {
                    value:false,
                    title:'아이린의 가계부',
                    writer:'아이린'
                }
            ]
        }
      }

    }
</script>

<style>
    
</style>