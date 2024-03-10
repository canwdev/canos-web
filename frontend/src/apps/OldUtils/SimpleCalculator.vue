<script>
export default {
  name: 'SimpleCalculator',
  data() {
    return {
      flag: null,
      flagSwitch: false,
      num0: null,
      current: '0',
    }
  },
  methods: {
    handleClear() {
      this.current = 0
      this.flag = null
      this.num0 = null
    },
    handleFlagClick(e) {
      this.flag = e.target.innerText
      this.flagSwitch = true
    },
    handleNumClick(e) {
      let keyText = e.target.innerText
      if (this.flagSwitch) {
        this.num0 = this.current
        this.current = 0
        this.flagSwitch = false
      }

      const hasDot = (str) => {
        return /\./.test(str)
      }

      if (keyText === '.') {
        if (!hasDot(this.current)) {
          this.current += keyText
        }
        return
      }
      if (Number(this.current) === 0 && !hasDot(this.current)) {
        this.current = ''
      }

      this.current += keyText
    },
    handleCalc() {
      const num0 = Number(this.num0)
      const num1 = Number(this.current)

      if (this.flag === '+') {
        this.current = num0 + num1
      } else if (this.flag === '-') {
        this.current = num0 - num1
      } else if (this.flag === '*') {
        this.current = num0 * num1
      } else if (this.flag === '/') {
        this.current = num0 / num1
      }
      // this.num0 = null;
      // this.flag = null;
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="head-title">简易计算器</div>

    <div class="calculator">
      <div class="screen">
        {{ current }}
        <div class="flag">{{ num0 }}{{ flag }}</div>
      </div>
      <div class="actions">
        <button @click="handleClear" class="actions-key">C</button>
        <button @click="handleFlagClick" class="actions-key">+</button>
        <button @click="handleFlagClick" class="actions-key">-</button>
        <button @click="handleFlagClick" class="actions-key">*</button>
        <button @click="handleFlagClick" class="actions-key">/</button>
      </div>
      <div class="buttons">
        <button @click="handleNumClick" class="buttons-key" v-for="i in 9" :key="i">{{ i }}</button>
        <button @click="handleNumClick" class="buttons-key">0</button>
        <button @click="handleNumClick" class="buttons-key">.</button>
        <button @click="handleCalc" class="buttons-key flex2">=</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calculator {
  width: 100%;
  height: 100%;
  border: 2px solid #000;
  font-family: monospace;
}

.screen {
  height: 100px;
  background: #fcfcfc;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 5px;
  box-sizing: border-box;
  font-size: 28px;
  position: relative;
  border-bottom: 1px solid;

  .flag {
    position: absolute;
    color: red;
    right: 5px;
    top: 5px;
  }
}

.actions {
  display: flex;
}

.actions-key {
  width: 25%;
  height: 80px;
  font-size: 20px;
  font-family: monospace;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
}

.buttons-key {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  text-align: center;
  width: 33.33%;
  font-size: 30px;
  font-family: monospace;

  // border 1px solid #f00
  // border-top: none
  // border-left none
  &.flex2 {
    flex: 1;
  }

  &:hover {
    // background #ccc
  }
}
</style>
