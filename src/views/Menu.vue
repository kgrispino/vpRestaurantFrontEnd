<template>
    <div>
        <div class="grid form-bg">
            <div v-for="product in products" :key="product.name">
                <p>{{ product.name }} <br>
                {{ product.desc }}  <br>
                {{ product.calories }} Calories <br>
                {{ (Math.round(product.price * 100) / 100).toFixed(2) }} $<br>
                </p>
                <input type="number" v-model="product.quantity"> 
            </div>
            <div class="submit">
                <button @click="goToCheckout"> Checkout </button>
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return{
            products: [],
            cart: []

        }
    },
    mounted(){
        this.validateUser();
    },
    methods:{
        getProducts(){
            axios.get("http://localhost:8080/api/products")
            .then(Response => (this.products = Response.data))
            .catch((error) => {
                console.log(error);
            });

        },
        validateUser(){
            var name = localStorage.getItem("username");
            var token = localStorage.getItem("token");
            var payload = {"token": token, "username": name};
            axios.post("http://localhost:8080/api/accounts/validate", payload)
            .then(Response => {
                if (Response.data == true){
                    this.getProducts();
                }
                else{
                    console.log("please sign in");
                }
            }
            )
        },
        goToCheckout(){
            this.cart = [];
            var prodList = {};
            for (var i = 0; i < this.products.length; i++) {
             if (0 < this.products[i].quantity){

                 prodList["name"] =  this.products[i].name
                 prodList["quantity"] = this.products[i].quantity;
                 prodList["price"] = this.products[i].price;
                 prodList["index"] = i;
                 this.cart.push(prodList);
                 prodList = {}
                 
             }
            //Do something
            }
            // console.log(this.cart)
            localStorage.setItem('cart', JSON.stringify(this.cart));

            //How to get data out of localStorage
            // this.cart = JSON.parse(localStorage.getItem("cart"))
            // console.log(this.cart)
            this.$router.push({name: 'Checkout'})
            
        }
    }
}
</script>
 <style scoped>

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    }

    .submit{
    width: 100%;
    
}

 </style>