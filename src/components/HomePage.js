import { withPrefix } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import FeatureCard from './home/FeatureCard'
import Layout from './layout'

const DesktopImg = styled.img`
  width: 868px;
  height: 917px;
  object-fit: contain;
  position: absolute;
  top: 0;
  right: 0;
`

const GitFollowBtn = styled.div`
  width: 200px;
  height: 40px;
  padding: 3px;
  border-radius: 5px;
  background-color: #4c84ff;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.16);
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;

  ._icon {
    float: left;
    width: 34px;
    height: 34px;
    border-radius: 3px;
    background-color: #3b71e8;

    img {
      display: block;
      width: 100%;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }

  ._text {
    float: left;
    padding-left: 10px;
    width: 140px;
    height: 100%;
    line-height: 33px;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    color: #ffffff;
  }
`

const IntroDiv = styled.div`
  position: absolute;
  left: 156px;
  top: 175px;

  ._title {
    width: 671px;
    font-family: Montserrat;
    font-size: 44px;
    font-weight: 800;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #142345;
  }

  ._subtitle {
    width: 549px;
    margin-top: 20px;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #5b6f9d;
  }

  ._start-btn {
    cursor: pointer;
    margin-top: 30px;
    width: 192px;
    height: 55px;
    border-radius: 5px;
    background-color: #4c84ff;
    box-shadow: 2px 3px 13px 0 rgba(0, 85, 255, 0.3);
    color: white;
    text-align: center;
    line-height: 55px;
  }
`

const FeatureBatchA = styled.div`
  width: 100%;
  position: absolute;
  top: 800px;
  margin-left: auto;
  margin-right: auto;

  > ._title {
    font-family: Montserrat;
    font-size: 34px;
    font-weight: 800;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #142345;
  }

  > ._subtitle {
    max-width: 935px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    height: 80px;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #5b6f9d;
  }

  > ._feature-cards {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

class HomePage extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(PropTypes.any),
  }

  render() {
    return (
      <Layout>
        <DesktopImg src={withPrefix('img/group-19.svg')} class="Group-19" />
        <IntroDiv>
          <img src={withPrefix('Logo/logo.svg')} alt="tortilla" />
          <div className="_title">
            A great framework for creating awesome tutorials!
          </div>
          <div className="_subtitle">
            Create tutorials from real code, based on git steps with easy CLI to keep your tutorial on to date with versioning support, rendering everywhere, multiple language translations and much more…
          </div>
          <div className="_start-btn">
            Get Started
          </div>
        </IntroDiv>
        <GitFollowBtn>
          <div className="_icon">
            <img src={withPrefix('icns_30/icns-30-github.svg')} alt="Github" />
          </div>
          <div className="_text">Follow on Github</div>
        </GitFollowBtn>
        <FeatureBatchA>
          <div className="_title">
            Respect the developer time
          </div>
          <div className="_subtitle">
            You don't need to read each time new tutorial for each version, Our framework releases a new version up to date with fine grained git-diff code changes with explanations where and how to upgrade.
          </div>
          <div className="_feature-cards">
            <FeatureCard
              imgSrc={withPrefix('Icons_116/icons-116-free.svg')}
              title="Lifetime access"
              subtitle="we know that developer time is precious - so we guarantee that will be always free."
            />
            <FeatureCard
              imgSrc={withPrefix('Icons_116/icons-116-update.svg')}
              title="Always Up to Date"
              subtitle="Always up to date tutorials - don’t waste your time on starting to learn tutorials and finding out in the middle that they are outdated."
            />
            <FeatureCard
              imgSrc={withPrefix('Icons_116/icons-116-eco.svg')}
              title="Programming Ecosystem"
              subtitle="The best place to keep up with the always-moving programming ecosystem."
            />
            <FeatureCard
              imgSrc={withPrefix('Icons_116/icons-116-open.svg')}
              title="Open Source"
              subtitle="Open source tutorials - contribute and get full access to all the tutorial’s source code and videos."
            />
          </div>
        </FeatureBatchA>
      </Layout>
    )
  }
}

export default HomePage
