import { faArrowLeft } from '@fortawesome/fontawesome-free-solid'
import { withPrefix } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import FaIcon from '../common/FaIcon'

const Container = styled.div.attrs({
  height: 50,
  margin: 10,
})`
  ${({ height, margin, theme }) => css`
    width: 100%;
    height: ${height}px;
    line-height: ${height}px;
    display: inline-block;
    border-bottom: 1px solid ${theme.separator};

    > ._back-btn {
      font-size: ${height - margin * 2 - 10}px;
      height: ${height - margin * 2}px;
      line-height: ${height - margin * 2}px;
      margin-left: ${margin}px;
      margin-top: ${margin}px;
      margin-bottom: ${margin}px;
      float: left;
      cursor: pointer;
      color: ${theme.blueGray};
    }

    > ._logo {
      display: block;
      height: ${height - margin * 2}px;
      margin-left: auto;
      margin-right: auto;
      margin-top: ${margin}px;
      margin-bottom: ${margin}px;
    }
  `}
`

const MainNavBar = ({ backHandler }) => (
  <Container>
    <FaIcon className="_back-btn" icon={faArrowLeft} onClick={backHandler} />
    <img className="_logo" src={withPrefix('img/logo.png')} alt="logo" />
  </Container>
)

MainNavBar.propTypes = {
  backHandler: PropTypes.func.isRequired,
}

export default MainNavBar
