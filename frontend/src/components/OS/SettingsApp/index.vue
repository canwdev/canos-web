<script setup lang="ts">
import {SettingsTabType} from '@/enum/settings'
import {useI18n} from 'vue-i18n'
import SettingsPersonalization from '@/apps/SettingsApp/SettingsPersonalization.vue'
import SettingsSystem from '@/apps/SettingsApp/SettingsSystem.vue'
import SettingsUsers from '@/apps/SettingsApp/SettingsUsers.vue'
import SettingsPrograms from '@/apps/SettingsApp/SettingsPrograms.vue'
import SettingsHardware from '@/apps/SettingsApp/SettingsHardware.vue'

const {t: $t} = useI18n()

const settingsTabs = ref([
  {label: '个性化', value: SettingsTabType.PERSONALIZATION},
  {label: '应用程序', value: SettingsTabType.PROGRAMS},
  {label: '硬件', value: SettingsTabType.HARDWARE},
  {label: '系统', value: SettingsTabType.SYSTEM},
  {label: 'Users', value: SettingsTabType.USERS},
])

const curTab = ref(SettingsTabType.PERSONALIZATION)
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
        <SettingsHardware v-else-if="curTab === SettingsTabType.HARDWARE" />
        <SettingsSystem v-else-if="curTab === SettingsTabType.SYSTEM" />
        <SettingsUsers v-else-if="curTab === SettingsTabType.USERS" />
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
