import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import Link, { withPrefix } from 'gatsby-link'

const TortillaLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #162c5e;
  font-size: 18px;
  line-height: 18px;
  font-weight: 800;
  font-style: italic;
  text-transform: lowercase;
  text-decoration: none;
  margin-left: 25px;
`

const TortillaImg = styled.img`
  margin: 0;
  height: 40px;
`

export default class TortillaLogo extends React.Component<{
  to: PropTypes.string
}> {
  render() {
    return (
      <TortillaLink to={this.props.to}>
        <TortillaImg src={withPrefix('img/logo.png')} alt="Tortilla Logo" />
        <span>Tortilla</span>
      </TortillaLink>
    )
  }
}
