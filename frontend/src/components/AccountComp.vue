<template>
    <v-layout row @click="doChange">
      <v-flex xs3>
        <v-card flat tile>
          {{data.category}}
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card flat tile>
          {{data.name}}
        </v-card>
      </v-flex>
      <v-flex xs3 >
        <v-card flat tile>
          {{data.price}}
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card flat tile>
           <v-rating v-model="rate" readonly="readonly" small></v-rating>
        </v-card>
      </v-flex>
      <!-- <v-dialog v-model="dialog"  persistent max-width="600px" v-if="dialog==true">
        <v-card>
          <v-form ref="form">
            <v-card-title>
              <span class="headline">가계부 수정</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 class="changeData">
                    날짜: {{data.y}}년 {{data.m}}월 {{data.d}}일
                  </v-flex>
                  <v-flex xs12 class="changeData">
                    <br>
                    분류: {{data.is}}
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="금액" type="number" required v-model="changePrice" :rules="[v => !!v || '가격을 작성해 주세요']"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="이름" type="string" required v-model="changeName" :rules="[v => !!v || '이름을 작성해 주세요']"></v-text-field>
                  </v-flex> 
                  <v-flex xs12>
                    <span v-if="data.is=='수입'">
                    <v-select
                      :items="['월급', '부수입', '용돈', '상여', '금융소득', '기타']"
                      label="항목"
                      required
                      v-model="changeCategory"
                      :rules="[v => !!v || '항목을 선택해 주세요']"
                    ></v-select>
                    </span>
                    <span v-else>
                      <v-select
                      :items="['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타']"
                      label="카테고리"
                      required
                      v-model="changeCategory"
                      :rules="[v => !!v || '항목을 선택해 주세요']"
                      ></v-select>
                    </span>
                  </v-flex>
                  <v-flex xs12>
                    <v-rating v-model="changeRate" :rules="[v => !!v || '평가를 해주세요']"></v-rating>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat  v-on:click="doneChange">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog> -->
    </v-layout>
     
</template>

<script>
export default {
  name: "AccountComp",
  props:["data"],
  methods:{
      doChange:function(){
          // alert(this.changePrice+ this.changeName+this.changeCategory+this.changeRate);
          this.dialog=true;
      },
      doneChange:function(){
        alert(this.changePrice+ this.changeName+this.changeCategory+this.changeRate);
        this.dialog=false;
      }
  },
  data:function(){
      return{
          rate:this.data.rate,
          dialog:false,
          changePrice: this.data.price,
          changeName: this.data.name,
          changeCategory:this.data.category,
          changeRate:this.data.rate
      }
  }
}

</script>

