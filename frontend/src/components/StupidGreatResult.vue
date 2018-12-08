<template>
    <div id="StupidGreatResult">
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
                            <div>가격 : {{result.price}}</div>
                        </div>
                    </v-card-title>
                </v-flex>
                <v-flex>
                    <v-btn @click="OnClickDeleteSG" color="red lighten-1" icon>
                        <v-icon color="white">clear</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
                
            <v-divider light></v-divider>
            
            <div>stupid : {{result.stupid}} 표, {{s_percent}} , great : {{result.great}} 표, {{g_percent}}</div>
            
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
            s_percent = '0%';
            g_percent = '0%';
        }else{
            this.percent = (this.result.stupid/sum) * 100; 
            this.showbar = true;
            this.s_percent = (this.result.stupid/sum) * 100 + '%'
            this.g_percent = (this.result.great/sum) * 100 + '%'
        }
    },

    name: 'StupidGreatResult',
    props : {
        result : []
    },
    data (){
        return{
            percent : Number,
            showbar : '',
            s_percent : '',
            g_percent : ''
        }
    },
    method : {
        OnClickDeleteSG (){

        }
    }
}
</script>

<style <style scoped>
#StupidGreatResult{
    width : 450px;
    margin-left: 10px;
    margin-bottom: 10px;
}
</style>

