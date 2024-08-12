<script lang="ts" setup>
import {adminRoutes} from '@/router/admin'
</script>

<template>
  <div class="dashboard-view common-page-padding">
    <template v-for="(group, index) in adminRoutes">
      <div v-if="group.meta && !group.meta.hidden" :key="index" class="route-group">
        <div class="title-row">
          {{ group.meta.title }}
        </div>

        <div class="route-children">
          <template v-for="(item, index2) in group.children">
            <RouterLink
              v-if="item.meta && !item.meta.hidden"
              :key="index2"
              class="route-item"
              :to="{name: item.name}"
            >
              <div class="route-item__icon" :class="{empty: !item.meta.icon}">
                <img v-if="item.meta.icon" :src="item.meta.icon" alt="icon" />
              </div>
              <div class="route-item__title">{{ item.meta.title }}</div>
            </RouterLink>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-view {
  .route-group {
    margin-bottom: 80px;

    .title-row {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .route-children {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto;
      gap: 10px;

      .route-item {
        margin-top: 0;
        color: inherit;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 10px;
        &__icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          margin-bottom: 10px;
          &.empty {
            background: rgba(153, 153, 153, 0.48);
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        &__title {
          font-size: 14px;
          font-weight: 500;
          text-align: center;
        }
      }
    }
  }
}
</style>
