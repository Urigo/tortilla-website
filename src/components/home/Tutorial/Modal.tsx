import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as ReactModal from 'react-modal'
import styled from 'styled-components'

import ModalClose from './Modal/Close'
import Image from './Image'
import Title from './Title'
import Subtitle from './Subtitle'
import Author from './Author'
import Heads from './Heads'
import Rate from './Rate'

const InCorner = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const Relative = styled.div`
  position: relative;
`

const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div`
  padding-right: 25px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const RateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Info = styled.div`
  flex: 0 0 auto;
`

const Versions = styled.div`
  flex: 1;
`

const ModalTitle = Title.extend`
  padding-right: 25px;
  font-size: 28px;
`

export default class Modal extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    tutorial: PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: !!props.open,
    }
  }

  componentWillReceiveProps(props) {
    if (this.state.isOpen !== props.open) {
      this.setState({
        isOpen: props.open,
      })
    }
  }

  handleCloseModal() {
    this.setState({ isOpen: false })
    this.props.onClose()
  }

  render() {
    const { tutorial } = this.props

    return (
      <div>
        <ReactModal
          isOpen={this.state.isOpen}
          onRequestClose={() => this.handleCloseModal()}
          shouldCloseOnOverlayClick={true}
          contentLabel="Minimal Modal Example"
        >
          <Relative>
            <InCorner>
              <ModalClose onClick={() => this.handleCloseModal()} />
            </InCorner>
            <Container>
              <Info>
                <InfoContainer>
                  <ImageContainer>
                    <Image />
                  </ImageContainer>
                  <div>
                    <ModalTitle>{tutorial.title}</ModalTitle>
                    <Subtitle>{tutorial.chaptersCount} Chapters</Subtitle>
                    <Author>by author</Author>
                    <RateContainer>
                      <Heads />
                      <Rate />
                    </RateContainer>
                  </div>
                </InfoContainer>
              </Info>
              <Versions>asd</Versions>
            </Container>
          </Relative>
        </ReactModal>
      </div>
    )
  }
}

if (typeof window !== 'undefined') {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.84)',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: '0 0 auto',
      height: '70%',
      overflow: 'auto',
      borderRadius: 3,
      boxShadow: '0 11px 22px 0 rgba(218, 218, 218, 0.34)',
      backgroundColor: '#fff',
      border: 'solid 1px #e6ecf4',
      outline: 'none',
      padding: 15,
    },
  }

  ReactModal.defaultStyles = styles
}
