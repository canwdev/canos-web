<script>
export default {
  name: 'ObjectSize3D',
  props: {
    size: {
      type: Object,
      default() {
        return {
          x: '100mm',
          y: '100mm',
          z: '50mm',
          radius: '0',
        }
      },
    },
  },
  computed: {},
}
</script>

<template>
  <div class="scene" :style="[{width: size.x, height: size.y}]">
    <div class="cube" :style="[{width: size.y, height: size.z}]">
      <div class="cube__face cube__face--front" :style="[{width: size.x, height: size.y}]">
        front
      </div>
      <div class="cube__face cube__face--back" :style="[{width: size.x, height: size.y}]">back</div>
      <div class="cube__face cube__face--right" :style="[{width: size.z, height: size.y}]">
        right
      </div>
      <div class="cube__face cube__face--left" :style="[{width: size.z, height: size.y}]">left</div>
      <div class="cube__face cube__face--top" :style="[{width: size.x, height: size.z}]">top</div>
      <div class="cube__face cube__face--bottom" :style="[{width: size.x, height: size.z}]">
        bottom
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scene {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 80px;
  perspective: 400px;
}

.cube {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-100px);
  transition: transform 1s;
}

.cube.show-front {
  transform: translateZ(-100px) rotateY(0deg);
}

.cube.show-right {
  transform: translateZ(-100px) rotateY(-90deg);
}

.cube.show-back {
  transform: translateZ(-100px) rotateY(-180deg);
}

.cube.show-left {
  transform: translateZ(-100px) rotateY(90deg);
}

.cube.show-top {
  transform: translateZ(-100px) rotateX(-90deg);
}

.cube.show-bottom {
  transform: translateZ(-100px) rotateX(90deg);
}

.cube__face {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid black;
  line-height: 200px;
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-align: center;
}

.cube__face--front {
  background: hsla(0, 100%, 50%, 0.7);
}

.cube__face--right {
  background: hsla(60, 100%, 50%, 0.7);
}

.cube__face--back {
  background: hsla(120, 100%, 50%, 0.7);
}

.cube__face--left {
  background: hsla(180, 100%, 50%, 0.7);
}

.cube__face--top {
  background: hsla(240, 100%, 50%, 0.7);
}

.cube__face--bottom {
  background: hsla(300, 100%, 50%, 0.7);
}

.cube__face--front {
  transform: rotateY(0deg) translateZ(100px);
}

.cube__face--right {
  transform: rotateY(90deg) translateZ(100px);
}

.cube__face--back {
  transform: rotateY(180deg) translateZ(100px);
}

.cube__face--left {
  transform: rotateY(-90deg) translateZ(100px);
}

.cube__face--top {
  transform: rotateX(90deg) translateZ(100px);
}

.cube__face--bottom {
  transform: rotateX(-90deg) translateZ(100px);
}
</style>
