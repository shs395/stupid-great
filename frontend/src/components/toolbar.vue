<template>
  <v-toolbar dark color="cyan">
    <v-toolbar-title color="white" v-on:click="titleClick">Stupid? Great!</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn round color="cyan darken-1" v-on:click="accountbook">나의 가계부</v-btn>
    <v-btn round color="cyan darken-1" v-on:click="statistic">통계</v-btn>
    <v-btn round color="cyan darken-1" v-on:click="evaluation">가계부 보기</v-btn>
    <v-btn round color="cyan darken-1" v-on:click="SGcommunity">살까? 말까?</v-btn>

    <v-menu offset-y>
      <v-btn slot="activator" icon>
        <v-icon>face</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-show="checksignin" v-on:click="OnClicksignin">
          <v-list-tile-title>Sign In</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-show="checklogout" v-on:click="OnClicklogout">
          <v-list-tile-title>Log out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
    name : 'toolbar',
    data (){
      return{

      }
    },
    computed:{
      checksignin (){
        if (!this.$session.exists()) {
          return true
        }else{
          return false
        }
      },
      checklogout (){
        if (!this.$session.exists()) {
          return false
        }else{
          return true
        }
      },
    },

    methods:{
      titleClick (){
        return location.href="/";
      },
      OnClicksignin (){
        return location.href="/signin";
      },
      OnClicklogout() {
        this.$session.destroy()
        this.$router.push('/signin')
      },
      accountbook (){
        if (this.$session.exists()) {
          return location.href="/account-book";
        }else{
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
        }
      },
      statistic (){        
        if (this.$session.exists()) {
          return location.href="/statistic";
        }else{
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
        }
      },
      evaluation (){
        if (this.$session.exists()) {
          return location.href="/evaluation";
        }else{
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
        }
      },
      SGcommunity (){
        if (this.$session.exists()) {
           return location.href="/stupid-great-community";
        }else{
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
        }
      }
    }
}
</script>
