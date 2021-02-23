import axios from 'axios'
import { getUser } from './storage'
const ajax =axios.create({
    baseURL:'http://api-toutiao-web.itheima.net/'
})
export default ajax
//Add a request interceptor
//请求拦截器
//所有请求发出之前会执行的函数，都会处理的逻辑
 instance.interceptors.request.use(function(config){
     const userInfo =getUser()
     //Do something before request is sent
     //在请求发出去之前做一些事
     //本次请求采用的配置
     //补充一个headers参数Authorization
     if (userInfo && userInfo.token) {
         config.headers.Authorization = `Bearer ${userInfo.token}`
     }
     return config
 },function(error){
     //Do something with request error 
     return Promise.reject
 })