import ajax from '../utils/request.js'
// 获取素材列表
export const getImages = (paramsObj)=>{
    return ajax({
        method:'GET',
        url:'mp/v1_0/user/images',
        params:paramsObj
    })
}
//切换收藏图片
export const switchCollect =(id,collect) =>{
    return ajax ({
        method:'PUT',
        url:'/mp/v1_0/user/images/'+id,
        data:{
            collect
            //'collect':collect
        }
    })
}
//删除图片
export const deleteImage = id =>{
    return ajax ({
        method:'delete',
        url:'mp/v1_0/user/images'+id
    })
}
