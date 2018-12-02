<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default {
  extends: Bar,
  props:{
    chartdata:{
      type : Object,
      default : null
    },
    options:{

    }
  },

  
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(
    //charData
    this.chartdata,
    //options
      {
        scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                },
              }],
            },
        responsive: true,
        maintainAspectRatio: false,
      })
  }
}


</script>

<style>

</style>



{
        labels: ['지출 평균', '수입 평균'],
        datasets: [
          {
            label: '다른 사람들',
            backgroundColor: '#f87979',
            data : [20,21]
          },
          {
            label:'나',
            backgroundColor: '#f879798',
            data : [21,21]      
          }
        ],
        xAxisID :'hi'
      },