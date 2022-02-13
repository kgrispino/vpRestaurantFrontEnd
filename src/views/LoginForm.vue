<template>
    <div>
        <form class="form-bg" @submit.prevent="checkAccount" >
            <h1 class=error v-if="accountExists == false"> Username doesn't exist</h1>
            <h1> Log In</h1>
            <div class="textbox-center">
                <div class=form-spacing>
                    <input type="text" id="username" name="username" placeholder="Username" required v-model="account.username"><br>
                </div>
                <div class=form-spacing>
                    <input type="password" id="password" name="password" placeholder="Password" required v-model="account.password"><br>
                </div>
            </div>

            <div class="submit">
                <button class="btn btn-primary"> Login</button>
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
            account: {},
            accountExists: true
        }
    },
    mounted(){

    },
    methods: {
        checkAccount(){
            axios.post("http://localhost:8080/api/accounts/authenticate/", this.account).then(response => {
                console.log(response.data.token)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', this.account.username)
                this.accountExists = true;
                this.$router.push({name: 'Menu'})
            })
            .catch(e => {
            console.log(e, "Account Details wrong or Doesn't Exist");
            this.accountExists = false;
            console.log(this.accountExists);
            });

        }
    }
    
}
</script>
