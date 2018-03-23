import * as React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import './index.css'

const links = [
  {
    href:
      'https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800,800i',
    rel: 'stylesheet',
  },
]
const meta = [
  { name: 'description', content: 'Sample' },
  { name: 'keywords', content: 'sample, something' },
]

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Tortilla" meta={meta} link={links} />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
