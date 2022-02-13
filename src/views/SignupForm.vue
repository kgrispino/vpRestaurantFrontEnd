<template>
    <div>
        <form class="form-bg" @submit.prevent="addAccount" >
            <h1 class=error v-if="accountExists == true"> Username is taken</h1>
            <h1> Sign Up Form</h1>
            <div class="textbox-center">
                <!-- <div class=form-spacing>
                    <input type="text" id="first_name" name="first_name" placeholder="First Name" required v-model="account.role"><br>
                </div> -->
                <div class=form-spacing>
                    <input type="text" id="username" name="username" placeholder="Username" required v-model="account.username"><br>
                </div>
                <!-- <div class=form-spacing>
                    <input type="email" id="email" name="email" placeholder="Email" required v-model="account.email"><br>
                </div> -->
                <div class=form-spacing>
                    <input type="password" id="password" name="password" placeholder="Password" required v-model="account.password"><br>
                </div>
            </div>

            <div class="submit">
                <button class="btn btn-primary"> Create Account</button>
            </div>
        </form>
        <div class=login-dialog>
            <p>Already have an Account?</p>
            <p><router-link :to="{name: 'Login' }">Login</router-link></p>
        </div>
        <!-- get accounts (debug) -->
        <!-- <p>{{accounts}} </p> -->
        
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            account: {},
            accounts: [],
            accountExists: false
        }
    },
    mounted(){
        this.getAccounts();
    },
    methods: {
        addAccount(){
            axios.post("http://localhost:8080/api/accounts/avail", this.account).then(response => {
            this.accountExists = response.data;
            console.log(response.data)
            if (this.accountExists == false){
                axios.post("http://localhost:8080/api/accounts/create", this.account)
                    .then(response => {
                        console.log(response.data);
                    })
            }
            else{
                console.log("Account already exists");
            }
            })
            .catch(e => {
            console.log(e);});
        },
        getAccounts(){
            axios.get("http://localhost:8080/api/accounts")
            .then(response => (this.accounts = response.data))
            //In case of error
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>

<style>
    @media (min-width: 1200px){
        .form-bg{
            margin-left: auto;
            margin-right: auto;
            background-color: rgb(223, 221, 221);
            padding: 50px;
            width: 35%;
            border-radius: 25px;
            text-align: center;
        }
    }
    @media (max-width: 1200px){
        .form-bg{
            margin-left: auto;
            margin-right: auto;
            background-color: rgb(223, 221, 221);
            padding: 50px;
            width: 75%;
            border-radius: 25px;
            text-align: center;
        }
    }

.form-spacing{
    padding: 10px;
}
input{
    width: 100%;
}

.login-dialog {
    padding-top: 10px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
.error {
    color:red;
}
</style>