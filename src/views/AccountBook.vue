<template>
  <div id="account-book">
    <toolbar />
    <button v-on:click="a_btn">가계부</button>
    <button v-on:click="s_btn">통계</button>
    <span v-if="is==true">
      <br><br>
      <v-date-picker
        mode='single'
       
        v-model='selectedDate'
        :theme-styles='themeStyles'
        is-inline 
        >
      </v-date-picker>
      <div>{{selectedDate}}</div>
    
    </span>
    <span v-if="is==false">
      <br>통계~~~
    </span>
    <linkComponent />
  </div>
</template>

<script>
import toolbar from '../components/toolbar'
import linkComponent from '../components/link'

//import VCalendar from 'v-calendar'
//import 'v-calendar/lib/v-calendar.min.css'

// import Vue from 'vue'
// import {FullCalendar} from 'vue-full-calendar'
// import 'fullcalendar/dist/fullcalendar.css'
// Vue.use(VCalendar);
// Vue.use(FullCalendar);

export default {
  name: 'account-book',
  data () {
    return {
      is:true,
      selectedDate: null,
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
    },
    s_btn:function(){
      this.is=false;
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#td_1{
  text-align: center;
}
</style>
