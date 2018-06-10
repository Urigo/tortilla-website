import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'

import Button from '../common/Button'

const IconContainer = styled.div`
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.primaryBlue};
  line-height: 30px;
  color: ${({ theme }) => theme.white};
`
const Icon = styled(FontAwesomeIcon).attrs({
  icon: faPencilAlt,
})``

const Text = styled.a`
  color: inherit;
  text-decoration: inherit;
  flex: 1 1 auto;
  line-height: 30px;
  text-align: center;
  margin-right: 10px;
`

const ImproveButton = Button.extend`
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  border: 0 none;
  background-color: ${({ theme }) => theme.primaryBlue};
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.white};

  &:hover, &:hover ${IconContainer} {
    background-color: #3b71e8;
  }
`

const getEditHref = ({ link, branch, step }) => (
  `${link}/edit/${branch}/.tortilla/manuals/templates/step${step}.tmpl`
)

export default props => (
  <ImproveButton>
    <IconContainer>
      <Icon />
    </IconContainer>
    <Text href={getEditHref(props)}>Suggest Changes</Text>
  </ImproveButton>
)
