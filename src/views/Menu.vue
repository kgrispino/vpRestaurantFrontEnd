<template>
    <p>{{ products }}</p>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return{
            products: []
        }
    },
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

        }
    }
}
</script>