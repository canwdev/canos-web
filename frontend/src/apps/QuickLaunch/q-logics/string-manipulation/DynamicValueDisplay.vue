<script lang="ts" setup>
interface Props {
  text: any
  label: string
  formatFn: any
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
})

const {text} = toRefs(props)

const textDisplay = computed(() => {
  if (typeof props.formatFn === 'function') {
    return props.formatFn(text.value)
  }
})
</script>

<template>
  <div class="dynamic-value-display">
    {{ textDisplay }}
    <span class="d-label" v-if="label">{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-value-display {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 4px;
  align-items: center;
  .d-label {
    display: inline-block;
    font-size: 12px;
    opacity: 0.7;
    font-weight: 400;
    word-break: keep-all;
  }
}
</style>
