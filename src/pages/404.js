import { navigate } from 'gatsby'

const NotFoundPage = (props) => {
  const split = props['*'].split('/')

  if (typeof window !== 'undefined') {
    if (split.length > 3) {
      navigate(split.slice(0, 3).join('/'))
    }
    else {
      navigate('/')
    }
  }

  return null
}

export default NotFoundPage
