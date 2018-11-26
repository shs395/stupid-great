<template>
    
    <v-layout row>
      <!-- <v-subheader>항목</v-subheader>
      
      <v-subheader>이름</v-subheader>
     
      <v-subheader>금액</v-subheader>
      
      <v-subheader>평가</v-subheader> -->
      {{data.category}}
      {{data.name}}
      {{data.price}}
      <v-rating v-model="rate" readonly="readonly"></v-rating>
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

