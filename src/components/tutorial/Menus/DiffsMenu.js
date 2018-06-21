import React from 'react'
import styled from 'styled-components'
import { navigateTo } from 'gatsby-link'

import { diffRoute, isVersionSpecific } from '../../../utils/routes'
import storage from '../../../utils/storage';

export const Diffs = styled.div`
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

const SrcName = Name.extend`
  margin-right: 15px;
`

const DestName = Name.extend`
  margin-left: 15px;
`

const Diff = styled.a`
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

const ActiveDiff = Diff.extend`
  color: ${({ theme }) => theme.white};

  ${SrcName}, ${DestName} {
    color: ${({ theme }) => theme.white};
  }
`

const propsToLink = (props, srcVersion) =>
  diffRoute({
    tutorialName: props.tutorialName,
    destVersion: isVersionSpecific(props.pathname) && props.destVersion,
    srcVersion: srcVersion,
  })

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

  navigateTo(link) {
    this.save();
    navigateTo(link);
  }

  save() {
    storage.setItem('diffs-menu-position', this.containerRef.parentElement.scrollTop)
  }

  read() {
    const pos = storage.getItem('diffs-menu-position');

    storage.removeItem('diffs-menu-position');

    return pos || 0;
  }

  render() {
    return <Diffs innerRef={this.setContainerRef}>
      {this.props.srcVersions.map(srcVersion => {
        const active = this.props.activeVersion &&
          srcVersion === this.props.activeVersion
        const link = propsToLink(this.props, srcVersion)

        if (active) {
          return (
            <ActiveDiff key={srcVersion} innerRef={this.setActiveRef}>
              <SrcName>{srcVersion}</SrcName>
              →
              <DestName>{this.props.destVersion}</DestName>
            </ActiveDiff>
          )
        }
        return (
          <Diff key={srcVersion} onClick={() => this.navigateTo(link)}>
            <SrcName>{srcVersion}</SrcName>
            →
            <DestName>{this.props.destVersion}</DestName>
          </Diff>
        )
      })}
    </Diffs>
  }
}
