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
                    @change="get_accounts"
                    >
                </v-date-picker>
            </v-card>
        </v-flex>
        <v-flex xs6 >
            <AccountShow v-bind:data="{is:'수입', date:selectedDate, id:data.id, accounts: g_accounts}"/>
        </v-flex>
        <v-flex xs6>
            <AccountShow v-bind:data="{is:'지출', date:selectedDate, id:data.id, accounts: l_accounts}"/>
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
  props:["data"],
  data () {
    return {
      // is:true,
      selectedDate: null,
      g_accounts:[],
      l_accounts:[]
    };
  },
  components:{
    VCalendar,
    AccountShow
  },
  methods:{
      get_accounts:function(){
          if(this.selectedDate!=null){
            var api = 'http://localhost:3000/account/list/'+this.data.id+'/'+this.selectedDate+'/'+'수입';
            this.$http.get(api)
            .then((result)=>{
                this.g_accounts = result.data
                console.log(this.g_accounts)
                this.$http.get('http://localhost:3000/account/list/'+this.data.id+'/'+this.selectedDate+'/'+'지출')
                .then((result)=>{ 
                    this.l_accounts = result.data
                    console.log(result)
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch((err)=>{
                console.log(err)
            })
          }
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
