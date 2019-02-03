class Thread {
  constructor() {
    this.running = true
    this.awaitingCb = () => {}
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
      cb()
    } else {
      this.awaitingCb = () => {
        this.awaitingCb = () => {}

        cb()
      }
    }
  }

  resume() {
    this.running = true

    this.awaitingCb()
  }

  stop() {
    this.running = false
  }
}

export default Thread
