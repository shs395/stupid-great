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
                        <div class="headline">제목 : <span>{{sgpost.title}}</span></div>
                        <div>내용 : {{sgpost.content}}</div>
                        <div>가격 : {{sgpost.price}}</div>
                        </div>
                    </v-card-title>
                    </v-flex>
            </v-layout>
                
            <v-divider light></v-divider>
            
            <v-card-actions id="sg-btns-group">
                <v-btn color="red" @click="OnClickStupid" class="sg-btns" id="stupid-btn">스튜핏!</v-btn>
                <v-btn color="blue" @click="OnClickGreat" class="sg-btns" id="great-btn">그레잇!</v-btn>
            </v-card-actions>
            
        </v-card>
    </div>
    
</template>

<script>
export default {

    created (){
        if(!this.sgpost.image){
            return this.imgpath = "http://localhost:3000/static/img/noimage.jpg";
        }else {
            return this.imgpath = "http://localhost:3000/static/img/sg_images/"+this.sgpost.image;
        }
    },

    name: 'StupidGreatContent',
    props: {
        sgpost: {}
    },
    data (){
        return{
            imgpath: ''
        }
    },
    methods: {
            
        OnClickStupid (){
            this.$http.get(`/stupid_great/add/stupid/${this.sgpost.PostNumber}`)
            .then((result) => {
                this.post = result.data;
                console.log(this.post);
            });
            alert('stupid를 선택하셨습니다!');
        },
        OnClickGreat (){
            this.$http.get(`/stupid_great/add/great/${this.sgpost.PostNumber}`)
            .then((result) => {
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