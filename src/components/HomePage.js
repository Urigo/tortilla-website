import { withPrefix } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import FeatureCard from './home/FeatureCard'
import FeaturedTutorial from './home/FeaturedTutorial'
import FeatureCardsSection from './home/FeatureCardsSection'
import Layout from './layout'

const Header = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  top: 0;
`

const Body = styled.div`
  width: 100%;
  position: relative;
`

const Footer = styled.div`
  width: 100%;
  position: relative;
  height: 784px;

  ._food-truck {
    margin: 0;
    pointer-events: none;
    user-select: none;
    user-drag: none;
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 0;
  }

  ._rocket {
    margin: 0;
    pointer-events: none;
    user-select: none;
    user-drag: none;
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 450px;
  }
`

const UnderBar = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #142345;
  box-shadow: inset 0 1px 0 0 #142345;
  line-height: 60px;

  > ._logo {
    float: left;
    width: 34px;
    margin: 0;
    margin-top: 7px;
    margin-left: 156px;
    margin-right: 10px;
  }

  > ._logo-text {
    font-family: Montserrat;
    margin-right: 10px;
    font-size: 18px;
    font-weight: 800;
    font-style: italic;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
  }

  > ._copyright {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #5b6f9d;
  }

  > ._terms {
    margin-right: 156px;
    margin-top: 24px;
    float: right;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #5b6f9d;
  }
`

const DesktopImg = styled.img`
  pointer-events: none;
  user-select: none;
  user-drag: none;
  width: 868px;
  height: 917px;
  object-fit: contain;
  position: absolute;
  top: 0;
  right: 0;
`

const Hump = styled.div`
  pointer-events: none;
  user-select: none;
  user-drag: none;
  transform: scaleX(0.7);
  position: absolute;
  top: calc(50% - 400px);
  left: -500px;
  z-index: -1;

  ._context {
    width: 800px;
    height: 800px;
    transform: rotate(45deg);
    border-radius: 200px;
    background-color: #4c84ff;
  }
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

class HomePage extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(PropTypes.any),
  }

  render() {
    return (
      <Layout>
        <Header>
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
        </Header>

        <Body>
          <Hump>
            <div className="_context" />
          </Hump>
          <FeatureCardsSection
            title={'Respect the developer time'}
            subtitle={"You don't need to read each time new tutorial for each version, Our framework releases a new version up to date with fine grained git-diff code changes with explanations where and how to upgrade."}
          >
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
          </FeatureCardsSection>
          <FeatureCardsSection
            style={{ marginTop: 150 }}
            title={"Respect the teacher's time"}
            subtitle={"The first platform that respects learners and teachers time, Automatically render your tutorial to Tortilla platform your own website or blog post simultaneously, Contact us for early access, add your new or existing tutorial."}
          >
            <FeatureCard
              imgSrc={withPrefix('Icons_116/icons-116-framework.svg')}
              title="Full Framework"
              subtitle="A full framework and CLI to help create a tutorial from source code."
            />
            <FeatureCard
              imgSrc={withPrefix('Icons_116/icons-116-auto.svg')}
              title="Auto Render"
              subtitle="Automatically render your tutorial to Tortilla website, Medium.com or your own website or blog post simultaneously."
            />
            <FeatureCard
              imgSrc={withPrefix('Icons_116/icons-116-social.svg')}
              title="Social Community"
              subtitle="Build a community around your tutorial, get help and contributions from learners."
            />
            <FeatureCard
              imgSrc={withPrefix('Icons_116/icons-116-translate.svg')}
              title="Translations"
              subtitle="contributors to help translate your tutorials to other languages."
            />
          </FeatureCardsSection>
          <FeatureCardsSection
            style={{ marginTop: 150 }}
            title="Here are our current courses"
            subtitle="Always up to date tutorials, Play with versions control - watch git-diff on how and why to upgrade from one version of the tutorial to the next. The best place to keep up with the always-moving Javascript ecosystem. Open source tutorials - contribute and get full access to all the tutorial’s source code and videos."
          >
            <FeaturedTutorial
              imgSrc={withPrefix('img/whatsapp.svg')}
              title="An Angular based Whatsapp clone"
              description="Using Angular, GraphQL, Apollo, PostgreSQL and TypeORM"
              style={{ backgroundColor: '#27e0c0', boxShadow: '10px 10px 20px 0 rgba(39, 224 ,192 ,0.2)' }}
            />
            <FeaturedTutorial
              imgSrc={withPrefix('img/destination.svg')}
              title="Building a native Node.JS addon"
              description="Native NodeJS add-on creation tutorial using C++ for improved performance"
              style={{ backgroundColor: '#ffd22d', boxShadow: '10px 10px 20px 0 rgba(255, 210, 45, 0.2)' }}
            />
            <FeaturedTutorial
              imgSrc={withPrefix('img/snake-1.svg')}
              title="A Tron-style snake game"
              description="How to implement a game engine in JS and build a style game"
              style={{ backgroundColor: '#ff596d', boxShadow: '10px 10px 20px 0 rgba(255, 89, 109, 0.2)' }}
            />
            <FeaturedTutorial
              imgSrc={withPrefix('img/love.svg')}
              title="A chat app with React Native"
              description="Chat clone using React Native, GraphQL, Apollo, SQL and Sequelize"
              style={{ backgroundColor: '#8585ff', boxShadow: '10px 10px 20px 0 rgba(133, 133, 255, 0.2)' }}
            />
          </FeatureCardsSection>
        </Body>

        <Footer>
          <img className="_rocket" src={withPrefix('img/group-17.svg')} />
          <img className="_food-truck" src={withPrefix('img/group-16.svg')} />
        </Footer>

        <UnderBar>
          <img className="_logo" src={withPrefix('Logo/logo-tortilla-ondark.svg')} />
          <span className="_logo-text">tortilla</span>
          <span className="_copyright">Copyright © 2018 Tortilla, Inc.</span>
          <span className="_terms">Terms  •  Privacy Policy and Cookie Policy</span>
        </UnderBar>
      </Layout>
    )
  }
}

export default HomePage
