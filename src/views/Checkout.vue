<template>
    <form class="form-bg" @submit.prevent="sendCart">
    
        <div v-for="item in this.cart" :key="item.name">
            <p>{{ item.name }} <br>
            {{item.quantity}} </p>
            <input type="number" min="1" v-model="item.quantity">
            <p>Price {{(Math.round((item.quantity * item.price)* 100) / 100).toFixed(2) }} </p>
            <button @click="removeFromCart(item.index)"> Remove Item </button>
            
        </div>
        <div class="submit">
            <button> Checkout </button>
        </div>

    </form>

</template>
<script>
import axios from 'axios'

export default {
    data() {
        return{
            cart: {}
        }
        
    },
    mounted(){
        let cartArr = localStorage.getItem("cart");
        this.cart = JSON.parse(cartArr);
        console.log(this.cart);
    },
    methods: {
        sendCart(){
            //token has username in it
            localStorage.setItem("cart", JSON.stringify(this.cart));

            var token = localStorage.getItem("token");
            var cart = localStorage.getItem("cart");
            console.log(this.cart);
            var payload = {"token": token, "cart": cart};
            axios.post("http://localhost:8080/api/purchase/sendCart", payload)
            .then(Response => {
                if (Response.data == true){
                    console.log("Success");
                }
                else{
                    console.log("Failure to send cart");
                }
            })

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
</style>