import { faCube } from '@fortawesome/fontawesome-free-solid'
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
  line-height: ${VersionBoxHeight}px;
  color: ${({ theme }) => theme.primaryBlue};
  border: 2px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;

  &._active {
    color: white;
    background-color: ${({ theme }) => theme.primaryBlue};
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
    allVersions: PropTypes.arrayOf(PropTypes.string).isRequired,
    activateVersion: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Container>
        {this.props.allVersions.map((targetVersion, index) => (
          <React.Fragment key={`${targetVersion}_${index}`}>
            {index !== 0 && (
              <React.Fragment>
                <Line />
                <Cube />
                <Line />
              </React.Fragment>
            )}
            <VersionBox
              key={targetVersion}
              className={this.getVersionClassName(targetVersion)}
              onClick={this.activateVersion.bind(this, targetVersion)}
            >
              {targetVersion}{index === 0 && ' (latest)'}
            </VersionBox>
          </React.Fragment>
        ))}
      </Container>
    )
  }

  getVersionClassName(targetVersion) {
    return targetVersion === this.props.activeVersion ? '_active' : ''
  }

  activateVersion(targetVersion) {
    if (targetVersion === this.props.activeVersion) return

    this.props.activateVersion(targetVersion)
  }
}

export default VersionsBar
