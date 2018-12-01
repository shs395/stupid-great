<template>
    <v-layout row>
      <v-flex xs3>
        <v-card flat tile>
          {{data.category}}
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card flat tile>
          {{data.name}}
        </v-card>
      </v-flex>
      <v-flex xs3 >
        <v-card flat tile>
          {{data.price}}
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card flat tile>
           <v-rating v-model="rate" readonly="readonly"></v-rating>
        </v-card>
      </v-flex>
    </v-layout>
     
</template>

<script>
export default {
  name: "AccountComp",
  props:["data"],
  methods:{
      addC:function(){
          alert(this.data);
      }
  },
  data:function(){
      return{
          rate:this.data.rate
      }
  }
}

</script>

