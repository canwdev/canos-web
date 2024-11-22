<script setup lang="ts">
import VueRender from '@/components/CanUI/packages/OptionUI/Tools/VueRender.vue'
import {QuickOptionItem} from '../enum'
import DynamicValueDisplay from './DynamicValueDisplay.vue'
import {useHoverSubMenu} from '@/components/CanUI/packages/QuickOptions/utils/use-context-menu'
import QuickOptions from '@/components/CanUI/packages/QuickOptions/index.vue'

interface Props {
  item: QuickOptionItem
  index: number
  curIndex?: number
  itemCls: string
  showIndex: boolean
  isStatic: boolean
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  curIndex: -1,
  itemCls: '',
  showIndex: true,
  isStatic: false,
})
const emit = defineEmits(['onArrowClick', 'onClose', 'onSubMenuHide'])
const {item} = toRefs(props)

const {subMenuRef, isMouseOver, isMouseOverSub, hasChildren, subChildren} = useHoverSubMenu(
  props,
  emit,
)
</script>

<template>
  <div
    class="option-item"
    :class="[
      {
        focus: curIndex === index,
        clickable: item?.props?.onClick || item?.props?.isBack || hasChildren,
        disabled: item.disabled,
        hover: isMouseOverSub,
        'show-index': showIndex,
      },
      itemCls,
      item.props?.class,
    ]"
    :style="item.props?.style"
    :data-index="index"
    @mouseover="isMouseOver = true"
    @mouseleave="isMouseOver = false"
  >
    <!-- 鼠标悬浮显示子菜单 -->
    <QuickOptions
      ref="subMenuRef"
      v-if="!isStatic && hasChildren && isMouseOver"
      visible
      :options="subChildren"
      :show-index="showIndex"
      @mouseover="isMouseOverSub = true"
      @mouseleave="isMouseOverSub = false"
      @click.stop
      @onClose="$emit('onClose')"
      class="sub-option-items"
    />

    <div class="index-wrap" v-if="showIndex && index < 9">
      <span>{{ index + 1 }}</span>
    </div>

    <div v-if="item.iconRender" class="item-icon">
      <VueRender :render-fn="item.iconRender" />
    </div>
    <div class="item-icon" v-else-if="item.icon">
      <img :src="item.icon" alt="icon" />
    </div>
    <div class="item-icon" v-else-if="item.iconClass" :class="item.iconClass"></div>
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
    <div v-if="hasChildren" class="arrow-wrap" @click.stop="$emit('onArrowClick')">
      <div class="css-arrow right"></div>
    </div>
  </div>
</template>
