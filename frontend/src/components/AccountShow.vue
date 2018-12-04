<template>
  <v-card height="100%">
    <v-card-title>
      <!-- 수입 or 지출 인지 받아옴
      <h2>{{selectedDate}}</h2> -->
      <h2>{{year}}년 {{month}}월 {{day}}일 {{data.is}}</h2>
      <!-- <h2 v-else>{{parseInt(data.selectedDate.slice(0,4))}}년 {{parseInt(data.selectedDate.slice(5,7))}}월 {{parseInt(data.selectedDate.slice(8,10))}}일 {{data.is}}</h2> -->
    </v-card-title>
    <!-- 날짜 받아온걸로 해당 날짜의 수입 or 지출 내용을 v-for로 넣기 -->
    <v-card-text> 
      <v-container
      id="scroll-target"
      style="height: 300px"
      class="scroll-y"
      >
      <AccountComp  id='ac' v-bind:data="{selectedDate: data.selectedDate, category:'항목', name:'이름', price:'가격', rate:'평가'}"></AccountComp>
      <span v-for="account in this.data.accounts">
        <AccountComp v-bind:data="{category:account.category, name:account.name, price:account.price, rate:account.rate, accountId: account.accountId, y:year, m:month, d:day, is:data.is}"></AccountComp>
      </span>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-layout row justify-center>
        <v-flex xs10>
          <v-btn slot="activator" color="orange" dark v-on:click="addbtn" id="add_b">추가</v-btn>
          <v-dialog v-model="dialog"  persistent max-width="600px" v-if="dialog==true">
            <v-card>
              <v-form ref="form">
                <v-card-title>
                  <span class="headline">가계부 작성</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 class="addData">
                        날짜: {{year}}년 {{month}}월 {{day}}일
                      </v-flex>
                      <v-flex xs12 class="addData">
                        <br>
                        분류: {{data.is}}
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="금액" type="number" min=0 required v-model="addPrice" :rules="[v => !!v || '가격을 작성해 주세요']"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="이름" type="string" required v-model="addName" :rules="[v => !!v || '이름을 작성해 주세요']"></v-text-field>
                      </v-flex> 
                      <v-flex xs12>
                        <span v-if="data.is=='수입'">
                        <v-select
                          :items="['월급', '부수입', '용돈', '상여', '금융소득', '기타']"
                          label="항목"
                          required
                          v-model="addCategory"
                          :rules="[v => !!v || '항목을 선택해 주세요']"
                        ></v-select>
                        </span>
                        <span v-else>
                          <v-select
                          :items="['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타']"
                          label="카테고리"
                          required
                          v-model="addCategory"
                          :rules="[v => !!v || '항목을 선택해 주세요']"
                          ></v-select>
                        </span>
                      </v-flex>
                      <v-flex xs12>
                        <v-rating v-model="addRate" :rules="[v => !!v || '평가를 해주세요']"></v-rating>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat  v-on:click="add">Save</v-btn>
                </v-card-actions>
              </v-form>
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
      add:async function(){
        if(this.$refs.form.validate()){
          this.$http.post('/account/create', {
            year: this.year,
            month: this.month,
            day: this.day,
            id: this.$session.get('id'),
            is: this.data.is,
            price: this.addPrice,
            name:this.addName,
            category: this.addCategory,
            rate: this.addRate
            })
            .then((result)=>{
              if(result.data=='create'){
                this.dialog=false
                this.$refs.form.reset()
                this.addRate=0
                alert('추가되었습니다')
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      },
      reset(){
        return this.$refs.form.reset()
        this.addRate=0
      },
      addbtn:function(){
        if(this.year=='xxxx'){
          alert('날짜를 선택해 주세요');
          this.dialog=false;
        }
        else this.dialog=true;
      },
      // get_accounts:function(){
      //     if(this.selectedDate!=null){
      //       this.y=parseInt(this.selectedDate.slice(0,4))
      //       this.m=parseInt(this.selectedDate.slice(5,7))
      //       this.d=parseInt(this.selectedDate.slice(8,10))
            
      //       var api = 'http://localhost:3000/account/list/'+this.$session.get('id')+'/'+this.selectedDate+'/'+'수입';
      //       this.$http.get(api)
      //       .then((result)=>{
      //           this.g_accounts = result.data
      //           console.log(this.g_accounts)
      //           this.$http.get('http://localhost:3000/account/list/'+this.$session.get('id')+'/'+this.selectedDate+'/'+'지출')
      //           .then((result)=>{ 
      //               this.l_accounts = result.data
      //               console.log(result)
      //           })
      //           .catch((err)=>{
      //               console.log(err)
      //           })
      //       })
      //       .catch((err)=>{
      //           console.log(err)
      //       })
      //     }
          // }
    },
    data: function(){
      return{
        year:parseInt(this.data.selectedDate.slice(0,4)),
        month:parseInt(this.data.selectedDate.slice(5,7)),
        day:parseInt(this.data.selectedDate.slice(8,10)),
        addRate:null,
        addName:null,
        addCategory:null,
        addPrice:null,
        dialog: false,
        accounts:this.data.accounts,
        // year: parseInt(this.data.date.slice(0,4)),
        // month: parseInt(this.data.date.slice(5,7)),
        // day: parseInt(this.data.date.slice(8,10))
      }
    },
    components:{
      AccountComp
    },
    mounted:function(){
      if(this.data.selectedDate==null){
        var currentTime = new Date()
        this.month = currentTime.getMonth() + 1
        this.year = currentTime.getFullYear()
        this.day = currentTime.getDate()
      }else{
        this.month = this.data.selectedDate.slice(0,4)
        this.year = this.data.selectedDate.slice(5,7)
        this.day = this.data.selectedDate.slice(8,10)
      }
    }
  }
</script>

<style>
.addData{
  font-size: 18px
}
#add_b{
  align-content: center
}
#ic{
  color:darkgrey
}
</style>
