//专门用来处理用户信息本地持久化 保存在localStorage
//定义一些工具方法，实现数据保存获取，删除，修改
const KEY = 'hm-tt-pc-userInfo'
const  setUser = (user) =>{
    localStorage.setItem(KEY,JSON.stringify(user))
}
const getUser = ()=>{
    const result = JSON.parse(localStorage.getItem(KEY) || {})
    return result
}
const delUser = ()=>{
    localStorage.removeItem(KEY)
}
export { setUser,getUser,delUser}