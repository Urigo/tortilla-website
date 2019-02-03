import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { faChevronDown, faChevronUp } from '@fortawesome/fontawesome-free-solid'
import FaIcon from '../../../common/FaIcon'

const Container = styled.div`
  margin: 10px;
  display: block;
  width: calc(100% - 20px);

  > ._toggle-hide-button {
    float: right;
    cursor: pointer;
  }
`

class DiffHeader extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool,
    onHideChange: PropTypes.func,
  }

  static defaultProps = {
    hidden: false,
    onHideChange: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      hidden: props.hidden,
    }
  }

  render() {
    return (
      <Container>
        <span className="_title">{this.props.children}</span>
        <span className="_toggle-hide-button" onClick={this.toggleHide}>
          {this.state.hidden ? (
            <FaIcon icon={faChevronDown} />
          ) : (
            <FaIcon icon={faChevronUp} />
          )}
        </span>
      </Container>
    )
  }

  toggleHide = () => {
    this.setState(
      {
        hidden: !this.state.hidden,
      },
      () => {
        this.props.onHideChange(this.state.hidden)
      }
    )
  }
}

export default DiffHeader
