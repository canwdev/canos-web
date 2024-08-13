<script setup lang="ts">
import {SettingsTabType} from '@/enum/settings'
import {useI18n} from 'vue-i18n'
import SettingsPersonalization from '@/components/OS/SettingsApp/SettingsPersonalization.vue'
import SettingsSystem from '@/components/OS/SettingsApp/SettingsSystem.vue'
import SettingsPrograms from '@/components/OS/SettingsApp/SettingsPrograms.vue'
import SettingsHardware from '@/components/OS/SettingsApp/SettingsHardware.vue'

const {t: $t} = useI18n()

const settingsTabs = ref([
  {label: '个性化', value: SettingsTabType.PERSONALIZATION},
  {label: '应用程序', value: SettingsTabType.PROGRAMS},
  {label: '硬件', value: SettingsTabType.HARDWARE},
  {label: '系统', value: SettingsTabType.SYSTEM},
])

const curTab = ref(SettingsTabType.PERSONALIZATION)
</script>

<template>
  <div class="settings-app">
    <el-tabs type="border-card" v-model="curTab">
      <el-tab-pane
        v-for="item in settingsTabs"
        :key="item.value"
        :label="item.label"
        :name="item.value"
      >
      </el-tab-pane>
    </el-tabs>
    <div class="settings-content">
      <SettingsPersonalization v-if="curTab === SettingsTabType.PERSONALIZATION" />
      <SettingsPrograms v-else-if="curTab === SettingsTabType.PROGRAMS" />
      <SettingsHardware v-else-if="curTab === SettingsTabType.HARDWARE" />
      <SettingsSystem v-else-if="curTab === SettingsTabType.SYSTEM" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-app {
  height: 100%;
  display: flex;
  flex-direction: column;

  :deep(.el-tabs__content) {
    padding: 0;
  }

  .settings-content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
