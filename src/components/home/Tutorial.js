import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'

import TutorialRate from './Tutorial/Rate'
import TutorialHeads from './Tutorial/Heads'
import TutorialFrameworks from './Tutorial/Frameworks'
import TutorialImage from './Tutorial/Image'
import TutorialModal from './Tutorial/Modal'
import TutorialTitle from './Tutorial/Title'
import TutorialSubtitle from './Tutorial/Subtitle'
import TutorialAuthor from './Tutorial/Author'
import CornerMenu from '../common/CornerMenu'

const Container = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  background-color: ${props => props.theme.white};
  box-shadow: 0 1px 2px 0 ${props => props.theme.primaryGray};
`

const Main = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;

  & > * {
    flex: 0 0 50%;
  }

  &:hover ${CornerMenu} {
    display: block;
    visibility: visible;
  }
`

const Footer = styled.div`
  padding: 10px;
  border-top: 1px solid ${props => props.theme.lightGray};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Relative = styled.div`
  position: relative;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 15px;
`

// TODO: tutorial modal should be outside this component and in one place

class Tutorial extends React.Component {
  static propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
    chaptersCount: PropTypes.number,
  }

  state = {
    isModalOpen: false,
  }

  openModal() {
    this.setState({
      isModalOpen: true,
    })
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
    })
  }

  render() {
    return (
      <Container>
        <Main>
          <div>
            <TutorialImage />
          </div>
          <Relative>
            <CornerMenu />
            <Info>
              <TutorialTitle onClick={() => this.openModal()}>
                {this.props.title}
              </TutorialTitle>
              <TutorialSubtitle>
                {this.props.chaptersCount} Chapters
              </TutorialSubtitle>
              <TutorialAuthor>by author</TutorialAuthor>
              <TutorialFrameworks />
            </Info>
          </Relative>
        </Main>
        <Footer>
          <div>
            <TutorialRate />
          </div>
          <div>
            <TutorialHeads />
          </div>
        </Footer>
        <TutorialModal
          tutorial={this.props}
          open={this.state.isModalOpen}
          onClose={() => this.closeModal()}
        />
      </Container>
    )
  }
}

export default Tutorial
