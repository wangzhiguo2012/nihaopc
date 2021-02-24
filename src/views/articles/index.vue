<template>
  <div class='article-container'>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="状态">
                  <el-radio-group  v-model="form.resource">
                    <el-radio label="全部"></el-radio>
                    <el-radio label="草稿"></el-radio>
                    <el-radio label="待审核"></el-radio>
                    <el-radio label="审核通过"></el-radio>
                    <el-radio label="审核失败"></el-radio>
                    <el-radio label="已删除"></el-radio>
                 </el-radio-group>
              </el-form-item>
              <el-form-item label="频道">
                  <el-select v-model="form.region" placeholder="请选择频道">
                      <el-option label="频道一" value="shanghai"></el-option>
                      <el-option label="频道二" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="日期">
                  <el-col :span="11">
                      <el-date-picker type="date" placeholder="请选择日期" v-model="form.date1" style="width:100%"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width:100%;"></el-time-picker>
                  </el-col>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="hQuery">查询</el-button>
              </el-form-item>
          </el-form>
      </el-card>
      <!-- 下面是一个表格区域
      表格的列，结构
      列由el-table-column决定label决定当前列显示出的标题 prop决定当前列数据的来源 prop='data'对于表格来 -->
      <el-card style="margin-top:20px"></el-card>
  </div>
</template>

<script>
export default {
    name: 'ArticleIndex',
    props: { },
    data () {
        return {  
            form:{
                name:'',
                region:'',
                date1:"",
                date2:"",
                delivery:false,
                type:[],
                resource:'',
                desc:''
            }
         }
    },
    computed: { },
    created () { },
    methods:{
        hQuery(){

        }
    },
    mounted () { }
}
</script>

<style scoped lang='less'></style>