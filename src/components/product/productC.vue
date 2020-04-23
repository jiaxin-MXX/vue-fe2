<template>
  <div class="contain">
    <el-form label-width="100px" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
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
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="已有图片" required>
        <el-tag
          closable
          class="close"
          @close="close(value)"
          v-for="(value,index) in srcList"
          :key="index"
        >
          <el-image
            fit="fill"
            style="width: 146px; height: 146px;"
            :src="value"
            :preview-src-list="srcList"
          >
            <i class="el-icon-plus"></i>
          </el-image>
        </el-tag>
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
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="ImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即更新</el-button>
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
          id:'',
        name: "",
        changshang: "",
        jinjia: "",
        shoujia: "",
        kucun: "",
        date: "",
        title: ""
      },
      firstname:null,
      dialogVisible: false,
      ImageUrl: "",
      fileList: [],
      rowlist: [],
      srcList: [],
      deleteIndex: []
    };
  },
  mounted() {
       this.ruleForm.id = this.$route.params.data.id;
    this.ruleForm.name = this.$route.params.data.name;
    this.ruleForm.changshang = this.$route.params.data.changshang;
    this.ruleForm.jinjia = this.$route.params.data.jinjia;
    this.ruleForm.shoujia = this.$route.params.data.shoujia;
    this.ruleForm.kucun = this.$route.params.data.kucun;
    this.ruleForm.date = this.$route.params.data.jinhuoriqi;
    this.ruleForm.title = this.$route.params.data.title;
    this.srcList = this.$route.params.data.tupian;
    this.firstname = this.$route.params.data.firstname;
  },
  methods: {
    close(value) {
      this.$confirm("是否要删除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            this.srcList.splice(this.srcList.indexOf(value), 1);
            this.deleteIndex.push(value.substring(value.length-21));
            // str=str.substring(str.length()-i);
        //   this.srcList.splice(index, 1);
        
          console.log(this.deleteIndex);
          this.$message({
            type: "success",
            message: "添加至待更新列表，提交后更新"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handle(res, res2) {
      var objectURL = window.URL.createObjectURL(res.raw);
      this.fileList.push({
        id: res.uid,
        url: objectURL
      });
      this.rowlist.push({
        id: res.uid,
        row: res.raw
      });
    },
    onadd() {
      let fd = new FormData();
      for (let key in this.ruleForm) {
        fd.append(key, this.ruleForm[key]);
      }
      for (let i = 0; i < this.rowlist.length; i++) {
        fd.append("file", this.rowlist[i].row);
      }
      fd.append("delet", this.deleteIndex.join('|'));
      return fd;
    },
    goback() {
      this.$router.go(-1);
    },
    onSubmit() {
        let data = this.onadd();
        axios({
          url: "/api/lunboupdata",
          method: "post",
          data,
          headers: {
            "Content-Type": "multipart/form-data",
            where: this.firstname
          }
        }).then(res => {
          if (res.data.message === "修改成功") {
            this.$notify({
              title: "提示",
              message: "信息更新成功！",
              type: "success"
            });
            this.$router.go(-1)
          }
        });
    },
    handlePictureCardPreview(file) {
      //查看图片
      this.ImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].id == file.id) {
          this.fileList.splice(i, 1);
          this.rowlist.splice(i, 1);
          return;
        }
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
.contain {
  padding: 40px;
  backgroudn: #ccc;
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

.close {
  height: fit-content;
  width: fit-content;
  border: none;
  background: #fff;
  padding: 0;

  >>>.el-tag__close {
    top: -138px;
    right: 0px;
    color: red;
  }
}
</style>