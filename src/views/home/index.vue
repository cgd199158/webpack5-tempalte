<template>
  <div>{{ name }}</div>
  <div>{{ total }}</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const name = ref('home');
const total = ref(0);

onMounted(() => {
  total.value = _.add(1, 2);
});
</script>
<style lang="scss">
div {
  color: $red;
}
</style>
