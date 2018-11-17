<template>
    <div id="random">
       <v-card color="transparent">
              <v-layout>
                <v-flex xs5>
                  <v-img
                    src="https://cdn.pixabay.com/photo/2017/03/27/14/53/macaroons-2179198_1280.jpg"
                    height="400px"
                    contain
                    id="random-img"
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div id="random-content">
                      <div id="random-head">제목 : <span>마카롱</span></div>
                      <v-divider light></v-divider><br>
                      <div>내용 : <span>마카롱 먹고싶은데 살까요 말까요</span></div><br>
                      <v-divider light></v-divider>
                      <div id="random-price">가격 : <span>2000원</span></div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                   <center id="center">
                        <v-btn class="sg-random-btns" id="random-stupid-btn" color="red">스튜핏!</v-btn>
                        <v-btn class="sg-random-btns" id="skip-btn" color="grey darken-4">SKIP</v-btn>
                        <v-btn class="sg-random-btns" id="random-great-btn" color="blue">그레잇!</v-btn>
                    <v-btn fab dark bottom right large :direction="direction" color="indigo lighten-2" id="add-btn">
                        <v-icon>edit</v-icon>
                    </v-btn>
                </center>
              </v-card-actions>
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
    background: url(../assets/question-bg.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  min-block-size: 642px;
}

#random-img{
    margin-top:20px;
    margin-left:173px;
}

#random-content{
    margin-top:50px;
    margin-left: 50px;
    font-size:30px;
    color:#FFF8E1;
}

#random-price{
    color:#EF5350;
}

#random-head{
    font-size:50px;
}

#center{
    margin-left:157px;
}

.sg-random-btns{
    width: 373px;
    height:150px;
    font-size: 70px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#random-stupid-btn{
    color:bisque;
    padding-left: 70px;
    padding-right: 70px;
    
}

#skip-btn{
    color:#F5F5F5;
    padding-left: 70px;
    padding-right: 70px;
}

#random-great-btn{
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
