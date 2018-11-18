<template>
<div id="link">
    <router-link to="/">Home</router-link> |
    <router-link to="/signin">Sign in</router-link> |
</div>
</template>

<script>
export default {
    name : 'linkComponent',
    props : [

    ]
}
</script>

<style>
#link{
    text-align: center;
}
</style>

