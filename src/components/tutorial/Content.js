import React from 'react'
import styled from 'styled-components'

import Counter from './Counter'
import Tags from './Tags'

const Content = styled.div`
  flex: 1 0 auto;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  padding: 25px;
  box-shadow: inset 0 -1px 0 0 #e8e8e8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: left;
`

const Left = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 10px;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #0e324c;
`

const Right = styled.div`
  display: flex;
  flex-direction: row;
`

const Html = styled.div`
  padding: 25px;

  h1 {
    font-size: 34px;
    font-weight: 800;
    color: #718696;
  }
`

export default props => (
  <Content>
    <Header>
      <Left>
        <Counter
          current={props.step.id}
          count={props.tutorial.version.steps.length}
        />
        <Info>
          <Title>{props.step.name}</Title>
          <Tags
            tags={[
              { color: 'blue', name: 'Webpack' },
              { color: 'red', name: 'Angular 4.4.3' },
              { color: 'red', name: 'Meteor 1.6' },
            ]}
          />
        </Info>
      </Left>
      <Right>right</Right>
    </Header>
    <Html dangerouslySetInnerHTML={{ __html: props.step.html }} />
  </Content>
)
