<template>
    <div id="random">
        
            <v-card id="random-content"></v-card>


            <center id="center">
                <v-btn-toggle max id="sg-random-btn-group">
                <v-btn class="sg-random-btns" id="stupid-btn" color="red">스튜핏!</v-btn>
                <v-btn class="sg-random-btns" id="skip-btn" color="grey darken-4">SKIP</v-btn>
                <v-btn class="sg-random-btns" id="great-btn" color="blue">그레잇!</v-btn>
                </v-btn-toggle>

                <v-btn fab dark bottom right large :direction="direction" color="indigo lighten-2" id="add-btn">
                    <v-icon>edit</v-icon>
                </v-btn>
            
            </center>
            
    
    </div>
</template>

<script>
export default {
    name : 'StupidGreatRandom',
    props : [

    ],
}
</script>

<style>


#random-content{
    width: 400px;
    height: 370px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 195px;
}

#center{
    margin-left:195px;
}

.sg-random-btns{
    width: 600px;
    height:150px;
    font-size: 80px;
    margin: auto 0;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#stupid-btn{
    color:bisque;
    padding-left: 70px;
    padding-right: 70px;
    
}

#skip-btn{
    color:#F5F5F5;
    padding-left: 70px;
    padding-right: 70px;
}

#great-btn{
    color:#E3F2FD;
    padding-left: 70px;
    padding-right: 70px;
    
}

#random #addbtn{
    margin: 0 0 40px 40px;
}
#add-btn{
    margin-top:60px;
    margin-left: 120px;

}
</style>
