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
  { name: 'description', content: 'Sample' },
  { name: 'keywords', content: 'sample, something' },
]

const Layout = ({ children }: any) => (
  <ThemeProvider theme={Theme}>
    <div>
      <Helmet title="Tortilla" meta={meta} link={links} />
      <div>{children}</div>
    </div>
  </ThemeProvider>
)

export default Layout
