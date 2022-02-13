<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light center-nav">
        <!-- <a class="navbar-brand" href="#">Navbar</a> -->
            <div class="navbar-nav">
                <router-link class="nav-link nav-item active" :to="{name: 'Home' }">Home</router-link>
                <router-link class="nav-link nav-item" :to="{name: 'Signup' }">Sign Up</router-link>
                <router-link class="nav-link nav-item" :to="{name: 'Login' }">Login</router-link>
                <router-link class="nav-link nav-item" :to="{name: 'Menu' }"> Menu</router-link>
                <a @click="logout()" class="nav-link nav-item" href="#" >Logout</a>
            </div>
       
    </nav>
    
</template>

<script>
export default {
    setup() {
        
    },
    methods: {
        logout(){
            //Clear local storage
            localStorage.removeItem("token");
            localStorage.removeItem("cart");
            localStorage.removeItem('username')
        }
    }
}
</script>

<style>
.navbar-nav {
    text-align: center;
    margin-left: 25px;
}

</style>

