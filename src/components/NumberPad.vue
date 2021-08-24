<template>
  <div class="numberPad">
    <button>7</button><button>8</button><button>9</button
    ><button><Icon name="backspace" /></button><button>4</button
    ><button>5</button><button>6</button><button><Icon name="minus" /></button
    ><button>1</button><button>2</button><button>3</button
    ><button><Icon name="plus" /></button><button><Icon name="clear" /></button
    ><button>0</button><button>.</button><button><Icon name="ok" /></button>
  </div>
</template>

<script lang="ts">
export default {
  name: "NumberPad",
};
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
.numberPad {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  width: 100vw;
  background-color: $vue-green-pad;
  button {
    width: 25%;
    flex-grow: 1;
    // border: 1px solid $vue-green;
    font-size: 1.5em;
  }
}
</style>