import React from 'react'
import styled from 'styled-components'
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { faGithubSquare } from '@fortawesome/fontawesome-free-brands';

import { Container } from './Menu'
import FaIcon from '../../common/FaIcon'

export const SubMenu = Container.extend`
  width: 270px;
  background-color: ${({ theme }) => theme.white};
`

export const SubMenuHeader = styled.div`
  min-height: 47px;
  position: relative;
  padding: 0 15px;
  border-bottom: 1px solid ${({ theme }) => theme.separator};
`

export const SubMenuHeaderTitle = styled.div`
  padding: 10px 0;
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.blueGray};
  text-transform: uppercase;
  display: inline-block;
`

const GithubLogo = styled(FaIcon).attrs({
  icon: faGithubSquare,
  size: 14,
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

export const SubMenuHeaderClose = styled(FaIcon).attrs({
  icon: faTimes,
  size: 16,
}) `
  position: absolute;
  right: 15px;
  top: 15px;
  color: ${({ theme }) => theme.blueGray};
  cursor: pointer;
`
