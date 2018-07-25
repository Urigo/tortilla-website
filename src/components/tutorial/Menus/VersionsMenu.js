import React from 'react'
import styled from 'styled-components'
import { push } from 'gatsby'

import storage from '../../../utils/storage';
import { stepRoute } from '../../../utils/routes';

export const Versions = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.blueGray};
  margin-right: 5px;
`

const Latest = Name.extend`
  font-weight: normal;
`

const Version = styled.a`
  display: block;
  padding: 15px 0 15px 25px;
  height: 62px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.blueGray};
  border-bottom: solid 1px ${({ theme }) => theme.separator};
  text-decoration: none;
  cursor: pointer;
`

const ActiveVersion = Version.extend`
  color: ${({ theme }) => theme.primaryBlue};
  outline: 2px solid;
  outline-color: ${({ theme }) => theme.primaryBlue};
  outline-offset: -2px;

  &:hover {
    outline: 2px solid;
    outline-color: ${({ theme }) => theme.primaryBlue};
    outline-offset: -2px;
  }

  ${Name}, ${Latest} {
    color: ${({ theme }) => theme.primaryBlue};
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

  pushVersion(version) {
    this.save();

    const link = stepRoute({
      tutorialName: this.props.tutorialName,
      version: version !== this.props.latestVersion && version,
      step: 1,
    })

    push(link);
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
        const active = version === this.props.activeVersion
        let title = version

        if (active) {
          return (
            <ActiveVersion key={version} innerRef={this.setActiveRef}>
              <Name>{title}</Name>
              {(version === this.props.latestVersion) && <Latest>
                (latest)
              </Latest>}
            </ActiveVersion>
          )
        }
        return (
          <Version key={version} onClick={() => this.pushVersion(version)}>
            <Name>{title}</Name>
            {(version === this.props.latestVersion) && <Latest>
              (latest)
            </Latest>}
          </Version>
        )
      })}
    </Versions>
  }
}
