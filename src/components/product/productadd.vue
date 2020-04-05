<template>
  <div class="contain">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="产品名称" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="厂商" required>
        <el-select v-model="ruleForm.changshang" placeholder="请选择活动区域">
          <el-option label="华为" value="huawei"></el-option>
          <el-option label="OPPO" value="oppo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="进价" required>
        <el-input v-model="ruleForm.jinjia"></el-input>
      </el-form-item>
      <el-form-item label="售价" required>
        <el-input v-model="ruleForm.shoujia"></el-input>
      </el-form-item>
      <el-form-item label="库存" required>
        <el-input v-model="ruleForm.kucun"></el-input>
      </el-form-item>
      <el-form-item label="进货日期" required>
        <el-form-item>
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            style="width: 100%;"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="添加图片">
          <el-upload
           class="avatar-uploader"
            drag
            action="#"
            multiple
            :auto-upload="false"
          :show-file-list="true"
          :on-change="handle"
          :file-list="fileList"
  list-type="picture-card">
          <i class="el-icon-plus"></i>
            </el-upload>
        
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立刻上传</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        changshang: "",
        jinjia: "",
        shoujia: "",
        kucun: "",
        imageUrl: "",
        row: ""
      },
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    };
  },
  methods: {
    handle(res, res2) {
      var objectURL = window.URL.createObjectURL(res.raw);
      this.ruleForm.imageUrl = objectURL;
      this.ruleForm.raw = res.raw;
    },
    onSubmit() {
      let data = this.ruleForm;
      const fd = new FormData();
      fd.append("file", this.ruleForm.raw);
      fd.append("name", this.ruleForm.name);
      fd.append("changshang", this.ruleForm.changshang);
      fd.append("jinjia", this.ruleForm.jinjia);
      fd.append("shoujia", this.ruleForm.shoujia);
      fd.append("kucun", this.ruleForm.kucun);
      axios({
        url: "/api/lunboadd",
        method: "post",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
          where: this.ruleForm.name
        }
      }).then(res => {
        if (res.data.message === "上传成功") {
          this.$notify({
            title: "提示",
            message: "信息上传成功，可以继续上传",
            type: "success"
          });
        }
      });
    }
  }
};
</script>


<style lang="stylus" scoped>
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
  .el-upload-dragger{
    width: 146px;
    height: 146px;
  }
</style>