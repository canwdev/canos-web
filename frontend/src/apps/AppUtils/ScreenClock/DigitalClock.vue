<script>
import moment from 'moment'

moment.locale(navigator.language || 'zh-CN')

export default {
  name: 'DigitalClock',
  props: {
    isLightTheme: {
      type: Boolean,
      default: false,
    },
    isMini: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lastDateText: '',
      timeout: null,
      accTime: '',
      accDate: '',
    }
  },
  mounted() {
    this.updateTime()
    this.timer(this.updateTime)
  },
  beforeUnmount() {
    clearTimeout(this.timeout)
  },
  methods: {
    timer(callback) {
      const step = () => {
        // clearTimeout(this.timeout)
        const dt = Date.now() - expected // the drift (positive for overshooting)
        if (dt > interval) {
          console.warn(
            'something really bad happened. Maybe the browser (tab) was inactive?\npossibly special handling to avoid futile "catch up" run'
          )
        }
        callback()
        expected += interval
        this.timeout = setTimeout(step, Math.max(0, interval - dt)) // take into account drift
      }

      const interval = 1000
      let expected = Date.now() + interval
      this.timeout = setTimeout(step, interval)
    },
    updateTime() {
      const dt = new Date()
      this.accTime = moment(dt).format('HH:mm:ss')

      const dateText = moment(dt).format('LL dddd')
      if (dateText !== this.lastDateText) {
        this.accDate = dateText
        this.lastDateText = dateText
      }
    },
  },
}
</script>

<template>
  <div class="digital-clock-wrapper" :class="{'is-mini': isMini}">
    <div class="clock-centered">
      <h1>{{ accTime }}</h1>
      <h2>{{ accDate }}</h2>
    </div>
  </div>
</template>

<style lang="scss">
.digital-clock-wrapper {
  width: 100%;
  height: 100%;
  // background url("../images/bg.svg") no-repeat center / cover
  position: relative;
  user-select: none;
  font-family: sans-serif;
  pointer-events: none;

  &.bing {
    background: rgba(0, 0, 0, 0.1);
  }

  .clock-centered {
    overflow: hidden;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    text-align: center;

    h1,
    h2 {
      margin: 0;
    }

    h1 {
      font-size: 16vw;
      font-weight: bolder;
      line-height: 1.1;
    }

    h2 {
      font-size: 6vw;
      font-weight: normal;
    }
  }

  &.is-mini {
    .clock-centered {
      h1 {
        font-size: 23px;
      }

      h2 {
        font-size: 12px;
      }
    }
  }
}
</style>
