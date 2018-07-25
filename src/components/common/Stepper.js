import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { faChevronRight, faChevronLeft } from '@fortawesome/fontawesome-free-solid'

import Button from './OutlineIconButton'

const Container = styled.div`
  // Note that specifically here there is a problem with wrapping a styled component
  // in production so instead I've used an inlined class. The issue is that the parent's
  // style is prioritized higher than the child component
  .nav-button {
    float: left;
    background-color: ${({ theme }) => theme.primaryBlue};
    border: 0 none;

    & > * {
      color: ${({ theme }) => theme.white};
    }

    &[disabled] {
      background-color: ${({ theme }) => theme.primaryGray};
      cursor: default;
    }

    &:not([disabled]):hover {
      background-color: #3b71e8;
    }

    &:hover > * {
      color: ${({ theme }) => theme.white} !important;
    }
  }
`

const Count = styled.div`
  padding: 0 10px;
  font-size: 24px;
  line-height: 39px;
  font-weight: 800;
  color: ${({ theme }) => theme.primaryGray};
  float: left;
  border: 1px solid ${({ theme }) => theme.separator};
  border-radius: 3px;
  margin: 0 10px;
  text-align: center;
  width: 5ch;
`

export default class extends React.Component {
  static propTypes = {
    current: PropTypes.number,
    limit: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static getDerivedStateFromProps(props) {
    if (props.hasOwnProperty('current')) {
      return {
        current: props.current
      }
    }

    return null
  }

  constructor(props) {
    super(props);

    this.state = {
      current: props.current || 0,
    }
  }

  set(i) {
    if (i >= this.props.limit) {
      i = this.props.limit - 1;
    } else if (i < 0) {
      i = 0;
    }

    if (this.state.current !== i) {
      this.props.onChange(i);
    }

    this.setState({
      current: i,
    });
  }

  hasPrev() {
    return this.state.current - 1 >= 0
  }

  prev() {
    this.set(this.state.current - 1);
  }

  hasNext() {
    return this.state.current + 1 < this.props.limit
  }
  next() {
    this.set(this.state.current + 1);
  }

  render() {
    return (
      <Container>
        <Button
          className="nav-button"
          icon={faChevronLeft}
          disabled={!this.hasPrev()}
          onClick={() => this.prev()} />
        <Count>
          {this.props.current + 1} / {this.props.limit}
        </Count>
        <Button
          className="nav-button"
          icon={faChevronRight}
          disabled={!this.hasNext()}
          onClick={() => this.next()} />
      </Container>
    );
  }
}
