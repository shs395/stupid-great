<template>
  <v-card height="100%">
    <v-card-title class="account_title">
      <!-- 수입 or 지출 인지 받아옴 -->
      <h2 flex xs12>{{data.y}}년 {{data.m}}월 {{data.d}}일 {{data.is}}</h2>

    </v-card-title>
    <!-- 날짜 받아온걸로 해당 날짜의 수입 or 지출 내용을 v-for로 넣기 -->
    <v-card-text class="account_text">
      <v-layout row>
        <v-flex xs3>
          항목
        </v-flex>
        <v-flex xs3>
          이름
        </v-flex>
        <v-flex xs3>
          가격
        </v-flex>
        <v-flex xs6>
          평가
        </v-flex>
      </v-layout> 
    </v-card-text>
    <v-card-text class="account_text">
      <v-container id="scroll-target" style="height: 300px" class="scroll-y">
        <span v-for="account in accounts">
          <AccountComp v-bind:data="{category:account.category, name:account.name, price:account.price, rate:account.rate, accountId: account.accountId, y:data.y, m:data.m, d:data.d, is:data.is}"></AccountComp>
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
                        날짜: {{data.y}}년 {{data.m}}월 {{data.d}}일
                      </v-flex>
                      <v-flex xs12 class="addData">
                        <br>
                        분류: {{data.is}}
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="금액" type="number" min="0" required v-model="addPrice" :rules="[v => v>0 || '가격을 작성해 주세요']"></v-text-field>
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
                        <v-checkbox
                          :label="`반복 주기 `+isChecked"
                          v-model="checkbox"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex xs6 v-if="checkbox==true">
                        <v-select
                          :items="s_states"
                          @change="s_d=null"
                          v-model="s_t"
                          :menu-props="{ maxHeight: '400' }"
                          label="주기"
                          hint="주기를 선택하세요"
                          persistent-hint
                          :rules="[v => !!v || '주기를 지정해 주세요']" 
                        ></v-select>
                      </v-flex>
                      <v-flex xs6 v-if="s_t=='매주'">
                        <v-select
                          :items="w_states"
                          v-model="s_d"
                          :menu-props="{ maxHeight: '400' }"
                          label="요일"
                          hint="요일을 선택하세요"
                          persistent-hint
                          :rules="[s_d => !!s_d || '요일을 지정해 주세요']" 
                        ></v-select>
                      </v-flex>
                      <v-flex xs6 v-if="s_t=='매월'">
                        <v-text-field 
                          label="날짜" 
                          type="number" 
                          min="1"
                          max="28" 
                          required 
                          v-model="s_d" 
                          :rules="[v => v>=1 && v<=28 || '날짜를 1~28 사이로 선택해 주세요']"   
                      ></v-text-field>
                      </v-flex>
                      <v-flex xs6 v-if="s_t=='매년'">
                        <v-menu
                          :close-on-content-click="ture"
                          v-model="menu1"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="100px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="s_d"
                            label="start day"
                            prepend-icon="event"
                            readonly
                            :rules="[v => !!v || '날짜를 지정해 주세요']"  
                          ></v-text-field>
                          <v-date-picker v-model="s_d" @input="menu1 = false" @change="change"></v-date-picker>
                      </v-flex>
                      <v-flex xs6 v-if="s_t=='직접지정'">
                        <v-text-field 
                          label="일 간격" 
                          type="number" 
                          min="1"
                          required 
                          v-model="s_d" 
                          :rules="[v => s_d>0 || '일 간격을 1이상으로 지정해 주세요']"    
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6 v-if="s_t!='매주'&&s_t!='매월'&&s_t!='매년'&&s_t!='직접지정'">
                      </v-flex>
                      <v-flex xs6 v-if="checkbox==true">
                            <v-menu
                              :close-on-content-click="ture"
                              v-model="menu1"
                              :nudge-right="40"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                              min-width="100px"
                            >
                            <v-text-field
                              slot="activator"
                              v-model="s_select"
                              label="start day"
                              prepend-icon="event"
                              readonly
                              :rules="[v => !!v || '시작 날짜를 지정해 주세요']"  
                            ></v-text-field>
                            <v-date-picker v-model="s_select" @input="menu1 = false" @change="change"></v-date-picker>
                          </v-menu>
                        </v-flex>
                      <v-flex xs6 v-if="checkbox==true">
                        <v-menu
                          :close-on-content-click="ture"
                          v-model="menu2"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="100px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="e_select"
                            label="end day"
                            prepend-icon="event"
                            readonly
                            :rules="[v => !!v || '끝 날짜를 지정해 주세요']"  
                          ></v-text-field>
                          <v-date-picker v-model="e_select" @input="menu2 = false" :min = "s_select" @change="change"></v-date-picker>    
                        </v-menu>
                      </v-flex>
                      <v-flex xs12>
                        <v-rating v-model="addRate"></v-rating>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="blue darken-1" flat @click="dialog = false, reset">Close</v-btn>
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
          if(this.checkbox==false){
            alert('hi')
            this.$http.post('/account/create', {
              year: this.data.y,
              month: this.data.m,
              day: this.data.d,
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
                
                alert(this.checkbox)
                this.$refs.form.reset()
                this.checkbox=false;
                this.s_select=this.data.selectedDate
                this.addRate=0;
                alert('추가되었습니다')
              }
              this.get_accounts();
            })
            .catch((err)=>{
              console.log(err)
            })
          }
          else{
            if(this.e_select<this.s_select){
              alert('기간을 다시 설정해 주세요');
              return;
            }
            alert(this.s_d)
            this.$http.post('/account/create/repeat/', {
              id: this.$session.get('id'),
              is: this.data.is,
              price: this.addPrice,
              name:this.addName,
              category: this.addCategory,
              rate: this.addRate,
              r_type:this.s_t,
              r_data:this.s_d,
              r_start:this.s_select,
              r_end:this.e_select
            })
            .then((result)=>{
              if(result.data=='create'){
                this.dialog=false
                this.$refs.form.reset()
                this.checkbox=false;
                this.s_select=this.data.selectedDate
                this.addRate=0
                alert('추가되었습니다')
              }
              this.get_accounts();
            })
            .catch((err)=>{
              console.log(err)
            })
          }
        }
      },
      reset(){
        return this.$refs.form.reset()
        this.checkbox=false;
        this.s_select=this.data.selectedDate
        this.addRate=0
      },
      addbtn:function(){
          this.dialog=true;
      },
      get_accounts:function(){
        console.log('/account/list/'+this.$session.get('id')+'/'+this.data.selectedDate+'/'+this.data.is)
          this.$http.get( '/account/list/'+this.$session.get('id')+'/'+this.data.selectedDate+'/'+this.data.is)
          .then((result)=>{
            this.accounts = result.data
            console.log(this.accounts)
          })
          .catch((err)=>{
              console.log(err)
          })
      }
    },
    data: function(){
      return{
        s_t:null,
        s_d:null,
        w_s: [],
        m_s:0,
        s_s:0,
        s_select:this.data.selectedDate,
        e_select:null,

        s_states: [
          '매일', '매주', '매월', '매년', '직접지정'
        ],
        w_states: [
          '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'
        ],
        checkbox: false,
        isChecked:'안함',
        
        addRate:null,
        addName:null,
        addCategory:null,
        addPrice:null,
        dialog: false,
        accounts:[],
      }
    },
    components:{
      AccountComp
    },
    beforeMount(){
      this.get_accounts()
    },
    watch:{
      data : function(){this.get_accounts()},
      checkbox : function(){
        if(this.checkbox==true) 
          this.isChecked='함'
        else
          this.isChecked='안함'}
    },
    // mounted:function(){
    //   if(this.data.selectedDate==null){
    //     var currentTime = new Date()
    //     this.month = currentTime.getMonth() + 1
    //     this.year = currentTime.getFullYear()
    //     this.day = currentTime.getDate()
    //   }else{
    //     this.month = this.data.selectedDate.slice(0,4)
    //     this.year = this.data.selectedDate.slice(5,7)
    //     this.day = this.data.selectedDate.slice(8,10)
    //   }
    // }
  }
</script>

<style scoped>
.addData{
  font-size: 18px
}
#add_b{
  align-content: center
}
#ic{
  color:darkgrey
}
#scroll-target{
  padding:0px;
}
.account_title{
  padding-bottom: 0px;
  /* align-content: center;
  text-align: center; */
}
.account_text{
  padding-bottom: 0px;
  /* align-content: center;
  text-align: center; */
}
</style>
