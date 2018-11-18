<template>
  <v-toolbar dark color="cyan">
    <v-toolbar-title class="white--text">Stupid? Great!</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn round color="cyan darken-1" href="/account-book">나의 가계부</v-btn>
    <v-btn round color="cyan darken-1" href="/statistic">통계</v-btn>
    <v-btn round color="cyan darken-1" href="/evaluation">가계부 보기</v-btn>
    <v-btn round color="cyan darken-1" href="/stupid-great-community">살까? 말까?</v-btn>

    <v-btn icon>
      <v-icon>face</v-icon>
    </v-btn>

  </v-toolbar>
</template>

<script>
export default {
    name : 'toolbar',
    props : [

    ]
}
</script>
