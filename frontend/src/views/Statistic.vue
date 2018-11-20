<template>
  <div>
    <toolbar></toolbar>
    <v-container fluid>
      <v-layout row>
        
        <v-flex xs5>
          <StatsCondition></StatsCondition>
        </v-flex>

        <v-flex xs7>
          <v-card>
            <v-card-title>
              통계
            </v-card-title>
            <v-card-text>
              <StatsChart></StatsChart>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    

  </div>
</template>

<script>
  import toolbar from '../components/toolbar.vue'
  import StatsCondition from '../components/StatsCondition.vue'
  import StatsChart from '../components/StatsChart.vue'

  export default{
    name: 'statistic',

    components:{
    toolbar,
    StatsCondition,
    StatsChart
    }
  }
</script>

<style>

</style>
