<template>
  <div>{{ name }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const name = ref('home');
</script>
<style lang="scss">
div {
  color: $red;
}
</style>
