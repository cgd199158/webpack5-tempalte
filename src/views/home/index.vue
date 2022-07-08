<template>
  123123123
  <el-button type="primary">测试</el-button>
</template>

<script lang="ts" setup>
import _ from 'lodash';
import { onMounted, ref } from 'vue';
const name = ref('home');
const total = ref(0);

onMounted(() => {
  total.value = _.add(1, 2);
});
</script>
<style lang="scss">
div {
}
</style>
