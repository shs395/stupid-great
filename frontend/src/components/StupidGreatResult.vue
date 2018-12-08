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
                        <div class="headline">제목 : <span></span></div>
                        <div>내용 : </div>
                        <div>가격 : </div>
                        </div>
                    </v-card-title>
                    </v-flex>
            </v-layout>
                
            <v-divider light></v-divider>
            
            <v-card-actions>
                <h3>stupid? great! 결과 보여주기</h3>
            </v-card-actions>
            
        </v-card>
    </div>
</template>

<script>

export default {
    name: 'StupidGreatResult',
    props : {

    }
}
</script>

<style>
#StupidGreatResult{
    width : 500px;
}
</style>
