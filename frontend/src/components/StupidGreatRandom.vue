<template>
    <div id="random">
       <v-card color="transparent">
              <v-layout>
                <v-flex xs5>
                  <v-img
                    :src="randomImagePath"
                    height="400px"
                    contain
                    id="random-img"
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div id="random-content">
                      <div id="random-head">제목 : <span>{{post.title}}</span></div>
                      <v-divider light></v-divider><br>
                      <div>내용 : <span>{{post.content}}</span></div><br>
                      <v-divider light></v-divider>
                      <div id="random-price">가격 : <span>{{post.price}}</span></div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                    <div v-show="!showbtn" id="voteEnd">
                        <h2>이미 투표를 완료하셨습니다! 
                            <span><v-btn @click="OnClickRandomSkip" color="light-blue lighten-4" id="nextbtn">다음으로 넘어가기</v-btn>
                            </span>
                        </h2>
                    </div>
                    <div v-show="showbtn" id="voteStart">
                        <v-btn @click="OnClickRandomStupid" class="sg-random-btns" id="random-stupid-btn" color="red">스튜핏!</v-btn>
                        <v-btn @click="OnClickRandomSkip" class="sg-random-btns" id="skip-btn" color="grey darken-4">SKIP</v-btn>
                        <v-btn @click="OnClickRandomGreat" class="sg-random-btns" id="random-great-btn" color="blue">그레잇!</v-btn>
                    </div>
              </v-card-actions>
            </v-card>

    </div>
</template>

<script>
export default {
    created (){

        this.OnClickRandomSkip();
       
        if(!this.post.image){
            this.randomImagePath = "http://localhost:3000/static/img/noimage.jpg";
        }else {
            this.randomImagePaththis.imgpath = "http://localhost:3000/static/img/sg_images/"+this.sgpost.image;
        }
    },

    name : 'StupidGreatRandom',

    data (){
        return{
            posts: [],
            post : {},
            readpost: [],
            randomImagePath : '',
            showbtn: ''          
        }
    },

    methods: {
        OnClickRandomStupid (){
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
            this.OnClickRandomSkip();

        },

        OnClickRandomGreat (){
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

            this.OnClickRandomSkip();
        },
        
        OnClickRandomSkip (){

            this.$http.get('/stupid_great')
            .then((result) => {
                this.posts = result.data;
                var flag = false;
                while(!flag){
                var lastPostNumber = this.posts[this.posts.length -1].PostNumber;
                var random = Math.floor(Math.random() * lastPostNumber) + 1;
                console.log(random);

                    for(var i = 0; i< this.posts.length; i++){
                        if(this.posts[i].PostNumber == random){
                            this.post = this.posts[i];
                            flag = true;
                            break;
                        }
                    }
                }

                this.$http.get(`/stupid_great/${this.$session.get('id')}`)
                .then((result) => {
                    this.readpost = result.data;
                    console.log(result.data);
                    for(var i = 1; i<= this.readpost.length; i++){
                        if(this.post.PostNumber == this.readpost[i]){
                            return this.showbtn = false;
                        }
                    }
                    return this.showbtn = true;
                });

            });   
        }
    }
}
</script>

<style scoped>
#random{
    background: url(../assets/question-bg.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  min-block-size: 642px;

}

#random-img{
    margin-top:20px;
    margin-left:173px;
}

#random-content{
    margin-top:50px;
    margin-left: 50px;
    font-size:30px;
    color:#FFF8E1;
}

#random-price{
    color:#EF5350;
}

#random-head{
    font-size:50px;
}

#voteEnd{
    margin-left:157px;
}

#voteStart{
    margin-left:400px;
}

.sg-random-btns{
    width: 373px;
    height:300px;
    font-size: 70px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#random-stupid-btn{
    color:bisque;
    padding-left: 70px;
    padding-right: 70px;
    
}

#skip-btn{
    color:#F5F5F5;
    padding-left: 70px;
    padding-right: 70px;
}

#random-great-btn{
    color:#E3F2FD;
    padding-left: 70px;
    padding-right: 70px;   
}

#nextbtn{
    size: 100px;
}

#random #addbtn{
    margin: 0 0 40px 40px;
}

#add-btn{
    margin-top:60px;
    margin-left: 120px;
}

h2{
    text-align: center;
    color: white;
    size: 30px;
}
</style>
