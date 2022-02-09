<template>
    <div>
        <form class="form-bg" @submit.prevent="checkAccount" >
            <h1> Log In</h1>
            <div class="textbox-center">
                <div class=form-spacing>
                    <input type="email" id="email" name="email" placeholder="Email" required v-model="account.email"><br>
                </div>
                <div class=form-spacing>
                    <input type="password" id="password" name="password" placeholder="Password" required v-model="account.password"><br>
                </div>
            </div>

            <div class="submit">
                <button> Create Account</button>
            </div>
        </form>
        <div class=login-dialog>
            <p>Don't have an Account?</p>
            <p><router-link class="nav-link" :to="{name: 'Signup' }">Create an Account</router-link></p>
        </div>
        
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            account: {}
        }
    },
    mounted(){

    },
    methods: {
        checkAccount(){
            var check_email = this.account.email;
            var check_pass = this.account.password;
            console.log(check_email);
            axios.get("http://localhost:8080/api/accounts/validate/" + check_email + "/" + check_pass).then(response => {
            var accountExists = response.data;
            if (accountExists == true){
                console.log("Logged In")
                //Store email for use
                localStorage.setItem("loginEmail", this.account.email);
            }
            else{
                console.log("Account details wrong");
            }
            })
            .catch(e => {
            console.log(e);});
        }
    }
    
}
</script>
