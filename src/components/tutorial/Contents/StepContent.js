import React from 'react'
import styled from 'styled-components'
import { navigateTo } from 'gatsby-link'

import Counter from './Counter'
import Tags from './Tags'
import Stepper from '../../common/Stepper'
import { stepRoute } from '../../../utils/routes'

const Content = styled.div`
  flex: 1 0 0;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-self: stretch;
`

const Header = styled.div`
  padding: 25px;
  box-shadow: inset 0 -1px 0 0 #e8e8e8;
  display: flex;
  flex: 0 0 auto;
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
  color: ${({theme}) => theme.lightBlack};
  font-weight: normal;
  font-size: 14px;
  flex: 0 1 auto;
  overflow-y: auto;

  a {
    font-style: italic;
    text-decoration: none;
    color: #e3465a;
  }

  a:hover {
    text-decoration: underline;
  }

  pre {
    background-color: #f2f4f6;
    color: #c5c7d0;

    code {
      font-size: 12px;
    }
  }

  h1 {
    font-size: 34px;
    font-weight: 800;
    color: ${({theme}) => theme.blueGray};
  }

  h4 {
    font-size: 24px;
    font-weight: 800;
    color: ${({theme}) => theme.blueGray};
  }
`

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.navigationTimer = null;
    this.state = {
      stepId: this.props.step.id,
    }
  }

  changeStep(id) {
    if (this.navigationTimer) {
      clearTimeout(this.navigationTimer);
    }

    this.setState({
      stepId: id,
    })

    this.navigationTimer = setTimeout(() => {
      const route = stepRoute({
        tutorialName: this.props.tutorialName,
        versionName: this.props.tutorialVersion.name,
        step: this.getStep(),
      });

      navigateTo(route);
    }, 1000);
  }

  getStep() {
    return this.props.tutorialVersion.steps.find(({ id }) => id === this.state.stepId);
  }

  render() {
    const step = this.getStep();

    return (
      <Content>
        <Header>
          <Left>
            <Counter
              current={step.id}
              count={this.props.tutorialVersion.steps.length}
            />
            <Info>
              <Title>{step.name}</Title>
              <Tags
                tags={[
                  { color: 'blue', name: 'Webpack' },
                  { color: 'red', name: 'Angular 4.4.3' },
                  { color: 'red', name: 'Meteor 1.6' },
                ]}
              />
            </Info>
          </Left>
          <Right>
            <Stepper limit={this.props.tutorialVersion.steps.length} current={this.state.stepId - 1} onChange={i => this.changeStep(i + 1)} />
          </Right>
        </Header>
        <Html dangerouslySetInnerHTML={{ __html: this.props.step.html }} />
      </Content>
    );
  }
}
