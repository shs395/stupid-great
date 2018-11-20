<template>
    <v-layout row>
        <v-flex>
            <v-card height="100%">
                <v-date-picker
                    mode='single'
                    v-model='selectedDate'
                    color="green lighten-1"
                    :theme-styles='themeStyles'
                    is-inline 
                    >
                </v-date-picker>
                <div>{{selectedDate}}</div>
            </v-card>
        </v-flex>
        <v-flex xs6>
            <AccountShow v-bind:data="{is:'수입', date:selectedDate}"/>
        </v-flex>
        <v-flex xs6>
            <AccountShow v-bind:data="{is:'지출', date:selectedDate}"/>
        </v-flex>
    </v-layout>
</template>

<script>
import toolbar from '../components/toolbar'
import linkComponent from '../components/link'
import AccountShow from '../components/AccountShow'

import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

export default {
  name: 'account',
  data () {
    return {
      // is:true,
      selectedDate: null,
    };
  },
  components:{
    VCalendar,
    AccountShow
  }
}

</script>

<style>
#td_1{
  text-align: center;
}
#edit-btn{
    position : fixed;
    margin: 0 0 50px 50px;
}
</style>
