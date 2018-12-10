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
        <v-tab-item>
            <Account/>
        </v-tab-item>
        <v-tab-item>
          <AccountChart/>
        </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import toolbar from '../components/toolbar'
import Account from '../components/Account.vue'
import AccountChart from '../components/AccountChart.vue'

export default {
  name: 'account-book',
  components:{
    toolbar,
    Account,
    AccountChart
  }
}

</script>

<style>
</style>
