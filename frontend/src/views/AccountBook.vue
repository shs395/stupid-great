<template>
  <v-app id="account-book">
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
            <Account v-bind:data="{userid:userid}"/>
        </v-tab-item>
 
        <!-- 통계 -->
        <v-tab-item>
          <AccountChart v-bind:data="{userid:userid}"/>
        </v-tab-item>
    </v-tabs>
    
  </v-app>
</template>

<script>
import toolbar from '../components/toolbar'
import linkComponent from '../components/link'
import Account from '../components/Account.vue'

import AccountChart from '../components/AccountChart.vue'


import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

export default {
  name: 'account-book',
  data () {
    return {
      // is:true,
      userid:'jihye',
      selectedDate: null,
      startDate: null,
      endDate: null,
      selectedMonth: null,
      todayDate: new Date().toISOString().slice(0,10)
    };
  },
  components:{
    toolbar,
    linkComponent,
    VCalendar,
    Account,
    AccountChart
  },
  methods:{
    a_btn:function(){
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
