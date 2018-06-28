import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import featured from '../../featured'
import FeatureCard from './FeatureCards/Card'

const Container = styled.div`
  background: linear-gradient(to right, #121212, #131313, #121212);
`

const CardsContainer = styled.div`
  display: block;
  width: 100%;
  padding-bottom: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`

const GlowContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 200px;
  transform: translateY(-60px);
  overflow: hidden;
`

const Glow = styled.div`
  position: absolute;
  width: calc(100% + 400px);
  height: 400px;
  right: -200px;
  top: 0;
  box-shadow:
      inset 0 0 100px #fff,      /* inner white */
      inset 20px 0 160px #f0f,   /* inner left magenta short */
      inset -20px 0 160px #0ff,  /* inner right cyan short */
      inset 20px 0 300px #f0f,  /* inner left magenta broad */
      inset -20px 0 300px #0ff, /* inner right cyan broad */
      0 0 50px #fff,            /* outer white */
      -10px 0 160px #f0f,        /* outer left magenta */
      10px 0 160px #0ff;         /* outer right cyan */
`

const GlowOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 300px;
  bottom: -50px;
  background: radial-gradient(rgba(18, 18, 18, 0.6), rgba(242, 245, 247, 0) 400%);
`

const SubmitButton = styled.div`
  position: absolute;
  display: block;
  right: 0;
  z-index: 1;
  margin: 10px;
  box-sizing: border-box;
  padding: 10px;
  border: none;
  color: rgba(255,255,255,1);
  text-decoration: normal;
  text-align: center;
  text-overflow: clip;
  white-space: pre;
  text-shadow: 0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #ff00de , 0 0 70px #ff00de , 0 0 80px #ff00de , 0 0 100px #ff00de ;
  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);

  &:hover {
    text-shadow: 0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #00ffff , 0 0 70px #00ffff , 0 0 80px #00ffff , 0 0 100px #00ffff;
    cursor: pointer;
  }
`

class FeatureCards extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(PropTypes.any),
  }

  constructor(props) {
    super(props);

    this.tutorials = Object.keys(featured).reduce((tutorials, tutorialName) => {
      const tutorial = this.props.tutorials.find(candi => candi.name === tutorialName);
      tutorials[tutorialName] = { ...tutorial, ...featured[tutorialName] };
      return tutorials;
    }, {});
  }

  render() {
    return (
      <Container>
        <CardsContainer>
          {Object.keys(this.tutorials).map(name => (
            <FeatureCard key={name} {...this.tutorials[name]} />
          ))}
        </CardsContainer>
        <GlowContainer>
          <Glow />
          <SubmitButton onClick={this.submitTutorial.bind(this)}>
            Submit your tutorial
          </SubmitButton>
        </GlowContainer>
      </Container>
    );
  }

  submitTutorial() {
    // Send an email to Uri for now...
    // Later on we should have a more proper solution
    window.open('mailto:uri.goldshtein@gmail.com');
  }
}

export default FeatureCards
