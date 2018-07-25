import React from 'react'
import styled from 'styled-components'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'

import Button from '../common/Button'
import FaIcon from '../common/FaIcon'

const IconContainer = styled.div`
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.primaryBlue};
  line-height: 30px;
  color: ${({ theme }) => theme.white};
`
const Icon = styled(FaIcon).attrs({
  icon: faPencilAlt,
  size: 17,
}) ``

const Text = styled.a`
  color: inherit;
  text-decoration: inherit;
  flex: 1 1 auto;
  line-height: 30px;
  text-align: center;
`

const ImproveButton = Button.extend`
  height: 40px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  border: 0 none;
  background-color: ${({ theme }) => theme.primaryBlue};
  text-align: center;
  color: ${({ theme }) => theme.white};

  &:hover, &:hover ${IconContainer} {
    background-color: #3b71e8;
  }
`

const getEditHref = ({ url, branch, step }) => (
  `${url}/edit/${branch}/.tortilla/manuals/templates/step${step}.tmpl`
)

export default props => (
  <ImproveButton>
    <IconContainer>
      <Text href={getEditHref(props)}>
        <Icon />
      </Text>
    </IconContainer>
  </ImproveButton>
)
