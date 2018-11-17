<template>
    <div id="sg-content-card">
        <v-card id="sg-content">
            <v-layout>
                <v-flex xs5>
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                        height="170px"
                        contain
                    ></v-img>
                </v-flex>
                
                <v-flex xs7>
                    <v-card-title primary-title>
                        <div>
                        <div class="headline"><span>Supermodel</span></div>
                        <div><span>Foster the People</span></div>
                        <div><span>(2014)</span></div>
                        </div>
                    </v-card-title>
                    </v-flex>
            </v-layout>
                
            <v-divider light></v-divider>
            
            <v-card-actions id="sg-btns-group">
                <v-btn color="red" class="sg-btns" id="stupid-btn">스튜핏!</v-btn>
                <v-btn color="blue" class="sg-btns" id="great-btn">그레잇!</v-btn>
            </v-card-actions>
            
        </v-card>
    </div>
    
</template>

<script>
export default {
    name: 'StupidGreatContent',
    
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