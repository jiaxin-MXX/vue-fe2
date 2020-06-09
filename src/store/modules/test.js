export default {
    namespaced:true,
    state:{
        name:'贾鑫',
        age:18
    },
    getters:{
        getname:(state)=>{
            return `帅气的${state.name}` 
        }
    },
    mutations:{
        changename(state,payload){
            state.name =  payload.name
        }
    },
    actions:{
        geturlname({commit}){
            commit('changename',{
                name:'谷子'
            })
        }
    }
}