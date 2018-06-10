import React from 'react'
import styled from 'styled-components'

import storage from '../../../utils/storage';

export const Versions = styled.div`
  display: flex;
  flex-direction: column;

  & > *:first-child {
    border-top: 0 none;
  }
`

const Name = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #0e324c;
`

const Version = styled.a`
  display: block;
  padding: 15px 0 15px 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #2a5f85;
  border-top: solid 1px #0e324c;
  text-decoration: none;
  cursor: pointer;
`

const ActiveVersion = Version.extend`
  color: ${({ theme }) => theme.white};

  ${Name} {
    color: ${({ theme }) => theme.white};
  }
`

export default class extends React.Component {
  constructor(props) {
    super();

    this.activeRef = null;
    this.setActiveRef = el => this.activeRef = el;

    this.containerRef = null;
    this.setContainerRef = el => this.containerRef = el;
  }

  componentDidMount() {
    this.scrollToActive();
  }

  scrollToActive() {
    // XXX: We can change this behaviour later
    const pos = this.read();

    if (this.activeRef) {
      this.activeRef.scrollIntoView(false);
    } else {
      this.containerRef.parentElement.scrollTop = pos;
    }
  }

  save() {
    storage.setItem('versions-menu-position', this.containerRef.parentElement.scrollTop)
  }

  read() {
    const pos = storage.getItem('versions-menu-position');

    storage.removeItem('versions-menu-position');

    return pos || 0;
  }

  render() {
    return <Versions innerRef={this.setContainerRef}>
      {this.props.allVersions.map(version => {
        const active = version == this.props.activeVersion

        if (active) {
          return (
            <ActiveVersion key={version} innerRef={this.setActiveRef}>
              <Name>{version}</Name>
            </ActiveVersion>
          )
        }
        return (
          <Version key={version} onClick={() => console.log(`TODO: Switch to version ${version}`)}>
            <Name>{version}</Name>
          </Version>
        )
      })}
    </Versions>
  }
}
