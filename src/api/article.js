import ajax from '../utils/request.js'
// 查询文章
export const getArticles = (queryObj)=>{
    /* 
    ajax请求就是后端给出了答案的填空题
    参数名称   是否必须 示例  备注
    status     否     文章状态0草稿 1 待审核2.审核通过3.审核完成4.已删除
    channel_id 否    频道id不传为全部
    end_pubDate 否   2019-01-02  截止时间，不传就不限定结束时间
    page       否   页数，默认是1
    per_page   否  每页数量。默认每页10条
    response_type  否  返回数据的字段不传返回用于内容管理的字符comment返回用于品论管理的字段传statistic返回用于
    图文数据的字段
    对于axios来说，在哪里填充入参数
    如果参数要放在请求体中的则要写在data
    如果参数要放在请求头中的（get）则要写在params
    如果明确说明参数要放在header中则要写在headers
    */
   return ajax ({
       method:'GET',
       url:'mp/v1_0/articles',
       params:queryObj
   })
}
// 获取文章频道

export const getArticleChannels = ()=>{
    return ajax({
        method:'GET',
        url:'/mp/v1_0/channels'
    })
}
// 删除操作
export const deleteArticle = articleId =>{
    return ajax({
        method:'DELETE',
        url:'mp/v1_0/articles'+articleId
    })
}