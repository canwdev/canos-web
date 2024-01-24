<script lang="ts">
import {defineComponent} from 'vue'
import {SettingsTabType} from '@/enum/settings'
import OptionUI from '@/components/CommonUI/OptionUI/index.vue'
import {useI18n} from 'vue-i18n'
import SettingsPersonalization from '@/components/Apps/SettingsApp/SettingsPersonalization.vue'
import SettingsSystem from '@/components/Apps/SettingsApp/SettingsSystem.vue'
import SettingsPrograms from '@/components/Apps/SettingsApp/SettingsPrograms.vue'

export default defineComponent({
  name: 'SettingsApp',
  components: {SettingsPrograms, SettingsSystem, SettingsPersonalization, OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()

    const settingsTabs = ref([
      {label: '个性化', value: SettingsTabType.PERSONALIZATION},
      {label: '应用程序', value: SettingsTabType.PROGRAMS},
      {label: '系统', value: SettingsTabType.SYSTEM},
    ])

    const curTab = ref(SettingsTabType.PERSONALIZATION)

    return {
      SettingsTabType,
      settingsTabs,
      curTab,
    }
  },
})
</script>

<template>
  <div class="settings-app">
    <n-layout has-sider style="height: 100%">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="0"
        :width="200"
        style="height: 100%"
        show-trigger="arrow-circle"
        bordered
      >
        <n-list hoverable clickable>
          <n-list-item
            class="left-list-item"
            v-for="item in settingsTabs"
            :key="item.value"
            @click="curTab = item.value"
            :class="{active: curTab === item.value}"
          >
            {{ item.label }}
          </n-list-item>
        </n-list>
      </n-layout-sider>
      <n-layout-content>
        <SettingsPersonalization v-if="curTab === SettingsTabType.PERSONALIZATION" />
        <SettingsPrograms v-else-if="curTab === SettingsTabType.PROGRAMS" />
        <SettingsSystem v-else-if="curTab === SettingsTabType.SYSTEM" />
      </n-layout-content>
    </n-layout>
  </div>
</template>

<style lang="scss" scoped>
.settings-app {
  height: 100%;
  overflow-y: auto;

  .left-list-item {
    &.active {
      background-color: $primary_opacity;
      border-radius: 0;
    }
  }
}
</style>
