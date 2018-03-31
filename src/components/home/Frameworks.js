import React from 'react'
import styled from 'styled-components'
import { withPrefix } from 'gatsby-link'

import Menu from './Menu'
import List from '../common/List'
import ListItem from '../common/List/Item'

const Image = styled.img`
  margin: 0;
  padding: 0;
  width: 35px;
  height: 35px;
`

const Name = styled.div`
  height: 18px;
  font-size: 14px;
  font-weight: normal;
  color: ${props => props.theme.grayBlue};
`

const Author = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.theme.darkGray};
`

const Framework = props => (
  <div>
    <Name>{props.name}</Name>
    <Author>by {props.author}</Author>
  </div>
)

export default props => (
  <Menu title="Language development">
    <List
      data={props.frameworks}
      renderItem={(framework, i) => (
        <ListItem
          key={i}
          left={() => (
            <Image src={withPrefix(`img/logos/${framework.image}.svg`)} />
          )}
          middle={() => (
            <Framework name={framework.name} author={framework.author} />
          )}
        />
      )}
    />
  </Menu>
)
