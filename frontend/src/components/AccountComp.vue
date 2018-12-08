<template>
    <v-layout row @click="doChange" v-if="isShow==true">
      <v-flex xs3>
        <v-card flat tile>
          {{category}}
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card flat tile>
          {{name}}
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card flat tile>
          {{price}}
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card flat tile>
           <v-rating v-model="rate" readonly="readonly" small></v-rating>
        </v-card>
      </v-flex>
      <v-dialog v-model="dialog"  persistent max-width="600px" v-if="dialog==true">
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
                    <v-text-field label="금액" type="number" required v-model="mprice" :rules="[v => v>0 || '가격을 작성해 주세요']"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="이름" type="string" required v-model="mname" :rules="[v => !!v || '이름을 작성해 주세요']"></v-text-field>
                  </v-flex> 
                  <v-flex xs12>
                    <span v-if="data.is=='수입'">
                    <v-select
                      :items="['월급', '부수입', '용돈', '상여', '금융소득', '기타']"
                      label="항목"
                      required
                      v-model="mcategory"
                      :rules="[v => !!v || '항목을 선택해 주세요']"
                    ></v-select>
                    </span>
                    <span v-else>
                      <v-select
                      :items="['식비', '교통/차량', '문화생활', '마트/편의점', '패션/미용', '생활용품', '주거/통신', '건강', '교육', '경조사/회비', '가족', '기타']"
                      label="카테고리"
                      required
                      v-model="mcategory"
                      :rules="[v => !!v || '항목을 선택해 주세요']"
                      ></v-select>
                    </span>
                  </v-flex>
                  <v-flex xs12>
                    <v-rating v-model="mrate"></v-rating>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="doneChange">Change</v-btn>
              <v-btn color="blue darken-1" flat @click="deleteDialog=true">Delete</v-btn>
              <v-dialog v-model="deleteDialog" persistent max-width="290" v-if="deleteDialog==true">
                <v-card>
                  <v-card-title class="headline">정말 삭제하시겠습니까?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="deleteDialog = false">No</v-btn>
                    <v-btn color="green darken-1" flat @click="deleteAccount">Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
     
</template>

<script>
export default {
  name: "AccountComp",
  props:["data"],
  methods:{
      deleteAccount:function(){
        this.deleteDialog=false
        this.$http.post('/account/delete', {accountId: this.data.accountId})
        .then((result)=>{
          if(result.data=='delete'){
            this.dialog=false
            alert('삭제되었습니다')
            this.isShow=false
          }
        })
      },
      doChange:function(){
          this.dialog=true;
      },
      doneChange:function(){
        alert(this.price+ this.name+this.category+this.rate);
        if(this.$refs.form.validate()){
          this.$http.post('/account/change', {
            accountId:this.accountId,
            price: this.mprice,
            name:this.mname,
            category: this.mcategory,
            rate: this.mrate
          })
          .then((result)=>{
            if(result.data=='change'){
              this.dialog=false
              alert('변경되었습니다')
              this.price=this.mprice
              this.name = this.mname
              this.category=this.mcategory
              this.rate= this.mrate
            }
          })
          .catch((err)=>{
            console.log(err)
          })

        }

      },
      close:function(){
        this.mprice=this.price
        this.mname = this.name
        this.mcategory=this.category
        this.mrate= this.rate
        this.dialog=false
      }
      ,
      getaccount:function(){
        this.$http.get('/account/list',{

        })
      }
  },
  data:function(){
      return{
          price: this.data.price,
          mprice: this.data.price,
          name: this.data.name,
          mname: this.data.name,
          category: this.data.category,
          mcategory: this.data.category,
          rate: this.data.rate,
          mrate: this.data.rate,
          accountId: this.data.accountId,
          isShow:true,
          dialog:false,
          deleteDialog:false
      }
  },
  watch:{
    data:function(){
      this.price= this.data.price
      this.name= this.data.name
      this.category= this.data.category
      this.rate= this.data.rate
      this.accountId= this.data.accountId
    }
  }
}

</script>

