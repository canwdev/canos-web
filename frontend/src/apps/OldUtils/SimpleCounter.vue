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
  <div class="counter container">
    <div class="head-title">计数器</div>
    <div class="counter-number">{{ count }}</div>
    <p class="actions">
      <button @click="reset">重置</button>
      <input type="number" placeholder="step" v-model="step" />
      <button autofocus @click="add">+</button>
      <button autofocus @click="minus">-</button>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.counter {
  height: 100%;
  font-family: monospace;

  .counter-number {
    font-size: 80px;
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
        outline: 3px solid red;
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
