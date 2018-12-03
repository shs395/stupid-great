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
            <div id="imgDiv"></div>
            </v-flex>
        </v-card>
        <v-card id="sg-form-create-card">
            <v-flex>
            <v-text-field
                label="제목"
                name="sgTitle"
                v-model="sgForm.sgTitle"
                box
            ></v-text-field>
            </v-flex>
            <v-flex>
                <v-textarea
                name="sgContent"
                label="내용"
                v-model="sgForm.sgContent"
                id="sg-content-edit"
                ></v-textarea>
            </v-flex>
            <v-flex>
            <v-text-field
                label="가격"
                v-model="sgForm.sgPrice"
                type="number"
                box
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
                sgTitle:"",
                sgContent:"",
                sgPrice:"",
            },
            files: [],
            count : Number
        }
    },

    methods:{

        uploadIMG(name, files){
            if(this.count == 1){
                alert('이미지는 한장만 올려주세요!');
            }else{
                const formData = new FormData();
                console.log(files)
                formData.append('img', files[0]);
                this.$http.post('/stupid_great/create/img', formData)
                .then((result)=>{
                    console.log(result);
                });

                var fr = new FileReader();
                var img = document.createElement("img");
                var imgDiv = document.querySelector("#imgDiv");
                fr.onload = function() {
                    img.src = fr.result;
                    img.classList.add("margin-bottom");
                    imgDiv.appendChild(img);
                }
                fr.readAsDataURL(event.target.files[0]);
                this.sgForm.sgImg = event.target.files[0];

                this.count = 1;
            }
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
    width: 550px;
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
    width: 550px;
    height: 650px;
}

#sg-form-create-card{
    width: 950px;
    height: 650px;
}

#sg-content-edit{
    height: 390px;
}

#imgDiv{
    width: 550px;
    height: 500px;
}

#sg-create-btns{
    margin-left:650px;
}

#contents-reset{
    color:white;
}

#contents-upload{
    color:white;
}

.margin-bottom{
    margin-bottom:10px;
    display: block;
    width: 550px;
    height: 500px;
}
</style>
