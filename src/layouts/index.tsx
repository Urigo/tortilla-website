import * as React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/common/Header'
import TechCards from '../components/common/TechCards'

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

const TemplateWrapper = ({ children }: any) => (
  <div>
    <Helmet title="Tortilla" meta={meta} link={links} />
    <Header />
    <TechCards />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
