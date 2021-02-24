//登录用户接口封装
import ajax from '../utils/request.js'
import { getUser } from '../utils/storage.js'
export default userLogin = (mobile,code) =>{
    return ajax({
        method:'POST',
        url:'mp/v1_0/authorizations',
        data:{
            mobile:mobile,
            code:code
        }
    })
}
//获取用户的身份信息
export const userGetProfile = () =>{
    const userInfo =  getUser()
    return ajax({
        method:'GET',
        url:'mp/v1_0/user/profile',
   
    })
}