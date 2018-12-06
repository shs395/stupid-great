<template>
    <div>
        <v-layout row>
            <v-flex>
        <chartjs-pie  :labels="in_items.category" 
             :datasets="[{data:in_items.price, backgroundColor: in_backgroundColor}]"
            :option="in_options"></chartjs-pie> 
            <v-flex>
            <v-flex>

       <chartjs-doughnut 
                         :option="out_options"></chartjs-doughnut>
            </v-flex>
        </v-layout>
    </div>
</template>



<script>

import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'
export default {
    name:'BoardChart',
    props:{

    },
    data(){
        return{
        in_items:'',
        out_items:'',
        in_backgroundColor:[
          "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#F1C15F"
        ],
         out_backgroundColor:[
          "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#F1C15F",
          "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#F1C15F"
        ],
        in_labels : ['월급', '부수입', '용돈', '상여', '금융소득', '기타'],
        in_options:{
          title: {
            display: true,
            position: 'bottom',
            text: '나의 수입'
              }
            },
        out_labels : ['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타'],
        out_options:{
          title: {
            display: true,
            position: 'bottom',
            text: '나의 지출'
             }
          },

        }
    },methods:{
          get_in_account(){
                this.$http.get(`/board/in/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.in_items=response.data
                    console.log(this.in_items)}).catch((err)=>console.log(err))
            },
            get_out_account(){
                this.$http.get(`/board/out/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.out_items=response.data
                    for(var i=0;i<this.out_items.category; i++)
                    console.log(out_items[i].category)
                    console.log(this.out_items)}).catch((err)=>console.log(err))
            }
        },
    mounted() {
        this.get_in_account(),
        this.get_out_account()
    },
}
</script>
