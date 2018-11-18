<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['지출 평균', '수입 평균','식비','교통비'],
      datasets: [
        {
          label: '다른 사람들',
          backgroundColor: '#f87979',
          data : [20,21,22,21]
        },
        {
          label:'나',
          backgroundColor: '#f879798',
          data : [21,21,22,21]      
        }
      ],
      xAxisID :'hi'
    },{scales: {
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
