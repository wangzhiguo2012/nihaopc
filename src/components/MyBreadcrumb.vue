<template>
  <el-breadcrum separator-class='el-icon-arrow-right'>
      <el-breadcrum-item :to="{path:'/'}">首页</el-breadcrum-item>
      <el-breadcrum-item><solt></solt></el-breadcrum-item>
  </el-breadcrum>
</template>

<script>
export default {
    //内容管理这几个字，应该能让用户自行传入的
    //解决方案：solt
    //定义默认插槽：<solt></solt>
    //使用插槽 <my-breadcrumb>发布文章</my-breadcrumb>
    name: 'MyBreadcrumb',
    props: { },
    data () {
        return { }
    },
    computed: { },
    created () { },
    mounted () { }
}
</script>

<style scoped lang='less'></style>