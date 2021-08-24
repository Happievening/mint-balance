<template>
  <div>
    <Layout>
      <FuncSwitcher />
      <TagSwitcher />
      <Notes />
      <MoneyInput />
      <NumberPad />
    </Layout>
  </div>
</template>

<script lang="ts">
import FuncSwitcher from "@/components/FuncSwitcher.vue";
import TagSwitcher from "@/components/TagSwitcher.vue";
import NumberPad from "@/components/NumberPad.vue";
import MoneyInput from "@/components/MoneyInput.vue";
import Notes from "@/components/Notes.vue";
export default {
  name: "Money",
  components: { FuncSwitcher, TagSwitcher, NumberPad, MoneyInput, Notes },
};
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";

.notes {
}

.numberDisplay {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 10%;
}
</style>