<template>
  <div>
    <v-card>
      <v-layout row wrap>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-flex xs3>
            <v-menu
              :close-on-content-click="false"
              v-model="menu1"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
            >
              <v-text-field
                slot="activator"
                v-model="startDate"
                label="start day"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="startDate" @input="menu1 = false" @change="change"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-flex xs3>
            <v-menu
              :close-on-content-click="false"
              v-model="menu2"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
            >
              <v-text-field
                slot="activator"
                v-model="endDate"
                label="end day"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="endDate" @input="menu2 = false" :min = "startDate" @change="change"></v-date-picker>    
            </v-menu>
          </v-flex>
          <!-- <v-spacer></v-spacer> -->
          <v-btn slot="activator" color="orange" dark v-on:click="show" id="show">통계 보기</v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </v-card>
      <v-layout row>
        <v-flex xs6>
            <v-card>
                <v-card-text v-if="is_show==true">
                  {{startDate}} ~ {{endDate}}에 대한 수입 통계 
                <chartjs-doughnut v-if="is_show==true" :labels="g_labels" :datasets="[{data:g_data, backgroundColor: g_backgroundColor}]" :option="g_options"></chartjs-doughnut>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs6>
            <v-card>
                <v-card-text v-if="is_show==true">
                  {{startDate}} ~ {{endDate}}에 대한 지출 통계 
                  <chartjs-doughnut v-if="is_show==true" :labels="l_labels" :datasets="[{data:l_data, backgroundColor: l_backgroundColor}]" :option="l_options"></chartjs-doughnut>
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
    data () {
      return {
        
        gain:[0,0,0,0,0,0],
        lose:[0,0,0,0,0,0,0,0,0,0,0,0],
        g_data:[0,0,0,0,0,0],
        g_backgroundColor:[
          "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#78909C"
        ],
        l_data:[0,0,0,0,0,0,0,0,0,0,0,0],
        l_backgroundColor:[
          "#FF6384","#36A2EB","#FFCE56","#F56314","#32A21B","#7E57C2",
          "#D4E157","#3D5AFE","#26A69A","#BA68C8","#795548","#78909C"
        ],
        is_show: false,
        g_labels : ['월급', '부수입', '용돈', '상여', '금융소득', '기타'],
        g_options:{
          title: {
            display: true,
            position: 'bottom',
            text: '수입 차트'
          }
        },
        l_labels : ['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타'],
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
        else if(this.startDate>this.endDate){
          alert('시작 날짜와 끝 날짜를 다시 설정해 주세요')
        }
        else{this.is_show = false
          this.$http.get('/account/list/'+this.$session.get('id')+'/'+this.startDate+'/'+this.endDate+'/'+'수입')
          .then((result)=>{
            this.g_data = result.data
            this.$http.get('/account/list/'+this.$session.get('id')+'/'+this.startDate+'/'+this.endDate+'/'+'지출')
            .then((result)=>{
              this.l_data = result.data
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
      },
    },
    components:{
      VCalendar,
    },

  }
</script>

<style>
</style>
