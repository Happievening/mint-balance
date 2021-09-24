<template>
  <Layout>
    <div class="content-wrapper">
      <Title>
        <div class="left">
        <router-link to="/tags">
        <Icon name="right"/>
        <span>标签管理</span>
        </router-link>
        </div>

        <div class="middle">{{ originalTagName }}</div>
        <div class="right"></div>
      </Title>

      <FormInput
          title="新的标签名"
          :value="tagName"
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
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import FormInput from '@/components/FormInput.vue';
import Title from '@/components/Title.vue';

@Component({components: {Button, FormInput, Title}})
export default class Edit extends Vue {
  tagName = '';
  originalTagName = '';

  deleteTag(): void {
    const flag = window.confirm('真的想好了，要删除？');
    if (flag) {
      this.$store.commit('deleteTag', this.tagName);
      console.log(this.$store.state);
      if (this.$store.state.result.code === 0) {
        window.alert('删除成功！');
        this.$router.replace('/tags');
      } else {
        window.alert('修改失败！错误码:' + this.$store.state.result.code + ' 错误信息:' + this.$store.state.result.message);
      }
    }
  }

  modifyTag(): void {
    console.log(this.$store.state);
    const flag = window.confirm('确定修改吗？');
    if (flag) {
      if ('' === this.tagName) {
        window.alert('标签名不能为空，再想想？');
      } else {
        if (this.originalTagName === this.tagName) {
          window.alert('呃，你似乎并没有改？');
        } else {
          if (this.tagName.length > 8) {
            window.alert('错误：标签长度不可大于8个字符！');
          } else {
            if (this.$store.state.tagList.indexOf(this.tagName) >= 0) {
              window.alert('你已经保存过这个标签，重复了！');
            } else {
              this.$store.commit('deleteTag', this.originalTagName);
              console.log(this.$store.state);
              if (this.$store.state.result.code === 0) {
                this.$store.commit('createTag', this.tagName);
                if (this.$store.state.result.code === 0) {
                  window.alert('修改成功！');
                  this.$router.replace('/tags');
                } else {
                  window.alert(
                      '修改失败！错误码:' +
                      this.$store.state.result.code +
                      ' 错误信息:' +
                      this.$store.state.result.message
                  );
                }
              } else {
                window.alert(
                    '修改失败！错误码:' + this.$store.state.result.code + ' 错误信息:' + this.$store.state.result.message
                );
              }

            }
          }
        }
      }
    } else {
      void 0;
    }
  }

  created(): void {
    this.$store.commit('retrieveTag');
    if (this.$store.state.tagList.getItemsByKey('name').indexOf(this.$route.params.tagname) >= 0) {
      this.tagName = this.originalTagName = this.$route.params.tagname;
    } else {
      this.$router.replace('/404');
    }
  }

  changeTag(name: string): void {
    this.tagName = name;
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

    a {
      text-decoration: none;
      color: inherit;
      font-size: 30px;
      display: flex;
      align-items: center;
      flex-grow: 1;

      span {
        display: inline-block;
        font-size: 18px;
      }
    }

    .icon {
      margin-left: 12px;
      transform: rotate(180deg);
    }

    .left {
      flex-grow: 0;
      width: 150px
    }

    .middle {
      flex-grow: 1;
      display: flex;
      justify-content: center
    }

    .right {
      flex-grow: 0;
      width: 150px;

      ::after {
        display: block;
      }
    }
  }

  .btn-wrapper {
    padding: 5px 16px;
    display: flex;
    justify-content: space-around;
    margin-top: 28px;

    .btn {
      background-color: $vue-green;
      color: white;
    }

    .btn-warning {
      background-color: red;
    }
  }


}
</style>