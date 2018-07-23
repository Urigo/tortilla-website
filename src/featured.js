import { withPrefix } from 'gatsby'

export default {
  'whatsapp': {
    image: withPrefix(`img/featured/whatsapp.svg`),
    colors: {
      from: '#a6f0e3',
      to: '#28d5b6',
      link: '#28d5b6',
      shadow: '#1e927d',
    }
  },
  'radial-snake': {
    image: withPrefix(`img/featured/radial-snake.svg`),
    colors: {
      from: '#f798a4',
      to: '#f76c7d',
      link: '#f76c7d',
      shadow: '#b34957',
    }
  },
  'chatty': {
    image: withPrefix(`img/featured/chatty.svg`),
    colors: {
      from: '#84b5ef',
      to: '#4a90e2',
      link: '#4a90e2',
      shadow: '#4171aa',
    }
  },
}
