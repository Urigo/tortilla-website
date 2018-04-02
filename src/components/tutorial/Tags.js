import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import Theme from '../../themes/home'

const colorTag = color => {
  switch (color) {
    case 'blue':
      return Theme.primaryBlue
    case 'red':
      return '#e3465a'
    default:
      return Theme.primaryGray
  }
}

const Tag = styled(Link)`
  padding: 0 10px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  background-color: ${props => colorTag(props.color)};
`

const Container = styled.div`
  display: flex;
  flex-direction: row;

  & > ${Tag} {
    margin-right: 10px;
  }
`

export default props => (
  <Container>
    {props.tags.map((tag, i) => (
      <Tag key={i} color={tag.color} to={tag.to}>
        {tag.name}
      </Tag>
    ))}
  </Container>
)
