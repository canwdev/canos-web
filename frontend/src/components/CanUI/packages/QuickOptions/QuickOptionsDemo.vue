<script lang="ts" setup>
import QuickOptions from '@/components/CanUI/packages/QuickOptions/index.vue'
import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'
import QuickContextMenu from '@/components/CanUI/packages/QuickOptions/QuickContextMenu.vue'

const menuOptions = ref<QuickOptionItem[]>([
  {
    label: '普通菜单项',
    props: {
      onClick: () => {
        window.$message.success('普通菜单项 Click')
      },
    },
  },
  {
    label: '支持键盘上下左右控制',
    props: {
      onClick: () => {
        window.$message.success('Click')
      },
    },
  },
  {
    label: '按 Q 或 Esc 键返回',
    props: {
      onClick: () => {
        window.$message.success('Click')
      },
    },
  },
  {
    label: '子菜单',
    children: [
      {
        label: 'B.1',
        props: {
          onClick: () => {
            window.$message.success('Click')
          },
        },
      },
      {label: 'B.2'},
      {label: 'B.3'},
      {label: '长文本自动适应，长文本自动适应，长文本自动适应'},
      {label: '屏幕边缘自动适应'},
      {
        label: '多层嵌套',
        children: [
          {
            label: 'B.1',
            props: {
              onClick: () => {
                window.$message.success('Click')
              },
            },
          },
          {label: 'B.2'},
          {label: 'B.3'},
          {label: '长文本自动适应，长文本自动适应，长文本自动适应'},
          {label: '#'},
          {label: '#'},
          {label: '#'},
          {label: '#'},
          {label: '#'},
          {label: '#'},
          {label: '#'},
          {label: '#'},
          {label: '#'},
        ],
      },
    ],
  },
  {split: true},
  {
    label: '动态生成菜单',
    children: () => {
      return [{label: `可以使用函数动态生成菜单`}, {label: `${Date().toLocaleString()}`}]
    },
  },
])

const isStaticMenu = ref(true)
const isShowMenu = ref(true)

const ctxMenuRef = ref()
const handleContextMenu = (event) => {
  ctxMenuRef.value.showMenu(event)
}
</script>

<template>
  <div class="quick-options-demo">
    <div class="common-menu-demo">
      <label>
        <input type="checkbox" v-model="isStaticMenu" />
        静态菜单
      </label>
      <label v-if="!isStaticMenu">
        <input type="checkbox" v-model="isShowMenu" />
        显示菜单
      </label>
      <QuickOptions
        :is-static="isStaticMenu"
        v-model:visible="isShowMenu"
        :options="menuOptions"
        show-index
      />
    </div>
    <div class="context-menu-demo" @contextmenu.prevent="handleContextMenu">
      <div class="inner-text">右键菜单 Demo，在此区域点击右键</div>
      <QuickContextMenu :options="menuOptions" ref="ctxMenuRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quick-options-demo {
  //:deep(.option-item) {
  //  min-width: 240px;
  //  max-width: 300px;
  //}
  .common-menu-demo {
    height: 200px;
  }
  .context-menu-demo {
    width: 100%;
    height: 90vh;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
    .inner-text {
      font-size: 20px;
      opacity: 0.5;
      user-select: none;
    }
  }
}
</style>
