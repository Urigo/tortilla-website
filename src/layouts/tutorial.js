import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'

import Modal from '../components/common/Modal'
import Theme from '../themes/home'

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
]
const meta = [
  { name: 'description', content: 'Sample' },
  { name: 'keywords', content: 'sample, something' },
]
const scripts = ['https://unpkg.com/highlight.js@9.12.0']

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={Theme}>
    <div style={{ height: 'inherit' }}>
      <Helmet title="Tortilla" meta={meta} link={links} />
      <div style={{ height: 'inherit' }}>{children()}</div>
    </div>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
