import axios from 'axios'
export const get = async function({url}){
    let result = await axios({
        url,
        method:'get'
    })
    return result.data
}
export const getdata = async function({url,params}){
    // console.log(data)
    let result = await axios({
        url,
        method:'get',
        params
    })
    return result.data
}