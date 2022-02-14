<template>
    <div>
        <h1 class=center> The Menu </h1>
         <h1 class="error center" v-if="error == true"> {{ errorMessage }}</h1>
        <div class="grid form-bg">
            <div v-for="product in products" :key="product.name">
                <p>{{ product.name }} <br>
                {{ product.desc }}  <br>
                {{ product.calories }} Calories <br>
                {{ (Math.round(product.price * 100) / 100).toFixed(2) }} $<br>
                </p>
                <input type="number" v-model="product.quantity"> 
            </div>
        </div>
        <div class="center">
                <button class="btn btn-primary" @click="validateUser"> Checkout </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return{
            products: [],
            cart: [],
            error: false,
            errorMessage: ""
        }
    },
    //Load products on page load
    mounted(){
        this.getProducts();
    },
    methods:{
        getProducts(){
            axios.get("http://localhost:8080/api/products")
            .then(Response => (this.products = Response.data))
            .catch((error) => {
                console.log(error);
            });

        },
        //Validate User and checkout if items in cart
        validateUser(){
            var name = localStorage.getItem("username");
            var token = localStorage.getItem("token");
            if (token != null){
                this.error = false;
                var payload = {"token": token, "username": name};
                axios.post("http://localhost:8080/api/accounts/validate", payload)
                .then(Response => {
                    if (Response.data == true){
                        this.goToCheckout();
                    }
                    else{
                        console.log("Validation Error: please sign in again");
                    }
                })
            }
            else{
                this.errorMessage = "Please Sign In"
                this.error = true;
            }
        },
        //Put products in cart and redirect to checkout
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
            }
            if (0 < this.cart.length){
                // 
                localStorage.setItem('cart', JSON.stringify(this.cart));

                // How to get data out of localStorage
                // this.cart = JSON.parse(localStorage.getItem("cart"))
                // console.log(this.cart)
                this.$router.push({name: 'Checkout'})
            }
            else{
                this.errorMessage = "Cart is Empty"
                this.error = true;
            }
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
.center{
  width: 50%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

 </style>