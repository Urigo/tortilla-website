import React from 'react'
import Helmet from 'react-helmet'

const SeoHelmet = ({ keywords }) => {
  keywords = [...keywords, 'tortilla', 'tutorial', 'guide', 'tutor', 'tutoring', 'step by step']

  return <Helmet meta={[
    { name: 'keywords', content: keywords }
  ]} />
}

SeoHelmet.defaultProps = {
  keywords: []
}

export default SeoHelmet
