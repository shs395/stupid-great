<template>
  <div>
    <v-card>
          <v-layout row wrap>
            <v-flex xs4 sm6 md4>
              <v-menu
                :close-on-content-click="ture"
                v-model="menu1"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="100px"
              >
                <v-text-field
                  slot="activator"
                  v-model="startDate"
                  label="start day"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="startDate" @input="menu1 = false" :max = "todayDate" @change="change"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs4 sm6 md4>
              <v-menu
                :close-on-content-click="ture"
                v-model="menu2"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="100px"
              >
                <v-text-field
                  slot="activator"
                  v-model="endDate"
                  label="end day"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="endDate" @input="menu2 = false" :min = "startDate" :max = "todayDate" @change="change"></v-date-picker>    
              </v-menu>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn slot="activator" color="orange" dark v-on:click="show" id="show">통계 보기</v-btn>
            <!-- <v-date-picker v-model="selectedMonth" type="month"></v-date-picker> -->
            <v-spacer></v-spacer>
          </v-layout>
    </v-card>
    <v-layout row>
      <v-flex xs10>
          <v-card>
            <!-- v-if="startDate!=null && endDate!=null -->
              <v-card-text v-if="is_show==true">
                {{startDate}} ~ {{endDate}}에 대한 수입 통계 
              <chartjs-doughnut v-if="is_show==true" :labels="g_labels" :datasets="g_datasets" :option="g_options"></chartjs-doughnut>
              </v-card-text>
          </v-card>
      </v-flex>
      <v-flex xs10>
          <v-card>
              <v-card-text v-if="is_show==true">
                {{startDate}} ~ {{endDate}}에 대한 지출 통계 
                <chartjs-doughnut v-if="is_show==true" :labels="l_labels" :datasets="l_datasets" :option="l_options"></chartjs-doughnut>
              </v-card-text>
          </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

  export default{
    name : 'AccountChart',
    props:["data"],
    data:{

    },
    data () {
      return {
        gain:[10,0,0,90,0,0],
        lose:[0,0,50,0,50,0,0,0,0,0,0,0],
        gain_all:0,
        lose_all:0,
        is_show: false,
        g_labels : ['월급', '부수입', '용돈', '상여', '금융소득', '기타'],
        g_datasets : [
          {
            data:[10,0,0,90,0,0],
            backgroundColor:[
              "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#F1C15F"
            ],
          }
        ],
        g_options:{
          title: {
            display: true,
            position: 'bottom',
            text: '수입 차트'
          }
        },
        l_labels : ['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타'],
        l_datasets : [
          {
            data:[0,0,50,0,50,0,0,0,0,0,0,0],
            backgroundColor:[
              "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#F1C15F",
              "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#F1C15F"
            ]
          }
        ],
        l_options:{
          title: {
            display: true,
            position: 'bottom',
            text: '지출 차트'
          }
        },
        
        startDate: null,
        endDate: null,
        todayDate: new Date().toISOString().slice(0,10)
      };
    },
    methods:{
      show:function(){
        if(this.startDate==null) alert('시작 날짜를 선택해 주세요')
        else if(this.endDate==null) alert('끝 날짜를 입력해 주세요')
        else{
          this.$http.get('http://localhost:3000/account/list/'+this.data.id+'/'+this.startDate+'/'+this.endDate+'/'+'수입')
          .then((result)=>{
            this.gain = result.data
            alert(this.gain)
            this.g_datasets.data = this.gain
            alert(this.g_datasets.data)
            this.$http.get('http://localhost:3000/account/list/'+this.data.id+'/'+this.startDate+'/'+this.endDate+'/'+'지출')
            .then((result)=>{
              this.lose = result.data
              alert(this.lose)
              this.l_datasets.data=this.lose;
              alert(this.l_datasets.data)
              this.is_show=true;
            })
            .catch((err)=>{
              console.log(err)
            })

            
          })
          .catch((err)=>{
            console.log(err)
          })

          

        }
      },
      change:function(){
        this.is_show = false
        for(var i = 0;i<6;i++) gain[i]=0;
        for(var i = 0;i<12;i++) lose[i]=0;
      }
    },
    components:{
      VCalendar
    },

  }
</script>

<style>
</style>
