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
                            <div>내용 : {{result.content}}</div>
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
                    <v-btn @click="OnClickUpdateSG" color="purple lighten-3" icon>
                        <v-icon color="white">edit</v-icon>
                    </v-btn>
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
    created (){
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
            g_percent : Number
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
       /* OnClickDeleteSG (){
            this.$http.post('/stupid_great/update', {userpost: this.result})
            .then((result) => {

            });
        }*/
    }
}
</script>

<style <style scoped>
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
</style>

