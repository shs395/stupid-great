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
  },
  beforeCreate: function () {
      if (!this.$session.exists()) {
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
      }
    },
}

</script>

<style>
</style>
