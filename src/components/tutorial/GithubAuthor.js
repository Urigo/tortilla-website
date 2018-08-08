import React from 'react'
import styled from 'styled-components'
import { faGithubSquare } from '@fortawesome/fontawesome-free-brands';
import FaIcon from '../common/FaIcon'

const GithubContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  float: right;
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

const GithubLogo = styled(FaIcon).attrs({
  icon: faGithubSquare,
  size: 14,
})`
  flex: 0 0 auto;
  color: #0e324c;
  margin-left: 10px;
`

export const GithubAuthor = (props) => (
  <GithubContainer>
    <GithubLink href={props.link} target="_BLANK">{props.link}</GithubLink>
    <GithubLogo />
  </GithubContainer>
)
