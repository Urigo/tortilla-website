import * as React from 'react'
import styled from 'styled-components'
import * as FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/fontawesome-free-solid'

const Icon = styled(FontAwesomeIcon).attrs({
  icon: faPlay,
})`
  margin-left: 3px;
  color: ${props => props.theme.white};
`

const Container = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.primaryBlue};
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.33);
  border-radius: 50%;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
`

export default props => (
  <Container onClick={() => props.onClick()}>
    <Icon />
  </Container>
)
