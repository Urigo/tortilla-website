import Modal from 'react-modal'

import Theme from '../../themes/home'

const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: Theme.modalBackdrop,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: '0 0 auto',
      height: '70%',
      overflow: 'hidden',
      borderRadius: 3,
      boxShadow: '0 11px 22px 0 rgba(218, 218, 218, 0.34)',
      backgroundColor: Theme.white,
      border: `solid 1px ${Theme.lightGray}`,
      outline: 'none',
      padding: 15,
    },
  }

  Modal.defaultStyles = styles
}

function FakedModal() {
  return <div style={{ display: 'none', visibility: 'hidden' }} />
}

FakedModal.setAppElement = () => {}

export default (isBrowser ? Modal : FakedModal)
