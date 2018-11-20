<template>
  <v-card height="100%"  style="height: 300px;">
    <v-card-title>
      <!-- 수입 or 지출 인지 받아옴 -->
      {{data.date}}
      {{data.is}}
    </v-card-title>
    <v-card-text class="scroll" > 
      <!-- 날짜 받아온걸로 해당 날짜의 수입 or 지출 내용을 v-for로 넣기 -->
      <v-layout row>
      <v-subheader>항목</v-subheader>
      <v-subheader>이름</v-subheader>
      <v-subheader>금액</v-subheader>
      <v-subheader>평가</v-subheader>
      <!-- <v-rating v-model="rating"></v-rating> -->
      </v-layout>
      <div v-for="item in items">
        <AccountComp v-bind:data="{category:item.category, name:item.name, price:item.price, score:item.score}"></AccountComp>
      </div>

    </v-card-text>
    <v-card-actions>
      <v-layout row justify-center>
        <v-flex xs10>
          <v-btn slot="activator" color="orange" dark v-on:click="addbtn">추가</v-btn>
            
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">가계부 작성</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 class="addData">
                      날짜: {{data.date}}
                      <!-- <v-text-field label="Legal first name*" required></v-text-field> -->
                    </v-flex>
                    <v-flex xs12 class="addData">
                      <br>
                      분류: {{data.is}}
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="금액" required v-model="addPrice"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="이름" required v-model="addName"></v-text-field>
                    </v-flex> 
                    <v-flex xs12>
                      <span v-if="data.is=='수입'">
                      <v-select
                        :items="['월급', '부수입', '용돈', '상여', '금융소득', '기타']"
                        label="카테고리"
                        required
                        v-model="addCategory"
                      ></v-select>
                      </span>
                      <span v-else>
                        <v-select
                        :items="['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타']"
                        label="카테고리"
                        required
                        v-model="addCategory"
                        ></v-select>
                      </span>
                    </v-flex>
                    <v-flex xs12>
                      <v-rating v-model="addRate"></v-rating>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="dialog = false" v-on:click="add">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-card-actions>
      
  </v-card>
</template>

<script>
import AccountComp from "../components/AccountComp";


  export default{
    name : 'AccountShow',
    props:["data"],
    methods:{
      add:function(){
        this.items.push({
          date: this.data.date,
          is: this.data.is,
          price:this.addPrice,
          name:this.addName,
          category: this.addCategory,
          score:this.addRate
        })
      },
      addbtn:function(){
        if(this.data.date==null){
          alert('날짜를 선택해 주세요');
          this.dialog=false;
        }
        else this.dialog=true;
      }

    },
    data:function(){
      return{
        addRate:null,
        addName:null,
        addCategory:null,
        addPrice:null,
        dialog: false,
        items:[{}]
      }
    },
    components:{
      AccountComp
    }
  }
</script>

<style>
.addData{
  font-size: 18px
}
</style>
