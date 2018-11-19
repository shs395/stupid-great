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
        <!-- 가계부 -->
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

            <!-- edit 버튼 -->
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

        <!-- 통계 -->
        <v-tab-item>
              <!-- <v-flex xs12 sm6 md4>
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="date"
                    label="Picker in menu"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer> -->
              <!-- <v-flex xs12 sm6 md4>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="date"
                    label="Picker in dialog"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex> -->
              <v-flex xs12 sm6 md4>
                <v-menu
                  :close-on-content-click="ture"
                  v-model="menu1"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
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
              <v-flex xs12 sm6 md4>
                <v-menu
                  :close-on-content-click="ture"
                  v-model="menu2"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
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
              <v-spacer></v-spacer>
<!-- <input type="submit" v-on:click="a_btn" value="ADD" id="add">
       -->
            <!-- edit 버튼 -->
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
    <!-- <v-layout row wrap>
    </v-layout> -->
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
      startDate: null,
      endDate: null,
      todayDate: new Date().toISOString().slice(0,10)
    };
  },
  components:{
    toolbar,
    linkComponent,
    VCalendar
  },
  methods:{
    a_btn:function(){
      // this.is=true;
      // var year = this.selectedDate[0]+this.selectedDate[1]+this.selectedDate[2]+this.selectedDate[3];
      // var month = this.selectedDate[5]+this.selectedDate[6];
      // var day = this.selectedDate[8]+this.selectedDate[9];
      // alert('year: '+year+' month: '+month+ ' day : '+day)
      alert(this.todayDate)
    }
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
