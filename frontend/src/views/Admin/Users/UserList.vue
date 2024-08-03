<script lang="ts" setup>
import AutoFilterList from '@/views/Admin/Common/AutoFilterList.vue'
import {usersApi} from '@/api/users'
import {CreateEditUserDto} from '@server/modules/users/user.dto'
import {renderNDropdownMenu} from '@/components/CommonUI/OptionUI/Tools/renders'
import AutoFormNaive from '@/components/CommonUI/AutoFormNaive/index.vue'
import {FormRules, NTag} from 'naive-ui'
import {
  AutoFormItem,
  AutoFormItemType,
  MixedFormItems,
} from '@/components/CommonUI/AutoFormNaive/enum'
import {DisabledOptions, IUserInfo, UserRoleOptions} from '@server/types/user'
import {formatDate} from '@/utils'
import {TableColumn} from 'naive-ui/es/data-table/src/interface'

const autoListRef = ref()
const tableColumns = ref<TableColumn<IUserInfo>[]>([
  {
    key: 'id',
    title: 'ID',
    width: 100,
  },
  {
    key: 'username',
    title: 'Username',
    minWidth: 100,
  },
  {
    key: 'roles',
    title: 'Roles',
    minWidth: 100,
    render: (row) => {
      return row.roles.map((tagKey) => {
        return h(
          NTag,
          {
            size: 'small',
            style: {
              margin: '2px',
            },
            type: 'info',
            bordered: false,
          },
          {
            default: () => tagKey,
          },
        )
      })
    },
  },
  {
    key: 'disabled',
    title: 'Availability',
    width: '100px',
    render(row) {
      return row.disabled ? 'Disabled' : 'Enable'
    },
  },
  {
    key: 'created_at',
    title: 'Created At',
    width: '180px',
    render(row) {
      return formatDate(row.created_at)
    },
  },
  {
    key: 'updated_at',
    title: 'Updated At',
    width: '180px',
    render(row) {
      return formatDate(row.updated_at)
    },
  },
  {
    title: 'Action',
    key: 'actions',
    width: 70,
    align: 'right',
    fixed: 'right',
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

const filterFormItems = ref<MixedFormItems[]>([
  {
    cols: 4,
    children: [
      {
        key: 'id',
        type: AutoFormItemType.INPUT,
        props: {
          placeholder: 'Filter ID',
          clearable: true,
        },
      },
      {
        key: 'username',
        type: AutoFormItemType.INPUT,
        props: {
          placeholder: 'Filter Username',
          clearable: true,
        },
      },
      {
        key: 'roles',
        type: AutoFormItemType.SELECT,
        options: UserRoleOptions,
        props: {
          multiple: true,
          placeholder: 'Filter Roles',
          clearable: true,
        },
      },
      {
        key: 'disabled',
        type: AutoFormItemType.SELECT,
        options: DisabledOptions,
        props: {
          placeholder: 'Filter Availability',
          clearable: true,
        },
      },
    ],
  },
])

const isShowEditDialog = ref(false)
const isCreate = ref(false)

const formatFormData = (data: any = {}): CreateEditUserDto => {
  return {
    id: data.id || '',
    username: data.username || '',
    password: data.password || '',
    roles: data.roles || [],
    disabled: data.disabled || false,
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
        required: true,
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
    {
      type: AutoFormItemType.SELECT,
      key: 'disabled',
      label: `Availability`,
      options: DisabledOptions,
      props: {},
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
    autoListRef.value.isUpdating = false
    await autoListRef.value.loadData()
  }
}

const isUpdating = ref(false)
const handleCreateEdit = async () => {
  try {
    isUpdating.value = true
    if (isCreate.value) {
      await usersApi.createUser(dataForm.value)
      window.$message.success('Create success')
    } else {
      await usersApi.updateUser(dataForm.value)
      window.$message.success('Update success')
    }
    isShowEditDialog.value = false
    await autoListRef.value.loadData()
  } catch (e) {
    console.error(e)
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <AutoFilterList
    ref="autoListRef"
    :table-columns="tableColumns"
    :filterFormItems="filterFormItems"
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
      :is-loading="isUpdating"
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
