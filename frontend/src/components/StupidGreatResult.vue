<template>
    <div id="StupidGreatResult" v-show="flag">
        <v-card>
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
                            <div class="headline">제목 : {{result.title}}</div>
                            <div style="white-space: pre-line;">내용 : {{result.content}}</div>
                            <div>가격 : {{result.price}}원</div>
                        </div>
                    </v-card-title>
                </v-flex>
                <v-flex>
                    <v-btn @click="OnClickDeleteSG" color="red lighten-1" icon>
                        <v-icon color="white">clear</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex>
                    <v-layout row justify-center>
                        <v-dialog v-model="dialog" persistent max-width="600px">
                        <v-btn slot="activator" color="purple lighten-3" icon >
                            <v-icon color="white">edit</v-icon>
                        </v-btn>
                        <v-card>
                            <v-card-title>
                                <span class="headline">살까 말까? 게시물 수정</span>
                            </v-card-title>
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout column wrap>
                                    
                                    <v-layout row wrap>
                                        <v-flex>
                                            <v-img
                                                :src="imgbuf"
                                                height="170px"
                                                contain
                                            ></v-img>
                                        </v-flex>
                                        <v-flex id="dropbox">
                                            <input type="file" id="imgFile" name="imgFile" @change="uploadIMG($event.target.name, $event.target.files)" @drop="uploadIMG($event.target.name, $event.target.files)">
                                            <h3>파일을 드래그해서 드랍해주세요!</h3>
                                        </v-flex>
                                    </v-layout>
                                    
                                    <v-flex>
                                        <v-text-field xs12
                                            v-model="update_title" 
                                            label="제목" 
                                            counter
                                            maxlength="15"
                                            required>
                                            </v-text-field>
                                    </v-flex>
                                    <v-flex>
                                        <v-textarea xs12
                                            name="sgContent"
                                            label="내용"
                                            v-model="update_content"
                                            id="sg-content-edit"
                                            counter
                                            maxlength="100"
                                        ></v-textarea>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                        label="가격"
                                        v-model="update_price"
                                        type="number"
                                        min="0"
                                        :rules="[v => v>0 || '가격을 작성해주세요']"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click="OnClickUpdateSG">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-layout>
                </v-flex>
            </v-layout>
                
            <v-divider light></v-divider>
            
            <div id="sgresult">
                <span id="s_result">stupid : {{s_percent}}%({{result.stupid}} 표)</span> | 
                <span id="g_result">great : {{g_percent}}%({{result.great}} 표)
            </div>
            
            <v-progress-linear
                id="percentBar"
                v-show="showbar"
                background-color="blue"
                color="error"
                :value="percent"
                height="50"
            ></v-progress-linear>
            
            <v-progress-linear
                id="percentBar"
                v-show="!showbar"
                background-color="purple lighten-3"
                value="0"
                height="50"
            ></v-progress-linear>
            
            
        </v-card>
    </div>
</template>

<script>

export default {
    mounted (){
     //   var length = this.result.content.length;
        var postContent = '';
                
        for(var i = 1; i <= this.result.content.length / 20 + 1 ; i++){
            if(this.result.content.charAt(20*i+ (i-1)) == '\n'){
                postContent += this.result.content.substring(20*(i-1) + (i-1) , 20*i + (i-1))
            }else{
                postContent += this.result.content.substring(20*(i-1) , 20*i) + "\n"
            }   
        }

        this.result.content = postContent;
        
        if(!this.result.image){
            this.imgpath = "http://localhost:3000/static/img/noimage.jpg";
            this.imgbuf = "http://localhost:3000/static/img/noimage.jpg";
        }else {
            this.imgpath = "http://localhost:3000/static/img/sg_images/"+this.result.image;
            this.imgbuf = "http://localhost:3000/static/img/sg_images/"+this.result.image;
        }

        this.update_title = this.result.title;
        this.update_content = this.result.content;
        this.update_price = this.result.price;

        var sum = this.result.stupid + this.result.great;
        if(sum == 0){
            this.showbar = false;
            this.s_percent = 0;
            this.g_percent = 0;
        }else{
            this.percent = (this.result.stupid/sum) * 100; 
            this.showbar = true;

            var s = (this.result.stupid/sum) * 100;
            var g = (this.result.great/sum) * 100;
            this.s_percent = s.toFixed(2);
            this.g_percent = g.toFixed(2);
        }
        
        this.flag = true;
    },

    name: 'StupidGreatResult',
    props : {
        result : []
    },
    data (){
        return{
            flag : '',
            percent : Number,
            showbar : '',
            s_percent : Number,
            g_percent : Number,

            dialog : false,
            imgpath : '',
            imgbuf: '',
            
            update_imgpath : this.result.image,
            update_title : this.result.title,
            update_content: this.result.content,
            update_price : this.result.price
            
        }
    },
    methods : {
        OnClickDeleteSG (){
            this.$http.post('/stupid_great/delete',{postnum : this.result.PostNumber, userid : this.$session.get('id')})
            .then((result)=>{
                if(result.data == 'delete'){
                    this.flag = false;
                    alert("등록한 Stupid Great 게시물을 삭제하셨습니다!")
                }
            });
        },
        uploadIMG(name, files){
                const formData = new FormData();
                console.log(files)
                formData.append('img', files[0]);
                this.$http.post('/stupid_great/create/img', formData)
                .then((result)=>{
                    console.log(result);
                    this.imgbuf = "http://localhost:3000/static/img/sg_images/" + result.body.imgname;
                    this.update_imgpath = result.body.imgname;
                    console.log(this.update.imgpath)
                });
        },
        OnClickUpdateSG (){
            this.$http.post('/stupid_great/update', {postnum: this.result.PostNumber, title: this.update_title, content: this.update_content, price: this.update_price, image: this.update_imgpath})
            .then((result) => {
                console.log(result.data)
                if(result.data == 'success'){
                    alert("게시물 수정을 완료하였습니다!")
                   // this.dialog = false;
                   return location.href = "/mypage"
                }
            });
        }
    }
}
</script>

<style scoped>
#StupidGreatResult{
    width : 500px;
    margin-bottom: 10px;
}
#sgresult{
    text-align: center;
}
#s_result{
    color:red;
    font-size: 17px;
}

#g_result{
    color: blue;
    font-size: 17px;
}

#dropbox{
    background: #26C6DA;
    width: 250px;
    height: 150px;
    position: relative; 
    margin: 0 auto;
}

#dropbox > h3{
    position: absolute;
    color: white;
    left: 70px;
    top: 50px;
    z-index: 2;
}
</style>

