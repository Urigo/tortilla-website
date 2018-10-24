import React from 'react'
import Helmet from 'react-helmet'

// This will update all the metadata which is relevant for all social medias using
// a single set of props
const SocialHelmet = (props) => {
  const meta = []

  if (props.url) {
    meta.push({ name: "url", content: props.url })
    meta.push({ name: "og:url", content: props.url })
    meta.push({ name: "twitter:url", content: props.url })
  }

  if (props.title) {
    meta.push({ name: "title", content: props.title })
    meta.push({ name: "og:title", content: props.title })
    meta.push({ name: "twitter:title", content: props.title })
  }

  if (props.description) {
    meta.push({ name: "description", content: props.description })
    meta.push({ name: "og:description", content: props.description })
    meta.push({ name: "twitter:description", content: props.description })
  }

  if (props.image) {
    meta.push({ name: "image", content: props.image })
    meta.push({ name: "og:image", content: props.image })
    meta.push({ name: "twitter:image", content: props.image })
  }

  return (
    <Helmet meta={meta} />
  )
}

export default SocialHelmet
