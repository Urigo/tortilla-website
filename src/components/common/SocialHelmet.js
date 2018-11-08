import React from 'react'
import Helmet from 'react-helmet'

// This will update all the metadata which is relevant for all social medias using
// a single set of props
const SocialHelmet = (props) => {
  const meta = []

  if (props.url) {
    meta.push({ property: "og:url", content: props.url })
  }

  if (props.title) {
    meta.push({ property: "og:title", content: props.title })
  }

  if (props.description) {
    meta.push({ property: "og:description", content: props.description })
  }

  if (props.image) {
    meta.push({ property: "og:image", content: props.image })
    meta.push({ name: "twitter:image", content: props.image })
  }

  return (
    <Helmet meta={meta} />
  )
}

export default SocialHelmet
