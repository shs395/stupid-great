<template>
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
</template>

<script>
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

export default {
  name: 'account-book',
  data () {
    return {
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
#td_1{
  text-align: center;
}
#edit-btn{
    position : fixed;
    margin: 0 0 50px 50px;
}
</style>
