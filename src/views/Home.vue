<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> {{title}} </h1>
    <h1> {{user}} </h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      title: "Hello",
      user: "Please sign in"
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


 <style scoped>
.home{
  width: 50%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

 </style>