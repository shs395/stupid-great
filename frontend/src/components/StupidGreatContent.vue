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
                        <div>내용 : {{post.content}}</div>
                        <div>가격 : {{post.price}}</div>
                        </div>
                    </v-card-title>
                    </v-flex>
            </v-layout>
                
            <v-divider light></v-divider>
            
            <v-card-actions id="sg-btns-group">
                <v-btn v-show="showbtn" color="red" @click="OnClickStupid" class="sg-btns" id="stupid-btn">스튜핏!</v-btn>
                <v-btn v-show="showbtn" color="blue" @click="OnClickGreat" class="sg-btns" id="great-btn">그레잇!</v-btn>
                <h3 v-show="!showbtn">이미 투표를 완료 하셨습니다!</h3>
            </v-card-actions>
            
        </v-card>
    </div>
    
</template>

<script>
export default {

    created (){

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
            showbtn : ''
        }
    },
    
    computed : {
        showbtn (){
            this.$http.get(`/stupid_great/${this.$session.get('id')}`)
            .then((result) => {
                this.readpost = result.data;
                console.log(result.data);
                for(var i = 1; i<= this.readpost.length; i++){
                    if(this.post.PostNumber == this.readpost[i]){
                        return false;
                    }
                }
                return true;
            });
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

            for(var i = 1; i<= this.readpost.length; i++){
                if(this.post.PostNumber == this.readpost[i]){
                    return this.showbtn = false;
                }
            }
            return this.showbtn = true;

        },
        OnClickGreat (){
            this.$http.post('/stupid_great/add/great', {postnum: this.sgpost.PostNumber, userid: this.$session.get('id')})
            .then((result) => {
                console.log(result);
                this.post = result.data;
                console.log(this.post);
            });
            alert('great를 선택하셨습니다!');
        }
    }
}
</script>

<style>

#sg-content{
    width: 400px;
    height: 250px; 
}

#sg-btns-group{
    width: 277px;
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