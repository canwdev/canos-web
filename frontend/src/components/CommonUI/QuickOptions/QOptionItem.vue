<script setup lang="ts">
import VueRender from '@/components/CommonUI/OptionUI/Tools/VueRender.vue'
import {QuickOptionItem} from './enum'
import DynamicValueDisplay from './DynamicValueDisplay.vue'

interface Props {
  item: QuickOptionItem
  index: number
  curIndex: number
  itemCls: string
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  curIndex: 0,
  itemCls: '',
})
</script>

<template>
  <div
    class="option-item"
    :class="[
      {
        focus: curIndex === index,
        clickable: item?.props?.onClick || (item.children && item.children),
      },
      itemCls,
      item.props?.class,
    ]"
    :style="item.props?.style"
    :data-index="index"
  >
    <div class="index-wrap" v-if="index < 9">
      <span>{{ index + 1 }}</span>
    </div>
    <div class="item-icon" v-if="item.icon">
      <img :src="item.icon" alt="icon" />
    </div>
    <div class="item-content" v-if="item.html" v-html="item.html"></div>
    <div class="item-content" v-else-if="item.render">
      <VueRender :render-fn="item.render" />
    </div>
    <div class="item-content" v-else-if="!!item.dynamicProps">
      <DynamicValueDisplay v-bind="item.dynamicProps" />
    </div>
    <div class="item-content" v-else>
      {{ item.label }}
    </div>
    <div v-if="item.children && item.children" class="arrow-wrap">
      <div class="css-arrow right"></div>
    </div>
  </div>
</template>
