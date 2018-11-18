<template>
<div id="home">
  <toolbar/>
  <h1>home</h1>
  <linkComponent />
</div>
</template>

<script>

  import linkComponent from '../components/link'
  import toolbar from '../components/toolbar'

  export default {
    components: {

      linkComponent,
      toolbar
    }
  }
</script>

<style>
#home{
  text-align: center;
}
</style>

