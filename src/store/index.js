import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import axios from 'axios'
Vue.use(Vuex)
const slider = [
  {
    id:1,
    path:'product/huawei',
    title:'华为'
  },
  {
    id:2,
    path:'product/oppo',
    title:'OPPO'
  },
  {
    id:3,
    path:'product/vivo',
    title:'VIVO'
  },
  {
    id:4,
    path:'product/Samsung',
    title:'三星'
  },
  {
    id:5,
    path:'product/mi',
    title:'小米'
  }
]
export default new Vuex.Store({
  modules: { 
    admin:test 
  },
  state: {
    user:null,
    slider
  },
  mutations: {
    changeuser(state,action){
      console.log(action)
      state.user = action.user
    },
    changeslider(state,action){
      console.log(action)
      state.slider = action.data
    }
  },
  actions:{
    async getslider({commit}){
      let data = await axios({
        url: "http://localhost:3000/slider",
        method:'get'
      })
      console.log(data)
      commit('changeslider',data)
    }
  }

})
