<template>
<div id="link">
    <v-footer id="footer" color="indigo lighten-5" class="pa-3">
        <div id="links">
            <router-link to="/">Home</router-link> |
            <router-link to="/signin">Sign in</router-link> |
            <router-link to="/developers">Developers</router-link> 
        </div>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
</div>
</template>

<script>
export default {
    name: "LinkFooter",
}
</script>

