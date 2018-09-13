import 'sweetalert2'
import React from 'react'
import { css } from 'styled-components'

let outerWidth
let outerHeight
const internals = Symbol('device')
const layoutChangeCallbacks = new Set()
const sizes = {
  desktop: 992,
  mobile: 576,
}

const device = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (max-width: ${sizes[label] / 16}em) and (orientation: portrait) {
      ${css(...args)}
    }

    @media only screen and (max-height: ${sizes[label] / 16}em) and (orientation: landscape) {
      ${css(...args)}
    }
  `

  return acc
}, {})

device.onLayoutChange = (callback) => {
  layoutChangeCallbacks.add(callback)

  // Dispose method
  return () => {
    return layoutChangeCallbacks.delete(callback)
  }
}

device.only = (...whitelist) => (Component) => {
  const componentDidMount = Component.prototype.componentDidMount || Function
  const componentWillUnmount = Component.prototype.componentWillUnmount || Function
  const render = Component.prototype.render || Function

  Component.prototype.componentDidMount = function (...args) {
    const ithis = this[internals] = {}

    ithis.stopObservingLayout = device.onLayoutChange(() => {
      this.setState({
        [internals]: {
          deviceType: device.type
        }
      })
    })

    // Reveal resolution corrected body asap
    document.body.style.display = 'block'

    this.setState({
      [internals]: {
        deviceType: device.type
      }
    })

    return componentDidMount.apply(this, args)
  }

  Component.prototype.componentWillUnmount = function (...args) {
    const ithis = this[internals]

    // Safety mechanism
    if (typeof ithis.stopObservingLayout === 'function') {
      ithis.stopObservingLayout()
    }

    return componentWillUnmount.apply(this, args)
  }

  Component.prototype.render = function (...args) {
    const istate = (this.state && this.state[internals]) || {}

    let children
    if (whitelist.includes(device.type)) {
      children = render.apply(this, args)
    }
    else {
      // Copied directly from a sweet-alert-2 error modal
      children = (
        <div className="swal2-container swal2-center swal2-fade" style={{overflowY: 'auto'}}>
          <div aria-labelledby="swal2-title" aria-describedby="swal2-content" className="swal2-popup swal2-modal swal2-show" tabIndex={-1} role="dialog" aria-live="assertive" aria-modal="true" style={{display: 'flex'}}>
            <div className="swal2-header">
              <div className="swal2-icon swal2-error swal2-animate-error-icon" style={{display: 'flex'}}><span className="swal2-x-mark"><span className="swal2-x-mark-line-left" /><span className="swal2-x-mark-line-right" /></span></div>
              <h2 className="swal2-title" id="swal2-title" style={{display: 'flex'}}>Oy vey...</h2>
            </div>
            <div className="swal2-content">
              <div id="swal2-content" style={{display: 'block'}}>This page doesn't support {device.type} devices</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <span key={istate.deviceType}>
        {children}
      </span>
    )
  }
}

function resetLayout() {
  const type = device.type
  const size = Math.min(outerWidth, outerHeight)

  if (size <= sizes.mobile) {
    device.desktop.active = false
    device.mobile.active = true
    device.type = 'mobile'
  }
  else {
    device.desktop.active = true
    device.mobile.active = false
    device.type = 'desktop'
  }

  if (device.type !== type) {
    for (let callback of layoutChangeCallbacks) {
      callback()
    }
  }
}

// In case of SSR
if (typeof window !== 'undefined') {
  outerWidth = window.outerWidth
  outerHeight = window.outerHeight

  window.addEventListener('resize', () => {
    outerWidth = window.outerWidth
    outerHeight = window.outerHeight
    resetLayout()
  })
}
else {
  outerWidth = Infinity
}

resetLayout()

export default device
