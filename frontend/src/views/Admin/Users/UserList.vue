<script lang="ts" setup>
import AutoFilterList from '@/views/Admin/Common/AutoFilterList.vue'
import {usersApi} from '@/api/users'
import {IUser} from '@server/types/server-settings'
import userList from '@/views/Admin/Users/UserList.vue'

const tableColumns = ref([
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'username',
    title: 'Username',
  },
])
const filterFormItems = ref([])
</script>

<template>
  <AutoFilterList :table-columns="tableColumns" :request-data-fn="usersApi.getUsers" />
</template>
