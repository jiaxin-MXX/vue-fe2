<template>
  <div class="contain">
    <div v-for="(value,index) in url" :key="index" class="block">
      <span class="demonstration">{{value.name}}</span>
      <el-image :preview-src-list="imglist" style="width: calc(100% - 50px)" :src="value.url">
        <div slot="placeholder" class="image-slot">
          加载中
          <span class="dot">...</span>
        </div>
      </el-image>
      <div class="choose">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-edit"
          @click="changeclick(value.idlunbo)"
        >修改</el-button>
        <el-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          @click="deleteclick(value.idlunbo)"
        >删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { get, getdata } from "utils/http";
export default {
  data() {
    return {
      url: [],
      imglist: []
    };
  },
  methods: {
    changeclick(id) {
      this.$router.push({ name: "lunboupdata", params: { id } });
    },
    async deleteclick(id) {
      this.$confirm("此操作将永久删除该文件且不可找回, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(async() => {
          let result = await getdata({
            url: "/api/lunbodelete",
            params: { id }
          });
          if(result.message==='删除成功'){
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            let result = await get({
              url: "/api/lunbo"
            });
            this.url = result;
            let arrylist = [];
            result.map(value => {
              arrylist.push(value.url);
            });
            this.imglist = arrylist;
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
  async created() {
    let result = await get({
      url: "/api/lunbo"
    });
    this.url = result;
    let arrylist = [];
    result.map(value => {
      arrylist.push(value.url);
    });
    this.imglist = arrylist;
  },
};
</script>

<style lang="stylus" scoped>
.contain {
  width: 100%;
  display: flex;
  height: 100%;
  flex-wrap: wrap;

  .block {
    display: flex;
    flex-direction: column;
    width: 33%;
    align-items: center;
    flex-shrink: 0;

    .demonstration {
      margin-bottom: 0.1rem;
    }

    .choose {
      margin-top: 0.1rem;
      width: 80%;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>