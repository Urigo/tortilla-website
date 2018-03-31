import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withPrefix, navigateTo } from 'gatsby-link'
import { faBookmark, faPencilAlt } from '@fortawesome/fontawesome-free-solid'

import Theme from '../../../themes/home'
import CommonModal from '../../common/Modal'
import Tabs from '../../common/Tabs'
import Tab from '../../common/Tabs/Tab'
import OutlineButton from '../../common/OutlineButton'
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
  align-items: center;
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

const FrameworkTabs = styled(Tabs)`
  & > * {
    margin-right: 10px;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-left: 10px;
  }
`

const ActionButton = styled(OutlineButton)`
  width: 26px;
  height: 26px;
  line-height: 26px;
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

  openTutorial() {
    navigateTo(this.props.tutorial.link)
  }

  render() {
    const { tutorial } = this.props

    if (typeof window === 'undefined') {
      return null
    }

    return (
      <div>
        <CommonModal
          isOpen={this.state.isOpen}
          onRequestClose={() => this.handleCloseModal()}
          shouldCloseOnOverlayClick={true}
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
                  <FrameworkTabs active="angular">
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
                  </FrameworkTabs>
                  <Actions>
                    <ActionButton
                      onClick={() => console.log('edit')}
                      icon={faPencilAlt}
                    />
                    <ActionButton
                      onClick={() => console.log('bookmark')}
                      icon={faBookmark}
                    />
                  </Actions>
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
        </CommonModal>
      </div>
    )
  }
}
