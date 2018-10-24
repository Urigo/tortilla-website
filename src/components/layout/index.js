import { withPrefix } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'

import Theme from '../../themes/home'
import Modal from '../common/Modal'

import './index.css'

Modal.setAppElement('#___gatsby')

const links = [
  {
    href:
      'https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,700,800,800i',
    rel: 'stylesheet',
  },
  {
    href: 'https://unpkg.com/highlight.js@9.12.0/styles/github.css',
    rel: 'stylesheet',
  },
  {
    href: withPrefix('favicon.png'),
    rel: 'icon',
  },
]
const meta = [
  { name: 'google-site-verification', content: 'Glmf8aCrncL2dnKoMscmc0BpnvaLTvA6feScexYo754' },
  { name: 'description', content: 'The best JavaScript tutorial-base in the world for absolutely FREE' },
  { name: 'image', content: withPrefix('Logo/logo.svg')  },
  { name: 'keywords', content: 'tutorial, howto, javascript, webapp, webdesign' },
]

class Layout extends React.Component {
  componentDidMount() {
    // Reveal resolution corrected body asap
    document.body.style.display = 'block'
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <div style={{ position: 'relative' }}>
          <Helmet title="tortilla.academy | Full JavaScript tutorials for free" meta={meta} link={links} />
          <div>{this.props.children}</div>
        </div>
      </ThemeProvider>
    )
  }
}

export default Layout
