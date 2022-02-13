<template>
    <div>
        <h1 class="error center" v-if="error == true"> {{ errorMessage }}</h1>
        <form class="form-bg" @submit.prevent="sendCart">
            <div v-for="item in this.cart" :key="item.name">
                <p>{{ item.name }} <br>
                Quantity: {{item.quantity}} </p>
                <input type="number" min="1" v-model="item.quantity">
                <p>Price {{(Math.round((item.quantity * item.price)* 100) / 100).toFixed(2) }} </p>
                <button @click="removeFromCart(item.index)"> Remove Item </button>
                
            </div>
            <div class="submit">
                <button> Checkout </button>
            </div>
        </form>
        <h1 class="success center" v-if="success == true"> {{ successMessage }}</h1>
    </div>

</template>
<script>
import axios from 'axios'

export default {
    data() {
        return{
            cart: {},
            error: false,
            errorMessage: "",
            success: false,
            successMessage: ""
        }
        
    },
    mounted(){
        let cartArr = localStorage.getItem("cart");
        this.cart = JSON.parse(cartArr);
        console.log(this.cart);
    },
    methods: {
        sendCart(){
            this.success = false;
            //token has username in it
            localStorage.setItem("cart", JSON.stringify(this.cart));
            var token = localStorage.getItem("token");
            var cart = localStorage.getItem("cart");
            //Check if cart is empty
            if (cart != '[]' && token != null){
                var payload = {"token": token, "cart": cart};
                axios.post("http://localhost:8080/api/purchase/sendCart", payload)
                .then(Response => {
                    if (Response.data == true){
                        this.error = false;
                        console.log("Success");
                        this.success = true;
                        this.successMessage = "Order Placed"
                    }
                    else{
                        this.error = true;
                        this.errorMessage = "Failure to send cart";
                    }
                })
            }
            else{
                this.error = true;
                //If user logs out during checkout
                if (token != null){
                    this.errorMessage = "Please Login"
                }
                //if cart is empty 
                else{
                    this.errorMessage = "Cart Empty";
                }
            }
            
        },
        removeFromCart(itemId){
            const cartItems = JSON.parse(localStorage.getItem("cart"));
            const loc = cartItems.findIndex(({ index }) => index === itemId);
            cartItems.splice(loc, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            this.cart = JSON.parse(localStorage.getItem("cart"));
        }
    }
}
</script>

<style scoped>
    .submit{
        width: 100%;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
    }
    .center{
        width: 50%;
        padding-top: 10px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
    .success{
        color: green;
    }
</style>