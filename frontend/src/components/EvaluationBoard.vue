<template>

<v-card>
        <v-card-title>Search
            <v-spacer></v-spacer>
                <v-text-field v-model="search" label="제목 & 작성자" single-line
                    hide-details></v-text-field>
        </v-card-title>
                <v-card-text>
                    <v-data-table hide-actions
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
            pagination:{
                page:1,
                total:5,
                visible:7
            },
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
                },
                {
                    value:false,
                    title:'맥도날드의 가계부',
                    writer:'맥도날드',
                    date: '2018/11/07'
                },
                {
                    value:false,
                    title:'아이유의 가계부',
                    writer:'아이유',
                    date:'2018/10/31'
                },
                {
                    value:false,
                    title:'박재범의 가계부',
                    writer:'박재범',
                    date:'2018/11/01'
                }

            ]
        }
      }

    }
</script>

<style>
    
</style>