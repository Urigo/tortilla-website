import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FaIcon from '../../../../common/FaIcon'

const Wrap = styled.span`
  margin-left: 10px;
`

const CopyIcon = styled(FaIcon).attrs({
  icon: faCopy,
})`
  cursor: pointer;
`

const CheckWrap = styled.div`
  font-weight: bold;
  display: inline;
`

const CheckIcon = styled(FaIcon).attrs({
  icon: faCheck,
})`
  color: lightgreen;
  display: inline;
`

class CopyButton extends React.Component {
  static propTypes = {
    text: PropTypes.string,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.text === state.text) return null

    return { text: props.text }
  }

  constructor(props) {
    super(props)

    this.state = {
      text: props.text,
      copied: false,
    }
  }

  render() {
    if (this.state.copied) {
      return (
        <Wrap>
          <CheckWrap>
            <CheckIcon />
            copied!
          </CheckWrap>
        </Wrap>
      )
    }

    return (
      <Wrap>
        <CopyIcon onClick={this._copy} />
      </Wrap>
    )
  }

  _copy = () => {
    const el = document.createElement('textarea')
    el.value = this.state.text

    document.body.appendChild(el)
    el.select()

    document.execCommand('copy')
    document.body.removeChild(el)

    this.setState(
      {
        copied: true,
      },
      () => {
        setTimeout(() => {
          this.setState({ copied: false })
        }, 2000)
      }
    )
  }
}

export default CopyButton
