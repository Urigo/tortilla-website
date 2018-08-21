class Thread {
  constructor() {
    this.running = true
  }

  wrap(cb) {
    return (...args) => {
      return this.run(() => {
        return cb(...args)
      })
    }
  }

  run(cb) {
    if (this.running) {
      return cb()
    }
  }

  resume() {
    this.running = true
  }

  stop() {
    this.running = false
  }
}

export default Thread
