import React from 'react'
import styled from 'styled-components'

import Menu from './Menu'
import ImagePlaceholder from './ImagePlaceholder'
import List from '../common/List'
import ListItem from '../common/List/Item'

const Author = styled.div`
  font-size: 12px;
  font-weight: 300;
  font-style: italic;
  color: ${props => props.theme.darkGray};
`

export default props => (
  <Menu title="Author of week">
    <List
      data={props.authors}
      renderItem={(author, i) => (
        <ListItem
          key={i}
          left={() => <ImagePlaceholder />}
          middle={() => <Author>{author.name}</Author>}
        />
      )}
    />
  </Menu>
)
