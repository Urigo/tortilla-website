import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCompass, faCube, faListUl } from '@fortawesome/fontawesome-free-solid'

import { stepRoute } from '../utils/routes'

const Container = styled.div `
  height: inherit;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const Aside = styled.aside `
  flex: 0 0 auto;
  background: #0e324c;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: strech;
`

const TortillaLink = styled(Link)`
  padding: 0;
  margin: 30px 15px;
  text-align: center;
`

const TortillaLogo = styled.div`
  margin: 0;
  padding: 0;
  width: 42px;
  height: 47px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.primaryGray};
`

const MenuSeparator = styled.div`
  margin: 0 auto 15px auto;
  width: 70%;
  height: 1px;
  background-color: rgba(113, 134, 150, 0.37);
`

const MenuItemIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
`

const MenuItem = styled.div`
  margin: 15px 0;
  padding: 5px 0;
  display: block;
  position: relative;
  text-align: center;
  cursor: pointer;

  ${MenuItemIcon} {
    color: ${(props) => props.active ? props.theme.white : '#718696'};
  }

  &:hover ${MenuItemIcon} {
    color: ${({theme}) => theme.white};
  }
`

const MenuItemBorder = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  border-radius: 0 6px 6px 0;
  background-color: ${({theme}) => theme.primaryBlue};
`


const Content = styled.div `
  flex: 1 0 auto;
  background-color: ${({theme}) => theme.white};
`

const Sections = styled.div`
  display: flex;
  flex-direction: column;
`

const SubMenu = Menu.extend`
  width: 270px;
  background-color: #1d4866;
`

const Steps = styled.div`
  display: flex;
  flex-direction: column;
`

const StepNumber = styled.div`
  width: 30px;
  font-size: 17px;
  font-weight: 800;
  line-height: 30px;
  text-align: center;
  border-radius: 3px;
`

const StepName = styled.div`
  margin-left: 15px;
  font-size: 12px;
  font-weight: normal;
`

const Step = styled(Link)`
  padding: 15px 0 15px 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #2a5f85;
  border: solid 1px #0e324c;
  text-decoration: none;

  ${StepNumber} {
    color: ${({theme, active}) => active ? theme.primaryBlue : '#0e324c'};
    background-color: ${({theme, active}) => active ? '#0e324c' : '#1d4866'};
    border: solid 1px ${({theme, active}) => active ? theme.white : '#0e324c'};
  }

  ${StepName} {
    color: ${({theme, active}) => active ? theme.white : '#0e324c'};
  }
`

const Header = styled.div`
  padding: 0 25px;
`

const HeaderTitle = styled.div`
  margin: 10px 0;
  font-size: 24px;
  font-weight: 800;
  color: #092133;
  text-transform: uppercase;
`

const TutorialName = styled.div`
  margin: 10px 0;
  font-size: 16px;
  font-weight: 800;
  color: ${({theme}) => theme.white};
`

const propsToLink = (props, step) => stepRoute({
  tutorialName: props.tutorial.name,
  versionName: props.tutorial.version.name,
  step,
})

export default props => {
  return (
    <Container>
      <Aside>
        <Menu>
          <TortillaLink>
            <TortillaLogo />
          </TortillaLink>
          <MenuSeparator />
          <MenuItem active>
            <MenuItemBorder />
            <MenuItemIcon icon={faCompass} />
          </MenuItem>
          <MenuItem>
            <MenuItemIcon icon={faListUl} />
          </MenuItem>
          <MenuItem>
            <MenuItemIcon icon={faCube} />
          </MenuItem>
        </Menu>
        <SubMenu>
          <Header>
            <HeaderTitle>Sections</HeaderTitle>
            <TutorialName>{props.tutorial.name}</TutorialName>
          </Header>
          <Steps>
            {props.tutorial.version.steps.map((step) => (
              <Step key={step.id} active={step.id === props.step.id} to={propsToLink(props, step)}>
                <StepNumber>{step.id}</StepNumber>
                <StepName>{step.name}</StepName>
              </Step>
            ))}
          </Steps>
        </SubMenu>
      </Aside>
      <Content dangerouslySetInnerHTML={{ __html: props.step.html }} />
    </Container>
  )
}