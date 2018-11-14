<template>
<div id="link">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/signin">Sign in</router-link> |
    <router-link to="/signup">Sign up</router-link> 
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

