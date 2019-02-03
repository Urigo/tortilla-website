import classNames from 'classnames'
import { withPrefix } from 'gatsby'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import swal from 'sweetalert2'
import device from '../../utils/device'
import { validateEmail, validateLength } from '../../utils/validations'

const Style = styled.div`
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

      &._sending {
        background-color: silver;
        cursor: default;
      }

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

        &._sending {
          width: 100%;
          margin: 0;
          color: gray;
          text-align: center;
        }
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

    > ._error-target {
      border: 2px solid red;
    }
  }

  > ._error-message {
    float: left;
    color: red;
  }
`

class ContactForm extends React.Component {
  state = {
    email: '',
    details: '',
  }

  render() {
    return (
      <Style className={this.props.className}>
        <div className="_title">Keep in touch!</div>
        <br />
        <div className="_subtitle">
          Are you one of the following?
          <br />
          <br />
          <ul>
            <li>
              A Tutorial author who wants help converting his/hers favorite
              tutorials to Tortilla and keep them up to date?
            </li>
            <li>
              A company looking to improve and modernize its training programs?
            </li>
            <li>
              A university looking to modernize and improve its programming
              classes?
            </li>
          </ul>
          We offer many solutions in education and already work with many
          corporations and universities; so don't hesitate to contact us!
        </div>
        <div className="_info">
          <input
            className={classNames('_email', {
              '_error-target': this.state.errorTarget === 'email',
            })}
            placeholder="your.email@domain.com"
            onChange={this.setEmail}
            ref={ref => (this.emailInput = ReactDOM.findDOMNode(ref))}
          />
          {device.desktop.active && this.renderSendBtn()}
          <br />
          <textarea
            className={classNames('_details', {
              '_error-target': this.state.errorTarget === 'details',
            })}
            placeholder={'"Help us help you" ;)'}
            onChange={this.setDetails}
          />
          <div className="_follow">
            {device.desktop.active && (
              <>
                <div className="_text">Don’t forget to follow us ;)</div>
              </>
            )}
            <div className="_social-btns">
              <a href={process.env.GATSBY_GITHUB_URL}>
                <img
                  src={withPrefix('icns_30/icns-30-github.svg')}
                  alt="github"
                />
              </a>
              <a href={process.env.GATSBY_TWITTER_URL}>
                <img
                  src={withPrefix('icns_30/icns-30-twitter.svg')}
                  alt="twitter"
                />
              </a>
            </div>
          </div>
          {device.mobile.active && this.renderSendBtn()}
        </div>
        <br />
        <br />
        <div className="_error-message">{this.state.errorMessage}</div>
      </Style>
    )
  }

  focus() {
    if (this.emailInput) {
      this.emailInput.focus()
    }
  }

  renderSendBtn() {
    return this.state.sending ? (
      <div className="_send-btn _sending" onClick={this.send}>
        <div className="_text _sending">Sending...</div>
      </div>
    ) : (
      <div className="_send-btn" onClick={this.send}>
        <img
          className="_icon"
          src={withPrefix('icns_30/icns-30-send.svg')}
          alt=""
        />
        <div className="_text">Send</div>
      </div>
    )
  }

  setEmail = e => {
    this.setState({
      errorTarget: '',
      errorMessage: '',
      email: e.target.value,
    })
  }

  setDetails = e => {
    this.setState({
      errorTarget: '',
      errorMessage: '',
      details: e.target.value,
    })
  }

  validateFields() {
    try {
      validateEmail('Email', this.state.email)
    } catch (e) {
      this.setState({
        errorTarget: 'email',
        errorMessage: e.message,
      })

      return false
    }

    try {
      validateLength('Details', this.state.details, 10, 1000)
    } catch (e) {
      this.setState({
        errorTarget: 'details',
        errorMessage: e.message,
      })

      return false
    }

    return true
  }

  send = () => {
    if (this.state.sending) return
    if (!this.validateFields()) return

    this.setState({
      sending: true,
    })

    fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(res => {
        if (res.status >= 400) {
          swal.fire({
            title: 'Oy vey...',
            text: "Message wasn't sent due to internal server error :-(",
            type: 'error',
          })
        } else {
          swal.fire({
            title: 'Message successfully sent',
            text: 'If relevant, we will notice you shortly :-)',
            type: 'success',
          })
        }

        this.setState({
          sending: false,
          email: '',
          details: '',
        })
      })
      .catch(() => {
        this.setState({
          sending: false,
        })
      })
  }
}

export default ContactForm
