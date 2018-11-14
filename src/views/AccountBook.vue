<template>
<div id="account-book">
    <toolbar />
    <h1>가계부 페이지</h1>
    <linkComponent />
</div>
</template>

<script>
 import toolbar from '../components/toolbar'
  import linkComponent from '../components/link'
export default {
    name : 'account-book',

    components: {
      toolbar,
      linkComponent
    }
  
}
</script>
