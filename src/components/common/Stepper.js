import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { faChevronRight, faChevronLeft } from '@fortawesome/fontawesome-free-solid'

import Button from './OutlineIconButton'

const Container = styled.div`
  .nav-button {
    background-color: ${({ theme }) => theme.primaryBlue};
    border: 0 none;

    & > * {
      color: ${({ theme }) => theme.white};
    }

    &[disabled] {
      background-color: ${({ theme }) => theme.primaryGray};
      cursor: default;
    }

    &:hover > * {
      color: ${({ theme }) => theme.white};
    }
  }
`

export default class extends React.Component {
  static propTypes = {
    current: PropTypes.number,
    limit: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
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
        {'\u00A0\u00A0'}
        <Button
          className="nav-button"
          icon={faChevronRight}
          disabled={!this.hasNext()}
          onClick={() => this.next()} />
      </Container>
    );
  }
}
