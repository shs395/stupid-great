<template>
  <v-toolbar dark color="cyan">
    <v-toolbar-title color="white" v-on:click="titleClick">Stupid? Great!</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn round color="cyan darken-1" href="/account-book">나의 가계부</v-btn>
    <v-btn round color="cyan darken-1" href="/statistic">통계</v-btn>
    <v-btn round color="cyan darken-1" href="/evaluation">가계부 보기</v-btn>
    <v-btn round color="cyan darken-1" href="/stupid-great-community">살까? 말까?</v-btn>

    <v-menu offset-y>
      <v-btn slot="activator" icon>
        <v-icon>face</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-on:click="OnClicksignin">
          <v-list-tile-title>Sign In</v-list-tile-title>
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

    methods:{
      titleClick (){
        return location.href="/";
      },
      OnClicksignin (){
        return location.href="/signin";
      }
    }
}
</script>
