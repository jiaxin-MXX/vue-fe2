<template>
  <div class="contain">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="图片名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图片网页地址">
        <el-input v-model="form.urllink"></el-input>
      </el-form-item>
      <div class='img-bijiao'>
           <el-form-item label="添加图片">
            <el-upload
            class="avatar-uploader"
            action="#"
            drag
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handle"
            >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <div class="fengexian"></div>
        <div class="block">
            <span class="demonstration">原图片</span>
            <el-image fit='contain' :src="src"></el-image>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立刻上传</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { getdata } from "utils/http";
export default {
  data() {
    return {
      form: {
        name: "",
        urllink: "",
        imageUrl: "",
        raw: ""
      },
      src:'',
    };
  },
  async created() {
    let result = await getdata({
      url: "/api/lunboselect",
      params: { id: this.$route.params.id }
    });
    this.form.name = result.data.name;
    this.form.urllink = result.data.urllink;
    this.src = result.data.url;
  },
  methods: {
    handle(res, res2) {
      var objectURL = window.URL.createObjectURL(res.raw);
      this.form.imageUrl = objectURL;
      this.form.raw = res.raw;
    },
    onSubmit() {
      let data = this.form;
      const fd = new FormData();
      console.log(this.form)
      fd.append("file", this.form.raw);
      fd.append("name", this.form.name);
      fd.append("urllink", this.form.urllink);
      fd.append("id", this.$route.params.id);
      axios({
        url: "/api/lunboupdata",
        method: "post",
        data: fd,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        if(res.data.message==='修改成功'){
          this.$message({
            type: 'success',
            message: '数据修改成功'
          });
          this.$alert('修改成功！', '提示', {
            confirmButtonText: '确定',
            callback: async () => {
              let result = await getdata({
                url: "/api/lunboselect",
                params: { id: this.$route.params.id }
              });
              this.form.name = result.data.name;
              this.form.urllink = result.data.urllink;
              this.src = result.data.url;
            }
          });
        }
      });
    },
    resetForm() {
      this.form.name = "";
      this.form.urllink = "";
      this.form.imageUrl = "";
      this.form.raw = "";
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-upload-dragger{
    width :3.6rem
}
.img-bijiao{
    width :100%
    display: flex;
    justify-content: space-between;
    .fengexian{
        height :1.8rem
        border-left: 1px dashed #ccc;
    }
    .block{
        display :flex
        width :50%
        height :1.8rem
    }

}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.el-upload-dragger {
  display: flex;
  justify-content: center;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>