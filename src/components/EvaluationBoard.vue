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
            <v-card-title>V I E W</v-card-title>
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
                            <td class="text-xs-left">{{data.item.date}}</td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                             "{{search}}" no result.
                        </v-alert>
                    </v-data-table>
                   <v-card-text class="text-xs-center">
                       <v-pagination v-model="page" :length="5"></v-pagination>
                    </v-card-text>
                </v-card>
            </v-app>
        </div>  
</div>
</template>

<script>
export default {
    name:'EvaluationBoard',

    data: function(){
        return {
            search: '',
            page:1,
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
                },
                {
                    text: '작성일',
                    value: 'date'
                }

            ],
            body:[
                {
                    value:false,
                    title:'서강준의 가계부',
                    writer:'서강준',
                    date: '2018/11/11'
                },
                {
                    value:false,
                    title:'강동원의 가계부',
                    writer:'강동원',
                     date: '2018/11/10'
                },
                {
                    value:false,
                    title:'아이린의 가계부',
                    writer:'아이린',
                     date: '2018/11/19'
                }
            ]
        }
      }

    }
</script>

<style>
    
</style>