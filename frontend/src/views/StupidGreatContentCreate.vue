<template>
<div id="stupid-great-content-create">
    <toolbar/>
    <v-layout row wrap>
        <v-card id="sg-img-create-card">
            <v-flex xs12 sm7>
            <UploadButton
                id="upload-btn" 
                title="이미지 올리기" 
                color="grey" 
                :fileChangedCallback="fileChanged">
            </UploadButton>
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
                <v-btn id="contents-reset" color="red">초기화</v-btn>
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
//                sgImg:"",
            },
        }
    },

    methods:{
        fileChanged(file){

            var fr = new FileReader();
            var img = document.createElement("img");
            var imgDiv = document.querySelector("#imgDiv");
            fr.onload = function() {
                img.src = fr.result;
                img.classList.add("margin-bottom");
                imgDiv.appendChild(img);
            }
            fr.readAsDataURL(event.target.files[0]);
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
        }
    }
    
}
</script>

<style>

#upload-btn{
    width: 618px;
}

#sg-img-create-card{
    width: 500px;
    height: 500px;
}
#sg-form-create-card{
    width: 900px;
    height: 650px;
}

#sg-content-edit{
    height: 390px;
}

#imgDiv{
    width: 300px;
    height: 300px;
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
    width: 200px;
    height: 200px;
}
</style>
