<template>
  <div class='image-container'>
      <el-card class="box-card">
          <div slot="header">
              <my-breadcrumb>素材管理</my-breadcrumb>
          </div>
          <div style="padding-bottom:20px">
              <el-radio-group v-model="radio1" size="mini">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="收藏"></el-radio-button>
              </el-radio-group>
          </div>
          <!-- 素材列表 -->
          <el-row :gutter="10">
              <el-col class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
                  <el-image style="height:100px;width:180px"  fit='cover'></el-image>
                  <div class="option">
                      <span class="el-icon-star-off"></span>
                      <span class="el-icon-delete"></span>
                  </div>
              </el-col>
          </el-row>
          <!-- 素材列表 -->
      </el-card>
  </div>
</template>

<script>
export default {
    name: 'ImageIndex',
    components:{

    },
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