<template>
    <v-layout row>
        <v-flex>
            <v-date-picker
                mode='single'
                v-model='selectedDate'
                color="green lighten-1"
                :theme-styles='themeStyles'
                is-inline 
                >
            </v-date-picker>
        </v-flex>
        <v-flex xs6>
            <AccountShow v-bind:data="{is:'수입', selectedDate:selectedDate,y:parseInt(selectedDate.slice(0,4)), m:parseInt(selectedDate.slice(5,7)), d:parseInt(selectedDate.slice(8,10))  }"/>
        </v-flex>
        <v-flex xs6>
            <AccountShow v-bind:data="{is:'지출', selectedDate:selectedDate, y:parseInt(selectedDate.slice(0,4)), m:parseInt(selectedDate.slice(5,7)), d:parseInt(selectedDate.slice(8,10)) }"/>
        </v-flex>
    </v-layout>
</template>

<script>
import AccountShow from '../components/AccountShow'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

export default {
  name: 'account',
  props:["data"],
  data () {
    return {
        selectedDate: new Date().toISOString().slice(0,10),
    };
  },
  components:{
    VCalendar,
    AccountShow
  }
}

</script>

<style>
</style>
