<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <h3 class="headline mb-0">내 정보</h3>
              
              <!-- 수정을 진행하는 단계 -->
              <v-layout wrap v-if="modify">
                <v-flex xs12 sm4>
                <v-radio-group row :rules="[v => !!v || '성별을 선택해 주세요']" v-model="userSex" required>
                  <v-radio label="남성" color="primary" value="남자"></v-radio>
                  <v-radio label="여성" color="red" value="여자"></v-radio>
                </v-radio-group>
                </v-flex>

                <v-flex xs12 sm4>
                  <v-text-field 
                    label="나이" 
                    v-model="userAge" 
                    type="number" 
                    min="14"
                    :rules="[v => !!v || '나이를 입력해 주세요']" 
                    required></v-text-field>
                </v-flex>

                <v-flex xs12 sm4>
                  <v-autocomplete
                    :items="['직장인','전업주부','대학생', '고등학생', '중학생', '백수']"
                    label="직업"
                    v-model="userJob"
                    :rules="[v => !!v || '직업을 선택해 주세요']"
                    required
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12>
                  <v-text-field 
                    label="이메일" 
                    v-model="userEmail" 
                    type="email"
                    :rules="emailRules"
                    required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field 
                    label="아이디" 
                    v-model="userId"
                    :rules="[v => !!v || '아이디를 입력해 주세요']"
                    required
                    disabled></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="비밀번호" 
                                v-model="userPw"
                                :append-icon="show ? 'visibility_off' : 'visibility'"
                                :type="show ? 'text' : 'password'"
                                :rules="[rules.required, rules.min]"                                 
                                @click:append="show = !show"
                                required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="비밀번호 확인" 
                                v-model="userPwConfirm"
                                :append-icon="show2 ? 'visibility_off' : 'visibility'"
                                :type="show2 ? 'text' : 'password'"
                                :rules="[rules.confirmEqual]"                                 
                                @click:append="show2 = !show2"
                                required></v-text-field>
                </v-flex>

                <v-dialog v-model="dialogModify" persistent max-width="290">
                  <v-btn slot="activator" >수정 완료하기</v-btn>
                  <v-card>
                    <v-card-title class="headline">수정 완료</v-card-title>
                    <v-card-text>정보 수정을 완료하고 저장하시겠습니까?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat @click="dialogModify = false">아니오</v-btn>
                      <v-btn color="green darken-1" flat @click="modifyFinish">네</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogWithdrawal" persistent max-width="290">
                  <v-btn slot="activator" >회원 탈퇴하기</v-btn>
                  <v-card>
                    <v-card-title class="headline">회원 탈퇴</v-card-title>
                    <v-card-text>정말 탈퇴하시겠습니까?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat @click="dialogWithdrawal = false">아니오</v-btn>
                      <v-btn color="green darken-1" flat @click="withdrawalProcess">네</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-layout>

              <v-layout wrap v-else>
                <v-flex xs12 sm4>
                <v-radio-group row :rules="[v => !!v || '성별을 선택해 주세요']" v-model="userSex" required disabled>
                  <v-radio label="남성" color="primary" value="남자"></v-radio>
                  <v-radio label="여성" color="red" value="여자"></v-radio>
                </v-radio-group>
                </v-flex>

                <v-flex xs12 sm4>
                  <v-text-field 
                    label="나이" 
                    v-model="userAge" 
                    type="number" 
                    min="14"
                    :rules="[v => !!v || '나이를 입력해 주세요']" 
                    required
                    disabled></v-text-field>
                </v-flex>

                <v-flex xs12 sm4>
                  <v-autocomplete
                    :items="['직장인','전업주부','대학생', '고등학생', '중학생', '백수']"
                    label="직업"
                    v-model="userJob"
                    :rules="[v => !!v || '직업을 선택해 주세요']"
                    required
                    disabled
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12>
                  <v-text-field 
                    label="이메일" 
                    v-model="userEmail" 
                    type="email"
                    :rules="emailRules"
                    required
                    disabled></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field 
                    label="아이디" 
                    v-model="userId"
                    :rules="[v => !!v || '아이디를 입력해 주세요']"
                    required
                    disabled></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="비밀번호" 
                                v-model="userPw"
                                :append-icon="show3 ? 'visibility_off' : 'visibility'"
                                :type="show3 ? 'text' : 'password'"
                                :rules="[rules.required, rules.min]"                                 
                                @click:append="show3 = !show3"
                                required
                                disabled></v-text-field>
                </v-flex>

                <v-dialog v-model="dialogModify" persistent max-width="290">
                  <v-btn slot="activator" >내 정보 수정하기</v-btn>
                  <v-card>
                    <v-card-title class="headline">정보 수정</v-card-title>
                    <v-card-text>내 정보를 수정하겠습니까?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat @click="dialogModify = false">아니오</v-btn>
                      <v-btn color="green darken-1" flat @click="modifyProcess">네</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogWithdrawal" persistent max-width="290">
                  <v-btn slot="activator" >회원 탈퇴하기</v-btn>
                  <v-card>
                    <v-card-title class="headline">회원 탈퇴</v-card-title>
                    <v-card-text>정말 탈퇴하시겠습니까?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat @click="dialogWithdrawal = false">아니오</v-btn>
                      <v-btn color="green darken-1" flat @click="withdrawalProcess">네</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
   
  </div>
</template>

<script>
export default {
  name : 'MyPageInfo',
  data: function(){
    return{
      userId : '',
      userPw : '',
      userPwConfirm : '',
      userSex : '',
      userAge : '',
      userJob : '',
      userEmail : '',
      dialogWithdrawal : false,
      dialogModify :  false,
      rules: {
          required: value => !!value || '최소 6자리 이상으로 설정해 주세요',
          min: pw => pw.length >= 6 || '최소 6자리 이상으로 설정해 주세요',
          confirmEqual: c => this.userPw == this.userPwConfirm || '입력한 비밀번호와 일치하지 않습니다'
        },
      emailRules: [
      v => !!v || '이메일을 입력해 주세요',
      v => /.+@.+/.test(v) || '이메일을 정확히 입력해 주세요'
      ],
      modify: false ,
      show  : false,
      show2  : false,
      show3  : false
             

    }
  },
  methods:{
    //회원 수정 (db업데이트 요청)
    modifyFinish:function(){
      this.modify = false
      this.dialogModify = false
      this.$http.post('/users/modify',
      {
        id  : this.userId,
        pw  : this.userPw,  
        sex : this.userSex,   
        age : this.userAge,   
        job : this.userJob,   
        email : this.userEmail   
      })
      .then((response)=>{

      })
    },
    //회원 정보 수정 창으로 접근
    modifyProcess:function(){
      this.modify = true
      this.dialogModify = false
    },
    //회원 탈퇴
    withdrawalProcess:function(){
      var findId = this.$session.get('id')
      this.$http.post('/users/withdrawal',
        {
          id: findId
        }).then((response)=>{
          this.$session.destroy()
          alert("탈퇴가 완료되었습니다.")
          this.$router.push('/signin')
      })
       
    }
  },
  mounted:function(){
    var findId = this.$session.get('id')
     this.$http.post('/stats/find',
      {
        id: findId
      }).then((response)=>{
        this.userId = response.data.id
        this.userPw = response.data.pw
        this.userPwConfirm = response.data.pw
        this.userSex = response.data.sex
        this.userAge = response.data.age
        this.userJob = response.data.job
        this.userEmail = response.data.email
      })

  }
}
</script>

<style>

</style>
