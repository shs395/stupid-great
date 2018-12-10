<template>
<!-- 목록보기추가 -->
    <div>
        <toolbar></toolbar>
            <v-container fluid text-xs-center>
                <v-card>
                    <v-card-title>게시글 작성</v-card-title>
                         <v-layout row> 
                            <v-flex xs4 px-3>
                                <v-text-field background-color="white" name="title" box label="Title" v-model="title"></v-text-field> 
                            </v-flex>
                            <v-flex xs4 px-3 >
                                <v-menu ref="menu"  :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition"
                                 offset-y full-width  max-width="290px" min-width="290px">
                                <v-text-field slot="activator" v-model="date" label="Select Year & Month" prepend-icon="event" readonly ></v-text-field>
                                <v-date-picker  v-model="date" type="month" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                 </v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-spacer/>
                            <v-flex px-3>
                                  <v-card-actions>
                            <v-btn flat color="orange" v-on:click="savepost">POST</v-btn>
                        </v-card-actions>
                            </v-flex>
                        </v-layout>
                        <v-flex pa-3 d-flex>

                    
                            <v-textarea name="body" background-color="white" box label="Comment" v-model="body"></v-textarea>
                        </v-flex>
                      
                </v-card>   
            </v-container>
      </div>      
</template>

<script>
import toolbar from '../components/toolbar'

export default {
    name:'boardwrite',
    components:{
        toolbar
    },
    data: function()
    {
        return {
            id: '',
            title:'',
            body:'',
            date: new Date().toISOString().substr(0, 7),
            menu: false,
            modal: false,
    

        }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
          alert('로그인을 먼저해주세요');
          this.$router.push('/signin')
      }
    },
    methods:{
        savepost(){
            var infoPost={id:this.$session.get('id'),title:this.title,body:this.body,date:this.date}
            this.title=""
            this.body=""
            this.axios.post('/board/post',infoPost).then(res=>{
                alert(this.date+'의 가계부가 선택되었습니다')
                if(res.data==='created')
                 return location.href="/evaluation";}).catch((err)=>console.log(err))
        },
        saveAccount(){
           
        }
    },
    mounted() {
        alert("년/월을 선택하면 해당 가계부 데이터를 불러옵니다!")
         this.$http.get('/board/list').then(response=>
         console.log(response.data))
    }
}

          
</script>

<style>

</style>

