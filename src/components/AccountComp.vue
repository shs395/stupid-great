// accountbook 항목들
<template>
    <v-layout row>
      <v-subheader>항목</v-subheader>
      <v-subheader>이름</v-subheader>
      <v-subheader>금액</v-subheader>
      <v-subheader>평가</v-subheader>
      <v-rating v-model="rating"></v-rating>
    </v-layout>
</template>