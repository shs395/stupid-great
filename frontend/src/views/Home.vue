<template>
<div id="home">
  <toolbar/>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>

   <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h1 id="homeTitle">당신을 위한 가계부 시스템!</h1>
              <span class="subheading">
                효율적인 자산관리 
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md3>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">account_balance_wallet</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">나의 가계부 관리</div>
                    </v-card-title>
                    <v-card-text>
                      가계부를 사용해 현재 내가 돈을 얼마나 사용했고, 어디다가 사용했는지, 잔고가 얼마인지 알게되어 계획적으로 돈을 사용할 수 있다.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md3>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">bar_chart</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">사용자들의 지출, 수입 통계</div>
                    </v-card-title>
                    <v-card-text>
                      사용자들의 지출과 수입 통계를 통해 내 또래 친구들은 자금을 어떻게 관리하고 사용하는지 분석 할 수 있다. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md3>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">list_alt</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">가계부 조언 얻기</div>
                    </v-card-title>
                    <v-card-text>
                      다른 사용자의 가계부를 보며 자금관리에 대한 기준을 참고할 수 있다.
                      나의 가계부를 다른 사용자들에게 공개함으로써 앞으로의 자금관리에 대한 조언을 얻을 수 있다. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                 <v-flex xs12 md3>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">shopping_cart</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">살까? 말까?</div>
                    </v-card-title>
                    <v-card-text>
                      충동적으로 사고싶거나 먹고싶은 것들에 대해 다른 사용자들의 의견을 들어보고 충동구매를 막을 수 있다. 
                      구매하고자 하는 물건에 대해 다른 사용자들의 의견을 듣고 더 쉽게 결정할 수 있도록 한다.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      <LinkFooter />
</div>
</template>

<script>

  import linkComponent from '../components/link'
  import toolbar from '../components/toolbar'
  import LinkFooter from '../components/link.vue'

  export default {
    components: {

      linkComponent,
      toolbar,
      LinkFooter,
    },

    data () {
      return {
        items: [
          {
            src: '/static/img/money1.jpg'
          },
          {
            src: '/static/img/money2.jpg'
          },
          {
            src: '/static/img/money3.jpg'
          }
        ]
      }
    }
  }
</script>

<style>
#home{
  text-align: center;
}

#homeTitle{
  font-size: 40px;
  color:#AB47BC;
}

#links{
  text-align: center;
  width: 1440px;
  margin: 0 auto;
}

</style>

