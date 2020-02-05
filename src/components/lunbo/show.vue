<template>
  <div class="contain">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="图片名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图片网页地址">
        <el-input v-model="form.urllink"></el-input>
      </el-form-item>
      <el-form-item label="添加图片">
        <el-upload
        class="avatar-uploader"
        action="#"
        drag
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handle">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立刻上传</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        form: {
          name: '',
          urllink:'',
          imageUrl:'',
          raw:''
        }
      }
    },
    methods: {
      handle(res,res2) {
        var objectURL = window.URL.createObjectURL(res.raw);
        this.form.imageUrl = objectURL
        this.form.raw = res.raw
      },
      onSubmit() {
         let data=this.form
          const fd = new FormData();
          fd.append('file', this.form.raw);
          fd.append('name', this.form.name);
          fd.append('urllink', this.form.urllink);
          axios({
                url: '/api/lunboadd',
                method: 'post',
                data:fd,
                headers:{'Content-Type':'multipart/form-data'}
            }).then(res => {
                console.log(res.data);
            })
      },
      resetForm(){
          this.form.name='';
          this.form.urllink='';
          this.form.imageUrl='';
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .el-upload-dragger{
        width: 178px;
        height: 178px;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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