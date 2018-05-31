import React from 'react'
import styled from 'styled-components'
import Link, { navigateTo } from 'gatsby-link'
import { faArrowRight } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { diffRoute } from '../../../utils/routes'
import storage from '../../../utils/storage';

export const Diffs = styled.div`
  display: flex;
  flex-direction: column;

  & > *:first-child {
    border-top: 0 none;
  }
`

const Icon = styled(FontAwesomeIcon) `
  color: #0e324c;
  font-size: 24px;
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
  ${SrcName}, ${DestName}, ${Icon} {
    color: ${({ theme }) => theme.white};
  }
`

const propsToLink = (props, destVersion) =>
  diffRoute({
    tutorialName: props.tutorialName,
    srcVersion: props.srcVersion,
    destVersion: destVersion,
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
      {this.props.destVersions.map(destVersion => {
        const active = this.props.activeVersion &&
          destVersion === this.props.activeVersion
        const link = propsToLink(this.props, destVersion)

        if (active) {
          return (
            <ActiveDiff key={destVersion} innerRef={this.setActiveRef}>
              <SrcName>{this.props.srcVersion}</SrcName>
              <Icon icon={faArrowRight} />
              <DestName>{destVersion}</DestName>
            </ActiveDiff>
          )
        }
        return (
          <Diff key={destVersion} onClick={() => this.navigateTo(link)}>
            <SrcName>{this.props.srcVersion}</SrcName>
            <Icon icon={faArrowRight} />
            <DestName>{destVersion}</DestName>
          </Diff>
        )
      })}
    </Diffs>;
  }
}
