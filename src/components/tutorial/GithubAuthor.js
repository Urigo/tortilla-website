import React from 'react'
import styled, { css } from 'styled-components'
import { faGithubSquare } from '@fortawesome/fontawesome-free-brands';

import FaIcon from '../common/FaIcon'
import SocialButton from '../common/SocialButton'

const GithubContainer = styled.div`
  display: block;
  align-items: center;
  margin-bottom: 10px;
  float: right;
  border-radius: 5px;
  padding: 5px;
  padding-bottom: 0;
  width: 300px;

  ${props => props.link && css`
    border: 1px solid ${props => props.theme.separator};
  `}
`

const GithubAvatar = styled.img`
  display: inline-block;
  border-radius: 999px;
  border: 2px solid ${props => props.theme.separator};
  margin: 0;
`

// TODO: Don't compose profile url in render()
const GithubUsername = styled.a`
  display: inline-block;
  color: #162c5e;
  font-size: 14px;
  margin-left: 5px;
  transform: translateY(-7px);
  text-decoration: none;

  :after {
    display: block;
    content: "author";
    line-height: 0;
    font-size: 12px;
    color: ${props => props.theme.blueGray};
  }
`

const GithubLink = styled.a`
  display: inline-block;
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
  width: calc(100% - 30px);
`

const GithubLogo = styled(FaIcon).attrs({
  icon: faGithubSquare,
  size: 16,
})`
  display: inline-block;
  color: ${props => props.theme.blueGray};
  margin-left: 5px;
  transform: translateY(-8px);
`

const SocialButtons = styled.div `
  float: right;

  > * {
    float: right;
    margin-left: 5px;
  }
`

export const GithubAuthor = (props) => (
  <GithubContainer {...props}>
    <GithubAvatar src={`${props.author.avatar}?s=30`} width="30" alt={props.author.username} />
    <GithubUsername href={`https://github.com/${props.author.username}`}>{props.author.username}</GithubUsername>
    {props.link && <>
      <SocialButtons>
        <SocialButton media="facebook" scale={0.5} />
        <SocialButton media="twitter" scale={0.5} />
      </SocialButtons>
      <br />
      <GithubLogo />
      <GithubLink href={props.link} target="_BLANK">{props.link}</GithubLink>
    </>}
  </GithubContainer>
)
