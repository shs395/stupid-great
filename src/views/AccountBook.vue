<template>
  <div id="account-book">
    <toolbar />
    <v-tabs fixed-tabs>
        <v-tab>
            가계부 보기
        </v-tab>
        <v-tab>
            통계 보기
        </v-tab>
        <v-tab-item>
            <v-date-picker
              mode='single'
              v-model='selectedDate'
              color="green lighten-1"
              :theme-styles='themeStyles'
              is-inline 
              >
            </v-date-picker>
            <div>{{selectedDate}}</div>
            <v-btn
              color="indigo lighten-2"
              dark
              large
              absolute
              bottom
              right
              fab
              id="edit-btn"
            >
              <v-icon>edit</v-icon>
            </v-btn>
        </v-tab-item>
        <v-tab-item>
              <!-- <v-date-picker
                mode='range'
                v-model='selectedDateRange'
                show-caps>
              </v-date-picker> -->
            <v-btn
              color="indigo lighten-2"
              dark
              large
              absolute
              bottom
              right
              fab
              id="edit-btn"
            >
              <v-icon>edit</v-icon>
            </v-btn>
        </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import toolbar from '../components/toolbar'
import linkComponent from '../components/link'

import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

// import Vue from 'vue'
// import {FullCalendar} from 'vue-full-calendar'
// import 'fullcalendar/dist/fullcalendar.css'
// Vue.use(VCalendar);
// Vue.use(FullCalendar);

export default {
  name: 'account-book',
  data () {
    return {
      // is:true,
      selectedDate: null,
      selectedDateRange: {
        // start: null,
        // end: new Date()
      }
    };
  },
  components:{
    toolbar,
    linkComponent,
    VCalendar
  },
  methods:{
    a_btn:function(){
      this.is=true;
      var year = this.selectedDate[0]+this.selectedDate[1]+this.selectedDate[2]+this.selectedDate[3];
      var month = this.selectedDate[5]+this.selectedDate[6];
      var day = this.selectedDate[8]+this.selectedDate[9];
      alert('year: '+year+' month: '+month+ ' day : '+day)
    }
  }
}

</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
}
#td_1{
  text-align: center;
}
#edit-btn{
    position : fixed;
    margin: 0 0 50px 50px;
}
</style>
