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
                    <v-btn color="red lighten-1" icon>
                        <v-icon color="white">clear</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
                
            <v-divider light></v-divider>
            
            <v-card-actions>
                <div>stupid : {{result.stupid}} 표</div>
                <div>great : {{result.great}} 표</div>
            </v-card-actions>
            
        </v-card>
    </div>
</template>

<script>

export default {
    name: 'StupidGreatResult',
    props : {
        result : []
    },
}
</script>

<style>
#StupidGreatResult{
    width : 500px;
    margin-left: 10px;
    margin-bottom: 10px;
}
</style>
