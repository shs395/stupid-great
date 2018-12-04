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
            </v-card>
            {{selectedDate}}
        </v-flex>
        <v-flex xs6 >
            <AccountShow v-if="selectedDate==null" v-bind:data="{is:'수입', selectedDate:currentDate, y:parseInt(currentDate.slice(0,4)), m:parseInt(currentDate.slice(5,7)), d:parseInt(currentDate.slice(8,10)) }"/>
            <AccountShow v-else v-bind:data="{is:'수입', selectedDate:selectedDate,y:parseInt(selectedDate.slice(0,4)), m:parseInt(selectedDate.slice(5,7)), d:parseInt(selectedDate.slice(8,10))  }"/>
        </v-flex>
        <v-flex xs6>
            <AccountShow v-if="selectedDate==null" v-bind:data="{is:'지출', selectedDate:currentDate, y:parseInt(currentDate.slice(0,4)), m:parseInt(currentDate.slice(5,7)), d:parseInt(currentDate.slice(8,10)) }"/>
            <AccountShow v-else v-bind:data="{is:'지출', selectedDate:selectedDate, y:parseInt(selectedDate.slice(0,4)), m:parseInt(selectedDate.slice(5,7)), d:parseInt(selectedDate.slice(8,10)) }"/>
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
        selectedDate: null,
        g_accounts:[],
        l_accounts:[],
        currentDate: new Date().toISOString().slice(0,10)
    };
  },
  components:{
    VCalendar,
    AccountShow
  },
  methods:{
    //   get_accounts:function(){
    //       if(this.selectedDate!=null){
    //         this.y=parseInt(this.selectedDate.slice(0,4))
    //         this.m=parseInt(this.selectedDate.slice(5,7))
    //         this.d=parseInt(this.selectedDate.slice(8,10))
            
    //         var api = 'http://localhost:3000/account/list/'+this.$session.get('id')+'/'+this.selectedDate+'/'+'수입';
    //         this.$http.get(api)
    //         .then((result)=>{
    //             this.g_accounts = result.data
    //             console.log(this.g_accounts)
    //             this.$http.get('http://localhost:3000/account/list/'+this.$session.get('id')+'/'+this.selectedDate+'/'+'지출')
    //             .then((result)=>{ 
    //                 this.l_accounts = result.data
    //                 console.log(result)
    //             })
    //             .catch((err)=>{
    //                 console.log(err)
    //             })
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    //       }
    //   }
  },
  mounted:function(){
    //   this.currentDate= new Date().slice(0,10) 
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
