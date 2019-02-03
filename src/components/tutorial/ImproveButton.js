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
  line-height: 30px;
  color: ${({ theme }) => theme.blueGray};
`
const Icon = styled(FaIcon).attrs({
  icon: faPencilAlt,
  size: 17,
})``

const Text = styled.a`
  color: inherit;
  text-decoration: inherit;
  flex: 1 1 auto;
  line-height: 30px;
  text-align: center;
`

const ImproveButton = styled(Button) `
  height: 40px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  border: 0 none;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.separator};
`

const getEditHref = ({ url, branch, step }) =>
  `${url}/edit/${branch}/.tortilla/manuals/templates/step${step}.tmpl`

export default props => (
  <ImproveButton>
    <IconContainer>
      <Text href={getEditHref(props)}>
        <Icon />
      </Text>
    </IconContainer>
  </ImproveButton>
)
