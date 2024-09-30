<script lang="ts">
export default {
  name: 'TextEditor',
}
</script>

<script lang="ts" setup="">
import VueMonaco from '@/components/CanUI/packages/VueMonaco/index.vue'
import {IEntry} from '@server/types/server'
import {useResizeObserver} from '@vueuse/core'
import {TaskItem} from '@/enum/os'
import QuickOptions from '@/components/CanUI/packages/QuickOptions/index.vue'
import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'
import {useUnSavedChanges} from '@/hooks/use-beforeunload'
import FileSelector from '@/apps/FileManager/FileSelector.vue'
import {generateTextFile, normalizePath} from '@/apps/FileManager/utils'
import {fsWebApi} from '@/api/filesystem'

type AppParams = {
  item: IEntry
  basePath: string
}

const props = withDefaults(
  defineProps<{
    task?: TaskItem
    appParams?: AppParams
  }>(),
  {},
)
const emit = defineEmits([])
const {task} = toRefs(props)

const editFullPath = ref<string>('')
const editContent = ref('')
const {isChanged} = useUnSavedChanges()
watch(editContent, () => {
  isChanged.value = true
})
watch(isChanged, (val) => {
  if (task.value) {
    if (val) {
      task.value.title = `* ${editFullPath.value}`
    } else {
      task.value.title = `${editFullPath.value}`
    }
  }
})

const handleOpenFile = async (data: AppParams) => {
  console.log(data)
  const {item, basePath} = data
  editFullPath.value = normalizePath(basePath + '/' + item.name)
  editContent.value = await fsWebApi.readFile(editFullPath.value)
  setTimeout(() => {
    isChanged.value = false
  })
}

const handleSaveFile = async () => {
  if (!editFullPath.value) {
    throw new Error('editFullPath not exist!')
  }

  const idx = editFullPath.value.lastIndexOf('/') + 1
  const filename = editFullPath.value.slice(idx)
  await fsWebApi.uploadFile({
    path: editFullPath.value,
    file: generateTextFile(editContent.value, filename),
  })
  setTimeout(() => {
    isChanged.value = false
  })
}

onMounted(() => {
  // 应用启动传参
  if (!props.appParams) {
    return
  }
  handleOpenFile(props.appParams)
})

const vueMonacoRef = ref()
const rootRef = ref()
useResizeObserver(rootRef, () => {
  vueMonacoRef.value.resize()
})

const fileSelectorRef = ref()

const menuOptions = computed((): QuickOptionItem[] => {
  return [
    {
      label: 'File',
      children: [
        {
          label: 'New',
          props: {
            onClick() {
              editContent.value = ''
              editFullPath.value = ''
              setTimeout(() => {
                isChanged.value = false
              })
            },
          },
        },
        {
          label: 'Open...',
          props: {
            onClick() {
              fileSelectorRef.value.show()
            },
          },
        },
        editFullPath.value && {
          label: `Save`,
          props: {
            onClick() {
              handleSaveFile()
            },
          },
        },
        {
          label: 'Save As...',
          props: {
            onClick() {},
          },
        },
      ].filter(Boolean),
    },
  ]
})
</script>

<template>
  <div class="text-editor-wrap" ref="rootRef">
    <div class="menu-strip">
      <QuickOptions is-static horizontal :options="menuOptions" />
      <FileSelector :show-button="false" ref="fileSelectorRef" @handleSelect="handleOpenFile" />
    </div>
    <VueMonaco v-model="editContent" ref="vueMonacoRef" />
  </div>
</template>

<style lang="scss" scoped>
.text-editor-wrap {
  height: 100%;
  width: 100%;
  min-height: 200px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  .menu-strip {
    height: 32px;
  }

  .vue-monaco-placeholder {
    flex: 1;
  }
}
</style>
