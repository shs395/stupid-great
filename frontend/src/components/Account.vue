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
            <AccountShow v-bind:data="{is:'수입', date:selectedDate, userid:data.userid, accounts: g_accounts}"/>
        </v-flex>
        <v-flex xs6>
            <AccountShow v-bind:data="{is:'지출', date:selectedDate, userid:data.userid, accounts: l_accounts}"/>
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
<<<<<<< HEAD
            var api = 'http://localhost:3000/account/list/'+this.data.userid+'/'+this.selectedDate+'/'+'수입';
=======
            var api = '/account/list/'+this.userid+'/'+this.selectedDate+'/'+'수입';
>>>>>>> 7455468bc0e2c3757fda6f648d669be3f25b280e
            console.log(api)
            this.$http.get(api)
            .then((result)=>{
                
                this.g_accounts = result.data
                console.log(this.g_accounts)
<<<<<<< HEAD
                this.$http.get('http://localhost:3000/account/list/'+this.data.userid+'/'+this.selectedDate+'/'+'지출')
=======
                this.$http.get('/account/list/'+this.userid+'/'+this.selectedDate+'/'+'지출')
>>>>>>> 7455468bc0e2c3757fda6f648d669be3f25b280e
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
