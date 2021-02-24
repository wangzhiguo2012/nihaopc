<template>
  <div class='article-container'>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
              <my-breadcrumb>内容管理</my-breadcrumb>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="状态">
                  <el-radio-group  v-model="form.status">
                    <el-radio :label='null'>全部</el-radio>
                    <el-radio :label='0'>草稿</el-radio>
                    <el-radio :label='1'>待审核</el-radio>
                    <el-radio :label='2'>审核通过</el-radio>
                    <el-radio :label='3'>审核失败</el-radio>
                    <el-radio :label='4'>已删除</el-radio>
                 </el-radio-group>
              </el-form-item>
              <el-form-item label="频道">
                  <el-select v-model="form.channelId" clearable placeholder="请选择频道">
                      <el-option v-for="channel in channels" :key="channel.id" :label="channel.name" :value="channel.id"></el-option>                   
                  </el-select>
              </el-form-item>
              <el-form-item label="日期">
                  <el-col :span="11">
                      <el-date-picker v-model="form.date" type="daterange" value-format="yyyy-MM-dd" 
                      range-separator="至" start-placeholder="开始日期" end-placeholde="结束日期"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width:100%;"></el-time-picker>
                  </el-col>
              </el-form-item>
              <el-form-item>
                  <el-button :loading='loading' type="primary" @click="hQuery">查询</el-button>
              </el-form-item>
          </el-form>
      </el-card>
      <!-- 下面是一个表格区域
      表格的列，结构
      列由el-table-column决定label决定当前列显示出的标题 prop决定当前列数据的来源 prop='data'对于表格来说，它的数据是一个数组，每个元素是一个对
      象，表示一行，这里的prop就是用来从没一个对象中取出属性名为prop值 date的属性值。2.表格的行，数据-->
      <el-card style="margin-top:20px">
          <div slot="header" class="clearfix">
              根据筛选条件查询到{{total_count}}条数据,当前是第{{curPage}}
          </div>
          <el-table :loading='loading' :data="articles" style="width:100%" stripe class="list-table" size='mini'>
              <el-table-column  label="封面">
                  <template slot-scope="scope">
                    <el-image :src='scope.row.cover.images[0]' style="width:150px;height:100px" lazy>
                     <div solt='placeholder' class="image-slot">加载中
                         <span class="dot">...</span>
                     </div>
                    </el-image>    
                  </template>                
              </el-table-column>
              <el-table-column prop="title" label="标题"></el-table-column>
              <!-- 由于后端传回的的数据是值而我们要显示出对应字符串。所以这里不能直接使用status -->
              <el-table-column label="状态">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.status===0">草稿</el-tag>
                    <el-tag v-else-if="scope.row.status===1" type="info">待审核</el-tag>
                    <el-tag v-else-if="scope.row.status===2" type="success">审核通过</el-tag>
                    <el-tag v-else-if="scope.row.status===3" type="warning">审核失败</el-tag>
                    <el-tag v-else-if="scope.row.status===4" type="danger">已删除</el-tag>      
                  </template>
              </el-table-column>
              <el-table-column prop="pubdate" label="发布时间"></el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button size="mini" icon="el-icon-edit" type="primary" cricle @click="hEdit(scope.$index,scope.row)"></el-button>
                      <el-button size="mini" icon="el-icon-delete" type="danger" cricle @click="hDelete(scope.row)"></el-button>         
                  </template>
              </el-table-column>
          </el-table>
      </el-card>
      <el-pagintain :disabled='loading' style="margin-top:10px" background layout='prev,pager,next' @current-change='hPageChange' :total='total_count'></el-pagintain>
  </div>
</template>

<script>
import { getArticles,getArticleChannels,deleteArticle } from '../../api/article.js'
import MyBreadcrumb from '../../components/MyBreadcrumb'
export default {
    name: 'ArticleIndex',
    props: { },
    components:{ MyBreadcrumb },
    data () {
        return {  
            form:{
                channelId:null,
                date:null,
                status:null,
            },
            tableData:[],
            articles:[],
            curPage:1,
            total_count:0,
            channels:[],
            loading:false
         }
    },
    computed: { },
    created () {
        this.loadArticles(),
        this.loadChannels()
     },
    methods:{
        loadChannels(){
            getArticleChannels().then(res=>{
                this.channels= res.data.data.channels
            })
        },
        loadArticles(){
            //调用导入的方法
            //补充一个查询的参数page
            //分析后端接口，补充begin_pubdate end_pubdate参数
            //求这个式子的值this.form.date&&this.form.date[0]
            //如果this.form.date是null则真个式子的值是null
            //如果this.form.date不是null则整个式子的值是this.form.date[0]
            let beginPudate = null
            if (this.form.date) {
                beginPudate = this.form.date[0]
            }
            //const beginPubdate = this.form.date&& this.form.date[0]
            const endPubdate = this.form.date && this.form.date[1]
            //如果用户选择了日期范围，则传入即可
            // 如果用户没有选择日期范围则要把参数设置为null  axios会把参数值为null的数据过滤掉，即不传递这个参数给后端
            let channelId = null
            if (this.form.channelId) {
                channelId = this.form.channelId
            }
            this.loading = false
            getArticles({
                channelId:this.form.channelId,
                status:this.form.status,
                begin_pubdate:beginPudate,
                end_pubdate:endPubdate,
                page:this.curPage}
            ).then(res=>{
                this.articles=res.data.data.results,
                this.total_count= res.data.data.total_count
                this.loading = true
            }).catch(err=>{
                this.$message({
                    message:'查询无效，参数无效',
                    type:'error'
                })
                this.loading= false
            })
        },
        hQuery(){
            this.curPage = 1
            this.loadArticles()
        },
        hEdit(row){
            const id = row.id.tostring()
            //编程式导航
            this.$router.push('editArticle/'+id)
        },
        hDelete(index,row){
            //用户点击了删除
            console.log('要删除的数据如下',row);
            const id = row.id.tostring()
            console.log('要删除的文章编号是',id);
            this.$confirm('你确定要删除吗?','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
              //根据id去删除文章，调用接口传入id
              deleteArticle(id).then(res=>{
                  //删除成功
                  //1.提示
                  this.$message({
                      message:'删除成功',
                      type:'success'
                  })
                  //2.重新加载当前页的数据
                  this.loadArticles()
              }).catch(err=>{
                  this.$message({
                      message:'删除失败',
                      type:'error'
                  })
                  console.dir(err);
              }).catch(()=>{

              })
            })
        },
        hPageChange(curPage){
            console.log(curPage);
            //todo:发出请求
            this.curPage = curPage
            // 再发送请求
            this.loadArticles()
        }
    },
    mounted () { }
}
</script>

<style scoped lang='less'>
    .fiflter-card {
        margin-bottom: 30px;
        .list-table {
            margin-bottom: 20px;
        }
    }
</style>