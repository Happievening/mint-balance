<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Nav.vue";

export default {
  name: "Home",
  components: {
    Footer,
  },
};
</script>
