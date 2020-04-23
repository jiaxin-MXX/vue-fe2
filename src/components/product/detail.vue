<template>
  <div class="contain" style="flex-direction: column">
    <el-row class="row">
      <el-col :offset="6" :span="4">
        ID
        <el-divider direction="vertical"></el-divider>
        {{mess.id}}
      </el-col>
      <el-col :span="14">商品名称：{{mess.name}}</el-col>
    </el-row>
    <el-row class="row">
      <el-col :offset="6" :span="18">厂商：{{mess.changshang}}</el-col>
    </el-row>
    <el-row class="row">
      <el-col :offset="6" :span="18">进价：{{mess.jinjia}}</el-col>
    </el-row>
    <el-row class="row">
      <el-col :offset="6" :span="18">售价：{{mess.shoujia}}</el-col>
    </el-row>
    <el-row class="row">
      <el-col :offset="6" :span="18">库存：{{mess.kucun}}</el-col>
    </el-row>
    <el-row class="row">
      <el-col :offset="6" :span="18">销量：{{mess.xiaoliang?mess.xiaoliang:0}}</el-col>
    </el-row>
    <el-row class="row">
      <el-col :offset="6" :span="12">标题：{{mess.title}}</el-col>
    </el-row>
        <el-row class="row">
      <el-col :offset="6" :span="12">详情：{{mess.xiangqing}}</el-col>
    </el-row>
    <el-row class="row">
      <el-col :offset="6" :span="18">图片列表：</el-col>
    </el-row>
    <el-row class="row">
      <el-col :offset="5" :span="19">
        <el-image
          :preview-src-list="previewSrcList"
          fit="cover"
          v-for="(item,key) in mess.tupian"
          :key="key"
          :src="item"
        >
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
        </el-image>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :offset="6" :span="4">
        <el-button @click="back" plain type="primary">返回</el-button>
      </el-col>
      <el-col :offset="2" :span="4">
        <el-button @click="change" plain type="info">修改</el-button>
      </el-col>
      <el-col :offset="2" :span="4">
        <el-button @click="delet" plain type="danger">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get } from "utils/http";
import stroe from "store";
export default {
  data() {
    return {
      mess: {},
      previewSrcList: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    change() {
      this.$router.push({
        name:'change',
        params:{
          data:this.mess
        }
      })
    },
    delet() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = await get({
            url: "/api/lunbodelete",
            params: {
              id: this.mess.id,
              name: this.mess.name
            }
          });
          if (data.type) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.$router.go(-1);
          } else {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  async beforeCreate() {
    let id,
      flag = false;
    if (this.$route.params.id) {
      id = this.$route.params.id;
      stroe.set("id", this.$route.params.id);
      flag = true;
    } else if (stroe.get("id")) {
      id = stroe.get("id");
      flag = true;
    } else {
      this.$message({
        message: "没有选中信息，你要查看谁呢？",
        type: "error"
      });
    }
    if (flag) {
      let data = await get({
        url: "/api/lunboselect",
        params: {
          id
        }
      });
      this.mess = data.data;
      this.previewSrcList = this.mess.tupian;
      console.log(this.mess);
    }
  }
};
</script>


<style lang="stylus" scoped>
.row {
  width: 100%;
  margin: 10px 0;
  font-size: 20px;

  >>>.el-image {
    width: 30%;
    padding: 5px;
  }

  >>>.el-button {
    width: 100%;
  }
}
</style>