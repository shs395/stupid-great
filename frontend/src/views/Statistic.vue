<template>
  <div>
    <toolbar></toolbar>
    <v-container fluid>
      <!-- <v-layout row>
        
        <v-flex xs5>
          <StatsCondition></StatsCondition>
        </v-flex>

        <v-flex xs7>
          <v-card>
            <v-card-title>
              0000 년 00 월 통계
            </v-card-title>
            <v-card-text>
              <StatsChart></StatsChart>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout> -->

      <v-layout column>
        <v-flex>
          <v-card>
            
            <v-card-text>
              0000 년 00 월 통계
              <StatsChart></StatsChart>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <StatsCondition></StatsCondition>
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
