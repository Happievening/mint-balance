<template>
  <div class="notes">
    <Icon name="notes" />
    <label
      >备注
      <input
        type="text"
        placeholder="输入备注（140字内）"
        name=""
        id=""

      />
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: "Notes",
};
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
.notes {

}
</style>