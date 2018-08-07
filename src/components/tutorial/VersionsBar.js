import { faCube } from '@fortawesome/fontawesome-free-solid'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import FaIcon from '../common/FaIcon'

const Container = styled.div`
  max-width: 100%;
  overflow-y: overlay;
`

const VersionBoxHeight = 60

const VersionBox = styled.div`
  float: left;
  width: 120px;
  height: ${VersionBoxHeight}px;
  border: 2px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 3px;
  cursor: pointer;
  padding: 5px;

  > ._separator {
    width: 100%;
    margin-top: 5px;
    height: 1px;
    background-color: rgba(135, 151, 187, 0.5);
  }

  > ._date {
    opacity: 0.49;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #8797bb;
  }

  > ._number {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.primaryBlue};
  }

  &._active {
    background-color: ${({ theme }) => theme.primaryBlue};

    > ._separator {
      background-color: #3467d6;
    }

    > ._date {
      color: white;
    }

    > ._number {
      color: white;
    }
  }
`

const LineHeight = 2

const Line = styled.div`
  float: left;
  height: ${LineHeight}px;
  width: 50px;
  margin: ${(VersionBoxHeight - LineHeight) / 2}px 0;
  background-color: ${({ theme }) => theme.primaryBlue};
`

const CubeSize = 20

const Cube = styled(FaIcon).attrs({
  icon: faCube,
  size: CubeSize,
})`
  float: left;
  margin: ${(VersionBoxHeight - CubeSize) / 2}px 5px;
  color: ${({ theme }) => theme.primaryBlue};
`

class VersionsBar extends React.Component {
  static propTypes = {
    activeVersion: PropTypes.string.isRequired,
    allVersions: PropTypes.arrayOf(PropTypes.object).isRequired,
    activateVersion: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Container>
        {this.props.allVersions.map((targetVersion, index) => (
          <React.Fragment key={`${targetVersion.number}_${index}`}>
            {index !== 0 && (
              <React.Fragment>
                <Line />
                <Cube />
                <Line />
              </React.Fragment>
            )}
            <VersionBox
              key={targetVersion.number}
              className={this.getVersionClassName(targetVersion.number)}
              onClick={this.activateVersion.bind(this, targetVersion.number)}
            >
              <div className="_date">
                {moment(targetVersion.releaseDate).format('MMM Do')}
                {index === 0 && ' (latest)'}
              </div>
              <div className="_separator" />
              <div className="_number">version {targetVersion.number}</div>
            </VersionBox>
          </React.Fragment>
        ))}
      </Container>
    )
  }

  getVersionClassName(targetVersionNumber) {
    return targetVersionNumber === this.props.activeVersion ? '_active' : ''
  }

  activateVersion(targetVersionNumber) {
    if (targetVersionNumber === this.props.activeVersion) return

    this.props.activateVersion(targetVersionNumber)
  }
}

export default VersionsBar
