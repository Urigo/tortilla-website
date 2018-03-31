import React from 'react'
import styled from 'styled-components'

import Menu from './Menu'
import ImagePlaceholder from './ImagePlaceholder'
import List from '../common/List'
import ListItem from '../common/List/Item'

const FrameworkName = styled.div`
  height: 18px;
  font-size: 14px;
  font-weight: normal;
  color: ${props => props.theme.grayBlue};
`

const FrameworkAuthor = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.theme.darkGray};
`

const Framework = props => (
  <div>
    <FrameworkName>{props.name}</FrameworkName>
    <FrameworkAuthor>by {props.author}</FrameworkAuthor>
  </div>
)

export default props => (
  <Menu title="Language development">
    <List
      data={props.frameworks}
      renderItem={(framework, i) => (
        <ListItem
          key={i}
          left={() => <ImagePlaceholder />}
          middle={() => (
            <Framework name={framework.name} author={framework.author} />
          )}
        />
      )}
    />
  </Menu>
)
