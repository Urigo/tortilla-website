import * as React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import Frameworks from './Frameworks'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 15px;
`

const Title = styled(Link)`
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #182e3f;
  text-decoration: none;

  &:hover {
    color: #4c84ff;
  }
`

const Subtitle = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #7f859b;
`

const Author = styled.div`
  font-size: 10px;
  font-weight: 300;
  color: #b6b8c2;
`

export default props => (
  <Container>
    <Title to={props.link}>{props.title}</Title>
    <Subtitle>{props.chaptersCount} Chapters</Subtitle>
    <Author>by author</Author>
    <Container />
  </Container>
)
