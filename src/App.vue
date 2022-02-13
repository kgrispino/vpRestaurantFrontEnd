<template>
  <div>
    <Navbar />
    
    <router-view/>
    
  </div>

</template>

<script>
import Navbar from './components/Navbar.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data(){
    return{
      title: "Hello",
      user: "please sign in"
    }
  },
  mounted(){
    this.getUser();
  },
  methods:{
    getUser(){
            var name = localStorage.getItem("username");
            var token = localStorage.getItem("token");
            var payload = {"token": token, "username": name};
            axios.post("http://localhost:8080/api/accounts/validate", payload)
            .then(Response => {
                if (Response.data == true){
                    this.user = name;
                }
                else{
                  console.log("please sign in");
                }
            }
            )
        }
  }
}
</script>

