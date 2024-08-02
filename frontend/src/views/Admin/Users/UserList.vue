<script lang="ts" setup>
import AutoFilterList from '@/views/Admin/Common/AutoFilterList.vue'
import {usersApi} from '@/api/users'
import {CreateEditUserDto} from '@server/modules/users/user.dto'
import {renderNDropdownMenu} from '@/components/CommonUI/OptionUI/Tools/renders'
import AutoFormNaive from '@/components/CommonUI/AutoFormNaive/index.vue'
import {FormRules} from 'naive-ui'
import {AutoFormItemType, MixedFormItems} from '@/components/CommonUI/AutoFormNaive/enum'
import {UserRoleOptions} from '@server/types/user'

const autoListRef = ref()
const tableColumns = ref([
  {
    key: 'id',
    title: 'ID',
    width: 100,
  },
  {
    key: 'username',
    title: 'Username',
  },
  {
    key: 'roles',
    title: 'Roles',
  },
  {
    title: 'Action',
    key: 'actions',
    width: 80,
    render(row) {
      return renderNDropdownMenu([
        {
          label: 'Edit',
          props: {
            onClick: () => {
              isCreate.value = false
              isShowEditDialog.value = true
              dataForm.value = formatFormData(row)
            },
          },
        },
        {
          label: 'Delete',
          props: {
            onClick: () => {
              window.$dialog.warning({
                title: 'Confirm Delete',
                content: `Are you sure you want to delete ${row.username}? This action is not recoverable!`,
                positiveText: 'OK',
                negativeText: 'Cancel',
                onPositiveClick: () => {
                  doDelete(row.id)
                },
                onNegativeClick: () => {},
              })
            },
          },
        },
      ])
    },
  },
])

const filterFormItems = ref([])

const isShowEditDialog = ref(false)
const isCreate = ref(false)

const formatFormData = (data: any = {}): CreateEditUserDto => {
  return {
    id: data.id || '',
    username: data.username || '',
    password: data.password || '',
    roles: data.roles || [],
  }
}
const dataForm = ref<CreateEditUserDto>(formatFormData())
const formRules = computed((): FormRules => {
  return {
    username: [
      {
        required: true,
        trigger: ['blur'],
      },
    ],
    password: [
      {
        required: isCreate.value,
        trigger: ['blur'],
      },
    ],
    roles: [
      {
        validator: (rule, value: string) => {
          if (value.length === 0) {
            return new Error('Please select at least one role')
          }
          return true
        },
        trigger: ['change'],
      },
    ],
  }
})
const formItems = computed((): MixedFormItems[] => {
  return [
    {
      type: AutoFormItemType.INPUT,
      key: 'username',
      label: `Username`,
    },
    {
      type: AutoFormItemType.INPUT,
      key: 'password',
      label: `Password`,
      props: {
        type: 'password',
        showPasswordOn: 'click',
        placeholder: isCreate.value ? 'Please input password' : 'Optional to update password',
      },
    },
    {
      type: AutoFormItemType.SELECT,
      key: 'roles',
      label: `Roles`,
      props: {
        multiple: true,
      },
      options: UserRoleOptions,
    },
  ]
})

watch(isShowEditDialog, (val) => {
  if (!val) {
    dataForm.value = formatFormData()
  }
})

const beforeCreate = () => {
  isCreate.value = true
  isShowEditDialog.value = true
}

const doDelete = async (id) => {
  try {
    await usersApi.deleteUser(id)
    window.$message.success('Delete success')
  } catch (e) {
    console.error(e)
  } finally {
    autoListRef.value.isLoading = false
    await autoListRef.value.loadData()
  }
}

const handleCreateEdit = async () => {
  try {
    if (isCreate.value) {
      await usersApi.createUser(dataForm.value)
      window.$message.success('Create success')
    } else {
      await usersApi.updateUser(dataForm.value)
      window.$message.success('Update success')
    }
  } catch (e) {
    console.error(e)
  } finally {
    isShowEditDialog.value = false
    await autoListRef.value.loadData()
  }
}
</script>

<template>
  <AutoFilterList
    ref="autoListRef"
    :table-columns="tableColumns"
    :request-data-fn="usersApi.getUsers"
  >
    <template #actionsMore>
      <n-button type="primary" @click="beforeCreate">Create</n-button>
    </template>
  </AutoFilterList>
  <n-modal
    preset="dialog"
    :show-icon="false"
    :title="isCreate ? 'Create User' : 'Edit User'"
    @positive-click="handleCreateEdit"
    @negative-click="isShowEditDialog = false"
    @close="isShowEditDialog = false"
    :show="isShowEditDialog"
  >
    <AutoFormNaive
      :form-schema="{
        model: dataForm,
        rules: formRules,
        props: {
          labelPosition: 'top',
        },
        formItems,
      }"
      @onSubmit="handleCreateEdit"
    />
  </n-modal>
</template>
