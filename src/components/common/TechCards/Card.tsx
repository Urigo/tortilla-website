import * as React from 'react'
import styled from 'styled-components'

const SPACE_SIZE = 30
const TOP_SPACE = 20
const HEIGHT = 270
const LEFT_SIZE = 190

const Container = styled.div`
  padding: 0 ${SPACE_SIZE}px;
  height: ${HEIGHT}px;
  border: solid 1px #f2f5f7;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  background-image: linear-gradient(
    141deg,
    ${props => props.colors.from},
    ${props => props.colors.to}
  );
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
  color: #ffffff;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #fff;
`

const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #fff;
`

const Button = styled.div`
  display: inline-block;
  padding: 10px 45px;
  border-radius: 3px;
  background-color: #fff;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: ${props => props.colors.link};
  box-shadow: ${props => props.colors.shadow} 0px 10px 15px;
`

const TechCard = props => (
  <Container colors={props.colors}>
    <Left>
      <Block image={props.image}>
        <FrameworkInfo>
          <div>{props.name}</div>
          <div>1.4</div>
        </FrameworkInfo>
      </Block>
    </Left>
    <Right>
      <div>
        <Title>Get Started with</Title>
        <Title>{props.name}</Title>
      </div>
      <Description>{props.text}</Description>
      <div>
        <Button colors={props.colors}>Install Meteor</Button>
      </div>
    </Right>
  </Container>
)

export default TechCard
