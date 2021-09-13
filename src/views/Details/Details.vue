<template>
  <Layout><Title>账目记录</Title> </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Title from '@/components/Title.vue';

@Component({components:{Title}})
export default class Details extends Vue {}
</script>

<style scoped lang="scss">
</style>