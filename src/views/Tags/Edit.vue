<template>
  <Layout>
    <div class="content-wrapper">
      <div class="title">
        <router-link to="/tags">
          <Icon name="arrow-left"/>
        </router-link>
        <div>{{ original }}</div>
        <div>
          <Icon name="right"/>
        </div>
      </div>
      <FormInput
          title="新的标签名"
          :value="tagname"
          @update:value="changeTag"
      />
      <div class="btn-wrapper">
        <Button @click.native="modifyTag">确认修改</Button>
        <Button class="btn-warning" @click.native="deleteTag">删除标签</Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";
import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";

@Component({components: {Button, FormInput}})
export default class Edit extends Vue {
  tagname = "";
  original = "";

  deleteTag() {
    const flag = window.confirm("真的想好了，要删除？");
    if (flag === true) {
      let d = this.deleteProcess();
      d.then((res) => {
        if (res.code === 0) {
          window.alert("删除成功！");
          this.$router.replace("/tags");
        } else {
          "修改失败！错误码:" + res.code + " 错误信息:" + res.message;
        }
      });
    }
  }

  modifyTag() {
    const flag = window.confirm("确定修改吗？");
    if (flag === true) {
      if ("" === this.tagname) {
        window.alert("标签名不能为空，再想想？");
      } else {
        if (this.original === this.tagname) {
          window.alert("呃，你似乎并没有改？");
        } else {
          if (this.tagname.length > 8) {
            window.alert("错误：标签长度不可大于8个字符！");
          } else {
            if (this.$myVuex.tagListModel.retrieveTag().indexOf(this.tagname) >= 0) {
              window.alert("你已经保存过这个标签，重复了！");
            } else {
              let d = this.deleteProcess();
              d.then((res) => {
                if (res.code === 0) {
                  let addResult = this.$myVuex.tagListModel.createTag(this.tagname);
                  if (addResult.code === 0) {
                    window.alert("修改成功！");
                    this.$router.replace("/tags");
                  } else {
                    window.alert(
                        "修改失败！错误码:" +
                        addResult.code +
                        " 错误信息:" +
                        addResult.message
                    );
                  }
                } else {
                  window.alert(
                      "修改失败！错误码:" + res.code + " 错误信息:" + res.message
                  );
                }
              });
            }
          }
        }
      }
    } else {
      void 0;
    }
  }

  created() {
    if (this.$myVuex.tagListModel.retrieveTag().indexOf(this.$route.params.tagname) >= 0) {
      this.tagname = this.original = this.$route.params.tagname;
    } else {
      this.$router.replace("/404");
    }
  }

  changeTag(name: string) {
    this.tagname = name;
  }

  deleteProcess() {
    return new Promise<ResultObject>((resolve, reject) => {
      let deleteResult = this.$myVuex.tagListModel.deleteTag(this.original);
      if (deleteResult.code === 0) {
        resolve(deleteResult);
      } else {
        reject(deleteResult);
      }
    });
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.content-wrapper {
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.5em;
    font-size: 24px;
    padding: 1em 0;
    background-color: white;

    .icon {
      margin: 0 12px;
    }
  }

  .btn-wrapper {
    padding: 5px 16px;
    display: flex;
    justify-content: space-around;
    margin-top: 28px;

    .btn-warning {
      background-color: red;
    }
  }
}
</style>