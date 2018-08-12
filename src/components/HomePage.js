import { withPrefix } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import device from '../utils/device'
import FeatureCard from './home/FeatureCard'
import FeaturedTutorial from './home/FeaturedTutorial'
import FeatureCardsSection from './home/FeatureCardsSection'
import Layout from './layout'

const TWITTER_URL = 'https://twitter.com/UriGoldshtein'
const GITHUB_URL = 'https://github.com/Urigo'

const Header = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  top: 0;

  ${device.mobile`
    height: 500px;
  `}

  > ._fill-up {
    background-color: ${({ theme }) => theme.primaryBlue};
    left: 0;
    top: 0;
    width: 100%;
    height: 170px;
  }
`

const Body = styled.div`
  width: 100%;
  position: relative;
`

const Footer = styled.div`
  width: 100%;
  position: relative;
  height: 784px;
  overflow: hidden;

  ${device.mobile`
    height: 1150px;
  `}

  > ._background {
    z-index: -1;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #162c5e;
    width: 100%;
    height: 350px;
    transform-origin: top right;
    transform: rotate(13deg) translateX(100px) scaleX(10) scaleY(10);

    ${device.mobile`
      height: 850px;
      transform: rotate(13deg) translateX(200px) scaleX(10) scaleY(10);
    `}
  }

  > ._food-truck {
    margin: 0;
    pointer-events: none;
    user-select: none;
    user-drag: none;
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 0;
  }

  > ._rocket {
    margin: 0;
    pointer-events: none;
    user-select: none;
    user-drag: none;
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 450px;

    ${device.mobile`
      top: 0;
      right: -30px;
    `}
  }

  > ._contact {
    margin-left: 156px;
    margin-top: 220px;

    ${device.mobile`
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 320px;
    `}

    > ._title {
      font-family: Montserrat;
      font-size: 34px;
      font-weight: 800;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #ffffff;

      ${device.mobile`
        font-size: 23px;
      `}
    }

    > ._subtitle {
      width: 549px;
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #8797bb;

      ${device.mobile`
        width: 100%;
        font-size: 13px;
      `}
    }

    > ._info {
      margin-top: 50px;

      > br {
        clear: both;
        float: left;
        display: block;
        position: relative;
      }

      > ._email {
        float: left;
        margin-right: 16px;
        width: 416px;
        height: 41px;
        border-radius: 5px;
        background-color: #ffffff;
        border: solid 1px #d2d5de;
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 300;
        font-style: italic;
        font-stretch: normal;
        letter-spacing: normal;
        color: #5b6f9d;
        line-height: 41px;
        padding-left: 10px;

        ${device.mobile`
          width: 100%;
        `}
      }

      > ._send-btn {
        cursor: pointer;
        float: left;
        width: 105px;
        height: 40px;
        border-radius: 5px;
        background-color: #4c84ff;
        line-height: 40px;

        ${device.mobile`
          float: right;
        `}

        > ._icon {
          float: left;
          margin-left: 5px;
          margin-top: 5px;
        }

        > ._text {
          float: left;
          font-family: Montserrat;
          font-size: 14px;
          font-weight: normal;
          font-style: normal;
          font-stretch: normal;
          letter-spacing: normal;
          margin-left: 5px;
          color: #ffffff;
        }
      }

      > ._details {
        margin-top: 20px;
        width: 537px;
        height: 110px;
        border-radius: 4px;
        background-color: #ffffff;
        border: solid 1px #d2d5de;
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 300;
        font-style: italic;
        font-stretch: normal;
        letter-spacing: normal;
        color: #5b6f9d;
        padding-left: 10px;
        padding-top: 10px;

        ${device.mobile`
          width: 100%;
        `}
      }

      > ._follow {
        width: 537px;
        margin-top: 10px;

        ${device.mobile`
          width: 100%;
        `}

        > ._text {
          float: left;
          font-family: Montserrat;
          font-size: 16px;
          font-weight: 300;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #8797bb;
        }

        > ._social-btns {
          float: right;

          ${device.mobile`
            float: left;
          `}

          > a > img {
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }
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

    ${device.mobile`
      margin-left: 10px;
    `}
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

    ${device.mobile`
      margin-right: 10px;
    `}
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

  ${device.mobile`
    width: calc(100% + 300px);
    height: auto;
    top: 169.5px;
  `}
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

  ${device.mobile`
    left: -600px;
  `}

  ._context {
    width: 800px;
    height: 800px;
    transform: rotate(45deg);
    border-radius: 200px;
    background-color: #4c84ff;
  }
`

const GitFollowBtn = styled.a`
  display: block;
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

  ${device.mobile`
    width: 40px;
  `}

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

  ${device.mobile`
    left: 10px;
    top: 20px;

    > br {
      display: block;
      margin: 10px 0;
      content: " ";
    }

    > ._logo {
      float: left;
      margin: 0;
      margin-right: 5px;
    }

    > ._logo-title {
      color: white;
      font-size: 20px;
      font-family: Montserrat;
      font-style: italic;
      font-weight: 800;
      line-height: 45px;
    }
  `}

  > ._title {
    width: 671px;
    font-family: Montserrat;
    font-size: 44px;
    font-weight: 800;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #142345;

    ${device.mobile`
      width: 345px;
      font-size: 20px;
    `}
  }

  > ._subtitle {
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

    ${device.mobile`
      width: 100%;
      padding-right: 10px;
      color: white;
      font-size: 12px;
    `}
  }

  > ._start-btn {
    display: block;
    text-decoration: none;
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

const TechSection = styled.div`
  width: 700px;
  text-align: center;
  margin-top: 150px;
  margin-left: 156px;

  ${device.mobile`
    margin-left: 0;
    margin-top: 100px;
    width: 100%;
  `}

  > ._title {
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 800;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #142345;

    ${device.mobile`
      font-size: 19px;
    `}
  }

  > ._tech-icns {
    margin-top: 35px;

    > img {
      margin: 10px;
      width: 96px;
      height: 96px;
      border-radius: 20px;
      background-color: #ffffff;
      box-shadow: 10px 10px 20px 0 rgba(180, 188, 217, 0.14);

      ${device.mobile`
        width: 18%;
        height: auto;
      `}
    }
  }
`

class HomePage extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(PropTypes.any),
  }

  // SSR media queries fix - will force initial render
  state = {
    deviceType: null
  }

  componentDidMount() {
    device.onLayoutChange(() => {
      this.setState({
        deviceType: device.type
      })
    })

    this.setState({
      deviceType: device.type
    })
  }

  render() {
    return (
      <Layout key={this.state.deviceType}>
        <Header>
          {device.mobile.active && (
            <div className="_fill-up" />
          )}
          <DesktopImg src={withPrefix('img/group-19.svg')} class="Group-19" />
          <IntroDiv>
            {device.desktop.active ? <>
              <img className="_logo" src={withPrefix('Logo/logo.svg')} alt="tortilla" />
            </> : <>
              <img
                className="_logo"
                src={withPrefix('Logo/logo-tortilla-ondark.svg')}
                alt="tortilla"
              />
              <div className="_logo-title">tortilla</div>
              <br />
            </>}
            <div className="_title">
              A great framework for creating awesome tutorials!
            </div>
            <div className="_subtitle">
              Create tutorials from real code, based on git steps with easy CLI to keep your tutorial on to date with versioning support, rendering everywhere, multiple language translations and much more…
            </div>
            {device.desktop.active && <>
              <a className="_start-btn" href={GITHUB_URL}>
                Get Started
              </a>
            </>}
          </IntroDiv>
          <GitFollowBtn href={GITHUB_URL}>
            <div className="_icon">
              <img src={withPrefix('icns_30/icns-30-github.svg')} alt="Github" />
            </div>
            {device.desktop.active && <>
              <div className="_text">
                Follow on Github
              </div>
            </>}
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
            style={device.desktop.active ? { marginTop: 150 } : {}}
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
            style={device.desktop.active ? { marginTop: 150 } : {}}
            title="Here are our current courses"
            subtitle="Always up to date tutorials, Play with versions control - watch git-diff on how and why to upgrade from one version of the tutorial to the next. The best place to keep up with the always-moving Javascript ecosystem. Open source tutorials - contribute and get full access to all the tutorial’s source code and videos."
          >
            <FeaturedTutorial
              imgSrc={withPrefix('img/whatsapp.svg')}
              link="/tutorial/whatsapp/step/1"
              title="An Angular based Whatsapp clone"
              description="Using Angular, GraphQL, Apollo, PostgreSQL and TypeORM"
              style={{ backgroundColor: '#27e0c0', boxShadow: '10px 10px 20px 0 rgba(39, 224 ,192 ,0.2)' }}
            />
            <FeaturedTutorial
              imgSrc={withPrefix('img/destination.svg')}
              link="/tutorial/node-addon/step/1"
              title="Building a native Node.JS addon"
              description="Native NodeJS add-on creation tutorial using C++ for improved performance"
              style={{ backgroundColor: '#ffd22d', boxShadow: '10px 10px 20px 0 rgba(255, 210, 45, 0.2)' }}
            />
            <FeaturedTutorial
              imgSrc={withPrefix('img/snake-1.svg')}
              link="/tutorial/radial-snake/step/1"
              title="A Tron-style snake game"
              description="How to implement a game engine in JS and build a style game"
              style={{ backgroundColor: '#ff596d', boxShadow: '10px 10px 20px 0 rgba(255, 89, 109, 0.2)' }}
            />
            <FeaturedTutorial
              imgSrc={withPrefix('img/love.svg')}
              link="/tutorial/chatty/step/1"
              title="A chat app with React Native"
              description="Chat clone using React Native, GraphQL, Apollo, SQL and Sequelize"
              style={{ backgroundColor: '#8585ff', boxShadow: '10px 10px 20px 0 rgba(133, 133, 255, 0.2)' }}
            />
          </FeatureCardsSection>

          <TechSection>
            <div className="_title">“We are always use the newest</div>
            <div className="_title">technologies…”</div>
            <div className="_tech-icns">
              <img src={withPrefix('icns_30/icns-30-angular.svg')} alt="angular" />
              <img src={withPrefix('icns_30/icns-30-graphql.svg')} alt="graphql" />
              <img src={withPrefix('icns_30/icns-30-apolo.svg')} alt="apolo" />
              <img src={withPrefix('icns_30/icns-30-react.svg')} alt="react" />
              <img src={withPrefix('icns_30/icns-30-meteor.svg')} alt="meteor" />
              <img src={withPrefix('icns_30/icns-30-webpack.svg')} alt="webpack" />
              <img src={withPrefix('icns_30/icns-30-js.svg')} alt="js" />
              <img src={withPrefix('icns_30/icns-30-node.svg')} alt="node" />
              {device.desktop.active && <>
                <img src={withPrefix('icns_30/icns-30-post.svg')} alt="post" />
                <img src={withPrefix('icns_30/icns-30-post-copy.svg')} alt="copy" />
                <img src={withPrefix('icns_30/icns-30-c.svg')} alt="c" />
                <img src={withPrefix('icns_30/icns-30-sequelize.svg')} alt="sequelize" />
              </>}
            </div>
          </TechSection>
        </Body>

        <Footer>
          <img className="_rocket" src={withPrefix('img/group-17.svg')} alt="" />
          <div className="_background" />
          <img className="_food-truck" src={withPrefix('img/group-16.svg')} alt="" />

          <div className="_contact">
            <div className="_title">Keep in touch!</div><br />
            <div className="_subtitle">Contact us to help convert your favorite existing open source tutorials to Tortilla and keep them up to date!<br /><br />On premise option - want to upgrade your internal company guides to Tortilla, visible only to your employees? Contact us for help</div>
            <div className="_info">
              <input className="_email" />
              {device.desktop.active && <>
                <div className="_send-btn">
                  <img className="_icon" src={withPrefix('icns_30/icns-30-send.svg')} alt="" />
                  <div className="_text">Send</div>
                </div>
              </>}
              <br />
              <textarea className="_details" />
              <div className="_follow">
                {device.desktop.active && <>
                  <div className="_text">Don’t forget to follow us ;)</div>
                </>}
                <div className="_social-btns">
                  <a href={TWITTER_URL}>
                    <img
                      src={withPrefix('icns_30/icns-30-github.svg')}
                      alt="github"
                    />
                  </a>
                  <a href={GITHUB_URL}>
                    <img
                      src={withPrefix('icns_30/icns-30-twitter.svg')}
                      alt="twitter"
                    />
                  </a>
                </div>
              </div>
              {device.mobile.active && <>
                <div className="_send-btn">
                  <img className="_icon" src={withPrefix('icns_30/icns-30-send.svg')} alt="" />
                  <div className="_text">Send</div>
                </div>
              </>}
            </div>
          </div>
        </Footer>

        <UnderBar>
          <img className="_logo" src={withPrefix('Logo/logo-tortilla-ondark.svg')} alt="tortilla" />
          {device.desktop.active && <>
            <span className="_logo-text">tortilla</span>
            <span className="_copyright">Copyright © 2018 Tortilla, Inc.</span>
          </>}
          <span className="_terms">Terms  •  Privacy Policy and Cookie Policy</span>
        </UnderBar>
      </Layout>
    )
  }
}

export default HomePage
