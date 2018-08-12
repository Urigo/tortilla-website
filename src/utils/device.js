import { css } from 'styled-components'

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

function setCurrentDevice() {
  if (window.outerWidth <= sizes.mobile) {
    device.desktop.active = false
    device.mobile.active = true
  }
  else {
    device.desktop.active = true
    device.mobile.active = false
  }
}

// In case of SSR
if (typeof window !== 'undefined') {
  window.addEventListener('resize', setCurrentDevice)
  setCurrentDevice()
}

export default device
