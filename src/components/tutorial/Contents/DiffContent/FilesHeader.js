import React from 'react'
import styled from 'styled-components'
import { faList, faTimes, faAngleDown } from '@fortawesome/fontawesome-free-solid'
import FaIcon from '../../../common/FaIcon'

const FilebarHeight = 63
const FilelineHeight = 4

const ListIcon = styled(FaIcon).attrs({
  icon: faList,
  size: 20,
})`
  float: left;
  margin: 10px;
  color: ${({theme}) => theme.primaryBlue};
`

const CloseBtn = styled(FaIcon).attrs({
  icon: faTimes,
  size: 20,
})`
  cursor: pointer;
  float: right;
  margin: 10px;
  color: ${({theme}) => theme.primaryBlue};
`

const OpenBtn = styled(FaIcon).attrs({
  icon: faAngleDown,
  size: 20,
})`
  cursor: pointer;
  float: right;
  margin: 10px;
  color: ${({theme}) => theme.primaryBlue};
`

const Filebar = styled.div`
  height: ${FilebarHeight}px;
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
      color: ${({theme}) => theme.primaryBlue};
    }
  }
`

const Fileline = styled.div`
  width: 165px;
  border-radius: 6px;
  margin-top: ${-FilelineHeight / 2}px;
  height: ${FilelineHeight}px;
  background-color: ${({theme}) => theme.primaryBlue};
`

class FilesHeader extends React.Component {
  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <Filebar>
          <div className="_title">
            <ListIcon />
            <div className="_text">Files</div>
          </div>
          {this.props.opened ? (
            <CloseBtn onClick={this.props.close} />
          ) : (
            <OpenBtn onClick={this.props.open} />
          )}
        </Filebar>
        <Fileline />
      </div>
    )
  }
}

export default FilesHeader
