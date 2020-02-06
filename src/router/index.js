import Vue from 'vue'
import VueRouter from 'vue-router'
import Lunbo from '../views/lunbo.vue'
import Index from '../views/index.vue'
import Lunboadd from 'components/lunbo/add.vue'
import lunboshow from 'components/lunbo/show.vue'
import lunboupdata from 'components/lunbo/updata.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/lunbo',
    name: 'lunbo',
    component:Lunbo,
    redirect:'/lunbo/show',
    children: [
      {
        path: 'add',
        name:'lunboadd',
        component: Lunboadd
      },
      {
        path: 'show',
        name:'lunboshow',
        component: lunboshow
      },
      {
        path: 'updata/:id',
        name:'lunboupdata',
        component: lunboupdata
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
