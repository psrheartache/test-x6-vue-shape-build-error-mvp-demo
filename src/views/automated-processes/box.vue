<template>
  <div class="vue-block">
    {{ hehe }}
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, onMounted } from 'vue'

const getNum = inject('getNum')

const hehe = ref(123)

onMounted(() => {
  hehe.value = (getNum as number) || 456
})
</script>

<style lang="less" scoped>
.vue-block {
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
}
</style>
