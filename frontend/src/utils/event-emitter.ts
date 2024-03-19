export default class EventEmitter {
  private events: any[]
  constructor() {
    this.events = []
  }

  on(name, fn) {
    if (this.events[name]) {
      this.events[name].push(fn)
    } else {
      this.events[name] = [fn]
    }
    return this
  }

  once(name, fn) {
    const onceFn = (data) => {
      fn(data)
      this.off(name, onceFn)
    }
    this.on(name, onceFn)
    return this
  }

  emit(name, data?) {
    ;(this.events[name] || []).forEach((fn) => fn(data))
    return this
  }

  off(name, fn) {
    const fns = this.events[name]
    if (!fns) {
      return
    }
    if (fn) {
      const index = fns.findIndex((f) => f === fn)
      if (index > -1) {
        fns.splice(index, 1)
      }
    } else {
      delete this.events[name]
    }
    return this
  }
}
