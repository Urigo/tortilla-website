import React from 'react'
// import swal from 'swal2'
import { withPrefix } from 'gatsby'
import styled from 'styled-components'
import device from '../../utils/device'
import { TWITTER_URL, GITHUB_URL } from '../../consts'
// import { validateEmail, validateLength } from '../../utils/validations'

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
`

class ContactForm extends React.Component {
  state = {
    email: '',
    details: '',
  }

  render() {
    return (
      <Style className={this.props.className}>
        <div className="_title">Keep in touch!</div><br />
        <div className="_subtitle">Contact us to help convert your favorite existing open source tutorials to Tortilla and keep them up to date!<br /><br />On premise option - want to upgrade your internal company guides to Tortilla, visible only to your employees? Contact us for help</div>
        <div className="_info">
          <input
            className="_email"
            placeholder="your.email@domain.com"
            onChange={this.setEmail}
          />
          {device.desktop.active && <>
            <div className="_send-btn" onClick={this.send}>
              <img className="_icon" src={withPrefix('icns_30/icns-30-send.svg')} alt="" />
              <div className="_text">Send</div>
            </div>
          </>}
          <br />
          <textarea
            className="_details"
            placeholder={'"Help us to help you" ;)'}
            onChange={this.setDetails}
          />
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
            <div className="_send-btn" onClick={this.send}>
              <img className="_icon" src={withPrefix('icns_30/icns-30-send.svg')} alt="" />
              <div className="_text">Send</div>
            </div>
          </>}
        </div>
      </Style>
    )
  }

  setEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  Details = (e) => {
    this.setState({
      details: e.target.value
    })
  }

  validateFields() {
    try {
      validateEmail(this.state.email)
    }
    catch (e) {
      swal('Email is invalid', e.message)
      return false
    }

    try {
      validateLength(this.state.details, 1000)
    }
    catch (e) {
      swal('Details are invalid', e.message)
      return false
    }

    return true
  }

  send = () => {
    if (!this.validate()) return

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      details: JSON.stringify(this.state)
    }).then(() => {
      swal('Message successfully sent',
        'If relevant, we will notice you shortly :-)'
      )
    })
  }
}

export default ContactForm
