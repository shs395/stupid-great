<template>
    <div>
        <v-layout row>
            <v-flex>
                 
            </v-flex> 
        </v-layout>
    </div>
</template>

<script>

import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'
export default {
    name:'BoardChart',
    props:["data"],
    data(){
        return{
       // in_items:[0,0,0,0,0,0],
        test:[10,20,304,50,60,70],
        out_items:[0,0,0,0,0,0,0,0,0,0,0,0],
        labels_in:['월급', '부수입', '용돈', '상여', '금융소득', '기타'],
        labels_out:['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타'],
        in_bgcolor:["#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#F1C15F"],
        out_bgcolor:[ "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#F1C15F",
          "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#F1C15F"],
        options:{
            title:'income'
            },
        loaded:false
         }
    },
    methods:{
          get_in_account(){
                this.$http.get(`/board/in/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.in_items=response.data
                    console.log(response.data.length)
                    // for(var i=0; i<response.data.length; i++){
                    //     this.in_items[i] += response.data[i]
                    // }
                    this.loaded=true
                    console.log(this.in_items)
                     console.log(response.data)
                    console.log(this.in_items)}).catch((err)=>console.log(err))
            },
            get_out_account(){
                this.$http.get(`/board/out/${this.$route.params.postNumber}/${this.$route.params.writer}`).then(response=>{
                    this.out_items=response.data
                    console.log(this.out_items)}).catch((err)=>console.log(err))
            },
   
    
    }

}


    
</script>
