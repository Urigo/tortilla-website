import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { faChevronRight, faChevronLeft } from '@fortawesome/fontawesome-free-solid'

import OutlineIconButton from './OutlineIconButton'

const Button = styled(OutlineIconButton) `
    background-color: ${({ theme, disabled }) => disabled ? theme.primaryGray : theme.primaryBlue};
    border: 0 none;
    margin-left: 10px;
    
    & > * {
      color: ${({ theme }) => theme.white} !important;
    }

    &:hover {
        border: 0 none;
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
            <div>
                <Button icon={faChevronLeft} disabled={!this.hasPrev()} onClick={() => this.prev()} />
                <Button icon={faChevronRight} disabled={!this.hasNext()} onClick={() => this.next()} />
            </div>
        );
    }
}