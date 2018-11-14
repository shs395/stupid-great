<template>
<div id="signin-bg">
  <v-form id="signin">

    <h1 id="title">Stupit? Great!</h1>

    <v-container fluid>
        <v-flex xs12 sm12>
          <v-text-field
            name="id"
            v-model="id"
            label="ID"
            outline
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :type="show1 ? 'text' : 'password'"
            name="password"
            v-model="password"
            label="Password"
            @click:append="show1 = !show1"
            outline
          ></v-text-field>
        </v-flex>

        <div id="signbtn">
          <v-btn color="primary" large>로그인</v-btn>
          <v-dialog v-model="signupForm" persistent max-width="600px">
            <v-btn slot="activator" color="success" large>회원가입</v-btn>
            <v-card v-if="show">
              <v-card-title>
              <span class="headline">회원 가입</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-form ref="form">
                    <v-flex xs12 sm6>
                    <v-radio-group v-model="user.usersex" row>
                      <v-radio label="남성" color="primary" value="male"></v-radio>
                      <v-radio label="여성" color="red" value="female"></v-radio>
                    </v-radio-group>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field label="나이" v-model="user.userage" type="number" min="14" required></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field label="이메일" v-model="user.useremail" type="email" required></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field label="아이디" v-model="user.userid" required></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field label="비밀번호" 
                                    v-model="user.userpw"
                                    :append-icon="show2 ? 'visibility_off' : 'visibility'"
                                    :type="show2 ? 'text' : 'password'"
                                    :rules="[rules.required, rules.min]"                                 
                                    @click:append="show2 = !show2"
                                    required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="비밀번호 확인" 
                                    v-model="confirm"
                                    :append-icon="show3 ? 'visibility_off' : 'visibility'"
                                    :type="show3 ? 'text' : 'password'"
                                    :rules="[rules.confirmEqual]"                                 
                                    @click:append="show3 = !show3"
                                    required></v-text-field>
                    </v-flex>
                    </v-form>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat >초기화</v-btn>
                <v-btn color="blue darken-1" flat >회원가입</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
    </v-container>
  </v-form>
  <linkComponent/>
</div>

</template>

<script>
  import linkComponent from '../components/link'

  export default {

    name : 'signin',


    components: {
      linkComponent
    },


    data () {
      return {
        show1: false,
        show2: false,
        show3: false,
        
        id:'',
        password: '',

        confirm:'',
        show: true,

        user: {
          usersex:'',
          userage:'',
          useremail:'',
          userid:'',
          userpw:'',
        },

        rules: {
          required: value => !!value || '최소 6자리 이상으로 설정해 주세요',
          min: pw => pw.length >= 6 || '최소 6자리 이상으로 설정해 주세요',
          confirmEqual: c => this.user.userpw == this.confirm || '입력한 비밀번호와 일치하지 않습니다'
        },
      
      }
    },

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      reset () {
        this.$refs.form.reset()
      }
    }

  }
</script>

<style>
#signin{
  width : 350px;
  padding-top: 150px;
  margin: 0 auto;
}
#title{
  text-align: center;
  font-size: 45px;
}

#signbtn{
  text-align: center;
}

#signin-bg{
  background: url(../assets/koreamoney.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  min-block-size: 753px;
}
</style>
