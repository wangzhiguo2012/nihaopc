<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header">
        <my-breadcrumb>素材管理</my-breadcrumb>
      </div>
      <div style="padding-bottom: 20px">
        <el-radio-group v-model="collect" size="mini" @change="hCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="false">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          @click="dialogVisible = true"
          type="success"
          size="mini"
          style="float: right"
          >上传图片素材</el-button
        >
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
          v-for="(image, idx) in images"
          :key="image.id"
          class="img_item"
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
        >
          <el-image
            :src="image.url"
            style="height: 150px"
            fit="cover"
          ></el-image>
          <div class="option" v-show="!collect">
            <span
              :style="{ color: image.is_collected ? 'red' : '#fff' }"
              class="el-icon-star-off"
              @click="hSwitchCollect(image)"
            ></span>
            <span class="el-icon-delete" @click="hDelete(image.id, idx)"></span>
          </div>
        </el-col>
      </el-row>
      <!-- 素材列表 -->
    </el-card>
    <el-pagintaion
      style="margin-top: 10px"
      background
      layout="prev,pager,next"
      @current-change="hCollectChange"
      :page-size="per_page"
      :total="total_count"
    ></el-pagintaion>
    <el-dialog
      title="提示"
      :append-to-body="true"
      :visible.sync="dialogVisible"
    >
      <!-- action必选参数上传的地址
             headers 设置上传的请求头部，要携带token
             name上传的文件字段名要与接口中要求保持一致
             show-file-list是否显示已上传文件列表
             before-upload上传之前对文件进行检测
             on-success文件上传成功时的钩子function(response,file,fileList) -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :on-success="hUploadSuccess"
        name="image"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="imgsrc"
          :src="imgSrc"
          alt=""
          class="avatar"
          @load="hLoadImgOK" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i
      ></el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImage, switchCollect, deleteImage } from "../../api/image";
import { getUser } from "../../utils/storage.js";
export default {
  name: "ImageIndex",
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false,
      radio1: "全部",
      images: [],
      collect: false,
      total_count: 0,
      cur_page: 1,
      per_page: 10,
      imgSrc: null,
      headers: {
        Authorzation: `Bearer ${getUser().token}`,
      },
    };
  },
  computed: {},
  created() {
    this.loadImages();
  },
  methods: {
    async loadImages() {
      //在后面的分页，删除等操作中，加载图片会多次使用
      //所以这里封装成一个独立的方法
      try {
        const res = await getImages({
          per_page: this.per_page, //每页几条
          page: this.cur_page, //请求的页码
          collect: this.collect,
        });
        this.images = res.data.data.results;
      } catch (err) {
        console.log(err);
      }
    },
    hPageChange(curPage) {
      //alert(curPage)
      //1.更新查询参数
      this.cur_page = curPage;
      //2.再发请求
      this.loadImages();
    },
    hCollectChange() {
      this.loadImages();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jepg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("图片只能是JPG格式！");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过2MB");
      }
      return isJPG && isLt2M;
    },
    //如果上传成功，则会把响应结果传给res
    hUploadSuccess(res) {
      console.log(res);
      this.imgSrc = res.res.data.url;
      this.$message.success("上传素材成功");
      this.loadImages();
    },
    hLoadImgOK() {
      //关闭对话框，把imgsrc置空
      //2000 给用户一点时间反应
      setTimeout(() => {
        this.dialogVisible = false;
        this.imgSrc = null;
      }, 2000);
      //alert('用户成功地看到这张图')
    },
    async hSwitchCollect(image) {
      对象解构赋值;
      const { id, is_collected } = image;
      try {
        //是否收藏:要在原来的基础上取反，!is_collected
        // (图片id，是否收藏)
        await switchCollect(id, !is_collectd);
        //如果代码到了这里，说明这个ajax是成功的
        this.$message.success("操作成功");
        //更新视图
        //两种方案
        //方案1 整个更新数据，就是重新请求，成本高，不划算
        //this.loadImages()
        //方案2只更新当前这个图片的数据项
        //image是一个对象，就是当前被点击那张图片，你改了这些的数据，则images中的数据也改了
        //则视图也会更新
        image.is_collected = !is_collected;
      } catch {
        this.$message.error("操作失败");
      }
    },
    //删除图片
    hDelete(id, idx) {
      // id:要删除的图片编号，
      //idx这张图在当前images中的下标
      this.$confirm("删除了就找不回来了", "提示", {
        confirmButtontext: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await deleteImage(id);
            this.$message.success("删除成功");
            //更新页面，有两种方案
            //方案一：更新整个页面，就是重新请求，成本高，不划算，
            //this.loadImages()
            //方案2只更新当前数据在images中删除这一项
            //idx就是这一项在当前数据项images中的位置(索引值)，直接删除它
            //从数组this。images中第idx开始删除第一项
            this.images.splice(idx, 1);
          } catch {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {});
    },
  },
  mounted() {},
};
</script>

<style scoped lang='less'>
.img_item {
  position: relative;
  box-sizing: border-box;
}
.option {
  position: absolute;
  left: 5px;
  right: 5px;
  bottom: 5px;
  bottom: 5px;
  height: 30px;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #fff;
  span {
    margin: 0 30px;
    cursor: pointer;
  }
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>