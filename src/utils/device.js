import { css } from 'styled-components'

let outerWidth
const layoutChangeCallbacks = new Set()
const sizes = {
  desktop: 992,
  mobile: 576,
}

const device = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})


device.onLayoutChange = (callback) => {
  layoutChangeCallbacks.add(callback)
}

function resetLayout() {
  const type = device.type

  if (type !== 'mobile' && outerWidth <= sizes.mobile) {
    device.desktop.active = false
    device.mobile.active = true
    device.type = 'mobile'
  }
  else if (type !== 'desktop') {
    device.desktop.active = true
    device.mobile.active = false
    device.type = 'desktop'
  }

  if (type !== device.type) {
    for (let callback of layoutChangeCallbacks) {
      callback()
    }
  }
}

// In case of SSR
if (typeof window !== 'undefined') {
  outerWidth = window.outerWidth

  window.addEventListener('resize', () => {
    outerWidth = window.outerWidth
    resetLayout()
  })
}
else {
  outerWidth = Infinity
}

resetLayout()

export default device
