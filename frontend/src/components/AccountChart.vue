<template>
  <div>
    <v-card>
          <v-layout row wrap>
            <v-flex xs5 sm6 md4>
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
                <v-date-picker v-model="startDate" @input="menu1 = false" :max = "todayDate"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs5 sm6 md4>
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
                <v-date-picker v-model="endDate" @input="menu2 = false" :min = "startDate" :max = "todayDate"></v-date-picker>    
              </v-menu>
            </v-flex>
            <!-- <v-date-picker v-model="selectedMonth" type="month"></v-date-picker> -->
            <v-spacer></v-spacer>
          </v-layout>
    </v-card>
    <v-layout row>
      <v-flex xs10>
          <v-card>
              <v-card-text v-if="startDate!=null && endDate!=null">
                {{startDate}} ~ {{endDate}}에 대한 수입 통계 
              <chartjs-doughnut v-if="startDate!=null && endDate!=null" :labels="g_labels" :datasets="g_datasets" :option="g_options"></chartjs-doughnut>
              </v-card-text>
          </v-card>
      </v-flex>
      <v-flex xs10>
          <v-card>
              <v-card-text v-if="startDate!=null && endDate!=null">
                {{startDate}} ~ {{endDate}}에 대한 지출 통계 
                <chartjs-doughnut :labels="l_labels" :datasets="l_datasets" :option="l_options"></chartjs-doughnut>
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
    data () {
      return {
        g_labels : ['월급', '부수입', '용돈', '상여', '금융소득', '기타'],
        g_datasets : [
          {
            data:[60,5,5,10,5,15],
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
            data:[20,15,15,10,5,5,5,5,5,5,5,5],
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
    components:{
      VCalendar
    },

  }
</script>

<style>
</style>
