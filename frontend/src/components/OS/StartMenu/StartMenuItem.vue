<script lang="ts">
import {defineComponent} from 'vue'
import {ShortcutItem} from '@/enum/os'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'

export default defineComponent({
  name: 'StartMenuItem',
  components: {ThemedIcon},
  props: {
    item: {
      type: Object as PropType<ShortcutItem>,
      required: true,
    },
  },
})
</script>

<template>
  <button class="shortcut-item btn-no-style">
    <div v-if="item.icon" class="shortcut-icon">
      <ThemedIcon :name="item.icon" />
    </div>
    <div class="shortcut-title">{{ item.title }}</div>
  </button>
</template>

<style lang="scss" scoped>
.shortcut-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  text-align: initial;

  &:hover {
    background-color: $primary_opacity;
  }

  .shortcut-icon {
    width: 24px;
    height: 24px;
    margin-right: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .shortcut-title {
    flex: 1;
    font-size: 13px;
  }
}
</style>
