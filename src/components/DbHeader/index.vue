<template>
  <div>
    <div v-if="envType === 'app'" class="status-bar"></div>
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      :border="border"
      safe-area-inset-top
      @click-left="handlerLeft"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
const envType: Ref<string> = ref('h5');

const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  leftText: {
    type: String,
    default: '',
  },
  leftArrow: {
    type: Boolean,
    default: true,
  },
  rightText: {
    type: String,
    default: '',
  },
  border: {
    type: Boolean,
    default: true,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: Boolean,
    default: false,
  },
  back: {
    type: Function,
    default: () => {},
  },
});

const handlerLeft = () => {
  if (props.back) {
    props.back();
  } else {
    useRouter().back();
  }
};
</script>
<style lang="scss" scoped>
.status-bar {
  height: 20px;
  width: 100%;
  background-color: var(--van-white);
}
</style>
