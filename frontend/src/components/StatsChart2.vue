<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default {
  extends: Bar,
  props:['dataMe','dataOthers'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['수입 평균','월급', '부수입', '용돈', '상여', '금융소득', '기타'],
      datasets: [
        {
          label:'나',
          backgroundColor: '#f879798',
          data : this.dataMe
        },
        {
          label: '다른 사람들',
          backgroundColor: '#f87979',
          data : this.dataOthers
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
