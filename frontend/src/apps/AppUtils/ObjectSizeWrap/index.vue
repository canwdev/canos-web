<script>
import ObjectSize from './ObjectSize.vue'
import ObjectSize3D from './ObjectSize3D.vue'

export default {
  name: 'ObjectSizeWrap',
  components: {
    ObjectSize,
    ObjectSize3D,
  },
  data() {
    return {
      is3D: false,
      currentId: 0,
      objectList: [
        {
          name: '小米6',
          size: {
            x: '70.49mm',
            y: '145.17mm',
            z: '7.45mm',
            radius: '5mm',
          },
        },
        {
          name: '小米10 Pro',
          size: {
            x: '74.8mm',
            y: '162.6mm',
            z: '8.96mm',
            radius: '0mm',
          },
        },
        {
          name: '极米 MOVIN 01X',
          size: {
            x: '190mm',
            y: '191mm',
            z: '40.8mm',
            radius: '0mm',
          },
        },
        {
          name: '米家投影仪 青春版',
          size: {
            x: '115mm',
            y: '150mm',
            z: '150mm',
            radius: '0mm',
          },
        },
      ],
    }
  },
  computed: {
    currentObject() {
      return this.objectList[Number(this.currentId)]
    },
  },
}
</script>

<template>
  <div class="object-size-wrap">
    <div class="object-options">
      <label for="selectModel">
        预设:
        <select id="selectModel" v-model="currentId">
          <option
            v-for="(item, index) in objectList"
            :class="{active: currentId === index}"
            :key="index"
            :value="index"
          >
            {{ item.name }}
          </option>
        </select>
      </label>

      <label for="inputX"
        >x: <input id="inputX" type="text" v-model="currentObject.size.x"
      /></label>
      <label for="inputY"
        >y: <input id="inputY" type="text" v-model="currentObject.size.x"
      /></label>
      <label for="inputZ"
        >z: <input id="inputZ" type="text" v-model="currentObject.size.x"
      /></label>
      <label for="inputR"
        >圆角: <input id="inputR" type="text" v-model="currentObject.size.radius"
      /></label>

      <label for="3dSwitch">
        3D模式(Dev): <input id="3dSwitch" type="checkbox" v-model="is3D" />
      </label>
    </div>

    <span class="tip"> * 推荐使用 100% 缩放 </span>
    <ObjectSize3D v-if="is3D" :size="currentObject.size" />

    <ObjectSize v-else :size="currentObject.size" />
  </div>
</template>

<style lang="scss" scoped>
.object-size-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
  .object-options {
    margin-bottom: 10px;
    display: flex;
    gap: 8px;
  }
  .tip {
    margin-bottom: 10px;
  }
}
</style>
