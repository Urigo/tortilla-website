import { withPrefix } from 'gatsby'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 83px;
  overflow-x: overlay;
  overflow-y: hidden;
  white-space: nowrap;
`

const VersionBoxHeight = 60

const VersionBox = styled.div`
  display: inline-block;
  width: 120px;
  height: ${VersionBoxHeight}px;
  border: 1px solid ${({ theme }) => theme.primaryBlue};
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

const LineHeight = 1
const CubeSize = 25

// TODO: Update paths in diff content view when switching versions
const Line = styled.div`
  display: inline-block;
  border: ${LineHeight / 2}px dashed ${({ theme }) => theme.primaryBlue};
  height: ${LineHeight}px;
  width: 40px;
  margin: ${(VersionBoxHeight - LineHeight - CubeSize - 10) / 2}px 0;

  &._active {
    border-width: ${LineHeight}px;
    border-style: solid;
  }
`

const Cube = styled.img.attrs({
  width: CubeSize,
})`
  display: inline-block;
  cursor: pointer;
  margin: 0 3px;
  color: ${({ theme }) => theme.primaryBlue};
`

class VersionsBar extends React.Component {
  static propTypes = {
    activeVersion: PropTypes.string.isRequired,
    allVersions: PropTypes.arrayOf(PropTypes.object).isRequired,
    activateStep: PropTypes.func.isRequired,
    activateDiff: PropTypes.func.isRequired,
    contentType: PropTypes.string.isRequired,
  }

  state = {
    hoveredCube: null
  }

  render() {
    return (
      <Container>
        {this.props.allVersions.map((targetVersion, index) => (
          <React.Fragment key={`${targetVersion.number}_${index}`}>
            {index !== 0 && (
              <React.Fragment>
                <Line className={this.getLineClassName(targetVersion)} />
                <Cube
                  onClick={this.activateDiff.bind(this, index)}
                  onMouseEnter={() => this.setState({ hoveredCube: targetVersion })}
                  onMouseLeave={() => this.setState({ hoveredCube: null })}
                  src={this.getDiffCubeSrc(targetVersion)}
                />
                <Line className={this.getLineClassName(targetVersion)} />
              </React.Fragment>
            )}
            <VersionBox
              key={targetVersion.number}
              className={this.getVersionClassName(targetVersion)}
              onClick={this.activateStep.bind(this, index)}
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

  getLineClassName(version) {
    return (
      this.props.contentType === 'diffs' &&
      version.number === this.props.activeVersion
    ) ? '_active' : ''
  }

  getVersionClassName(version) {
    return (
      this.props.contentType === 'steps' &&
      version.number === this.props.activeVersion
    ) ? '_active' : ''
  }

  activateStep(versionIndex) {
    const version = this.props.allVersions[versionIndex]

    this.props.activateStep(version)
  }

  activateDiff(versionIndex) {
    const currVersion = this.props.allVersions[versionIndex]
    const prevVersion = this.props.allVersions[versionIndex - 1]

    // Compare previous version to current version
    this.props.activateDiff(prevVersion, currVersion)
  }

  getDiffCubeSrc(version) {
    return (
      (
        this.state.hoveredCube &&
        this.state.hoveredCube.number === version.number
      ) || (
        this.props.contentType === 'diffs' &&
        version.number === this.props.activeVersion
      )
    ) ? withPrefix('icns_30/icns-30-diff-clicked.svg')
      : withPrefix('icns_30/icns-30-diff.svg')
  }
}

export default VersionsBar
