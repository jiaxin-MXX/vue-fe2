import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'

import Product from 'components/product/product.vue'
import ProductC from 'components/product/productC.vue'
import Productadd from 'components/product/productadd.vue'
import Detail from 'components/product/detail.vue'

import Order from 'components/order/order.vue'

import Show from 'components/show/show.vue'

import User from 'components/user/user.vue'
import Guke from 'components/user/guke.vue'
import store from 'store'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  }
  ,
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect:'/product/all',
    children:[
      {
        path: '/product/:mess',
        name:'product',
        component: Product,
      },
      {
        path:'/productadd',
        name:'add',
        component:Productadd
      },
      {
        path:'/detail',
        name:'detail',
        component:Detail
      },
      {
        path:'/change',
        name:'change',
        component:ProductC
      },
      {
        path:'/order',
        name:'order',
        component:Order
      },
      {
        path:'/tongji',
        name:'tongji',
        component:Show
      },
      {
        path:'/user',
        name:'user',
        component:User
      },
      {
        path:'/guke',
        name:'guke',
        component:Guke
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(from.name=='login' || to.name=='login'){
    next()
  }else{
    if(store.get('user')){
      next()
    }else{
      next("/login")
    }
  }
  // next()
})

export default router
