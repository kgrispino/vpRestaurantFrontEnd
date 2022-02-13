import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignupForm from '../views/SignupForm.vue'
import LoginForm from '../views/LoginForm'
import Menu from '../views/Menu'
import Checkout from '../views/Checkout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupForm

  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm

  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }
]

const router = new VueRouter({
  routes
})

export default router
