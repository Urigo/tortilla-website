import React from 'react'
import { Helmet } from 'react-helmet'

const normalizeUrl = (url) => {
  return (
    process.env.GATSBY_ORIGIN + '/' + url.split('/').filter(Boolean).join('/')
  )
}

// This will update all the metadata which is relevant for all social medias using
// a single set of props
const SeoHelmet = (props) => {
  const meta = []
  const keywords = [
    'tortilla',
    'tutorial',
    'guide',
    'tutor',
    'tutoring',
    'step by step',
  ]
  const optional = {}

  if (props.url) {
    meta.push({ property: 'og:url', content: normalizeUrl(props.url) })
  }

  if (props.title) {
    optional.title = `tortilla.academy | ${props.title}`
    meta.push({ property: 'og:title', content: optional.title })
  }

  if (props.description) {
    meta.push({ property: 'og:description', content: props.description })
  }

  if (props.image) {
    meta.push({ property: 'og:image', content: normalizeUrl(props.image) })
    meta.push({ name: 'twitter:image', content: normalizeUrl(props.image) })
  }

  if (props.keywords) {
    keywords.push(...props.keywords)
  }

  meta.push({ name: 'keywords', contnet: keywords.join(', ') })

  return <Helmet meta={meta} {...optional} />
}

export default SeoHelmet
