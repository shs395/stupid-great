<template>
    <div id="sg-content-card">
        <v-card id="sg-content">
            <v-layout>
                <v-flex xs5>
                    <v-img
                        :src="imgpath"
                        height="170px"
                        contain
                    ></v-img>
                </v-flex>
                
                <v-flex xs7>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">제목 : <span>{{post.title}}</span></div>
                            <div style="white-space: pre-line;">내용 : {{post.content}}</div>
                            <div>가격 : <span>{{post.price}} 원</span></div>
                        </div>
                    </v-card-title>
                </v-flex>
            </v-layout>
                
            <v-divider light></v-divider>
            
            <v-card-actions id="sg-btns-group">
                <v-btn v-show="showbtn" color="red" @click="OnClickStupid" class="sg-btns" id="stupid-btn">스튜핏!</v-btn>
                <v-btn v-show="showbtn" color="blue" @click="OnClickGreat" class="sg-btns" id="great-btn">그레잇!</v-btn>
                <h3 v-if="mypost == false" v-show="!showbtn">이미 투표를 완료 하셨습니다!</h3>
                <h3 v-if="mypost == true">내가 올린 게시물입니다. 결과를 기다리세요!</h3>
            </v-card-actions>
            
        </v-card>
    </div>
    
</template>

<script>
export default {

    mounted (){

      //  var length = this.post.content.length;
        var postContent = '';

        for(var i = 1; i <= (this.post.content.length /20) + 1 ; i++){
            if(this.post.content.charAt(20*i+ (i-1)) == '\n'){
                postContent += this.post.content.substring(20*(i-1) + (i-1) , 20*i + (i-1))
            }else{
                postContent += this.post.content.substring(20*(i-1) , 20*i) + "\n"
            }
        }

        this.post.content = postContent;

        this.$http.get(`/stupid_great/${this.$session.get('id')}`)
        .then((result) => {
            this.readpost = result.data;
            for(var i = 1; i<= this.readpost.length; i++){
                if(this.post.PostNumber == this.readpost[i]){
                    this.mypost = false;
                    return this.showbtn = false;
                }
            }
            if(this.post.writer == this.$session.get('id')){
                this.mypost = true;
                return this.showbtn = false;
            }else{
                this.mypost = false;
                return this.showbtn = true;
            }
        });

        if(!this.post.image){
            this.imgpath = "http://localhost:3000/static/img/noimage.jpg";
        }else {
            this.imgpath = "http://localhost:3000/static/img/sg_images/"+this.post.image;
        }

    },

    name: 'StupidGreatContent',
    props: {
        post: {},
    },
    data (){
        return{
            imgpath: '',
            readpost: [],
            showbtn : '',
            postContent : '',
            mypost : ''
        }
    },

    methods: {
            
        OnClickStupid (){
            this.$http.post('/stupid_great/add/stupid', {postnum: this.post.PostNumber, userid: this.$session.get('id')})
            .then((result) => {
                console.log(result.data);
            });

            this.$http.get(`/stupid_great/${this.$session.get('id')}`)
            .then((result) => {
                console.log(result.data);
                this.readpost = result.data;
            });

            alert('stupid를 선택하셨습니다!');
            this.showbtn = false;
           // return location.href="/stupid-great-community";

        },

        OnClickGreat (){
            this.$http.post('/stupid_great/add/great', {postnum: this.post.PostNumber, userid: this.$session.get('id')})
            .then((result) => {
                console.log(result.data);
            });

            this.$http.get(`/stupid_great/${this.$session.get('id')}`)
            .then((result) => {
                console.log(result.data);
                this.readpost = result.data;
            });

            alert('great를 선택하셨습니다!');
            this.showbtn = false;
          //  return location.href="/stupid-great-community";
        }
    }
}
</script>

<style>

#sg-content{
    width: 480px;
    height: auto;
    margin-bottom : 40px;
}

#sg-btns-group{
    width: 300;
    margin: 0 auto;
    margin-top:5px;
}

.sg-btns{
    width: 130px;
    height: 50px;
    font-size:30px;
}

#stupid-btn{
    color:bisque;   
}

#great-btn{
    color:#E3F2FD;   
}
</style>