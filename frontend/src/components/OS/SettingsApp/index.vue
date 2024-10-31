<script lang="ts">
export default {
  name: 'SettingsApp',
}
</script>
<script lang="ts" setup>
import {SettingsTabType} from '@/enum/settings'
import {useI18n} from 'vue-i18n'
import SettingsPersonalization from '@/components/OS/SettingsApp/SettingsPersonalization.vue'
import SettingsSystem from '@/components/OS/SettingsApp/SettingsSystem.vue'
import SettingsPrograms from '@/components/OS/SettingsApp/SettingsPrograms.vue'
import SettingsHardware from '@/components/OS/SettingsApp/SettingsHardware.vue'
import TabLayout from '@/components/CanUI/packages/Layouts/TabLayout.vue'
import RectSwitch from '@/components/CanUI/packages/OptionUI/Tools/RectSwitch.vue'

type AppParams = {
  curTab: SettingsTabType
}
const props = withDefaults(
  defineProps<{
    appParams?: AppParams
  }>(),
  {},
)

const settingsTabs = ref([
  {label: '个性化', value: SettingsTabType.PERSONALIZATION},
  {label: '应用程序', value: SettingsTabType.PROGRAMS},
  {label: '硬件', value: SettingsTabType.HARDWARE},
  {label: '系统', value: SettingsTabType.SYSTEM},
])

const curTab = ref<SettingsTabType>(props.appParams?.curTab || SettingsTabType.PERSONALIZATION)

// 应用启动传参
watch(
  () => props.appParams,
  () => {
    if (!props.appParams) {
      return
    }
    curTab.value = props.appParams.curTab
  },
)
</script>

<template>
  <div class="settings-app">
    <TabLayout horizontal v-model="curTab" :options="settingsTabs">
      <div class="settings-content">
        <SettingsPersonalization v-if="curTab === SettingsTabType.PERSONALIZATION" />
        <SettingsPrograms v-else-if="curTab === SettingsTabType.PROGRAMS" />
        <SettingsHardware v-else-if="curTab === SettingsTabType.HARDWARE" />
        <SettingsSystem v-else-if="curTab === SettingsTabType.SYSTEM" />
      </div>
    </TabLayout>
  </div>
</template>

<style lang="scss" scoped>
.settings-app {
  height: 100%;
  display: flex;
  flex-direction: column;

  .settings-content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
