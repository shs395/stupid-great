<template>
<div id="stupid-great-content-create">
    <toolbar/>
    <v-card>
        <h1>제목</h1>
        <h1>내용</h1>
        <h1>가격</h1>
        <h1>이미지 업로드</h1>
    </v-card>
</div>
</template>

<script>
import toolbar from '../components/toolbar'

export default {
    name: 'stupid-great-content-create',
    components: {
        toolbar,
    },
    
}
</script>

<style>

</style>
