import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { faGithubSquare } from '@fortawesome/fontawesome-free-brands';

import { Container } from './Menu'

export const SubMenu = Container.extend`
  width: 270px;
  background-color: #1d4866;
`

export const SubMenuHeader = styled.div`
  position: relative;
  padding: 0 15px;
  border-bottom: 1px solid #0e324c;
`

export const SubMenuHeaderTitle = styled.div`
  margin: 10px 0;
  font-size: 24px;
  font-weight: 800;
  color: #092133;
  text-transform: uppercase;
`

export const SubMenuHeaderSubtitle = styled.div`
  height: 26px;
  margin: 10px 0 0 0;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const GithubLogo = styled(FontAwesomeIcon).attrs({
  icon: faGithubSquare,
})`
  flex: 0 0 auto;
  color: #0e324c;
  margin-left: 10px;
`

const GithubLink = styled.a`
  display: block;
  margin-left: 10px;
  flex: 1 1 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 300;
  font-style: italic;
  text-decoration: none;
  color: ${({theme}) => theme.primaryBlue};
`

const GithubContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  float: right;
`

export const SubMenuHeaderGithub = (props) => (
  <GithubContainer>
    <GithubLink href={props.link} target="_BLANK">{props.link}</GithubLink>
    <GithubLogo />
  </GithubContainer>
)

export const SubMenuHeaderClose = styled(FontAwesomeIcon).attrs({
  icon: faTimes,
}) `
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 16px;
  color: #0e324c;
  cursor: pointer;
`
