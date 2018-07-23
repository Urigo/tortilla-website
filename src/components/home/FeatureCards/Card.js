import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { stepRoute } from '../../../utils/routes'

const SPACE_SIZE = 30
const HEIGHT = 270
const LEFT_SIZE = 190

const Container = styled.div`
  padding: 0 ${SPACE_SIZE}px;
  height: ${HEIGHT}px;
  border-right: 0.5px solid rgba(0, 0, 0, .2);
  border-left: 0.5px solid rgba(0, 0, 0, .2);
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  background-image: linear-gradient(
    141deg,
    ${props => props.colors.from},
    ${props => props.colors.to}
  );
  z-index: 1;
`

const Left = styled.div`
  position: relative
  padding-right: ${SPACE_SIZE / 2}px
  flex: 1 0 ${LEFT_SIZE}px;
`

const Right = styled.div`
  padding: ${SPACE_SIZE + 5}px 0 20px ${SPACE_SIZE}px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-between;
`

const Block = styled.div`
  position: absolute;
  top: ${SPACE_SIZE}px;
  width: ${LEFT_SIZE}px;
  height: 100%;
  border-radius: ${SPACE_SIZE / 2}px;
  background: url(${props => props.image}) no-repeat center;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
`

const FrameworkInfo = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  font-size: 25px;
  font-weight: 800;
  color: ${props => props.theme.white};
`

const Name = styled.div`
  text-transform: uppercase;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${props => props.theme.white};
`

const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.white};
`

const Button = styled.div`
  display: inline-block;
  padding: 10px 45px;
  border-radius: 3px;
  background-color: ${props => props.theme.white};
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: ${props => props.colors.link};
  box-shadow: ${props => props.colors.shadow} 0px 10px 15px;

  &:hover {
    cursor: pointer;
  }
`

const NoDecorLink = styled(Link)`
  text-decoration: inherit;
  color: inherit;
`

const FeatureCard = props => (
  <Container colors={props.colors}>
    <Left>
      <Block image={props.image}>
        <FrameworkInfo>
          <Name>{props.name}</Name>
        </FrameworkInfo>
      </Block>
    </Left>
    <Right>
      <div>
        <Title>{props.title}</Title>
      </div>
      <Description>{props.description}</Description>
      <div>
        <Button colors={props.colors}>
          <NoDecorLink to={getTutorialLink(props)}>
            Begin Tutorial
          </NoDecorLink>
        </Button>
      </div>
    </Right>
  </Container>
)

function getTutorialLink(props) {
  return stepRoute({
    tutorialName: props.name,
    step: 1,
  })
}

export default FeatureCard
