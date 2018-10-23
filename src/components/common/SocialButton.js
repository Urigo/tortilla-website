import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

/* Generated with https://sharingbuttons.io/ */

const Container = styled.a `
  .resp-sharing-button__link,
  .resp-sharing-button__icon {
    display: flex
  }

  .resp-sharing-button__link {
    text-decoration: none;
    color: #fff;
    margin: ${props => props.scale * 0.5}em
  }

  .resp-sharing-button {
    width: ${props => props.scale * 2.5}em;
    height: ${props => props.scale * 2.5}em;
    border-radius: 5px;
    transition: 25ms ease-out;
    padding: ${props => props.scale * 0.5}em ${props => props.scale * 0.75}em;
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif
  }

  .resp-sharing-button__icon svg {
    width: ${props => props.scale * 1}em;
    height: ${props => props.scale * 1.5}em;
    margin-right: ${props => props.scale * 0.4}em;
    vertical-align: top;
  }

  .resp-sharing-button--small svg {
    margin: 0;
    vertical-align: middle
  }

  .resp-sharing-button__icon {
    height: ${props => props.scale * 1.5}em;
    stroke: #fff;
    fill: none
  }

  /* Solid icons get a fill */
  .resp-sharing-button__icon--solid,
  .resp-sharing-button__icon--solidcircle {
    fill: #fff;
    stroke: none
  }

  .resp-sharing-button--twitter {
    background-color: #55acee
  }

  .resp-sharing-button--twitter:hover {
    background-color: #2795e9
  }

  .resp-sharing-button--pinterest {
    background-color: #bd081c
  }

  .resp-sharing-button--pinterest:hover {
    background-color: #8c0615
  }

  .resp-sharing-button--facebook {
    background-color: #3b5998
  }

  .resp-sharing-button--facebook:hover {
    background-color: #2d4373
  }

  .resp-sharing-button--facebook {
    background-color: #3b5998;
    border-color: #3b5998;
  }

  .resp-sharing-button--facebook:hover,
  .resp-sharing-button--facebook:active {
    background-color: #2d4373;
    border-color: #2d4373;
  }

  .resp-sharing-button--twitter {
    background-color: #55acee;
    border-color: #55acee;
  }

  .resp-sharing-button--twitter:hover,
  .resp-sharing-button--twitter:active {
    background-color: #2795e9;
    border-color: #2795e9;
  }

  .resp-sharing-button--pinterest {
    background-color: #bd081c;
    border-color: #bd081c;
  }

  .resp-sharing-button--pinterest:hover,
  .resp-sharing-button--pinterest:active {
    background-color: #8c0615;
    border-color: #8c0615;
  }
`

class ShareButton extends React.Component {
  static propTypes = {
    media: PropTypes.oneOf(['facebook', 'twitter', 'pinterest']).isRequired,
    className: PropTypes.string,
    scale: PropTypes.number,
    text: PropTypes.string,
    url: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    scale: 1,
    text: '',
    url: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      text: this.props.text,
      url: this.props.url,
    }

    // If not SSR do the following.
    // It's not critical to set during SSR stage
    if (typeof window !== 'undefined') {
      if (!this.state.text) {
        const meta = document.querySelector('meta[name="description"]')
        this.state.text = meta ? meta.content : ''
      }

      if (!this.state.url) {
        this.state.url = window.location.href
      }
    }
  }

  render() {
    switch (this.props.media) {
      case 'facebook': return this.renderFacebook()
      case 'twitter': return this.renderTwitter()
      case 'pinterest': return this.renderPinterest()
      default: return null
    }
  }

  renderFacebook() {
    return (
      <Container className={`resp-sharing-button__link ${this.props.className}`} scale={this.props.scale} href={`https://facebook.com/sharer/sharer.php?u=${escape(this.state.url)}`} target="_blank">
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg>
          </div>
        </div>
      </Container>
    )
  }

  renderTwitter() {
    return (
      <Container className={`resp-sharing-button__link ${this.props.className}`} scale={this.props.scale} href={`https://twitter.com/intent/tweet/?text=${escape(this.state.text)}&url=${escape(this.state.url)}`} target="_blank">
        <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" /></svg>
          </div>
        </div>
      </Container>
    )
  }

  renderPinterest() {
    return (
      <Container className={`resp-sharing-button__link ${this.props.className}`} scale={this.props.scale} href={`https://pinterest.com/pin/create/button/?url=${escape(this.state.url)}&media=${escape(this.state.url)}&description=${escape(this.state.text)}`} target="_blank">
        <div className="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z" /></svg>
          </div>
        </div>
      </Container>
    )
  }
}

export default ShareButton
