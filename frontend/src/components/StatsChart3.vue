<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default {
  extends: Bar,
  props:['dataMe','dataOthers'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['지출 평균','식비','교통/차량','문화생활','마트/편의점','패션/미용','생활용품','주거/통신','건강','교육','경조사/회비','가족','기타'],
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
