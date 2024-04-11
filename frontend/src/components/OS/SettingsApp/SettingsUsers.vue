<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import OptionUI from '@/components/CommonUI/OptionUI/index.vue'
import {StOptionItem} from '@/components/CommonUI/OptionUI/enum'
import {usersApi} from '@/api/users'
import LoginForm from '@/components/OS/SettingsApp/Users/LoginForm.vue'
import {IUser} from '@server/types/server-settings'
import {NSpace, NSwitch} from 'naive-ui'

const {t: $t} = useI18n()

const isLoading = ref(false)
const isShowCreateUser = ref(false)
const handleAddUser = async (data) => {
  try {
    isLoading.value = true
    const {username, password} = data
    await usersApi.createUser(username, password)
    isShowCreateUser.value = false
    window.$message.success('Add user success!')
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

const userList = ref<IUser[]>([])
const getUsers = async () => {
  try {
    isLoading.value = true
    userList.value = (await usersApi.getUsers()) as unknown as IUser[]
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getUsers()
})

const optionList = computed((): StOptionItem[] => {
  return [
    {
      label: 'Users',
      key: 'users',
      children: userList.value.map((user) => {
        return {
          label: user.username,
          subtitle: user.id,
          key: user.id,
          actionRender: h(NSpace, {size: 'small', align: 'center'}, () => [
            h(
              'button',
              {
                class: 'vp-button',
                disabled: true,
                onClick: async () => {
                  await usersApi.deleteUser(user.id)
                  getUsers()
                },
              },
              'Delete',
            ),
          ]),
        }
      }),
    },
    {
      label: 'User Management',
      key: 'user_management',
      children: [
        {
          label: '',
          key: 'add_user',
          actionRender: h(
            'button',
            {
              class: 'vp-button',
              onClick: () => {
                isShowCreateUser.value = true
              },
            },
            'Add User',
          ),
        },
        {
          label: '',
          key: 'change_password',
          actionRender: h(
            'button',
            {
              disabled: true,
              class: 'vp-button',
              onClick: () => {},
            },
            'Change Password',
          ),
        },
        {
          label: '',
          key: 'change_password',
          actionRender: h(
            'button',
            {
              disabled: true,
              class: 'vp-button',
              onClick: () => {},
            },
            'Change Username',
          ),
        },
      ].filter(Boolean),
    },
  ]
})
</script>

<template>
  <OptionUI :option-list="optionList" />

  <n-modal v-model:show="isShowCreateUser" preset="dialog" :show-icon="false">
    <LoginForm @submit="handleAddUser" show-submit :disabled="isLoading" />
  </n-modal>
</template>
