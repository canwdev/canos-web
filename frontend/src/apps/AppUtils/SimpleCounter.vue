<script>
export default {
  name: 'SimpleCounter',
  data() {
    return {
      count: 0,
      step: 1,
      history: [],
    }
  },
  methods: {
    reset() {
      // if (this.count === 0) {
      //   return
      // }
      this.history.unshift({
        count: this.count,
        time: new Date(),
      })
      this.count = 0
    },
    add() {
      this.count += Number(this.step)
    },
    minus() {
      this.count -= Number(this.step)
    },
  },
}
</script>

<template>
  <div class="simple-counter">
    <div class="counter-number">{{ count }}</div>
    <p class="actions">
      <button class="vp-button" @click="reset">重置</button>
      <input class="vp-input" type="number" placeholder="step" v-model="step" />
      <button class="vp-button" autofocus @click="add">+</button>
      <button class="vp-button" autofocus @click="minus">-</button>
    </p>
    <ul class="history">
      <li v-for="(item, index) in history" :key="index">
        <span class="no"> #{{ index + 1 }} </span>
        <span class="count">
          {{ item.count }}
        </span>
        <span class="time">{{ item.time.toLocaleString() }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.simple-counter {
  height: 100%;
  font-family: monospace;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  scrollbar-width: none;

  .counter-number {
    font-size: 50px;
    border: 1px solid;
    text-align: right;
    padding: 0 10px;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button,
    input {
      display: inline-block;
      width: 23%;
      font-size: 30px;
      height: 50px !important;
      box-sizing: border-box;

      &:focus {
        outline: 2px solid red;
      }
    }
  }

  .history {
    border: 1px solid;
    padding-left: 0;
    max-height: 70vh;
    overflow: auto;

    li {
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;

      .no {
        width: 50px;
        color: darkred;
      }

      .count {
        flex: 1;
        font-size: 18px;
        font-weight: bold;
      }

      & + li {
        border-top: 1px solid #ccc;
      }
    }
  }
}
</style>
