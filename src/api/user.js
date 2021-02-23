//登录用户接口封装
import ajax from '../utils/request.js'
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