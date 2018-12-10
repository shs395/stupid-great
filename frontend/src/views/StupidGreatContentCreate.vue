<template>
<div id="stupid-great-content-create">
    <toolbar/>
    <v-layout row wrap>
        <v-card id="sg-img-create-card">
            <v-flex xs12 sm7>
            <div id="dropbox">
                <input type="file" id="imgFile" name="imgFile" @change="uploadIMG($event.target.name, $event.target.files)" @drop="uploadIMG($event.target.name, $event.target.files)">
                <h3>파일을 드래그해서 드랍해주세요!</h3>
            </div>
            <div>
                <v-img
                    :src="imgbuf"
                    height="500px"
                    contain>
                    </v-img>
            </div>
            </v-flex>
        </v-card>
        <v-card id="sg-form-create-card">
            <v-flex>
            <v-text-field
                label="제목"
                name="sgTitle"
                v-model="sgForm.sgTitle"
                :rules="[v => v <= 15 || '제목은 최대 15글자 입니다.']"
                counter
                maxlength="15"
                box
                required
            ></v-text-field>
            </v-flex>
            <v-flex>
                <v-textarea
                name="sgContent"
                label="내용"
                v-model="sgForm.sgContent"
                id="sg-content-edit"
                :rules="[v => v <= 100 || '내용은 최대 100글자 입니다.']"
                counter
                maxlength="100"
                required
                ></v-textarea>
            </v-flex>
            <v-flex>
            <v-text-field
                label="가격"
                v-model="sgForm.sgPrice"
                type="number"
                :rules="[v => !!v || '가격을 입력해 주세요']"
                box
                required
            ></v-text-field>
            </v-flex>
            <div id="sg-create-btns">
                <v-btn @click="OnClickReset" id="contents-reset" color="red">초기화</v-btn>
                <v-btn @click="OnClickUpload" id="contents-upload" color="blue">게시물 업로드 </v-btn>
            </div>
        </v-card>
    </v-layout>
</div>
</template>


<script>
import toolbar from '../components/toolbar'
import UploadButton from 'vuetify-upload-button';

export default {
    name: 'stupid-great-content-create',
    components: {
        toolbar,
        UploadButton,
    },
    data (){
        return{
            sgForm: {
                sgTitle: "",
                sgContent: "",
                sgPrice: "",
                sgImg: ""
            },
            files: [],
            imgbuf :'',
        }
    },

    methods:{

        uploadIMG(name, files){
                const formData = new FormData();
                console.log(files)
                formData.append('img', files[0]);
                this.$http.post('/stupid_great/create/img', formData)
                .then((result)=>{
                    console.log(result);
                    this.sgForm.sgImg = result.body.imgname;
                    this.imgbuf = "http://localhost:3000/static/img/sg_images/" + result.body.imgname; 
                });
        },

        OnClickUpload(){
            this.$http.post('/stupid_great/create', {writerid:this.$session.get('id') ,post: this.sgForm})
            .then((response) => {
                console.log(response.data);
                if(response.data == 'saved'){
                    return location.href="/stupid-great-community";
                }else if(response.data == 'fail'){
                    alert("게시물 업로드에 실패 하였습니다.");
                }
            });
        },
        OnClickReset (){
            this.sgForm.sgTitle = '';
            this.sgForm.sgContent = '';
            this.sgForm.sgPrice = '';
        }
    }
    
}
</script>

<style>

#dropbox{
    background: #26C6DA;
    width: 620px;
    height: 150px;
    position: relative; 
    margin: 0 auto;
}

#dropbox > h3{
    position: absolute;
    color: white;
    left: 110px;
    top: 50px;
    z-index: 2;
}

#imgFile{
    position: absolute;
    opacity: 0;
    width:100%;
    height:100%;
    top:0;
    left:0;
    z-index: 3;
}

#upload-btn{
    width: 618px;
}

#sg-img-create-card{
    width: 620px;
    height: 650px;
}

#sg-form-create-card{
    width: 870px;
    height: 650px;
}

#sg-content-edit{
    height: 390px;
}

#sg-create-btns{
    margin-left:600px;
}

#contents-reset{
    color:white;
}

#contents-upload{
    color:white;
}
</style>
