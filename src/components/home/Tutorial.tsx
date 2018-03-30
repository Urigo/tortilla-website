import * as React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import TutorialRate from './Tutorial/Rate'
import TutorialHeads from './Tutorial/Heads'
import TutorialInfo from './Tutorial/Info'
import TutorialImage from './Tutorial/Image'
import CornerMenu from '../common/CornerMenu'

const Container = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 #dadada;
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
  border-top: 1px solid #f2f5f7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Relative = styled.div`
  position: relative;
`

const Tutorial = props => {
  return (
    <Container>
      <Main>
        <div>
          <TutorialImage />
        </div>
        <Relative>
          <CornerMenu />
          <TutorialInfo {...props} />
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
    </Container>
  )
}

export default Tutorial
