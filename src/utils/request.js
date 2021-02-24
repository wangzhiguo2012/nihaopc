import axios from 'axios'
import { getUser } from './storage'
import JSonbig from 'json-bigint'
const ajax =axios.create({
    baseURL:'http://api-toutiao-web.itheima.net/',
    transformResponse:[function(data){
        //Do whatever you want to transform the data 
        //console.log('transformResponse',data)
        //data 就是本次请求获取的数据
        //在这里可以对他进行进一步的处理JSONbig
        //后端返回数据可能不是JSON字符串，而JSONbig.parse()只能处理JSON字符串
        //所以为了保证代码可以正常执行，这里引入了try-catch来捕获异常
        try {
            //如果没有遇到错误，就返回JSONbig处理之后的数据
            return JSONbig.parse(data)
        }catch(err){
            console.log('JSONbig转换出错',err);
            return data
        }
    }]
})
export default ajax
//Add a request interceptor
//请求拦截器
//所有请求发出之前会执行的函数，都会处理的逻辑
 ajax.interceptors.request.use(function(config){
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