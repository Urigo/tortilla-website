import React from 'react'
import styled from 'styled-components'
import {
  faShoePrints,
  faTimes,
  faAngleDown,
} from '@fortawesome/fontawesome-free-solid'
import FaIcon from '../../../common/FaIcon'

const StepbarHeight = 63
const SteplineHeight = 4

const ListIcon = styled(FaIcon).attrs({
  icon: faShoePrints,
  size: 20,
})`
  float: left;
  margin: 10px;
  color: ${({ theme }) => theme.primaryBlue};
`

const CloseBtn = styled(FaIcon).attrs({
  icon: faTimes,
  size: 20,
})`
  cursor: pointer;
  float: right;
  margin: 10px;
  color: ${({ theme }) => theme.primaryBlue};
`

const OpenBtn = styled(FaIcon).attrs({
  icon: faAngleDown,
  size: 20,
})`
  cursor: pointer;
  float: right;
  margin: 10px;
  color: ${({ theme }) => theme.primaryBlue};
`

const Stepbar = styled.div`
  height: ${StepbarHeight}px;
  border-bottom: solid 1px ${({ theme }) => theme.separator};
  padding-top: 10px;

  > ._title {
    > ._text {
      margin: 10px;
      float: left;
      font-family: Montserrat;
      font-size: 17px;
      font-weight: 800;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      color: ${({ theme }) => theme.primaryBlue};
    }
  }
`

const Stepline = styled.div`
  width: 165px;
  border-radius: 6px;
  margin-top: ${-SteplineHeight / 2}px;
  height: ${SteplineHeight}px;
  background-color: ${({ theme }) => theme.primaryBlue};
`

class StepsHeader extends React.Component {
  render() {
    return (
      <div style={this.props.style}>
        <Stepbar>
          <div className="_title">
            <ListIcon />
            <div className="_text">Step</div>
          </div>
          {this.props.opened ? (
            <CloseBtn onClick={this.props.close} />
          ) : (
            <OpenBtn onClick={this.props.open} />
          )}
        </Stepbar>
        <Stepline />
      </div>
    )
  }
}

export default StepsHeader
