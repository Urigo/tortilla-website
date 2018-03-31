import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as ReactModal from 'react-modal'
import styled from 'styled-components'
import { withPrefix, navigateTo } from 'gatsby-link'

import Theme from '../../../themes/home'
import Tabs from '../../common/Tabs'
import Tab from '../../common/Tabs/Tab'
import ModalClose from './Modal/Close'
import ModalPlay from './Modal/Play'
import Image from './Image'
import Title from './Title'
import Subtitle from './Subtitle'
import Author from './Author'
import Heads from './Heads'
import Rate from './Rate'
import Versions from './Versions'
import Steps from './Steps'

const InCorner = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const PlaySpace = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`

const Relative = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

const RigthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Details = styled.div`
  flex: 1;
  margin-top: 15px;
`

const ModalTitle = Title.extend`
  padding-right: 25px;
  font-size: 28px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
`

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 25px;
  overflow: auto;
`

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const InTabLogo = styled.img`
  height: 24px;
  margin: 0;
`

const InTabName = styled.div`
  padding-left: 10px;
  font-size: 14px;
  font-weight: normal;
`

const FrameworkTab = props => (
  <Tab name={props.name} {...props}>
    <TabContainer>
      <InTabLogo src={withPrefix(`img/logos/${props.image}.svg`)} />
      <InTabName>{props.display}</InTabName>
    </TabContainer>
  </Tab>
)

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

  openTutorial() {
    navigateTo(this.props.tutorial.link)
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
            <PlaySpace>
              <ModalPlay onClick={() => this.openTutorial()} />
            </PlaySpace>
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
              <Details>
                <Header>
                  <Tabs active="angular">
                    <FrameworkTab
                      name="meteor"
                      display="Meteor"
                      image="meteor"
                    />
                    <FrameworkTab
                      name="angular"
                      display="Angular"
                      image="angular"
                    />
                    <FrameworkTab name="ionic" display="Ionic" image="ionic" />
                  </Tabs>
                </Header>
                <OptionsContainer>
                  <Versions
                    versions={[
                      { active: true, name: 'Angular 4.3.2' },
                      { name: 'Angular 3.6' },
                      { name: 'Angular 2.0.1' },
                    ]}
                  />
                  <Steps
                    steps={[
                      'Bootstrapping',
                      'Chats page',
                      'RxJS',
                      'Realtime Meteor Server',
                    ]}
                  />
                </OptionsContainer>
              </Details>
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

  ReactModal.defaultStyles = styles
}
