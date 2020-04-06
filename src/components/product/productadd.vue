<template>
  <div class="contain">
    <el-form label-width='100px' :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="产品名称" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="厂商" required>
        <el-select v-model="ruleForm.changshang" placeholder="请选择活动区域">
          <el-option label="华为" value="huawei"></el-option>
          <el-option label="OPPO" value="oppo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" required>
        <el-input v-model="ruleForm.title"></el-input>
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
            v-model="ruleForm.date"
            type="date"
            style="width: 100%;"
            placeholder="选择日期"
            value-format='yyyy-MM-dd'
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="添加图片">
        <el-upload
          class="avatar-uploader"
          drag
          action='#'
          multiple
          :auto-upload="false"
          :show-file-list="true"
          :on-change="handle"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove='handleRemove'
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="ImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立刻上传</el-button>
        <el-button @click="goback">取消</el-button>
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
        date:'',
        title:''
      },
      dialogVisible:false,
      ImageUrl: "",
      fileList: [],
      rowlist:[]
    };
  },
  methods: {
    handle(res, res2) {
      var objectURL = window.URL.createObjectURL(res.raw);
      this.fileList.push({
        id:res.uid,
        url:objectURL
      })
      this.rowlist.push({
        id:res.uid,
        row:res.raw
      })
    },
    onadd(){
      let fd = new FormData();
      for(let key in this.ruleForm){
        fd.append(key, this.ruleForm[key]);
      }
      for(let i = 0;i<this.rowlist.length;i++){
        console.log(this.rowlist[i])
        fd.append('file', this.rowlist[i].row);
      }
      return fd
    },
    goback(){
      this.$router.go(-1)
    },
    onSubmit() {
      console.log(this.fileList)
      let data = this.onadd()
      axios({
        url: "/api/lunboadd",
        method: "post",
        data,
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
    },
    handlePictureCardPreview(file) {
      //查看图片
        this.ImageUrl = file.url;
        this.dialogVisible = true;
    },
    handleRemove(file, fileList){
      for(let i = 0;i<this.fileList.length;i++){
        if(this.fileList[i].id==file.id){
          this.fileList.splice(i,1)
          this.rowlist.splice(i,1)
          return
        }
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
.contain{
  padding:40px
  backgroudn:#ccc
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

>>>.el-upload-dragger {
  width: 146px;
  height: 146px;
}
</style>