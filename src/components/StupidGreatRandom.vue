<template>
    <div id="random">
        <v-card id="randomCard">
        <v-btn class="sg-random-btns" flat  color="red lighten-1">스튜핏</v-btn>
        <v-btn class="sg-random-btns" flat>SKIP</v-btn>
        <v-btn class="sg-random-btns" flat>그레잇</v-btn>

        <v-btn
              color="cyan"
              dark
              large
              absolute
              bottom
              right
              fab
              id="addbtn"
        >
            <v-icon>add</v-icon>
        </v-btn>
        </v-card>
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
#random{
    
}
#randomCard{
    width: auto;
    height: 100%;
    text-align: center;
}
.sg-random-btns{
    width: 300px;
    height:150px;
    font-size: 100px;
    margin: auto 0;
}
#random #addbtn{
    margin: 0 0 40px 40px
}
</style>
